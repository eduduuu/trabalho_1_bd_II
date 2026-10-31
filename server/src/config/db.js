import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { PostgresAdapter } from '../adapters/PostgresAdapter.js';
import { MongoAdapter } from '../adapters/MongoAdapter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env files
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

let currentAdapter = null;

export function getDatabaseAdapter() {
  if (currentAdapter) return currentAdapter;

  const adapterType = (process.env.DB_ADAPTER || 'postgres').toLowerCase();

  if (adapterType === 'mongodb' || adapterType === 'mongo') {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/graphdb';
    console.log(`[AdapterFactory] Instantiating MongoAdapter with URI: ${mongoUri}`);
    currentAdapter = new MongoAdapter(mongoUri);
  } else {
    const pgUri = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
    if (!pgUri) {
      throw new Error('DATABASE_URL or DATABASE_URL_UNPOOLED is required for PostgresAdapter');
    }
    console.log(`[AdapterFactory] Instantiating PostgresAdapter (Neon)`);
    currentAdapter = new PostgresAdapter(pgUri);
  }

  return currentAdapter;
}

export function switchDatabaseAdapter(adapterType) {
  if (adapterType === 'mongodb') {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/graphdb';
    currentAdapter = new MongoAdapter(mongoUri);
  } else {
    const pgUri = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
    currentAdapter = new PostgresAdapter(pgUri);
  }
  return currentAdapter;
}
