const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

module.exports = (req, res, next) => {
  const token = req.headers.authentication;
  if (token) {
    jwt.verify(token, secret, (err, decodeToken) => {
      if (err) {
        res.status(401).json({ message: 'Not Authorized' });
      } else {
        req.user = { id: decodeToken.id, roleId: decodeToken.roleId };
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'No Token Provided' });
  }
};
