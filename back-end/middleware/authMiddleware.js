const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
require('dotenv').config();

const protect = async (req, res, next) => {
  let token;

  // 1. Read the token from the cookie
  token = req.cookies.token;

  if (token) {
    try {
      // 2. Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Get user from the token's payload (ID)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };