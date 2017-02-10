echo "Pull Mongo Local"

rm -rf dump

mongodump \
    --host "127.0.0.1":"3001" \
    --db "meteor" \
    --out "dump"
