import socket
import json
import genJSON
import genPathJSON

print("We're in tcp server..."); 
#select a server port 
server_port = 12000 
#create a welcoming socket 
welcome_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
#bind the server to the localhost at port server_port
welcome_socket.bind(('0.0.0.0',server_port)) 
welcome_socket.listen(1) 
#ready message 
print('Server running on port ', server_port) 
#Now the main server loop 

# path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/instability_command/components/'
path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/'

while True: 
    connection_socket, caddr = welcome_socket.accept() 
    #notice recv and send instead of recvto and sendto 
    cmsg = connection_socket.recv(1024) 
    cmsg = cmsg.decode()

    print('cmsg:  ', cmsg)
     
    if cmsg != "":
        if cmsg[0] != '{':
            if cmsg[0] == 'd':
                debugmsg = cmsg[1:len(cmsg)]
                print('DEBUG: ', debugmsg) 
            elif cmsg[0] == 'l':
                live_msg = cmsg[1:len(cmsg)]
                print('Live coords: ', live_msg)

                path_dict = json.loads(live_msg)

                print(path_dict)
                print(path_dict['position'])
                # MAKE SURE TO UPDATE THE PATH!!!!!!!!! 
                with open(path+'data/pathNode.json', 'w') as json_file:
                    json.dump(path_dict, json_file, indent = 4, sort_keys=True)
                
                genPathJSON.genPath()

            else:
                print("unknown message type: ", cmsg)
        else:
            strJSON = cmsg
            print('strJSON:  ',strJSON)

            obj_dict = json.loads(strJSON)

            for obj in obj_dict:
                print(obj)
                print('id: ', obj_dict[obj]['id'])
                print(obj_dict[obj]['position'])
                # MAKE SURE TO UPDATE THE PATH!!!!!!!!! 
                with open(path+'data/'+obj+'.json', 'w') as json_file:
                    json.dump(obj_dict[obj], json_file, indent = 4, sort_keys=True)
                    
            genJSON.genJSON()
    else:
        print('ERROR: cmsg is empty/none')

    # connection_socket.send(obj_dict['node02']) # assuming first is currentPos,second is nextPos