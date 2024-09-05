const { User, Role, RolePermission, Permission } = require('../models');

class UserRepository {
  async findByUsername(username) {
    return User.findOne({
      where: {
        UserName: username,
        IsActive: true
      },
      include: [
        {
          model: Role,
          include: [
            {
              model: Permission,
              through: {
                attributes: []
              }
            }
          ]
        }
      ]
    });
  }

  async findById(id) {
    return User.findByPk(id);
  }

  async create(user) {
    return User.create(user);
  }
}

module.exports = new UserRepository();
