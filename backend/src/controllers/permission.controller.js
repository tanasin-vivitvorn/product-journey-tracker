const permissionService = require('../services/permission.service');

class PermissionController {
  async getPermissions(req, res) {
    try {
      const permissions = await permissionService.getPermissions();
      res.json(permissions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPermissionById(req, res) {
    try {
      const permissionId = req.params.id;
      const permission = await permissionService.getPermissionById(permissionId);
      if (!permission) return res.status(404).json({ message: 'Permission not found' });
      res.json(permission);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createPermission(req, res) {
    try {
      const permissionData = req.body;
      const permission = await permissionService.createPermission(permissionData);
      res.status(201).json(permission);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updatePermission(req, res) {
    try {
      const permissionId = req.body.PermissionID;
      const permissionData = req.body;
      const permission = await permissionService.updatePermission(permissionId, permissionData);
      res.status(200).json(permission);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deletePermission(req, res) {
    try {
      const permissionId = req.body.PermissionID;
      await permissionService.deletePermission(permissionId);
      res.status(200).json({ message: 'Permission deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PermissionController();
