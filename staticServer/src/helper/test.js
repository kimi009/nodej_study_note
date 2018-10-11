function setEipCookie() {
  var res = document.getElementsByTagName('input');
  document.cookie = 'eip_voucherNumber=' + escape(res[0].value);
  document.cookie = 'eip_firstName=' + escape(res[1].value);
  document.cookie = 'eip_lastName=' + escape(res[2].value);
  document.cookie = 'eip_opId=' + escape(res[3].value);
}

function addEvent(ele, eventType, fn, useCapture) {
  if (ele.addEventListener) {
    ele.addEventListener(eventType, fn, useCapture);
    return true;
  } else if (ele.attachEvent) {
    ele.attachEvent('on' + eventType, fn);
  } else {
    ele['on' + eventType] = fn;
  }
}

function removeEvent(ele, eventType, fn, useCapture) {
  if (ele.removeEventListener) {
    ele.removeEventListener(eventType, fn, useCapture);
    return true;
  } else if (ele.detachEvent) {
    ele.detachEvent('on' + eventType, fn);
  } else {
    ele['on' + eventType] = fn;
  }
}
removeEvent(window, 'popstate', setEipCookie, false)
addEvent(window, 'popstate', setEipCookie, false)