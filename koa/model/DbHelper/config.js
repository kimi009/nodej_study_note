var public = require('./public.js')
const config = {
  // dbUrl: 'mongodb://127.0.0.1:27017',
  dbUrl: public.dbUrl,
  dbName: 'koa'
}

module.exports = config;