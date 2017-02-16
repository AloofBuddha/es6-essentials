// traditional functions

sayHi(); // I can call the function here even though it is defined below

// function *statement* - is hoisted and accesible in the entire module
function sayHi() {
  console.log('Hi');
}

// function *expression*. An anonymous function we create then save to a variable. can only be used after it is declared (not hoisted)
const sayHowdy = function () {
  console.log('Howdy');
}

sayHowdy();

// can still name a function expression! 
// this is sometimes useful for debugging
const sayAnyong = function sayAnyong() {
  console.log('Anyong');
}

sayAnyong();

// arrow functions

// arrow functions are identical to 'normal' functions in all but a few ways

// ES6 arrow function, takes 0...many parameters, has a 'block' for a body
const sayHello = () => {
  console.log('Hello');
}

const add4 = (x) => {
  return x + 4;
}

// parens are optional if exactly 1 arg
const add5 = x => {
  return x + 5;
}

// if no block { ... }, you can provide a single expression which is returned
const add6 = x => x + 6;

// this syntax can get tricky when ambiguity is possible, so take note
// const returnAnObj = val => {
//   val: val,
//   another: 10
// }

// can always be fixed by wrapping the return expression in parens
const returnAnObj = val => ({
  val: val,
  another: 10
});

// # main difference - this binding

function Person() {
  this.age = 0;

  const callback = function () {
    this.age++;
    console.log(this); 
  }

  // when callback is actually called it will be in whatever context setTimout is calling it in, not our current function!
  setTimeout(callback, 1000);
}

function Person2() {
  this.age = 0;

  const callback = () => {
    this.age++;
    console.log(this); 
  }
  // callback in this context is what we expect now
  setTimeout(callback, 1000);
}

// the above is equivalent to this non-arrow function solution
function Person3() {
  this.age = 0;

  let callback = function () {
    this.age++;
    console.log(this); 
  };
  // explicit binding of correct this
  callback = callback.bind(this);

  setTimeout(callback, 1000);
}

new Person();
new Person2();
new Person3();

// also, does not have it's own 'arguments' keyword, but that should always be replaced by spread/rest operator now :)