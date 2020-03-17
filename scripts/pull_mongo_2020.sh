echo "Pull Mongo 2020"

rm -rf dump

mongodump \
    --host "ds261238.mlab.com":"61238" \
    --db "heroku_3hqb4xsl" \
    --username "heroku_3hqb4xsl" \
    --password "hqslmo088vhvsn0tdmhd5chscg" \
    --out "dump"

mv "dump/heroku_3hqb4xsl" "dump/meteor"


