import { getDatabaseAdapter } from '../config/db.js';

export class QueryRepository {
  get adapter() {
    return getDatabaseAdapter();
  }

  async runComplexQuery(queryId, params) {
    return await this.adapter.executeComplexQuery(queryId, params);
  }

  async runRawQuery(sql, params) {
    return await this.adapter.rawQuery(sql, params);
  }

  async getMetadata() {
    return await this.adapter.getEntitiesMetadata();
  }

  async getDashboardInsights() {
    return await this.adapter.getDashboardInsights();
  }

  async getForeignKeysLookup() {
    return await this.adapter.getForeignKeysLookup();
  }

  async getStatus() {
    const isConn = await this.adapter.isConnected();
    const adapterName = this.adapter.getAdapterName();
    return {
      connected: isConn,
      adapter: adapterName,
      type: process.env.DB_ADAPTER || 'postgres',
    };
  }
}
