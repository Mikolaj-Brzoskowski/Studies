# Zadanie 6. (czas: na 24.11.2022) Zaprogramować grę w "kółko i krzyżyk" dla dwóch graczy 
# (plansza - tabela 3x3, wypełniona spacjami, znakami 'X' lub 'O'). 
# Umieścić planszę w pamięci współdzielonej, zapewnić synchronizację dostępu przy użyciu semaforów. 

# Można się wzorować na sposobie synchronizacji dwóch komunikujących się programów  
# kom1.py, kom2.py  ale należy zrobić jeden (uniwersalny) program do użytku obu graczy 
# - wstępną rywalizację o wykonanie pierwszego ruchu (i używanie znaków 'X') wygrywa ten proces,
# który jako pierwszy utworzy któryś z semaforów albo pamięć współdzieloną. W programie wyscig.py 
# jest przykład ilustrujący jak to można zrobić przy użyciu flagi sysv_ipc.IPC_CREX. 
# (Rozwiązanie zrobione nie jako jeden program ale jako dwa będzie niżej ocenione.)

# Program powinien sprawdzać prawidłowość ruchów (wykluczać pola już zajęte i poza planszą),
# rozpoznawać sytuację wygranej, przegranej i remisu oraz  wyświetlać obu graczom odpowiednie komunikaty.

board = " , , , , , , , , ,"

import sysv_ipc
import time

klucz = 55

turn = "pierwszy"

try:
    sem = sysv_ipc.Semaphore(klucz, sysv_ipc.IPC_CREX,0o700,0)
    sem2 = sysv_ipc.Semaphore(klucz+1, sysv_ipc.IPC_CREX,0o700,1)
    mem = sysv_ipc.SharedMemory(klucz, sysv_ipc.IPC_CREX)
    mem2 = sysv_ipc.SharedMemory(klucz+1, sysv_ipc.IPC_CREX)
    mem.write(board.encode())
    mem2.write(turn.encode())
    pierwszy = True
except sysv_ipc.ExistentialError:
    sem = sysv_ipc.Semaphore(klucz)
    sem2 = sysv_ipc.Semaphore(klucz+1)
    mem = sysv_ipc.SharedMemory(klucz)
    pierwszy=False
    time.sleep(0.1)

while True:
    if pierwszy and turn == "pierwszy":
        move_done = False
        while not move_done:
            x = int(input("Współżędne dla X (indeksując od 1, zaczynając od górnego lewego rogu): "))
            x -= 1
            board = mem.read().decode()
            turn = mem2.read().decode()
            board_array = board.split(",")
            if board_array[x] == " ":
                board_array[x] = "X"
                move_done = True
                board = ' '.join(board_array)
            else:
                print("Miejsce zajęte")
        print('Stawiam X')
        turn = "drugi"
        print(board)
        mem.write(board.encode())
        mem2.write(turn.encode())
        time.sleep(5)
    elif not pierwszy and turn == "drugi":
        move_done = False
        while not move_done:
            y = int(input("Współżędne dla X (indeksując od 1, zaczynając od górnego lewego rogu): "))
            y -= 1
            board = mem.read().decode()
            turn = mem2.read().decode()
            board_array = board.split(",")
            if board_array[y] == " ":
                board_array[y] = "Y"
                move_done = True
                board = ' '.join(board_array)
            else:
                print("Miejsce zajęte")
        print('Stawiam X')
        turn = "drugi"
        print(board)
        mem.write(board.encode())
        mem2.write(turn.encode())
        time.sleep(5)
        
#sysv_ipc.remove_shared_memory(mem.id)