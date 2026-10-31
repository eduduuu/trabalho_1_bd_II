import { getDatabaseAdapter } from '../config/db.js';

export class BaseRepository {
  constructor(entityName) {
    this.entityName = entityName;
  }

  get adapter() {
    return getDatabaseAdapter();
  }

  async getAll(options) {
    return await this.adapter.findAll(this.entityName, options);
  }

  async getById(id) {
    return await this.adapter.findById(this.entityName, id);
  }

  async create(data) {
    return await this.adapter.create(this.entityName, data);
  }

  async update(id, data) {
    return await this.adapter.update(this.entityName, id, data);
  }

  async delete(id) {
    return await this.adapter.delete(this.entityName, id);
  }
}
