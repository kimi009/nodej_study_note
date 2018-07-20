function* gen(x){
  var y =  yield x+2;
  console.log(y)
  return y;
}

var g = gen(1);
g.next();
g.next()
g.next()