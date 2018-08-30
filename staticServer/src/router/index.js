const path = require('path')
const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const handlebars = require('handlebars')
const conf = require('../config/index')
const mimes = require('../config/mime')
const compress = require('../helper/compress').default
//这里的代码是只执行一次，要理解nodejs 模块加载机制
const templatePath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(templatePath)
const template = handlebars.compile(source.toString())
const isFresh = require('../helper/cache')

module.exports = async function (req, res, filePath) {
  try {
    let stats = await stat(filePath);
    if (stats.isFile()) {
      res.statusCode = 200;
      const mime = mimes(path.extname(filePath));
      console.log(mime)
      res.setHeader('Content-Type', mime);
      if (isFresh(stats, req, res)) {
        res.statusCode = 304;
        res.end();
        return;
      }
      let stream = fs.createReadStream(filePath, {
        encoding: 'utf8'
      });
      if (filePath.match(conf.compress)) {
        stream = compress(stream, req, res);
      }
      stream.pipe(res);
    } else if (stats.isDirectory()) {
      let files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      let relPath = path.relative(conf.root, filePath)
      const data = {
        title: path.basename(filePath),
        dir: relPath ? `/${relPath}` : '',
        files
      }
      res.end(template(data))
    }
  } catch (ex) {
    console.error(ex)
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`${filePath} is not a directory or file`)
  }
}