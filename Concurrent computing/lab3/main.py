import multiprocessing as mp

word = "i"
main_counter = 0
files = ["plikA.txt"]

def make_output(file, queue):
    return_value = queue.get()
    files = []
    counter = 0
    for line in open(f"Wspol/lab3/{file}"):
        row = line.split(' ')
        counter += row.count(word)
        if "/input" in line:
            files.append(line[7:16])
    return_value=[counter, files]
    queue.put(return_value)

if __name__ == '__main__':
    queue = mp.Queue()
    while files != []:
        for f in files:
            queue.put([])
            p = mp.Process(target=make_output, args=(f, queue))
            p.start()
            p.join()
            files.remove(f)
            getter = queue.get()
            main_counter += getter[0]
            files = files + getter[1]
    print(main_counter)