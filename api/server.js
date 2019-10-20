const express = require('express');
const middleware = require('./middleware/middleware');
const routes = require('./routes/index.routes');

const server = express();
middleware(server);
routes(server);
module.exports = server;
