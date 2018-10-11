'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1539239249346_9409';

  // add your config here
  config.middleware = [];

  config.view = {
    mapping: {
      '.html': 'arttemplate'
    }
  };

  config.arttemplate = {
    escape: true,
    debug: true,
    bail: true,
    cache: true
  }

  return config;
};