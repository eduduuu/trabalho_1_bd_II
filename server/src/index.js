import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import crudRoutes from './routes/crudRoutes.js';
import queryRoutes from './routes/queryRoutes.js';
import statusRoutes from './routes/statusRoutes.js';
import { getDatabaseAdapter } from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

import fs from 'fs';

// API Routes
app.use('/api/crud', crudRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/status', statusRoutes);

// Health route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Serve frontend static build if available
const clientDist = path.resolve(__dirname, '../../client/dist');
if (fs.existsSync(clientDist)) {
  console.log(`[Server] Serving production frontend build from: ${clientDist}`);
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Start server and initialize adapter connection
async function startServer() {
  try {
    const adapter = getDatabaseAdapter();
    console.log(`[Server] Connecting via Adapter: ${adapter.getAdapterName()}...`);
    await adapter.connect();
    console.log(`[Server] Database connected successfully!`);

    app.listen(PORT, () => {
      console.log(`=================================================`);
      console.log(`🚀 GraphDB API Server running on http://localhost:${PORT}`);
      console.log(`📊 Active DB Adapter: ${adapter.getAdapterName()}`);
      console.log(`🔌 Endpoints:`);
      console.log(`   - Status:  GET http://localhost:${PORT}/api/status`);
      console.log(`   - Schema:  GET http://localhost:${PORT}/api/queries/metadata`);
      console.log(`   - CRUD:    GET http://localhost:${PORT}/api/crud/:entity`);
      console.log(`   - Complex: GET http://localhost:${PORT}/api/queries/complex/:queryId`);
      console.log(`=================================================`);
    });
  } catch (err) {
    console.error('[Server] Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
