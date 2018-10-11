'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async getData() {
    return {
      msg: 'hello'
    }
  }
}

module.exports = HomeService;