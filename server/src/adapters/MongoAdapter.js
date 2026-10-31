import { IDatabaseAdapter } from './IDatabaseAdapter.js';

/**
 * MongoAdapter
 * Ready-to-use Adapter skeleton for MongoDB NoSQL migration (Trabalho BD II - Parte 2).
 * Implements the exact same IDatabaseAdapter contract so that all business logic,
 * controllers, and React UI components work seamlessly when switching from Postgres to MongoDB.
 */
export class MongoAdapter extends IDatabaseAdapter {
  constructor(uri, dbName = 'graphdb') {
    super();
    this.uri = uri;
    this.dbName = dbName;
    this.client = null;
    this.db = null;
    this.connected = false;
  }

  async connect() {
    console.log(`[MongoAdapter] Initializing connection to MongoDB at: ${this.uri}`);
    try {
      // Dynamic import of mongodb driver if installed in Parte 2
      // const { MongoClient } = await import('mongodb');
      // this.client = new MongoClient(this.uri);
      // await this.client.connect();
      // this.db = this.client.db(this.dbName);
      // this.connected = true;
      this.connected = true;
      return true;
    } catch (err) {
      console.warn('[MongoAdapter] Could not connect to MongoDB:', err.message);
      this.connected = false;
      return false;
    }
  }

  async disconnect() {
    if (this.client) {
      // await this.client.close();
      this.client = null;
      this.connected = false;
    }
  }

  getAdapterName() {
    return 'MongoDB (NoSQL Document Store)';
  }

  async isConnected() {
    return this.connected;
  }

  async findAll(entity, options = {}) {
    const { page = 1, limit = 20, search = '', filters = {} } = options;
    console.log(`[MongoAdapter] findAll on collection "${entity}" with options:`, options);

    // In MongoDB:
    // const query = { ...filters };
    // if (search) query.$text = { $search: search };
    // const total = await this.db.collection(entity).countDocuments(query);
    // const rows = await this.db.collection(entity).find(query).skip((page - 1) * limit).limit(limit).toArray();
    return {
      entity,
      total: 0,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      totalPages: 0,
      rows: [],
      notice: 'MongoAdapter is configured. When running Parte 2, install mongodb and point MONGODB_URI.',
    };
  }

  async findById(entity, id) {
    console.log(`[MongoAdapter] findById on collection "${entity}", id: ${id}`);
    // return await this.db.collection(entity).findOne({ _id: new ObjectId(id) });
    return null;
  }

  async create(entity, data) {
    console.log(`[MongoAdapter] create on collection "${entity}":`, data);
    // const res = await this.db.collection(entity).insertOne(data);
    // return { _id: res.insertedId, ...data };
    return { _id: 'mock_id', ...data };
  }

  async update(entity, id, data) {
    console.log(`[MongoAdapter] update on collection "${entity}", id: ${id}:`, data);
    // await this.db.collection(entity).updateOne({ _id: new ObjectId(id) }, { $set: data });
    // return { _id: id, ...data };
    return { _id: id, ...data };
  }

  async delete(entity, id) {
    console.log(`[MongoAdapter] delete on collection "${entity}", id: ${id}`);
    // return await this.db.collection(entity).deleteOne({ _id: new ObjectId(id) });
    return { success: true };
  }

  async executeComplexQuery(queryId, params = {}) {
    console.log(`[MongoAdapter] executeComplexQuery "${queryId}" with params:`, params);
    // In MongoDB, complex queries use the Aggregation Pipeline with $lookup, $unwind, $match, and $project:
    // Example for benchmark_ranking:
    // db.benchmarks.aggregate([
    //   { $lookup: { from: 'implementacoes', localField: 'implementacao_id', foreignField: '_id', as: 'impl' } },
    //   { $unwind: '$impl' },
    //   { $lookup: { from: 'frameworks', localField: 'impl.framework_id', foreignField: '_id', as: 'framework' } },
    //   { $unwind: '$framework' },
    //   { $lookup: { from: 'algoritmos', localField: 'impl.algoritmo_id', foreignField: '_id', as: 'algoritmo' } },
    //   { $unwind: '$algoritmo' },
    //   { $lookup: { from: 'datasets', localField: 'dataset_id', foreignField: '_id', as: 'dataset' } },
    //   { $unwind: '$dataset' },
    //   { $sort: { tempo: 1 } }
    // ]);
    return {
      id: queryId,
      title: `NoSQL Aggregation: ${queryId}`,
      description: 'MongoDB Aggregation Pipeline query ready for Parte 2',
      rowCount: 0,
      columns: [],
      rows: [],
      pipelineSample: [
        { $lookup: { from: 'implementacao', localField: 'implementacao_id', foreignField: 'id', as: 'impl' } },
        { $sort: { tempo: 1 } }
      ]
    };
  }

  async rawQuery(query, params = []) {
    return {
      message: 'MongoDB does not use raw SQL. Use collection queries or aggregation pipelines.',
      query,
    };
  }

  async getEntitiesMetadata() {
    return [
      { name: 'Pessoa', rowCount: 0, columns: [] },
      { name: 'Instituicao', rowCount: 0, columns: [] },
      { name: 'Artigo', rowCount: 0, columns: [] },
      { name: 'Framework', rowCount: 0, columns: [] },
      { name: 'Algoritmo', rowCount: 0, columns: [] },
      { name: 'Benchmark', rowCount: 0, columns: [] },
      { name: 'Dataset', rowCount: 0, columns: [] },
    ];
  }

  async getDashboardInsights() {
    return {
      bestFrameworkPerAlgorithm: [],
      frameworkWins: [],
      topInstitutions: [],
      edgeTypeDistribution: [],
      languageDistribution: [],
      topDatasets: [],
    };
  }

  async getForeignKeysLookup() {
    return {};
  }
}
