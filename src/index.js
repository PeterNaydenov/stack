function stack (type='FIFO') {
    // *** Create "FIFO" or "FILO" stacks  
            let 
                 storage = []
               , isFilo = type.toUpperCase () === 'FILO' ? true : false
               ;
            
            function fifoPush ( vals ) {
                                    const isArray = vals instanceof Array;
                                    if ( isArray )   storage =   vals.reduce ( (res,item) => [item,...res], storage   )
                                    else             storage = [vals].reduce ( (res,item) => [item,...res], storage   )
                            }  // fifoPush func.
                
            function filoPush ( vals ) {
                                    if ( vals instanceof Array )   storage = storage.concat (  vals  )
                                    else                           storage = storage.concat ( [vals] )
                            } // filoPush func.
                    
            const
                  
                  getSize = () => storage.length
                , pull        = (n=1) => (n==1) ? storage.pop() : Array.from({length:n}).map ( () => storage.pop()   )
                , pullReverse = (n=1) => (n==1) ? storage.pop () : Array.from({length:n}).map ( () => storage.pop()   ).reverse ()
                , isEmpty = () => storage.length == 0
                , debug   = () => [...storage ]
                , peek        = (n=1) => (n==1) ? storage[storage.length-1] : storage.slice(-n).reverse ()
                , peekReverse = (n=1) => (n==1) ? storage[storage.length-1] : storage.slice(-n)
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
            F.prototype.push = ( isFilo ) ? filoPush : fifoPush;
            return new F();
    } // Stack func.
    
    
    
    
    
    module.exports = stack
    
    
    