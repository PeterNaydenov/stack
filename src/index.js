/**
 * @typedef {Object} StackOptions
 * @property {('FIFO'|'LIFO')}    [type='FIFO']      Stack order. `'FIFO'` (default) or `'LIFO'`. Argument is case-insensitive.
 * @property {number|false}       [limit=false]      Maximum number of items. `false` (default) means no limit.
 * @property {('full'|'update')}  [onLimit='update'] Behaviour when the limit is reached:
 *                                                     - `'full'`:   stop accepting new values once the stack is full.
 *                                                     - `'update'`: drop the oldest items to make room; the evicted items are returned from `push`.
 */

/**
 * @typedef {Object} Stack
 * @property {(vals: any|any[]) => any|any[]|undefined} push
 *   Insert data into the stack. Accepts a single value or an array of values.
 *   - With `onLimit: 'update'`: returns the evicted items (a single value if one was evicted, an array if several, or `[]` if no eviction was needed).
 *   - With `onLimit: 'full'`:   returns `undefined` when the input would overflow the limit.
 *   - Otherwise:                returns `undefined`.
 * @property {(n?: number, skip?: number) => any|any[]} pull
 *   Remove and return data from the stack.
 *   - `n = 1` (default): returns a single value, or `undefined` if the stack is empty.
 *   - `n > 1`:          returns an array of up to `n` values in pull order.
 *   - `skip` items are removed first and discarded.
 * @property {(n?: number, skip?: number) => any|any[]} pullReverse
 *   Same as `pull`, but the returned array is reversed.
 * @property {(n?: number, skip?: number) => any|any[]} peek
 *   Return the next value(s) without removing them. Does not modify the stack.
 *   - `n = 1` (default): returns a single value, or `undefined` if the stack is empty.
 *   - `n > 1`:          returns an array of up to `n` values in pull order.
 *   - `skip` walks past elements without returning them.
 * @property {(n?: number, skip?: number) => any|any[]} peekReverse
 *   Same as `peek`, but the returned array is reversed.
 * @property {() => number}   getSize   Returns the current size of the stack.
 * @property {() => boolean}  isEmpty   Returns `true` if the stack is empty.
 * @property {() => true}     reset     Empties the stack. Always returns `true`.
 * @property {() => any[]}    debug     Returns a shallow copy of the stack contents.
 */

/**
 * Create a FIFO or LIFO stack with an optional size limit.
 *
 * @param {StackOptions} [inOptions]
 * @returns {Stack}
 */
function stack ( inOptions={} ) {
    // *** Creates "FIFO" or "LIFO" stacks  
            let 
                 storage = []
               , defaultOptions = { type: 'FIFO', limit: false, onLimit: 'update' } 
               , { type, limit, onLimit } = Object.assign ({}, defaultOptions, inOptions )
               , isLIFO = type.toUpperCase () === 'LIFO' ? true : false
               , isFull = false
               ;
            
            function fifoPush ( vals ) {
                                    // Normalize input: a single value is wrapped to a one-element array
                                    // so the rest of the function can treat 'vals' uniformly as an array.
                                    const isArray = vals instanceof Array;
                                    if ( !isArray )   vals = [vals];
                                    const ln = vals.length;
                                    let extra = false;
                                    if ( onLimit === 'full' && isFull )   return
                                    if ( limit && ln>limit )   vals = vals.slice ( ln-limit )   // Reduce 'vals' to the limit size
                                    if ( limit ) {
                                                const size = vals.length + storage.length;
                                                if ( size >= limit && onLimit === 'full'   )   vals = vals.slice ( 0, -(size-limit) )
                                                if ( size >= limit && onLimit === 'update' )   extra = pull ( size-limit )
                                        }
                                    storage = vals.reduce ( (res,item) => [item,...res], storage )
                                    isFull = limit ? ( storage.length === limit ) : false
                                    if ( extra )   return extra
                        }  // fifoPush func.



            function lifoPush ( vals ) {
                                    // Normalize input: a single value is wrapped to a one-element array
                                    // so the rest of the function can treat 'vals' uniformly as an array.
                                    const isArray = vals instanceof Array;
                                    if ( !isArray )   vals = [vals];
                                    const ln = vals.length;
                                    let extra = false;
                                    if ( onLimit === 'full' && isFull )   return
                                    if ( limit && ln>limit )   vals = vals.slice ( 0, -ln+limit )
                                    if ( limit ) {
                                                const size = vals.length + storage.length;
                                                if ( size >= limit && onLimit === 'full'   )   vals = vals.slice ( 0, -(size-limit) )
                                                if ( size >= limit && onLimit === 'update' )   extra = pull ( size-limit )
                                        }
                                    storage = storage.concat ( vals )
                                    isFull = limit ? ( storage.length === limit ) : false
                                    if ( extra )    return extra
                        } // lifoPush func.



           function pull ( n=1, skip=0 ) {
                                let result = [];
                                if ( skip > 0 )   Array.from({length:skip}).map ( () => storage.pop() )
                                if ( n == 1   )   return storage.pop()
                                Array.from({length:n}).map ( () => {
                                                                let val = storage.pop()   
                                                                if ( val != null )   result.push ( val )
                                        })
                                return result
                        } // pull func.



            function pullReverse ( n=1, skip=0 ) {
                                let 
                                     result = pull ( n, skip )
                                   , isArray = result instanceof Array
                                   ;
                                if ( isArray )   return result.reverse ()
                                else             return result
                        } // pullReverse func.



            function peek ( n=1, skip=0 ) {
                                let
                                    result = []
                                  , position = storage.length - skip
                                  ;
                                if ( n > 1 ) {
                                                Array.from({length:n}).map ( () => {
                                                                let val = storage[position-1];
                                                                if ( val != null )   result.push ( storage[position-1] )
                                                                position--
                                                        })
                                        }
                                return (n==1) ? storage[storage.length-1-skip] : result
                        } // peek func.



            function peekReverse (n=1,skip=0) {
                                const
                                    result = peek (n,skip)
                                  , isArray = result instanceof Array
                                  ;
                                if ( isArray ) return result.reverse ()
                                else           return result
                        } // peekReverse func.
                    


            const
                  getSize = () => storage.length
                , isEmpty = () => storage.length == 0
                , debug   = () => [...storage ]
                , reset   = () => {
                                    storage = []
                                    return true
                                }
        
            function F () {}
            F.prototype = { 
                              pull
                            , pullReverse
                            , peek
                            , peekReverse
                            , getSize
                            , isEmpty
                            , reset
                            , debug 
                        }
            F.prototype.push = ( isLIFO ) ? lifoPush : fifoPush;
            return /** @type {Stack} */ ( new F() );
    } // Stack func.
    
    
    
    
export default stack
    
    
    