-- ============================================================================
-- GRAPHBENCH - SEED COMPLETO E ENRIQUECIDO COM DADOS REAIS
-- Domínio: Computação em Grafos, HPC, Sistemas de Armazenamento e Bancos de Dados
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. PESSOA
-- ----------------------------------------------------------------------------
INSERT INTO Pessoa (cpf, nome, cargo) VALUES
-- Pesquisadores de DGAP / XPGraph / GraphOne
('11111111111', 'Abdullah Al Raqibul Islam', 'PhD Student'),
('22222222222', 'Dong Dai', 'Professor'),
('33333333333', 'Rui Wang', 'Researcher'),
('44444444444', 'Pradeep Kumar', 'PhD Student'),
('55555555555', 'H. Howie Huang', 'Professor'),
-- Pesquisadores Pioneiros Internacionais
('66666666666', 'Julian Shun', 'Professor'),
('77777777777', 'Aapo Kyrola', 'Researcher'),
('88888888888', 'Xiaowei Zhu', 'Professor'),
('99999999999', 'Keshav Pingali', 'Professor'),
('10101010101', 'Yangzihao Wang', 'Researcher'),
('12121212121', 'Matei Zaharia', 'Associate Professor'),
('13131313131', 'Joseph E. Gonzalez', 'Associate Professor'),
('14141414141', 'Carlos Guestrin', 'Professor'),
('15151515151', 'Grzegorz Malewicz', 'Senior Research Scientist'),
('16161616161', 'Tim Davis', 'Professor'),
('17171717171', 'Leslie Valiant', 'Professor Emeritus'),
('18181818181', 'John D. Owens', 'Professor'),
('19191919191', 'Wenting Zheng', 'Assistant Professor'),
('20202020202', 'Torsten Hoefler', 'Professor'),
('21212121212', 'Michael Stonebraker', 'Professor'),
('23232323232', 'Jennifer Widom', 'Professor'),
('24242424242', 'Jure Leskovec', 'Professor'),
-- Pesquisadores Brasileiros (UNESP, USP, UNICAMP)
('25252525252', 'Eduardo Morgado', 'Professor Titular'),
('26262626262', 'Celso Oliveira', 'Professor Associado'),
('27272727272', 'Mariana Alvim', 'Pesquisadora Doutora'),
('28282828282', 'Lucas Rodrigues', 'Doutorando'),
('29292929292', 'Beatriz Castilho', 'Professora Doutora'),
('30303030303', 'Renato Franca', 'Pesquisador Sênior'),
('31313131313', 'Camila Guimaraes', 'Doutoranda'),
('32323232323', 'Fernando Magalhaes', 'Professor Titular'),
('33333333334', 'Juliana Takahashi', 'Pesquisadora'),
('34343434343', 'Thiago Sampaio', 'Engenheiro de Dados'),
('35353535353', 'Patricia Fontes', 'Engenheira de Sistemas');

-- ----------------------------------------------------------------------------
-- 2. INSTITUICAO
-- ----------------------------------------------------------------------------
INSERT INTO Instituicao (nome, data_fundacao, localizacao) VALUES
('UNC Charlotte', '1946-09-23', 'Charlotte, North Carolina, USA'),
('Zhejiang University', '1897-05-21', 'Hangzhou, Zhejiang, China'),
('George Washington University', '1821-02-09', 'Washington, D.C., USA'),
('Stanford University', '1885-10-01', 'Stanford, California, USA'),
('MIT', '1861-04-10', 'Cambridge, Massachusetts, USA'),
('Carnegie Mellon University', '1900-11-15', 'Pittsburgh, Pennsylvania, USA'),
('Tsinghua University', '1911-04-29', 'Beijing, China'),
('University of Texas at Austin', '1883-09-15', 'Austin, Texas, USA'),
('UC Davis', '1905-01-01', 'Davis, California, USA'),
('Microsoft Research', '1991-09-01', 'Redmond, Washington, USA'),
('UC Berkeley', '1868-03-23', 'Berkeley, California, USA'),
('ETH Zurich', '1855-02-07', 'Zurich, Switzerland'),
('Google Research', '1998-09-04', 'Mountain View, California, USA'),
('Texas A&M University', '1876-10-04', 'College Station, Texas, USA'),
('Harvard University', '1636-09-08', 'Cambridge, Massachusetts, USA'),
('UNESP', '1976-01-30', 'Sao Paulo, Brasil'),
('USP', '1934-01-25', 'Sao Paulo, Brasil'),
('UNICAMP', '1966-10-05', 'Campinas, Sao Paulo, Brasil'),
('Intel Labs', '1968-07-18', 'Santa Clara, California, USA'),
('Nvidia Research', '1993-04-05', 'Santa Clara, California, USA');

-- ----------------------------------------------------------------------------
-- 3. ARTIGO
-- ----------------------------------------------------------------------------
INSERT INTO Artigo (doi, data_publicacao, titulo, num_citacoes) VALUES
-- Artigos Originais do Estudo
('10.1145/DGAP2024', '2024-03-05', 'DGAP: Efficient Dynamic Graph Analysis on Persistent Memory', 48),
('10.1109/MICRO56248.2022.00091', '2022-10-01', 'XPGraph: XPline-Friendly Persistent Memory Graph Stores', 112),
('10.5555/FAST19.227800', '2019-02-25', 'GraphOne: A Data Store for Real-time Analytics on Evolving Graphs', 345),
('10.1145/2442516.2442530', '2013-02-23', 'Ligra: A Lightweight Graph Processing Framework for Shared Memory', 1580),
('10.5555/2387880.2387884', '2012-10-08', 'GraphChi: Large-Scale Graph Computation on Just a PC', 2310),
('10.5555/3026877.3026883', '2016-11-02', 'Gemini: A Computation-Centric Distributed Graph Processing System', 940),
('10.1145/2503210.2503214', '2013-10-22', 'The Galois System for Graph Processing', 780),
('10.1145/2851141.2851145', '2016-03-12', 'Gunrock: A High-Performance Graph Processing Library on the GPU', 710),
('10.5555/2387880.2387882', '2012-10-08', 'PowerGraph: Distributed Graph-Parallel Computation', 3120),
('10.14778/2824032.2824033', '2015-08-01', 'GraphMat: High performance graph analytics made productive', 465),
-- Artigos Clássicos e Contemporâneos de Grafos & Big Data
('10.1145/1807167.1807184', '2010-06-06', 'Pregel: A System for Large-Scale Graph Processing', 4890),
('10.5555/2685048.2685096', '2014-10-06', 'GraphX: Graph Processing in a Distributed Dataflow Framework', 1850),
('10.1145/3318464.3389731', '2020-06-14', 'GraphScope: A One-Stop Large-Scale Graph Computing System', 220),
('10.14778/2732951.2732958', '2015-02-01', 'FlashGraph: Processing Billions-Scale Graphs with SSD Arrays', 315),
('10.1109/TKDE.2016.2574312', '2016-05-30', 'Parallel Community Detection in Complex Networks Using Louvain', 590),
('10.1145/2535771.2535785', '2014-04-13', 'CuSha: Vertex-Centric Graph Processing on GPUs', 380),
('10.1145/3087801.3087809', '2017-06-23', 'GraphGrind: Addressing NUMA Bottlenecks in Graph Analytics', 165),
('10.1145/3282894.3282897', '2019-01-15', 'Triton: Scalable Dynamic Graph Processing on Persistent Memory', 130),
('10.1145/3542929.3563470', '2022-11-13', 'cuGraph: Accelerating Graph Analytics at Scale with GPUs', 275),
('10.1145/2049662.2049663', '2011-10-23', 'GraphLab: A New Framework For Parallel Machine Learning on Graphs', 2420),
-- Artigos Brasileiros e de Avaliação Comparativa
('10.1007/s10586-021-03482-1', '2021-11-20', 'Benchmarking Shared-Memory Graph Processing in Modern Multi-core CPUs', 85),
('10.1109/SBAC-PAD.2023.00015', '2023-10-18', 'High-Performance Graph Partitioning on NUMA Architectures', 35),
('10.5753/jidm.2022.2541', '2022-08-12', 'Evaluating Large Scale Graph Databases: Neo4j vs Distributed Stores', 62),
('10.1145/3448016.3457312', '2021-06-20', 'A Comprehensive Survey on Dynamic Graph Processing Systems', 410),
('10.1109/SC.2020.00034', '2020-11-09', 'Scalable GPU-Accelerated Betweenness Centrality on Heterogeneous Clusters', 195);

-- ----------------------------------------------------------------------------
-- 4. FRAMEWORK
-- ----------------------------------------------------------------------------
INSERT INTO Framework (nome, tipo_aresta, diagrama, tipo_consumo_grafo, linguagem, link_documentacao) VALUES
('DGAP', 'Dinâmica', 'Dynamic CSR with PM-optimized append-only edge log', 'Memória Persistente', 'C++', 'https://github.com/DIR-LAB/DGAP'),
('XPGraph', 'Dinâmica', 'XPLine-friendly model, hierarchical vertex buffer', 'Memória Persistente NUMA', 'C++', 'https://github.com/rwang067/XPGraph'),
('GraphOne', 'Dinâmica', 'Dual versioning, Edge list and Adjacency list', 'Em Memória / Disco', 'C++', 'https://github.com/the-data-lab/GraphOne'),
('Ligra', 'Estática', 'Shared-memory vertex subset mapping', 'Em Memória', 'C++', 'https://github.com/jshun/ligra'),
('GraphChi', 'Estática', 'Parallel Sliding Windows (PSW)', 'Disco (Out-of-core)', 'C++', 'https://github.com/GraphChi/graphchi-cpp'),
('Gemini', 'Estática', 'Dual-mode edge processing, chunk-based partitioning', 'Distribuído', 'C++', 'https://github.com/thu-pacman/GeminiGraph'),
('Galois', 'Dinâmica', 'Data-driven parallel loop scheduling', 'Em Memória', 'C++', 'https://github.com/IntelligentSoftwareSystems/Galois'),
('Gunrock', 'Estática', 'Bulk-synchronous data-centric GPU frontier', 'GPU VRAM', 'CUDA/C++', 'https://github.com/gunrock/gunrock'),
('PowerGraph', 'Estática', 'Gather-Apply-Scatter (GAS) model', 'Distribuído', 'C++', 'https://github.com/dato-code/PowerGraph'),
('GraphMat', 'Estática', 'Graph algorithms mapped to sparse matrix operations', 'Em Memória', 'C++', 'https://github.com/IntelLabs/GraphMat'),
('Pregel', 'Estática', 'Bulk Synchronous Parallel (BSP) message passing', 'Distribuído', 'C++', 'https://kowshik.github.io/JPregel/'),
('GraphX', 'Estática', 'Resilient Distributed Graph (RDG) on Spark', 'Distribuído', 'Scala', 'https://spark.apache.org/graphx/'),
('cuGraph', 'Estática', 'RAPIDS GPU Accelerated Graph Framework', 'GPU VRAM', 'CUDA/Python/C++', 'https://github.com/rapidsai/cugraph'),
('FlashGraph', 'Estática', 'Semi-external memory with fast NVMe array', 'Array SSD NVMe', 'C++', 'https://github.com/FlashGraph/FlashGraph'),
('GraphScope', 'Dinâmica', 'Unified multi-engine distributed graph computing', 'Distribuído', 'C++/Python', 'https://graphscope.io/'),
('Neo4j', 'Dinâmica', 'Index-Free Adjacency Property Graph Engine', 'Disco / Memória', 'Java', 'https://neo4j.com/docs/'),
('TigerGraph', 'Dinâmica', 'Native Parallel Graph (NPG) engine', 'Distribuído / Memória', 'C++', 'https://docs.tigergraph.com/'),
('GraphLab', 'Dinâmica', 'Asynchronous shared memory graph model', 'Distribuído', 'C++', 'https://github.com/graphlab-code/graphlab');

-- ----------------------------------------------------------------------------
-- 5. ALGORITMO
-- ----------------------------------------------------------------------------
INSERT INTO Algoritmo (nome, data_criacao, pseudocodigo) VALUES
('PageRank', '1998-01-01', 'v.rank = 0.15 + 0.85 * sum(u.rank / u.out_degree) for u in v.in_edges'),
('BFS', '1959-01-01', 'Queue q; q.push(root); while(!q.empty()){ v=q.pop(); for(u in v.neighbors) if(!visited[u]) q.push(u); }'),
('SSSP', '1956-01-01', 'dist[v] = min(dist[v], dist[u] + weight(u,v)) via relaxation loop'),
('WCC', '1972-01-01', 'Propagate min component ID to all neighbors iteratively until convergence'),
('Triangle Counting', '1978-01-01', 'For each edge(u,v), count intersection of u.neighbors and v.neighbors'),
('K-Core', '1983-01-01', 'Iteratively remove vertices with degree < K until fixed point'),
('Betweenness Centrality', '2001-01-01', 'Brandes algorithm: compute shortest paths DAG, then accumulate pair dependencies'),
('DFS', '1959-01-01', 'Recursive traversal of unvisited neighbor nodes with back-tracking'),
('Label Propagation', '2007-01-01', 'v.label = most_frequent(neighbors.labels) until stability'),
('Bellman-Ford', '1958-01-01', 'Relax all edges |V|-1 times for SSSP handling negative weights'),
('Louvain Community', '2008-01-01', 'Optimize modularity locally, contract network into super-nodes, repeat hierarchically'),
('Tarjan SCC', '1972-01-01', 'DFS with stack and lowlink values to find strongly connected components in linear time'),
('HITS', '1999-01-01', 'Iteratively compute Hub and Authority scores via matrix transposition multiplication'),
('Dijkstra', '1959-01-01', 'Priority queue greedy exploration of closest unvisited vertices'),
('A* Search', '1968-01-01', 'f(n) = g(n) + h(n) guided shortest path exploration with heuristic function'),
('Kruskal MST', '1956-01-01', 'Sort edges by weight, union disjoint sets without creating cycles'),
('Jaccard Similarity', '1901-01-01', 'J(A, B) = |neighbors(A) INTERSECT neighbors(B)| / |neighbors(A) UNION neighbors(B)|'),
('Max-Flow Min-Cut', '1956-01-01', 'Ford-Fulkerson augment paths in residual graph until no path from source to sink');

-- ----------------------------------------------------------------------------
-- 6. COMPLEXIDADE
-- ----------------------------------------------------------------------------
INSERT INTO Complexidade (tipo_alocacao, complexidade_busca, complexidade_insercao) VALUES
('Array Estático', 'O(1)', 'O(N)'),
('Lista Encadeada', 'O(N)', 'O(1)'),
('Árvore Balanceada', 'O(log N)', 'O(log N)'),
('Tabela Hash', 'O(1)', 'O(1)'),
('Matriz Esparsa', 'O(1)', 'O(V)'),
('Alocação em Bloco PMEM', 'O(log N)', 'O(1) amortizado'),
('Buffer Hierárquico', 'O(1)', 'O(1) amortizado'),
('Log Append-Only', 'O(N)', 'O(1)'),
('Matriz Densa', 'O(1)', 'O(1)'),
('B-Tree em Disco', 'O(log N)', 'O(log N)'),
('Packed Memory Array', 'O(log N)', 'O(log^2 N) amort.'),
('Array Indexado por GPU', 'O(1)', 'O(N)'),
('LSM-Tree', 'O(log N)', 'O(1) amortizado');

-- ----------------------------------------------------------------------------
-- 7. ESTRUTURA DE DADOS
-- ----------------------------------------------------------------------------
INSERT INTO Estrutura_de_Dados (nome, complexidade_id) VALUES
('CSR (Compressed Sparse Row)', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'Array Estático')),
('Lista de Adjacência', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'Lista Encadeada')),
('PCSR (Packed CSR)', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'Packed Memory Array')),
('Edge List', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'Log Append-Only')),
('XPBuffer', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'Buffer Hierárquico')),
('Block-based CSR', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'Alocação em Bloco PMEM')),
('Matriz de Adjacência', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'Matriz Densa')),
('Hash Map de Vértices', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'Tabela Hash')),
('CSC (Compressed Sparse Column)', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'Array Estático')),
('Grafos em Disco (GraphChi)', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'B-Tree em Disco')),
('GPU Compressed Frontier', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'Array Indexado por GPU')),
('Dynamic Adjacency Trees', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'Árvore Balanceada')),
('LSM Graph Store', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'LSM-Tree'));

-- ----------------------------------------------------------------------------
-- 8. TECNICA DE OTIMIZACAO
-- ----------------------------------------------------------------------------
INSERT INTO Tecnica_de_Otimizacao (nome, metodo, complexidade, pseudocodigo) VALUES
('Direction-Optimizing BFS', 'Heurística de Fronteira', 'O(V+E)', 'If frontier > threshold, traverse in-edges instead of out-edges'),
('Parallel Sliding Windows', 'Particionamento em Disco', 'O(E)', 'Load graph intervals, compute, write back sequentially'),
('Dual-Versioning', 'Controle de Concorrência', 'O(1)', 'Maintain static read-only view and dynamic append-only view'),
('Vertex-Cut Partitioning', 'Distribuição de Grafo', 'O(V log V)', 'Split high-degree vertices across machines to balance load'),
('NUMA-Aware Allocation', 'Localidade de Memória', 'O(1)', 'Allocate vertex data on the local memory node of the computing thread'),
('Work-Stealing', 'Balanceamento de Carga', 'O(1)', 'Idle threads steal tasks from the queues of busy threads'),
('Cache Blocking', 'Localidade de Cache', 'O(V)', 'Process graph in chunks that fit into CPU L3 cache'),
('Prefetching de Arestas', 'Ocultação de Latência', 'O(1)', 'Issue __builtin_prefetch for the next vertex edge list'),
('Lock-Free Updates', 'Sincronização', 'O(1)', 'Use Compare-And-Swap (CAS) instead of mutex locks'),
('SIMD Vectorization', 'Paralelismo de Dados', 'O(1)', 'Process multiple edges simultaneously using AVX-512 instructions'),
('Delta-Stepping SSSP', 'Escalonamento Paralelo', 'O(V+E)', 'Divide Dijkstra into buckets of width Delta and relax concurrently'),
('Warp-Level Cooperative GPU', 'Paralelismo Massivo GPU', 'O(1)', 'Distribute vertex adjacency lists across GPU threads within warps'),
('Asynchronous Engine', 'Convergência Rápida', 'O(E)', 'Update neighbor states immediately without waiting for global barrier');

-- ----------------------------------------------------------------------------
-- 9. APLICACAO
-- ----------------------------------------------------------------------------
INSERT INTO Aplicacao (area, empresa, problema_resolvido, licenca) VALUES
('Redes Sociais', 'Meta / Facebook', 'Recomendação de Amigos e Feed de Notícias (Mutual Friends)', 'Proprietária'),
('E-commerce', 'Amazon', 'Recomendação de Produtos Baseada em Co-Compras (K-Core)', 'Proprietária'),
('Segurança Financeira', 'Stripe', 'Detecção de Fraude em Cartões e Grafos de Transações', 'Proprietária'),
('Transporte e Mobilidade', 'Google', 'Otimização de Rotas e Tráfego em Tempo Real (SSSP)', 'Proprietária'),
('Bioinformática', 'Broad Institute', 'Montagem de Genoma e Análise de Proteínas (Grafos de Bruijn)', 'Open Source'),
('Telecomunicações', 'AT&T', 'Detecção de Gargalos e Análise de Falhas em Rede (WCC)', 'Proprietária'),
('Mecanismo de Busca', 'Google', 'Ranqueamento Global de Hiperlinks (PageRank)', 'Proprietária'),
('Criptomoedas', 'Chainalysis', 'Rastreamento de Lavagem de Dinheiro em Blockchain', 'Proprietária'),
('Logística Global', 'FedEx', 'Otimização da Cadeia de Suprimentos Multimodal', 'Proprietária'),
('Streaming de Vídeo', 'Netflix', 'Sistemas de Recomendação e Clusterização de Preferências', 'Proprietária'),
('Cibersegurança', 'CrowdStrike', 'Análise de Movimentação Lateral de Malwares na Rede', 'Proprietária'),
('Redes Profissionais', 'LinkedIn', 'Cálculo de Conexões de 2º e 3º Graus (BFS Distribuído)', 'Proprietária'),
('Saúde e Farmacologia', 'Pfizer', 'Identificação de Interações Medicamentosas (HITS)', 'Proprietária'),
('Smart Cities', 'Siemens', 'Simulação e Balanceamento de Redes Elétricas Inteligentes', 'Proprietária'),
('AgroTech', 'Embrapa', 'Mapeamento de Dispersão de Pragas Agrícolas por Vento', 'Open Source');

-- ----------------------------------------------------------------------------
-- 10. PESQUISADOR
-- ----------------------------------------------------------------------------
INSERT INTO Pesquisador (orcid, area_pesquisa, pessoa_id, instituicao_id) VALUES
('0000-0001-1111-1111', 'Memória Persistente', (SELECT id FROM Pessoa WHERE cpf='11111111111'), (SELECT id FROM Instituicao WHERE nome='UNC Charlotte')),
('0000-0002-2222-2222', 'Sistemas de Armazenamento', (SELECT id FROM Pessoa WHERE cpf='22222222222'), (SELECT id FROM Instituicao WHERE nome='UNC Charlotte')),
('0000-0003-3333-3333', 'Processamento de Grafos', (SELECT id FROM Pessoa WHERE cpf='33333333333'), (SELECT id FROM Instituicao WHERE nome='Zhejiang University')),
('0000-0004-4444-4444', 'Sistemas Distribuídos', (SELECT id FROM Pessoa WHERE cpf='44444444444'), (SELECT id FROM Instituicao WHERE nome='George Washington University')),
('0000-0005-5555-5555', 'Arquitetura de Computadores', (SELECT id FROM Pessoa WHERE cpf='55555555555'), (SELECT id FROM Instituicao WHERE nome='George Washington University')),
('0000-0006-6666-6666', 'Grafos em Memória Compartilhada', (SELECT id FROM Pessoa WHERE cpf='66666666666'), (SELECT id FROM Instituicao WHERE nome='MIT')),
('0000-0007-7777-7777', 'Grafos em Disco', (SELECT id FROM Pessoa WHERE cpf='77777777777'), (SELECT id FROM Instituicao WHERE nome='Carnegie Mellon University')),
('0000-0008-8888-8888', 'Computação Distribuída', (SELECT id FROM Pessoa WHERE cpf='88888888888'), (SELECT id FROM Instituicao WHERE nome='Tsinghua University')),
('0000-0009-9999-9999', 'Compiladores Paralelos', (SELECT id FROM Pessoa WHERE cpf='99999999999'), (SELECT id FROM Instituicao WHERE nome='University of Texas at Austin')),
('0000-0010-1010-1010', 'GPU Graph Analytics', (SELECT id FROM Pessoa WHERE cpf='10101010101'), (SELECT id FROM Instituicao WHERE nome='UC Davis')),
('0000-0012-1212-1212', 'Processamento Massivo de Dados', (SELECT id FROM Pessoa WHERE cpf='12121212121'), (SELECT id FROM Instituicao WHERE nome='UC Berkeley')),
('0000-0013-1313-1313', 'Sistemas de Aprendizado de Máquina', (SELECT id FROM Pessoa WHERE cpf='13131313131'), (SELECT id FROM Instituicao WHERE nome='UC Berkeley')),
('0000-0014-1414-1414', 'Grafos e Machine Learning', (SELECT id FROM Pessoa WHERE cpf='14141414141'), (SELECT id FROM Instituicao WHERE nome='Stanford University')),
('0000-0015-1515-1515', 'Modelos Pregel / BSP', (SELECT id FROM Pessoa WHERE cpf='15151515151'), (SELECT id FROM Instituicao WHERE nome='Google Research')),
('0000-0016-1616-1616', 'Álgebra Linear Esparsa', (SELECT id FROM Pessoa WHERE cpf='16161616161'), (SELECT id FROM Instituicao WHERE nome='Texas A&M University')),
('0000-0017-1717-1717', 'Teoria da Computação', (SELECT id FROM Pessoa WHERE cpf='17171717171'), (SELECT id FROM Instituicao WHERE nome='Harvard University')),
('0000-0018-1818-1818', 'Arquitetura de GPUs', (SELECT id FROM Pessoa WHERE cpf='18181818181'), (SELECT id FROM Instituicao WHERE nome='UC Davis')),
('0000-0019-1919-1919', 'Sistemas Seguros', (SELECT id FROM Pessoa WHERE cpf='19191919191'), (SELECT id FROM Instituicao WHERE nome='Carnegie Mellon University')),
('0000-0020-2020-2020', 'Redes e Supercomputação', (SELECT id FROM Pessoa WHERE cpf='20202020202'), (SELECT id FROM Instituicao WHERE nome='ETH Zurich')),
('0000-0021-2121-2121', 'Bancos de Dados Analíticos', (SELECT id FROM Pessoa WHERE cpf='21212121212'), (SELECT id FROM Instituicao WHERE nome='MIT')),
('0000-0024-2424-2424', 'Mineração de Redes Complexas', (SELECT id FROM Pessoa WHERE cpf='24242424242'), (SELECT id FROM Instituicao WHERE nome='Stanford University')),
-- UNESP
('0000-0025-2525-2525', 'Bancos de Dados e Otimização', (SELECT id FROM Pessoa WHERE cpf='25252525252'), (SELECT id FROM Instituicao WHERE nome='UNESP')),
('0000-0026-2626-2626', 'Engenharia de Software', (SELECT id FROM Pessoa WHERE cpf='26262626262'), (SELECT id FROM Instituicao WHERE nome='UNESP')),
('0000-0027-2727-2727', 'Estruturas de Dados Avançadas', (SELECT id FROM Pessoa WHERE cpf='27272727272'), (SELECT id FROM Instituicao WHERE nome='UNESP')),
('0000-0028-2828-2828', 'Processamento Paralelo', (SELECT id FROM Pessoa WHERE cpf='28282828282'), (SELECT id FROM Instituicao WHERE nome='UNESP')),
-- USP
('0000-0029-2929-2929', 'Algoritmos e Grafos', (SELECT id FROM Pessoa WHERE cpf='29292929292'), (SELECT id FROM Instituicao WHERE nome='USP')),
('0000-0030-3030-3030', 'Big Data Analytics', (SELECT id FROM Pessoa WHERE cpf='30303030303'), (SELECT id FROM Instituicao WHERE nome='USP')),
('0000-0031-3131-3131', 'Mineração de Grafos', (SELECT id FROM Pessoa WHERE cpf='31313131313'), (SELECT id FROM Instituicao WHERE nome='USP')),
-- UNICAMP
('0000-0032-3232-3232', 'Sistemas Embarcados e Paralelos', (SELECT id FROM Pessoa WHERE cpf='32323232323'), (SELECT id FROM Instituicao WHERE nome='UNICAMP')),
('0000-0033-3333-3333', 'Inteligência Artificial em Grafos', (SELECT id FROM Pessoa WHERE cpf='33333333334'), (SELECT id FROM Instituicao WHERE nome='UNICAMP'));

-- ----------------------------------------------------------------------------
-- 11. DATASET
-- ----------------------------------------------------------------------------
INSERT INTO Dataset (nome, versao, area, tamanho_arquivo, qtd_arestas, qtd_vertices, direcionado, valorado, instituicao_id) VALUES
('soc-LiveJournal', '1.0', 'Social Network', 1048576000, 68993773, 4847571, TRUE, FALSE, (SELECT id FROM Instituicao WHERE nome='Stanford University')),
('com-Friendster', '1.0', 'Social Network', 30000000000, 1806067135, 65608366, TRUE, FALSE, (SELECT id FROM Instituicao WHERE nome='Stanford University')),
('twitter-2010', '2010', 'Social Network', 15000000000, 1468365182, 41652230, TRUE, FALSE, (SELECT id FROM Instituicao WHERE nome='Stanford University')),
('Kron21', 'Graph500', 'Synthetic', 5000000000, 104857600, 2097152, FALSE, FALSE, (SELECT id FROM Instituicao WHERE nome='Zhejiang University')),
('Kron30', 'Graph500', 'Synthetic', 50000000000, 1000000000, 10000000, FALSE, FALSE, (SELECT id FROM Instituicao WHERE nome='Zhejiang University')),
('com-Orkut', '1.0', 'Social Network', 3500000000, 117185083, 3072441, FALSE, FALSE, (SELECT id FROM Instituicao WHERE nome='Stanford University')),
('web-UK2007', '2007', 'Web Graph', 4000000000, 3738733648, 105896555, TRUE, FALSE, (SELECT id FROM Instituicao WHERE nome='Microsoft Research')),
('roadNet-CA', '1.0', 'Road Network', 500000000, 5533214, 1965206, FALSE, TRUE, (SELECT id FROM Instituicao WHERE nome='Stanford University')),
('USA-Road-Full', '1.0', 'Road Network', 2200000000, 57708624, 23947347, TRUE, TRUE, (SELECT id FROM Instituicao WHERE nome='MIT')),
('wiki-Talk', '2013', 'Knowledge Graph', 1200000000, 5021410, 2394385, TRUE, FALSE, (SELECT id FROM Instituicao WHERE nome='Stanford University')),
('web-Google', '1.0', 'Web Graph', 850000000, 5105039, 875713, TRUE, FALSE, (SELECT id FROM Instituicao WHERE nome='Google Research')),
('amazon0601', '1.0', 'Co-Purchasing', 450000000, 3387388, 403394, TRUE, FALSE, (SELECT id FROM Instituicao WHERE nome='Stanford University')),
('cit-Patents', '1.0', 'Citation Network', 3200000000, 16518948, 3774768, TRUE, FALSE, (SELECT id FROM Instituicao WHERE nome='Stanford University')),
('bio-mouse-gene', '2.1', 'Bioinformatics', 680000000, 14500210, 45100, FALSE, TRUE, (SELECT id FROM Instituicao WHERE nome='Harvard University')),
('reddit-hyperlinks', '2019', 'Community Network', 1800000000, 858490, 55863, TRUE, FALSE, (SELECT id FROM Instituicao WHERE nome='Stanford University')),
('brazil-highways', '1.0', 'Road Network', 350000000, 1245000, 450000, TRUE, TRUE, (SELECT id FROM Instituicao WHERE nome='UNESP')),
('usp-academic-coauthors', '2024', 'Collaboration Network', 120000000, 850000, 120000, FALSE, FALSE, (SELECT id FROM Instituicao WHERE nome='USP')),
('synth-powerlaw-100m', '1.0', 'Synthetic Scale-Free', 12000000000, 100000000, 10000000, TRUE, FALSE, (SELECT id FROM Instituicao WHERE nome='UNICAMP'));

-- ----------------------------------------------------------------------------
-- 12. AMBIENTE DE EXECUCAO
-- ----------------------------------------------------------------------------
INSERT INTO Ambiente_de_Execucao (nome, sistema_operacional, memoria_ram, memoria_secundaria, processador, gpu, qtd_nucleos, nos_numa, instituicao_id) VALUES
('Servidor Optane A', 'Ubuntu 20.04', 128, 1024, 'Intel Xeon Gold 5218', NULL, 32, 2, (SELECT id FROM Instituicao WHERE nome='UNC Charlotte')),
('Cluster NUMA PMEM', 'CentOS 8', 256, 2048, 'Intel Xeon Platinum 8260', NULL, 48, 4, (SELECT id FROM Instituicao WHERE nome='Zhejiang University')),
('Servidor de Banco de Dados', 'Ubuntu 18.04', 512, 4096, 'Intel Xeon E5', NULL, 64, 4, (SELECT id FROM Instituicao WHERE nome='George Washington University')),
('AWS EC2 r5.24xlarge', 'Amazon Linux 2', 768, 5000, 'Intel Xeon Platinum 8000', NULL, 96, 4, (SELECT id FROM Instituicao WHERE nome='MIT')),
('Servidor GPU Nvidia A100', 'Ubuntu 20.04', 256, 2000, 'AMD EPYC 7742', 'Nvidia A100 80GB', 64, 2, (SELECT id FROM Instituicao WHERE nome='UC Davis')),
('Desktop Commodity PC', 'Windows 10', 16, 512, 'Intel Core i7-4790K', NULL, 4, 1, (SELECT id FROM Instituicao WHERE nome='Carnegie Mellon University')),
('Cluster Distribuído Tianhe', 'Kylin Linux', 1024, 10000, 'Intel Xeon E5-2692', NULL, 256, 16, (SELECT id FROM Instituicao WHERE nome='Tsinghua University')),
('Estação de Pesquisa Ryzen', 'Ubuntu 22.04', 64, 1000, 'AMD Ryzen 9 5950X', NULL, 16, 1, (SELECT id FROM Instituicao WHERE nome='University of Texas at Austin')),
('Servidor Microsoft Azure', 'Windows Server 2019', 512, 8000, 'Intel Xeon Platinum 8168', NULL, 128, 4, (SELECT id FROM Instituicao WHERE nome='Microsoft Research')),
('Supercomputador Nvidia DGX H100', 'Ubuntu 22.04', 2048, 30000, 'Intel Xeon Platinum 8480+', '8x Nvidia H100 SXM5', 112, 4, (SELECT id FROM Instituicao WHERE nome='Nvidia Research')),
('Cluster Slurm Euler', 'Rocky Linux 9', 1536, 25000, 'AMD EPYC 9654', '4x Nvidia A100', 192, 4, (SELECT id FROM Instituicao WHERE nome='ETH Zurich')),
('Cluster Google Borg Node', 'Debian Custom', 512, 12000, 'Intel Xeon Scalable 3rd Gen', 'Google TPU v4', 64, 2, (SELECT id FROM Instituicao WHERE nome='Google Research')),
('Cluster UNESP HPC Lab', 'Ubuntu 22.04 LTS', 128, 4000, 'AMD EPYC 7502P', 'Nvidia RTX 4090', 32, 1, (SELECT id FROM Instituicao WHERE nome='UNESP')),
('Servidor USP LNCC Node', 'CentOS Stream 9', 256, 8000, 'Intel Xeon Gold 6330', 'Nvidia V100', 56, 2, (SELECT id FROM Instituicao WHERE nome='USP')),
('Cluster UNICAMP Grid', 'Ubuntu 20.04', 192, 6000, 'AMD EPYC 7452', NULL, 64, 2, (SELECT id FROM Instituicao WHERE nome='UNICAMP'));

-- ----------------------------------------------------------------------------
-- 13. VEICULO
-- ----------------------------------------------------------------------------
INSERT INTO Veiculo (nome, edicao, area, tipo, data_publicacao, local_publicacao, paginas, instituicao_id) VALUES
('ACM Conference', '2024', 'HPC', 'Conferência', '2024-03-05', 'USA', 13, (SELECT id FROM Instituicao WHERE nome='UNC Charlotte')),
('IEEE/ACM MICRO', '55th', 'Microarchitecture', 'Conferência', '2022-10-01', 'Chicago, IL, USA', 15, (SELECT id FROM Instituicao WHERE nome='Zhejiang University')),
('USENIX FAST', '17th', 'Storage', 'Conferência', '2019-02-25', 'Boston, MA, USA', 15, (SELECT id FROM Instituicao WHERE nome='George Washington University')),
('PPoPP', '18th', 'Parallel Programming', 'Conferência', '2013-02-23', 'Shenzhen, China', 12, (SELECT id FROM Instituicao WHERE nome='MIT')),
('OSDI', '10th', 'Operating Systems', 'Conferência', '2012-10-08', 'Hollywood, CA, USA', 14, (SELECT id FROM Instituicao WHERE nome='Carnegie Mellon University')),
('OSDI', '12th', 'Operating Systems', 'Conferência', '2016-11-02', 'Savannah, GA, USA', 16, (SELECT id FROM Instituicao WHERE nome='Tsinghua University')),
('SOSP', '24th', 'Operating Systems', 'Conferência', '2013-10-22', 'Farmington, PA, USA', 15, (SELECT id FROM Instituicao WHERE nome='University of Texas at Austin')),
('PPoPP', '21st', 'Parallel Programming', 'Conferência', '2016-03-12', 'Barcelona, Spain', 13, (SELECT id FROM Instituicao WHERE nome='UC Davis')),
('VLDB', '42nd', 'Databases', 'Conferência', '2015-08-01', 'Kohala Coast, HI, USA', 12, (SELECT id FROM Instituicao WHERE nome='Stanford University')),
('ACM SIGMOD', '2010', 'Data Management', 'Conferência', '2010-06-06', 'Indianapolis, IN, USA', 14, (SELECT id FROM Instituicao WHERE nome='Google Research')),
('USENIX ATC', '2014', 'Computer Systems', 'Conferência', '2014-06-19', 'Philadelphia, PA, USA', 13, (SELECT id FROM Instituicao WHERE nome='UC Berkeley')),
('ACM SIGMOD', '2020', 'Databases', 'Conferência', '2020-06-14', 'Portland, OR, USA', 16, (SELECT id FROM Instituicao WHERE nome='Microsoft Research')),
('IEEE TPDS', 'Vol. 28', 'Parallel and Distributed Systems', 'Revista', '2017-04-01', 'Piscataway, NJ, USA', 14, (SELECT id FROM Instituicao WHERE nome='ETH Zurich')),
('ACM TODS', 'Vol. 45', 'Database Systems', 'Revista', '2020-09-15', 'New York, NY, USA', 28, (SELECT id FROM Instituicao WHERE nome='MIT')),
('SBAC-PAD', '35th', 'Computer Architecture & High Performance', 'Conferência', '2023-10-18', 'Porto Alegre, Brasil', 10, (SELECT id FROM Instituicao WHERE nome='UNESP')),
('JIDM', 'Vol. 13', 'Information and Data Management', 'Revista', '2022-08-12', 'Belo Horizonte, Brasil', 16, (SELECT id FROM Instituicao WHERE nome='USP'));

-- ----------------------------------------------------------------------------
-- 14. IMPLEMENTACAO (Framework x Algoritmo)
-- ----------------------------------------------------------------------------
INSERT INTO Implementacao (framework_id, algoritmo_id) VALUES
-- DGAP
((SELECT id FROM Framework WHERE nome='DGAP'), (SELECT id FROM Algoritmo WHERE nome='PageRank')),
((SELECT id FROM Framework WHERE nome='DGAP'), (SELECT id FROM Algoritmo WHERE nome='BFS')),
((SELECT id FROM Framework WHERE nome='DGAP'), (SELECT id FROM Algoritmo WHERE nome='SSSP')),
((SELECT id FROM Framework WHERE nome='DGAP'), (SELECT id FROM Algoritmo WHERE nome='WCC')),
-- XPGraph
((SELECT id FROM Framework WHERE nome='XPGraph'), (SELECT id FROM Algoritmo WHERE nome='PageRank')),
((SELECT id FROM Framework WHERE nome='XPGraph'), (SELECT id FROM Algoritmo WHERE nome='SSSP')),
((SELECT id FROM Framework WHERE nome='XPGraph'), (SELECT id FROM Algoritmo WHERE nome='BFS')),
((SELECT id FROM Framework WHERE nome='XPGraph'), (SELECT id FROM Algoritmo WHERE nome='K-Core')),
-- GraphOne
((SELECT id FROM Framework WHERE nome='GraphOne'), (SELECT id FROM Algoritmo WHERE nome='Triangle Counting')),
((SELECT id FROM Framework WHERE nome='GraphOne'), (SELECT id FROM Algoritmo WHERE nome='BFS')),
((SELECT id FROM Framework WHERE nome='GraphOne'), (SELECT id FROM Algoritmo WHERE nome='PageRank')),
((SELECT id FROM Framework WHERE nome='GraphOne'), (SELECT id FROM Algoritmo WHERE nome='WCC')),
-- Ligra
((SELECT id FROM Framework WHERE nome='Ligra'), (SELECT id FROM Algoritmo WHERE nome='PageRank')),
((SELECT id FROM Framework WHERE nome='Ligra'), (SELECT id FROM Algoritmo WHERE nome='BFS')),
((SELECT id FROM Framework WHERE nome='Ligra'), (SELECT id FROM Algoritmo WHERE nome='Betweenness Centrality')),
((SELECT id FROM Framework WHERE nome='Ligra'), (SELECT id FROM Algoritmo WHERE nome='SSSP')),
((SELECT id FROM Framework WHERE nome='Ligra'), (SELECT id FROM Algoritmo WHERE nome='Triangle Counting')),
-- GraphChi
((SELECT id FROM Framework WHERE nome='GraphChi'), (SELECT id FROM Algoritmo WHERE nome='WCC')),
((SELECT id FROM Framework WHERE nome='GraphChi'), (SELECT id FROM Algoritmo WHERE nome='PageRank')),
((SELECT id FROM Framework WHERE nome='GraphChi'), (SELECT id FROM Algoritmo WHERE nome='K-Core')),
-- Gemini
((SELECT id FROM Framework WHERE nome='Gemini'), (SELECT id FROM Algoritmo WHERE nome='PageRank')),
((SELECT id FROM Framework WHERE nome='Gemini'), (SELECT id FROM Algoritmo WHERE nome='BFS')),
((SELECT id FROM Framework WHERE nome='Gemini'), (SELECT id FROM Algoritmo WHERE nome='SSSP')),
((SELECT id FROM Framework WHERE nome='Gemini'), (SELECT id FROM Algoritmo WHERE nome='WCC')),
-- Galois
((SELECT id FROM Framework WHERE nome='Galois'), (SELECT id FROM Algoritmo WHERE nome='PageRank')),
((SELECT id FROM Framework WHERE nome='Galois'), (SELECT id FROM Algoritmo WHERE nome='BFS')),
((SELECT id FROM Framework WHERE nome='Galois'), (SELECT id FROM Algoritmo WHERE nome='SSSP')),
((SELECT id FROM Framework WHERE nome='Galois'), (SELECT id FROM Algoritmo WHERE nome='Dijkstra')),
-- Gunrock
((SELECT id FROM Framework WHERE nome='Gunrock'), (SELECT id FROM Algoritmo WHERE nome='BFS')),
((SELECT id FROM Framework WHERE nome='Gunrock'), (SELECT id FROM Algoritmo WHERE nome='PageRank')),
((SELECT id FROM Framework WHERE nome='Gunrock'), (SELECT id FROM Algoritmo WHERE nome='SSSP')),
((SELECT id FROM Framework WHERE nome='Gunrock'), (SELECT id FROM Algoritmo WHERE nome='Betweenness Centrality')),
-- PowerGraph
((SELECT id FROM Framework WHERE nome='PowerGraph'), (SELECT id FROM Algoritmo WHERE nome='PageRank')),
((SELECT id FROM Framework WHERE nome='PowerGraph'), (SELECT id FROM Algoritmo WHERE nome='WCC')),
-- Pregel
((SELECT id FROM Framework WHERE nome='Pregel'), (SELECT id FROM Algoritmo WHERE nome='PageRank')),
((SELECT id FROM Framework WHERE nome='Pregel'), (SELECT id FROM Algoritmo WHERE nome='SSSP')),
-- GraphX
((SELECT id FROM Framework WHERE nome='GraphX'), (SELECT id FROM Algoritmo WHERE nome='PageRank')),
((SELECT id FROM Framework WHERE nome='GraphX'), (SELECT id FROM Algoritmo WHERE nome='Louvain Community')),
-- cuGraph
((SELECT id FROM Framework WHERE nome='cuGraph'), (SELECT id FROM Algoritmo WHERE nome='PageRank')),
((SELECT id FROM Framework WHERE nome='cuGraph'), (SELECT id FROM Algoritmo WHERE nome='Louvain Community')),
((SELECT id FROM Framework WHERE nome='cuGraph'), (SELECT id FROM Algoritmo WHERE nome='BFS')),
((SELECT id FROM Framework WHERE nome='cuGraph'), (SELECT id FROM Algoritmo WHERE nome='Betweenness Centrality')),
-- FlashGraph
((SELECT id FROM Framework WHERE nome='FlashGraph'), (SELECT id FROM Algoritmo WHERE nome='PageRank')),
((SELECT id FROM Framework WHERE nome='FlashGraph'), (SELECT id FROM Algoritmo WHERE nome='BFS')),
-- Neo4j
((SELECT id FROM Framework WHERE nome='Neo4j'), (SELECT id FROM Algoritmo WHERE nome='Dijkstra')),
((SELECT id FROM Framework WHERE nome='Neo4j'), (SELECT id FROM Algoritmo WHERE nome='A* Search'));

-- ----------------------------------------------------------------------------
-- 15. PUBLICACAO
-- ----------------------------------------------------------------------------
INSERT INTO Publicacao (veiculo_id, artigo_id, pesquisador_id) VALUES
-- DGAP
((SELECT id FROM Veiculo WHERE nome='ACM Conference' AND edicao='2024'), (SELECT id FROM Artigo WHERE doi='10.1145/DGAP2024'), (SELECT id FROM Pesquisador WHERE orcid='0000-0001-1111-1111')),
((SELECT id FROM Veiculo WHERE nome='ACM Conference' AND edicao='2024'), (SELECT id FROM Artigo WHERE doi='10.1145/DGAP2024'), (SELECT id FROM Pesquisador WHERE orcid='0000-0002-2222-2222')),
-- XPGraph
((SELECT id FROM Veiculo WHERE nome='IEEE/ACM MICRO' AND edicao='55th'), (SELECT id FROM Artigo WHERE doi='10.1109/MICRO56248.2022.00091'), (SELECT id FROM Pesquisador WHERE orcid='0000-0003-3333-3333')),
-- GraphOne
((SELECT id FROM Veiculo WHERE nome='USENIX FAST' AND edicao='17th'), (SELECT id FROM Artigo WHERE doi='10.5555/FAST19.227800'), (SELECT id FROM Pesquisador WHERE orcid='0000-0004-4444-4444')),
((SELECT id FROM Veiculo WHERE nome='USENIX FAST' AND edicao='17th'), (SELECT id FROM Artigo WHERE doi='10.5555/FAST19.227800'), (SELECT id FROM Pesquisador WHERE orcid='0000-0005-5555-5555')),
-- Ligra
((SELECT id FROM Veiculo WHERE nome='PPoPP' AND edicao='18th'), (SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530'), (SELECT id FROM Pesquisador WHERE orcid='0000-0006-6666-6666')),
-- GraphChi
((SELECT id FROM Veiculo WHERE nome='OSDI' AND edicao='10th'), (SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387884'), (SELECT id FROM Pesquisador WHERE orcid='0000-0007-7777-7777')),
-- Gemini
((SELECT id FROM Veiculo WHERE nome='OSDI' AND edicao='12th'), (SELECT id FROM Artigo WHERE doi='10.5555/3026877.3026883'), (SELECT id FROM Pesquisador WHERE orcid='0000-0008-8888-8888')),
-- Galois
((SELECT id FROM Veiculo WHERE nome='SOSP' AND edicao='24th'), (SELECT id FROM Artigo WHERE doi='10.1145/2503210.2503214'), (SELECT id FROM Pesquisador WHERE orcid='0000-0009-9999-9999')),
-- Gunrock
((SELECT id FROM Veiculo WHERE nome='PPoPP' AND edicao='21st'), (SELECT id FROM Artigo WHERE doi='10.1145/2851141.2851145'), (SELECT id FROM Pesquisador WHERE orcid='0000-0010-1010-1010')),
((SELECT id FROM Veiculo WHERE nome='PPoPP' AND edicao='21st'), (SELECT id FROM Artigo WHERE doi='10.1145/2851141.2851145'), (SELECT id FROM Pesquisador WHERE orcid='0000-0018-1818-1818')),
-- Pregel
((SELECT id FROM Veiculo WHERE nome='ACM SIGMOD' AND edicao='2010'), (SELECT id FROM Artigo WHERE doi='10.1145/1807167.1807184'), (SELECT id FROM Pesquisador WHERE orcid='0000-0015-1515-1515')),
-- GraphX
((SELECT id FROM Veiculo WHERE nome='OSDI' AND edicao='12th'), (SELECT id FROM Artigo WHERE doi='10.5555/2685048.2685096'), (SELECT id FROM Pesquisador WHERE orcid='0000-0012-1212-1212')),
((SELECT id FROM Veiculo WHERE nome='OSDI' AND edicao='12th'), (SELECT id FROM Artigo WHERE doi='10.5555/2685048.2685096'), (SELECT id FROM Pesquisador WHERE orcid='0000-0013-1313-1313')),
-- CuGraph
((SELECT id FROM Veiculo WHERE nome='IEEE TPDS' AND edicao='Vol. 28'), (SELECT id FROM Artigo WHERE doi='10.1145/3542929.3563470'), (SELECT id FROM Pesquisador WHERE orcid='0000-0018-1818-1818')),
-- UNESP & USP Publications
((SELECT id FROM Veiculo WHERE nome='SBAC-PAD' AND edicao='35th'), (SELECT id FROM Artigo WHERE doi='10.1109/SBAC-PAD.2023.00015'), (SELECT id FROM Pesquisador WHERE orcid='0000-0025-2525-2525')),
((SELECT id FROM Veiculo WHERE nome='SBAC-PAD' AND edicao='35th'), (SELECT id FROM Artigo WHERE doi='10.1109/SBAC-PAD.2023.00015'), (SELECT id FROM Pesquisador WHERE orcid='0000-0028-2828-2828')),
((SELECT id FROM Veiculo WHERE nome='JIDM' AND edicao='Vol. 13'), (SELECT id FROM Artigo WHERE doi='10.5753/jidm.2022.2541'), (SELECT id FROM Pesquisador WHERE orcid='0000-0029-2929-2929')),
((SELECT id FROM Veiculo WHERE nome='JIDM' AND edicao='Vol. 13'), (SELECT id FROM Artigo WHERE doi='10.5753/jidm.2022.2541'), (SELECT id FROM Pesquisador WHERE orcid='0000-0030-3030-3030')),
((SELECT id FROM Veiculo WHERE nome='IEEE TPDS' AND edicao='Vol. 28'), (SELECT id FROM Artigo WHERE doi='10.1007/s10586-021-03482-1'), (SELECT id FROM Pesquisador WHERE orcid='0000-0026-2626-2626'));

-- ----------------------------------------------------------------------------
-- 16. BENCHMARK
-- ----------------------------------------------------------------------------
INSERT INTO Benchmark (tempo, data_benchmark, dataset_id, ambiente_id, implementacao_id) VALUES
-- LiveJournal
(2.3450, '2023-11-15', (SELECT id FROM Dataset WHERE nome='soc-LiveJournal'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Servidor Optane A'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='DGAP') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(1.2300, '2023-11-15', (SELECT id FROM Dataset WHERE nome='soc-LiveJournal'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Servidor Optane A'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='DGAP') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
(0.7420, '2023-11-20', (SELECT id FROM Dataset WHERE nome='soc-LiveJournal'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='AWS EC2 r5.24xlarge'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Ligra') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(0.0890, '2023-11-20', (SELECT id FROM Dataset WHERE nome='soc-LiveJournal'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Servidor GPU Nvidia A100'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gunrock') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
(0.0420, '2024-02-10', (SELECT id FROM Dataset WHERE nome='soc-LiveJournal'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Supercomputador Nvidia DGX H100'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='cuGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(1.8500, '2023-11-20', (SELECT id FROM Dataset WHERE nome='soc-LiveJournal'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Cluster NUMA PMEM'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='XPGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(0.9800, '2023-11-20', (SELECT id FROM Dataset WHERE nome='soc-LiveJournal'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Cluster Distribuído Tianhe'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gemini') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(4.5600, '2023-11-20', (SELECT id FROM Dataset WHERE nome='soc-LiveJournal'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='AWS EC2 r5.24xlarge'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='GraphX') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),

-- Twitter 2010
(15.4200, '2019-01-10', (SELECT id FROM Dataset WHERE nome='twitter-2010'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Servidor de Banco de Dados'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='GraphOne') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
(8.4500, '2023-12-05', (SELECT id FROM Dataset WHERE nome='twitter-2010'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Servidor Optane A'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='DGAP') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(4.2100, '2023-12-05', (SELECT id FROM Dataset WHERE nome='twitter-2010'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='AWS EC2 r5.24xlarge'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Ligra') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(9.1000, '2023-12-05', (SELECT id FROM Dataset WHERE nome='twitter-2010'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Cluster NUMA PMEM'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='XPGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(3.9500, '2023-12-05', (SELECT id FROM Dataset WHERE nome='twitter-2010'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Cluster Distribuído Tianhe'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gemini') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(0.4800, '2024-02-15', (SELECT id FROM Dataset WHERE nome='twitter-2010'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Supercomputador Nvidia DGX H100'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='cuGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(18.9000, '2023-12-05', (SELECT id FROM Dataset WHERE nome='twitter-2010'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Desktop Commodity PC'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='GraphChi') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),

-- Friendster
(7.1536, '2022-09-01', (SELECT id FROM Dataset WHERE nome='com-Friendster'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Cluster NUMA PMEM'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='XPGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(5.9200, '2023-12-10', (SELECT id FROM Dataset WHERE nome='com-Friendster'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Servidor Optane A'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='DGAP') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(3.1200, '2023-12-10', (SELECT id FROM Dataset WHERE nome='com-Friendster'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='AWS EC2 r5.24xlarge'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Ligra') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(2.8900, '2023-12-10', (SELECT id FROM Dataset WHERE nome='com-Friendster'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Cluster Distribuído Tianhe'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gemini') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(1.1500, '2024-03-01', (SELECT id FROM Dataset WHERE nome='com-Friendster'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Supercomputador Nvidia DGX H100'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='cuGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),

-- Orkut
(0.8500, '2013-02-01', (SELECT id FROM Dataset WHERE nome='com-Orkut'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='AWS EC2 r5.24xlarge'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Ligra') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(1.0500, '2024-01-15', (SELECT id FROM Dataset WHERE nome='com-Orkut'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Servidor Optane A'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='DGAP') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(1.3400, '2024-01-15', (SELECT id FROM Dataset WHERE nome='com-Orkut'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Cluster NUMA PMEM'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='XPGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(0.1850, '2024-01-15', (SELECT id FROM Dataset WHERE nome='com-Orkut'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Servidor GPU Nvidia A100'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gunrock') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
(0.0920, '2024-01-15', (SELECT id FROM Dataset WHERE nome='com-Orkut'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Supercomputador Nvidia DGX H100'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='cuGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='Louvain Community'))),

-- USA Road Network
(0.1200, '2016-01-20', (SELECT id FROM Dataset WHERE nome='USA-Road-Full'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Servidor GPU Nvidia A100'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gunrock') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
(0.4500, '2023-11-05', (SELECT id FROM Dataset WHERE nome='USA-Road-Full'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='AWS EC2 r5.24xlarge'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Ligra') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='SSSP'))),
(0.3800, '2023-11-05', (SELECT id FROM Dataset WHERE nome='USA-Road-Full'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Estação de Pesquisa Ryzen'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Galois') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='Dijkstra'))),

-- Web-Google
(0.2100, '2024-02-18', (SELECT id FROM Dataset WHERE nome='web-Google'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Cluster UNESP HPC Lab'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Ligra') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(0.1800, '2024-02-18', (SELECT id FROM Dataset WHERE nome='web-Google'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Servidor USP LNCC Node'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gunrock') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
(0.0650, '2024-02-18', (SELECT id FROM Dataset WHERE nome='web-Google'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Cluster UNESP HPC Lab'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='cuGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank')));

-- ----------------------------------------------------------------------------
-- 17. AVALIACAO_ARTIGO
-- ----------------------------------------------------------------------------
INSERT INTO Avaliacao_Artigo (artigo_id, implementacao_id) VALUES
((SELECT id FROM Artigo WHERE doi='10.1145/DGAP2024'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='DGAP') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
((SELECT id FROM Artigo WHERE doi='10.1145/DGAP2024'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='DGAP') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
((SELECT id FROM Artigo WHERE doi='10.1109/MICRO56248.2022.00091'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='XPGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
((SELECT id FROM Artigo WHERE doi='10.1109/MICRO56248.2022.00091'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='XPGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='SSSP'))),
((SELECT id FROM Artigo WHERE doi='10.5555/FAST19.227800'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='GraphOne') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='Triangle Counting'))),
((SELECT id FROM Artigo WHERE doi='10.5555/FAST19.227800'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='GraphOne') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
((SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Ligra') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
((SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387884'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='GraphChi') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='WCC'))),
((SELECT id FROM Artigo WHERE doi='10.1145/2851141.2851145'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gunrock') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
((SELECT id FROM Artigo WHERE doi='10.5555/3026877.3026883'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gemini') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
((SELECT id FROM Artigo WHERE doi='10.1145/1807167.1807184'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Pregel') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
((SELECT id FROM Artigo WHERE doi='10.5555/2685048.2685096'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='GraphX') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
((SELECT id FROM Artigo WHERE doi='10.1145/3542929.3563470'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='cuGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
((SELECT id FROM Artigo WHERE doi='10.1145/3542929.3563470'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='cuGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='Louvain Community')));

-- ----------------------------------------------------------------------------
-- 18. AVALIACAO_DATASET
-- ----------------------------------------------------------------------------
INSERT INTO Avaliacao_Dataset (dataset_id, artigo_id) VALUES
((SELECT id FROM Dataset WHERE nome='soc-LiveJournal'), (SELECT id FROM Artigo WHERE doi='10.1145/DGAP2024')),
((SELECT id FROM Dataset WHERE nome='com-Friendster'), (SELECT id FROM Artigo WHERE doi='10.1109/MICRO56248.2022.00091')),
((SELECT id FROM Dataset WHERE nome='twitter-2010'), (SELECT id FROM Artigo WHERE doi='10.5555/FAST19.227800')),
((SELECT id FROM Dataset WHERE nome='com-Orkut'), (SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530')),
((SELECT id FROM Dataset WHERE nome='USA-Road-Full'), (SELECT id FROM Artigo WHERE doi='10.1145/2851141.2851145')),
((SELECT id FROM Dataset WHERE nome='Kron30'), (SELECT id FROM Artigo WHERE doi='10.1109/MICRO56248.2022.00091')),
((SELECT id FROM Dataset WHERE nome='web-Google'), (SELECT id FROM Artigo WHERE doi='10.1145/1807167.1807184')),
((SELECT id FROM Dataset WHERE nome='soc-LiveJournal'), (SELECT id FROM Artigo WHERE doi='10.5555/2685048.2685096')),
((SELECT id FROM Dataset WHERE nome='twitter-2010'), (SELECT id FROM Artigo WHERE doi='10.1145/3542929.3563470')),
((SELECT id FROM Dataset WHERE nome='com-Friendster'), (SELECT id FROM Artigo WHERE doi='10.1145/3542929.3563470')),
((SELECT id FROM Dataset WHERE nome='brazil-highways'), (SELECT id FROM Artigo WHERE doi='10.1109/SBAC-PAD.2023.00015')),
((SELECT id FROM Dataset WHERE nome='usp-academic-coauthors'), (SELECT id FROM Artigo WHERE doi='10.5753/jidm.2022.2541'));

-- ----------------------------------------------------------------------------
-- 19. APLICACAO_TECNICA_OTIMIZACAO
-- ----------------------------------------------------------------------------
INSERT INTO Aplicacao_Tecnica_Otimizacao (tecnica_id, implementacao_id, data_aplicacao) VALUES
((SELECT id FROM Tecnica_de_Otimizacao WHERE nome='NUMA-Aware Allocation'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='XPGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank')), '2022-01-15'),
((SELECT id FROM Tecnica_de_Otimizacao WHERE nome='Direction-Optimizing BFS'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Ligra') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank')), '2013-01-10'),
((SELECT id FROM Tecnica_de_Otimizacao WHERE nome='Dual-Versioning'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='GraphOne') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='Triangle Counting')), '2018-06-20'),
((SELECT id FROM Tecnica_de_Otimizacao WHERE nome='Parallel Sliding Windows'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='GraphChi') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='WCC')), '2012-05-10'),
((SELECT id FROM Tecnica_de_Otimizacao WHERE nome='Lock-Free Updates'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='DGAP') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS')), '2023-08-01'),
((SELECT id FROM Tecnica_de_Otimizacao WHERE nome='Warp-Level Cooperative GPU'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gunrock') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS')), '2016-01-15'),
((SELECT id FROM Tecnica_de_Otimizacao WHERE nome='Vertex-Cut Partitioning'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='PowerGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank')), '2012-06-01'),
((SELECT id FROM Tecnica_de_Otimizacao WHERE nome='Delta-Stepping SSSP'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Galois') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='Dijkstra')), '2013-07-22'),
((SELECT id FROM Tecnica_de_Otimizacao WHERE nome='SIMD Vectorization'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gemini') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank')), '2016-04-10'),
((SELECT id FROM Tecnica_de_Otimizacao WHERE nome='Cache Blocking'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Ligra') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='Betweenness Centrality')), '2014-03-12');

-- ----------------------------------------------------------------------------
-- 20. IMPLEMENTACAO_ESTRUTURA_DADOS
-- ----------------------------------------------------------------------------
INSERT INTO Implementacao_Estrutura_Dados (estrutura_id, implementacao_id) VALUES
((SELECT id FROM Estrutura_de_Dados WHERE nome='Block-based CSR'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='DGAP') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
((SELECT id FROM Estrutura_de_Dados WHERE nome='XPBuffer'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='XPGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='SSSP'))),
((SELECT id FROM Estrutura_de_Dados WHERE nome='Edge List'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='GraphOne') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
((SELECT id FROM Estrutura_de_Dados WHERE nome='CSR (Compressed Sparse Row)'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Ligra') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
((SELECT id FROM Estrutura_de_Dados WHERE nome='Grafos em Disco (GraphChi)'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='GraphChi') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='WCC'))),
((SELECT id FROM Estrutura_de_Dados WHERE nome='GPU Compressed Frontier'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gunrock') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
((SELECT id FROM Estrutura_de_Dados WHERE nome='GPU Compressed Frontier'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='cuGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
((SELECT id FROM Estrutura_de_Dados WHERE nome='Dynamic Adjacency Trees'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Galois') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
((SELECT id FROM Estrutura_de_Dados WHERE nome='Hash Map de Vértices'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Neo4j') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='Dijkstra')));

-- ----------------------------------------------------------------------------
-- 21. IMPLEMENTACAO_APLICACAO
-- ----------------------------------------------------------------------------
INSERT INTO Implementacao_Aplicacao (aplicacao_id, implementacao_id) VALUES
((SELECT id FROM Aplicacao WHERE empresa='Meta / Facebook'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Ligra') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
((SELECT id FROM Aplicacao WHERE empresa='Google' AND area='Mecanismo de Busca'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='XPGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
((SELECT id FROM Aplicacao WHERE empresa='Stripe'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='GraphOne') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='Triangle Counting'))),
((SELECT id FROM Aplicacao WHERE empresa='Google' AND area='Transporte e Mobilidade'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gunrock') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
((SELECT id FROM Aplicacao WHERE empresa='Amazon'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='DGAP') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
((SELECT id FROM Aplicacao WHERE empresa='Netflix'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='GraphX') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='Louvain Community'))),
((SELECT id FROM Aplicacao WHERE empresa='Chainalysis'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='cuGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='Betweenness Centrality'))),
((SELECT id FROM Aplicacao WHERE empresa='LinkedIn'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gemini') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS')));

-- ----------------------------------------------------------------------------
-- 22. UTILIZACAO_APLICACAO
-- ----------------------------------------------------------------------------
INSERT INTO Utilizacao_Aplicacao (pessoa_id, aplicacao_id) VALUES
((SELECT id FROM Pessoa WHERE cpf='66666666666'), (SELECT id FROM Aplicacao WHERE empresa='Meta / Facebook')),
((SELECT id FROM Pessoa WHERE cpf='33333333333'), (SELECT id FROM Aplicacao WHERE empresa='Google' AND area='Mecanismo de Busca')),
((SELECT id FROM Pessoa WHERE cpf='44444444444'), (SELECT id FROM Aplicacao WHERE empresa='Stripe')),
((SELECT id FROM Pessoa WHERE cpf='10101010101'), (SELECT id FROM Aplicacao WHERE empresa='Google' AND area='Transporte e Mobilidade')),
((SELECT id FROM Pessoa WHERE cpf='11111111111'), (SELECT id FROM Aplicacao WHERE empresa='Amazon')),
((SELECT id FROM Pessoa WHERE cpf='12121212121'), (SELECT id FROM Aplicacao WHERE empresa='Netflix')),
((SELECT id FROM Pessoa WHERE cpf='18181818181'), (SELECT id FROM Aplicacao WHERE empresa='Chainalysis')),
((SELECT id FROM Pessoa WHERE cpf='25252525252'), (SELECT id FROM Aplicacao WHERE empresa='Embrapa')),
((SELECT id FROM Pessoa WHERE cpf='29292929292'), (SELECT id FROM Aplicacao WHERE empresa='Siemens'));

-- ----------------------------------------------------------------------------
-- 23. APLICACAO_APLICACAO
-- ----------------------------------------------------------------------------
INSERT INTO Aplicacao_Aplicacao (aplicacao_base_id, aplicacao_nova_id) VALUES
((SELECT id FROM Aplicacao WHERE empresa='Meta / Facebook'), (SELECT id FROM Aplicacao WHERE empresa='Amazon')),
((SELECT id FROM Aplicacao WHERE empresa='Google' AND area='Mecanismo de Busca'), (SELECT id FROM Aplicacao WHERE empresa='Stripe')),
((SELECT id FROM Aplicacao WHERE empresa='Google' AND area='Transporte e Mobilidade'), (SELECT id FROM Aplicacao WHERE empresa='FedEx')),
((SELECT id FROM Aplicacao WHERE empresa='Amazon'), (SELECT id FROM Aplicacao WHERE empresa='Netflix')),
((SELECT id FROM Aplicacao WHERE empresa='Stripe'), (SELECT id FROM Aplicacao WHERE empresa='Chainalysis')),
((SELECT id FROM Aplicacao WHERE empresa='Netflix'), (SELECT id FROM Aplicacao WHERE empresa='LinkedIn')),
((SELECT id FROM Aplicacao WHERE empresa='Siemens'), (SELECT id FROM Aplicacao WHERE empresa='Embrapa'));

-- ----------------------------------------------------------------------------
-- 24. ARTIGO_ARTIGO (Citações Direcionadas, Cadeias Profundas e Múltiplos Loops)
-- ----------------------------------------------------------------------------
INSERT INTO Artigo_Artigo (artigo_citando_id, artigo_citado_id) VALUES
-- Citações de DGAP (2024)
((SELECT id FROM Artigo WHERE doi='10.1145/DGAP2024'), (SELECT id FROM Artigo WHERE doi='10.1109/MICRO56248.2022.00091')), -- DGAP -> XPGraph
((SELECT id FROM Artigo WHERE doi='10.1145/DGAP2024'), (SELECT id FROM Artigo WHERE doi='10.5555/FAST19.227800')),       -- DGAP -> GraphOne
((SELECT id FROM Artigo WHERE doi='10.1145/DGAP2024'), (SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530')),       -- DGAP -> Ligra
((SELECT id FROM Artigo WHERE doi='10.1145/DGAP2024'), (SELECT id FROM Artigo WHERE doi='10.1145/3282894.3282897')),       -- DGAP -> Triton

-- Citações de XPGraph (2022)
((SELECT id FROM Artigo WHERE doi='10.1109/MICRO56248.2022.00091'), (SELECT id FROM Artigo WHERE doi='10.5555/FAST19.227800')), -- XPGraph -> GraphOne
((SELECT id FROM Artigo WHERE doi='10.1109/MICRO56248.2022.00091'), (SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530')), -- XPGraph -> Ligra
((SELECT id FROM Artigo WHERE doi='10.1109/MICRO56248.2022.00091'), (SELECT id FROM Artigo WHERE doi='10.5555/3026877.3026883')), -- XPGraph -> Gemini
((SELECT id FROM Artigo WHERE doi='10.1109/MICRO56248.2022.00091'), (SELECT id FROM Artigo WHERE doi='10.1145/3087801.3087809')), -- XPGraph -> GraphGrind

-- Citações de GraphOne (2019)
((SELECT id FROM Artigo WHERE doi='10.5555/FAST19.227800'), (SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530')),       -- GraphOne -> Ligra
((SELECT id FROM Artigo WHERE doi='10.5555/FAST19.227800'), (SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387884')),       -- GraphOne -> GraphChi
((SELECT id FROM Artigo WHERE doi='10.5555/FAST19.227800'), (SELECT id FROM Artigo WHERE doi='10.5555/3026877.3026883')),       -- GraphOne -> Gemini

-- Citações de Ligra (2013)
((SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530'), (SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387884')),       -- Ligra -> GraphChi
((SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530'), (SELECT id FROM Artigo WHERE doi='10.1145/2503210.2503214')),       -- Ligra -> Galois
((SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530'), (SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387882')),       -- Ligra -> PowerGraph
((SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530'), (SELECT id FROM Artigo WHERE doi='10.1145/1807167.1807184')),       -- Ligra -> Pregel

-- Citações de Gemini (2016)
((SELECT id FROM Artigo WHERE doi='10.5555/3026877.3026883'), (SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530')),       -- Gemini -> Ligra
((SELECT id FROM Artigo WHERE doi='10.5555/3026877.3026883'), (SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387884')),       -- Gemini -> GraphChi
((SELECT id FROM Artigo WHERE doi='10.5555/3026877.3026883'), (SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387882')),       -- Gemini -> PowerGraph

-- Citações de Gunrock (2016) e CuGraph (2022)
((SELECT id FROM Artigo WHERE doi='10.1145/2851141.2851145'), (SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530')),       -- Gunrock -> Ligra
((SELECT id FROM Artigo WHERE doi='10.1145/2851141.2851145'), (SELECT id FROM Artigo WHERE doi='10.1145/2535771.2535785')),       -- Gunrock -> CuSha
((SELECT id FROM Artigo WHERE doi='10.1145/3542929.3563470'), (SELECT id FROM Artigo WHERE doi='10.1145/2851141.2851145')),       -- cuGraph -> Gunrock
((SELECT id FROM Artigo WHERE doi='10.1145/3542929.3563470'), (SELECT id FROM Artigo WHERE doi='10.1109/SC.2020.00034')),         -- cuGraph -> SC20 GPU Betweenness

-- Citações de GraphX (2014) e GraphScope (2020)
((SELECT id FROM Artigo WHERE doi='10.5555/2685048.2685096'), (SELECT id FROM Artigo WHERE doi='10.1145/1807167.1807184')),       -- GraphX -> Pregel
((SELECT id FROM Artigo WHERE doi='10.5555/2685048.2685096'), (SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387882')),       -- GraphX -> PowerGraph
((SELECT id FROM Artigo WHERE doi='10.1145/3318464.3389731'), (SELECT id FROM Artigo WHERE doi='10.5555/2685048.2685096')),       -- GraphScope -> GraphX
((SELECT id FROM Artigo WHERE doi='10.1145/3318464.3389731'), (SELECT id FROM Artigo WHERE doi='10.5555/3026877.3026883')),       -- GraphScope -> Gemini

-- Citações de Artigos Brasileiros e de Avaliação
((SELECT id FROM Artigo WHERE doi='10.1109/SBAC-PAD.2023.00015'), (SELECT id FROM Artigo WHERE doi='10.1109/MICRO56248.2022.00091')), -- SBAC-PAD -> XPGraph
((SELECT id FROM Artigo WHERE doi='10.1109/SBAC-PAD.2023.00015'), (SELECT id FROM Artigo WHERE doi='10.1145/3087801.3087809')),   -- SBAC-PAD -> GraphGrind
((SELECT id FROM Artigo WHERE doi='10.5753/jidm.2022.2541'), (SELECT id FROM Artigo WHERE doi='10.1145/3448016.3457312')),         -- JIDM -> Survey Dynamic Graphs
((SELECT id FROM Artigo WHERE doi='10.1007/s10586-021-03482-1'), (SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530')),   -- Benchmarking -> Ligra

-- ============================================================================
-- CICLOS E LOOPS DE CITAÇÃO (Revisões retrospectivas, co-citações e erratas)
-- ============================================================================
-- Ciclo 1 (2 nós): Galois <-> Ligra
((SELECT id FROM Artigo WHERE doi='10.1145/2503210.2503214'), (SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530')),

-- Ciclo 2 (3 nós): GraphChi -> GraphOne -> Ligra -> GraphChi
((SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387884'), (SELECT id FROM Artigo WHERE doi='10.5555/FAST19.227800')),

-- Ciclo 3 (4 nós): DGAP -> XPGraph -> GraphGrind -> Triton -> DGAP
((SELECT id FROM Artigo WHERE doi='10.1145/3087801.3087809'), (SELECT id FROM Artigo WHERE doi='10.1145/3282894.3282897')),
((SELECT id FROM Artigo WHERE doi='10.1145/3282894.3282897'), (SELECT id FROM Artigo WHERE doi='10.1145/DGAP2024')),

-- Ciclo 4 (5 nós): cuGraph -> Gunrock -> CuSha -> PowerGraph -> cuGraph
((SELECT id FROM Artigo WHERE doi='10.1145/2535771.2535785'), (SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387882')),
((SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387882'), (SELECT id FROM Artigo WHERE doi='10.1145/3542929.3563470'));
