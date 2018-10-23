const Koa = require('koa');
const router = require('koa-router')();
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const app = new Koa();
app.use(bodyParser());
//配置模板引擎
// app.use(views('views',{
//   extension:'ejs' //应用ejs模板引擎
// }))
app.use(views('views', {
  map: {
    html: 'ejs'
  }
}))
//TODO:静态资源中间件  可以配置多个静态地址
app.use(serve('static'))
//TODO: 在每一个路由的render模板里面有公共的数据
//一般是写一个中间件来
app.use(async(ctx, next) => {
  ctx.state = {
    userName: '张三'
  }
  await next();
})
console.log(__dirname)
router.get('/', async(ctx) => {
  ctx.cookies.set('address','gs')
  let msg = 'nihao';
  let li = [11, 22, 33]
  let content = '<h2>这是一个h2</h2>'
  await ctx.render('test', {
    msg,
    li,
    content
  })
})

router.get('/index', async(ctx) => {
  console.log(ctx.cookies.get('address'))
 
  await ctx.render('index')
})

router.post('/doAdd', async(ctx) => {
  console.log(ctx.request.body);
})

router.get('/news', async(ctx) => {
  await ctx.render('news')
})

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3008)