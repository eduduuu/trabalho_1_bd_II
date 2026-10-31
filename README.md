# GraphBench: Sistema de Avaliação e Benchmark de Grafos
**UNESP - Trabalho Prático de Banco de Dados II (Parte 1: Relacional & Preparado para NoSQL)**

**Repositório GitHub:** [https://github.com/eduduuu/trabalho_1_bd_II](https://github.com/eduduuu/trabalho_1_bd_II)

**Autores:**
- Davi dos Santos Ferreira
- Eduardo Soares Bomfim
- Guilherme Maia Pavan
- Jamal Saboia

---

## 📌 Visão Geral do Projeto

Este projeto consiste em uma plataforma full-stack completa construída com **React (Vite + Tailwind CSS)** no frontend e **Node.js (Express)** no backend, conectada a um banco de dados **PostgreSQL na nuvem via Neon Serverless** (região AWS São Paulo: `aws-sa-east-1`).

O sistema gerencia, analisa e visualiza benchmarks empíricos de **Sistemas e Frameworks de Processamento de Grafos em Larga Escala** (DGAP, XPGraph, GraphOne, Ligra, GraphChi, Gemini, Galois, Gunrock, PowerGraph, GraphMat), algoritmos fundamentais (PageRank, BFS, SSSP, WCC, Triangle Counting), estruturas de dados indexadas (CSR, Dynamic CSR, Edge Lists), especificações de hardware (RAM, PMEM, GPU, nós NUMA) e a rede bibliográfica de artigos científicos e citações entre publicações.

---

## 🏛️ Padrão de Arquitetura: Adapter Pattern (NoSQL Ready)

Para atender a todos os requisitos da **Parte 1 (Relacional)** e antecipar a **Parte 2 (Migração NoSQL / MongoDB)** sem necessidade de refatoração no frontend ou nas rotas, a aplicação emprega o **Database Adapter Pattern (GoF)**:

```
                 ┌────────────────────────────────────────────────┐
                 │          Frontend React (Vite SPA)             │
                 └───────────────────────┬────────────────────────┘
                                         │ Chamadas REST JSON
                 ┌───────────────────────▼────────────────────────┐
                 │       Express Controllers & Middlewares        │
                 └───────────────────────┬────────────────────────┘
                                         │ Contrato Único
                 ┌───────────────────────▼────────────────────────┐
                 │         Interface: IDatabaseAdapter            │
                 └───────────────┬────────────────────────┬───────┘
                                 │                        │
                 ┌───────────────▼──────────────┐  ┌──────▼───────────────────────┐
                 │  PostgresAdapter (Ativo)     │  │  MongoAdapter (Parte 2 NoSQL)│
                 │  - Pool Neon Serverless (pg) │  │  - Tradução para Coleções    │
                 │  - CTEs & WITH RECURSIVE     │  │  - Aggregation Pipelines     │
                 │  - Window Functions & HAVING │  │  - $graphLookup para grafos  │
                 └──────────────────────────────┘  └──────────────────────────────┘
```

### Como alternar entre Relacional e NoSQL:
Basta alterar no arquivo `server/.env`:
```env
DB_ADAPTER=mongodb
MONGODB_URI="mongodb://localhost:27017/graphdb"
```
Toda a interface web, CRUDs e controllers permanecem inalterados!

---

## 📊 Estrutura do Esquema Relacional (24 Tabelas)

O banco de dados é composto por 24 tabelas distribuídas em 4 domínios:

### 1. Produção Científica & Autoria
- `Pessoa`: Cadastro de autores e pesquisadores (`id`, `cpf` único, `nome`, `cargo`).
- `Instituicao`: Universidades e centros de pesquisa (`id`, `nome` único, `localizacao`, `data_fundacao`).
- `Pesquisador`: Especialização com chave estrangeira para `Pessoa` e `Instituicao`, `orcid` e `area_pesquisa`.
- `Artigo`: Publicações científicas (`id`, `doi` único, `titulo`, `data_publicacao`, `num_citacoes`).
- `Artigo_Artigo`: Grafo reflexivo direcionado de citações (`artigo_citando_id`, `artigo_citado_id`) com restrição `CHECK` impedindo auto-citação e chaves com `ON DELETE CASCADE`.
- `Veiculo`: Conferências (PPoPP, MICRO, FAST, etc.) e periódicos de publicação.
- `Publicacao`: Junção ternária associando `Artigo`, `Pesquisador` e `Veiculo`.

### 2. Frameworks & Algoritmos de Grafos
- `Framework`: Ferramentas avaliadas (`nome`, `tipo_aresta`, `tipo_consumo_grafo`, `linguagem`, `link_documentacao`).
- `Algoritmo`: Algoritmos clássicos (`nome`, `data_criacao`, `pseudocodigo`).
- `Implementacao`: Par concreto de `Framework` x `Algoritmo`.
- `Estrutura_de_Dados`: CSR, Dynamic CSR, Edge List, Hash Table.
- `Complexidade`: Ordens assintóticas de alocação, busca e inserção.
- `Tecnica_de_Otimizacao`: Técnicas aplicadas (NUMA-Aware, Parallel Sliding Windows, Dual-Versioning).
- `Implementacao_Estrutura_Dados`: Estruturas de dados adotadas por implementação.
- `Aplicacao_Tecnica_Otimizacao`: Técnicas de otimização adotadas por implementação.

### 3. Datasets & Benchmarking Experimental
- `Dataset`: Grafos do mundo real (LiveJournal, Twitter, Friendster, etc.) com volume de vértices e arestas.
- `Ambiente_de_Execucao`: Hardware experimental (CPU, RAM, GPU, nós NUMA, memória persistente).
- `Benchmark`: Resultados empíricos de tempo de execução (`tempo` em segundos, data, dataset, ambiente, implementação).
- `Avaliacao_Artigo`: Implementações avaliadas experimentalmente em cada artigo.
- `Avaliacao_Dataset`: Datasets utilizados como base de teste em cada artigo.

### 4. Adoção Industrial & Mercado
- `Aplicacao`: Casos de uso industriais em Big Techs (Google, Amazon, Meta, Stripe, Netflix).
- `Implementacao_Aplicacao`: Algoritmos e frameworks adotados em cada aplicação.
- `Utilizacao_Aplicacao`: Engenheiros e especialistas responsáveis pelo sistema.
- `Aplicacao_Aplicacao`: Dependências sistêmicas entre aplicações de mercado.

---

## 🔍 Consultas Avançadas em SQL

Todas as consultas analíticas estão documentadas e disponíveis com scripts SQL individuais na pasta [`consultas_avancadas/`](./consultas_avancadas):

1. **Cadeia Recursiva de Citações (`01_cadeia_recursiva_citacoes.sql`):**
   Usa `DENSE_RANK() OVER (ORDER BY num_citacoes DESC)` para isolar o artigo de maior impacto sobre um Framework ou Algoritmo e realiza travessia recursiva com `WITH RECURSIVE` e prevenção de ciclos em `ARRAY[...]` até 3 níveis de profundidade.
2. **Detecção de Ciclos / Loops de Citações (`02_deteccao_loops_citacao.sql`):**
   Percorre o grafo de referências com `WITH RECURSIVE` e filtra no `SELECT` final exclusivamente os caminhos que fecham circuitos cíclicos de citação (`WHERE eh_ciclo = true`).
3. **Ranking do Melhor Framework por Dataset com HAVING (`03_ranking_framework_dataset_having.sql`):**
   Calcula os tempos dos frameworks em cada dataset, ranqueia via `DENSE_RANK() OVER (PARTITION BY dataset_id ORDER BY melhor_tempo_s ASC)` e aplica filtro `HAVING COALESCE(MAX(art.num_citacoes), 0) >= min_citacoes`.
4. **Produtividade por Instituição com GROUP BY e HAVING (`04_produtividade_instituicao_having.sql`):**
   Agrupa pesquisadores por instituição, calcula a razão artigos/pesquisador (`COUNT(DISTINCT art) / COUNT(DISTINCT pesq)`) com proteção `NULLIF`, ordenando por quantidade de pesquisadores e filtrando via `HAVING BOOL_OR(p.area_pesquisa ILIKE $1)`.
5. **Ranking de Desempenho de Benchmarks (`05_ranking_desempenho_benchmarks.sql`):**
   Cruza 5 tabelas com cálculo de vazão em arestas/segundo (`ROUND(d.qtd_arestas / tempo, 2)`).
6. **Rede Acadêmica & Veículos (`06_rede_academica_pesquisadores.sql`):**
   Cruza 6 tabelas mapeando pesquisadores, ORCID, filiação institucional, artigos com DOI e conferências.
7. **Matriz de Otimização & Estruturas de Dados (`07_matriz_otimizacao_estruturas.sql`):**
   Junção com múltiplos `LEFT JOIN` revelando estruturas de dados (CSR, listas) e técnicas de hardware de cada framework.
8. **Adoção Industrial por Big Techs (`08_adocao_industrial_bigtechs.sql`):**
   Mapeia aplicações reais em empresas como Google, Amazon, Stripe e Netflix.
9. **Perfil de Escala de Hardware vs Datasets (`09_perfil_escala_hardware_datasets.sql`):**
   Cruza a escala dos grafos (milhões de arestas/vértices) com núcleos de CPU, RAM, GPU e nós NUMA.

---

## 💻 Funcionalidades do Frontend (React)

- **Dashboard Geral:** Visão agregada dos frameworks vencedores por algoritmo, distribuição de tipos de arestas, linguagens mais utilizadas e maiores datasets em escala.
- **CRUD Completo de 24 Entidades:**
  - Inserção, listagem paginada, busca textual, edição e exclusão.
  - **Dropdowns Inteligentes de Chaves Estrangeiras:** formulários exibem nomes humanizados (ex: nome da instituição, título do artigo, nome do framework) em vez de exigir IDs brutos.
- **Buscas Complexas:**
  - Execução interativa das consultas analíticas com filtros dinâmicos em tempo real.
  - Formatação visual com pódios (`🥇`, `🥈`, `🥉`), badges hierárquicos e trilhas de recursão com chips e setas interativas.
  - Inspeção e cópia do código SQL executado com medição de latência em milissegundos.
- **Página "Sobre o Projeto":**
  - Documentação interativa embutida com descrição das 24 tabelas e a mecânica das consultas complexas.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v18+)
- npm

### 1. Clonar o Repositório e Instalar Dependências
```bash
git clone https://github.com/eduduuu/trabalho_1_bd_II.git
cd trabalho_1_bd_II

# Instalação das dependências raiz, servidor e cliente
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

### 2. Configurar Variáveis de Ambiente
Crie o arquivo `server/.env` (use o modelo `server/.env.example`):
```env
PORT=3001
DB_ADAPTER=postgres
DATABASE_URL="sua-connection-string-do-postgres"
DATABASE_URL_UNPOOLED="sua-connection-string-sem-pooler"
MONGODB_URI="mongodb://localhost:27017/graphdb"
```

### 3. Compilar o Frontend e Iniciar a Aplicação
```bash
# Compila os assets do React com Vite
cd client && npm run build && cd ..

# Inicia o servidor unificado (Node Express serve a API e o React SPA)
npm start
```
Acesse em seu navegador: **http://localhost:3001**

### 4. Executar Testes Automatizados de Integração
```bash
npm test
```
Executa a suíte de **14 testes automatizados de ponta a ponta**, validando conectividade com o Neon, metadados das 24 tabelas, ciclo completo de CRUD e a execução correta de todas as consultas analíticas avançadas.

---

## 📁 Estrutura de Diretórios

```
trabalho_1_bd_II/
├── client/                     # Frontend SPA em React (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/         # Navbar, Layout e componentes modulares
│   │   ├── pages/              # Dashboard, CrudManager, ComplexQueries, AboutProject
│   │   └── services/           # Cliente HTTP da API REST
│   └── package.json
├── server/                     # Backend REST API em Node.js (Express)
│   ├── src/
│   │   ├── adapters/           # Database Adapter Pattern (PostgresAdapter, MongoAdapter)
│   │   ├── controllers/        # Controladores CRUD e de Consultas Complexas
│   │   └── routes/             # Rotas REST (/api/crud, /api/queries, /api/status)
│   ├── .env.example            # Modelo de configuração de ambiente
│   └── package.json
├── database/                   # Definições de DDL e DML
│   ├── schema.sql              # Esquema DDL das 24 tabelas com constraints
│   └── seed.sql                # Dados de semente para povoamento
├── consultas_avancadas/        # Scripts SQL independentes e documentados
│   ├── 01_cadeia_recursiva_citacoes.sql
│   ├── 02_deteccao_loops_citacao.sql
│   ├── 03_ranking_framework_dataset_having.sql
│   ├── 04_produtividade_instituicao_having.sql
│   ├── 05_ranking_desempenho_benchmarks.sql
│   ├── 06_rede_academica_pesquisadores.sql
│   ├── 07_matriz_otimizacao_estruturas.sql
│   ├── 08_adocao_industrial_bigtechs.sql
│   ├── 09_perfil_escala_hardware_datasets.sql
│   └── README.md
├── test-api.js                 # Suíte automatizada de testes de integração (14 testes)
├── package.json                # Scripts npm raiz (start, test, build, dev)
└── README.md                   # Documentação geral do repositório
```
