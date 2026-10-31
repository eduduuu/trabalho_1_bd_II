-- ==============================================================================
-- Consulta 02: Detecção de Loops e Ciclos Fechados de Citação (WITH RECURSIVE)
-- ==============================================================================
-- Descrição:
--   Parte de cada artigo científico cadastrado, expande recursivamente a rede
--   de citações bibliográficas (Artigo_Artigo) rastreando os IDs já visitados
--   em um array PostgreSQL. Quando encontra um artigo que corresponde ao nó
--   inicial do caminho (prox.id = id_inicial), identifica um ciclo fechado.
--   O SELECT final isola EXCLUSIVAMENTE os caminhos que formam loops de citação.
-- ==============================================================================

WITH RECURSIVE caminhos_citacoes AS (
  -- Caso base: arestas de citação inicial partindo dos artigos
  SELECT 
    aa.artigo_citando_id AS id_inicial,
    aa.artigo_citando_id AS id_atual,
    aa.artigo_citado_id AS prox_id,
    1 AS passos,
    ARRAY[aa.artigo_citando_id, aa.artigo_citado_id] AS caminho_ids,
    CAST(a1.titulo || ' ➔ ' || a2.titulo AS TEXT) AS caminho_titulos,
    (aa.artigo_citado_id = aa.artigo_citando_id) AS eh_ciclo
  FROM Artigo_Artigo aa
  JOIN Artigo a1 ON aa.artigo_citando_id = a1.id
  JOIN Artigo a2 ON aa.artigo_citado_id = a2.id
  WHERE (NULLIF(:artigo, '') IS NULL OR a1.titulo ILIKE '%' || :artigo || '%')

  UNION ALL

  -- Passo recursivo: expande citações até fechar o ciclo ou atingir profundidade máxima
  SELECT 
    c.id_inicial,
    c.prox_id AS id_atual,
    prox.artigo_citado_id AS prox_id,
    c.passos + 1,
    c.caminho_ids || prox.artigo_citado_id,
    CAST(c.caminho_titulos || ' ➔ ' || a_prox.titulo AS TEXT),
    (prox.artigo_citado_id = c.id_inicial)
  FROM caminhos_citacoes c
  JOIN Artigo_Artigo prox ON c.prox_id = prox.artigo_citando_id
  JOIN Artigo a_prox ON prox.artigo_citado_id = a_prox.id
  WHERE NOT c.eh_ciclo 
    AND c.passos < COALESCE(:max_depth, 5)
    AND (prox.artigo_citado_id = c.id_inicial OR NOT (prox.artigo_citado_id = ANY(c.caminho_ids)))
)
-- Filtro final: projeta SOMENTE caminhos que formam ciclos fechados de citação
SELECT 
  a_ini.titulo AS artigo_origem,
  passos AS tamanho_ciclo,
  caminho_titulos AS caminho_loop,
  a_ini.doi AS doi_origem,
  a_ini.num_citacoes AS citacoes_origem
FROM caminhos_citacoes c
JOIN Artigo a_ini ON c.id_inicial = a_ini.id
WHERE eh_ciclo = true
ORDER BY tamanho_ciclo ASC, artigo_origem ASC;
