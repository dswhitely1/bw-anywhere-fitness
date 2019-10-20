const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function password(data) {
  return bcrypt.hashSync(data, 10);
}

function token(user) {
  const payload = {
    id: user.id,
    username: user.username,
    roleId: user.roleId,
  };
  const secret = process.env.SECRET_OR_KEY;
  const options = { expiresIn: '1d' };
  return jwt.sign(payload, secret, options);
}

module.exports = { password, token };
