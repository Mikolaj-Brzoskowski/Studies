from classes import Manual, Adress, Office, Trader, Register

worker_1 = Manual('jonh', 'queen', 33, 3, Adress('pomorska', 1, 2, 'gdansk'), 70)
worker_2 = Office('jonh', 'king', 32, 4, Adress('koscielna', 1, 2, 'gdynia'), 90)
worker_3 = Trader('jonh', 'jack', 32, 3, Adress('miodowa', 1, 2, 'sopot'), 23, 'NISKA')
worker_4 = Trader('jonh', 'ace', 33, 3, Adress('czerwona', 1, 2, 'gdynia'), 23, 'NISKA')     
register = Register()
register.add_worker(worker_1,
                    worker_2,
                    worker_3,
                    worker_4)            
# register.print_sorted()
#print(register.print_city('gdynia'))
#print(register.print_value())