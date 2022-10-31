'use strict';

/*
 * Data model:
 * [[1, 1], [1, 0], [1, 1]]
 * translates into
 *
 *  2          +---+
 *             |   |
 *  1  +---+---+---+
 *     |   |
 *  0  +---+
 *     0   1   2   3
 *  As number of "cells" grows, the bars become thinner and thinner
 *  and approach a curve which is continuous and flat almost everywhere.
 */

class Staircase {
    constructor () {
        this._boxes = [[0, 0]]; // store [0,0] as -1st elem for convenience
        this._min = 0;
        this._max = 0;
    }

    width () {
        const boxes = this._boxes;
        return boxes[boxes.length - 1][0];
    }

    height () {
        return this._max - this._min;
    }

    add (list) {
        const boxes = this._boxes;
        let edge  = boxes[boxes.length - 1][0];
        let level = boxes[boxes.length - 1][1];

        for (const [dx, dy] of list) {
            edge  += dx;
            level += dy;
            boxes.push( [edge, level] );
            if (level < this._min)
                this._min = level;
            if (level > this._max)
                this._max = level;
        }
        return this;
    }

    compose (inner) {
        const ret = new Staircase();
        const repeat = inner.fetch();
        for (const [width, height] of this.fetch()) {
            if (height === 0) {
                // flat box, just skip it
                ret.add( [[inner.width() * width, 0]] )
                continue;
            }
            if (width === 0) {
                // flat box but vertical, just skip it
                ret.add( [[0, inner.height() * height]] )
                continue;
            }
            ret.add( repeat.map( entry => [entry[0] * width, entry[1] * height] ) );
        }
        return ret;
    }

    fetch () {
        const boxes = this._boxes;
        if (!boxes.length) return [];

        const out = [];
        for (let i = 1; i < boxes.length; i++) {
            out.push([
                boxes[i][0] - boxes[i - 1][0],
                boxes[i][1] - boxes[i - 1][1],
            ]);
        }
        return out;
    }

    graph (width, height) {
        // TODO check params: width : Int > 1, height > 0, and nonzero this.width
        const step  = this.width() / (width - 1);
        const min   = this._min;
        const scale = height / this.height();

        const boxes = this._boxes;
        const out   = Array(width);

        for (let n = 0, i = 1; n < width; n++ ) {
            while ( i < boxes.length - 1 && boxes[i][0] < n * step )
                i++;
            const level = (boxes[i][1] + boxes[i - 1][1]) / 2;

            out[n] = (level - min) * scale;
        }

        return out;
    }

    scale (width, height, options = {}) {
        const w = width / this.width();
        const h = height / this.height();

        const boxes = this._boxes;
        let   ret = Array(boxes.length - 1);
        for (let i = 0; i < boxes.length - 1; i++) {
            ret[i] = [
                boxes[i][0] * w,
                boxes[i][1] * h,
                boxes[i + 1][0] * w,
                boxes[i + 1][1] * h
            ];
        }
        if (options.flip)
            ret = ret.map( r => [r[0], height - r[1], r[2], height - r[3]] );
        if (options.round)
            ret = ret.map( r => r.map( x => Math.round(x) ) );
        return ret;
    }
}

module.exports = { Staircase };
