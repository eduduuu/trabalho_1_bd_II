import React, { useState } from 'react';
import { Code2, Play, Clock, AlertCircle, Sparkles } from 'lucide-react';
import { api } from '../services/api.js';

export function CustomQuery() {
  const [sql, setSql] = useState(`SELECT \n  f.nome AS framework,\n  a.nome AS algoritmo,\n  b.tempo,\n  d.nome AS dataset\nFROM Benchmark b\nJOIN Implementacao i ON b.implementacao_id = i.id\nJOIN Framework f ON i.framework_id = f.id\nJOIN Algoritmo a ON i.algoritmo_id = a.id\nJOIN Dataset d ON b.dataset_id = d.id\nORDER BY b.tempo ASC\nLIMIT 10;`);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sampleQueries = [
    {
      title: 'Top 5 maiores Datasets por número de arestas',
      sql: `SELECT nome, area, qtd_vertices, qtd_arestas, ROUND((tamanho_arquivo / (1024*1024)), 2) AS tamanho_mb\nFROM Dataset\nORDER BY qtd_arestas DESC\nLIMIT 5;`,
    },
    {
      title: 'Tempo médio de execução agrupado por Framework',
      sql: `SELECT f.nome AS framework, ROUND(AVG(b.tempo), 4) AS tempo_medio, COUNT(*) AS total_testes\nFROM Benchmark b\nJOIN Implementacao i ON b.implementacao_id = i.id\nJOIN Framework f ON i.framework_id = f.id\nGROUP BY f.nome\nORDER BY tempo_medio ASC;`,
    },
    {
      title: 'Artigos científicos publicados com seus Pesquisadores e Veículos',
      sql: `SELECT art.titulo, art.doi, pes.nome AS autor, inst.nome AS instituicao, v.nome AS conferencia\nFROM Publicacao pub\nJOIN Pesquisador p ON pub.pesquisador_id = p.id\nJOIN Pessoa pes ON p.pessoa_id = pes.id\nJOIN Instituicao inst ON p.instituicao_id = inst.id\nJOIN Artigo art ON pub.artigo_id = art.id\nJOIN Veiculo v ON pub.veiculo_id = v.id;`,
    },
    {
      title: 'Ambientes de alta performance com GPU ou >= 64 núcleos',
      sql: `SELECT nome, sistema_operacional, processador, memoria_ram AS ram_gb, qtd_nucleos, nos_numa, gpu\nFROM Ambiente_de_Execucao\nWHERE qtd_nucleos >= 64 OR gpu IS NOT NULL\nORDER BY qtd_nucleos DESC;`,
    },
  ];

  async function handleExecute(e) {
    if (e) e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await api.runCustomQuery(sql);
      if (res.success && res.data) {
        setResult(res.data);
      } else {
        setError(res.error || 'Erro na execução da consulta');
        setResult(null);
      }
    } catch (err) {
      setError(err.message || 'Erro ao conectar ao servidor');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Code2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">SQL Explorer Interativo</h2>
            <p className="text-xs text-slate-400">
              Execute qualquer consulta SQL diretamente sobre o banco Neon PostgreSQL na nuvem
            </p>
          </div>
        </div>

        {/* Templates */}
        <div className="mt-5">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mb-2.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Exemplos de Consultas Úteis:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleQueries.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSql(item.sql)}
                className="text-left px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-xs text-slate-300 transition-all"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Code Editor Box */}
      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-400 font-mono">Editor SQL:</label>
          <button
            onClick={handleExecute}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50"
          >
            <Play className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Executando...' : 'Executar SQL'}
          </button>
        </div>

        <textarea
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          rows={7}
          className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
          placeholder="Digite seu comando SELECT aqui..."
        />

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <span>Linhas retornadas: <strong className="text-slate-200">{result.rowCount}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="h-3 w-3 text-indigo-400" />
                {result.durationMs} ms
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Results View */}
      {result && result.rows && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  {result.fields.map((field) => (
                    <th key={field} className="px-4 py-3.5 whitespace-nowrap">
                      {field}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                {result.rows.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                    {result.fields.map((field) => (
                      <td key={field} className="px-4 py-3 whitespace-nowrap text-slate-300">
                        {row[field] !== null && row[field] !== undefined ? String(row[field]) : <span className="text-slate-600">NULL</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
