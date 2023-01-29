import sysv_ipc

klucz = 55

sem1 = sysv_ipc.Semaphore(klucz)
sem2 = sysv_ipc.Semaphore(klucz+1)
mem = sysv_ipc.SharedMemory(klucz)
mem2 = sysv_ipc.SharedMemory(klucz+1)

sysv_ipc.remove_shared_memory(mem.id)
sysv_ipc.remove_shared_memory(mem2.id)
sysv_ipc.remove_semaphore(sem1.id)
sysv_ipc.remove_semaphore(sem2.id)