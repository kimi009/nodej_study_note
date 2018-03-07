var fs = require('fs')

fs.stat('upload', function (err, stats) {
  if (err) {
    console.log(err)
    fs.mkdir('upload', function (error) {
      if (error) {
        console.log(error)
        return false;
      }
      console.log('create success')
    })
  } else {
    console.log('目录已经存在')
    console.log(stats.isDirectory())
  }
})