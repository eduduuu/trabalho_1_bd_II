-- ==============================================================================
-- Consulta 07: Matriz de Otimização e Estruturas de Dados por Framework
-- ==============================================================================
-- Descrição:
--   Cruza 7 tabelas com múltiplos LEFT JOINs (Implementação, Framework, Algoritmo,
--   Implementacao_Estrutura_Dados, Estrutura_de_Dados, Complexidade,
--   Aplicacao_Tecnica_Otimizacao e Tecnica_de_Otimizacao).
--   Apresenta quais estruturas de dados (ex: CSR, Dynamic CSR, Edge List) e quais
--   técnicas de otimização (ex: NUMA, Parallel Sliding Windows) cada framework adota.
-- ==============================================================================

SELECT 
  f.nome AS framework,
  a.nome AS algoritmo,
  COALESCE(ed.nome, 'Padrão do Framework') AS estrutura_de_dados,
  COALESCE(c.tipo_alocacao, 'N/A') AS tipo_alocacao,
  COALESCE(c.complexidade_busca, 'N/A') AS complexidade_busca,
  COALESCE(c.complexidade_insercao, 'N/A') AS complexidade_insercao,
  COALESCE(to_opt.nome, 'Nenhuma técnica especial') AS tecnica_otimizacao,
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
WHERE (NULLIF(:framework, '') IS NULL OR f.nome = :framework)
ORDER BY f.nome, a.nome;
