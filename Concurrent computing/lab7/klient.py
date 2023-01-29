import socket

serwerAdresPort   = ("127.0.0.1", 5001)
klientAdresPort   = ("127.0.0.1", 5002)
bufSize = 1024
score = 0

UDPClientSocket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

while True:
    wybor = input("Twój wybór (P,K,N, koniec):")
    if wybor == "P" or wybor == "K" or wybor == "N":
        UDPClientSocket.sendto(wybor.encode(), serwerAdresPort)
        odp, address = UDPClientSocket.recvfrom(bufSize)
        if odp.decode() == "koniec":
            print("Drugi gracz zakonczyl gre")
            break
        else:
            msg = odp.decode().split(",")
            if msg[1] == "wygrywasz":
                score += 1
            print(odp.decode())
            print("Score: ", score)
    elif wybor == "koniec":
        UDPClientSocket.sendto(wybor.encode(), serwerAdresPort)
        break
    else:
        print("Zly wybór")


