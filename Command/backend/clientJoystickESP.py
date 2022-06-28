import socket
import json
import time

print("We're in tcp client..."); 
#the server name and port client wishes to access 
server_name = '192.168.0.20'
server_port = 80 
path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/'

#create a TCP client socket 
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
#Set up a TCP connection with the server 
#connection_socket will be assigned to this client on the server side 

client_socket.connect((server_name, server_port)) 

# THREAD 1
joystick_dict = json.load( open(path+'data/joystick.json', 'r'))
# print(joystick_dict)
while True:
    clash = False
    try:
        joystick_dict = json.load( open(path+'data/joystick.json', 'r'))
    except:
        print("ERROR: clash when trying to read joystick json (try/catch)")
        clash = True

    # try:
    #     joystick_dict = json.load( open(path+'data/moveto.json', 'r'))
    # except:
    #     print("ERROR: clash when trying to read moveto json (try/catch)")
    #     clash = True

    if clash == False:
        print(joystick_dict)
        if joystick_dict['direction'] != "-":
            msg = str(joystick_dict['direction'])
            #send the message to the TCP server 
            client_socket.send(msg.encode())

            #return values from the server 
            b_msg = client_socket.recv(1024) 
            print("reply: ", b_msg.decode())
            time.sleep(0.1)

# msg = rover_scale_moveto
# #send the message to the TCP server 
# client_socket.send(msg.encode())
end = "END transmission"
client_socket.send(end.encode())



# #return values from the server 
msg = client_socket.recv(1024) 
print("reply: ", msg.decode())
client_socket.close() 
