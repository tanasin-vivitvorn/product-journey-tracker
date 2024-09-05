const authService = require('../services/AuthService');

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await authService.login(username, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async refresh(req, res) {
    try {
      const { token } = req.body;
      const result = await authService.refreshToken(token);
      res.json(result);
    } catch (error) {
      res.status(403).json({ message: 'Invalid refresh token' });
    }
  }

  async logout(req, res) {
    // Implement your logout logic (e.g., invalidating the token)
    res.status(200).json({ message: 'Logged out successfully' });
  }
}

module.exports = new AuthController();
