const testRouter = require('express').Router();

function testRoute(req, res) {
  res.send(`'It's Alive`);
}

testRouter.get('/', testRoute);

module.exports = testRouter;
