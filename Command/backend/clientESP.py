import socket
print("We're in tcp client..."); 
#the server name and port client wishes to access 
server_name = '192.168.137.172'
server_port = 80 


#create a TCP client socket 
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
#Set up a TCP connection with the server 
#connection_socket will be assigned to this client on the server side 

client_socket.connect((server_name, server_port)) 
msg = "testing.... hi"; 
#send the message to the TCP server 
client_socket.send(msg.encode())


#return values from the server 
msg = client_socket.recv(1024) 
print("reply: ", msg.decode())
client_socket.close() 
