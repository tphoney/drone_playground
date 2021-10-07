#!/bin/sh
set -ex
echo "start writing"
mongo mongo:27017/mydb scripts/write.js
echo "done writing"
