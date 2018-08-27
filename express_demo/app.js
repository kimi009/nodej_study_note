var express = require('express');

var app = express();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index')
})

app.listen(8010,'127.0.0.1');