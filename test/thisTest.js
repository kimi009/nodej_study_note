// "use strict";
// function foo() {
//   console.log(this.name)
// }
// var name = 'window';
// foo();


// function foo(a, b) {
//   this.a = a;
//   this.b = b;
// }
// var t = {
//   m: 4
// }
// foo.apply(t, [5, 6]);
// console.log(t);


// function wait(msg) {
//   setTimeout(function () {
//     console.log(msg);
//   }, 1000)
// }
// wait('hello')

function add(x){
  var sum=x;
  function temp(y){
      console.log("y:"+y);
      sum+=y;
      return temp;
  }
  temp.toString=function(){
      return sum;
  }
  return temp;
}

var m = add(1)(2)(3);
console.log(m)