const testRouter = require('./test/test.router');
const authRouter = require('./auth/auth.router');

module.exports = server => {
  server.use('/', testRouter);
  server.use('/api/auth', authRouter);
};
