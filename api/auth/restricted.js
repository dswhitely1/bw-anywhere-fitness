const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.SECRET_OR_KEY;
  if (token) {
    jwt.verify(token, secret, (err, decodeToken) => {
      if (err) {
        res.status(401).json({ message: 'Not Authorized' });
      } else {
        req.user = decodeToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'No Token Provided' });
  }
};
