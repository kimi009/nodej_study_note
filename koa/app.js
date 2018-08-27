var Koa = require('koa');

var app = new Koa();

//配置路由
//中间件

// app.use(function (req, res) {
//   res.send('返回的数据')
// })

app.use(async(ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('x-Response-Time', `${ms}ms`);
});

//logger
app.use(async(ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

app.use(async(ctx) => {
  ctx.body = '你好 koa';

})


app.listen(3008)