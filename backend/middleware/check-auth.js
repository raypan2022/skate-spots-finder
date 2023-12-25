const jwt = require('jsonwebtoken');

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('authorization failed');
    }
    const decodedToken = jwt.verify(token, process.env.PRIVATE);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return next(new HttpError('authorization failed', 403));
  }
};