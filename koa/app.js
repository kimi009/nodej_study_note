const Koa = require('koa'),
  router = require('koa-router')(),
  render = require('koa-art-template'),
  path = require('path'),
  static = require('koa-static'),
  session = require('koa-session'),
  bodyparser = require('koa-bodyparser'),
  index = require('./routes/index.js'),
  admin = require('./routes/admin.js'),
  api = require('./routes/api.js');

const app = new Koa();

//配置session
app.keys = ['my first koa project']
const CONFIG = {
  key: 'koa:sess',
  maxAge: 864000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true,
  renew: false
};
app.use(session(CONFIG, app))

//配置koa-bodyparser
app.use(bodyparser());

//配置模板引擎
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV != 'production'
})
//配置中间件
app.use(async(ctx, next) => {
  ctx.state.__HOST__ = 'http://' + ctx.request.header.host

  await next()
})
//配置静态资源
app.use(static(__dirname + '/public/'))

router.use('/admin', admin)
router.use('/api', api)
router.use(index);


app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3008)