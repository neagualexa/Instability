import socket
import json
print("We're in tcp client..."); 
#the server name and port client wishes to access 
server_name = '192.168.137.123'
server_port = 80 
path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/'

#create a TCP client socket 
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
#Set up a TCP connection with the server 
#connection_socket will be assigned to this client on the server side 

client_socket.connect((server_name, server_port)) 

# TREAD 2
old_moveto =  {"position":{ "x":0, 
                            "y":0 }}

moveto_dict = json.load( open(path+'data/moveto.json', 'r'))
print(moveto_dict)

while old_moveto == moveto_dict:
    moveto_dict = json.load( open(path+'data/moveto.json', 'r'))

    rover_scale_moveto = {"position":{  "x":float(moveto_dict['position']['x']*47.0/4), 
                                        "y":float(moveto_dict['position']['y']*47.0/4)}}

    if moveto_dict != old_moveto:
        msg = str(rover_scale_moveto)
        #send the message to the TCP server 
        client_socket.send(msg.encode())
        old_moveto = moveto_dict

        #return values from the server 
        b_msg = client_socket.recv(1024) 
        print("reply: ", b_msg.decode())

# msg = rover_scale_moveto; 
# #send the message to the TCP server 
# client_socket.send(msg.encode())
end = "END transmission"
client_socket.send(end.encode())


# #return values from the server 
msg = client_socket.recv(1024) 
print("reply: ", msg.decode())
client_socket.close() 
