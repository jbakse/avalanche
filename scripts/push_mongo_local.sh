echo "Push Mongo Local"

mongorestore \
    --host "127.0.0.1:3001" \
    --db "meteor" \
    "dump"/"meteor" \
    --drop
