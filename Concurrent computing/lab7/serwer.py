# Zadanie 7. (czas: na 1.12.2022)   

# Utworzyć aplikację typu klient-serwer opartą na komunikacji  przez gniazda datagramowe (UDP) 
# w domenie internetowej . Aplikacja realizuje grę  papier kamień nożyce. Gra toczy się w rundach.
# Każdy gracz  dokonuje wyboru (papier, kamień lub nożyce) i przez swojego klienta wysyła swój wybór 
# do  serwera. Serwer ustala wynik kto wygrał i przesyła klientowi każdego z graczy informację o wyborze drugiego gracza. 

# Dokładniejsza specyfikacja jest następująca. Jest dwóch graczy i serwer. Gracz działa tak, że w
# pętli przesyła swój wybór i czeka na odpowiedź serwera, którą uzyska, gdy drugi gracz też prześle
# do serwera swój wybór. Każdy gracz zlicza swoje punkty z kolejnych rund i wyświetla je w swoim oknie
# po każdej rundzie. Serwer w swoim oknie też wyświetla na bieżąco punkty obu graczy. Gdy któryś gracz 
# chce skończyć grę, przesyła do serwera informację "koniec" jako swój wybór i jego klient przestaje działać.
# Serwer po odebraniu wiadomości "koniec" od któregoś z graczy przekazuje wiadomość "koniec"  drugiemu graczowi
# zamiast zwykłej odpowiedzi na wybór drugiego gracza.  Wtedy klient  tego drugiego gracza też kończy działanie,
# a  serwer zeruje punktację i przechodzi do stanu początkowego, czekając na zgłoszenia nowej pary graczy.

# Serwer i klienci graczy działają lokalnie, czyli na IP 127.0.0.1. Wymieniają komunikaty tekstowe lub liczbowe
# (np. jednoliterowe oznaczenia wyborów graczy). Numer portu serwera jest ustalony i znany graczom.
# Numery portów graczy są automatycznie tworzone w czasie tworzenia ich klientów i zapamiętywane przez serwer,
# który po nich rozróżnia graczy.  Gracze mogą dokonywać wyborów w różnej kolejności, ale w kolejnych rundach numery 
# ich portów są takie same.

import socket

IP     = "127.0.0.1"
port   = 5001
bufSize  = 1024
gracz1 = ""
gracz2 = ""
adress1 = ""
adress2 = ""
score1 = 0
score2 = 0

UDPServerSocket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

UDPServerSocket.bind((IP, port))

print("Serwer UDP odpalony")

def remis():
    message1 = gracz1 + ",remis"
    message2 = gracz2 + ",remis"
    UDPServerSocket.sendto(message2.encode(), adress1)
    UDPServerSocket.sendto(message1.encode(), adress2)
    
def gracz1_win():
    global score1
    message1 = gracz1 + ",przegrywasz"
    message2 = gracz2 + ",wygrywasz"
    score1 += 1
    UDPServerSocket.sendto(message2.encode(), adress1)
    UDPServerSocket.sendto(message1.encode(), adress2)
    
def gracz2_win():
    global score2
    message1 = gracz1 + ",wygrywasz"
    message2 = gracz2 + ",przegrywasz"
    score2 += 1
    UDPServerSocket.sendto(message2.encode(), adress1)
    UDPServerSocket.sendto(message1.encode(), adress2)

while(True):
    mess, address = UDPServerSocket.recvfrom(bufSize)
    if gracz1 == "":
        gracz1 = mess.decode()
        adress1 = address
        
    elif gracz2 == "":
        gracz2 = mess.decode()
        adress2 = address
        
    if gracz1 != "" and gracz2 != "":
        if gracz1 == "koniec":
            UDPServerSocket.sendto("koniec".encode(), adress2)
            score1 = 0
            score2 = 0
        elif gracz2 == "koniec":
            UDPServerSocket.sendto("koniec".encode(), adress1)
            score1 = 0
            score2 = 0
        elif gracz1 == gracz2:
            remis()
        elif gracz1 == "P" and gracz2 == "K":
            gracz1_win()
        elif gracz1 == "P" and gracz2 == "N":
            gracz2_win()
        elif gracz1 == "K" and gracz2 == "N":
            gracz1_win()
        elif gracz1 == "K" and gracz2 == "P":
            gracz2_win()
        elif gracz1 == "N" and gracz2 == "P":
            gracz1_win()
        elif gracz1 == "N" and gracz2 == "K":
            gracz2_win()
        gracz1 = ""
        gracz2 = ""
    