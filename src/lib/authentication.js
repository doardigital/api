const jwt = require('jsonwebtoken');

const generateToken = () => {
  return jwt.sign(
    { role: 'admin' },
    process.env.JWT_KEY,
    {
      expiresIn: process.env.JWT_EXPIRATION
    }
  );
};

module.exports = {
  generateToken,
};
