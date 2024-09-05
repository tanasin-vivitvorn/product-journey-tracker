const roleService = require('../services/role.service');

class RoleController {
  async getRoles(req, res) {
    try {
      const roles = await roleService.getRoles();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getRoleById(req, res) {
    try {
      const roleId = req.params.id;
      const role = await roleService.getRoleById(roleId);
      if (!role) return res.status(404).json({ message: 'Role not found' });
      res.json(role);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createRole(req, res) {
    try {
      const roleData = req.body;
      const role = await roleService.createRole(roleData);
      res.status(201).json(role);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateRole(req, res) {
    try {
      const roleId = req.body.RoleID;
      const roleData = req.body;
      const role = await roleService.updateRole(roleId, roleData);
      res.status(200).json(role);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteRole(req, res) {
    try {
      const roleId = req.body.RoleID;
      await roleService.deleteRole(roleId);
      res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async assignPermissions(req, res) {
    try {
      const { roleId, permissionIds } = req.body;
      await roleService.assignPermissions(roleId, permissionIds);
      res.status(200).json({ message: 'Permissions assigned successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getRolePermissions(req, res) {
    try {
      const roleId = req.params.roleId;
      const permissions = await roleService.getRolePermissions(roleId);
      res.json(permissions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new RoleController();
