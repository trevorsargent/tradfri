# tradfri

A node project to support controlling tradfri lights via udp strings. 

Send a UDP string to port 9000 with the format "DIM COLOR TIME" where
  - DIM (dimmer) is a value between 1 and 100 (integer)
  - COLOR is a hex code color WITHOUT the # (example ff00ff for magenta)
  - TIME is a integer numnber of seconds.
 
 
 run the docker image with environment variables for
  - ADDR: the ip address of a Tradfri Gateway (not Dirigera, the old one)
  - CODE: the security code on the back of the gateway
  
  
