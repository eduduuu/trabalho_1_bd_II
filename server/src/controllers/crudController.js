import { BaseRepository } from '../repositories/BaseRepository.js';

export const crudController = {
  // GET /api/crud/:entity
  async list(req, res) {
    try {
      const { entity } = req.params;
      const { page, limit, sortBy, sortOrder, search, ...filters } = req.query;
      const repo = new BaseRepository(entity);
      const data = await repo.getAll({
        page: page ? parseInt(page, 10) : 1,
        limit: limit ? parseInt(limit, 10) : 20,
        sortBy,
        sortOrder,
        search,
        filters,
      });
      res.json({ success: true, ...data });
    } catch (err) {
      console.error('CRUD List error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // GET /api/crud/:entity/:id
  async getOne(req, res) {
    try {
      const { entity, id } = req.params;
      const repo = new BaseRepository(entity);

      // Support composite keys passed as JSON in query or parsed from id
      let parsedId = id;
      if (req.query.composite) {
        try {
          parsedId = JSON.parse(req.query.composite);
        } catch (e) {
          // ignore
        }
      }

      const item = await repo.getById(parsedId);
      if (!item) {
        return res.status(404).json({ success: false, error: 'Record not found' });
      }
      res.json({ success: true, data: item });
    } catch (err) {
      console.error('CRUD GetOne error:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // POST /api/crud/:entity
  async create(req, res) {
    try {
      const { entity } = req.params;
      const repo = new BaseRepository(entity);
      const created = await repo.create(req.body);
      res.status(201).json({ success: true, data: created });
    } catch (err) {
      console.error('CRUD Create error:', err);
      res.status(400).json({ success: false, error: err.message });
    }
  },

  // PUT /api/crud/:entity/:id
  async update(req, res) {
    try {
      const { entity, id } = req.params;
      const repo = new BaseRepository(entity);

      let parsedId = id;
      if (req.query.composite) {
        try {
          parsedId = JSON.parse(req.query.composite);
        } catch (e) {
          // ignore
        }
      }

      const updated = await repo.update(parsedId, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Record not found or nothing updated' });
      }
      res.json({ success: true, data: updated });
    } catch (err) {
      console.error('CRUD Update error:', err);
      res.status(400).json({ success: false, error: err.message });
    }
  },

  // DELETE /api/crud/:entity/:id
  async delete(req, res) {
    try {
      const { entity, id } = req.params;
      const repo = new BaseRepository(entity);

      let parsedId = id;
      if (req.query.composite) {
        try {
          parsedId = JSON.parse(req.query.composite);
        } catch (e) {
          // ignore
        }
      }

      const deleted = await repo.delete(parsedId);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Record not found' });
      }
      res.json({ success: true, data: deleted, message: 'Deleted successfully' });
    } catch (err) {
      console.error('CRUD Delete error:', err);
      res.status(400).json({ success: false, error: err.message });
    }
  },
};
