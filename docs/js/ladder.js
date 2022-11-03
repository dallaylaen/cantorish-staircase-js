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
        this._nonempty = 0;
    }

    width () {
        const boxes = this._boxes;
        return boxes[boxes.length - 1][0];
    }

    height () {
        return this._max - this._min;
    }

    growthFactor () {
        return this._nonempty;
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
            if (dx !== 0 && dy !== 0)
                this._nonempty++;
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
            ret = ret.map( x => [x[0], height - x[1], x[2], height - x[3]] );
        if (options.round)
            ret = ret.map( x => x.map( val => Math.round(val) ) );
        return ret;
    }
}

module.exports = { Staircase };

},{}],2:[function(require,module,exports){
'use strict';

const { Staircase } = require( './ladder.js' );
window.Staircase = Staircase;

},{"./ladder.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbS1wYWNrYWdlcy9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9sYWRkZXIuanMiLCJsaWIvd2ViLWluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIid1c2Ugc3RyaWN0JztcblxuLypcbiAqIERhdGEgbW9kZWw6XG4gKiBbWzEsIDFdLCBbMSwgMF0sIFsxLCAxXV1cbiAqIHRyYW5zbGF0ZXMgaW50b1xuICpcbiAqICAyICAgICAgICAgICstLS0rXG4gKiAgICAgICAgICAgICB8ICAgfFxuICogIDEgICstLS0rLS0tKy0tLStcbiAqICAgICB8ICAgfFxuICogIDAgICstLS0rXG4gKiAgICAgMCAgIDEgICAyICAgM1xuICogIEFzIG51bWJlciBvZiBcImNlbGxzXCIgZ3Jvd3MsIHRoZSBiYXJzIGJlY29tZSB0aGlubmVyIGFuZCB0aGlubmVyXG4gKiAgYW5kIGFwcHJvYWNoIGEgY3VydmUgd2hpY2ggaXMgY29udGludW91cyBhbmQgZmxhdCBhbG1vc3QgZXZlcnl3aGVyZS5cbiAqL1xuXG5jbGFzcyBTdGFpcmNhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy5fYm94ZXMgPSBbWzAsIDBdXTsgLy8gc3RvcmUgWzAsMF0gYXMgLTFzdCBlbGVtIGZvciBjb252ZW5pZW5jZVxuICAgICAgICB0aGlzLl9taW4gPSAwO1xuICAgICAgICB0aGlzLl9tYXggPSAwO1xuICAgICAgICB0aGlzLl9ub25lbXB0eSA9IDA7XG4gICAgfVxuXG4gICAgd2lkdGggKCkge1xuICAgICAgICBjb25zdCBib3hlcyA9IHRoaXMuX2JveGVzO1xuICAgICAgICByZXR1cm4gYm94ZXNbYm94ZXMubGVuZ3RoIC0gMV1bMF07XG4gICAgfVxuXG4gICAgaGVpZ2h0ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heCAtIHRoaXMuX21pbjtcbiAgICB9XG5cbiAgICBncm93dGhGYWN0b3IgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbm9uZW1wdHk7XG4gICAgfVxuXG4gICAgYWRkIChsaXN0KSB7XG4gICAgICAgIGNvbnN0IGJveGVzID0gdGhpcy5fYm94ZXM7XG4gICAgICAgIGxldCBlZGdlICA9IGJveGVzW2JveGVzLmxlbmd0aCAtIDFdWzBdO1xuICAgICAgICBsZXQgbGV2ZWwgPSBib3hlc1tib3hlcy5sZW5ndGggLSAxXVsxXTtcblxuICAgICAgICBmb3IgKGNvbnN0IFtkeCwgZHldIG9mIGxpc3QpIHtcbiAgICAgICAgICAgIGVkZ2UgICs9IGR4O1xuICAgICAgICAgICAgbGV2ZWwgKz0gZHk7XG4gICAgICAgICAgICBib3hlcy5wdXNoKCBbZWRnZSwgbGV2ZWxdICk7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPCB0aGlzLl9taW4pXG4gICAgICAgICAgICAgICAgdGhpcy5fbWluID0gbGV2ZWw7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPiB0aGlzLl9tYXgpXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4ID0gbGV2ZWw7XG4gICAgICAgICAgICBpZiAoZHggIT09IDAgJiYgZHkgIT09IDApXG4gICAgICAgICAgICAgICAgdGhpcy5fbm9uZW1wdHkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb21wb3NlIChpbm5lcikge1xuICAgICAgICBjb25zdCByZXQgPSBuZXcgU3RhaXJjYXNlKCk7XG4gICAgICAgIGNvbnN0IHJlcGVhdCA9IGlubmVyLmZldGNoKCk7XG4gICAgICAgIGZvciAoY29uc3QgW3dpZHRoLCBoZWlnaHRdIG9mIHRoaXMuZmV0Y2goKSkge1xuICAgICAgICAgICAgaWYgKGhlaWdodCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIGZsYXQgYm94LCBqdXN0IHNraXAgaXRcbiAgICAgICAgICAgICAgICByZXQuYWRkKCBbW2lubmVyLndpZHRoKCkgKiB3aWR0aCwgMF1dIClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh3aWR0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIGZsYXQgYm94IGJ1dCB2ZXJ0aWNhbCwganVzdCBza2lwIGl0XG4gICAgICAgICAgICAgICAgcmV0LmFkZCggW1swLCBpbm5lci5oZWlnaHQoKSAqIGhlaWdodF1dIClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldC5hZGQoIHJlcGVhdC5tYXAoIGVudHJ5ID0+IFtlbnRyeVswXSAqIHdpZHRoLCBlbnRyeVsxXSAqIGhlaWdodF0gKSApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgZmV0Y2ggKCkge1xuICAgICAgICBjb25zdCBib3hlcyA9IHRoaXMuX2JveGVzO1xuICAgICAgICBpZiAoIWJveGVzLmxlbmd0aCkgcmV0dXJuIFtdO1xuXG4gICAgICAgIGNvbnN0IG91dCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGJveGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBvdXQucHVzaChbXG4gICAgICAgICAgICAgICAgYm94ZXNbaV1bMF0gLSBib3hlc1tpIC0gMV1bMF0sXG4gICAgICAgICAgICAgICAgYm94ZXNbaV1bMV0gLSBib3hlc1tpIC0gMV1bMV0sXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIGdyYXBoICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIC8vIFRPRE8gY2hlY2sgcGFyYW1zOiB3aWR0aCA6IEludCA+IDEsIGhlaWdodCA+IDAsIGFuZCBub256ZXJvIHRoaXMud2lkdGhcbiAgICAgICAgY29uc3Qgc3RlcCAgPSB0aGlzLndpZHRoKCkgLyAod2lkdGggLSAxKTtcbiAgICAgICAgY29uc3QgbWluICAgPSB0aGlzLl9taW47XG4gICAgICAgIGNvbnN0IHNjYWxlID0gaGVpZ2h0IC8gdGhpcy5oZWlnaHQoKTtcblxuICAgICAgICBjb25zdCBib3hlcyA9IHRoaXMuX2JveGVzO1xuICAgICAgICBjb25zdCBvdXQgICA9IEFycmF5KHdpZHRoKTtcblxuICAgICAgICBmb3IgKGxldCBuID0gMCwgaSA9IDE7IG4gPCB3aWR0aDsgbisrICkge1xuICAgICAgICAgICAgd2hpbGUgKCBpIDwgYm94ZXMubGVuZ3RoIC0gMSAmJiBib3hlc1tpXVswXSA8IG4gKiBzdGVwIClcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBjb25zdCBsZXZlbCA9IChib3hlc1tpXVsxXSArIGJveGVzW2kgLSAxXVsxXSkgLyAyO1xuXG4gICAgICAgICAgICBvdXRbbl0gPSAobGV2ZWwgLSBtaW4pICogc2NhbGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHNjYWxlICh3aWR0aCwgaGVpZ2h0LCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3QgdyA9IHdpZHRoIC8gdGhpcy53aWR0aCgpO1xuICAgICAgICBjb25zdCBoID0gaGVpZ2h0IC8gdGhpcy5oZWlnaHQoKTtcblxuICAgICAgICBjb25zdCBib3hlcyA9IHRoaXMuX2JveGVzO1xuICAgICAgICBsZXQgICByZXQgPSBBcnJheShib3hlcy5sZW5ndGggLSAxKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib3hlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIHJldFtpXSA9IFtcbiAgICAgICAgICAgICAgICBib3hlc1tpXVswXSAqIHcsXG4gICAgICAgICAgICAgICAgYm94ZXNbaV1bMV0gKiBoLFxuICAgICAgICAgICAgICAgIGJveGVzW2kgKyAxXVswXSAqIHcsXG4gICAgICAgICAgICAgICAgYm94ZXNbaSArIDFdWzFdICogaFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5mbGlwKVxuICAgICAgICAgICAgcmV0ID0gcmV0Lm1hcCggeCA9PiBbeFswXSwgaGVpZ2h0IC0geFsxXSwgeFsyXSwgaGVpZ2h0IC0geFszXV0gKTtcbiAgICAgICAgaWYgKG9wdGlvbnMucm91bmQpXG4gICAgICAgICAgICByZXQgPSByZXQubWFwKCB4ID0+IHgubWFwKCB2YWwgPT4gTWF0aC5yb3VuZCh2YWwpICkgKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBTdGFpcmNhc2UgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgeyBTdGFpcmNhc2UgfSA9IHJlcXVpcmUoICcuL2xhZGRlci5qcycgKTtcbndpbmRvdy5TdGFpcmNhc2UgPSBTdGFpcmNhc2U7XG4iXX0=
