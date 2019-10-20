const express = require('express');

const server = express();
server.use('/', (req, res) => res.send("It's Alive"));
module.exports = server;
