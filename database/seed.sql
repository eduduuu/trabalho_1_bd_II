INSERT INTO Pessoa (cpf, nome, cargo) VALUES
('11111111111', 'Abdullah Al Raqibul Islam', 'PhD Student'),
('22222222222', 'Dong Dai', 'Professor'),
('33333333333', 'Rui Wang', 'Researcher'),
('44444444444', 'Pradeep Kumar', 'PhD Student'),
('55555555555', 'H. Howie Huang', 'Professor'),
('66666666666', 'Julian Shun', 'Professor'),
('77777777777', 'Aapo Kyrola', 'Researcher'),
('88888888888', 'Xiaowei Zhu', 'Professor'),
('99999999999', 'Keshav Pingali', 'Professor'),
('10101010101', 'Yangzihao Wang', 'Researcher');
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
('Microsoft Research', '1991-09-01', 'Redmond, Washington, USA');
INSERT INTO Artigo (doi, data_publicacao, titulo, num_citacoes) VALUES
('10.1145/DGAP2024', '2024-03-05', 'DGAP: Efficient Dynamic Graph Analysis on Persistent Memory', 45),
('10.1109/MICRO56248.2022.00091', '2022-10-01', 'XPGraph: XPline-Friendly Persistent Memory Graph Stores', 95),
('10.5555/FAST19.227800', '2019-02-25', 'GraphOne: A Data Store for Real-time Analytics on Evolving Graphs', 310),
('10.1145/2442516.2442530', '2013-02-23', 'Ligra: A Lightweight Graph Processing Framework for Shared Memory', 1420),
('10.5555/2387880.2387884', '2012-10-08', 'GraphChi: Large-Scale Graph Computation on Just a PC', 2150),
('10.5555/3026877.3026883', '2016-11-02', 'Gemini: A Computation-Centric Distributed Graph Processing System', 890),
('10.1145/2503210.2503214', '2013-10-22', 'The Galois System for Graph Processing', 710),
('10.1145/2851141.2851145', '2016-03-12', 'Gunrock: A High-Performance Graph Processing Library on the GPU', 640),
('10.5555/2387880.2387882', '2012-10-08', 'PowerGraph: Distributed Graph-Parallel Computation', 2850),
('10.14778/2824032.2824033', '2015-08-01', 'GraphMat: High performance graph analytics made productive', 420);

INSERT INTO Framework (nome, tipo_aresta, diagrama, tipo_consumo_grafo, linguagem,
link_documentacao) VALUES
('DGAP', 'Dinâmica', 'Dynamic CSR with PM-optimized append-only edge log', 'Memória Persistente', 'C++', 'https://github.com/DIR-LAB/DGAP'),
('XPGraph', 'Dinâmica', 'XPLine-friendly model, hierarchical vertex buffer', 'Memória Persistente NUMA', 'C++', 'https://github.com/rwang067/XPGraph'),
('GraphOne', 'Dinâmica', 'Dual versioning, Edge list and Adjacency list', 'Em Memória / Disco',
'C++', 'https://github.com/the-data-lab/GraphOne'),
('Ligra', 'Estática', 'Shared-memory vertex subset mapping', 'Em Memória', 'C++',
'https://github.com/jshun/ligra'),
('GraphChi', 'Estática', 'Parallel Sliding Windows (PSW)', 'Disco (Out-of-core)', 'C++',
'https://github.com/GraphChi/graphchi-cpp'),
('Gemini', 'Estática', 'Dual-mode edge processing, chunk-based partitioning', 'Distribuído', 'C++',
'https://github.com/thu-pacman/GeminiGraph'),
('Galois', 'Dinâmica', 'Data-driven parallel loop scheduling', 'Em Memória', 'C++',
'https://github.com/IntelligentSoftwareSystems/Galois'),
('Gunrock', 'Estática', 'Bulk-synchronous data-centric GPU frontier', 'GPU VRAM', 'CUDA/C++',
'https://github.com/gunrock/gunrock'),
('PowerGraph', 'Estática', 'Gather-Apply-Scatter (GAS) model', 'Distribuído', 'C++',
'https://github.com/dato-code/PowerGraph'),
('GraphMat', 'Estática', 'Graph algorithms mapped to sparse matrix operations', 'Em Memória',
'C++', 'https://github.com/IntelLabs/GraphMat');
INSERT INTO Algoritmo (nome, data_criacao, pseudocodigo) VALUES
('PageRank', '1998-01-01', 'v.rank = 0.15 + 0.85 * sum(u.rank / u.out_degree) for u in v.in_edges'),
('BFS', '1959-01-01', 'Queue q; q.push(root); while(!q.empty()){ v=q.pop(); for(u in v.neighbors) if(!visited[u]) q.push(u); }'),
('SSSP', '1956-01-01', 'dist[v] = min(dist[v], dist[u] + weight(u,v))'),
('WCC', '1972-01-01', 'Propagate min component ID to all neighbors iteratively'),
('Triangle Counting', '1978-01-01', 'For each edge(u,v), count intersection of u.neighbors and v.neighbors'),
('K-Core', '1983-01-01', 'Iteratively remove vertices with degree < K'),
('Betweenness Centrality', '2001-01-01', 'Brandes algorithm: compute shortest paths, then accumulate dependencies'),
('DFS', '1959-01-01', 'Recursive traversal of unvisited neighbor nodes'),
('Label Propagation', '2007-01-01', 'v.label = most_frequent(neighbors.labels)'),
('Bellman-Ford', '1958-01-01', 'Relax all edges |V|-1 times for SSSP with negative weights');
INSERT INTO Complexidade (tipo_alocacao, complexidade_busca, complexidade_insercao)
VALUES
('Array Estático', 'O(1)', 'O(N)'),
('Lista Encadeada', 'O(N)', 'O(1)'),
('Árvore Balanceada', 'O(log N)', 'O(log N)'),
('Tabela Hash', 'O(1)', 'O(1)'),
('Matriz Esparsa', 'O(1)', 'O(V)'),
('Alocação em Bloco PMEM', 'O(log N)', 'O(1) amortizado'),
('Buffer Hierárquico', 'O(1)', 'O(1) amortizado'),

('Log Append-Only', 'O(N)', 'O(1)'),
('Matriz Densa', 'O(1)', 'O(1)'),
('B-Tree em Disco', 'O(log N)', 'O(log N)');
INSERT INTO Estrutura_de_Dados (nome, complexidade_id) VALUES
('CSR (Compressed Sparse Row)', (SELECT id FROM Complexidade WHERE tipo_alocacao =
'Array Estático')),
('Lista de Adjacência', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'Lista Encadeada')),
('PCSR (Packed CSR)', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'Árvore Balanceada')),
('Edge List', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'Log Append-Only')),
('XPBuffer', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'Buffer Hierárquico')),
('Block-based CSR', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'Alocação em Bloco PMEM')),
('Matriz de Adjacência', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'Matriz Densa')),
('Hash Map', (SELECT id FROM Complexidade WHERE tipo_alocacao = 'Tabela Hash')),
('CSC (Compressed Sparse Column)', (SELECT id FROM Complexidade WHERE tipo_alocacao
= 'Array Estático')),
('Grafos em Disco (GraphChi)', (SELECT id FROM Complexidade WHERE tipo_alocacao =
'B-Tree em Disco'));
INSERT INTO Tecnica_de_Otimizacao (nome, metodo, complexidade, pseudocodigo) VALUES
('Direction-Optimizing BFS', 'Heurística de Fronteira', 'O(V+E)', 'If frontier > threshold, traverse in-edges instead of out-edges'),
('Parallel Sliding Windows', 'Particionamento em Disco', 'O(E)', 'Load graph intervals, compute, write back sequentially'),
('Dual-Versioning', 'Controle de Concorrência', 'O(1)', 'Maintain static read-only view and dynamic append-only view'),
('Vertex-Cut Partitioning', 'Distribuição de Grafo', 'O(V log V)', 'Split high-degree vertices across machines to balance load'),
('NUMA-Aware Allocation', 'Localidade de Memória', 'O(1)', 'Allocate vertex data on the local memory node of the computing thread'),
('Work-Stealing', 'Balanceamento de Carga', 'O(1)', 'Idle threads steal tasks from the queues of busy threads'),
('Cache Blocking', 'Localidade de Cache', 'O(V)', 'Process graph in chunks that fit into CPU L3 cache'),
('Prefetching de Arestas', 'Ocultação de Latência', 'O(1)', 'Issue __builtin_prefetch for the next vertexs edge list'),
('Lock-Free Updates', 'Sincronização', 'O(1)', 'Use Compare-And-Swap (CAS) instead of mutex locks'),
('SIMD Vectorization', 'Paralelismo de Dados', 'O(1)', 'Process multiple edges simultaneously using AVX-512 instructions');
INSERT INTO Aplicacao (area, empresa, problema_resolvido, licenca) VALUES
('Redes Sociais', 'Facebook', 'Recomendação de Amigos (Mutual Friends)', 'Proprietária'),
('E-commerce', 'Amazon', 'Recomendação de Produtos (K-Core)', 'Proprietária'),

('Segurança', 'Stripe', 'Detecção de Fraude em Cartões', 'Proprietária'),
('Transporte', 'Google', 'Otimização de Rotas (SSSP)', 'Proprietária'),
('Bioinformática', 'Broad Institute', 'Montagem de Genoma (Grafos de Bruijn)', 'Open Source'),
('Telecomunicações', 'AT&T', 'Análise de Falhas em Rede (WCC)', 'Proprietária'),
('Mecanismo de Busca', 'Google', 'Ranqueamento de Páginas (PageRank)', 'Proprietária'),
('Criptomoedas', 'Chainalysis', 'Rastreamento de Lavagem de Dinheiro', 'Proprietária'),
('Logística', 'FedEx', 'Otimização da Cadeia de Suprimentos', 'Proprietária'),
('Streaming', 'Netflix', 'Recomendação de Filmes Relacionados', 'Proprietária');

INSERT INTO Pesquisador (orcid, area_pesquisa, pessoa_id, instituicao_id) VALUES
('0000-0001-1111-1111', 'Memória Persistente', (SELECT id FROM Pessoa WHERE
cpf='11111111111'), (SELECT id FROM Instituicao WHERE nome='UNC Charlotte')),
('0000-0002-2222-2222', 'Sistemas de Armazenamento', (SELECT id FROM Pessoa WHERE
cpf='22222222222'), (SELECT id FROM Instituicao WHERE nome='UNC Charlotte')),
('0000-0003-3333-3333', 'Processamento de Grafos', (SELECT id FROM Pessoa WHERE
cpf='33333333333'), (SELECT id FROM Instituicao WHERE nome='Zhejiang University')),
('0000-0004-4444-4444', 'Sistemas Distribuídos', (SELECT id FROM Pessoa WHERE
cpf='44444444444'), (SELECT id FROM Instituicao WHERE nome='George Washington University')),
('0000-0005-5555-5555', 'Arquitetura de Computadores', (SELECT id FROM Pessoa WHERE
cpf='55555555555'), (SELECT id FROM Instituicao WHERE nome='George Washington University')),
('0000-0006-6666-6666', 'Grafos em Memória Compartilhada', (SELECT id FROM Pessoa
WHERE cpf='66666666666'), (SELECT id FROM Instituicao WHERE nome='MIT')),
('0000-0007-7777-7777', 'Grafos em Disco', (SELECT id FROM Pessoa WHERE
cpf='77777777777'), (SELECT id FROM Instituicao WHERE nome='Carnegie Mellon University')),
('0000-0008-8888-8888', 'Computação Distribuída', (SELECT id FROM Pessoa WHERE
cpf='88888888888'), (SELECT id FROM Instituicao WHERE nome='Tsinghua University')),
('0000-0009-9999-9999', 'Compiladores Paralelos', (SELECT id FROM Pessoa WHERE
cpf='99999999999'), (SELECT id FROM Instituicao WHERE nome='University of Texas at Austin')),
('0000-0010-1010-1010', 'GPU Graph Analytics', (SELECT id FROM Pessoa WHERE
cpf='10101010101'), (SELECT id FROM Instituicao WHERE nome='UC Davis'));
INSERT INTO Dataset (nome, versao, area, tamanho_arquivo, qtd_arestas, qtd_vertices,
direcionado, valorado, instituicao_id) VALUES
('LiveJournal', '1.0', 'Social Network', 1048576000, 68993773, 4847571, TRUE, FALSE, (SELECT
id FROM Instituicao WHERE nome='Stanford University')),
('Friendster', '1.0', 'Social Network', 30000000000, 1806067135, 65608366, TRUE, FALSE,
(SELECT id FROM Instituicao WHERE nome='Stanford University')),
('Twitter', '2010', 'Social Network', 15000000000, 1468365182, 41652230, TRUE, FALSE,
(SELECT id FROM Instituicao WHERE nome='Stanford University')),
('Kron21', 'Graph500', 'Synthetic', 5000000000, 104857600, 2097152, FALSE, FALSE, (SELECT
id FROM Instituicao WHERE nome='Zhejiang University')),
('Kron30', 'Graph500', 'Synthetic', 50000000000, 1000000000, 10000000, FALSE, FALSE,
(SELECT id FROM Instituicao WHERE nome='Zhejiang University')),

('Orkut', '1.0', 'Social Network', 3500000000, 117185083, 3072441, FALSE, FALSE, (SELECT id
FROM Instituicao WHERE nome='Stanford University')),
('WebUK', '2007', 'Web Graph', 4000000000, 3738733648, 105896555, TRUE, FALSE, (SELECT
id FROM Instituicao WHERE nome='Microsoft Research')),
('USA Road Network', '1.0', 'Road Network', 500000000, 57708624, 23947347, TRUE, TRUE,
(SELECT id FROM Instituicao WHERE nome='Stanford University')),
('Yahoo Music', '1.0', 'Bipartite', 800000000, 252800275, 1000990, FALSE, TRUE, (SELECT id
FROM Instituicao WHERE nome='Stanford University')),
('Wikipedia', '2013', 'Knowledge Graph', 1200000000, 43152206, 4212354, TRUE, FALSE,
(SELECT id FROM Instituicao WHERE nome='MIT'));
INSERT INTO Ambiente_de_Execucao (nome, sistema_operacional, memoria_ram,
memoria_secundaria, processador, gpu, qtd_nucleos, nos_numa, instituicao_id) VALUES
('Servidor Optane A', 'Ubuntu 20.04', 128, 1024, 'Intel Xeon Gold 5218', NULL, 32, 2, (SELECT id
FROM Instituicao WHERE nome='UNC Charlotte')),
('Cluster NUMA PMEM', 'CentOS 8', 256, 2048, 'Intel Xeon Platinum 8260', NULL, 48, 4,
(SELECT id FROM Instituicao WHERE nome='Zhejiang University')),
('Servidor de Banco de Dados', 'Ubuntu 18.04', 512, 4096, 'Intel Xeon E5', NULL, 64, 4, (SELECT
id FROM Instituicao WHERE nome='George Washington University')),
('AWS EC2 r5.24xlarge', 'Amazon Linux 2', 768, 5000, 'Intel Xeon Platinum 8000', NULL, 96, 4,
(SELECT id FROM Instituicao WHERE nome='MIT')),
('Servidor GPU Nvidia', 'Ubuntu 20.04', 256, 2000, 'AMD EPYC 7742', 'Nvidia A100', 64, 2,
(SELECT id FROM Instituicao WHERE nome='UC Davis')),
('Desktop Commodity', 'Windows 10', 16, 512, 'Intel Core i7-4790K', NULL, 4, 1, (SELECT id
FROM Instituicao WHERE nome='Carnegie Mellon University')),
('Cluster Distribuído Tianhe', 'Kylin Linux', 1024, 10000, 'Intel Xeon E5-2692', NULL, 256, 16,
(SELECT id FROM Instituicao WHERE nome='Tsinghua University')),
('Estação de Pesquisa', 'Ubuntu 22.04', 64, 1000, 'AMD Ryzen 9 5950X', NULL, 16, 1, (SELECT
id FROM Instituicao WHERE nome='University of Texas at Austin')),
('Servidor Microsoft Azure', 'Windows Server 2019', 512, 8000, 'Intel Xeon Platinum 8168', NULL,
128, 4, (SELECT id FROM Instituicao WHERE nome='Microsoft Research')),
('Servidor HBM (High Bandwidth)', 'CentOS 7', 128, 2000, 'Intel Xeon Max', NULL, 32, 2,
(SELECT id FROM Instituicao WHERE nome='Stanford University'));
INSERT INTO Veiculo (nome, edicao, area, tipo, data_publicacao, local_publicacao, paginas,
instituicao_id) VALUES
('ACM Conference', '2024', 'HPC', 'Conferência', '2024-03-05', 'USA', 13, (SELECT id FROM
Instituicao WHERE nome='UNC Charlotte')),
('IEEE/ACM MICRO', '55th', 'Microarchitecture', 'Conferência', '2022-10-01', 'Chicago, IL, USA',
15, (SELECT id FROM Instituicao WHERE nome='Zhejiang University')),
('USENIX FAST', '17th', 'Storage', 'Conferência', '2019-02-25', 'Boston, MA, USA', 15, (SELECT
id FROM Instituicao WHERE nome='George Washington University')),
('PPoPP', '18th', 'Parallel Programming', 'Conferência', '2013-02-23', 'Shenzhen, China', 12,
(SELECT id FROM Instituicao WHERE nome='MIT')),
('OSDI', '10th', 'Operating Systems', 'Conferência', '2012-10-08', 'Hollywood, CA, USA', 14,
(SELECT id FROM Instituicao WHERE nome='Carnegie Mellon University')),
('OSDI', '12th', 'Operating Systems', 'Conferência', '2016-11-02', 'Savannah, GA, USA', 16,
(SELECT id FROM Instituicao WHERE nome='Tsinghua University')),

('SOSP', '24th', 'Operating Systems', 'Conferência', '2013-10-22', 'Farmington, PA, USA', 15,
(SELECT id FROM Instituicao WHERE nome='University of Texas at Austin')),
('PPoPP', '21st', 'Parallel Programming', 'Conferência', '2016-03-12', 'Barcelona, Spain', 13,
(SELECT id FROM Instituicao WHERE nome='UC Davis')),
('OSDI', '10th-B', 'Operating Systems', 'Conferência', '2012-10-08', 'Hollywood, CA, USA', 14,
(SELECT id FROM Instituicao WHERE nome='Carnegie Mellon University')),
('VLDB', '42nd', 'Databases', 'Conferência', '2015-08-01', 'Kohala Coast, HI, USA', 12, (SELECT
id FROM Instituicao WHERE nome='Stanford University'));
INSERT INTO Implementacao (framework_id, algoritmo_id) VALUES
((SELECT id FROM Framework WHERE nome='DGAP'), (SELECT id FROM Algoritmo WHERE
nome='PageRank')),
((SELECT id FROM Framework WHERE nome='DGAP'), (SELECT id FROM Algoritmo WHERE
nome='BFS')),
((SELECT id FROM Framework WHERE nome='XPGraph'), (SELECT id FROM Algoritmo
WHERE nome='PageRank')),
((SELECT id FROM Framework WHERE nome='XPGraph'), (SELECT id FROM Algoritmo
WHERE nome='SSSP')),
((SELECT id FROM Framework WHERE nome='GraphOne'), (SELECT id FROM Algoritmo
WHERE nome='Triangle Counting')),
((SELECT id FROM Framework WHERE nome='GraphOne'), (SELECT id FROM Algoritmo
WHERE nome='BFS')),
((SELECT id FROM Framework WHERE nome='Ligra'), (SELECT id FROM Algoritmo WHERE
nome='PageRank')),
((SELECT id FROM Framework WHERE nome='GraphChi'), (SELECT id FROM Algoritmo
WHERE nome='WCC')),
((SELECT id FROM Framework WHERE nome='Gunrock'), (SELECT id FROM Algoritmo
WHERE nome='BFS')),
((SELECT id FROM Framework WHERE nome='Gemini'), (SELECT id FROM Algoritmo WHERE
nome='PageRank'));

INSERT INTO Publicacao (veiculo_id, artigo_id, pesquisador_id) VALUES
((SELECT id FROM Veiculo WHERE nome='ACM Conference'), (SELECT id FROM Artigo
WHERE doi='10.1145/DGAP2024'), (SELECT id FROM Pesquisador WHERE
orcid='0000-0001-1111-1111')),
((SELECT id FROM Veiculo WHERE nome='ACM Conference'), (SELECT id FROM Artigo
WHERE doi='10.1145/DGAP2024'), (SELECT id FROM Pesquisador WHERE
orcid='0000-0002-2222-2222')),
((SELECT id FROM Veiculo WHERE nome='IEEE/ACM MICRO'), (SELECT id FROM Artigo
WHERE doi='10.1109/MICRO56248.2022.00091'), (SELECT id FROM Pesquisador WHERE
orcid='0000-0003-3333-3333')),
((SELECT id FROM Veiculo WHERE nome='USENIX FAST'), (SELECT id FROM Artigo WHERE
doi='10.5555/FAST19.227800'), (SELECT id FROM Pesquisador WHERE
orcid='0000-0004-4444-4444')),
((SELECT id FROM Veiculo WHERE nome='USENIX FAST'), (SELECT id FROM Artigo WHERE
doi='10.5555/FAST19.227800'), (SELECT id FROM Pesquisador WHERE
orcid='0000-0005-5555-5555')),

((SELECT id FROM Veiculo WHERE nome='PPoPP' AND edicao='18th'), (SELECT id FROM
Artigo WHERE doi='10.1145/2442516.2442530'), (SELECT id FROM Pesquisador WHERE
orcid='0000-0006-6666-6666'));
INSERT INTO Benchmark (tempo, data_benchmark, dataset_id, ambiente_id,
implementacao_id) VALUES
(7.1536, '2022-09-01', (SELECT id FROM Dataset WHERE nome='Friendster'), (SELECT id
FROM Ambiente_de_Execucao WHERE nome='Cluster NUMA PMEM'), (SELECT id FROM
Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE
nome='XPGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE
nome='PageRank'))),
(2.3450, '2023-11-15', (SELECT id FROM Dataset WHERE nome='LiveJournal'), (SELECT id
FROM Ambiente_de_Execucao WHERE nome='Servidor Optane A'), (SELECT id FROM
Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='DGAP')
AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(1.2300, '2023-11-15', (SELECT id FROM Dataset WHERE nome='LiveJournal'), (SELECT id
FROM Ambiente_de_Execucao WHERE nome='Servidor Optane A'), (SELECT id FROM
Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='DGAP')
AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
(15.4200, '2019-01-10', (SELECT id FROM Dataset WHERE nome='Twitter'), (SELECT id FROM
Ambiente_de_Execucao WHERE nome='Servidor de Banco de Dados'), (SELECT id FROM
Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE
nome='GraphOne') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
(0.8500, '2013-02-01', (SELECT id FROM Dataset WHERE nome='Orkut'), (SELECT id FROM
Ambiente_de_Execucao WHERE nome='AWS EC2 r5.24xlarge'), (SELECT id FROM
Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Ligra')
AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(0.1200, '2016-01-20', (SELECT id FROM Dataset WHERE nome='USA Road Network'),
(SELECT id FROM Ambiente_de_Execucao WHERE nome='Servidor GPU Nvidia'), (SELECT id
FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE
nome='Gunrock') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
-- Comparações adicionais entre frameworks nos mesmos datasets
(0.7420, '2023-11-20', (SELECT id FROM Dataset WHERE nome='LiveJournal'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='AWS EC2 r5.24xlarge'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Ligra') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(0.0890, '2023-11-20', (SELECT id FROM Dataset WHERE nome='LiveJournal'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Servidor GPU Nvidia'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gunrock') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
(1.8500, '2023-11-20', (SELECT id FROM Dataset WHERE nome='LiveJournal'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Cluster NUMA PMEM'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='XPGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(0.9800, '2023-11-20', (SELECT id FROM Dataset WHERE nome='LiveJournal'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Cluster Distribuído Tianhe'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gemini') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(8.4500, '2023-12-05', (SELECT id FROM Dataset WHERE nome='Twitter'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Servidor Optane A'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='DGAP') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(4.2100, '2023-12-05', (SELECT id FROM Dataset WHERE nome='Twitter'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='AWS EC2 r5.24xlarge'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Ligra') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(9.1000, '2023-12-05', (SELECT id FROM Dataset WHERE nome='Twitter'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Cluster NUMA PMEM'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='XPGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(3.9500, '2023-12-05', (SELECT id FROM Dataset WHERE nome='Twitter'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Cluster Distribuído Tianhe'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gemini') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(5.9200, '2023-12-10', (SELECT id FROM Dataset WHERE nome='Friendster'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Servidor Optane A'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='DGAP') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(3.1200, '2023-12-10', (SELECT id FROM Dataset WHERE nome='Friendster'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='AWS EC2 r5.24xlarge'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Ligra') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(2.8900, '2023-12-10', (SELECT id FROM Dataset WHERE nome='Friendster'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Cluster Distribuído Tianhe'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gemini') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(1.0500, '2024-01-15', (SELECT id FROM Dataset WHERE nome='Orkut'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Servidor Optane A'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='DGAP') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(1.3400, '2024-01-15', (SELECT id FROM Dataset WHERE nome='Orkut'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Cluster NUMA PMEM'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='XPGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
(0.1850, '2024-01-15', (SELECT id FROM Dataset WHERE nome='Orkut'), (SELECT id FROM Ambiente_de_Execucao WHERE nome='Servidor GPU Nvidia'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gunrock') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS')));

-- Relacionamentos
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
((SELECT id FROM Artigo WHERE doi='10.5555/3026877.3026883'), (SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Gemini') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank')));
INSERT INTO Avaliacao_Dataset (dataset_id, artigo_id) VALUES
((SELECT id FROM Dataset WHERE nome='LiveJournal'), (SELECT id FROM Artigo WHERE
doi='10.1145/DGAP2024')),
((SELECT id FROM Dataset WHERE nome='Friendster'), (SELECT id FROM Artigo WHERE
doi='10.1109/MICRO56248.2022.00091')),
((SELECT id FROM Dataset WHERE nome='Twitter'), (SELECT id FROM Artigo WHERE
doi='10.5555/FAST19.227800')),
((SELECT id FROM Dataset WHERE nome='Orkut'), (SELECT id FROM Artigo WHERE
doi='10.1145/2442516.2442530')),
((SELECT id FROM Dataset WHERE nome='USA Road Network'), (SELECT id FROM Artigo
WHERE doi='10.1145/2851141.2851145')),
((SELECT id FROM Dataset WHERE nome='Kron30'), (SELECT id FROM Artigo WHERE
doi='10.1109/MICRO56248.2022.00091'));
INSERT INTO Aplicacao_Tecnica_Otimizacao (tecnica_id, implementacao_id, data_aplicacao)
VALUES
((SELECT id FROM Tecnica_de_Otimizacao WHERE nome='NUMA-Aware Allocation'),
(SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework
WHERE nome='XPGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE
nome='PageRank')), '2022-01-15'),
((SELECT id FROM Tecnica_de_Otimizacao WHERE nome='Direction-Optimizing BFS'),
(SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework
WHERE nome='Ligra') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE
nome='PageRank')), '2013-01-10'),
((SELECT id FROM Tecnica_de_Otimizacao WHERE nome='Dual-Versioning'), (SELECT id
FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE
nome='GraphOne') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='Triangle Counting')), '2018-06-20'),
((SELECT id FROM Tecnica_de_Otimizacao WHERE nome='Parallel Sliding Windows'),
(SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework
WHERE nome='GraphChi') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE
nome='WCC')), '2012-05-10'),
((SELECT id FROM Tecnica_de_Otimizacao WHERE nome='Lock-Free Updates'), (SELECT id
FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE
nome='DGAP') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS')),
'2023-08-01');
INSERT INTO Implementacao_Estrutura_Dados (estrutura_id, implementacao_id) VALUES
((SELECT id FROM Estrutura_de_Dados WHERE nome='Block-based CSR'), (SELECT id
FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE
nome='DGAP') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
((SELECT id FROM Estrutura_de_Dados WHERE nome='XPBuffer'), (SELECT id FROM
Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE
nome='XPGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='SSSP'))),

((SELECT id FROM Estrutura_de_Dados WHERE nome='Edge List'), (SELECT id FROM
Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE
nome='GraphOne') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
((SELECT id FROM Estrutura_de_Dados WHERE nome='CSR (Compressed Sparse Row)'),
(SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework
WHERE nome='Ligra') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE
nome='PageRank'))),
((SELECT id FROM Estrutura_de_Dados WHERE nome='Grafos em Disco (GraphChi)'),
(SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework
WHERE nome='GraphChi') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE
nome='WCC')));
INSERT INTO Implementacao_Aplicacao (aplicacao_id, implementacao_id) VALUES
((SELECT id FROM Aplicacao WHERE empresa='Facebook'), (SELECT id FROM
Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE nome='Ligra')
AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='PageRank'))),
((SELECT id FROM Aplicacao WHERE empresa='Google' AND area='Mecanismo de Busca'),
(SELECT id FROM Implementacao WHERE framework_id=(SELECT id FROM Framework
WHERE nome='XPGraph') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE
nome='PageRank'))),
((SELECT id FROM Aplicacao WHERE empresa='Stripe'), (SELECT id FROM Implementacao
WHERE framework_id=(SELECT id FROM Framework WHERE nome='GraphOne') AND
algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='Triangle Counting'))),
((SELECT id FROM Aplicacao WHERE empresa='Google' AND area='Transporte'), (SELECT id
FROM Implementacao WHERE framework_id=(SELECT id FROM Framework WHERE
nome='Gunrock') AND algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS'))),
((SELECT id FROM Aplicacao WHERE empresa='Amazon'), (SELECT id FROM Implementacao
WHERE framework_id=(SELECT id FROM Framework WHERE nome='DGAP') AND
algoritmo_id=(SELECT id FROM Algoritmo WHERE nome='BFS')));
INSERT INTO Utilizacao_Aplicacao (pessoa_id, aplicacao_id) VALUES
((SELECT id FROM Pessoa WHERE cpf='66666666666'), (SELECT id FROM Aplicacao
WHERE empresa='Facebook')),
((SELECT id FROM Pessoa WHERE cpf='33333333333'), (SELECT id FROM Aplicacao
WHERE empresa='Google' AND area='Mecanismo de Busca')),
((SELECT id FROM Pessoa WHERE cpf='44444444444'), (SELECT id FROM Aplicacao
WHERE empresa='Stripe')),
((SELECT id FROM Pessoa WHERE cpf='10101010101'), (SELECT id FROM Aplicacao
WHERE empresa='Google' AND area='Transporte')),
((SELECT id FROM Pessoa WHERE cpf='11111111111'), (SELECT id FROM Aplicacao WHERE
empresa='Amazon'));
INSERT INTO Aplicacao_Aplicacao (aplicacao_base_id, aplicacao_nova_id) VALUES
((SELECT id FROM Aplicacao WHERE empresa='Facebook'), (SELECT id FROM Aplicacao
WHERE empresa='Amazon')),
((SELECT id FROM Aplicacao WHERE empresa='Google' AND area='Mecanismo de Busca'),
(SELECT id FROM Aplicacao WHERE empresa='Stripe')),

((SELECT id FROM Aplicacao WHERE empresa='Google' AND area='Transporte'), (SELECT id
FROM Aplicacao WHERE empresa='FedEx')),
((SELECT id FROM Aplicacao WHERE empresa='Amazon'), (SELECT id FROM Aplicacao
WHERE empresa='Netflix')),
((SELECT id FROM Aplicacao WHERE empresa='Stripe'), (SELECT id FROM Aplicacao
WHERE empresa='Chainalysis'));

INSERT INTO Artigo_Artigo (artigo_citando_id, artigo_citado_id) VALUES
((SELECT id FROM Artigo WHERE doi='10.1145/DGAP2024'), (SELECT id FROM Artigo WHERE doi='10.1109/MICRO56248.2022.00091')),
((SELECT id FROM Artigo WHERE doi='10.1145/DGAP2024'), (SELECT id FROM Artigo WHERE doi='10.5555/FAST19.227800')),
((SELECT id FROM Artigo WHERE doi='10.1145/DGAP2024'), (SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530')),
((SELECT id FROM Artigo WHERE doi='10.1109/MICRO56248.2022.00091'), (SELECT id FROM Artigo WHERE doi='10.5555/FAST19.227800')),
((SELECT id FROM Artigo WHERE doi='10.1109/MICRO56248.2022.00091'), (SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530')),
((SELECT id FROM Artigo WHERE doi='10.1109/MICRO56248.2022.00091'), (SELECT id FROM Artigo WHERE doi='10.5555/3026877.3026883')),
((SELECT id FROM Artigo WHERE doi='10.5555/FAST19.227800'), (SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530')),
((SELECT id FROM Artigo WHERE doi='10.5555/FAST19.227800'), (SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387884')),
((SELECT id FROM Artigo WHERE doi='10.5555/FAST19.227800'), (SELECT id FROM Artigo WHERE doi='10.5555/3026877.3026883')),
((SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530'), (SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387884')),
((SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530'), (SELECT id FROM Artigo WHERE doi='10.1145/2503210.2503214')),
((SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530'), (SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387882')),
((SELECT id FROM Artigo WHERE doi='10.5555/3026877.3026883'), (SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530')),
((SELECT id FROM Artigo WHERE doi='10.5555/3026877.3026883'), (SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387884')),
((SELECT id FROM Artigo WHERE doi='10.5555/3026877.3026883'), (SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387882')),
((SELECT id FROM Artigo WHERE doi='10.1145/2851141.2851145'), (SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530')),
((SELECT id FROM Artigo WHERE doi='10.1145/2851141.2851145'), (SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387882')),
((SELECT id FROM Artigo WHERE doi='10.1145/2851141.2851145'), (SELECT id FROM Artigo WHERE doi='10.14778/2824032.2824033')),
((SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387882'), (SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387884')),
((SELECT id FROM Artigo WHERE doi='10.14778/2824032.2824033'), (SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530')),
((SELECT id FROM Artigo WHERE doi='10.14778/2824032.2824033'), (SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387882')),
-- Ciclos/Loops de citação (co-citações, revisões e retrospectivas)
((SELECT id FROM Artigo WHERE doi='10.1145/2503210.2503214'), (SELECT id FROM Artigo WHERE doi='10.1145/2442516.2442530')),
((SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387884'), (SELECT id FROM Artigo WHERE doi='10.5555/FAST19.227800')),
((SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387882'), (SELECT id FROM Artigo WHERE doi='10.1145/2851141.2851145')),
((SELECT id FROM Artigo WHERE doi='10.5555/2387880.2387884'), (SELECT id FROM Artigo WHERE doi='10.1145/DGAP2024'));

