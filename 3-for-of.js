// for ... of is meant to be a nicer looping syntax when we only want to look at each element in an array once

// traditional for loop

const arr = [1, 2, 3];

for (let i=0; i < arr.length; i++) {
  const elem = arr[i];
  console.log(elem);
}

// for .. of
for (const elem of arr) {
  console.log(elem);
}

// works for things besides arrays!
for (let char of "string") {
  console.log(char);
}
