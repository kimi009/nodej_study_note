const express = require('express')

const bodyParse = require('body-parser')

const app = new express();

app.use(bodyParse.urlencoded({
  extended: false
}));

app.use(bodyParse.json())

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.send('ok')
})

app.get('/login', function (req, res) {
  res.render('login')
})

app.post('/doLogin', function (req, res) {
  console.log(req.body);
})


app.listen(3008, '127.0.0.1')
