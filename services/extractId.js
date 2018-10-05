import jwt from 'jsonwebtoken';

function extractId (req) {
    const token = req.get('Authorization');
    const auth = token.substring(7);
    return jwt.verify(
        auth,
      'tasmanianDevil',
      { ignoreExpiration: false },
      (err, decoded) => {
          const id = decoded.user;
          return id;
      }
    )
};

export default extractId;