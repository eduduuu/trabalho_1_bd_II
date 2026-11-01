/**
 * Automated Verification Script for Graph Benchmark Database & API
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_BASE = 'http://localhost:3001/api';

async function waitForServer(retries = 20, delayMs = 500) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`${API_BASE}/status`);
      if (res.ok) return true;
    } catch (e) {
      // wait
    }
    await new Promise(r => setTimeout(r, delayMs));
  }
  return false;
}

async function testSuite() {
  console.log('====================================================');
  console.log('🧪 Starting Automated API & Database Verification Tests');
  console.log('====================================================\n');

  let serverProcess = null;

  // Check if server is already running
  const alreadyRunning = await waitForServer(2, 200);
  if (!alreadyRunning) {
    console.log('ℹ️ Server is not running. Starting temporary server process...');
    serverProcess = spawn('node', ['src/index.js'], {
      cwd: path.resolve(__dirname, 'server'),
      stdio: 'pipe',
    });

    const isReady = await waitForServer(25, 500);
    if (!isReady) {
      console.error('❌ Failed to start server for automated tests.');
      if (serverProcess) serverProcess.kill();
      process.exit(1);
    }
    console.log('🚀 Server started successfully for testing.\n');
  }

  let passed = 0;
  let failed = 0;

  async function assert(name, fn) {
    process.stdout.write(`• ${name}... `);
    try {
      await fn();
      console.log('✅ PASSED');
      passed++;
    } catch (err) {
      console.log(`❌ FAILED: ${err.message}`);
      failed++;
    }
  }

  try {
    // Test 1: Health & Status
    await assert('Status endpoint & Database Adapter health', async () => {
      const res = await fetch(`${API_BASE}/status`);
      const data = await res.json();
      if (!data.success || !data.connected) throw new Error('DB not connected');
      if (data.activeAdapter !== 'PostgreSQL (Neon Cloud)') throw new Error(`Unexpected adapter: ${data.activeAdapter}`);
    });

    // Test 2: Schema Metadata
    await assert('Metadata endpoint returns all 24 database tables', async () => {
      const res = await fetch(`${API_BASE}/queries/metadata`);
      const data = await res.json();
      if (!data.success || !Array.isArray(data.data)) throw new Error('Invalid metadata response');
      if (data.data.length !== 24) throw new Error(`Expected 24 tables, got ${data.data.length}`);
    });

    // Test 3: CRUD Read List
    await assert('CRUD List: Frameworks table contains seed frameworks', async () => {
      const res = await fetch(`${API_BASE}/crud/framework`);
      const data = await res.json();
      if (!data.success || data.total < 10) throw new Error(`Expected at least 10 frameworks, found ${data.total}`);
    });

    // Test 4: CRUD Create, Read, Update, Delete
    await assert('CRUD Full Lifecycle on Pessoa (Create -> Read -> Update -> Delete)', async () => {
      // Create
      const createRes = await fetch(`${API_BASE}/crud/pessoa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cpf: '99988877766',
          nome: 'Test Automated User',
          cargo: 'Software Architect',
        }),
      });
      const created = await createRes.json();
      if (!created.success || !created.data?.id) throw new Error('Create failed');
      const newId = created.data.id;

      // Read One
      const readRes = await fetch(`${API_BASE}/crud/pessoa/${newId}`);
      const readData = await readRes.json();
      if (!readData.success || readData.data.nome !== 'Test Automated User') throw new Error('Read failed');

      // Update
      const updateRes = await fetch(`${API_BASE}/crud/pessoa/${newId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cargo: 'Lead Engineer',
        }),
      });
      const updated = await updateRes.json();
      if (!updated.success || updated.data.cargo !== 'Lead Engineer') throw new Error('Update failed');

      // Delete
      const deleteRes = await fetch(`${API_BASE}/crud/pessoa/${newId}`, { method: 'DELETE' });
      const deleted = await deleteRes.json();
      if (!deleted.success) throw new Error('Delete failed');
    });

    // Test 5: Complex Query - Benchmark Ranking
    await assert('Complex Query: benchmark_ranking (Multi-table join across 5 tables)', async () => {
      const res = await fetch(`${API_BASE}/queries/complex/benchmark_ranking`);
      const data = await res.json();
      if (!data.success || !Array.isArray(data.rows) || data.rows.length === 0) throw new Error('Benchmark query failed');
      if (!data.rows[0].framework || !data.rows[0].tempo_segundos) throw new Error('Missing expected benchmark fields');
    });

    // Test 6: Complex Query - Researchers Network
    await assert('Complex Query: researchers_network (Academic publications & affiliations)', async () => {
      const res = await fetch(`${API_BASE}/queries/complex/researchers_network`);
      const data = await res.json();
      if (!data.success || data.rows.length === 0) throw new Error('Researchers query failed');
      if (!data.rows[0].pesquisador || !data.rows[0].titulo_artigo) throw new Error('Missing article/author fields');
    });

    // Test 7: Complex Query - Optimization Matrix
    await assert('Complex Query: optimization_matrix (Frameworks x Techniques x Data Structures)', async () => {
      const res = await fetch(`${API_BASE}/queries/complex/optimization_matrix`);
      const data = await res.json();
      if (!data.success || data.rows.length === 0) throw new Error('Optimization matrix query failed');
    });

    // Test 8: Complex Query - Recursive Citation Network (WITH RECURSIVE & RANK)
    await assert('Complex Query: citation_recursive_network (WITH RECURSIVE & DENSE_RANK)', async () => {
      const res = await fetch(`${API_BASE}/queries/complex/citation_recursive_network?framework=DGAP`);
      const data = await res.json();
      if (!data.success || !Array.isArray(data.rows) || data.rows.length === 0) throw new Error('Recursive citation query failed');
      if (data.rows[0].nivel !== 0) throw new Error('First row must be root (nivel = 0)');
      if (!data.rows[0].caminho_recursao) throw new Error('Missing caminho_recursao');
      if (typeof data.rows[0].citacoes !== 'number') throw new Error('Missing citacoes count');
    });

    // Test 9: Complex Query - Citation Loop Detection (WITH RECURSIVE)
    await assert('Complex Query: citation_loop_detection (Detect and isolate closed citation loops)', async () => {
      const res = await fetch(`${API_BASE}/queries/complex/citation_loop_detection?maxDepth=5`);
      const data = await res.json();
      if (!data.success || !Array.isArray(data.rows) || data.rows.length === 0) throw new Error('Citation loop detection failed');
      if (!data.rows[0].tamanho_ciclo || !data.rows[0].caminho_loop) throw new Error('Missing loop detection columns');
      if (data.rows[0].tamanho_ciclo < 2) throw new Error('Cycle length must be >= 2');
    });

    // Test 10: Complex Query - Dataset Framework Ranking (HAVING Min Citations)
    await assert('Complex Query: dataset_framework_ranking (DENSE_RANK & HAVING min citations)', async () => {
      const res = await fetch(`${API_BASE}/queries/complex/dataset_framework_ranking?minCitacoes=100`);
      const data = await res.json();
      if (!data.success || !Array.isArray(data.rows) || data.rows.length === 0) throw new Error('Dataset framework ranking failed');
      if (!data.rows[0].ranking_no_dataset || !data.rows[0].framework || !data.rows[0].melhor_tempo_s) throw new Error('Missing ranking fields');
      if (data.rows[0].citacoes_artigo < 100) throw new Error('HAVING min citations filter not respected');
    });

    // Test 11: Complex Query - Institution Productivity (GROUP BY & HAVING Area)
    await assert('Complex Query: institution_researcher_productivity (GROUP BY & HAVING research area)', async () => {
      const res = await fetch(`${API_BASE}/queries/complex/institution_researcher_productivity?areaPesquisa=Grafos`);
      const data = await res.json();
      if (!data.success || !Array.isArray(data.rows) || data.rows.length === 0) throw new Error('Institution productivity query failed');
      if (!data.rows[0].instituicao || !data.rows[0].qtd_pesquisadores) throw new Error('Missing productivity columns');
      if (typeof data.rows[0].razao_artigos_pesquisador === 'undefined') throw new Error('Missing ratio column');
    });

    // Test 8: Foreign Keys Lookup
    await assert('Foreign Keys Lookup endpoint provides labeled foreign key options', async () => {
      const res = await fetch(`${API_BASE}/queries/lookups`);
      const data = await res.json();
      if (!data.success || !data.data?.instituicao || !data.data?.pessoa) throw new Error('Lookups failed');
      if (data.data.instituicao.length === 0) throw new Error('Instituicao lookups empty');
    });

    // Test 9: Dashboard Insights
    await assert('Dashboard Insights endpoint computes best frameworks & institution ranking', async () => {
      const res = await fetch(`${API_BASE}/queries/insights`);
      const data = await res.json();
      if (!data.success || !Array.isArray(data.data?.bestFrameworkPerAlgorithm)) throw new Error('Insights failed');
      if (data.data.bestFrameworkPerAlgorithm.length === 0) throw new Error('No best frameworks found');
    });

    // Test 10: Custom SQL Sandbox
    await assert('Custom Query Explorer executes arbitrary SELECT with safety validation', async () => {
      const res = await fetch(`${API_BASE}/queries/custom`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sql: 'SELECT nome, area FROM Dataset ORDER BY nome LIMIT 3;',
        }),
      });
      const data = await res.json();
      if (!data.success || data.data.rowCount !== 3) throw new Error('Custom query failed');
    });
  } finally {
    if (serverProcess) {
      serverProcess.kill();
    }
  }

  console.log('\n====================================================');
  console.log(`Results: ${passed} passed, ${failed} failed.`);
  console.log('====================================================\n');

  if (failed > 0) process.exit(1);
}

testSuite();
