(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

        const transform = (x1, y1, x2, y2) =>
            [x1 * w, height - y1 * h, x2 * w, height - y2 * h];

        const boxes = this._boxes;
        const ret = Array(boxes.length - 1);
        for (let i = 0; i < boxes.length - 1; i++)
            ret[i] = transform( ...boxes[i], ...boxes[i + 1] );

        return ret;
    }
}

module.exports = { Staircase };

},{}],2:[function(require,module,exports){
'use strict';

const { Staircase } = require( './ladder.js' );
window.Staircase = Staircase;

},{"./ladder.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbS1wYWNrYWdlcy9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9sYWRkZXIuanMiLCJsaWIvd2ViLWluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIndXNlIHN0cmljdCc7XG5cbi8qXG4gKiBEYXRhIG1vZGVsOlxuICogW1sxLCAxXSwgWzEsIDBdLCBbMSwgMV1dXG4gKiB0cmFuc2xhdGVzIGludG9cbiAqXG4gKiAgMiAgICAgICAgICArLS0tK1xuICogICAgICAgICAgICAgfCAgIHxcbiAqICAxICArLS0tKy0tLSstLS0rXG4gKiAgICAgfCAgIHxcbiAqICAwICArLS0tK1xuICogICAgIDAgICAxICAgMiAgIDNcbiAqICBBcyBudW1iZXIgb2YgXCJjZWxsc1wiIGdyb3dzLCB0aGUgYmFycyBiZWNvbWUgdGhpbm5lciBhbmQgdGhpbm5lclxuICogIGFuZCBhcHByb2FjaCBhIGN1cnZlIHdoaWNoIGlzIGNvbnRpbnVvdXMgYW5kIGZsYXQgYWxtb3N0IGV2ZXJ5d2hlcmUuXG4gKi9cblxuY2xhc3MgU3RhaXJjYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHRoaXMuX2JveGVzID0gW1swLCAwXV07IC8vIHN0b3JlIFswLDBdIGFzIC0xc3QgZWxlbSBmb3IgY29udmVuaWVuY2VcbiAgICAgICAgdGhpcy5fbWluID0gMDtcbiAgICAgICAgdGhpcy5fbWF4ID0gMDtcbiAgICB9XG5cbiAgICB3aWR0aCAoKSB7XG4gICAgICAgIGNvbnN0IGJveGVzID0gdGhpcy5fYm94ZXM7XG4gICAgICAgIHJldHVybiBib3hlc1tib3hlcy5sZW5ndGggLSAxXVswXTtcbiAgICB9XG5cbiAgICBoZWlnaHQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4IC0gdGhpcy5fbWluO1xuICAgIH1cblxuICAgIGFkZCAobGlzdCkge1xuICAgICAgICBjb25zdCBib3hlcyA9IHRoaXMuX2JveGVzO1xuICAgICAgICBsZXQgZWRnZSAgPSBib3hlc1tib3hlcy5sZW5ndGggLSAxXVswXTtcbiAgICAgICAgbGV0IGxldmVsID0gYm94ZXNbYm94ZXMubGVuZ3RoIC0gMV1bMV07XG5cbiAgICAgICAgZm9yIChjb25zdCBbZHgsIGR5XSBvZiBsaXN0KSB7XG4gICAgICAgICAgICBlZGdlICArPSBkeDtcbiAgICAgICAgICAgIGxldmVsICs9IGR5O1xuICAgICAgICAgICAgYm94ZXMucHVzaCggW2VkZ2UsIGxldmVsXSApO1xuICAgICAgICAgICAgaWYgKGxldmVsIDwgdGhpcy5fbWluKVxuICAgICAgICAgICAgICAgIHRoaXMuX21pbiA9IGxldmVsO1xuICAgICAgICAgICAgaWYgKGxldmVsID4gdGhpcy5fbWF4KVxuICAgICAgICAgICAgICAgIHRoaXMuX21heCA9IGxldmVsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvbXBvc2UgKGlubmVyKSB7XG4gICAgICAgIGNvbnN0IHJldCA9IG5ldyBTdGFpcmNhc2UoKTtcbiAgICAgICAgY29uc3QgcmVwZWF0ID0gaW5uZXIuZmV0Y2goKTtcbiAgICAgICAgZm9yIChjb25zdCBbd2lkdGgsIGhlaWdodF0gb2YgdGhpcy5mZXRjaCgpKSB7XG4gICAgICAgICAgICBpZiAoaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gZmxhdCBib3gsIGp1c3Qgc2tpcCBpdFxuICAgICAgICAgICAgICAgIHJldC5hZGQoIFtbaW5uZXIud2lkdGgoKSAqIHdpZHRoLCAwXV0gKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHdpZHRoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gZmxhdCBib3ggYnV0IHZlcnRpY2FsLCBqdXN0IHNraXAgaXRcbiAgICAgICAgICAgICAgICByZXQuYWRkKCBbWzAsIGlubmVyLmhlaWdodCgpICogaGVpZ2h0XV0gKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0LmFkZCggcmVwZWF0Lm1hcCggZW50cnkgPT4gW2VudHJ5WzBdICogd2lkdGgsIGVudHJ5WzFdICogaGVpZ2h0XSApICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBmZXRjaCAoKSB7XG4gICAgICAgIGNvbnN0IGJveGVzID0gdGhpcy5fYm94ZXM7XG4gICAgICAgIGlmICghYm94ZXMubGVuZ3RoKSByZXR1cm4gW107XG5cbiAgICAgICAgY29uc3Qgb3V0ID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYm94ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG91dC5wdXNoKFtcbiAgICAgICAgICAgICAgICBib3hlc1tpXVswXSAtIGJveGVzW2kgLSAxXVswXSxcbiAgICAgICAgICAgICAgICBib3hlc1tpXVsxXSAtIGJveGVzW2kgLSAxXVsxXSxcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgZ3JhcGggKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgLy8gVE9ETyBjaGVjayBwYXJhbXM6IHdpZHRoIDogSW50ID4gMSwgaGVpZ2h0ID4gMCwgYW5kIG5vbnplcm8gdGhpcy53aWR0aFxuICAgICAgICBjb25zdCBzdGVwICA9IHRoaXMud2lkdGgoKSAvICh3aWR0aCAtIDEpO1xuICAgICAgICBjb25zdCBtaW4gICA9IHRoaXMuX21pbjtcbiAgICAgICAgY29uc3Qgc2NhbGUgPSBoZWlnaHQgLyB0aGlzLmhlaWdodCgpO1xuXG4gICAgICAgIGNvbnN0IGJveGVzID0gdGhpcy5fYm94ZXM7XG4gICAgICAgIGNvbnN0IG91dCAgID0gQXJyYXkod2lkdGgpO1xuXG4gICAgICAgIGZvciAobGV0IG4gPSAwLCBpID0gMTsgbiA8IHdpZHRoOyBuKysgKSB7XG4gICAgICAgICAgICB3aGlsZSAoIGkgPCBib3hlcy5sZW5ndGggLSAxICYmIGJveGVzW2ldWzBdIDwgbiAqIHN0ZXAgKVxuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGNvbnN0IGxldmVsID0gKGJveGVzW2ldWzFdICsgYm94ZXNbaSAtIDFdWzFdKSAvIDI7XG5cbiAgICAgICAgICAgIG91dFtuXSA9IChsZXZlbCAtIG1pbikgKiBzY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgc2NhbGUgKHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBjb25zdCB3ID0gd2lkdGggLyB0aGlzLndpZHRoKCk7XG4gICAgICAgIGNvbnN0IGggPSBoZWlnaHQgLyB0aGlzLmhlaWdodCgpO1xuXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9ICh4MSwgeTEsIHgyLCB5MikgPT5cbiAgICAgICAgICAgIFt4MSAqIHcsIGhlaWdodCAtIHkxICogaCwgeDIgKiB3LCBoZWlnaHQgLSB5MiAqIGhdO1xuXG4gICAgICAgIGNvbnN0IGJveGVzID0gdGhpcy5fYm94ZXM7XG4gICAgICAgIGNvbnN0IHJldCA9IEFycmF5KGJveGVzLmxlbmd0aCAtIDEpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJveGVzLmxlbmd0aCAtIDE7IGkrKylcbiAgICAgICAgICAgIHJldFtpXSA9IHRyYW5zZm9ybSggLi4uYm94ZXNbaV0sIC4uLmJveGVzW2kgKyAxXSApO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgU3RhaXJjYXNlIH07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgU3RhaXJjYXNlIH0gPSByZXF1aXJlKCAnLi9sYWRkZXIuanMnICk7XG53aW5kb3cuU3RhaXJjYXNlID0gU3RhaXJjYXNlO1xuIl19
