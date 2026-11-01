# GraphBench: Sistema de Avaliacao e Benchmark de Grafos
**UNESP - Trabalho Pratico de Banco de Dados II (Parte 1: Banco de Dados Relacional)**

**Repositorio GitHub:** [https://github.com/eduduuu/trabalho_1_bd_II](https://github.com/eduduuu/trabalho_1_bd_II)

**Autores:**
- Davi dos Santos Ferreira
- Eduardo Soares Bomfim
- Guilherme Maia Pavan
- Jamal Saboia

---

## Visao Geral do Projeto

Este projeto consiste em uma plataforma full-stack completa construida com **React (Vite + Tailwind CSS)** no frontend e **Node.js (Express)** no backend, conectada a um banco de dados **PostgreSQL na nuvem via Neon Serverless** (regiao AWS Sao Paulo: `aws-sa-east-1`).

O sistema gerencia, analisa e visualiza benchmarks empiricos de **Sistemas e Frameworks de Processamento de Grafos em Larga Escala** (DGAP, XPGraph, GraphOne, Ligra, GraphChi, Gemini, Galois, Gunrock, PowerGraph, GraphMat, Pregel, GraphX, cuGraph), algoritmos fundamentais (PageRank, BFS, SSSP, WCC, Triangle Counting, Louvain, Tarjan SCC), estruturas de dados indexadas (CSR, Dynamic CSR, Edge Lists), especificacoes de hardware (RAM, PMEM, GPU, nos NUMA) e a rede bibliografica de artigos cientificos e citacoes entre publicacoes.

---

## Estrutura do Esquema Relacional (24 Tabelas)

O banco de dados e composto por 24 tabelas distribuidas em 4 dominios:

### 1. Producao Cientifica & Autoria
- `Pessoa`: Cadastro de autores e pesquisadores (`id`, `cpf` unico, `nome`, `cargo`).
- `Instituicao`: Universidades e centros de pesquisa (`id`, `nome` unico, `localizacao`, `data_fundacao`).
- `Pesquisador`: Especializacao com chave estrangeira para `Pessoa` e `Instituicao`, `orcid` e `area_pesquisa`.
- `Artigo`: Publicacoes cientificas (`id`, `doi` unico, `titulo`, `data_publicacao`, `num_citacoes`).
- `Artigo_Artigo`: Grafo reflexivo direcionado de citacoes (`artigo_citando_id`, `artigo_citado_id`) com restricao `CHECK` impedindo auto-citacao e chaves com `ON DELETE CASCADE`.
- `Veiculo`: Conferencias (PPoPP, MICRO, FAST, SIGMOD, etc.) e periodicos de publicacao.
- `Publicacao`: Juncao ternaria associando `Artigo`, `Pesquisador` e `Veiculo`.

### 2. Frameworks & Algoritmos de Grafos
- `Framework`: Ferramentas avaliadas (`nome`, `tipo_aresta`, `tipo_consumo_grafo`, `linguagem`, `link_documentacao`).
- `Algoritmo`: Algoritmos classicos (`nome`, `data_criacao`, `pseudocodigo`).
- `Implementacao`: Par concreto de `Framework` x `Algoritmo`.
- `Estrutura_de_Dados`: CSR, Dynamic CSR, Edge List, Hash Table, GPU Frontier.
- `Complexidade`: Ordens assintoticas de alocacao, busca e insercao.
- `Tecnica_de_Otimizacao`: Tecnicas aplicadas (NUMA-Aware, Parallel Sliding Windows, Dual-Versioning, Warp-Level GPU).
- `Implementacao_Estrutura_Dados`: Estruturas de dados adotadas por implementacao.
- `Aplicacao_Tecnica_Otimizacao`: Tecnicas de otimizacao adotadas por implementacao.

### 3. Datasets & Benchmarking Experimental
- `Dataset`: Grafos do mundo real (LiveJournal, Twitter, Friendster, etc.) com volume de vertices e arestas.
- `Ambiente_de_Execucao`: Hardware experimental (CPU, RAM, GPU, nos NUMA, memoria persistente).
- `Benchmark`: Resultados empiricos de tempo de execucao (`tempo` em segundos, data, dataset, ambiente, implementacao).
- `Avaliacao_Artigo`: Implementacoes avaliadas experimentalmente em cada artigo.
- `Avaliacao_Dataset`: Datasets utilizados como base de teste em cada artigo.

### 4. Adocao Industrial & Mercado
- `Aplicacao`: Casos de uso industriais em organizacoes e Big Techs (Google, Amazon, Meta, Stripe, Netflix, Embrapa, Siemens).
- `Implementacao_Aplicacao`: Algoritmos e frameworks adotados em cada aplicacao.
- `Utilizacao_Aplicacao`: Engenheiros e especialistas responsaveis pelo sistema.
- `Aplicacao_Aplicacao`: Dependencias sistemicas entre aplicacoes de mercado.

---

## Diagramas do Projeto (MER e ER)

Os diagramas oficiais desenvolvidos para a modelagem do banco de dados relacional estao disponiveis no diretorio [`diagramas/`](./diagramas) e podem ser consultados e baixados diretamente na interface web (pagina "Sobre o Projeto"):

1. **Diagrama Conceitual (MER)**:
   - Arquivo original em PDF: [`diagramas/Diagrama_MER.pdf`](./diagramas/Diagrama_MER.pdf)
   - Pre-visualizacao em imagem: [`diagramas/Diagrama_MER.png`](./diagramas/Diagrama_MER.png)
   - Especifica entidades, atributos, cardinalidades e os relacionamentos do ecossistema, incluindo o auto-relacionamento reflexivo de citacoes e o atributo de contagem de citacoes em Artigo.

![Diagrama Conceitual MER](./diagramas/Diagrama_MER.png)

2. **Diagrama Logico Relacional (ER)**:
   - Arquivo original em imagem: [`diagramas/Diagrama_ER.jpeg`](./diagramas/Diagrama_ER.jpeg)
   - Especifica o mapeamento das 24 tabelas relacionais com chaves primarias (PK), chaves estrangeiras (FK), tipos de dados, tabela associativa reflexiva (`Artigo_Artigo`) e integridade referencial.

![Diagrama Logico Relacional ER](./diagramas/Diagrama_ER.jpeg)

---

## Consultas Avancadas em SQL

Todas as consultas analiticas estao documentadas e disponiveis com scripts SQL individuais na pasta [`consultas_avancadas/`](./consultas_avancadas):

1. **Cadeia Recursiva de Citacoes (`01_cadeia_recursiva_citacoes.sql`):**
   Usa `DENSE_RANK() OVER (ORDER BY num_citacoes DESC)` para isolar o artigo de maior impacto sobre um Framework ou Algoritmo e realiza travessia recursiva com `WITH RECURSIVE` e prevencao de ciclos em `ARRAY[...]` ate 3 niveis de profundidade.

2. **Deteccao de Ciclos / Loops de Citacoes (`02_deteccao_loops_citacao.sql`):**
   Percorre o grafo de referencias com `WITH RECURSIVE` e filtra no `SELECT` final exclusivamente os caminhos que fecham circuitos ciclicos de citacao (`WHERE eh_ciclo = true`).

3. **Ranking do Melhor Framework por Dataset com HAVING (`03_ranking_framework_dataset_having.sql`):**
   Calcula os tempos dos frameworks em cada dataset, ranqueia via `DENSE_RANK() OVER (PARTITION BY dataset_id ORDER BY melhor_tempo_s ASC)` e aplica filtro `HAVING COALESCE(MAX(art.num_citacoes), 0) >= min_citacoes`.

4. **Produtividade por Instituicao com GROUP BY e HAVING (`04_produtividade_instituicao_having.sql`):**
   Agrupa pesquisadores por instituicao, calcula a razao artigos/pesquisador (`COUNT(DISTINCT art) / COUNT(DISTINCT pesq)`) com protecao `NULLIF`, ordenando por quantidade de pesquisadores e filtrando via `HAVING BOOL_OR(p.area_pesquisa ILIKE $1)`.

5. **Ranking de Desempenho de Benchmarks (`05_ranking_desempenho_benchmarks.sql`):**
   Cruza 5 tabelas com calculo de vazao em arestas/segundo (`ROUND(d.qtd_arestas / tempo, 2)`).

6. **Rede Academica & Veiculos (`06_rede_academica_pesquisadores.sql`):**
   Cruza 6 tabelas mapeando pesquisadores, ORCID, filiacao institucional, artigos com DOI e conferencias.

7. **Matriz de Otimizacao & Estruturas de Dados (`07_matriz_otimizacao_estruturas.sql`):**
   Juncao com multiplos `LEFT JOIN` revelando estruturas de dados (CSR, listas) e tecnicas de hardware de cada framework.

8. **Adocao Industrial por Big Techs (`08_adocao_industrial_bigtechs.sql`):**
   Mapeia aplicacoes reais em empresas como Google, Amazon, Stripe e Netflix.

9. **Perfil de Escala de Hardware vs Datasets (`09_perfil_escala_hardware_datasets.sql`):**
   Cruza a escala dos grafos (milhoes de arestas/vertices) com nucleos de CPU, RAM, GPU e nos NUMA.

---

## Funcionalidades do Frontend (React)

- **Dashboard Geral:** Visao agregada dos frameworks vencedores por algoritmo, distribuicao de tipos de arestas, linguagens mais utilizadas, maiores datasets em escala e ranking paginado de instituicoes (5 por pagina).
- **CRUD Completo de 24 Entidades:**
  - Insercao, listagem paginada, busca textual, edicao e exclusao.
  - **Dropdowns Inteligentes de Chaves Estrangeiras:** formulários exibem nomes descritivos (ex: nome da instituicao, titulo do artigo, nome do framework) em vez de exigir IDs brutos.
- **Buscas Complexas:**
  - Execucao interativa das consultas analiticas com filtros dinamicos via seletores dropdown em tempo real (Framework, Algoritmo, Area de Pesquisa, Dataset, Empresa, etc.).
  - Formatacao visual com classificacao hierarquica, badges e trilhas de recursao interativas.
  - Inspecao e copia do codigo SQL executado com medicao de latencia em milissegundos.
- **Pagina "Sobre o Projeto":**
  - Documentacao interativa embutida com descricao das 24 tabelas e a mecanica das consultas complexas.

---

## Como Executar o Projeto

### Pre-requisitos
- Node.js (v18+)
- npm

### 1. Clonar o Repositorio e Instalar Dependencias
```bash
git clone https://github.com/eduduuu/trabalho_1_bd_II.git
cd trabalho_1_bd_II

# Instalacao das dependencias raiz, servidor e cliente
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

### 2. Configurar Variaveis de Ambiente
Crie o arquivo `server/.env` (ou `.env` na raiz):
```env
PORT=3001
DATABASE_URL="sua-connection-string-do-postgres"
DATABASE_URL_UNPOOLED="sua-connection-string-sem-pooler"
```

### 3. Compilar o Frontend e Iniciar a Aplicacao
```bash
# Compila os assets do React com Vite
npm run build

# Inicia o servidor unificado (Node Express serve a API e o React SPA)
npm start
```
Acesse em seu navegador: **http://localhost:3001**

### 4. Executar Testes Automatizados de Integracao
```bash
npm test
```
Executa a suite de **14 testes automatizados de ponta a ponta**, validando conectividade com o PostgreSQL, metadados das 24 tabelas, ciclo completo de CRUD e a execucao correta de todas as consultas analiticas avancadas.

---

## Hospedagem na Nuvem (Live Deployment no Render)

O projeto esta estruturado para execucao full-stack unificada em nuvem:
- **Banco de Dados Relacional**: Hospedado na nuvem no **Neon PostgreSQL** (regiao AWS Sao Paulo `aws-sa-east-1`), ja provisionado e populado.
- **Aplicacao Web (React + Express)**: Pronta para rodar como **Web Service gratuito** no **[Render](https://render.com)** (o Express serve a API REST e o bundle estatico do React compilado pelo Vite).

### Passo a Passo para Publicar no Render:
1. Acesse [render.com](https://render.com) e faca login com sua conta do GitHub.
2. No painel, clique em **New +** > **Web Service**.
3. Escolha o repositorio **`eduduuu/trabalho_1_bd_II`** e clique em **Connect**.
4. Configure os campos:
   - **Name**: `graphbench-unesp` (ou a sua escolha)
   - **Runtime**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. Na secao **Environment Variables**, adicione:
   - **`DATABASE_URL`**: `postgresql://neondb_owner:npg_AJeqZYok12WB@ep-late-art-b6g06a0g-pooler.c-2.sa-east-1.aws.neon.tech/neondb?sslmode=require`
6. Clique em **Deploy Web Service**.
   - O Render executara o build do React, instalara as dependencias e subira o servidor Express.
   - Ao concluir, voce recebera a URL publica com SSL ativo (ex: `https://graphbench-unesp.onrender.com`) para enviar ao professor.

---

## Estrutura de Diretorios

```
trabalho_1_bd_II/
├── diagramas/                  # Diagramas oficiais Conceitual (MER) e Logico (ER)
│   ├── Diagrama_MER.pdf        # Modelo Entidade-Relacionamento original em PDF
│   ├── Diagrama_MER.png        # Renderizacao grafica de alta resolucao do MER
│   └── Diagrama_ER.jpeg        # Diagrama Logico Relacional com as 24 tabelas
├── client/                     # Frontend SPA em React (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/         # Navbar, Layout e componentes modulares
│   │   ├── pages/              # Dashboard, CrudManager, ComplexQueries, AboutProject
│   │   └── services/           # Cliente HTTP da API REST
│   └── package.json
├── server/                     # Backend REST API em Node.js (Express)
│   ├── src/
│   │   ├── controllers/        # Controladores CRUD e de Consultas Complexas
│   │   ├── repositories/       # Camada de acesso aos dados PostgreSQL
│   │   └── routes/             # Rotas REST (/api/crud, /api/queries, /api/status)
│   ├── .env.example            # Modelo de configuracao de ambiente
│   └── package.json
├── database/                   # Definicoes de DDL e DML
│   ├── schema.sql              # Esquema DDL das 24 tabelas com constraints
│   ├── seed.sql                # Dados de semente para povoamento
│   └── setup.js                # Script de execucao e migracao
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
├── test-api.js                 # Suite automatizada de testes de integracao (14 testes)
├── package.json                # Scripts npm raiz (start, test, build, dev)
└── README.md                   # Documentacao geral do repositorio
```
