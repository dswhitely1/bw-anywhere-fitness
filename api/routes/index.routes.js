const testRouter = require('./test/test.router');

module.exports = server => {
  server.use('/', testRouter);
};
