-- ==============================================================================
-- Consulta 08: Adoção Industrial de Grafos por Big Techs
-- ==============================================================================
-- Descrição:
--   Mapeia o uso corporativo e industrial de algoritmos e frameworks de grafos.
--   Cruza Aplicação, Implementacao_Aplicacao, Implementacao, Framework, Algoritmo,
--   Utilizacao_Aplicacao e Pessoa para revelar empresas reais (Google, Amazon,
--   Facebook, Stripe, Netflix), casos de uso, licença e responsáveis técnicos.
-- ==============================================================================

SELECT 
  app.empresa,
  app.area AS area_negocio,
  app.problema_resolvido,
  app.licenca,
  COALESCE(f.nome, 'Customizado') AS framework_utilizado,
  COALESCE(alg.nome, 'Não informado') AS algoritmo_chave,
  pes.nome AS usuario_responsavel,
  pes.cargo AS cargo_usuario
FROM Aplicacao app
LEFT JOIN Implementacao_Aplicacao ia ON ia.aplicacao_id = app.id
LEFT JOIN Implementacao impl ON ia.implementacao_id = impl.id
LEFT JOIN Framework f ON impl.framework_id = f.id
LEFT JOIN Algoritmo alg ON impl.algoritmo_id = alg.id
LEFT JOIN Utilizacao_Aplicacao ua ON ua.aplicacao_id = app.id
LEFT JOIN Pessoa pes ON ua.pessoa_id = pes.id
WHERE (NULLIF(:empresa, '') IS NULL OR app.empresa ILIKE '%' || :empresa || '%')
ORDER BY app.empresa ASC;
