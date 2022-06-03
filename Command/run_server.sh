#! /bin/bash


python3 ./backend/serverESP.py &
node ./server/webserver_https.js &


