// `const` and `let` are the 'new' assignment keywords, and they should replace `var` in all but the most peculiar cases (we'll get to these). This is because `var` uses *function scoping* whereas `let` uses *block scoping*.

function varTest() {
  for (var i=0; i < 5; i++) {
    console.log(i);
  }
  console.log(i); // i is actually declared for the entire function!
}

function letTest() {
  for (let i=0; i < 5; i++) {
    console.log(i);
  }
  // console.log(i); // i is only defined inside the for loop!
}

function constTest() {
  const arr = [1, 2, 3];
  // arr = [4, 5, 6]; // ERROR - no reassignment!
  arr.push(4); // mutation is fine
  console.log(arr);
}

// In general, you should use `let` everywhere you used to use `var` and you should never have an issue. `const` is equivalent to `let`, except the compiler enforces that it is never reassigned, which is a useful feature if you don't expect that to happen. Note that `const` doesn't allow reassignment, but it *doesn't* prevent mutation. As a rule of thumb you should start with `const`, and if you need to reassign the variable, switch to `let`.


// WHY?!

// Why even introduce 'let' and 'const'? 'const' is simply a let that can't be reassigned, and that is mostly useful as a guarantee if you don't *expect* a variable to be reassigned. The real difference between 'var' and 'let' is about *scope*

// This convoluted example shows a case where 'var' scoping gets you into trouble

// createFunctionsNaive takes a positive integer 'n' and returns an array of functions, where each function *should* return it's index in the array  
function createFunctionsNaive(n) {
  var funcArray = [];

for (var i = 0; i < n; i++) {
  var func = function () { 
    return i; 
  };
    
  funcArray.push(func);
}

  return funcArray;
}

// Naive
var myFuncArr = createFunctionsNaive(5);
var retArr = myFuncArr.map(fn => fn());
console.log(retArr); // [ 5, 5, 5, 5, 5 ]

// What's wrong with this function? It's a peculiar closure issue that can happen because of *function scoping*. In essence, *function scoping* means that variables are actually declare for the whole function they are in. Javascript 'hoists' the *declaration* of a variable, so let's do this explicitly.


// createFunctionsHoisted - identical to createFunctionsNaive, just explicitly hoisting to make it clear that 'i' is function-scoped
function createFunctionsNaive(n) {
  var funcArray, i, func;
  
   funcArray = [];

  for (i = 0; i < n; i++) {
    func = function () { return i; };

    funcArray.push(func);
  }

  return funcArray;
}

// createFunctionsCorrect actually works! 
// but it is not the prettiest work-around 
function createFunctionsCorrect(n) {  
  var funcArray = [];

  for (var i=0; i < n; i++) {
    // IIFE - we create a function and immediately execute it to pass it a copy of 'i'
    var func = (function (iClone) {
      // iClone is a *copy* of i when IIFE is executed
      return function () { return iClone; };
    })(i);
    
    funcArray.push(func);
  }

  return funcArray;
}

// Correct
myFuncArr = createFunctionsCorrect(5);
retArr = myFuncArr.map(fn => fn());
console.log(retArr); // [ 0, 1, 2, 3, 4 ]

// createFunctionsLetFix works and is less convoluted!
// let is like var, but it's scoped by *block* i.e. { ... } 
// this is how most languages (and now JS) do scoping
function createFunctionsLetFix(n) {
  var funcArray = [];

  // let defined a block-scoped varaible - fresh variable for each iteration!
  for (let i=0; i < n; i++) {
    func = function () {
        return i;
      };
    
    funcArray.push(func);
  }

  return funcArray;
}

// Let-fix
myFuncArr = createFunctionsLetFix(5);
retArr = myFuncArr.map(fn => fn());
console.log(retArr); // [ 0, 1, 2, 3, 4 ]

// I only used let above to make a point. Now here's how I would write it.
function createFunctionsES6(n) {
  const funcArray = [];

  for (let i=0; i < n; i++) {
    funcArray.push(() => i);
  }

  return funcArray;
}