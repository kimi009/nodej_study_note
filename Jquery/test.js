// (function (a, b) {
//   var i = 'test'
// })(1, 2)
// console.log(module.exports)

function Animal(name, age, address) {
  this.name = name;
  this.age = age;
  this.address = address;
}
Animal.prototype.getAddress = function () {
  console.log(this.address)
}

function Dog() {
  this.test = 'hashiqi';
  Animal.apply(this, arguments)
}
Dog.prototype = Animal.prototype;
Dog.prototype.constructor = Dog;
Dog.prototype.out = function () {
  console.log(`name=${this.name} age=${this.age}`)
}

var d = new Dog('x', 22,'232');
d.out();
d.getAddress();