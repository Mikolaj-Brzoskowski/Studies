import time
import os
import errno

class FileLockException(Exception):  
    pass  

# tworzenie pliku zamkowego
while True:  
    try:  
        #Open file exclusively  
        fd = os.open("C:/Users/pikus/Documents/Studia/Wspol/lab2/plikZamkowy", os.O_CREAT|os.O_EXCL|os.O_RDWR)  
        break;  
    except OSError as e:  
        if e.errno != errno.EEXIST:  
            raise   
        print("Serwer zajęty! Prosze czekac")
        time.sleep(0.5)  
print("Plik zamkowy utworzony") 

with open("C:/Users/pikus/Documents/Studia/Wspol/lab2/dane.txt", "a") as f:
    string = ""
    file_name = input("Wprowadz nazwe pliku: ")
    string += str(file_name + "\n")
    text = input("Wprowadz tekst: ")
    while text != "esc":
        string += str(text + "\n")
        text = input()
    f.write(string)
while not os.path.exists(f"C:/Users/pikus/Documents/Studia/Wspol/lab2/{file_name}.txt"):
    time.sleep(1)
while os.stat(f"C:/Users/pikus/Documents/Studia/Wspol/lab2/{file_name}.txt" ).st_size == 0:
    time.sleep(1)
os.close(fd) 
os.unlink("plikZamkowy")  
print("Koniec, plik zamkowy zlikwidowany")
f = open(f"C:/Users/pikus/Documents/Studia/Wspol/lab2/{file_name}.txt", "r")
for line in f:
    print(str(line))
f.close()
os.remove(f"C:/Users/pikus/Documents/Studia/Wspol/lab2/{file_name}.txt")