import { QueryRepository } from '../repositories/QueryRepository.js';

const queryRepo = new QueryRepository();

export const queryController = {
  // GET /api/queries/metadata
  async getMetadata(req, res) {
    try {
      const metadata = await queryRepo.getMetadata();
      res.json({ success: true, data: metadata });
    } catch (err) {
      console.error('Metadata error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // GET /api/queries/insights
  async getInsights(req, res) {
    try {
      const insights = await queryRepo.getDashboardInsights();
      res.json({ success: true, data: insights });
    } catch (err) {
      console.error('Insights error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // GET /api/queries/lookups
  async getLookups(req, res) {
    try {
      const lookups = await queryRepo.getForeignKeysLookup();
      res.json({ success: true, data: lookups });
    } catch (err) {
      console.error('Lookups error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // GET /api/queries/complex/:queryId
  async runComplex(req, res) {
    try {
      const { queryId } = req.params;
      const params = req.query;
      const result = await queryRepo.runComplexQuery(queryId, params);
      res.json({ success: true, ...result });
    } catch (err) {
      console.error(`Complex query "${req.params.queryId}" error:`, err);
      res.status(400).json({ success: false, error: err.message });
    }
  },

  // POST /api/queries/custom
  async runCustom(req, res) {
    try {
      const { sql, params = [] } = req.body;
      if (!sql || typeof sql !== 'string' || sql.trim() === '') {
        return res.status(400).json({ success: false, error: 'SQL query string is required' });
      }

      // Safety check: block destructive system commands
      const trimmed = sql.trim().toLowerCase();
      if (trimmed.includes('drop database') || trimmed.includes('truncate') || trimmed.includes('pg_terminate_backend')) {
        return res.status(403).json({ success: false, error: 'Dangerous database operations are restricted in custom query explorer.' });
      }

      const result = await queryRepo.runRawQuery(sql, params);
      res.json({ success: true, data: result });
    } catch (err) {
      console.error('Custom query error:', err);
      res.status(400).json({ success: false, error: err.message });
    }
  },
};
