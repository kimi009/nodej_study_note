var app = {
  toggle: function (el, collectionName, attr, id) {
    $.get('/admin/changeStatus', {
      collectionName,
      attr,
      id
    }, function (data) {
      if (data) {
        var temp = el.src;
        if (el.src.indexOf('yes') > 0) {
          el.src = temp.replace('yes', 'no')
        } else {
          el.src = temp.replace('no', 'yes')
        }
      }
    })
  }
}