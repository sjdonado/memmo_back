const { sign, verify } = require('jsonwebtoken');

const { User } = require('../database/models');
const ApiError = require('../lib/ApiError');

const { server } = require('../config');

/**
 * Generate new JWT
 * @param {String} userId
 */
const signToken = (userId) =>
  sign({ userId }, server.secret, { expiresIn: '24h' });

/**
 * Decode JWT token
 * @param {String} token
 * @returns {String} userId
 */
const decodeToken = (token) =>
  verify(token, server.secret, async (err, decoded) => {
    if (err) {
      throw new ApiError('Unauthorized', 401);
    }

    const { userId, iat, exp } = decoded;

    if (exp - iat < 0) {
      throw new ApiError('Auth Token expired', 401);
    }

    return userId;
  });

/**
 * Get user by JWT token
 * @param {String} userId
 */
const authentication = async (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.authorization;
  const parsedToken =
    token && token.includes('Bearer ') ? token.substring(7) : token;

  if (!parsedToken) {
    throw new ApiError('Auth token is not supplied', 400);
  }

  const userId = await decodeToken(parsedToken);
  const user = await User.findByPk(userId);

  if (!user) {
    throw new ApiError('User not found, invalid auth token', 400);
  }

  req.user = user;
  next();
};

module.exports = {
  authentication,
  signToken,
  decodeToken,
};
