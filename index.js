require('dotenv').config();
const server = require('./api/server');

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`\n*** Server Listening on PORT:${PORT} ***\n`)
);
