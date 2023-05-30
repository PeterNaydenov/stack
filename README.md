# Stack (@peter.naydenov/stack)

Build FIFO or FILO stack and operate with it.





## Installation

Install the package:
```
 npm i @peter.naydenov/stack
```

Import the module from the script
```js
import stack from '@peter.naydenov/stack'
```





## Create stack

Call the stack function will create an empty stack. There is a non-required argument `options`. Here is an example:
```js
  // Calling function 'stack' without argument will return FIFO stack
  const cache = stack ({
                        type : 'FIFO'  // Possible values: 'FIFO'(default) or 'FILO'
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
    filo = stack ({type:'FILO'})
  , fifo = stack () // by default is FIFO
  , items = [1,2,3,4,5,6]
  ;

 filo.push ( items )
 fifo.push ( items )

 filo.pull()  // -> 6. Function 'pull' will remove the element from the stack.
 fifo.pull () // -> 1. Function 'pull' will remove the element from the stack.

 filo.pull(2) // -> [5,4]. Stack 'filo' at the moment [ 1, 2, 3 ]
 fifo.pull(2) // -> [2,3]. Stack at the moment is [ 6, 5, 4 ]

 // Let's reset both stacks
 filo.reset()
 fifo.reset()

 // load items again
 filo.push ( items )
 fifo.push ( items )

 // Pull can skip some results
 // stack.pull ( numberOfItems, skipItems )
 filo.pull (3,1) // Skip the first pull, get 3 elements. -> [ 5, 4, 3]
 // stack 'filo' after the operation -> [ 1, 2 ]
 fifo.pull ( 3,2 ) // Skip 2 elements, get next 3. -> [ 3, 4, 5 ]
 // stack 'fifo' after the operation -> [ 6 ]
```








 ## Credits
'@peter.naydenov/stack' was created by Peter Naydenov.






## License
'@peter.naydenov/stack' is released under the MIT License.


