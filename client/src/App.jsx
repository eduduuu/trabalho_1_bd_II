import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { CrudManager } from './pages/CrudManager.jsx';
import { ComplexQueries } from './pages/ComplexQueries.jsx';
import { AboutProject } from './pages/AboutProject.jsx';
import { api } from './services/api.js';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await api.getStatus();
        if (res.success) {
          setStatus(res);
        }
      } catch (err) {
        console.error('Failed to get status:', err);
      }
    }
    checkStatus();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1120] text-slate-100">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        status={status}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'dashboard' && (
          <Dashboard onNavigate={setActiveTab} status={status} />
        )}
        {activeTab === 'crud' && <CrudManager />}
        {activeTab === 'complex' && <ComplexQueries />}
        {activeTab === 'about' && <AboutProject />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-900/50 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-slate-400">UNESP - Banco de Dados II</span> • Trabalho Prático (Partes 1 e 2)
          </div>
          <div className="text-center sm:text-right text-slate-400">
            Davi Ferreira • Eduardo Bomfim • Guilherme Pavan • Jamal Saboia
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
