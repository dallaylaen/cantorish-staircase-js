'use strict';

const { expect } = require( 'chai' );
const   refute   = require( 'refutable' );

const { Staircase } = require( '../lib/ladder.js' );

describe( 'Staircase.compose', () => {
    it( 'produces a new object', done => {
        const cantor1 = new Staircase().add([[1,1], [1,0], [1,1]]);
        const cantor2 = cantor1.compose(cantor1);

        expect( cantor2.fetch() ).to.deep.equal(
            [[1,1], [1,0], [1,1], [3,0], [1,1], [1,0], [1,1]]
        );

        done();
    });

    it( 'does not confuse in & out', done => {
        const outer = new Staircase().add([[1,1], [1,2], [1,1]]);
        const inner = new Staircase().add([[1,2], [1,1], [1,2]]);

        expect( outer.compose(inner).fetch() ).to.deep.equal(
            [2, 1, 2, 4, 2, 4, 2, 1, 2].map( x => [1,x] )
        );

        done();
    });

    // TODO handle trivial cases
});
