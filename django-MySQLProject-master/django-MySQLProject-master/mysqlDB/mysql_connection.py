import mysql.connector
import os

db = mysql.connector.connect(
    host="localhost", 
    user= os.getenv("DB_USERNAME"),
    passwd= os.getenv("DB_PASS"),
    auth_plugin="mysql_native_password",
    db="logincredentials"
    )

mycursor = db.cursor()

# mycursor.execute("CREATE TABLE Credentials (email VARCHAR(50), password VARCHAR(50), personID int PRIMARY KEY AUTO_INCREMENT)")
# mycursor.execute("INSERT INTO Credentials (email,password) VALUES (%s,%s)", ("oiadf@ljsf.com", "o823wuei"))
# db.commit()

# mycursor.execute("SELECT password FROM Credentials where email = 'oiadf@ljsf.com'")

# for x in mycursor:
#     print(x)

