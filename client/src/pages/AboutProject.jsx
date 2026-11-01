import React, { useState } from 'react';
import { 
  Database, GitFork, Repeat, Trophy, GraduationCap, 
  Sparkles, BookOpen, FileText, Image as ImageIcon, ExternalLink, Download, Maximize2, X
} from 'lucide-react';

export function AboutProject() {
  const [selectedDiagram, setSelectedDiagram] = useState(null);
  const tableDomains = [
    {
      domain: 'Produção Científica & Autoria',
      color: 'from-blue-500 to-indigo-600',
      description: 'Artigos, pesquisadores, afiliações institucionais, veículos de publicação e rede reflexiva de citações.',
      tables: [
        { name: 'Pessoa', desc: 'Dados cadastrais (CPF único, nome e cargo).' },
        { name: 'Instituicao', desc: 'Universidades e centros de pesquisa (nome único, localização e fundação).' },
        { name: 'Pesquisador', desc: 'Especialização de Pessoa ligada à Instituição com ORCID e área de pesquisa.' },
        { name: 'Artigo', desc: 'Publicações científicas com DOI único, data, título e contagem de citações.' },
        { name: 'Artigo_Artigo', desc: 'Grafo direcionado reflexivo de citações (artigo citando ➔ artigo citado).' },
        { name: 'Veiculo', desc: 'Conferências (PPoPP, MICRO, FAST, etc.) e periódicos de publicação.' },
        { name: 'Publicacao', desc: 'Relacionamento ternário associando Artigo, Pesquisador e Veículo.' },
      ]
    },
    {
      domain: 'Engenharia de Grafos & Algoritmos',
      color: 'from-purple-500 to-pink-600',
      description: 'Sistemas de processamento de grafos, algoritmos clássicos, estruturas de dados e complexidades.',
      tables: [
        { name: 'Framework', desc: 'Sistemas avaliados (DGAP, Ligra, Gunrock, XPGraph, etc.) com linguagem e consumo de grafo.' },
        { name: 'Algoritmo', desc: 'Algoritmos fundamentais (PageRank, BFS, SSSP, WCC, Triangle Counting).' },
        { name: 'Implementacao', desc: 'Pares concretos de Framework x Algoritmo implementado.' },
        { name: 'Estrutura_de_Dados', desc: 'Estruturas de representação (CSR, Dynamic CSR, Edge List, Hash Table).' },
        { name: 'Complexidade', desc: 'Ordens assintóticas de alocação, busca e inserção.' },
        { name: 'Tecnica_de_Otimizacao', desc: 'Técnicas especializadas (NUMA-Aware, Parallel Sliding Windows, Dual-Versioning).' },
        { name: 'Implementacao_Estrutura_Dados', desc: 'Estruturas de dados adotadas por cada implementação.' },
        { name: 'Aplicacao_Tecnica_Otimizacao', desc: 'Técnicas de otimização ativas em cada implementação.' },
      ]
    },
    {
      domain: 'Datasets & Benchmarking Experimental',
      color: 'from-amber-500 to-orange-600',
      description: 'Grafos reais em larga escala, ambientes de hardware heterogêneos e medições experimentais.',
      tables: [
        { name: 'Dataset', desc: 'Grafos reais (LiveJournal, Twitter, Friendster, etc.) com vértices e arestas.' },
        { name: 'Ambiente_de_Execucao', desc: 'Especificações de hardware (processador, RAM, GPU, nós NUMA, PMEM).' },
        { name: 'Benchmark', desc: 'Medições empíricas de tempo de execução (s) por dataset, ambiente e implementação.' },
        { name: 'Avaliacao_Artigo', desc: 'Artigos científicos que avaliaram empiricamente cada implementação.' },
        { name: 'Avaliacao_Dataset', desc: 'Datasets utilizados como base de teste em cada artigo científico.' },
      ]
    },
    {
      domain: 'Adoção Industrial & Mercado',
      color: 'from-emerald-500 to-teal-600',
      description: 'Aplicações no mundo real em grandes empresas de tecnologia e dependências sistêmicas.',
      tables: [
        { name: 'Aplicacao', desc: 'Sistemas corporativos (Google Search, Amazon Recommendations, Stripe Fraud, etc.).' },
        { name: 'Implementacao_Aplicacao', desc: 'Implementações de algoritmos de grafos incorporadas à aplicação.' },
        { name: 'Utilizacao_Aplicacao', desc: 'Especialistas e engenheiros responsáveis pelo uso do sistema.' },
        { name: 'Aplicacao_Aplicacao', desc: 'Dependências diretas e fluxo de dados entre aplicações industriais.' },
      ]
    }
  ];

  const queriesExplained = [
    {
      title: 'Detecção de Loops e Ciclos Fechados de Citação',
      sqlId: 'citation_loop_detection',
      badge: 'WITH RECURSIVE & Grafos',
      icon: Repeat,
      color: 'from-fuchsia-600 to-pink-500',
      concept: 'Na bibliometria, a presença de circuitos de citação mútua ou indireta (A ➔ B ➔ C ➔ A) revela co-citações e reedições cruzadas.',
      howItWorks: 'Utiliza uma CTE recursiva que parte de cada artigo e abre as referências em Artigo_Artigo, mantendo o histórico de nós visitados em um array. Quando o nó destino coincide com o ponto de partida (prox.id = id_inicial), o ciclo é confirmado. O SELECT final filtra com precisão cirúrgica WHERE eh_ciclo = true, isolando apenas os loops.',
    },
    {
      title: 'Ranking do Melhor Framework por Dataset com HAVING em Citações',
      sqlId: 'dataset_framework_ranking',
      badge: 'DENSE_RANK & HAVING',
      icon: Trophy,
      color: 'from-amber-500 to-yellow-500',
      concept: 'Identifica qual framework atinge a melhor marca de velocidade para cada dataset, mas exige relevância acadêmica mínima comprovada por citações.',
      howItWorks: 'Cruza Dataset com Benchmark, Implementacao e Framework. Agrupa por dataset e framework para calcular MIN(tempo) e AVG(tempo). Utiliza a função analítica de janela DENSE_RANK() OVER (PARTITION BY dataset_id ORDER BY melhor_tempo_s ASC) para gerar o pódio e filtra via HAVING COALESCE(MAX(art.num_citacoes), 0) >= min.',
    },
    {
      title: 'Produtividade por Instituição com GROUP BY e HAVING por Área',
      sqlId: 'institution_researcher_productivity',
      badge: 'GROUP BY & HAVING',
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-500',
      concept: 'Avalia a força de pesquisa institucional, calculando a taxa de artigos gerados por pesquisador (produtividade média).',
      howItWorks: 'Realiza um GROUP BY nas instituições, aplicando contagens distintas COUNT(DISTINCT p.id) e COUNT(DISTINCT pub.artigo_id). A razão é computada de forma segura com NULLIF() para evitar divisão por zero. O HAVING filtra dinamicamente áreas de pesquisa através da função agregadora booleana BOOL_OR(p.area_pesquisa ILIKE $1).',
    },
    {
      title: 'Cadeia Recursiva de Citações com DENSE_RANK',
      sqlId: 'citation_recursive_network',
      badge: 'WITH RECURSIVE & RANK',
      icon: GitFork,
      color: 'from-violet-500 to-cyan-500',
      concept: 'Mapeia a linhagem de influência bibliográfica a partir do artigo mais citado de determinado tema.',
      howItWorks: 'Filtra os artigos candidatos pelo Framework ou Algoritmo escolhido, atribui ranking pelo número de citações com DENSE_RANK() e seleciona o artigo raiz (#1). Em seguida, uma CTE recursiva navega pelas citações até o 3º nível com prevenção estrita de ciclos infinitos.',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Sobre o Sistema: Esquema Relacional & Consultas Avançadas</h2>
            <p className="text-xs text-slate-400">
              Trabalho Prático de Banco de Dados II • UNESP • Modelagem Relacional & Análise de Dados
            </p>
          </div>
        </div>
      </div>

      {/* Diagrams Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Diagramas do Projeto: Conceitual (MER) e Lógico (ER)</h3>
          </div>
          <span className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/60 w-fit">
            Arquivos Originais Disponíveis
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Os diagramas oficiais desenvolvidos para a modelagem do banco de dados relacional. Clique nos cartões para ampliar em tela cheia ou utilize os botões para visualizar e baixar os arquivos originais em PDF ou imagem.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Card 1: Diagrama MER (Conceitual) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md">
                    <FileText className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">Diagrama Conceitual (MER)</h4>
                    <span className="text-[11px] text-slate-400">Modelo Entidade-Relacionamento • Formato PDF</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Conceitual
                </span>
              </div>

              {/* Thumbnail Preview */}
              <div 
                onClick={() => setSelectedDiagram({
                  title: 'Diagrama Conceitual (MER)',
                  type: 'image',
                  src: '/diagramas/Diagrama_MER.png',
                  downloadUrl: '/diagramas/Diagrama_MER.pdf',
                  downloadName: 'Diagrama_MER.pdf'
                })}
                className="relative group cursor-pointer overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 mb-4 h-60 flex items-center justify-center p-2"
              >
                <img 
                  src="/diagramas/Diagrama_MER.png" 
                  alt="Pré-visualização do Diagrama MER" 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
                  <Maximize2 className="h-4 w-4 text-cyan-400" />
                  <span>Clique para Ampliar</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 mb-4">
                Define todas as entidades, atributos, cardinalidades e os relacionamentos do ecossistema, incluindo o auto-relacionamento reflexivo de citações e o atributo de citações em Artigo.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <a
                href="/diagramas/Diagrama_MER.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all"
              >
                <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
                Visualizar PDF
              </a>
              <a
                href="/diagramas/Diagrama_MER.pdf"
                download="Diagrama_MER.pdf"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow transition-all"
              >
                <Download className="h-3.5 w-3.5" />
                Baixar PDF
              </a>
            </div>
          </div>

          {/* Card 2: Diagrama ER (Lógico Relacional) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white shadow-md">
                    <ImageIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">Diagrama Lógico Relacional (ER)</h4>
                    <span className="text-[11px] text-slate-400">Esquema Físico / Tabelas • Formato JPEG</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Lógico / Físico
                </span>
              </div>

              {/* Thumbnail Preview */}
              <div 
                onClick={() => setSelectedDiagram({
                  title: 'Diagrama Lógico Relacional (ER)',
                  type: 'image',
                  src: '/diagramas/Diagrama_ER.jpeg',
                  downloadUrl: '/diagramas/Diagrama_ER.jpeg',
                  downloadName: 'Diagrama_ER.jpeg'
                })}
                className="relative group cursor-pointer overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 mb-4 h-60 flex items-center justify-center p-2"
              >
                <img 
                  src="/diagramas/Diagrama_ER.jpeg" 
                  alt="Pré-visualização do Diagrama ER" 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
                  <Maximize2 className="h-4 w-4 text-purple-400" />
                  <span>Clique para Ampliar</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 mb-4">
                Mapeamento das 24 tabelas relacionais com chaves primárias (PK), chaves estrangeiras (FK), tipos de dados, tabela associativa de citações (<code className="text-indigo-300">Artigo_Artigo</code>) e restrições de integridade.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <a
                href="/diagramas/Diagrama_ER.jpeg"
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all"
              >
                <ExternalLink className="h-3.5 w-3.5 text-purple-400" />
                Visualizar JPEG
              </a>
              <a
                href="/diagramas/Diagrama_ER.jpeg"
                download="Diagrama_ER.jpeg"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow transition-all"
              >
                <Download className="h-3.5 w-3.5" />
                Baixar JPEG
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Database Schema Section */}
      <div className="space-y-4 pt-6 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white">Esquema Relacional (24 Tabelas Modeladas)</h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          O banco de dados foi projetado a partir do diagrama conceitual EER sobre <strong>Sistemas de Processamento de Grafos em Larga Escala</strong>. 
          O esquema abrange desde o rigor científico (autoria, instituições, veículos e citações) até as minúcias de hardware e sistemas (NUMA, PMEM, GPU, estruturas de dados CSR e aplicações industriais).
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {tableDomains.map((dom, dIdx) => (
            <div key={dIdx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className={`h-3 w-3 rounded-full bg-gradient-to-r ${dom.color}`} />
                  <h4 className="text-sm font-bold text-white">{dom.domain}</h4>
                </div>
                <p className="text-xs text-slate-400 mb-4">{dom.description}</p>

                <div className="space-y-2">
                  {dom.tables.map((t) => (
                    <div key={t.name} className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <span className="font-mono font-bold text-indigo-300">{t.name}</span>
                      <span className="text-slate-400 text-[11px] sm:text-right">{t.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Queries Explanation */}
      <div className="space-y-4 pt-6 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white">A Ideia e Mecânica das Consultas Avançadas</h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Cada consulta complexa foi elaborada para responder a questões analíticas essenciais do domínio de grafos e ciência da computação, 
          combinando múltiplos operadores avançados do padrão SQL.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {queriesExplained.map((q) => {
            const Icon = q.icon;
            return (
              <div key={q.sqlId} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl bg-gradient-to-tr ${q.color} text-white`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white">{q.title}</h4>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {q.badge}
                    </span>
                  </div>

                  <div className="space-y-3 mt-4 text-xs">
                    <div>
                      <strong className="text-slate-300 block mb-1">Motivação no Domínio:</strong>
                      <p className="text-slate-400 leading-relaxed">{q.concept}</p>
                    </div>

                    <div>
                      <strong className="text-indigo-300 block mb-1">Engenharia SQL:</strong>
                      <p className="text-slate-400 leading-relaxed">{q.howItWorks}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>ID: {q.sqlId}</span>
                  <span className="text-indigo-400">Ver na aba Buscas Complexas ➔</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Modal for Diagram Preview */}
      {selectedDiagram && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedDiagram(null)}
        >
          <div 
            className="relative max-w-6xl w-full max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl p-4 flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-cyan-400" />
                <h4 className="text-base font-bold text-white">{selectedDiagram.title}</h4>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={selectedDiagram.downloadUrl}
                  download={selectedDiagram.downloadName}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all"
                >
                  <Download className="h-3.5 w-3.5" />
                  Baixar Arquivo
                </a>
                <a
                  href={selectedDiagram.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
                  Abrir Original
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedDiagram(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-2 flex items-center justify-center bg-slate-950/60 rounded-xl mt-3 min-h-[50vh]">
              <img
                src={selectedDiagram.src}
                alt={selectedDiagram.title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
