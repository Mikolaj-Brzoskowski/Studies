# Utworzyć program serwera udostępniającego dwie kolejki komunikatów IPC: wejściową i wyjściową,
# oraz program klienta przesyłającego pojedyncze zapytanie z PID-em swojego procesu jako typem komunikatu,
# a następnie odbierającego odpowiedź z drugiej kolejki. (Obie kolejki wspólne dla serwera i wszystkich klientów)

# Serwer realizuje funkcję słownika polsko-angielskiego czyli otrzymuje napis zawierający słowo polskie i
# odsyła odpowiadające mu słowo angielskie lub komunikat "Nie znam takiego słowa". Do testowania wystarczy kilka słów w słowniku. 

# Dodatkowo zapewnić w programie serwera przechwytywanie sygnałów związanych odpowiednio z wylogowaniem i
# wyłączeniem okna ( SIGHUP oraz  SIGTERM), tak, aby mógł działać przez cały czas.
# Zakończenie pracy serwera powinno następować dopiero po przechwyceniu sygnału SIGUSR1.

# UWAGI 

# w Pythonie trzeba zainstalować moduł z kolejkami komunikatów IPC. Są dwie możliwości
# https://semanchuk.com/philip/sysv_ipc/   (wersja preferowana, bo będziemy tego pakietu jeszcze używać. Instalacja: pip sysv_ipc)
# https://pypi.org/project/ipcqueue/  (wersja System V a nie POSIX)
# przyjąć, że numery (klucze) obu kolejek serwera są ustalone i znane klientowi.
# ponieważ są osobne kolejki wejściowa i wyjściowa, serwer może odbierać komunikaty dowolnego typu (parametr typ = 0), a odpowiedzi do klientów mogę iść do wspólnej kolejki bo rozróżni je typ będący  numerem procesu klienta
# w czasie testowania uwzględnić sytuację, w której dwóch klientów umieściło zapytania w kolejce - trzeba wprowadzić opóźnienie w serwerze, żeby uzyskać taką sytuację
# Należy również przetestować obsługę sygnałów wywołanych zamykaniem okna.

import time
import sysv_ipc
import signal, sys

dictionary = {
    "niebieski": "blue",
    "czerwony": "red",
    "szary": "grey",
    "biały": "white",
    "zielony": "green",
    "różowy": "pink",
    "żółty": "yellow",
    "czarny": "black",
    "tęczowy": "pride"
}

def handler(signum, frame):
    print('Obsługa sygnału ', signum)

def handler1(signum, frame):
    print('Inna obsługa sygnału ', signum)
    sys.exit(0)

signal.signal(signal.SIGHUP, handler)
signal.signal(signal.SIGTERM, handler)
signal.signal(signal.SIGUSR1, handler1)

in_queue_key = 420
out_queue_key = 666

in_queue = sysv_ipc.MessageQueue(in_queue_key, sysv_ipc.IPC_CREAT)
out_queue = sysv_ipc.MessageQueue(out_queue_key, sysv_ipc.IPC_CREAT)

while True:
    client_message = None
    client_PID = None
    try:
        message, client_PID = in_queue.receive(False, type=0)
        result = dictionary.get(message.decode(), "Word not found")
        out_queue.send(result.encode(), True, client_PID)
    except:
        print("Brak wiadomości")
    time.sleep(10)
    