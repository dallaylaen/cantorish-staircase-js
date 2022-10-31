'use strict';

const { expect } = require( 'chai' );

const { Staircase } = require( '../lib/ladder.js' );

describe( 'Staircase.scale', () => {
    it( 'produces sensible output', done => {
        const lad = new Staircase();
        lad.add([[1,1], [1,0], [2,1]]);
        
        expect( lad.scale( 100, 50 ) ).to.deep.equal([
            [0,  50, 25, 25],
            [25, 25, 50, 25],
            [50, 25, 100, 0]
        ]);

        done();
    });
});

