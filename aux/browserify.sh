#!/bin/sh

set -eux

SRC=./lib/web-index.js
DST=docs/js
NAME=ladder

mkdir -p "$DST"
browserify "$SRC" -d -o "$DST"/"$NAME".js
browserify "$SRC" -p tinyify -o "$DST"/"$NAME".min.js

