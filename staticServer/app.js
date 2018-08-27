const http = require('http');
const chalk = require('chalk');
const path = require('path');

const config = require('./src/config/index')
const route = require('./src/router/index')

const server = http.createServer((req, res) => {
  const filePath = path.join(config.root, req.url);
  route(req, res, filePath)
});

server.listen(config.port, config.hostname, () => {
  const addr = `http://${config.hostname}:${config.port}`;
  console.log(`server started at ${chalk.green(addr)}`);
})