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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbS1wYWNrYWdlcy9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9sYWRkZXIuanMiLCJsaWIvd2ViLWluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuICogRGF0YSBtb2RlbDpcbiAqIFtbMSwgMV0sIFsxLCAwXSwgWzEsIDFdXVxuICogdHJhbnNsYXRlcyBpbnRvXG4gKlxuICogIDIgICAgICAgICAgKy0tLStcbiAqICAgICAgICAgICAgIHwgICB8XG4gKiAgMSAgKy0tLSstLS0rLS0tK1xuICogICAgIHwgICB8XG4gKiAgMCAgKy0tLStcbiAqICAgICAwICAgMSAgIDIgICAzXG4gKiAgQXMgbnVtYmVyIG9mIFwiY2VsbHNcIiBncm93cywgdGhlIGJhcnMgYmVjb21lIHRoaW5uZXIgYW5kIHRoaW5uZXJcbiAqICBhbmQgYXBwcm9hY2ggYSBjdXJ2ZSB3aGljaCBpcyBjb250aW51b3VzIGFuZCBmbGF0IGFsbW9zdCBldmVyeXdoZXJlLlxuICovXG5cbmNsYXNzIFN0YWlyY2FzZSB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICB0aGlzLl9ib3hlcyA9IFtbMCwgMF1dOyAvLyBzdG9yZSBbMCwwXSBhcyAtMXN0IGVsZW0gZm9yIGNvbnZlbmllbmNlXG4gICAgICAgIHRoaXMuX21pbiA9IDA7XG4gICAgICAgIHRoaXMuX21heCA9IDA7XG4gICAgfVxuXG4gICAgd2lkdGggKCkge1xuICAgICAgICBjb25zdCBib3hlcyA9IHRoaXMuX2JveGVzO1xuICAgICAgICByZXR1cm4gYm94ZXNbYm94ZXMubGVuZ3RoIC0gMV1bMF07XG4gICAgfVxuXG4gICAgaGVpZ2h0ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heCAtIHRoaXMuX21pbjtcbiAgICB9XG5cbiAgICBhZGQgKGxpc3QpIHtcbiAgICAgICAgY29uc3QgYm94ZXMgPSB0aGlzLl9ib3hlcztcbiAgICAgICAgbGV0IGVkZ2UgID0gYm94ZXNbYm94ZXMubGVuZ3RoIC0gMV1bMF07XG4gICAgICAgIGxldCBsZXZlbCA9IGJveGVzW2JveGVzLmxlbmd0aCAtIDFdWzFdO1xuXG4gICAgICAgIGZvciAoY29uc3QgW2R4LCBkeV0gb2YgbGlzdCkge1xuICAgICAgICAgICAgZWRnZSAgKz0gZHg7XG4gICAgICAgICAgICBsZXZlbCArPSBkeTtcbiAgICAgICAgICAgIGJveGVzLnB1c2goIFtlZGdlLCBsZXZlbF0gKTtcbiAgICAgICAgICAgIGlmIChsZXZlbCA8IHRoaXMuX21pbilcbiAgICAgICAgICAgICAgICB0aGlzLl9taW4gPSBsZXZlbDtcbiAgICAgICAgICAgIGlmIChsZXZlbCA+IHRoaXMuX21heClcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXggPSBsZXZlbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmZXRjaCAoKSB7XG4gICAgICAgIGNvbnN0IGJveGVzID0gdGhpcy5fYm94ZXM7XG4gICAgICAgIGlmICghYm94ZXMubGVuZ3RoKSByZXR1cm4gW107XG5cbiAgICAgICAgY29uc3Qgb3V0ID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYm94ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG91dC5wdXNoKFtcbiAgICAgICAgICAgICAgICBib3hlc1tpXVswXSAtIGJveGVzW2kgLSAxXVswXSxcbiAgICAgICAgICAgICAgICBib3hlc1tpXVsxXSAtIGJveGVzW2kgLSAxXVsxXSxcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgZ3JhcGggKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgLy8gVE9ETyBjaGVjayBwYXJhbXM6IHdpZHRoIDogSW50ID4gMSwgaGVpZ2h0ID4gMCwgYW5kIG5vbnplcm8gdGhpcy53aWR0aFxuICAgICAgICBjb25zdCBzdGVwICA9IHRoaXMud2lkdGgoKSAvICh3aWR0aCAtIDEpO1xuICAgICAgICBjb25zdCBtaW4gICA9IHRoaXMuX21pbjtcbiAgICAgICAgY29uc3Qgc2NhbGUgPSBoZWlnaHQgLyB0aGlzLmhlaWdodCgpO1xuXG4gICAgICAgIGNvbnN0IGJveGVzID0gdGhpcy5fYm94ZXM7XG4gICAgICAgIGNvbnN0IG91dCAgID0gQXJyYXkod2lkdGgpO1xuXG4gICAgICAgIGZvciAobGV0IG4gPSAwLCBpID0gMTsgbiA8IHdpZHRoOyBuKysgKSB7XG4gICAgICAgICAgICB3aGlsZSAoIGkgPCBib3hlcy5sZW5ndGggLSAxICYmIGJveGVzW2ldWzBdIDwgbiAqIHN0ZXAgKVxuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGNvbnN0IGxldmVsID0gKGJveGVzW2ldWzFdICsgYm94ZXNbaSAtIDFdWzFdKSAvIDI7XG5cbiAgICAgICAgICAgIG91dFtuXSA9IChsZXZlbCAtIG1pbikgKiBzY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgU3RhaXJjYXNlIH07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgU3RhaXJjYXNlIH0gPSByZXF1aXJlKCAnLi9sYWRkZXIuanMnICk7XG53aW5kb3cuU3RhaXJjYXNlID0gU3RhaXJjYXNlO1xuIl19
