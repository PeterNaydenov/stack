# Stack (@peter.naydenov/stack)
![version](https://img.shields.io/github/package-json/v/peterNaydenov/stack)
![license](https://img.shields.io/github/license/peterNaydenov/stack)
![issues](https://img.shields.io/github/issues/peterNaydenov/stack)
![language](https://img.shields.io/github/languages/top/peterNaydenov/stack)
![npm bundle size (scoped version)](https://img.shields.io/bundlephobia/minzip/%40peter.naydenov/stack/3.0.0)



Build FIFO or LIFO stack and operate with it. You can set a limit of the stack and define how to react when limit is reached. You can pull single or multiple items from the stack. You can peek the next item without extracting it from the stack. You can reset the stack and start over again. You can check the size of the stack or if it is empty. You can debug the stack and see its content. You can use it in Node.js or in the browser.




## Installation

Install the package:
```
 npm i @peter.naydenov/stack
```

Import the module from the script
```js
import stack from '@peter.naydenov/stack'
```

or require it
```js
const stack = require('@peter.naydenov/stack')
```






## Create a stack

Call the stack function will create an empty stack. There is a non-required argument `options`. Here is an example:
```js
  // Calling function 'stack' without argument will return FIFO stack
  const cache = stack ({
                        type : 'FIFO'  // Possible values: 'FIFO'(default) or 'LIFO'
                        limit : 10  // Possible values: 'false'(default) or number(number of items)
                        onLimit : 'update'  // Possible values: 'full' or 'update'(default)
                    });
```





## Methods

```js
{
  'push'        : 'Insert data in the stack'
, 'pull'        : 'Retreve data from the stack. Single value or pull more then one value at the time'
, 'pullReverse' : 'When we want to pull more then one value, but in reverse order' 
, 'peek'        : 'Peek the next value without extracting it from the stack'
, 'peekReverse' : 'When we want to peek more then one value, but in reverse order'
, 'getSize'     : 'Returns the size of the stack'
, 'isEmpty'     : 'Returns "true" if size of stack is 0'
, 'reset'       : 'Removes content from the stack'
, 'debug'       : 'Will return content of the stack'
}
```


### stack.push ()
Insert item or items to the stack. 
```js
 let cache = stack();   // default stack is FIFO with no limit.

  cache.push(12)
  cache.push ( 2 )
  cache.push ([14,15]) // set multiple items together
  // so content of cache is -> [ 15, 14, 2, 12 ]
  cache.pull () // -> 12
 ```

 Insertion can change according parameters during creation. We can define a stack-limit - how many items can contain the stack. Additional parameter `onLimit` defines behaviour of the stack when the limit has been reached.
 Parameter options:
 - 'full'   : When limit is reached will stop to receive new values from 'push'.
 - 'update' : When limit is reached will remove of old stack members in a favor of the incoming data

 Example:
 ```js
const cache = stack ({type:'FIFO', limit:3, onLimit: 'full' })
cache.push ([1,2])
cache.push ([3,4]) // on 3 limit is reached, so value 4 will be ignored. We have option 'onLimit' - full
// content of cache is -> [ 3, 2, 1 ]
cache.pull () // -> 1

// same example but with onLimit - update
const st = stack ({type:'FIFO', limit:3, onLimit: 'update' })
st.push ([1,2])
st.push ([3,4])
// content of st is -> [ 4, 3, 2 ]
st.pull () // -> 2
 ```


### stack.pull ()
Retreve data from the stack. Single value or pull more then one value at the time. You can skip stack elements.
Here are some examples:
```js
const 
    lifo = stack ({type:'LIFO'})
  , fifo  = stack () // by default is FIFO
  , items = [1,2,3,4,5,6]
  ;

 lifo.push ( items )
 fifo.push ( items )

 lifo.pull()   // -> 6. Function 'pull' will remove the element from the stack.
 fifo.pull ()   // -> 1. Function 'pull' will remove the element from the stack.

 lifo.pull(2) // -> [5,4]. Stack 'lifo' after operation: [ 1, 2, 3 ]
 fifo.pull(2) // -> [2,3]. Stack 'fifo' after operation: [ 6, 5, 4 ]

 // Let's reset both stacks
 lifo.reset()
 fifo.reset()

 // load items again
 lifo.push ( items )
 fifo.push ( items )

 // Pull can skip some results
 // stack.pull ( numberOfItems, skipItems )
 lifo.pull (3,1) // Skip the first pull, get 3 elements. -> [ 5, 4, 3]
 // stack 'lifo' after the operation -> [ 1, 2 ]
 fifo.pull ( 3,2 ) // Skip 2 elements, get next 3. -> [ 3, 4, 5 ]
 // stack 'fifo' after the operation -> [ 6 ]
```




## Links
- [Release history](Changelog.md)
- [Migration guide](Migration.md)
- [Documentation for version 2.x.x](README-2.x.x.md)
- [Documentation for version 1.x.x](README-1.x.x.md)



 ## Credits
'@peter.naydenov/stack' was created by Peter Naydenov.






## License
'@peter.naydenov/stack' is released under the MIT License.


