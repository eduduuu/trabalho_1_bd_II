-- ==============================================================================
-- Consulta 05: Ranking de Desempenho de Benchmarks de Grafos (Multi-table JOIN)
-- ==============================================================================
-- Descrição:
--   Cruza 5 tabelas (Benchmark, Implementação, Framework, Algoritmo, Dataset e
--   Ambiente de Execução), calculando a taxa de processamento (throughput) de
--   arestas por segundo: ROUND(d.qtd_arestas / b.tempo, 2).
--   Permite filtrar por faixa de tempo, nome de framework ou algoritmo.
-- ==============================================================================

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
WHERE b.tempo >= COALESCE(:min_time, 0) AND b.tempo <= COALESCE(:max_time, 1000)
  AND (NULLIF(:framework, '') IS NULL OR f.nome = :framework)
  AND (NULLIF(:algoritmo, '') IS NULL OR a.nome = :algoritmo)
ORDER BY b.tempo ASC;
