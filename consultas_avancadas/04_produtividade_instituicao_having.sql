-- ==============================================================================
-- Consulta 04: Produtividade por Instituição (GROUP BY & HAVING Área de Pesquisa)
-- ==============================================================================
-- Descrição:
--   Partindo de cada Instituição de ensino/pesquisa cadastrada, agrupa os
--   pesquisadores vinculados (GROUP BY), contabiliza a contagem distinta de
--   pesquisadores e a contagem distinta de artigos publicados por eles.
--   Calcula a razão (artigos / pesquisador) para mensurar a produtividade média.
--   Ordena por quantidade de pesquisadores decrescente e aplica filtro HAVING
--   dinâmico para áreas de pesquisa (ex: 'Grafos', 'Memória', 'Sistemas' ou sem filtro).
-- ==============================================================================

SELECT 
  inst.nome AS instituicao,
  inst.localizacao,
  COUNT(DISTINCT p.id) AS qtd_pesquisadores,
  COUNT(DISTINCT pub.artigo_id) AS qtd_artigos,
  COALESCE(ROUND(COUNT(DISTINCT pub.artigo_id) * 1.0 / NULLIF(COUNT(DISTINCT p.id), 0), 2), 0.00) AS razao_artigos_pesquisador,
  COALESCE(STRING_AGG(DISTINCT p.area_pesquisa, ', '), 'Nenhuma cadastrada') AS areas_pesquisa_instituicao,
  COALESCE(STRING_AGG(DISTINCT art.titulo, ' | '), 'Nenhum artigo publicado') AS titulos_artigos
FROM Instituicao inst
JOIN Pesquisador p ON p.instituicao_id = inst.id
LEFT JOIN Publicacao pub ON pub.pesquisador_id = p.id
LEFT JOIN Artigo art ON pub.artigo_id = art.id
GROUP BY inst.id, inst.nome, inst.localizacao
HAVING (NULLIF(:area_pesquisa, '') IS NULL OR BOOL_OR(p.area_pesquisa ILIKE '%' || :area_pesquisa || '%'))
ORDER BY qtd_pesquisadores DESC, qtd_artigos DESC, razao_artigos_pesquisador DESC;
