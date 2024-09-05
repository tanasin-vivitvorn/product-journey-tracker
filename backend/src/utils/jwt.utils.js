const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET;

function generateAccessToken(user) {
  return jwt.sign({ UserName: user.UserName, FullName: user.FullName, Role: user.Role.RoleName, Permissions: user.Role.Permissions }, SECRET_KEY, { expiresIn: '30m' });
}

function generateRefreshToken(user) {
  return jwt.sign({ UserName: user.UserName, Secret: user.Password }, REFRESH_TOKEN_SECRET);
}

function verifyAccessToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
