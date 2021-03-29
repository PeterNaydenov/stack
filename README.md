# Stack (@peter.naydenov/stack)

Build FIFO or FILO stack and operate with it.

## Instalation

Install the package:
```
 npm i @peter.naydenov/stack
```

Request the module from the script
```js
const stack = require ( '@peter.naydenov/stack' );
```

## Create stack

Call function with single argument - the type of the stack you need: FIFO or FILO.
```js
  const cache = stack ('FIFO');   // Possible values: FIFO or FILO
  // Arguments of function stack are not case sensetive. e.g. -> 'filo','FILO','Filo' 
  // Calling function stack without argument will return FIFO stack
```


## Methods

```js
{
  'push'     : 'Insert data in the stack'
, 'pull'     : 'Retreve data from the stack'
, 'peek'     : 'Peek the next value without extracting it from the stack'
, 'getSize'  : 'Returns the size of the stack'
, 'isEmpty'  : 'Returns "true" if size of stack is 0'
, 'reset'    : 'Removes content from the stack'
, 'debug'    : 'Will return content of the stack'
}
```









## Release History

### 1.0.0 ( 2021-03-29 )
 - [x] Node.js module;
 - [x] Tests;
 - [x] Short documentation;





 ## Credits
'@peter.naydenov/stack' was created by Peter Naydenov.






## License
'@peter.naydenov/stack' is released under the MIT License.


