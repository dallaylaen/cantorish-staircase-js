'use strict';

class Ladder {
    constructor() {
        this._steps = [];
        this._min = 0;
        this._max = 0;
        this._width = 0;
    }

    // [[1,1], [1,0], [1,1], [3,0], [1,1], [1,0], [1,1]]
    add(list) {
        const s   = this._steps;
        let edge  = this._width;
        let level = (s[s.length-1] || [0,0])[1];
        for( let i of list ) {
            level += i[1];
            if (level < this._min)
                this._min = level;
            if (level > this._max)
                this._max = level;
            s.push( [edge, level] );
            edge  += i[0];
        }
        this._width = edge;
        return this;
    }
    fetch() {
        const s = this._steps;
        if (!s.length) return [];
        const out = []; // shallow copy 1st element
        for (let i = 0; i < s.length; i++)
            // edge:  next || width - this
            // level: this - prev
            out.push([
                (s[i+1] || [ this._width, NaN ])[0] - s[i][0],
                s[i][1] - (s[i-1] || [NaN, 0] )[1],
            ]);
        return out;
    }
    graph(width, height) {
        // TODO check params: width : Int > 1, height > 0, and nonzero this.width
        const step  = this._width / (width-1);
        const min   = this._min;
        const scale = height / (this._max - this._min);

        const s   = this._steps;
        const out = [];
        for (let i = 0, ptr = 0, edge = 0; i < width; i++, edge += step) {
            // search last interval ending beyond us
            while((ptr < s.length-1) && (s[ptr][0] < edge)) {
                console.log('look for edge=', edge, '; ptr=', ptr, '; el=', s[ptr])
                ptr++;
            }
            out[i] = min + scale * s[ptr][1];
        }
        return out;
    }
}

module.exports = { Ladder };
