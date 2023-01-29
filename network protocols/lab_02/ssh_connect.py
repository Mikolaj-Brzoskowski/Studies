import paramiko as paramiko

host='sigma.ug.edu.pl'
port = 22
username='mbrzoskowski'
password='test'


client=paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.load_system_host_keys()
client.connect(host, port, username, password)

stdin, stdout, stderr = client.exec_command('ls -l')
readedLines=stdout.readlines()
print(readedLines)

