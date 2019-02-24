const md5 = require('md5');

const tools = {
  md5(str) {
    return md5(str);
  },
  generateTree(data) {
    if (data.length <= 0) {
      return [];
    }
    let treeData = data.filter(item => item.pid == 0);
    let childs = data.filter(item => item.pid != 0);
    childs.forEach(item => {
      let res = treeData.find(p => p._id.toString() == item.pid);
      if(!res){
        treeData.push(item)
      }else{
        if (!res.list) {
          res['list'] = []
        }
        res.list.push(item);
      }
    })
    return treeData;
  }
}

module.exports = tools;