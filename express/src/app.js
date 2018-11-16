const express = require('express')

const approuter = require('./approute.js');

// const bodyParse = require('body-parser')

const app = express();

// app.use(bodyParse.urlencoded({
//   extended: false
// }));

// app.use(bodyParse.json())
app.set('view engine', 'ejs');

// app.use('/admin',approuter);

app.get('/', function (req, res) {
  // res.send('ok')
  res.render('test')
})

app.get('/test', function (req, res) {
  res.render('test')
})

app.get('/login', function (req, res) {
  res.render('login')
})

app.post('/doLogin', function (req, res) {
  console.log(req.body);
})

app.listen(3008, '192.168.136.133')