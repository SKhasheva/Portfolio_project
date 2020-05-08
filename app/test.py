import pyodbc

import urllib3


import xml.etree.ElementTree as ET

conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=SVKHASHE-T470S;'
                      'Database=Test_tmp;'
                      'Trusted_Connection=yes;')


'''

print ('aaa')
from flask import Flask, json

companies = [{"id": 1, "name": "Company One"}, {"id": 2, "name": "Company Two"}]

api = Flask(__name__)

@api.route('/companies', methods=['GET'])
def get_companies():
  return json.dumps(companies)

print ('here1')
if __name__ == '__main__':
    print ('here2')
    api.run()
    
'''


def portfolio():
    cursorone = conn.cursor()
    cursor = conn.cursor()
    #user_id = session['user_id']
    #####get max date of portfolio
    user_id = 1
    try:
        maxtime = cursorone.execute("SELECT max(Date) FROM Portfolio.dbo.StatDetails where User_id =?", user_id).fetchone()
    except Exception as err:
        return '', 400

    #get current portfolio
    try:
        rows = cursor.execute("SELECT ticker, cost, cnt FROM Portfolio.dbo.vw_StatDetails where User_id =? and Date =?",
            user_id, maxtime[0]).fetchall()
    except Exception as err:
        return '', 400
    portfolio = []
    for row in rows:
        portfolio.append(({"ticker": row.ticker.strip(),
                           "cost": row.cost,
                           "cnt": row.cnt}))

    return maxtime[0], portfolio






''' 
cursorone = conn.cursor()
cursor = conn.cursor()

#####get max date of portfolio

maxtime = cursorone.execute("SELECT max(Date) FROM Portfolio.dbo.StatDetails where User_id =?", user_id).fetchone()


print(maxtime)
print(maxtime[0])


rows = cursor.execute(
        "SELECT ticker, cost, cnt FROM Portfolio.dbo.vw_StatDetails where User_id =? and Date =?",
        user_id, maxtime[0] ).fetchall()

portfolio = []

for row in rows:
    portfolio.append(({"ticker": row.ticker.strip(),
                      "cost": row.cost,
                      "cnt": row.cnt}))


print(portfolio)
'''


def sharespricelist():
    url = 'https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQTF/securities.xml?iss.meta=off&iss.only=securities&securities.columns=SECID,LATNAME,PREVADMITTEDQUOTE'
    http = urllib3.PoolManager()
    r = http.request('GET', url)
    root = ET.fromstring(r.data)
    shareslist = []

    for child in root[0][0]:
        shareslist.append({"ticker": child.attrib['SECID'],
                           "name": child.attrib['LATNAME'],
                           "price":child.attrib['PREVADMITTEDQUOTE']})

    return shareslist;
#sharelist = sharespricelist();






print()


#for element in sharelist:
#    print(element["ticker"])
''' 
def chartdata():
    cursor = conn.cursor()
    user_id = 1
    sharelist = sharespricelist()
    myportfolio = portfolio()
    totalprice = 0.0

    for element in myportfolio[1]:
        for active in sharelist:
            if element["ticker"] == active["ticker"]:
                totalprice += float(element["cnt"]) * float(active["price"])
                print(totalprice)

    try:
        rows = cursor.execute("SELECT date, Invested, PortfolioCost FROM Portfolio.dbo.StatAgregated where User_id =? ORDER BY date ASC", user_id).fetchall()
    except Exception as err:
        return '', 400
    stats = []
    for row in rows:
        if row.date == myportfolio[0]:
            stats.append({"date": row.date,
                      "invested": row.Invested,
                      "portfolioCost": totalprice})
        else:
            stats.append({"date": row.date,
                      "invested": row.Invested,
                      "portfolioCost": row.PortfolioCost})


    return stats

stats = chartdata()
print(stats)
'''


def curpotfolio():

    sharelist = sharespricelist()
    myportfolio = portfolio()

    currentportfolio = []

    for element in myportfolio[1]:
        for active in sharelist:
            if element["ticker"] == active["ticker"]:
                element.update({"price": active["price"]})
                currentportfolio.append(element)
    return currentportfolio

print(curpotfolio())



















