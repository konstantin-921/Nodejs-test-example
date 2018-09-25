const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
  const auth = req.get('Authorization');
  const path = req.url.substring(0, 16);
  if (req.url !== '/api/auth/signIn' && path !== '/api/auth/signUp') {
    const token = auth.substring(7);
    jwt.verify(
      token,
      config.secretOrKey,
      { ignoreExpiration: false },
      (err, decoded) => {
        if (err) {
          res.status(401).json({ message: 'Token not verify' });
        } else {
          next();
        }
      }
    );
  } else {
    next();
  }
};
