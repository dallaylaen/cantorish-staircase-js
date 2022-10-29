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
}

module.exports = { Staircase };

},{}],2:[function(require,module,exports){
'use strict';

const { Staircase } = require( './ladder.js' );
window.Staircase = Staircase;

},{"./ladder.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbS1wYWNrYWdlcy9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9sYWRkZXIuanMiLCJsaWIvd2ViLWluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIid1c2Ugc3RyaWN0JztcblxuLypcbiAqIERhdGEgbW9kZWw6XG4gKiBbWzEsIDFdLCBbMSwgMF0sIFsxLCAxXV1cbiAqIHRyYW5zbGF0ZXMgaW50b1xuICpcbiAqICAyICAgICAgICAgICstLS0rXG4gKiAgICAgICAgICAgICB8ICAgfFxuICogIDEgICstLS0rLS0tKy0tLStcbiAqICAgICB8ICAgfFxuICogIDAgICstLS0rXG4gKiAgICAgMCAgIDEgICAyICAgM1xuICogIEFzIG51bWJlciBvZiBcImNlbGxzXCIgZ3Jvd3MsIHRoZSBiYXJzIGJlY29tZSB0aGlubmVyIGFuZCB0aGlubmVyXG4gKiAgYW5kIGFwcHJvYWNoIGEgY3VydmUgd2hpY2ggaXMgY29udGludW91cyBhbmQgZmxhdCBhbG1vc3QgZXZlcnl3aGVyZS5cbiAqL1xuXG5jbGFzcyBTdGFpcmNhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy5fYm94ZXMgPSBbWzAsIDBdXTsgLy8gc3RvcmUgWzAsMF0gYXMgLTFzdCBlbGVtIGZvciBjb252ZW5pZW5jZVxuICAgICAgICB0aGlzLl9taW4gPSAwO1xuICAgICAgICB0aGlzLl9tYXggPSAwO1xuICAgIH1cblxuICAgIHdpZHRoICgpIHtcbiAgICAgICAgY29uc3QgYm94ZXMgPSB0aGlzLl9ib3hlcztcbiAgICAgICAgcmV0dXJuIGJveGVzW2JveGVzLmxlbmd0aCAtIDFdWzBdO1xuICAgIH1cblxuICAgIGhlaWdodCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXggLSB0aGlzLl9taW47XG4gICAgfVxuXG4gICAgYWRkIChsaXN0KSB7XG4gICAgICAgIGNvbnN0IGJveGVzID0gdGhpcy5fYm94ZXM7XG4gICAgICAgIGxldCBlZGdlICA9IGJveGVzW2JveGVzLmxlbmd0aCAtIDFdWzBdO1xuICAgICAgICBsZXQgbGV2ZWwgPSBib3hlc1tib3hlcy5sZW5ndGggLSAxXVsxXTtcblxuICAgICAgICBmb3IgKGNvbnN0IFtkeCwgZHldIG9mIGxpc3QpIHtcbiAgICAgICAgICAgIGVkZ2UgICs9IGR4O1xuICAgICAgICAgICAgbGV2ZWwgKz0gZHk7XG4gICAgICAgICAgICBib3hlcy5wdXNoKCBbZWRnZSwgbGV2ZWxdICk7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPCB0aGlzLl9taW4pXG4gICAgICAgICAgICAgICAgdGhpcy5fbWluID0gbGV2ZWw7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPiB0aGlzLl9tYXgpXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4ID0gbGV2ZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29tcG9zZSAoaW5uZXIpIHtcbiAgICAgICAgY29uc3QgcmV0ID0gbmV3IFN0YWlyY2FzZSgpO1xuICAgICAgICBjb25zdCByZXBlYXQgPSBpbm5lci5mZXRjaCgpO1xuICAgICAgICBmb3IgKGNvbnN0IFt3aWR0aCwgaGVpZ2h0XSBvZiB0aGlzLmZldGNoKCkpIHtcbiAgICAgICAgICAgIGlmIChoZWlnaHQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBmbGF0IGJveCwganVzdCBza2lwIGl0XG4gICAgICAgICAgICAgICAgcmV0LmFkZCggW1tpbm5lci53aWR0aCgpICogd2lkdGgsIDBdXSApXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXQuYWRkKCByZXBlYXQubWFwKCBlbnRyeSA9PiBbZW50cnlbMF0gKiB3aWR0aCwgZW50cnlbMV0gKiBoZWlnaHRdICkgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGZldGNoICgpIHtcbiAgICAgICAgY29uc3QgYm94ZXMgPSB0aGlzLl9ib3hlcztcbiAgICAgICAgaWYgKCFib3hlcy5sZW5ndGgpIHJldHVybiBbXTtcblxuICAgICAgICBjb25zdCBvdXQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBib3hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgb3V0LnB1c2goW1xuICAgICAgICAgICAgICAgIGJveGVzW2ldWzBdIC0gYm94ZXNbaSAtIDFdWzBdLFxuICAgICAgICAgICAgICAgIGJveGVzW2ldWzFdIC0gYm94ZXNbaSAtIDFdWzFdLFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBncmFwaCAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICAvLyBUT0RPIGNoZWNrIHBhcmFtczogd2lkdGggOiBJbnQgPiAxLCBoZWlnaHQgPiAwLCBhbmQgbm9uemVybyB0aGlzLndpZHRoXG4gICAgICAgIGNvbnN0IHN0ZXAgID0gdGhpcy53aWR0aCgpIC8gKHdpZHRoIC0gMSk7XG4gICAgICAgIGNvbnN0IG1pbiAgID0gdGhpcy5fbWluO1xuICAgICAgICBjb25zdCBzY2FsZSA9IGhlaWdodCAvIHRoaXMuaGVpZ2h0KCk7XG5cbiAgICAgICAgY29uc3QgYm94ZXMgPSB0aGlzLl9ib3hlcztcbiAgICAgICAgY29uc3Qgb3V0ICAgPSBBcnJheSh3aWR0aCk7XG5cbiAgICAgICAgZm9yIChsZXQgbiA9IDAsIGkgPSAxOyBuIDwgd2lkdGg7IG4rKyApIHtcbiAgICAgICAgICAgIHdoaWxlICggaSA8IGJveGVzLmxlbmd0aCAtIDEgJiYgYm94ZXNbaV1bMF0gPCBuICogc3RlcCApXG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgY29uc3QgbGV2ZWwgPSAoYm94ZXNbaV1bMV0gKyBib3hlc1tpIC0gMV1bMV0pIC8gMjtcblxuICAgICAgICAgICAgb3V0W25dID0gKGxldmVsIC0gbWluKSAqIHNjYWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBTdGFpcmNhc2UgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgeyBTdGFpcmNhc2UgfSA9IHJlcXVpcmUoICcuL2xhZGRlci5qcycgKTtcbndpbmRvdy5TdGFpcmNhc2UgPSBTdGFpcmNhc2U7XG4iXX0=
