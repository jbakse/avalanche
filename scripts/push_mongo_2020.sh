echo "Push Mongo 2020"

mongorestore \
    --host "ds261238.mlab.com":"61238" \
    --db "heroku_3hqb4xsl" \
    --username "heroku_3hqb4xsl" \
    --password "hqslmo088vhvsn0tdmhd5chscg" \
    "dump"/"meteor" --drop > /dev/null


