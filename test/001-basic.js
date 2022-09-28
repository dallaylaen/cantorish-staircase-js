'use strict';

const { expect } = require( 'chai' );
const { Ladder } = require( '../lib/ladder.js' );

describe( 'Ladder', () => {
    const kantor2 = [[1,0], [1,1], [1,1], [3,1], [1,1], [1,1], [1,1]];

    it( 'can read & write', done => {
        const lad = new Ladder;
        lad.add(kantor2);
        console.log( lad );
        expect( lad.fetch() ).to.deep.equal( kantor2 );
        done();
    });

    it( 'can produce graph', done => {
        const lad = new Ladder;
        lad.add(kantor2);
        const graph = lad.graph(100, 100);

        console.log(graph);

        expect( graph.length ).to.equal(100);

        done();
    });
});
