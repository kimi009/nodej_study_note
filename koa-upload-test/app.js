const Koa = require('koa'),
  router = require('koa-router')(),
  render = require('koa-art-template'),
  path = require('path'),
  fs = require('fs'),
  koaBody = require('koa-body'),
  static = require('koa-static')

const app = new Koa()

app.use(
  koaBody({
    multipart: true,
    encoding: 'gzip',
    formidable: {
      uploadDir: path.join(__dirname, 'public/upload/')
    }
  })
)

//配置koa-art-template模板引擎
render(app, {
  root: path.join(__dirname, 'views'), // 表示视图的位置
  extname: '.html', // 表示后缀名是什么
  dateFormat: (dateFormat = function(value) {
    return sd.format(value, 'YYYY-MM-DD HH:mm:ss')
  }),
  debug: process.env.NODE_ENV != 'production' // 是否开启调试模式
})

app.use(static(__dirname + '/public/'))

router.get('/test', async ctx => {
  await ctx.render('index')
})

router.post('/upload', async ctx => {
  // console.log(ctx.request.body)
  // console.log(ctx.request.files)

  //上传单个文件
  // const file = ctx.request.files;
  const imgData = ctx.request.body.Base64File
  let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  // let binaryData = new Buffer(base64Data,'base64').toString('binary');
  let dataBuffer = new Buffer(base64Data, 'base64')
  fs.writeFile(path.join(__dirname, '/1.png'), dataBuffer, err => {
    console.log(err)
  })
  // //创建读流
  // const reader = fs.createReadStream(file);
  // let filePath = path.join(__dirname,'upload/') + `/1.jpg`;
  // //创建写流
  // const write = fs.createWriteStream(filePath);
  // reader.pipe(write);
  return (ctx.body = '上传成功')
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(8108, '192.168.1.102')
