# destroy circular

Creates a copy of an object where all of the circular references are replaced
by a string `[Circular]`. Useful for protecting against problems when stringifying
an object when you don't have control over the stringifying. If you can stringify
the object yourself, I recommend using [circular](https://github.com/freeformsystems/circular)
instead.

## install

```
npm install destroy-circular
```

## usage

```javascript
var dc = require('destroy-circular');
var obj = {}; var child = {parent: obj}; obj.child = child;
var stringifySafeObj = dc(obj);
console.log(stringifySafeObj); // -> { child: { parent: '[Circular]' } }
```

The returned object is a copy—the original is not mutated in any way.

## license

MIT
