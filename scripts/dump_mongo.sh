echo "Dump Mongo"
rm -rf dump
mongodump -d meteor -h 127.0.0.1 --port 3001 -o "dump"
