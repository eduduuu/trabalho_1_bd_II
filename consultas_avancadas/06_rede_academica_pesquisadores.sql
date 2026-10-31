-- ==============================================================================
-- Consulta 06: Rede Acadêmica (Pesquisadores, Artigos, Veículos e Instituições)
-- ==============================================================================
-- Descrição:
--   Mapeia o ecossistema científico unindo 6 tabelas (Publicação, Pesquisador,
--   Pessoa, Instituição, Artigo e Veículo de publicação).
--   Exibe pesquisadores com ORCID, filiação institucional, título do artigo,
--   DOI e o veículo (conferência ou revista) com edição e local.
-- ==============================================================================

SELECT 
  pes.nome AS pesquisador,
  pes.cargo,
  p.orcid,
  p.area_pesquisa,
  inst.nome AS instituicao_pesquisador,
  inst.localizacao AS localizacao_instituicao,
  art.titulo AS titulo_artigo,
  art.doi,
  art.num_citacoes,
  art.data_publicacao AS data_artigo,
  v.nome AS veiculo_publicacao,
  v.edicao,
  v.tipo AS tipo_veiculo,
  v.local_publicacao
FROM Publicacao pub
JOIN Pesquisador p ON pub.pesquisador_id = p.id
JOIN Pessoa pes ON p.pessoa_id = pes.id
JOIN Instituicao inst ON p.instituicao_id = inst.id
JOIN Artigo art ON pub.artigo_id = art.id
JOIN Veiculo v ON pub.veiculo_id = v.id
WHERE (NULLIF(:instituicao, '') IS NULL OR inst.nome ILIKE '%' || :instituicao || '%')
ORDER BY art.num_citacoes DESC, art.data_publicacao DESC, pes.nome ASC;
