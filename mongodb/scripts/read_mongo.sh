#!/bin/sh
set -ex
echo "start reading"
mongo mongo:27017/mydb <<EOF
db.mycollection.find().count();
db.mycollection.find({transaction_price: { \$gt: 990}}).forEach( printjson );
EOF
echo "done reading"
