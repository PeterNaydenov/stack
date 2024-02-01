'use strict'



import stack from '../src/index.js'
import { expect } from 'chai'



describe ( 'Stack Tests', () => {



it ( 'Create and use FIFO stack', () => {
        let cache = stack ();
        
        // Stack empty?
        expect ( cache.isEmpty() ).to.be.true

        // Fill with values
        cache.push ( 1 )
        cache.push ( 2 )

        // Stack empty?
        expect ( cache.isEmpty() ).to.be.false
        
        // Find if FIFO
        expect ( cache.pull() ).to.be.equal ( 1 )
        expect ( cache.pull() ).to.be.equal ( 2 )
}) // it fifo



it ( 'Create and use FILO stack', () => {
    let cache = stack ({type:'LIFO'});   // Param should not be case sesitive
        
    // Stack empty?
    expect ( cache.isEmpty() ).to.be.true

    // Fill with values
    cache.push ( 1 )
    cache.push ( 2 )

    // Stack empty?
    expect ( cache.isEmpty() ).to.be.false
    
    // Find if FILO
    expect ( cache.pull() ).to.be.equal ( 2 )
    expect ( cache.pull() ).to.be.equal ( 1 )
}) // it filo



it ( 'Push object', () => {
        let cache = stack (); // default stack should be FIFO

        cache.push ( {a:12, b:15})
        expect ( cache.pull() ).to.be.deep.equal ( {a:12, b:15 })
}) // it push object



it ( 'Push multiple items at once', () => {   
        let cache = stack ({type:'FIFO'}); 

        cache.push ( [3,55,77])
        expect ( cache.pull() ).to.be.equal (3)
        expect ( cache.pull() ).to.be.equal (55)
}) // it push at once



it ( 'Push array', () => {
        let 
              cache = stack ({ type:'FIFO' })
            , arr = [3,55,77]
            , cacheLIFO = stack ({ type: 'LIFO' })
            ;
        
        cache.push ( [arr] )
        expect ( cache.pull() ).to.be.deep.equal ( arr )

        cacheLIFO.push ( [arr] )
        expect ( cacheLIFO.pull() ).to.be.deep.equal ( arr )
}) // it push array



it ( 'Push in FIFO stack with limit. On limit - update', () => {
        let cache = stack ({
                                  type: 'fifo'
                                , limit : 4
                                , onLimit : 'update'
                        });
        cache.push ([50,51,52])
        let extra = cache.push ([60,61,62])   // Push to 'limited stack with update' will return the removed items
        const 
               list = cache.debug ()
             , res = cache.pull()
             ;
        expect ( res ).to.be.equal ( 52 )
        expect ( list ).to.contains ( 62 )
        expect ( extra ).to.be.deep.equal ([50,51])
}) // it Push in FIFO stack with limit. On limit - update



it ( 'Push in FIFO stack with limit. On limit - full', () => {
        let cache = stack ({
                                  type: 'fifo'
                                , limit : 4
                                , onLimit : 'full'
                        });
        cache.push ([50,51,52])
        let extra = cache.push ([60,61,62])   // Push to 'limited stack with full' will ignore items that are over
        const list = cache.debug ();
            
        expect ( list[list.length-1] ).to.be.equal ( 50 )
        expect ( list ).to.not.contains ( 61 )
        expect ( extra ).to.be.undefined
}) // it Push in FIFO stack with limit. On limit - full



it ( 'Push in LIFO stack with limit. On limit - update', () => {
        let cache = stack ({
                                          type    : 'lifo'
                                        , limit   : 4
                                        , onLimit : 'update'
                                });
        cache.push ([50,51,52])
        let extra = cache.push ([60,61,62]);   // Push to 'limited stack with update' will return the removed items
        const 
                list = cache.debug ()
                , res = cache.pull()
                ;
        expect ( res ).to.be.equal ( 62 )
        expect ( list ).to.contains ( 60 )
        expect ( list ).to.not.contains ( 51 )

        expect ( extra ).to.be.deep.equal ([52,51])
}) // it Push in LIFO stack with limit. On limit - update



it ( 'Push in LIFO stack with limit. On limit - full', () => {
        let cache = stack ({
                                          type    : 'lifo'
                                        , limit   : 4
                                        , onLimit : 'full'
                                });
        cache.push ([50,51,52])
        let extra = cache.push ([60,61,62]);   // Push to 'limited stack with update' will return the removed items
        const list = cache.debug ();

        expect ( list ).to.be.deep.equal ([50,51,52,60])
        expect ( extra ).to.be.undefined
}) // it Push in LIFO stack with limit. On limit - full



it ( 'Use GetSize', () => {
        let cache = stack ({ type: 'LIFO' });

        expect ( cache.getSize() ).to.be.equal ( 0 )
        cache.push ( 12 )
        expect ( cache.getSize() ).to.be.equal ( 1 )
}) // it getSize



it ( 'Reset', () => {
        let cache = stack ({ type: 'FIFO' });

        cache.push ([2,64,32,99])
        expect ( cache.getSize() ).to.be.equal ( 4 )
        expect ( cache.reset () ).to.be.true
        expect ( cache.getSize() ).to.be.equal ( 0 )
}) // it reset



it ( 'Two stacks', () => {
        let
              cache1 = stack ({ type: 'LIFO' })
            , cache2 = stack ({ type: 'LIFO' })
            ;

        cache1.push ([21])
        expect ( cache1.getSize() ).to.be.equal ( 1 )
        expect ( cache2.getSize() ).to.be.equal ( 0 )
}) // it two stacks



it ( 'Peek', () => {
        let cache = stack ({ type: 'fifo' })

        cache.push ( [54,33,88])
        expect ( cache.peek() ).to.be.equal ( 54 )
        expect ( cache.getSize() ).to.be.equal ( 3 )
}) // it peek 



it ( 'Peek more', () => {
        let cache = stack ({ type: 'fifo' })

        cache.push ( [54,33,88])
        expect ( cache.peek(2) ).to.be.deep.equal ( [54,33] )
        expect ( cache.getSize() ).to.be.equal ( 3 )
}) // it peek more



it ( 'Peek more in reverse', () => {
        let cache = stack ({ type: 'fifo' })

        cache.push ( [54,33,88])
        expect ( cache.peekReverse(2) ).to.be.deep.equal ( [33,54] )
        expect ( cache.getSize() ).to.be.equal ( 3 )
}) // it peek more in reverse



it ( 'Peek a single value with peekReverse', () => {
        let cache = stack ({ type: 'fifo' })

        cache.push ( [54,33,88])
        expect ( cache.peekReverse() ).to.be.deep.equal ( 54 )
        expect ( cache.getSize() ).to.be.equal ( 3 )
}) // it peek a single value with peekReverse



it ( 'Pull from empty stack', () => {
        let cache = stack ({ type: 'fifo' });

        cache.push ( 12 )
        expect ( cache.pull() ).to.be.equal ( 12 )
        expect ( cache.pull() ).to.be.equal ( undefined )
        expect ( cache.pull() ).to.be.equal ( undefined )
}) // it pull from empty



it ( 'Pull multiple values from lifo stack', () => {
        let cache = stack ({ type: 'lifo' });

        cache.push ( [54,33,88] )
        cache.push ( 13 )
        expect ( cache.pull(2) ).to.be.deep.equal ( [13,88])
}) // it pull multiple values



it ( 'Pull-reverse multiple values from lifo stack', () => {
        let cache = stack ({ type: 'lifo' });

        cache.push ( [54,33,88] )
        cache.push ( 13 )
        expect ( cache.pullReverse(2) ).to.be.deep.equal ( [88,13])
}) // it pull multiple values



it ( 'Pull multiple values from fifo stack', () => {
        const cache = stack ({ type: 'fifo' });

        cache.push ( [54,33,88] )
        cache.push ( 13 )
        expect ( cache.pull(2)).to.be.deep.equal ( [ 54,33] )
})



it ( 'Pull-reverse multiple values from fifo stack', () => {
        const cache = stack ({ type: 'fifo' });

        cache.push ( [54,33,88] )
        cache.push ( 13 )
        expect ( cache.pullReverse(2)).to.be.deep.equal ( [ 33,54] )
}) // it Pull-reverse multiple values from fifo stack



it ( 'Pull-reverse a single value from fifo stack', () => {
        const cache = stack ({ type: 'fifo' });

        cache.push ( [54,33,88] )
        cache.push ( 13 )
        expect ( cache.pullReverse()).to.be.deep.equal ( 54 )
}) // it Pull-reverse a single value from fifo stack



it ( 'Pull with skiping', () => {
        const st = stack ({ type:'FIFO' })
        st.push ([1,2])
        st.push ([3,4,5,6])
        const result =  st.pull( 2, 2 );
        expect ( result ).to.be.deep.equal ([ 3, 4])
}) // it pull with skiping



it ( 'Pull with skiping', () => {
        const st = stack ({ type:'FIFO' })
        st.push ([1,2])
        st.push ([3,4,5,6])
        const result =  st.pull( 5, 3 );  // We are searching for 5 elements after skipping the first 3
        expect ( result ).to.be.deep.equal ([ 4, 5, 6 ]) // The stack has only 3 elements left
}) // it pull with skiping



it ( 'Peek with skiping', () => {
        const st = stack ({ type:'FIFO' })
        st.push ([1,2])
        st.push ([3,4,5,6])
        const result =  st.peek( 2, 2 );
        expect ( result ).to.be.deep.equal ([ 3, 4])
}) // it Peek with skiping



it ( 'Back and forword', () => {
        // Walk in history records - back and forword
        const
               back = stack ({ type:'LIFO' })
             , forward = stack ({ type:'LIFO' })
             ;

        back.push ([1,2,3,4,5]) // Init history
        expect ( back.peek()).to.be.equal ( 5 ) // First available record to pull
        forward.push ( back.pull(2) ) // Move back 2 records
        forward.push ( back.pull(2) ) // Move back 2 records
        const position = forward.pull () // Get state 4 steps back
        expect ( position ).to.be.equal ( 2 )
        expect ( forward.peek() ).to.be.equal ( 3 )    // Next to take from forword
        expect ( forward.getSize() ).to.be.equal ( 3 ) // There are 3 records in forword        
        expect ( back.getSize() ).to.be.equal ( 1 )    // There is 1 record in back
}) // it back and forword

}) // describe