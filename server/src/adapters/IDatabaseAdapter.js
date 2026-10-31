/**
 * IDatabaseAdapter
 * Defines the contract that every database adapter (PostgreSQL, MongoDB, etc.) must implement.
 * This ensures that changing from SQL to NoSQL in the future requires only plugging in
 * a new adapter without altering business logic, repositories, or HTTP controllers.
 */
export class IDatabaseAdapter {
  /**
   * Initializes connection to the database
   */
  async connect() {
    throw new Error('connect() must be implemented');
  }

  /**
   * Closes database connection
   */
  async disconnect() {
    throw new Error('disconnect() must be implemented');
  }

  /**
   * Returns human-readable adapter engine name (e.g. 'PostgreSQL (Neon)', 'MongoDB')
   */
  getAdapterName() {
    throw new Error('getAdapterName() must be implemented');
  }

  /**
   * Returns boolean indicating connection health
   */
  async isConnected() {
    throw new Error('isConnected() must be implemented');
  }

  /**
   * Find all records for a given entity with optional filtering, sorting, and pagination
   * @param {string} entity - Name of table or collection
   * @param {object} options - { filters, sort, limit, offset, search }
   */
  async findAll(entity, options = {}) {
    throw new Error('findAll() must be implemented');
  }

  /**
   * Find a single record by its primary key
   * @param {string} entity
   * @param {string|number|object} id
   */
  async findById(entity, id) {
    throw new Error('findById() must be implemented');
  }

  /**
   * Create a new record
   * @param {string} entity
   * @param {object} data
   */
  async create(entity, data) {
    throw new Error('create() must be implemented');
  }

  /**
   * Update an existing record
   * @param {string} entity
   * @param {string|number|object} id
   * @param {object} data
   */
  async update(entity, id, data) {
    throw new Error('update() must be implemented');
  }

  /**
   * Delete a record by ID
   * @param {string} entity
   * @param {string|number|object} id
   */
  async delete(entity, id) {
    throw new Error('delete() must be implemented');
  }

  /**
   * Executes a registered complex analytical query
   * @param {string} queryId
   * @param {object} params
   */
  async executeComplexQuery(queryId, params = {}) {
    throw new Error('executeComplexQuery() must be implemented');
  }

  /**
   * Raw custom query runner (used for exploration)
   * @param {string} query
   * @param {Array} params
   */
  async rawQuery(query, params = []) {
    throw new Error('rawQuery() must be implemented');
  }

  /**
   * Lists available entities and their metadata/schema
   */
  async getEntitiesMetadata() {
    throw new Error('getEntitiesMetadata() must be implemented');
  }

  /**
   * Returns analytical dashboard insights (best framework per algorithm, top institutions, etc.)
   */
  async getDashboardInsights() {
    throw new Error('getDashboardInsights() must be implemented');
  }

  /**
   * Returns human-readable key-value mappings for foreign key select inputs
   */
  async getForeignKeysLookup() {
    throw new Error('getForeignKeysLookup() must be implemented');
  }
}
