const
  stack  = require ('../src/index.js')
, expect  = require ( 'chai' ).expect
;

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
    let cache = stack ('FiLo');   // Param should not be case sesitive
        
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
        let cache = stack ('FIFO'); 

        cache.push ( [3,55,77])
        expect ( cache.pull() ).to.be.equal (3)
        expect ( cache.pull() ).to.be.equal (55)
}) // it push at once


it ( 'Push array', () => {
        let 
              cache = stack ( 'FIFO' )
            , arr = [3,55,77]
            , cacheFILO = stack ( 'FILO' )
            ;
        
        cache.push ( [arr] )
        expect ( cache.pull() ).to.be.deep.equal ( arr )

        cacheFILO.push ( [arr] )
        expect ( cacheFILO.pull() ).to.be.deep.equal ( arr )
}) // it push array



it ( 'Use GetSize', () => {
        let cache = stack ( 'FILO' );

        expect ( cache.getSize() ).to.be.equal ( 0 )
        cache.push ( 12 )
        expect ( cache.getSize() ).to.be.equal ( 1 )
}) // it getSize


it ( 'Reset', () => {
        let cache = stack ('FIFO' );

        cache.push ([2,64,32,99])
        expect ( cache.getSize() ).to.be.equal ( 4 )
        expect ( cache.reset () ).to.be.true
        expect ( cache.getSize() ).to.be.equal ( 0 )
}) // it reset


it ( 'Two stacks', () => {
        let
              cache1 = stack ( 'FIFO' )
            , cache2 = stack ( 'FIFO' )
            ;

        cache1.push ([21])
        expect ( cache1.getSize() ).to.be.equal ( 1 )
        expect ( cache2.getSize() ).to.be.equal ( 0 )
}) // it two stacks


it ( 'Peek', () => {
        let cache = stack ( 'fifo')

        cache.push ( [54,33,88])
        expect ( cache.peek() ).to.be.equal ( 54 )
        expect ( cache.getSize() ).to.be.equal ( 3 )
}) // it peek 



it ( 'Pull from empty stack', () => {
        let cache = stack ( 'fifo' );

        cache.push ( 12 )
        expect ( cache.pull() ).to.be.equal ( 12 )
        expect ( cache.pull() ).to.be.equal ( undefined )
        expect ( cache.pull() ).to.be.equal ( undefined )
}) // it pull from empty


}) // describe