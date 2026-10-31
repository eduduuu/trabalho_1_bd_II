import React from 'react';
import { Database, Network, Table, Code2, Layers, Cpu, Server, BookOpen } from 'lucide-react';

export function Navbar({ activeTab, setActiveTab, status, onToggleAdapter }) {
  const isPostgres = status?.type === 'postgres';

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 backdrop-blur bg-slate-900/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Network className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight flex items-center gap-2">
                GraphBench <span className="text-xs bg-indigo-500/20 text-indigo-400 font-semibold px-2 py-0.5 rounded border border-indigo-500/30">BD II</span>
              </span>
              <p className="text-xs text-slate-400">Banco de Dados de Processamento de Grafos</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/60 p-1 rounded-xl border border-slate-700/50">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Cpu className="h-4 w-4" />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('crud')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'crud'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Table className="h-4 w-4" />
              CRUD de Entidades
            </button>

            <button
              onClick={() => setActiveTab('complex')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'complex'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Database className="h-4 w-4" />
              Buscas Complexas
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'about'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Sobre o Projeto
            </button>
          </nav>

          {/* Database Adapter Status Pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  status?.connected ? 'bg-emerald-400' : 'bg-rose-400'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  status?.connected ? 'bg-emerald-500' : 'bg-rose-500'
                }`}></span>
              </span>
              <span className="text-slate-300 font-medium">
                {status?.adapter || 'Conectando...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 gap-2 border-t border-slate-800 bg-slate-900/90 text-xs">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-3 py-1 rounded-md ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('crud')}
          className={`px-3 py-1 rounded-md ${activeTab === 'crud' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          CRUD
        </button>
        <button
          onClick={() => setActiveTab('complex')}
          className={`px-3 py-1 rounded-md ${activeTab === 'complex' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Buscas Complexas
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`px-3 py-1 rounded-md ${activeTab === 'about' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Sobre o Projeto
        </button>
      </div>
    </header>
  );
}
