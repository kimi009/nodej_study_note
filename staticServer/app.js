const http = require('http');
const chalk = require('chalk');
const path = require('path');

const conf = require('./src/config/index')
const route = require('./src/router/index')


class Server {
  constructor(config) {
    this.conf = Object.assign({}, conf, config)
  }

  /**
   * 启动server
   */
  start() {
    const server = http.createServer((req, res) => {
      const filePath = path.join(this.conf.root, req.url);
      route(req, res, filePath, this.conf)
    });

    server.listen(this.conf.port, this.conf.hostname, () => {
      const addr = `http://${this.conf.hostname}:${this.conf.port}`;
      console.log(`server started at ${chalk.green(addr)}`);
    })
  }
}

module.exports = Server;