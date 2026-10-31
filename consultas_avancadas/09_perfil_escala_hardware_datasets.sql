-- ==============================================================================
-- Consulta 09: Perfil de Escala (Datasets vs Capacidade de Hardware)
-- ==============================================================================
-- Descrição:
--   Cruza especificações de escala dos grafos (vértices, arestas, tipo de grafo,
--   tamanho do arquivo em MB) com a arquitetura de hardware utilizada nos benchmarks
--   (núcleos de CPU, memória RAM, nós NUMA, GPU e armazenamento secundário).
-- ==============================================================================

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
