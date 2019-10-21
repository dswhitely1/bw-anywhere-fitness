const testRouter = require('./test/test.router');
const authRouter = require('./auth/auth.router');
const userRouter = require('./user/user.router');
const categoryRouter = require('./categories/category.router');

module.exports = server => {
  server.use('/', testRouter);
  server.use('/api/auth', authRouter);
  server.use('/api/user', userRouter);
  server.use('/api/category', categoryRouter);
};
