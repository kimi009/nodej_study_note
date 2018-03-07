let fs = require('fs');

fs.readdir('upload', function (err, files) {
  if (err) {
    console.log(err)
  } else {
    console.log(files)
    // for (let i = 0; i < files.length; i++) {
    //   fs.stat(files[i], function (err, stats) {
    //     console.log(files[i])
    //     console.log(stats)
    //   })
    // }
    let FileArr = [];
    (function getFiles(i) {
      if (i == files.length) {
        console.log(FileArr)
        return false;
      }
      fs.stat('upload/' + files[i], function (err, stats) {
        if (stats.isDirectory()) {
          FileArr.push(files[i])
        }
        getFiles(i + 1)
      })

    })(0)
  }
})