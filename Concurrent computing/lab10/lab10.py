import multiprocessing as mp
import time
import math
import queue

l=10000000
r=20000000
proccess_count = 20
ranges = []
mlp = []
pierwsze = mp.Queue(r)

def pierwsza(k):
 for i in range (2,k-1):
   if i*i>k:
     return True
   if k%i == 0:
     return False
 return True

def pierwsza1(k, mlp):
 for p in mlp:
   if k%p == 0:
     return False
   if p*p>k:
     return True
 return True

def second_step(rag, mlp):
  for i in range(int(rag[0]),int(rag[1]+1)):
    if pierwsza1(int(i),mlp):
      pierwsze.put(int(i))
  
def licz(l,r):
    s = math.ceil(math.sqrt(r))
    for i in range (2,s+1):
        if pierwsza(i):
            mlp.append(i)
    args = [(ranges[i], mlp) for i in range(proccess_count)]
    pool = mp.Pool(proccess_count)
    results = pool.starmap(second_step, args) 
    pool.close()
    pierwsze_from_queue = []
    while not pierwsze.empty():
      pierwsze_from_queue.append(pierwsze.get())
    pierwsze_from_queue.sort()
    print(pierwsze_from_queue)

if __name__ == '__main__':
  for i in range(1,proccess_count+1):
      ranges.append([l + (((r - l) / proccess_count) * (i-1)) ,l + (((r - l) / proccess_count) * i)])
  start = time.time()
  licz(l,r)
  print(time.time()-start)
