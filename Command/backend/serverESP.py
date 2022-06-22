import socket
import json
import genJSON
import genPathJSON
import genAlienJSON
import genStatusJSON
import genObstacleJSON

print("We're in tcp server..."); 
#select a server port 
server_port = 12000

#create a welcoming socket 
welcome_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
#bind the server to the localhost at port server_port
welcome_socket.bind(('0.0.0.0',server_port)) 
welcome_socket.listen(1) 
#ready message 
print('TCP Server running on port ', server_port) 
#Now the main server loop 

# path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/instability_command/components/'
path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/'
# path = '~/ubuntu/Rover/Instability/Command' #to be checked

while True: 

    connection_socket, caddr = welcome_socket.accept() 
    #notice recv and send instead of recvto and sendto 
    cmsg = connection_socket.recv(1024) 
    cmsg = cmsg.decode()

    print('cmsg:  ', cmsg)
    
    if cmsg != "":
        if cmsg[0] != '{':
            # DEBUG ---------------------------------------------------------------------------
            if cmsg[0] == 'd':
                debugmsg = cmsg[1:len(cmsg)]
                print('DEBUG: ', debugmsg) 

            # LIVE COORDS & STATUS ------------------------------------------------------------
            elif cmsg[0] == 'l':
                live_msg = cmsg[1:len(cmsg)]
                print('Live msg: ', live_msg)
                
                if '|' in live_msg:
                    split_msg = live_msg.split('|')
                    # print("     live coords: ", split_msg[0])
                    print("     live status: ", split_msg[1])

                    path_dict = json.loads(split_msg[0])
                    status_dict = json.loads(split_msg[1])
                    
                    with open(path+'data/pathNode.json', 'w') as json_file:
                        cm_position = {"position":{ "x":float(path_dict['position']['x']/47.0*4), 
                                                    "y":float(path_dict['position']['y']/47.0*4)}}
                        json.dump(cm_position, json_file, indent = 4, sort_keys=True)
                    
                    with open(path+'data/status.json', 'w') as json_file:
                        json.dump(status_dict, json_file, indent = 4, sort_keys=True)
                    
                    genPathJSON.genPath()
                    genStatusJSON.genStatus()
                else:
                    # print(path_dict)
                    # print(path_dict['position'])
                    path_dict = json.loads(live_msg)
                    with open(path+'data/pathNode.json', 'w') as json_file:
                        cm_position = {"position":{ "x":float(path_dict['position']['x']/47.0*4), 
                                                    "y":float(path_dict['position']['y']/47.0*4)}}
                        json.dump(cm_position, json_file, indent = 4, sort_keys=True)

            # ALIEN NODE ------------------------------------------------------------------
            elif cmsg[0] == 'a':
                live_msg = cmsg[1:len(cmsg)]
                print('Alien coords: ', live_msg)

                path_dict = json.loads(live_msg)

                # print(path_dict)
                # print(path_dict['position'])
                
                # MAKE SURE TO UPDATE THE PATH!!!!!!!!! 
                with open(path+'data/alien.json', 'w') as json_file:
                    cm_position = {"position":{ "x":float(path_dict['position']['x']/47.0*4), 
                                                "y":float(path_dict['position']['y']/47.0*4)}}
                    json.dump(cm_position, json_file, indent = 4, sort_keys=True)
                
                genAlienJSON.genAlienJSON()

            # OBSTACLE NODE ------------------------------------------------------------------
            elif cmsg[0] == 'o':
                live_msg = cmsg[1:len(cmsg)]
                print('Obstacle coords: ', live_msg)

                path_dict = json.loads(live_msg)

                # print(path_dict)
                # print(path_dict['position'])
                
                with open(path+'data/obstacle.json', 'w') as json_file:
                    cm_position = {"position":{ "x":float(path_dict['position']['x']/47.0*4), 
                                                "y":float(path_dict['position']['y']/47.0*4)}}
                    json.dump(cm_position, json_file, indent = 4, sort_keys=True)
                
                genObstacleJSON.genObstacleJSON()


            else:
                print("unknown message type: ", cmsg)
        
        # POSITION COORD NODE --------------------------------------------------------------------
        else:
            strJSON = cmsg
            print('strJSON:  ',strJSON)

            obj_dict = json.loads(strJSON)

            for obj in obj_dict:
                print(obj)
                # print('id: ', obj_dict[obj]['id'])
                print(obj_dict[obj]['position'])
            
                with open(path+'data/'+obj+'.json', 'w') as json_file:
                    # ALL DATA SCALED UP BY a factor of 4 and converted in cm !!!!!!!!!!!!!!!!!!!!!!!!
                    cm_position = {"position":{ "x":float(obj_dict[obj]['position']['x']/47.0*4), 
                                                "y":float(obj_dict[obj]['position']['y']/47.0*4)}}
                    json.dump(cm_position, json_file, indent = 4, sort_keys=True)
                    
            genJSON.genJSON()
    else:
        print('ERROR: cmsg is empty/none')

# connection_socket.send("testing 1", c1add) # assuming first is currentPos,second is nextPos