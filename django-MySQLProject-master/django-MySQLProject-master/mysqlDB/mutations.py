from . import mysql_connection as mc

cs = mc.mycursor

def createEntry(email, passwd):
    cs.execute("INSERT INTO Credentials (email,password) VALUES (%s,%s)",
               (email,passwd))
    mc.db.commit()
