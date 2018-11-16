const koa = require('koa'),
  app = new koa();

app.use(async (ctx) => {
  ctx.body = 'hello world koa';
})

app.listen(8090)