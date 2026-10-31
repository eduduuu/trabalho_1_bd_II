-- ==============================================================================
-- Consulta 01: Cadeia Recursiva de Citações com DENSE_RANK() e WITH RECURSIVE
-- ==============================================================================
-- Descrição:
--   Dado um Framework (ex: 'DGAP') ou Algoritmo (ex: 'PageRank') de interesse,
--   identifica os artigos que avaliaram implementações desse tema, ranqueia-os
--   por impacto (número de citações decrescente) via DENSE_RANK(), escolhe o artigo
--   raiz (#1 mais citado) e percorre recursivamente a rede de citações (Artigo_Artigo)
--   até 3 níveis de profundidade, prevenindo ciclos e exibindo o caminho de recursão.
-- ==============================================================================

WITH RECURSIVE
-- 1. Artigos candidatos que avaliaram implementações do tema escolhido
artigos_candidatos AS (
  SELECT DISTINCT 
    art.id AS artigo_id, 
    art.titulo, 
    art.doi, 
    art.data_publicacao, 
    art.num_citacoes, 
    f.nome AS framework_nome, 
    a.nome AS algoritmo_nome
  FROM Artigo art
  JOIN Avaliacao_Artigo aa ON aa.artigo_id = art.id
  JOIN Implementacao i ON aa.implementacao_id = i.id
  JOIN Framework f ON i.framework_id = f.id
  JOIN Algoritmo a ON i.algoritmo_id = a.id
  WHERE (NULLIF(:framework, '') IS NULL OR f.nome ILIKE '%' || :framework || '%')
    AND (NULLIF(:algoritmo, '') IS NULL OR a.nome ILIKE '%' || :algoritmo || '%')
),

-- 2. Ranqueamento dos candidatos por maior número de citações
artigo_ranqueado AS (
  SELECT 
    artigo_id, 
    titulo, 
    doi, 
    data_publicacao, 
    num_citacoes, 
    framework_nome, 
    algoritmo_nome,
    DENSE_RANK() OVER (ORDER BY num_citacoes DESC) as ranking
  FROM artigos_candidatos
),

-- 3. Seleção do artigo raiz (#1 em citações)
artigo_raiz AS (
  SELECT * FROM artigo_ranqueado WHERE ranking = 1 LIMIT 1
),

-- 4. Travessia recursiva na rede de citações até 3 níveis
cadeia_citacoes AS (
  -- Caso base: Artigo raiz ranqueado (nível 0)
  SELECT 
    r.artigo_id AS id_atual, 
    r.titulo AS titulo_atual, 
    r.doi AS doi_atual, 
    r.num_citacoes AS citacoes_atual,
    r.data_publicacao AS data_atual, 
    0 AS nivel, 
    CAST(r.titulo AS TEXT) AS caminho_recursao, 
    ARRAY[r.artigo_id] AS ids_visitados
  FROM artigo_raiz r

  UNION ALL

  -- Passo recursivo: artigos citados pelos artigos do nível anterior
  SELECT 
    prox.id AS id_atual, 
    prox.titulo AS titulo_atual, 
    prox.doi AS doi_atual, 
    prox.num_citacoes AS citacoes_atual,
    prox.data_publicacao AS data_atual, 
    c.nivel + 1 AS nivel,
    CAST(c.caminho_recursao || ' ➔ ' || prox.titulo AS TEXT) AS caminho_recursao,
    c.ids_visitados || prox.id AS ids_visitados
  FROM cadeia_citacoes c
  JOIN Artigo_Artigo aa ON c.id_atual = aa.artigo_citando_id
  JOIN Artigo prox ON aa.artigo_citado_id = prox.id
  WHERE c.nivel < 3 AND NOT (prox.id = ANY(c.ids_visitados))
)

-- 5. Projeção final ordenada por nível e contagem de citações
SELECT 
  nivel, 
  titulo_atual AS artigo, 
  citacoes_atual AS citacoes, 
  doi_atual AS doi, 
  data_atual AS data_publicacao, 
  caminho_recursao
FROM cadeia_citacoes
ORDER BY nivel ASC, citacoes_atual DESC;
