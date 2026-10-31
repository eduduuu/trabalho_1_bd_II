-- ==============================================================================
-- Consulta 03: Ranking do Melhor Framework por Dataset com HAVING em Citações
-- ==============================================================================
-- Descrição:
--   Partindo de cada Dataset, recupera todos os benchmarks executados, localiza
--   as implementações e os respectivos frameworks, e calcula métricas agregadas
--   de performance (menor tempo e tempo médio de execução).
--   Ranqueia os frameworks em cada dataset usando DENSE_RANK() OVER (PARTITION BY dataset_id)
--   e filtra via HAVING pelo número mínimo de citações do artigo do framework.
-- ==============================================================================

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
  WHERE (NULLIF(:dataset, '') IS NULL OR d.nome ILIKE '%' || :dataset || '%')
  GROUP BY d.id, d.nome, d.area, d.qtd_vertices, d.qtd_arestas, f.id, f.nome, f.linguagem
  HAVING COALESCE(MAX(art.num_citacoes), 0) >= COALESCE(:min_citacoes, 0)
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
