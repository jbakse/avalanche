echo "Pull Mongo 2018"

# rm -rf dump

mongodump \
    --host "ds245337.mlab.com":"45337" \
    --db "heroku_xl5hp74g" \
    --username "heroku_xl5hp74g" \
    --password "sapmrl4udsuch9gqo1sgejv7te" \
    --out "dump"

# mv "dump/heroku_xl5hp74g" "dump/meteor"


