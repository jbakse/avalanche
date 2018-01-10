echo "Push Mongo 2018"

mongorestore \
    --host "ds245337.mlab.com":"45337" \
    --db "heroku_xl5hp74g" \
    --username "heroku_xl5hp74g" \
    --password "sapmrl4udsuch9gqo1sgejv7te" \
    "dump"/"meteor" --drop > /dev/null


