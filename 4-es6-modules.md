> ES6 module pattern only works if you are using webpack

# importing

```js
const module = require('./myModule')
```

becomes ...

```js
import module from './myModule'
```

# exporting 

```js
module.exports = {
  myStr: "hello",
  myNum: 1
}
```

becomes ...

```js
const myObj = {
  myStr: "hello",
  myNum: 1
}

export default myObj;
```

Additional, there is also `export` without the `default`

Exporting
```js
export default function main() {
 return 1;
}

export function another() {
  return 2;
}

export function andAnother() {
  return 3;
}
```

importing
```js
import main, { another, andAnother } from './myModule';
```

