import time
import os

path_to_file="/home/LABPK/mbrzoskowski/mbrzoskowski/Wspol/lab1/dane.txt"

def read_file():
    with open(path_to_file, "r") as f:
        data = f.readlines()
    return data

def server_program():
    while True:
        while not os.path.exists(path_to_file):
            time.sleep(1)
        if os.path.isfile(path_to_file):
            f = open(path_to_file, "r")
            for line in f:
                number = int(line)
                number = number * 3
            f.close()
            os.remove(path_to_file)
            f = open("/home/LABPK/mbrzoskowski/mbrzoskowski/Wspol/lab1/wyniki.txt", "w")
            f.write(str(number))
            f.close()
            print("Zapisalem wynik do pliku")
        else:
            raise ValueError("%s isn't a file!" % path_to_file)
    
if __name__ == '__main__':
    server_program()