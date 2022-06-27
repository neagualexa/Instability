#! /bin/bash


# node ./server/webserver_https.js 

python ./backend/serverESP.py &
python ./backend/clientJoystickESP.py &

# cd ./instability_command
# expo start:web  &