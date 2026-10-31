import React, { useState } from 'react';
import { Layers, ShieldCheck, ArrowRight, Database, FileCode, CheckCircle2, RefreshCw } from 'lucide-react';
import { api } from '../services/api.js';

export function ArchitectureGuide({ status, onStatusChange }) {
  const [toggling, setToggling] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState('adapter_interface');

  async function handleToggleAdapter(targetAdapter) {
    try {
      setToggling(true);
      const res = await api.toggleAdapter(targetAdapter);
      if (res.success) {
        onStatusChange(res);
      }
    } catch (err) {
      console.error('Failed to toggle adapter:', err);
    } finally {
      setToggling(false);
    }
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Arquitetura de Software: Padrão Adapter & NoSQL Ready</h2>
            <p className="text-xs text-slate-400">
              Desacoplamento de persistência de dados para migração transparente entre PostgreSQL e MongoDB (Parte 2)
            </p>
          </div>
        </div>

        {/* Live Adapter Switcher Panel */}
        <div className="mt-6 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-slate-400">Adaptador Ativo no Backend:</span>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${status?.connected ? 'bg-emerald-400' : 'bg-rose-400'}`} />
              <strong className="text-sm text-white font-mono">{status?.adapter || 'PostgreSQL (Neon)'}</strong>
              <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-mono">
                DB_ADAPTER={status?.type}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggleAdapter('postgres')}
              disabled={toggling || status?.type === 'postgres'}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                status?.type === 'postgres'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
              }`}
            >
              Usar PostgreSQL (Neon)
            </button>
            <button
              onClick={() => handleToggleAdapter('mongodb')}
              disabled={toggling || status?.type === 'mongodb'}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                status?.type === 'mongodb'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
              }`}
            >
              Simular NoSQL (MongoDB)
            </button>
          </div>
        </div>
      </div>

      {/* Pattern Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="h-9 w-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold mb-3 border border-indigo-500/30">
            1
          </div>
          <h3 className="text-sm font-bold text-white">Contrato Único (IDatabaseAdapter)</h3>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Define métodos agnósticos de banco (<code className="text-indigo-300">findAll</code>, <code className="text-indigo-300">findById</code>, <code className="text-indigo-300">create</code>, <code className="text-indigo-300">update</code>, <code className="text-indigo-300">delete</code>, <code className="text-indigo-300">executeComplexQuery</code>).
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="h-9 w-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold mb-3 border border-cyan-500/30">
            2
          </div>
          <h3 className="text-sm font-bold text-white">Implementações Concretas</h3>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-300">PostgresAdapter</strong> converte em queries SQL com pool Neon. <strong className="text-slate-300">MongoAdapter</strong> traduz as mesmas operações para documentos BSON e Aggregation Pipelines.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="h-9 w-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-3 border border-emerald-500/30">
            3
          </div>
          <h3 className="text-sm font-bold text-white">Zero Mudança no Frontend e Rotas</h3>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Ao trocar o conector na Parte 2 do trabalho, nenhuma linha de código React, nenhum endpoint Express e nenhum Controller precisa ser reescrito!
          </p>
        </div>
      </div>

      {/* Code Inspector Tabs */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FileCode className="h-4 w-4 text-indigo-400" />
            Código-Fonte dos Componentes do Padrão
          </h3>

          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg text-xs">
            <button
              onClick={() => setActiveCodeTab('adapter_interface')}
              className={`px-3 py-1 rounded font-medium ${activeCodeTab === 'adapter_interface' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              IDatabaseAdapter.js
            </button>
            <button
              onClick={() => setActiveCodeTab('postgres_adapter')}
              className={`px-3 py-1 rounded font-medium ${activeCodeTab === 'postgres_adapter' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              PostgresAdapter.js
            </button>
            <button
              onClick={() => setActiveCodeTab('mongo_adapter')}
              className={`px-3 py-1 rounded font-medium ${activeCodeTab === 'mongo_adapter' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              MongoAdapter.js (Parte 2)
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-96">
          {activeCodeTab === 'adapter_interface' && (
            <pre>{`export class IDatabaseAdapter {
  async connect() { ... }
  async disconnect() { ... }
  getAdapterName() { ... }
  async isConnected() { ... }

  async findAll(entity, options = {}) { ... }
  async findById(entity, id) { ... }
  async create(entity, data) { ... }
  async update(entity, id, data) { ... }
  async delete(entity, id) { ... }

  async executeComplexQuery(queryId, params = {}) { ... }
  async getEntitiesMetadata() { ... }
}`}</pre>
          )}

          {activeCodeTab === 'postgres_adapter' && (
            <pre>{`export class PostgresAdapter extends IDatabaseAdapter {
  constructor(connectionString) {
    this.pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  }

  async findAll(entity, options) {
    const table = this._sanitizeEntity(entity);
    const sql = \`SELECT * FROM "\${table}" LIMIT $1 OFFSET $2;\`;
    return await this.pool.query(sql, [options.limit, options.offset]);
  }

  async executeComplexQuery(queryId, params) {
    // Executa INNER JOINs entre Benchmark, Framework, Algoritmo, Dataset, etc.
    return await this.complexQueries[queryId].run(params);
  }
}`}</pre>
          )}

          {activeCodeTab === 'mongo_adapter' && (
            <pre>{`export class MongoAdapter extends IDatabaseAdapter {
  constructor(uri, dbName = 'graphdb') {
    this.client = new MongoClient(uri);
  }

  async findAll(entity, options) {
    // Traduz a entidade para a coleção BSON correspondente
    return await this.db.collection(entity).find(options.filters).toArray();
  }

  async executeComplexQuery(queryId, params) {
    // Na Parte 2: Substitui INNER JOINs por Aggregation Pipeline com $lookup:
    return await this.db.collection('benchmarks').aggregate([
      { $lookup: { from: 'implementacoes', localField: 'impl_id', foreignField: '_id', as: 'impl' } },
      { $unwind: '$impl' },
      { $lookup: { from: 'frameworks', localField: 'impl.framework_id', foreignField: '_id', as: 'framework' } }
    ]).toArray();
  }
}`}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
