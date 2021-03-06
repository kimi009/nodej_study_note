const zlib = require('zlib');

module.exports = (rs, req, res) => {
  const acceptEncoding = req.headers['accept-encoding'];
  if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) { //单词边界
    return rs;
  } else if (acceptEncoding.match(/\bgzip\b/)) {
    res.setHeader('Content-Encoding', 'gzip');
    return rs.pipe(zlib.createGzip())
  } else if (acceptEncoding.match(/\deflate\b/)) {
    res.setHeader('Content-Encoding', 'deflate');
    return rs.pipe(zlib.createDeflate())
  }
}