echo "Pull Mongo 2019"

# rm -rf dump

mongodump \
    --host "ds153304.mlab.com":"53304" \
    --db "heroku_2cvzdxnq" \
    --username "heroku_2cvzdxnq" \
    --password "9efv0qr3tld0ifa0jtbfp49tjp" \
    --out "dump"

# mv "dump/heroku_3hqb4xsl" "dump/meteor"


