import time
import os
import errno

path_to_file="C:/Users/pikus/Documents/Studia/Wspol/lab2/dane.txt"

def read_file():
    with open(path_to_file, "r") as f:
        data = f.readlines()
    return data

def server_program():
    while True:
        while not os.path.exists(path_to_file) or os.stat(path_to_file).st_size == 0:
            time.sleep(1)
        if os.path.isfile(path_to_file):
            string = ""
            with open(path_to_file) as fp:
                for i, line in enumerate(fp):
                    if i == 0:
                        title = line.strip()
                    else:
                        string += str(line.strip() + "\n")
                with open(f"C:/Users/pikus/Documents/Studia/Wspol/lab2/{title}.txt", "a") as client_file:
                    text = input("Wprowadz tekst: ")
                    while text != "esc":
                        string += str(text + "\n")
                        text = input()
                    client_file.write(string)
            os.remove(path_to_file)
            print("Zapisalem wynik do pliku")
        else:
            raise ValueError("%s isn't a file!" % path_to_file)

if __name__ == '__main__':
    server_program()