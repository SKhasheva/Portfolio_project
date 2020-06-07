
import urllib3


import xml.etree.ElementTree as ET

import pyodbc

#url = 'https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQTF/securities.xml?iss.meta=off&iss.only=securities&securities.columns=SECID,PREVADMITTEDQUOTE'

#http = urllib3.PoolManager()
#r = http.request('GET', url)

#print(r.data)
#root = ET.fromstring(r.data)
#print(root)

#for child in root:
#    print(child.tag, child.attrib)

#for child in root[0][0]:
#    print(child.attrib['SECID'],child.attrib['PREVADMITTEDQUOTE'])

conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=SVKHASHE-T470S;'
                      'Database=Portfolio;'
                      'Trusted_Connection=yes;')



cursorone = conn.cursor()
cursor = conn.cursor()
user_id = session['user_id']
#####get max date of portfolio
try:
    maxtime = cursorone.execute("SELECT max(Date) FROM Portfolio.dbo.StatDetails where User_id =?", user_id).fetchone()
except Exception as err:
        return '', 400

print(maxtime)



