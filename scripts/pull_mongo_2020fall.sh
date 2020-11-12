echo "Pull Mongo 2020 Fall"

# rm -rf dump

mongodump \
    --host "ds359868.mlab.com":"59868" \
    --db "heroku_1cn0pzsc" \
    --username "heroku_1cn0pzsc_recovery" \
    --password "mlab_recovery1" \
    --out "dump"

# mv "dump/heroku_3hqb4xsl" "dump/meteor"


