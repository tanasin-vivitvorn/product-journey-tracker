const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt.utils');
const userRepository = require('../repositories/UserRepository');

class AuthService {
  async login(username, password) {
    const user = await userRepository.findByUsername(username);
    if (!user || !bcrypt.compareSync(password, user.Password)) {
      throw new Error('Invalid username or password');
    }

    const accessToken = jwt.generateAccessToken(user);
    const refreshToken = jwt.generateRefreshToken(user);
    return {
      accessToken,
      refreshToken
    };
  }

  async refreshToken(refreshToken) {
    const payload = jwt.verifyRefreshToken(refreshToken);
    const user = await userRepository.findByUsername(payload.UserName);
    if (payload.Secret === user.Password) {
      const newAccessToken = jwt.generateAccessToken(user);
      return { accessToken: newAccessToken };
    }
    return null;
  }
}

module.exports = new AuthService();