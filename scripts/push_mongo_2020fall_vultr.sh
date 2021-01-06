echo "Push Mongo 2020fall vultr"

mongorestore \
    --host "144.202.20.152":"27017" \
    --db "compform2020fall" \
    --username "compform" \
    --password "mlab_recovery1" \
    "dump"/"heroku_1cn0pzsc" --drop > /dev/null





# mongorestore \
#     --host "144.202.20.152":"27017" \
#     --db "compform2019" \
#     --username "compform" \
#     --password "mlab_recovery1" \
#     "dump"/"heroku_2cvzdxnq" --drop > /dev/null

# mongorestore \
#     --host "144.202.20.152":"27017" \
#     --db "compform2018" \
#     --username "compform" \
#     --password "mlab_recovery1" \
#     "dump"/"heroku_xl5hp74g" --drop > /dev/null

# mongorestore \
#     --host "144.202.20.152":"27017" \
#     --db "compform2017" \
#     --username "compform" \
#     --password "mlab_recovery1" \
#     "dump"/"heroku_smprgdtf" --drop > /dev/null