from mysql.connector.connection_cext import CMySQLConnection
from . import mysql_connection as mc

cs = mc.mycursor

def validate_pass(email, passwd):
    cs.execute("SELECT password FROM Credentials where email = {}".format(email))
    for x in cs:
        global querypass
        querypass = x[0]
    if passwd == querypass:
        return True
    else:
        return False