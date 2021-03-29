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
                  pull    = () => storage.pop ()
                , getSize = () => storage.length
                , isEmpty = () => storage.length == 0
                , debug   = () => [...storage ]
                , peek    = () => storage[storage.length-1]
                , reset   = () => {
                                    storage = []
                                    return true
                                }
            
            function F () {}
            F.prototype = { 
                              pull
                            , peek
                            , getSize
                            , isEmpty
                            , reset
                            , debug 
                        }
            F.prototype.push = ( isFilo ) ? filoPush : fifoPush;
            return new F();
    } // Stack func.
    
    
    
    
    
    module.exports = stack
    
    
    