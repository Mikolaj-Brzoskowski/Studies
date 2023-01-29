import sysv_ipc
import os
import time

in_queue_key = 420
out_queue_key = 666
s='czerwony'
mq = sysv_ipc.MessageQueue(in_queue_key)
pid = os.getpid()
mq.send(s.encode(),True,pid)
mq2 = sysv_ipc.MessageQueue(out_queue_key)
while True:
    try:
        message, client_PID = mq2.receive(False, type=pid)
        print(message.decode())
        break
    except:
        print("Brak wiadomości")
    time.sleep(5)
    
    
    