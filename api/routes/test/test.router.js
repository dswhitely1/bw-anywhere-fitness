const testRouter = require('express').Router();

function testRoute(req, res) {
  res.json({ message: "It's Alive" });
}

testRouter.get('/', testRoute);

module.exports = testRouter;
