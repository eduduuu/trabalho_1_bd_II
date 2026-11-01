import React, { useEffect, useState } from 'react';
import { 
  Zap, BookOpen, Layers, Building, Database, Filter, 
  ChevronDown, ChevronUp, Copy, Check, Clock, Table, Sparkles, GitFork,
  Repeat, Trophy, GraduationCap
} from 'lucide-react';
import { api } from '../services/api.js';

export function ComplexQueries() {
  const [activeQuery, setActiveQuery] = useState('citation_loop_detection');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSql, setShowSql] = useState(false);
  const [copied, setCopied] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    minTime: 0,
    maxTime: 1000,
    framework: '',
    algoritmo: '',
    instituicao: '',
    empresa: '',
    artigo: '',
    maxDepth: 5,
    minCitacoes: 100,
    dataset: '',
    areaPesquisa: '',
  });

  const queryPresets = [
    {
      id: 'citation_loop_detection',
      title: 'Detecção de Loops de Citações (WITH RECURSIVE)',
      subtitle: 'Traça recursivamente a rede de referências e filtra no SELECT final exclusivamente ciclos fechados',
      icon: Repeat,
      badge: 'Recursão & Ciclos',
      color: 'from-fuchsia-600 to-pink-500',
    },
    {
      id: 'dataset_framework_ranking',
      title: 'Melhor Framework por Dataset (HAVING Citações)',
      subtitle: 'Ranqueia frameworks no benchmark de cada dataset com HAVING num_citações >= mínimo escolhido',
      icon: Trophy,
      badge: 'DENSE_RANK & HAVING',
      color: 'from-amber-500 to-yellow-500',
    },
    {
      id: 'institution_researcher_productivity',
      title: 'Produtividade por Instituição (GROUP BY & HAVING)',
      subtitle: 'Agrupa pesquisadores por instituição, calcula artigos e razão de produtividade com HAVING por área',
      icon: GraduationCap,
      badge: 'GROUP BY & HAVING',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'citation_recursive_network',
      title: 'Cadeia Recursiva de Citações (WITH RECURSIVE & RANK)',
      subtitle: 'DENSE_RANK() do artigo de maior impacto no tema e percurso recursivo no grafo de citações até nível 3',
      icon: GitFork,
      badge: 'SQL Avançado & Grafos',
      color: 'from-violet-500 to-cyan-500',
    },
    {
      id: 'benchmark_ranking',
      title: 'Ranking de Desempenho de Benchmarks',
      subtitle: 'Junção de 5 tabelas (Benchmark, Implementação, Framework, Algoritmo, Dataset, Ambiente)',
      icon: Zap,
      badge: 'Performance & Throughput',
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 'researchers_network',
      title: 'Rede Acadêmica: Pesquisadores & Publicações',
      subtitle: 'Junção de 6 tabelas (Publicação, Pesquisador, Pessoa, Instituição, Artigo, Veículo)',
      icon: BookOpen,
      badge: 'Produção Científica',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      id: 'optimization_matrix',
      title: 'Matriz de Otimização e Estruturas de Dados',
      subtitle: 'Junção de 7 tabelas com LEFT JOINs (Framework, Estruturas, Complexidades e Técnicas)',
      icon: Layers,
      badge: 'Engenharia de Sistemas',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'industry_adoption',
      title: 'Adoção Industrial de Grafos (Big Techs)',
      subtitle: 'Junção de 6 tabelas relacionando Empresas, Frameworks, Algoritmos e Especialistas',
      icon: Building,
      badge: 'Casos Reais de Mercado',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'dataset_hardware_profiling',
      title: 'Perfil de Escala: Datasets vs Capacidade de Hardware',
      subtitle: 'Junção de Datasets com especificações de hardware de ambientes e tempos de execução',
      icon: Database,
      badge: 'Escalabilidade',
      color: 'from-rose-500 to-red-600',
    },
  ];

  const [lookups, setLookups] = useState({});

  useEffect(() => {
    async function loadLookups() {
      try {
        const res = await api.getLookups();
        if (res.success) {
          setLookups(res.data);
        }
      } catch (err) {
        console.error('Failed to load lookups:', err);
      }
    }
    loadLookups();
  }, []);

  useEffect(() => {
    runQuery(activeQuery, filters);
  }, [activeQuery]);

  async function runQuery(qId, currentFilters) {
    try {
      setLoading(true);
      const res = await api.runComplexQuery(qId, currentFilters);
      if (res.success) {
        setResults(res);
      }
    } catch (err) {
      console.error('Failed to run query:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleFilterSubmit(e) {
    e.preventDefault();
    runQuery(activeQuery, filters);
  }

  function copySqlToClipboard() {
    if (results?.sql) {
      navigator.clipboard.writeText(results.sql);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Consultas Complexas e Analíticas</h2>
            <p className="text-xs text-slate-400">
              Consultas com junções de múltiplas tabelas, filtros agregados e cálculos em tempo real
            </p>
          </div>
        </div>

        {/* Preset Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
          {queryPresets.map((preset) => {
            const Icon = preset.icon;
            const isSelected = activeQuery === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => setActiveQuery(preset.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-slate-800/90 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500'
                    : 'bg-slate-850 bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`p-2 rounded-lg bg-gradient-to-tr ${preset.color} text-white`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {preset.badge}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-white leading-tight">{preset.title}</h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{preset.subtitle}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Query Filter & SQL Toggle Bar */}
      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              {results?.title || 'Executando consulta...'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{results?.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSql(!showSql)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700 transition-all"
            >
              {showSql ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {showSql ? 'Ocultar SQL' : 'Inspecionar SQL'}
            </button>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-700/60 font-mono">
              <Clock className="h-3.5 w-3.5 text-indigo-400" />
              <span>{results?.durationMs ?? 0} ms</span>
            </div>
            <div className="text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-700/60 font-mono">
              <span>{results?.rowCount ?? 0} linhas</span>
            </div>
          </div>
        </div>

        {/* Dynamic Filters Form */}
        <form onSubmit={handleFilterSubmit} className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mr-1">
            <Filter className="h-3.5 w-3.5 text-indigo-400" /> Filtros:
          </div>

          {activeQuery === 'citation_loop_detection' && (
            <>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Artigo Origem:</span>
                <select
                  value={filters.artigo}
                  onChange={(e) => setFilters({ ...filters, artigo: e.target.value })}
                  className="max-w-[260px] px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">Todos os Artigos</option>
                  {lookups.artigo?.map((a) => (
                    <option key={a.id} value={a.titulo || a.label}>
                      {a.titulo || a.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Passos máx:</span>
                <select
                  value={filters.maxDepth}
                  onChange={(e) => setFilters({ ...filters, maxDepth: Number(e.target.value) })}
                  className="px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value={3}>3 passos</option>
                  <option value={4}>4 passos</option>
                  <option value={5}>5 passos</option>
                  <option value={6}>6 passos</option>
                </select>
              </div>
            </>
          )}

          {activeQuery === 'dataset_framework_ranking' && (
            <>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Dataset:</span>
                <select
                  value={filters.dataset}
                  onChange={(e) => setFilters({ ...filters, dataset: e.target.value })}
                  className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">Todos os Datasets</option>
                  {lookups.dataset?.map((d) => (
                    <option key={d.id} value={d.nome || d.label}>
                      {d.nome || d.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Mín. Citações (HAVING):</span>
                <input
                  type="number"
                  placeholder="ex: 100"
                  value={filters.minCitacoes}
                  onChange={(e) => setFilters({ ...filters, minCitacoes: e.target.value })}
                  className="w-24 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </>
          )}

          {activeQuery === 'institution_researcher_productivity' && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>Área de Pesquisa (HAVING):</span>
              <select
                value={filters.areaPesquisa}
                onChange={(e) => setFilters({ ...filters, areaPesquisa: e.target.value })}
                className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Todas as Áreas de Pesquisa</option>
                {lookups.areas_pesquisa?.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
          )}

          {(activeQuery === 'citation_recursive_network' || activeQuery === 'benchmark_ranking') && (
            <>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Framework:</span>
                <select
                  value={filters.framework}
                  onChange={(e) => setFilters({ ...filters, framework: e.target.value })}
                  className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">Todos os Frameworks</option>
                  {lookups.framework?.map((f) => (
                    <option key={f.id} value={f.nome || f.label}>
                      {f.nome || f.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Algoritmo:</span>
                <select
                  value={filters.algoritmo}
                  onChange={(e) => setFilters({ ...filters, algoritmo: e.target.value })}
                  className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">Todos os Algoritmos</option>
                  {lookups.algoritmo?.map((a) => (
                    <option key={a.id} value={a.nome || a.label}>
                      {a.nome || a.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {activeQuery === 'researchers_network' && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>Instituição:</span>
              <select
                value={filters.instituicao}
                onChange={(e) => setFilters({ ...filters, instituicao: e.target.value })}
                className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Todas as Instituições</option>
                {lookups.instituicao?.map((i) => (
                  <option key={i.id} value={i.nome || i.label}>
                    {i.nome || i.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {activeQuery === 'industry_adoption' && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>Empresa:</span>
              <select
                value={filters.empresa}
                onChange={(e) => setFilters({ ...filters, empresa: e.target.value })}
                className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Todas as Empresas</option>
                {lookups.empresas?.map((emp) => (
                  <option key={emp} value={emp}>
                    {emp}
                  </option>
                ))}
              </select>
            </div>
          )}

          {activeQuery === 'optimization_matrix' && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>Framework:</span>
              <select
                value={filters.framework}
                onChange={(e) => setFilters({ ...filters, framework: e.target.value })}
                className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Todos os Frameworks</option>
                {lookups.framework?.map((f) => (
                  <option key={f.id} value={f.nome || f.label}>
                    {f.nome || f.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-all"
          >
            Aplicar Filtros
          </button>
        </form>

        {/* Collapsible SQL Preview */}
        {showSql && (
          <div className="relative mt-3 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
            <button
              onClick={copySqlToClipboard}
              className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
            <pre className="whitespace-pre-wrap">{results?.sql}</pre>
          </div>
        )}
      </div>

      {/* Results Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                {results?.columns?.map((col) => (
                  <th key={col} className="px-4 py-3.5 whitespace-nowrap">
                    {col.replace(/_/g, ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans text-xs">
              {loading ? (
                <tr>
                  <td colSpan={results?.columns?.length || 5} className="px-4 py-12 text-center text-slate-500">
                    Executando busca complexa com junções na nuvem...
                  </td>
                </tr>
              ) : results?.rows?.length === 0 ? (
                <tr>
                  <td colSpan={results?.columns?.length || 5} className="px-4 py-12 text-center text-slate-500">
                    Nenhum resultado encontrado com os filtros atuais.
                  </td>
                </tr>
              ) : (
                results?.rows?.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    {results.columns.map((col) => {
                      const val = row[col];
                      let formatted = val;

                      // Highlight specific columns
                      if (col === 'nivel') {
                        const levelColors = [
                          'bg-purple-900/40 text-purple-300 border-purple-500/40 ring-1 ring-purple-500/30',
                          'bg-blue-900/40 text-blue-300 border-blue-500/40',
                          'bg-cyan-900/40 text-cyan-300 border-cyan-500/40',
                          'bg-emerald-900/40 text-emerald-300 border-emerald-500/40',
                        ];
                        const levelLabels = ['Nível 0 (Raiz / Top Citações)', 'Nível 1 (Citação Direta)', 'Nível 2 (Citação de Citação)', 'Nível 3 (Profundidade 3)'];
                        const num = Number(val);
                        formatted = (
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${levelColors[num] || 'bg-slate-800 text-slate-300'}`}>
                            {levelLabels[num] || `Nível ${num}`}
                          </span>
                        );
                      } else if (col === 'citacoes' || col === 'citacoes_artigo' || col === 'citacoes_artigo_framework' || col === 'citacoes_origem') {
                        formatted = (
                          <span className="font-mono font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-600/30">
                            {Number(val).toLocaleString()} citações
                          </span>
                        );
                      } else if (col === 'ranking_no_dataset') {
                        const rankNum = Number(val);
                        if (rankNum === 1) {
                          formatted = (
                            <span className="inline-flex items-center gap-1 font-bold text-amber-300 bg-amber-950/50 px-2.5 py-0.5 rounded-full border border-amber-500/40 shadow-sm shadow-amber-500/20">
                              🥇 1º Mais Rápido
                            </span>
                          );
                        } else if (rankNum === 2) {
                          formatted = (
                            <span className="inline-flex items-center gap-1 font-semibold text-slate-200 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-600/40">
                              🥈 2º Lugar
                            </span>
                          );
                        } else if (rankNum === 3) {
                          formatted = (
                            <span className="inline-flex items-center gap-1 font-semibold text-amber-600 bg-amber-950/30 px-2.5 py-0.5 rounded-full border border-amber-800/40">
                              🥉 3º Lugar
                            </span>
                          );
                        } else {
                          formatted = <span className="font-mono text-slate-400">#{val}</span>;
                        }
                      } else if (col === 'tamanho_ciclo') {
                        formatted = (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-fuchsia-950/70 text-fuchsia-300 border border-fuchsia-500/40 ring-1 ring-fuchsia-500/20">
                            🔄 {val} passos no ciclo
                          </span>
                        );
                      } else if (col === 'caminho_recursao' || col === 'caminho_loop') {
                        const steps = typeof val === 'string' ? val.split(' ➔ ') : [val];
                        formatted = (
                          <div className="flex items-center flex-wrap gap-1 max-w-2xl py-1">
                            {steps.map((step, sIdx) => (
                              <React.Fragment key={sIdx}>
                                <span className={`text-[11px] px-2 py-0.5 rounded font-mono ${
                                  sIdx === 0 
                                    ? 'bg-purple-950/80 text-purple-200 border border-purple-700/50 font-semibold'
                                    : sIdx === steps.length - 1
                                    ? col === 'caminho_loop'
                                      ? 'bg-fuchsia-950/80 text-fuchsia-200 border border-fuchsia-700/50 font-bold'
                                      : 'bg-indigo-950/80 text-indigo-200 border border-indigo-700/50 font-semibold'
                                    : 'bg-slate-800 text-slate-300 border border-slate-700/50'
                                }`}>
                                  {step}
                                </span>
                                {sIdx < steps.length - 1 && (
                                  <span className="text-slate-500 font-bold text-[10px]">➔</span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        );
                      } else if (col === 'razao_artigos_pesquisador') {
                        formatted = (
                          <span className="font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-600/30">
                            {Number(val).toFixed(2)} art/pesq
                          </span>
                        );
                      } else if (col.includes('tempo')) {
                        formatted = (
                          <span className="font-mono font-bold text-emerald-400">
                            {Number(val).toFixed(4)} s
                          </span>
                        );
                      } else if (col.includes('arestas_por_segundo')) {
                        formatted = (
                          <span className="font-mono text-cyan-300 font-medium">
                            {Number(val).toLocaleString()}
                          </span>
                        );
                      } else if (col === 'framework' || col === 'empresa' || col === 'artigo' || col === 'artigo_origem' || col === 'instituicao') {
                        formatted = <strong className="text-white font-semibold">{val}</strong>;
                      } else if (val === null || val === undefined) {
                        formatted = <span className="text-slate-600">-</span>;
                      } else if (typeof val === 'string' && val.startsWith('http')) {
                        formatted = (
                          <a href={val} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">
                            Link
                          </a>
                        );
                      }

                      return (
                        <td key={col} className="px-4 py-3 whitespace-nowrap">
                          {formatted}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
