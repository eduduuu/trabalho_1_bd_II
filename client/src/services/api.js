const API_BASE = '/api';

export const api = {
  async getStatus() {
    const res = await fetch(`${API_BASE}/status`);
    return await res.json();
  },

  async toggleAdapter(adapter) {
    const res = await fetch(`${API_BASE}/status/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adapter }),
    });
    return await res.json();
  },

  async getMetadata() {
    const res = await fetch(`${API_BASE}/queries/metadata`);
    return await res.json();
  },

  async getInsights() {
    const res = await fetch(`${API_BASE}/queries/insights`);
    return await res.json();
  },

  async getLookups() {
    const res = await fetch(`${API_BASE}/queries/lookups`);
    return await res.json();
  },

  async getCrudList(entity, params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, v);
      }
    });
    const res = await fetch(`${API_BASE}/crud/${entity}?${query.toString()}`);
    return await res.json();
  },

  async getCrudOne(entity, id) {
    const res = await fetch(`${API_BASE}/crud/${entity}/${id}`);
    return await res.json();
  },

  async createCrud(entity, data) {
    const res = await fetch(`${API_BASE}/crud/${entity}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  async updateCrud(entity, id, data) {
    const res = await fetch(`${API_BASE}/crud/${entity}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  async deleteCrud(entity, id) {
    const res = await fetch(`${API_BASE}/crud/${entity}/${id}`, {
      method: 'DELETE',
    });
    return await res.json();
  },

  async runComplexQuery(queryId, params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, v);
      }
    });
    const res = await fetch(`${API_BASE}/queries/complex/${queryId}?${query.toString()}`);
    return await res.json();
  },

  async runCustomQuery(sql, params = []) {
    const res = await fetch(`${API_BASE}/queries/custom`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sql, params }),
    });
    return await res.json();
  },
};
