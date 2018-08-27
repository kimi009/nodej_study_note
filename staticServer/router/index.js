const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

module.exports = async function (req, res, filePath) {
  try {
    let stats = await stat(filePath);
    if (stats.isFile()) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      fs.createReadStream(filePath).pipe(res);
    } else if (stats.isDirectory()) {
      let files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(files.join(','))
    }
  } catch (ex) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`${filePath} is not a directory or file`)
  }
}