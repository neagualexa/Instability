import socket
import json
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
while True: 
    connection_socket, caddr = welcome_socket.accept() 
    #notice recv and send instead of recvto and sendto 
    cmsg = connection_socket.recv(1024) 
    cmsg = cmsg.decode()

    print(cmsg) 

    # obj_dict = json.load(cmsg)
    # split_dict = cmsg.split(",")

    # for obj in split_dict:
    #     print(obj)
    #     print(obj['id'])

    # connection_socket.send(split_dict[0]) # assuming first is currentPos,second is nextPos