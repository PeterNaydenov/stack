# Migration Guides

### From v.2.x.x - v.3.x.x

Word 'FILO' was changed to 'LIFO' to be more consistent with the rest of the world. No other changes were made.



## From v.1.x.x - v.2.x.x

### Options change
In version 1.x.x
```js
const cache = stack ( 'FILO' ) // Type of stack as a string
```

In version 2.x.x:

```js
const cache = stack ({ type:'FILO' }) // Option object instead of string
// New options properties are available:
// - limit - Set a size limit for the stack;
// - onLimit - How to react stack if limit is reached.
```