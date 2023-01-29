import pysftp

with pysftp.Connection('sigma.ug.edu.pl', username='mbrzoskowski', password='') as sftp:
        sftp.put('C:\\Users\\mbrzoskowski\\test\\sftp_test_remote2', '/home/mbrzoskowski/Dokumenty/test')