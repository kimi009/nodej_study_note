const koa = require('koa'),
  path = require('path'),
  router = require('koa-router')(),
  render = require('koa-art-template'),
  index = require('./routes/index'),
  url = require('url'),
  IO = require('koa-socket');

const app = new koa();

const io = new IO();
io.attach(app);

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV != 'production'
})

router.use(index);

app.use(router.routes());
app.use(router.allowedMethods());

app._io.on('connection', socket => {
  console.log('建立连接')
  let roomId = url.parse(socket.request.url, true).query.roomid;
  socket.join(roomId);
  socket.on('addCart', data => {
    console.log(data)
    //socket.emit('serverEmit','收到')//点对点  做机器人
    // app._io.emit('serverEmit','我接受到了') //广播
    // app._io.to(roomId).emit('serverEmit', `${roomId} 我接受到了`) //全部收到
    socket.broadcast.to(roomId).emit('serverEmit', `${roomId} 我接受到了`) //除自己外的人收到
  })
})

app.listen(3009)