Express 是一个基于Node.js的web框架 提供了部分中间件  不对Node.js已有的功能封装 
1.cd到项目里面
cnpm init --yes //创建package.json
2.安装express
 cnpm install express --save //写入依赖
3.引入express
var express = require('express')
var app = new express()
