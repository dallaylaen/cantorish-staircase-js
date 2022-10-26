'use strict';

const { expect } = require( 'chai' );
const   refute   = require( 'refutable' );
const { Ladder } = require( '../lib/ladder.js' );

describe( 'Ladder', () => {
    const kantor2 = [[1,1], [1,0], [1,1], [3,0], [1,1], [1,0], [1,1]];

    it( 'can read & write', done => {
        const lad = new Ladder;
        lad.add(kantor2);
        console.log( lad );
        expect( lad.fetch() ).to.deep.equal( kantor2 );

        expect( lad.width() ).to.equal(9);
        expect( lad.height() ).to.equal(4);

        done();
    });

    it( 'can produce graph', done => {
        const lad = new Ladder;
        lad.add(kantor2);
        const graph = lad.graph(100, 100);

        console.log( "grahp is", graph, "graph ^^");

        expect( graph.length ).to.equal(100);

        for (let i of Array(3)) {
            lad.add([[lad.width(), 1], ...lad.fetch()]);
        };

        refute( r => {
            r.ordered( 'graph is an ascending list of numbers', graph, (r, a, b) => {
                r.cmpNum(0, '<=', a);
                r.cmpNum(a, '<=', b);
                r.cmpNum(b, '<=', 100);
            });
        });

        done();
    });
});
