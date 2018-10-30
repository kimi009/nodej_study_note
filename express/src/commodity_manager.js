var express = require('express');
var app = new express();

const Db = require('../util/db')
const fs = require('fs')

//图片上传模块 既可以获取form表单数据 还可以实现上传图片
var multiparty = require('multiparty')
// var bodyParser = require('body-parser');
// //设置bodyparse中间件
// app.use(bodyParser.urlencoded({
//   extended: false
// }))

// app.use(bodyParser.json())

//session
var session = require('express-session');
app.use(session({
  secret: 'shop',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000
  },
  rolling: true
}))

//ejs模板引擎

app.set('view engine', 'ejs'); //使用

//配置public目录为我们的静态资源服务
app.use(express.static('public'));
//先匹配upload路由 然后去在upload里面找图片地址
app.use('/upload', express.static('upload'));

//自定义中间件判断登陆状态

// app.use((req, res, next) => {
//   if (/login/.test(req.url)) {
//     next();
//   } else {
//     if (req.session.userinfo && req.session.userinfo.username) {
//       app.locals['username'] = req.session.userinfo.username;
//       next();
//     } else {
//       res.redirect('login')
//     }
//   }
// })

app.get('/', (req, res) => {
  res.send('index')
})


app.get('/login', (req, res) => {
  // res.send('index')
  res.render('login')
})


app.post('/dologin', async(req, res) => {
  //1.获取数据

  //2.连接数据库查询数据
  // if(!req.body.username){
  //   assert('用户名不能为空')
  //   return;
  // }
  // if(!req.body.password){
  //   assert('密码不能为空');
  //   return;
  // }
  try {
    // let client = await MongoClient.connect(DbUrl, {
    //   useNewUrlParser: true
    // });
    // if (!client) {
    //   assert(err);
    //   return;
    // }
    // let result = await client.db().collection('user').findOne(req.body);
    let result = await Db.findOne('user', req.body);
    if (result) {
      req.session.userinfo = result;
      res.redirect('product');
    } else {
      res.render('login');
    }
    // let count = await result.count();

    // if (count === 1) {
    //   //保存用户信息
    //   let arr = await result.toArray();
    //   req.session.userinfo = arr[0];
    //   res.redirect('product');
    // } else {
    //   res.render('login');
    // }


    // let db = await client.db();
    // var result = db.collection('user').find({});
    // var list = [];
    // result.forEach((err, doc) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     if (doc != null) {
    //       list.push(doc)
    //     }
    //   }
    // })
    // client.close();
    // res.send('ok')
  } catch (error) {
    console.log(error.message);
    res.redirect('login')
  }
})

app.get('/product', async(req, res) => {
  let products = await Db.find('product');
  res.render('product', {
    products
  })
})

app.get('/productadd', (req, res) => {
  res.render('productadd')
})

app.post('/doProductAdd', async(req, res) => {
  let productInfo = {};
  let form = new multiparty.Form();
  form.uploadDir = 'upload'; //图片上传保存的地址
  form.parse(req, function (err, fields, files) {
    let title = fields.title[0],
      price = fields.price[0],
      fee = fields.fee[0],
      description = fields.description[0],
      path = files.pic[0].path;
    Db.insert('product', {
      title,
      price,
      fee,
      description,
      path
    }, (result) => {
      if (result.ok) {
        res.redirect('product')
      } else {
        res.redirect('productadd')
      }
    });

  })
})

app.get('/productedit', async(req, res) => {
  let result = await Db.findOne('product', new Db.ObjectID(req.query.id));
  res.render('productedit', {
    data: result
  });
})

app.post('/doProductEdit', async(req, res) => {
  let form = new multiparty.Form();
  form.uploadDir = 'upload'; //图片上传保存的地址
  form.parse(req, function (err, fields, files) {
    let id = fields._id[0],
      title = fields.title[0],
      price = fields.price[0],
      fee = fields.fee[0],
      description = fields.description[0];
      path = files.pic[0].path;
    let updateFields = {title,price,fee,description};
    if(files.pic[0].originalFilename){
      updateFields.path = path;
    }else{
      // console.log(path)
      fs.unlink(path)
    }
    Db.updateOne('product', {
      _id: new Db.ObjectID(id)
    }, updateFields, function (updateRes) {
      if (updateRes.n == 1) {
        res.redirect('/product')
      }
    });

  })
})



app.get('/productdel', async (req, res) => {
  await Db.deleteOne('product',{_id:new Db.ObjectID(req.query.id)})
  res.redirect('/product')
})

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('login');
})

app.listen(3001);