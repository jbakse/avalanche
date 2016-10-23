echo "Dump Mongo"
rm -rf dump
mongodump -h 127.0.0.1 --port 3001 -d meteor
