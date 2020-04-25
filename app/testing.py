
import urllib3


import xml.etree.ElementTree as ET

url = 'https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQTF/securities.xml?iss.meta=off&iss.only=securities&securities.columns=SECID,PREVADMITTEDQUOTE'



http = urllib3.PoolManager()
r = http.request('GET', url)

print(r.data)
root = ET.fromstring(r.data)

print(root)

for child in root:
    print(child.tag, child.attrib)

for child in root[0][0]:
    print(child.attrib['SECID'],child.attrib['PREVADMITTEDQUOTE'])
