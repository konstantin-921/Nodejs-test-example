import jwt from 'jsonwebtoken';

function extractId (req) {
    const token = req.get('Authorization');
    return jwt.verify(
      token,
      'tasmanianDevil',
      { ignoreExpiration: false },
      (err, decoded) => {
          const id = decoded.user;
          return id;
      }
    )
};

export default extractId;