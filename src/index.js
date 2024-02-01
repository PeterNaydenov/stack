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
                                    const 
                                          isArray = vals instanceof Array
                                        , ln = isArray ? vals.length : 1
                                        ;
                                    let extra = false;
                                    if ( onLimit === 'full' && isFull )   return
                                    if ( limit && isArray && ln>limit )   vals = vals.slice ( ln-limit )   // Reduce 'vals' to the limit size
                                    if ( limit ) {
                                                const size = (isArray ? vals.length : 1) + storage.length;
                                                if ( size >= limit && onLimit === 'full'   )   vals = vals.slice ( 0, -(size-limit) ) 
                                                if ( size >= limit && onLimit === 'update' )   extra = pull ( size-limit )
                                        }
                                    if ( isArray )   storage =   vals.reduce ( (res,item) => [item,...res], storage   )
                                    else             storage = [vals].reduce ( (res,item) => [item,...res], storage   )
                                    isFull = limit ? ( storage.length === limit ) : false
                                    if ( extra )   return extra
                        }  // fifoPush func.
                


            function lifoPush ( vals ) {
                                    const 
                                          isArray = vals instanceof Array
                                        , ln = isArray ? vals.length : 1
                                        ;
                                    let extra = false;
                                    if ( onLimit === 'full' && isFull )   return
                                    if ( limit && isArray && ln>limit )   vals = vals.slice ( 0, -ln+limit )
                                    if ( limit ) {
                                                const size = ( isArray ? vals.length : 1) + storage.length;
                                                if ( size >= limit && onLimit === 'full'   )   vals = vals.slice ( 0, -(size-limit) )
                                                if ( size >= limit && onLimit === 'update' )   extra = pull ( size-limit )
                                        }
                                    if ( vals instanceof Array )   storage = storage.concat (  vals  )
                                    else                           storage = storage.concat ( [vals] )
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
                                return (n==1) ? storage[storage.length-1] : result
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
            return new F();
    } // Stack func.
    
    
    
    
export default stack
    
    
    