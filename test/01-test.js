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



// -- Regression: peek(1, skip) used to ignore 'skip' and return the unskipped
//    next value. It now matches the behavior of the n>1 branch and of pull().



it ( 'Peek single value honors skip (FIFO)', () => {
        const st = stack ({ type: 'FIFO' });
        st.push ([1,2,3,4,5,6]);
        // next-to-pull is 1; skip 3 then peek -> 4
        expect ( st.peek (1, 3) ).to.be.equal ( 4 );
        // peek does not extract; size is preserved
        expect ( st.getSize() ).to.be.equal ( 6 );
        // next-to-pull is still 1
        expect ( st.pull() ).to.be.equal ( 1 );
}) // it peek single honors skip fifo



it ( 'Peek single value honors skip (LIFO)', () => {
        const st = stack ({ type: 'LIFO' });
        st.push ([1,2,3,4,5,6]);
        // LIFO next-to-pull is 6; skip 3 then peek -> 3
        expect ( st.peek (1, 3) ).to.be.equal ( 3 );
        expect ( st.getSize() ).to.be.equal ( 6 );
        expect ( st.pull() ).to.be.equal ( 6 );
}) // it peek single honors skip lifo



it ( 'Peek single value with skip 0 is unchanged', () => {
        const st = stack ({ type: 'FIFO' });
        st.push ([10,20,30]);
        expect ( st.peek (1, 0) ).to.be.equal ( 10 );
        expect ( st.peek (1)    ).to.be.equal ( 10 );
}) // it peek single with skip 0



it ( 'Peek single value with skip larger than the stack returns undefined', () => {
        const st = stack ({ type: 'FIFO' });
        st.push ([1,2,3]);
        expect ( st.peek (1, 10) ).to.be.equal ( undefined );
        expect ( st.getSize() ).to.be.equal ( 3 );
}) // it peek single skip larger than stack



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



// -- Regression: single (non-array) value pushed into a limited stack -------------
// Previously these calls threw `TypeError: vals.slice is not a function` because
// the onLimit:'full' branch tried to slice the raw value.



it ( 'FIFO single-value push at limit boundary (onLimit: full) does not throw', () => {
        const cache = stack ({ type: 'FIFO', limit: 4, onLimit: 'full' });
        cache.push ([50,51,52]);   // storage = [52,51,50], isFull = false
        // size = 1 + 3 = 4 = limit. Pre-fix: this threw.
        const extra = cache.push (99);
        expect ( extra ).to.be.undefined
        expect ( cache.getSize() ).to.be.equal ( 3 )
        expect ( cache.debug() ).to.be.deep.equal ([52,51,50])
}) // it fifo single-value push at limit boundary full



it ( 'LIFO single-value push at limit boundary (onLimit: full) does not throw', () => {
        const cache = stack ({ type: 'LIFO', limit: 4, onLimit: 'full' });
        cache.push ([50,51,52]);   // storage = [50,51,52]
        const extra = cache.push (99);
        expect ( extra ).to.be.undefined
        expect ( cache.getSize() ).to.be.equal ( 3 )
        expect ( cache.debug() ).to.be.deep.equal ([50,51,52])
}) // it lifo single-value push at limit boundary full



it ( 'FIFO single-value push at limit boundary (onLimit: update) accepts the value', () => {
        const cache = stack ({ type: 'FIFO', limit: 4, onLimit: 'update' });
        cache.push ([50,51,52]);
        const extra = cache.push (99);   // size = 1 + 3 = 4 = limit → no eviction needed
        expect ( extra ).to.be.deep.equal ([])
        expect ( cache.getSize() ).to.be.equal ( 4 )
        expect ( cache.debug() ).to.contains ( 99 )
}) // it fifo single-value push at limit boundary update



it ( 'LIFO single-value push at limit boundary (onLimit: update) accepts the value', () => {
        const cache = stack ({ type: 'LIFO', limit: 4, onLimit: 'update' });
        cache.push ([50,51,52]);
        const extra = cache.push (99);
        expect ( extra ).to.be.deep.equal ([])
        expect ( cache.getSize() ).to.be.equal ( 4 )
        expect ( cache.debug() ).to.contains ( 99 )
}) // it lifo single-value push at limit boundary update



it ( 'FIFO single-value push overflowing the limit (onLimit: update) evicts the oldest', () => {
        const cache = stack ({ type: 'FIFO', limit: 3, onLimit: 'update' });
        cache.push (1);
        cache.push (2);
        cache.push (3);             // full at limit
        const extra = cache.push (4);   // size = 1 + 3 = 4 > 3 → evict 1 item (returns scalar, not array)
        expect ( extra ).to.be.equal ( 1 )
        expect ( cache.getSize() ).to.be.equal ( 3 )
        expect ( cache.pull() ).to.be.equal ( 2 )
        expect ( cache.pull() ).to.be.equal ( 3 )
        expect ( cache.pull() ).to.be.equal ( 4 )
}) // it fifo single-value push overflowing update



it ( 'LIFO single-value push overflowing the limit (onLimit: update) evicts the LIFO top', () => {
        // LIFO+update drops the most-recently-pushed item to make room for the
        // incoming one (the next-out item is the one sacrificed). The returned
        // scalar is the single evicted value, not a one-element array.
        const cache = stack ({ type: 'LIFO', limit: 3, onLimit: 'update' });
        cache.push (1);
        cache.push (2);
        cache.push (3);
        const extra = cache.push (4);   // size = 1 + 3 = 4 > 3 → evict 1 item from the LIFO top
        expect ( extra ).to.be.equal ( 3 )
        expect ( cache.getSize() ).to.be.equal ( 3 )
        expect ( cache.pull() ).to.be.equal ( 4 )
        expect ( cache.pull() ).to.be.equal ( 2 )
        expect ( cache.pull() ).to.be.equal ( 1 )
}) // it lifo single-value push overflowing update

}) // describe