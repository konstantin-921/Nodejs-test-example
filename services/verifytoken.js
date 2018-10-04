import jwt from 'jsonwebtoken';

function verifyToken (req, res, next) {
  const auth = req.get('Authorization');
  const path = req.url.substring(0, 16);
  if (auth && path !== '/api/auth/signIn' && path !== '/api/auth/signUp') {
    jwt.verify(
      auth,
      'tasmanianDevil',
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

export default verifyToken;