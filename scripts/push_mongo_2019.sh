echo "Push Mongo 2019"

mongorestore \
    --host "ds153304.mlab.com":"53304" \
    --db "heroku_2cvzdxnq" \
    --username "heroku_2cvzdxnq" \
    --password "9efv0qr3tld0ifa0jtbfp49tjp" \
    "dump"/"meteor" --drop > /dev/null


