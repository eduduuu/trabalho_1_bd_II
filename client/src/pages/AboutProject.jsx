import React from 'react';
import { 
  Database, GitFork, Repeat, Trophy, GraduationCap, 
  Layers, Cpu, Server, Network, ShieldCheck, CheckCircle2,
  Table, Sparkles, BookOpen, Binary, ArrowRight
} from 'lucide-react';

export function AboutProject() {
  const tableDomains = [
    {
      domain: 'Produção Científica & Autoria',
      color: 'from-blue-500 to-indigo-600',
      description: 'Artigos, pesquisadores, afiliações institucionais, veículos de publicação e rede reflexiva de citações.',
      tables: [
        { name: 'Pessoa', desc: 'Dados cadastrais (CPF único, nome e cargo).' },
        { name: 'Instituicao', desc: 'Universidades e centros de pesquisa (nome único, localização e fundação).' },
        { name: 'Pesquisador', desc: 'Especialização de Pessoa ligada à Instituição com ORCID e área de pesquisa.' },
        { name: 'Artigo', desc: 'Publicações científicas com DOI único, data, título e contagem de citações.' },
        { name: 'Artigo_Artigo', desc: 'Grafo direcionado reflexivo de citações (artigo citando ➔ artigo citado).' },
        { name: 'Veiculo', desc: 'Conferências (PPoPP, MICRO, FAST, etc.) e periódicos de publicação.' },
        { name: 'Publicacao', desc: 'Relacionamento ternário associando Artigo, Pesquisador e Veículo.' },
      ]
    },
    {
      domain: 'Engenharia de Grafos & Algoritmos',
      color: 'from-purple-500 to-pink-600',
      description: 'Sistemas de processamento de grafos, algoritmos clássicos, estruturas de dados e complexidades.',
      tables: [
        { name: 'Framework', desc: 'Sistemas avaliados (DGAP, Ligra, Gunrock, XPGraph, etc.) com linguagem e consumo de grafo.' },
        { name: 'Algoritmo', desc: 'Algoritmos fundamentais (PageRank, BFS, SSSP, WCC, Triangle Counting).' },
        { name: 'Implementacao', desc: 'Pares concretos de Framework x Algoritmo implementado.' },
        { name: 'Estrutura_de_Dados', desc: 'Estruturas de representação (CSR, Dynamic CSR, Edge List, Hash Table).' },
        { name: 'Complexidade', desc: 'Ordens assintóticas de alocação, busca e inserção.' },
        { name: 'Tecnica_de_Otimizacao', desc: 'Técnicas especializadas (NUMA-Aware, Parallel Sliding Windows, Dual-Versioning).' },
        { name: 'Implementacao_Estrutura_Dados', desc: 'Estruturas de dados adotadas por cada implementação.' },
        { name: 'Aplicacao_Tecnica_Otimizacao', desc: 'Técnicas de otimização ativas em cada implementação.' },
      ]
    },
    {
      domain: 'Datasets & Benchmarking Experimental',
      color: 'from-amber-500 to-orange-600',
      description: 'Grafos reais em larga escala, ambientes de hardware heterogêneos e medições experimentais.',
      tables: [
        { name: 'Dataset', desc: 'Grafos reais (LiveJournal, Twitter, Friendster, etc.) com vértices e arestas.' },
        { name: 'Ambiente_de_Execucao', desc: 'Especificações de hardware (processador, RAM, GPU, nós NUMA, PMEM).' },
        { name: 'Benchmark', desc: 'Medições empíricas de tempo de execução (s) por dataset, ambiente e implementação.' },
        { name: 'Avaliacao_Artigo', desc: 'Artigos científicos que avaliaram empiricamente cada implementação.' },
        { name: 'Avaliacao_Dataset', desc: 'Datasets utilizados como base de teste em cada artigo científico.' },
      ]
    },
    {
      domain: 'Adoção Industrial & Mercado',
      color: 'from-emerald-500 to-teal-600',
      description: 'Aplicações no mundo real em grandes empresas de tecnologia e dependências sistêmicas.',
      tables: [
        { name: 'Aplicacao', desc: 'Sistemas corporativos (Google Search, Amazon Recommendations, Stripe Fraud, etc.).' },
        { name: 'Implementacao_Aplicacao', desc: 'Implementações de algoritmos de grafos incorporadas à aplicação.' },
        { name: 'Utilizacao_Aplicacao', desc: 'Especialistas e engenheiros responsáveis pelo uso do sistema.' },
        { name: 'Aplicacao_Aplicacao', desc: 'Dependências diretas e fluxo de dados entre aplicações industriais.' },
      ]
    }
  ];

  const queriesExplained = [
    {
      title: 'Detecção de Loops e Ciclos Fechados de Citação',
      sqlId: 'citation_loop_detection',
      badge: 'WITH RECURSIVE & Grafos',
      icon: Repeat,
      color: 'from-fuchsia-600 to-pink-500',
      concept: 'Na bibliometria, a presença de circuitos de citação mútua ou indireta (A ➔ B ➔ C ➔ A) revela co-citações e reedições cruzadas.',
      howItWorks: 'Utiliza uma CTE recursiva que parte de cada artigo e abre as referências em Artigo_Artigo, mantendo o histórico de nós visitados em um array. Quando o nó destino coincide com o ponto de partida (prox.id = id_inicial), o ciclo é confirmado. O SELECT final filtra com precisão cirúrgica WHERE eh_ciclo = true, isolando apenas os loops.',
    },
    {
      title: 'Ranking do Melhor Framework por Dataset com HAVING em Citações',
      sqlId: 'dataset_framework_ranking',
      badge: 'DENSE_RANK & HAVING',
      icon: Trophy,
      color: 'from-amber-500 to-yellow-500',
      concept: 'Identifica qual framework atinge a melhor marca de velocidade para cada dataset, mas exige relevância acadêmica mínima comprovada por citações.',
      howItWorks: 'Cruza Dataset com Benchmark, Implementacao e Framework. Agrupa por dataset e framework para calcular MIN(tempo) e AVG(tempo). Utiliza a função analítica de janela DENSE_RANK() OVER (PARTITION BY dataset_id ORDER BY melhor_tempo_s ASC) para gerar o pódio e filtra via HAVING COALESCE(MAX(art.num_citacoes), 0) >= min.',
    },
    {
      title: 'Produtividade por Instituição com GROUP BY e HAVING por Área',
      sqlId: 'institution_researcher_productivity',
      badge: 'GROUP BY & HAVING',
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-500',
      concept: 'Avalia a força de pesquisa institucional, calculando a taxa de artigos gerados por pesquisador (produtividade média).',
      howItWorks: 'Realiza um GROUP BY nas instituições, aplicando contagens distintas COUNT(DISTINCT p.id) e COUNT(DISTINCT pub.artigo_id). A razão é computada de forma segura com NULLIF() para evitar divisão por zero. O HAVING filtra dinamicamente áreas de pesquisa através da função agregadora booleana BOOL_OR(p.area_pesquisa ILIKE $1).',
    },
    {
      title: 'Cadeia Recursiva de Citações com DENSE_RANK',
      sqlId: 'citation_recursive_network',
      badge: 'WITH RECURSIVE & RANK',
      icon: GitFork,
      color: 'from-violet-500 to-cyan-500',
      concept: 'Mapeia a linhagem de influência bibliográfica a partir do artigo mais citado de determinado tema.',
      howItWorks: 'Filtra os artigos candidatos pelo Framework ou Algoritmo escolhido, atribui ranking pelo número de citações com DENSE_RANK() e seleciona o artigo raiz (#1). Em seguida, uma CTE recursiva navega pelas citações até o 3º nível com prevenção estrita de ciclos infinitos.',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Sobre o Sistema: Esquema Relacional & Consultas Avançadas</h2>
            <p className="text-xs text-slate-400">
              Trabalho Prático de Banco de Dados II • UNESP • Modelagem Relacional & NoSQL Ready
            </p>
          </div>
        </div>
      </div>

      {/* Database Schema Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white">Esquema Relacional (24 Tabelas Modeladas)</h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          O banco de dados foi projetado a partir do diagrama conceitual EER sobre <strong>Sistemas de Processamento de Grafos em Larga Escala</strong>. 
          O esquema abrange desde o rigor científico (autoria, instituições, veículos e citações) até as minúcias de hardware e sistemas (NUMA, PMEM, GPU, estruturas de dados CSR e aplicações industriais).
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {tableDomains.map((dom, dIdx) => (
            <div key={dIdx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className={`h-3 w-3 rounded-full bg-gradient-to-r ${dom.color}`} />
                  <h4 className="text-sm font-bold text-white">{dom.domain}</h4>
                </div>
                <p className="text-xs text-slate-400 mb-4">{dom.description}</p>

                <div className="space-y-2">
                  {dom.tables.map((t) => (
                    <div key={t.name} className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <span className="font-mono font-bold text-indigo-300">{t.name}</span>
                      <span className="text-slate-400 text-[11px] sm:text-right">{t.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Queries Explanation */}
      <div className="space-y-4 pt-6 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white">A Ideia e Mecânica das Consultas Avançadas</h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Cada consulta complexa foi elaborada para responder a questões analíticas essenciais do domínio de grafos e ciência da computação, 
          combinando múltiplos operadores avançados do padrão SQL.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {queriesExplained.map((q) => {
            const Icon = q.icon;
            return (
              <div key={q.sqlId} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl bg-gradient-to-tr ${q.color} text-white`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white">{q.title}</h4>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {q.badge}
                    </span>
                  </div>

                  <div className="space-y-3 mt-4 text-xs">
                    <div>
                      <strong className="text-slate-300 block mb-1">Motivação no Domínio:</strong>
                      <p className="text-slate-400 leading-relaxed">{q.concept}</p>
                    </div>

                    <div>
                      <strong className="text-indigo-300 block mb-1">Engenharia SQL:</strong>
                      <p className="text-slate-400 leading-relaxed">{q.howItWorks}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>ID: {q.sqlId}</span>
                  <span className="text-indigo-400">Ver na aba Buscas Complexas ➔</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Software Architecture: Adapter Pattern */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 pt-6 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white">Arquitetura de Software: Padrão Adapter & NoSQL Ready</h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          O backend adota o <strong>Padrão de Projeto Adapter (GoF)</strong> para isolar completamente a camada de persistência.
          Tanto a camada de rotas Express quanto os componentes React comunicam-se exclusivamente através da interface <code className="text-indigo-300 font-mono">IDatabaseAdapter</code>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <h5 className="font-bold text-white flex items-center gap-1.5 mb-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> Contrato Unificado
            </h5>
            <p className="text-slate-400">
              Métodos padronizados (<code className="text-indigo-300">findAll</code>, <code className="text-indigo-300">create</code>, <code className="text-indigo-300">update</code>, <code className="text-indigo-300">executeComplexQuery</code>) que operam indiferente se o banco é relacional ou NoSQL.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <h5 className="font-bold text-white flex items-center gap-1.5 mb-1.5">
              <Database className="h-4 w-4 text-cyan-400" /> PostgreSQL (Neon)
            </h5>
            <p className="text-slate-400">
              Implementação <code className="text-indigo-300">PostgresAdapter</code> executando DDL, DML, CTEs, WITH RECURSIVE, DENSE_RANK() e pool de conexões otimizado na nuvem Neon.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <h5 className="font-bold text-white flex items-center gap-1.5 mb-1.5">
              <Binary className="h-4 w-4 text-purple-400" /> Migração NoSQL (Parte 2)
            </h5>
            <p className="text-slate-400">
              Implementação <code className="text-indigo-300">MongoAdapter</code> já estruturada para a Parte 2, traduzindo consultas analíticas para o MongoDB Aggregation Pipeline (<code className="text-indigo-300">$lookup</code>, <code className="text-indigo-300">$graphLookup</code>).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
