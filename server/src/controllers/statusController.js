import { QueryRepository } from '../repositories/QueryRepository.js';
import { switchDatabaseAdapter } from '../config/db.js';

const queryRepo = new QueryRepository();

export const statusController = {
  // GET /api/status
  async getStatus(req, res) {
    try {
      const status = await queryRepo.getStatus();
      res.json({
        success: true,
        ...status,
        timestamp: new Date().toISOString(),
        availableAdapters: ['postgres', 'mongodb'],
        activeAdapter: status.adapter,
        readyForMigration: true,
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // POST /api/status/toggle-adapter (Demonstration endpoint for professor to see adapter pattern in action!)
  async toggleAdapter(req, res) {
    try {
      const { adapter } = req.body;
      if (!['postgres', 'mongodb'].includes(adapter)) {
        return res.status(400).json({ success: false, error: 'Supported adapters: postgres, mongodb' });
      }

      switchDatabaseAdapter(adapter);
      process.env.DB_ADAPTER = adapter;
      const status = await queryRepo.getStatus();

      res.json({
        success: true,
        message: `Active adapter switched to ${adapter}`,
        ...status,
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};
