import React, { useEffect, useState } from 'react';
import { 
  Trophy, Award, Building, Zap, ArrowRight, 
  TrendingUp, BarChart3, Layers, CheckCircle2, ShieldCheck
} from 'lucide-react';
import { api } from '../services/api.js';

export function Dashboard({ onNavigate, status }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await api.getInsights();
        if (res.success && res.data) {
          setInsights(res.data);
        }
      } catch (err) {
        console.error('Error loading dashboard insights:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const bestFw = insights?.bestFrameworkPerAlgorithm || [];
  const topInst = insights?.topInstitutions || [];
  const edgeDist = insights?.edgeTypeDistribution || [];
  const langDist = insights?.languageDistribution || [];
  const topDatasets = insights?.topDatasets || [];

  // Max value calculations for charts
  const maxPesquisadores = Math.max(...(topInst.map(i => parseInt(i.total_pesquisadores, 10)) || [1]), 1);
  const maxArestas = Math.max(...(topDatasets.map(d => parseInt(d.qtd_arestas, 10)) || [1]), 1);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-500/30 p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            Trabalho de Banco de Dados II - UNESP
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Painel Analítico de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Processamento de Grafos</span>
          </h1>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            Visão geral inteligente sobre desempenho de frameworks, algoritmos de grafos, produção acadêmica e capacidade de processamento sobre grafos de bilhões de arestas.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('complex')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/30"
            >
              Consultas Complexas
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigate('crud')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition-all"
            >
              Gerenciar Entidades (CRUD)
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Banco na Nuvem: <strong className="text-slate-200">{status?.adapter || 'Neon PostgreSQL'}</strong></span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-cyan-400" />
            <span>Arquitetura: <strong className="text-slate-200">Database Adapter Pattern</strong></span>
          </div>
        </div>
      </div>

      {/* Top Highlights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md">
              <Trophy className="h-5 w-5" />
            </span>
            <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              Menor Latência
            </span>
          </div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Framework Mais Rápido</h3>
          <p className="text-xl font-black text-white mt-1">Gunrock</p>
          <p className="text-xs text-slate-400 mt-1">
            <strong className="text-emerald-400 font-mono">0.1200s</strong> no algoritmo BFS (GPU VRAM)
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-md">
              <Award className="h-5 w-5" />
            </span>
            <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              Vencedor PageRank
            </span>
          </div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Melhor em Shared-Memory</h3>
          <p className="text-xl font-black text-white mt-1">Ligra</p>
          <p className="text-xs text-slate-400 mt-1">
            <strong className="text-emerald-400 font-mono">0.8500s</strong> no grafo Orkut (137.8M arestas/s)
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-white shadow-md">
              <Building className="h-5 w-5" />
            </span>
            <span className="text-[11px] font-semibold text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
              Polo Acadêmico
            </span>
          </div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Líder em Pesquisadores</h3>
          <p className="text-xl font-black text-white mt-1">GWU & UNC Charlotte</p>
          <p className="text-xs text-slate-400 mt-1">
            2 pesquisadores cada em Sistemas Distribuídos e PMEM
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-md">
              <Zap className="h-5 w-5" />
            </span>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              1.80 Bilhão
            </span>
          </div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Grafo de Maior Escala</h3>
          <p className="text-xl font-black text-white mt-1">Friendster</p>
          <p className="text-xs text-slate-400 mt-1">
            65.6M vértices testados no cluster NUMA PMEM
          </p>
        </div>
      </div>

      {/* Section 1: Melhor Framework para Cada Algoritmo */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-400" />
              Melhor Framework para Cada Algoritmo
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Frameworks que registraram o menor tempo de execução nos testes de benchmark
            </p>
          </div>
          <button
            onClick={() => onNavigate('complex')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
          >
            Ver todos os benchmarks <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bestFw.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-gradient-to-r from-slate-850 to-slate-900 border border-indigo-500/20 shadow-lg relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs border border-indigo-500/30">
                  Algoritmo: {item.algoritmo}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  {Number(item.tempo_segundos).toFixed(4)} s
                </span>
              </div>

              <div className="mt-2">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl font-extrabold text-white">{item.framework}</h3>
                  <span className="text-xs text-slate-400 font-medium">({item.linguagem})</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Ambiente: <strong className="text-white">{item.ambiente}</strong>
                </p>
                <p className="text-xs text-slate-300">
                  Dataset: <strong className="text-slate-100">{item.dataset}</strong>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Vazão de Processamento:</span>
                <span className="font-mono font-semibold text-cyan-300">
                  {Number(item.arestas_por_segundo).toLocaleString()} arestas/s
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Gráficos Visuais Comparativos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico 1: Instituições com Mais Pesquisadores */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-400" />
                Instituições com Mais Pesquisadores
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Ranking de pesquisadores por universidade ou centro</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {topInst.filter(i => parseInt(i.total_pesquisadores, 10) > 0).map((inst, i) => {
              const count = parseInt(inst.total_pesquisadores, 10);
              const percentage = Math.round((count / maxPesquisadores) * 100);

              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-slate-200">{inst.instituicao}</span>
                    <span className="font-semibold text-indigo-300 font-mono">
                      {count} {count === 1 ? 'pesquisador' : 'pesquisadores'}
                    </span>
                  </div>
                  {/* Progress Bar Chart */}
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">{inst.localizacao}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gráfico 2: Datasets por Volume de Arestas */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyan-400" />
                Escala dos Maiores Datasets de Grafos
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Comparativo do volume de arestas nos conjuntos de dados</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {topDatasets.map((ds, i) => {
              const arestas = parseInt(ds.qtd_arestas, 10);
              const percentage = Math.max(8, Math.round((arestas / maxArestas) * 100));

              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-slate-200">
                      {ds.nome} <span className="text-slate-500 text-[11px]">({ds.area})</span>
                    </span>
                    <span className="font-semibold text-cyan-300 font-mono">
                      {arestas >= 1000000000
                        ? `${(arestas / 1000000000).toFixed(2)}B arestas`
                        : `${(arestas / 1000000).toFixed(1)}M arestas`}
                    </span>
                  </div>
                  {/* Progress Bar Chart */}
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">
                    {Number(ds.qtd_vertices).toLocaleString()} vértices
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section 3: Distribuição por Paradigmas de Aresta & Linguagem */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Layers className="h-4 w-4 text-indigo-400" />
            Paradigmas de Grafos (Tipos de Aresta)
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {edgeDist.map((ed, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-center">
                <span className="text-2xl font-black text-white">{ed.total}</span>
                <p className="text-xs font-semibold text-indigo-300 mt-1">Arestas {ed.tipo_aresta}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {ed.tipo_aresta === 'Dinâmica' ? 'Inserção & Remoção Contínua' : 'Topologia Imutável'}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Award className="h-4 w-4 text-cyan-400" />
            Linguagens dos Frameworks
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {langDist.map((ld, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-center">
                <span className="text-2xl font-black text-white">{ld.total}</span>
                <p className="text-xs font-semibold text-cyan-300 mt-1">{ld.linguagem}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {ld.linguagem.includes('CUDA') ? 'Processamento em GPU Paralelo' : 'CPU Nativo de Alto Desempenho'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
