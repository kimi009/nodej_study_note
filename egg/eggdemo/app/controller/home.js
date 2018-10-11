'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let data = await this.service.home.getData();
    await this.ctx.render('index', {
      data
    });
  }
}

module.exports = HomeController;