# Consultas Avançadas em SQL (PostgreSQL / Relacional)

Este diretório reúne as consultas analíticas avançadas implementadas para o sistema de benchmarking e análise de frameworks de grafos. As consultas exploram recursos modernos e avançados da linguagem SQL, como **Common Table Expressions (CTEs)**, **Recursão (`WITH RECURSIVE`)**, **Funções de Janela Analíticas (`DENSE_RANK() OVER (PARTITION BY ...)`)**, **Agrupamentos com Filtragem (`GROUP BY` e `HAVING`)** e **Junções Complexas (Multi-table `JOIN` e `LEFT JOIN`)**.

---

## Sumário das Consultas

| Arquivo | Título | Conceitos SQL Principais | Descrição Resumida |
| :--- | :--- | :--- | :--- |
| [`01_cadeia_recursiva_citacoes.sql`](./01_cadeia_recursiva_citacoes.sql) | Cadeia Recursiva de Citações | `WITH RECURSIVE`, `DENSE_RANK()`, `ARRAY`, `ANY()` | Seleciona o artigo de maior impacto no tema e percorre a rede de citações até nível 3 com prevenção de ciclos. |
| [`02_deteccao_loops_citacao.sql`](./02_deteccao_loops_citacao.sql) | Detecção de Loops de Citações | `WITH RECURSIVE`, Ciclos em Grafos, `ARRAY` | Percorre a rede reflexiva de citações e isola exclusivamente caminhos que formam loops fechados. |
| [`03_ranking_framework_dataset_having.sql`](./03_ranking_framework_dataset_having.sql) | Ranking de Framework por Dataset | `DENSE_RANK() OVER (PARTITION BY ...)`, `HAVING` | Ranqueia o framework mais rápido por dataset e filtra por contagem mínima de citações do artigo. |
| [`04_produtividade_instituicao_having.sql`](./04_produtividade_instituicao_having.sql) | Produtividade por Instituição | `GROUP BY`, `HAVING`, `BOOL_OR`, `NULLIF` | Agrupa pesquisadores por instituição, calcula razão artigos/pesquisador e filtra por área de pesquisa. |
| [`05_ranking_desempenho_benchmarks.sql`](./05_ranking_desempenho_benchmarks.sql) | Ranking Geral de Benchmarks | `JOIN` (5 tabelas), Throughput (`arestas/s`) | Cruza tempos de benchmark com volume de arestas para aferir taxa de processamento. |
| [`06_rede_academica_pesquisadores.sql`](./06_rede_academica_pesquisadores.sql) | Rede Acadêmica e Veículos | `JOIN` (6 tabelas), Ordenação Composta | Mapeia pesquisadores, ORCIDs, instituições, artigos com DOI e veículos de conferência/revista. |
| [`07_matriz_otimizacao_estruturas.sql`](./07_matriz_otimizacao_estruturas.sql) | Matriz de Otimização e Estruturas | Múltiplos `LEFT JOIN`, `COALESCE` | Relaciona frameworks a estruturas de dados (CSR, listas) e técnicas de otimização aplicadas. |
| [`08_adocao_industrial_bigtechs.sql`](./08_adocao_industrial_bigtechs.sql) | Adoção Industrial de Grafos | `LEFT JOIN` (6 tabelas), Casos de Mercado | Identifica empresas reais (Google, Amazon, Meta, etc.), licenças e responsáveis técnicos. |
| [`09_perfil_escala_hardware_datasets.sql`](./09_perfil_escala_hardware_datasets.sql) | Perfil de Escala vs Hardware | `JOIN` de Escala, Conversão MB | Cruza volume do dataset (vértices/arestas) com hardware utilizado (RAM, PMEM, GPU, nós NUMA). |

---

## Detalhamento Técnico das Consultas

### 1. `01_cadeia_recursiva_citacoes.sql`
- **Motivação**: Na literatura científica, um framework inovador é referenciado por trabalhos derivados que, por sua vez, citam outros trabalhos. Para investigar a linhagem de influência, precisamos selecionar o artigo mais influente de um tópico e abrir sua árvore de citações.
- **Tabelas Envolvidas**: `Artigo`, `Avaliacao_Artigo`, `Implementacao`, `Framework`, `Algoritmo`, `Artigo_Artigo`.
- **Estratégia**:
  1. CTE `artigos_candidatos`: localiza todos os artigos associados ao Framework ou Algoritmo filtrado.
  2. CTE `artigo_ranqueado`: atribui um ranking denso via `DENSE_RANK() OVER (ORDER BY num_citacoes DESC)` para escolher o artigo raiz (#1).
  3. `WITH RECURSIVE cadeia_citacoes`:
     - **Âncora**: Artigo raiz no nível 0, inicializando o array de nós visitados `ARRAY[r.artigo_id]`.
     - **Recursão**: Faz join de `cadeia_citacoes` com `Artigo_Artigo` e `Artigo`, concatenando títulos no formato breadcrumb (`A ➔ B ➔ C`), incrementando o nível e verificando `NOT (prox.id = ANY(ids_visitados))` para evitar ciclos infinitos. Condição de parada: `nivel < 3`.

---

### 2. `02_deteccao_loops_citacao.sql`
- **Motivação**: Em grafos direcionados de citações, a presença de ciclos (Artigo A cita B, B cita C e C cita A) representa co-citações em retrospectivas, versões estendidas ou reedições mútuas. A consulta isola e comprova esses ciclos.
- **Tabelas Envolvidas**: `Artigo`, `Artigo_Artigo`.
- **Estratégia**:
  - `WITH RECURSIVE caminhos_citacoes`:
    - Começa em cada aresta `Artigo_Artigo` (ou de um artigo filtrado).
    - No passo recursivo, caminha pelas referências concatenando o histórico de IDs.
    - Avalia a condição booleana `(prox.artigo_citado_id = c.id_inicial)` que identifica quando o destino é o próprio nó que iniciou o caminho.
  - No `SELECT` final, aplica a restrição estrita: `WHERE eh_ciclo = true`, retornando apenas os circuitos fechados e a extensão de cada ciclo.

---

### 3. `03_ranking_framework_dataset_having.sql`
- **Motivação**: Avaliar qual framework atinge a melhor marca de tempo para cada conjunto de dados (dataset) de teste, mas restringindo a comparação apenas a frameworks cujos artigos fundacionais tenham credibilidade comprovada pela comunidade (mínimo de citações).
- **Tabelas Envolvidas**: `Dataset`, `Benchmark`, `Implementacao`, `Framework`, `Avaliacao_Artigo`, `Artigo`.
- **Estratégia**:
  - Agrupa por dataset e framework (`GROUP BY d.id, f.id...`).
  - Utiliza `HAVING COALESCE(MAX(art.num_citacoes), 0) >= :min_citacoes` para filtrar o agregado no pós-agrupamento.
  - Aplica a função de janela analítica `DENSE_RANK() OVER (PARTITION BY dataset_id ORDER BY melhor_tempo_s ASC)` para produzir a classificação do 1º ao N-ésimo framework dentro de cada dataset separadamente.

---

### 4. `04_produtividade_instituicao_having.sql`
- **Motivação**: Avaliar a produção acadêmica das instituições de ensino e centros de pesquisa, comparando o quadro de pesquisadores com o total de artigos produzidos e a razão média de produtividade por pesquisador.
- **Tabelas Envolvidas**: `Instituicao`, `Pesquisador`, `Publicacao`, `Artigo`.
- **Estratégia**:
  - Agrupa por instituição (`GROUP BY inst.id, inst.nome, inst.localizacao`).
  - Calcula a contagem distinta de pesquisadores (`COUNT(DISTINCT p.id)`) e artigos (`COUNT(DISTINCT pub.artigo_id)`).
  - Trata potenciais divisões por zero com `NULLIF(..., 0)` e arredonda a razão com `ROUND(..., 2)`.
  - No `HAVING`, utiliza `BOOL_OR(p.area_pesquisa ILIKE '%' || :area_pesquisa || '%')` para permitir filtragem condicional sem excluir o agrupamento caso o usuário não informe área de pesquisa.
