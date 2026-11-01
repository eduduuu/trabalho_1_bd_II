import pg from 'pg';
import { IDatabaseAdapter } from './IDatabaseAdapter.js';

const { Pool } = pg;

export class PostgresAdapter extends IDatabaseAdapter {
  constructor(connectionString) {
    super();
    this.connectionString = connectionString;
    this.pool = null;
    this.complexQueries = this._registerComplexQueries();
  }

  async connect() {
    if (!this.pool) {
      this.pool = new Pool({
        connectionString: this.connectionString,
        ssl: { rejectUnauthorized: false },
        max: 10,
        idleTimeoutMillis: 30000,
      });
    }
    // Verify connection
    const client = await this.pool.connect();
    client.release();
    return true;
  }

  async disconnect() {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  }

  getAdapterName() {
    return 'PostgreSQL (Neon Cloud)';
  }

  async isConnected() {
    try {
      if (!this.pool) await this.connect();
      const res = await this.pool.query('SELECT 1 AS ok;');
      return res.rows[0]?.ok === 1;
    } catch (err) {
      return false;
    }
  }

  _sanitizeEntity(entity) {
    // Whitelist valid SQL table names and convert to lowercase for PostgreSQL compatibility
    const clean = entity.trim();
    if (!/^[a-zA-Z0-9_]+$/.test(clean)) {
      throw new Error(`Invalid entity name: ${entity}`);
    }
    return clean.toLowerCase();
  }

  async findAll(entity, options = {}) {
    const table = this._sanitizeEntity(entity);
    const {
      page = 1,
      limit = 20,
      sortBy = null,
      sortOrder = 'ASC',
      search = '',
      filters = {},
    } = options;

    const offset = (Math.max(1, parseInt(page, 10)) - 1) * parseInt(limit, 10);
    const params = [];
    const whereClauses = [];

    // Search filter across text columns if provided
    if (search && search.trim() !== '') {
      // Find text columns for this table
      const colsRes = await this.pool.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND lower(table_name) = lower($1)
          AND data_type IN ('character varying', 'text', 'character');
      `, [table]);

      if (colsRes.rows.length > 0) {
        params.push(`%${search.trim()}%`);
        const pIndex = params.length;
        const searchParts = colsRes.rows.map(r => `CAST("${r.column_name}" AS TEXT) ILIKE $${pIndex}`);
        whereClauses.push(`(${searchParts.join(' OR ')})`);
      }
    }

    // Specific filters
    if (filters && typeof filters === 'object') {
      for (const [key, val] of Object.entries(filters)) {
        if (val !== undefined && val !== null && val !== '') {
          params.push(val);
          whereClauses.push(`"${key}" = $${params.length}`);
        }
      }
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Total count
    const countSql = `SELECT COUNT(*) AS total FROM "${table}" ${whereSql};`;
    const countRes = await this.pool.query(countSql, params);
    const total = parseInt(countRes.rows[0].total, 10);

    // Sorting
    let orderSql = '';
    if (sortBy && /^[a-zA-Z0-9_]+$/.test(sortBy)) {
      const order = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      orderSql = `ORDER BY "${sortBy}" ${order}`;
    } else {
      orderSql = 'ORDER BY 1 ASC';
    }

    // Pagination
    params.push(parseInt(limit, 10));
    const limitIdx = params.length;
    params.push(offset);
    const offsetIdx = params.length;

    const dataSql = `SELECT * FROM "${table}" ${whereSql} ${orderSql} LIMIT $${limitIdx} OFFSET $${offsetIdx};`;
    const dataRes = await this.pool.query(dataSql, params);

    return {
      entity: table,
      total,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      totalPages: Math.ceil(total / parseInt(limit, 10)),
      rows: dataRes.rows,
    };
  }

  async findById(entity, id) {
    const table = this._sanitizeEntity(entity);

    if (typeof id === 'object' && id !== null) {
      // Composite key
      const keys = Object.keys(id);
      const params = Object.values(id);
      const where = keys.map((k, i) => `"${k}" = $${i + 1}`).join(' AND ');
      const sql = `SELECT * FROM "${table}" WHERE ${where} LIMIT 1;`;
      const res = await this.pool.query(sql, params);
      return res.rows[0] || null;
    }

    // Default: 'id' column
    const sql = `SELECT * FROM "${table}" WHERE id = $1 LIMIT 1;`;
    const res = await this.pool.query(sql, [id]);
    return res.rows[0] || null;
  }

  async create(entity, data) {
    const table = this._sanitizeEntity(entity);
    const keys = Object.keys(data).filter(k => data[k] !== undefined && data[k] !== '');
    if (keys.length === 0) {
      throw new Error('No valid data fields provided for insertion');
    }

    const columns = keys.map(k => `"${k}"`).join(', ');
    const values = keys.map((_, i) => `$${i + 1}`).join(', ');
    const params = keys.map(k => data[k]);

    const sql = `INSERT INTO "${table}" (${columns}) VALUES (${values}) RETURNING *;`;
    const res = await this.pool.query(sql, params);
    return res.rows[0];
  }

  async update(entity, id, data) {
    const table = this._sanitizeEntity(entity);
    const keys = Object.keys(data).filter(k => k !== 'id' && data[k] !== undefined);
    if (keys.length === 0) {
      throw new Error('No valid fields to update');
    }

    const setClauses = keys.map((k, i) => `"${k}" = $${i + 1}`).join(', ');
    const params = keys.map(k => data[k]);

    let whereSql = '';
    if (typeof id === 'object' && id !== null) {
      const idKeys = Object.keys(id);
      const startIdx = params.length;
      idKeys.forEach((k, idx) => {
        params.push(id[k]);
      });
      whereSql = idKeys.map((k, idx) => `"${k}" = $${startIdx + idx + 1}`).join(' AND ');
    } else {
      params.push(id);
      whereSql = `id = $${params.length}`;
    }

    const sql = `UPDATE "${table}" SET ${setClauses} WHERE ${whereSql} RETURNING *;`;
    const res = await this.pool.query(sql, params);
    return res.rows[0] || null;
  }

  async delete(entity, id) {
    const table = this._sanitizeEntity(entity);
    const params = [];
    let whereSql = '';

    if (typeof id === 'object' && id !== null) {
      const idKeys = Object.keys(id);
      idKeys.forEach((k, idx) => {
        params.push(id[k]);
      });
      whereSql = idKeys.map((k, idx) => `"${k}" = $${idx + 1}`).join(' AND ');
    } else {
      params.push(id);
      whereSql = `id = $1`;
    }

    const sql = `DELETE FROM "${table}" WHERE ${whereSql} RETURNING *;`;
    const res = await this.pool.query(sql, params);
    return res.rows[0] || null;
  }

  async rawQuery(query, params = []) {
    const start = Date.now();
    const res = await this.pool.query(query, params);
    const duration = Date.now() - start;
    return {
      rowCount: res.rowCount,
      fields: res.fields ? res.fields.map(f => f.name) : [],
      rows: res.rows,
      durationMs: duration,
    };
  }

  async executeComplexQuery(queryId, params = {}) {
    const queryDef = this.complexQueries[queryId];
    if (!queryDef) {
      throw new Error(`Complex query "${queryId}" not found. Available queries: ${Object.keys(this.complexQueries).join(', ')}`);
    }

    const { sql, defaultParams, description, title } = queryDef;
    const queryParams = { ...defaultParams, ...params };
    const { queryText, values } = queryDef.buildQuery(queryParams);

    const start = Date.now();
    const res = await this.pool.query(queryText, values);
    const duration = Date.now() - start;

    return {
      id: queryId,
      title,
      description,
      durationMs: duration,
      rowCount: res.rowCount,
      columns: res.fields ? res.fields.map(f => f.name) : [],
      rows: res.rows,
      sql: queryText,
    };
  }

  async getEntitiesMetadata() {
    const tablesRes = await this.pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    const entities = [];

    for (const row of tablesRes.rows) {
      const tableName = row.table_name;

      // Columns
      const colRes = await this.pool.query(`
        SELECT 
          c.column_name, 
          c.data_type, 
          c.is_nullable,
          c.column_default,
          c.character_maximum_length
        FROM information_schema.columns c
        WHERE c.table_schema = 'public' AND lower(c.table_name) = lower($1)
        ORDER BY c.ordinal_position;
      `, [tableName]);

      // Primary keys
      const pkRes = await this.pool.query(`
        SELECT kcu.column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'PRIMARY KEY'
          AND tc.table_schema = 'public'
          AND lower(tc.table_name) = lower($1);
      `, [tableName]);

      // Row count
      const countRes = await this.pool.query(`SELECT COUNT(*) AS total FROM "${tableName}";`);

      entities.push({
        name: tableName,
        rowCount: parseInt(countRes.rows[0].total, 10),
        primaryKeys: pkRes.rows.map(r => r.column_name),
        columns: colRes.rows.map(c => ({
          name: c.column_name,
          type: c.data_type,
          isNullable: c.is_nullable === 'YES',
          default: c.column_default,
          maxLength: c.character_maximum_length,
        })),
      });
    }

    return entities;
  }

  async getDashboardInsights() {
    // 1. Best framework per algorithm
    const bestFwRes = await this.pool.query(`
      WITH ranked AS (
        SELECT 
          a.nome AS algoritmo,
          f.nome AS framework,
          f.linguagem,
          d.nome AS dataset,
          amb.nome AS ambiente,
          b.tempo AS tempo_segundos,
          ROUND((d.qtd_arestas::numeric / NULLIF(b.tempo, 0)), 2) AS arestas_por_segundo,
          ROW_NUMBER() OVER (PARTITION BY a.nome ORDER BY b.tempo ASC) as rnk
        FROM Benchmark b
        JOIN Implementacao i ON b.implementacao_id = i.id
        JOIN Framework f ON i.framework_id = f.id
        JOIN Algoritmo a ON i.algoritmo_id = a.id
        JOIN Dataset d ON b.dataset_id = d.id
        JOIN Ambiente_de_Execucao amb ON b.ambiente_id = amb.id
      )
      SELECT algoritmo, framework, linguagem, dataset, ambiente, tempo_segundos, arestas_por_segundo
      FROM ranked
      WHERE rnk = 1
      ORDER BY algoritmo;
    `);

    // 2. Count wins per framework (framework melhor em mais algoritmos)
    const winsMap = {};
    bestFwRes.rows.forEach(r => {
      winsMap[r.framework] = (winsMap[r.framework] || 0) + 1;
    });
    const frameworkWins = Object.entries(winsMap).map(([framework, wins]) => ({ framework, wins })).sort((a,b) => b.wins - a.wins);

    // 3. Institutions with most researchers
    const instRes = await this.pool.query(`
      SELECT 
        inst.nome AS instituicao,
        inst.localizacao,
        COUNT(p.id) AS total_pesquisadores
      FROM Instituicao inst
      LEFT JOIN Pesquisador p ON p.instituicao_id = inst.id
      GROUP BY inst.id, inst.nome, inst.localizacao
      ORDER BY total_pesquisadores DESC, inst.nome ASC;
    `);

    // 4. Edge type distribution
    const edgeRes = await this.pool.query(`
      SELECT tipo_aresta, COUNT(*) AS total
      FROM Framework
      GROUP BY tipo_aresta
      ORDER BY total DESC;
    `);

    // 5. Language distribution
    const langRes = await this.pool.query(`
      SELECT linguagem, COUNT(*) AS total
      FROM Framework
      GROUP BY linguagem
      ORDER BY total DESC;
    `);

    // 6. Top datasets by scale
    const datasetRes = await this.pool.query(`
      SELECT nome, area, qtd_arestas, qtd_vertices
      FROM Dataset
      ORDER BY qtd_arestas DESC
      LIMIT 5;
    `);

    return {
      bestFrameworkPerAlgorithm: bestFwRes.rows,
      frameworkWins,
      topInstitutions: instRes.rows,
      edgeTypeDistribution: edgeRes.rows,
      languageDistribution: langRes.rows,
      topDatasets: datasetRes.rows,
    };
  }

  async getForeignKeysLookup() {
    const lookups = {};

    const [
      inst, pes, fw, alg, ds, amb, art, vei, comp, tec, est, app, impl, pesq, areasPesquisa, empresas
    ] = await Promise.all([
      this.pool.query(`SELECT id, nome AS label, nome FROM Instituicao ORDER BY nome;`),
      this.pool.query(`SELECT id, nome || ' (' || cargo || ')' AS label, nome FROM Pessoa ORDER BY nome;`),
      this.pool.query(`SELECT id, nome || ' (' || linguagem || ')' AS label, nome FROM Framework ORDER BY nome;`),
      this.pool.query(`SELECT id, nome AS label, nome FROM Algoritmo ORDER BY nome;`),
      this.pool.query(`SELECT id, nome || ' (' || area || ')' AS label, nome FROM Dataset ORDER BY nome;`),
      this.pool.query(`SELECT id, nome || ' (' || processador || ')' AS label, nome FROM Ambiente_de_Execucao ORDER BY nome;`),
      this.pool.query(`SELECT id, titulo AS label, titulo, doi FROM Artigo ORDER BY titulo;`),
      this.pool.query(`SELECT id, nome || ' - ' || edicao AS label, nome FROM Veiculo ORDER BY nome;`),
      this.pool.query(`SELECT id, tipo_alocacao || ' (' || complexidade_busca || ' busca)' AS label, tipo_alocacao AS nome FROM Complexidade ORDER BY tipo_alocacao;`),
      this.pool.query(`SELECT id, nome || ' (' || metodo || ')' AS label, nome FROM Tecnica_de_Otimizacao ORDER BY nome;`),
      this.pool.query(`SELECT id, nome AS label, nome FROM Estrutura_de_Dados ORDER BY nome;`),
      this.pool.query(`SELECT id, empresa || ' - ' || problema_resolvido AS label, empresa FROM Aplicacao ORDER BY empresa;`),
      this.pool.query(`
        SELECT i.id, f.nome || ' + ' || a.nome AS label, f.nome AS framework_nome, a.nome AS algoritmo_nome
        FROM Implementacao i 
        JOIN Framework f ON i.framework_id = f.id 
        JOIN Algoritmo a ON i.algoritmo_id = a.id 
        ORDER BY f.nome;
      `),
      this.pool.query(`
        SELECT p.id, pes.nome || ' (' || inst.nome || ')' AS label, pes.nome 
        FROM Pesquisador p 
        JOIN Pessoa pes ON p.pessoa_id = pes.id 
        JOIN Instituicao inst ON p.instituicao_id = inst.id 
        ORDER BY pes.nome;
      `),
      this.pool.query(`
        SELECT DISTINCT area_pesquisa 
        FROM Pesquisador 
        WHERE area_pesquisa IS NOT NULL AND area_pesquisa <> '' 
        ORDER BY area_pesquisa;
      `),
      this.pool.query(`
        SELECT DISTINCT empresa 
        FROM Aplicacao 
        WHERE empresa IS NOT NULL AND empresa <> '' 
        ORDER BY empresa;
      `),
    ]);

    lookups['instituicao'] = inst.rows;
    lookups['pessoa'] = pes.rows;
    lookups['framework'] = fw.rows;
    lookups['algoritmo'] = alg.rows;
    lookups['dataset'] = ds.rows;
    lookups['ambiente_de_execucao'] = amb.rows;
    lookups['artigo'] = art.rows;
    lookups['veiculo'] = vei.rows;
    lookups['complexidade'] = comp.rows;
    lookups['tecnica_de_otimizacao'] = tec.rows;
    lookups['estrutura_de_dados'] = est.rows;
    lookups['aplicacao'] = app.rows;
    lookups['implementacao'] = impl.rows;
    lookups['pesquisador'] = pesq.rows;
    lookups['areas_pesquisa'] = areasPesquisa.rows.map(r => r.area_pesquisa);
    lookups['empresas'] = empresas.rows.map(r => r.empresa);

    return lookups;
  }

  _registerComplexQueries() {
    return {
      'benchmark_ranking': {
        title: 'Ranking de Desempenho de Benchmarks de Grafos',
        description: 'Cruza Frameworks, Algoritmos, Datasets e Ambientes de Execução com o tempo de benchmark, calculando taxa de vértices e arestas processadas por segundo.',
        defaultParams: { minTime: 0, maxTime: 1000 },
        buildQuery: (p) => {
          const values = [p.minTime || 0, p.maxTime || 1000];
          let queryText = `
            SELECT 
              f.nome AS framework,
              f.linguagem,
              f.tipo_aresta,
              f.tipo_consumo_grafo,
              a.nome AS algoritmo,
              d.nome AS dataset,
              d.qtd_vertices,
              d.qtd_arestas,
              d.area AS area_dataset,
              amb.nome AS ambiente,
              amb.processador,
              amb.memoria_ram AS ram_gb,
              amb.gpu,
              b.tempo AS tempo_segundos,
              b.data_benchmark,
              ROUND((d.qtd_arestas::numeric / NULLIF(b.tempo, 0)), 2) AS arestas_por_segundo
            FROM Benchmark b
            JOIN Implementacao i ON b.implementacao_id = i.id
            JOIN Framework f ON i.framework_id = f.id
            JOIN Algoritmo a ON i.algoritmo_id = a.id
            JOIN Dataset d ON b.dataset_id = d.id
            JOIN Ambiente_de_Execucao amb ON b.ambiente_id = amb.id
            WHERE b.tempo >= $1 AND b.tempo <= $2
          `;
          if (p.framework) {
            values.push(p.framework);
            queryText += ` AND f.nome = $${values.length}`;
          }
          if (p.algoritmo) {
            values.push(p.algoritmo);
            queryText += ` AND a.nome = $${values.length}`;
          }
          queryText += ` ORDER BY b.tempo ASC;`;
          return { queryText, values };
        }
      },

      'researchers_network': {
        title: 'Rede Acadêmica: Pesquisadores, Instituições, Artigos e Veículos',
        description: 'Mapeia cada pesquisador, sua instituição de origem, artigos publicados com DOI e o veículo de conferência/revista avaliado.',
        defaultParams: {},
        buildQuery: (p) => {
          const values = [];
          let queryText = `
            SELECT 
              pes.nome AS pesquisador,
              pes.cargo,
              p.orcid,
              p.area_pesquisa,
              inst.nome AS instituicao_pesquisador,
              inst.localizacao AS localizacao_instituicao,
              art.titulo AS titulo_artigo,
              art.doi,
              art.data_publicacao AS data_artigo,
              v.nome AS veiculo_publicacao,
              v.edicao,
              v.tipo AS tipo_veiculo,
              v.local_publicacao
            FROM Publicacao pub
            JOIN Pesquisador p ON pub.pesquisador_id = p.id
            JOIN Pessoa pes ON p.pessoa_id = pes.id
            JOIN Instituicao inst ON p.instituicao_id = inst.id
            JOIN Artigo art ON pub.artigo_id = art.id
            JOIN Veiculo v ON pub.veiculo_id = v.id
          `;
          if (p.instituicao) {
            values.push(`%${p.instituicao}%`);
            queryText += ` WHERE inst.nome ILIKE $1`;
          }
          queryText += ` ORDER BY art.data_publicacao DESC, pes.nome ASC;`;
          return { queryText, values };
        }
      },

      'optimization_matrix': {
        title: 'Matriz de Otimização e Estruturas de Dados por Framework',
        description: 'Cruza Frameworks e Algoritmos com as Técnicas de Otimização e Estruturas de Dados aplicadas, exibindo complexidades de busca e inserção.',
        defaultParams: {},
        buildQuery: (p) => {
          const values = [];
          let queryText = `
            SELECT 
              f.nome AS framework,
              a.nome AS algoritmo,
              COALESCE(ed.nome, 'Padrão') AS estrutura_de_dados,
              COALESCE(c.tipo_alocacao, 'N/A') AS tipo_alocacao,
              COALESCE(c.complexidade_busca, 'N/A') AS complexidade_busca,
              COALESCE(c.complexidade_insercao, 'N/A') AS complexidade_insercao,
              COALESCE(to_opt.nome, 'Nenhuma') AS tecnica_otimizacao,
              COALESCE(to_opt.metodo, 'N/A') AS metodo_otimizacao,
              COALESCE(to_opt.complexidade, 'N/A') AS complexidade_tecnica
            FROM Implementacao i
            JOIN Framework f ON i.framework_id = f.id
            JOIN Algoritmo a ON i.algoritmo_id = a.id
            LEFT JOIN Implementacao_Estrutura_Dados ied ON ied.implementacao_id = i.id
            LEFT JOIN Estrutura_de_Dados ed ON ied.estrutura_id = ed.id
            LEFT JOIN Complexidade c ON ed.complexidade_id = c.id
            LEFT JOIN Aplicacao_Tecnica_Otimizacao ato ON ato.implementacao_id = i.id
            LEFT JOIN Tecnica_de_Otimizacao to_opt ON ato.tecnica_id = to_opt.id
          `;
          if (p.framework) {
            values.push(p.framework);
            queryText += ` WHERE f.nome = $1`;
          }
          queryText += ` ORDER BY f.nome, a.nome;`;
          return { queryText, values };
        }
      },

      'industry_adoption': {
        title: 'Adoção Industrial de Grafos: Empresas, Casos de Uso e Algoritmos',
        description: 'Identifica grandes empresas (Google, Amazon, Facebook, Netflix, Stripe) utilizando algoritmos de grafos, problemas resolvidos, frameworks e usuários associados.',
        defaultParams: {},
        buildQuery: (p) => {
          const values = [];
          let queryText = `
            SELECT 
              app.empresa,
              app.area AS area_negocio,
              app.problema_resolvido,
              app.licenca,
              f.nome AS framework_utilizado,
              alg.nome AS algoritmo_chave,
              pes.nome AS usuario_responsavel,
              pes.cargo AS cargo_usuario
            FROM Aplicacao app
            LEFT JOIN Implementacao_Aplicacao ia ON ia.aplicacao_id = app.id
            LEFT JOIN Implementacao impl ON ia.implementacao_id = impl.id
            LEFT JOIN Framework f ON impl.framework_id = f.id
            LEFT JOIN Algoritmo alg ON impl.algoritmo_id = alg.id
            LEFT JOIN Utilizacao_Aplicacao ua ON ua.aplicacao_id = app.id
            LEFT JOIN Pessoa pes ON ua.pessoa_id = pes.id
          `;
          if (p.empresa) {
            values.push(`%${p.empresa}%`);
            queryText += ` WHERE app.empresa ILIKE $1`;
          }
          queryText += ` ORDER BY app.empresa ASC;`;
          return { queryText, values };
        }
      },

      'dataset_hardware_profiling': {
        title: 'Perfil de Escala: Datasets vs Capacidade de Hardware',
        description: 'Cruza métricas de tamanho de grafo (vértices, arestas, tipo de grafo) contra especificações de hardware (RAM, NUMA, núcleos, GPU) em que foram avaliados.',
        defaultParams: {},
        buildQuery: (p) => {
          const values = [];
          const queryText = `
            SELECT 
              d.nome AS dataset,
              d.area AS area_dataset,
              d.qtd_vertices,
              d.qtd_arestas,
              ROUND((d.tamanho_arquivo::numeric / (1024 * 1024)), 2) AS tamanho_mb,
              d.direcionado,
              d.valorado,
              amb.nome AS ambiente,
              amb.sistema_operacional,
              amb.processador,
              amb.qtd_nucleos,
              amb.memoria_ram AS ram_gb,
              amb.memoria_secundaria AS storage_gb,
              amb.nos_numa,
              COALESCE(amb.gpu, 'Nenhuma') AS gpu,
              b.tempo AS tempo_benchmark_s
            FROM Dataset d
            JOIN Benchmark b ON b.dataset_id = d.id
            JOIN Ambiente_de_Execucao amb ON b.ambiente_id = amb.id
            ORDER BY d.qtd_arestas DESC, b.tempo ASC;
          `;
          return { queryText, values };
        }
      },

      'citation_recursive_network': {
        title: 'Cadeia Recursiva de Citações (WITH RECURSIVE & RANK)',
        description: 'Ranqueia o artigo de maior impacto (DENSE_RANK) em um Framework ou Algoritmo e percorre recursivamente a rede de citações (Artigo_Artigo) até 3 níveis de profundidade com prevenção de ciclos.',
        defaultParams: { framework: '', algoritmo: '' },
        buildQuery: (p) => {
          const values = [
            p.framework && p.framework.trim() !== '' ? `%${p.framework.trim()}%` : null,
            p.algoritmo && p.algoritmo.trim() !== '' ? `%${p.algoritmo.trim()}%` : null,
          ];
          const queryText = `
            WITH RECURSIVE
            artigos_candidatos AS (
              SELECT DISTINCT 
                art.id AS artigo_id, 
                art.titulo, 
                art.doi, 
                art.data_publicacao, 
                art.num_citacoes, 
                f.nome AS framework_nome, 
                a.nome AS algoritmo_nome
              FROM Artigo art
              JOIN Avaliacao_Artigo aa ON aa.artigo_id = art.id
              JOIN Implementacao i ON aa.implementacao_id = i.id
              JOIN Framework f ON i.framework_id = f.id
              JOIN Algoritmo a ON i.algoritmo_id = a.id
              WHERE ($1::text IS NULL OR f.nome ILIKE $1)
                AND ($2::text IS NULL OR a.nome ILIKE $2)
            ),
            artigo_ranqueado AS (
              SELECT 
                artigo_id, 
                titulo, 
                doi, 
                data_publicacao, 
                num_citacoes, 
                framework_nome, 
                algoritmo_nome,
                DENSE_RANK() OVER (ORDER BY num_citacoes DESC) as ranking
              FROM artigos_candidatos
            ),
            artigo_raiz AS (
              SELECT * FROM artigo_ranqueado WHERE ranking = 1 LIMIT 1
            ),
            cadeia_citacoes AS (
              SELECT 
                r.artigo_id AS id_atual, 
                r.titulo AS titulo_atual, 
                r.doi AS doi_atual, 
                r.num_citacoes AS citacoes_atual,
                r.data_publicacao AS data_atual, 
                0 AS nivel, 
                CAST(r.titulo AS TEXT) AS caminho_recursao, 
                ARRAY[r.artigo_id] AS ids_visitados
              FROM artigo_raiz r
              UNION ALL
              SELECT 
                prox.id AS id_atual, 
                prox.titulo AS titulo_atual, 
                prox.doi AS doi_atual, 
                prox.num_citacoes AS citacoes_atual,
                prox.data_publicacao AS data_atual, 
                c.nivel + 1 AS nivel,
                CAST(c.caminho_recursao || ' ➔ ' || prox.titulo AS TEXT) AS caminho_recursao,
                c.ids_visitados || prox.id AS ids_visitados
              FROM cadeia_citacoes c
              JOIN Artigo_Artigo aa ON c.id_atual = aa.artigo_citando_id
              JOIN Artigo prox ON aa.artigo_citado_id = prox.id
              WHERE c.nivel < 3 AND NOT (prox.id = ANY(c.ids_visitados))
            )
            SELECT 
              nivel, 
              titulo_atual AS artigo, 
              citacoes_atual AS citacoes, 
              doi_atual AS doi, 
              data_atual AS data_publicacao, 
              caminho_recursao
            FROM cadeia_citacoes
            ORDER BY nivel ASC, citacoes_atual DESC;
          `;
          return { queryText, values };
        }
      },

      'citation_loop_detection': {
        title: 'Detecção de Ciclos / Loops de Citações (WITH RECURSIVE)',
        description: 'Parte de cada artigo, expande recursivamente a rede de referências bibliográficas e projeta no SELECT final exclusivamente caminhos que formam ciclos fechados de citação.',
        defaultParams: { maxDepth: 5, artigo: '' },
        buildQuery: (p) => {
          const depth = Math.min(Math.max(parseInt(p.maxDepth) || 5, 2), 6);
          const values = [
            depth,
            p.artigo && p.artigo.trim() !== '' ? `%${p.artigo.trim()}%` : null,
          ];
          const queryText = `
            WITH RECURSIVE caminhos_citacoes AS (
              -- Caso base: toda aresta de citação inicial
              SELECT 
                aa.artigo_citando_id AS id_inicial,
                aa.artigo_citando_id AS id_atual,
                aa.artigo_citado_id AS prox_id,
                1 AS passos,
                ARRAY[aa.artigo_citando_id, aa.artigo_citado_id] AS caminho_ids,
                CAST(a1.titulo || ' ➔ ' || a2.titulo AS TEXT) AS caminho_titulos,
                (aa.artigo_citado_id = aa.artigo_citando_id) AS eh_ciclo
              FROM Artigo_Artigo aa
              JOIN Artigo a1 ON aa.artigo_citando_id = a1.id
              JOIN Artigo a2 ON aa.artigo_citado_id = a2.id
              WHERE ($2::text IS NULL OR a1.titulo ILIKE $2)

              UNION ALL

              -- Passo recursivo
              SELECT 
                c.id_inicial,
                c.prox_id AS id_atual,
                prox.artigo_citado_id AS prox_id,
                c.passos + 1,
                c.caminho_ids || prox.artigo_citado_id,
                CAST(c.caminho_titulos || ' ➔ ' || a_prox.titulo AS TEXT),
                (prox.artigo_citado_id = c.id_inicial)
              FROM caminhos_citacoes c
              JOIN Artigo_Artigo prox ON c.prox_id = prox.artigo_citando_id
              JOIN Artigo a_prox ON prox.artigo_citado_id = a_prox.id
              WHERE NOT c.eh_ciclo 
                AND c.passos < $1
                AND (prox.artigo_citado_id = c.id_inicial OR NOT (prox.artigo_citado_id = ANY(c.caminho_ids)))
            )
            SELECT 
              a_ini.titulo AS artigo_origem,
              passos AS tamanho_ciclo,
              caminho_titulos AS caminho_loop,
              a_ini.doi AS doi_origem,
              a_ini.num_citacoes AS citacoes_origem
            FROM caminhos_citacoes c
            JOIN Artigo a_ini ON c.id_inicial = a_ini.id
            WHERE eh_ciclo = true
            ORDER BY tamanho_ciclo ASC, artigo_origem ASC;
          `;
          return { queryText, values };
        }
      },

      'dataset_framework_ranking': {
        title: 'Ranking do Melhor Framework por Dataset (HAVING Citações Mínimas)',
        description: 'Cruza Datasets e Benchmarks com Frameworks avaliados, ranqueia o melhor framework por tempo de execução em cada dataset e filtra com HAVING pelo número mínimo de citações do artigo.',
        defaultParams: { minCitacoes: 0, dataset: '' },
        buildQuery: (p) => {
          const values = [
            parseInt(p.minCitacoes) || 0,
            p.dataset && p.dataset.trim() !== '' ? `%${p.dataset.trim()}%` : null,
          ];
          const queryText = `
            WITH framework_benchmark_stats AS (
              SELECT 
                d.id AS dataset_id,
                d.nome AS dataset,
                d.area AS area_dataset,
                d.qtd_vertices,
                d.qtd_arestas,
                f.id AS framework_id,
                f.nome AS framework,
                f.linguagem,
                COUNT(b.tempo) AS total_benchmarks,
                MIN(b.tempo) AS melhor_tempo_s,
                ROUND(AVG(b.tempo)::numeric, 4) AS tempo_medio_s,
                COALESCE(MAX(art.num_citacoes), 0) AS citacoes_artigo,
                COALESCE(STRING_AGG(DISTINCT art.titulo, ' | '), 'Sem artigo vinculado') AS artigo_referencia
              FROM Dataset d
              JOIN Benchmark b ON b.dataset_id = d.id
              JOIN Implementacao i ON b.implementacao_id = i.id
              JOIN Framework f ON i.framework_id = f.id
              LEFT JOIN Avaliacao_Artigo aa ON aa.implementacao_id = i.id
              LEFT JOIN Artigo art ON aa.artigo_id = art.id
              WHERE ($2::text IS NULL OR d.nome ILIKE $2)
              GROUP BY d.id, d.nome, d.area, d.qtd_vertices, d.qtd_arestas, f.id, f.nome, f.linguagem
              HAVING COALESCE(MAX(art.num_citacoes), 0) >= $1
            )
            SELECT 
              dataset,
              area_dataset,
              DENSE_RANK() OVER (PARTITION BY dataset_id ORDER BY melhor_tempo_s ASC) AS ranking_no_dataset,
              framework,
              linguagem,
              melhor_tempo_s,
              tempo_medio_s,
              total_benchmarks,
              citacoes_artigo,
              artigo_referencia
            FROM framework_benchmark_stats
            ORDER BY dataset ASC, ranking_no_dataset ASC;
          `;
          return { queryText, values };
        }
      },

      'institution_researcher_productivity': {
        title: 'Produtividade por Instituição (GROUP BY & HAVING Área de Pesquisa)',
        description: 'Agrupa pesquisadores por instituição, calcula quantidade de pesquisadores, total de artigos publicados e a razão artigos/pesquisador, ordenado por quantidade de pesquisadores e filtrado por HAVING na área de pesquisa.',
        defaultParams: { areaPesquisa: '' },
        buildQuery: (p) => {
          const values = [
            p.areaPesquisa && p.areaPesquisa.trim() !== '' ? `%${p.areaPesquisa.trim()}%` : null,
          ];
          const queryText = `
            SELECT 
              inst.nome AS instituicao,
              inst.localizacao,
              COUNT(DISTINCT p.id) AS qtd_pesquisadores,
              COUNT(DISTINCT pub.artigo_id) AS qtd_artigos,
              COALESCE(ROUND(COUNT(DISTINCT pub.artigo_id) * 1.0 / NULLIF(COUNT(DISTINCT p.id), 0), 2), 0.00) AS razao_artigos_pesquisador,
              COALESCE(STRING_AGG(DISTINCT p.area_pesquisa, ', '), 'Nenhuma cadastrada') AS areas_pesquisa_instituicao,
              COALESCE(STRING_AGG(DISTINCT art.titulo, ' | '), 'Nenhum artigo publicado') AS titulos_artigos
            FROM Instituicao inst
            JOIN Pesquisador p ON p.instituicao_id = inst.id
            LEFT JOIN Publicacao pub ON pub.pesquisador_id = p.id
            LEFT JOIN Artigo art ON pub.artigo_id = art.id
            GROUP BY inst.id, inst.nome, inst.localizacao
            HAVING ($1::text IS NULL OR BOOL_OR(p.area_pesquisa ILIKE $1))
            ORDER BY qtd_pesquisadores DESC, qtd_artigos DESC, razao_artigos_pesquisador DESC;
          `;
          return { queryText, values };
        }
      }
    };
  }
}
