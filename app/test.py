import pyodbc

import urllib3

from datetime import date


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





def portfolio():
    cursorone = conn.cursor()
    cursor = conn.cursor()
    user_id = 1

    #get current portfolio using last update date
    try:
        rows = cursor.execute("SELECT ticker, cnt FROM Portfolio.dbo.vw_StatDetails where User_id =?",
            user_id).fetchall()
    except Exception as err:
        return err, 400

    portfoliodetails = []
    for row in rows:
        portfoliodetails.append(({"ticker": row.ticker.strip(),
                           "cnt": row.cnt}))

    return portfoliodetails

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

def chartdata():
    cursor = conn.cursor()
    user_id = 1
    maxdate = lastdate()


    #calculate the current cost of portfolio: multuply number of shares to their current prices
    totalprice = currentportfoliocost()

    # get the historical data
    try:
        rows = cursor.execute("SELECT date, Invested, PortfolioCost FROM Portfolio.dbo.StatAgregated where User_id =? ORDER BY date ASC", user_id).fetchall()
    except Exception as err:
        return err, 400

    # forming data for chart. The current cost of portfolio was calculated above
    data = []
    for row in rows:
        if row.date == maxdate:
            data.append({"date": row.date,
                      "invested": row.Invested,
                      "portfolioCost": totalprice})
        else:
            data.append({"date": row.date,
                      "invested": row.Invested,
                      "portfolioCost": row.PortfolioCost})

    #str = json.dumps(data)
   # print(str, flush=True)
    return data
'''
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

# print(curpotfolio())

def currentportfoliocost():
    sharelist = sharespricelist()
    myportfolio = portfolio()
    totalprice = 0.0

    for element in myportfolio:
        for active in sharelist:
            if element["ticker"] == active["ticker"]:
                totalprice += float(element["cnt"]) * float(active["price"])

    return totalprice



def lastdate():
    cursorone = conn.cursor()
    #user_id = session['user_id']
    user_id=1

    #####get last update date of portfolio
    try:
        maxtime = cursorone.execute("SELECT max(Date) FROM Portfolio.dbo.StatAgregated where User_id =?", user_id).fetchone()
    except Exception as err:
        return err, 400
    return maxtime[0]


def get_dataupdate():

    # data = request.get_json()
    data = [{'ticker': 'FXRU', 'price': '875.1', 'cnt': 1}, {'ticker': 'FXUS', 'price': '3780', 'cnt': 1}, {'invested': '4655.10'}]
    # ?????  if (any(data)):
    # user_id = session['user_id']
    user_id = 1

    params_detailed = []
   # params_agr = []
    today = date.today().isoformat()
    investednow = 0
    currportfoliocost = currentportfoliocost()
    print('curr portfolio cost')
    print(currportfoliocost)

    cursorone = conn.cursor()
    cursor = conn.cursor()
    #get the last id form StatDetailed
    try:
        maxid = cursorone.execute("SELECT max(id) FROM Portfolio.dbo.StatDetails where User_id =?",user_id).fetchone()
    except Exception as err:
        return err, 400
    id = maxid[0]

    #preparing data for insert / update
    for row in data:
        if 'ticker' in row:
            id += 1
            params_detailed.append((id, today, user_id, row['ticker'], row['price'], row['cnt']))
            investednow += int(row['cnt'])*float(row['price'])

    print(params_detailed)

    # insert into StatDetails new data
    try:
        conn.autocommit = False
        cursor.executemany(
            "insert into [Portfolio].[dbo].[StatDetails](Id, Date, User_id, Ticker, Price, Cnt) values (?, ?, ?, ?, ?, ?)",
            params_detailed)
    except pyodbc.DatabaseError as err:
        print(err, flush=True)
        conn.rollback()
    else:
        print('incerted to StatDetails', flush=True)
        conn.commit()
    finally:
        conn.autocommit = True


    cursorone = conn.cursor()
    # check the date from StatAgregated
    lastupdate = lastdate()
    ####get last invested sum
    try:
        investedprev = cursorone.execute("SELECT Invested FROM Portfolio.dbo.StatAgregated where User_id =? and Date =?", user_id, lastupdate).fetchone()
    except Exception as err:
        return err, 400

    invested = float(investedprev[0])+investednow
    portfoliocost = investednow+currportfoliocost

    if lastupdate == today:
        #if the date is similar => update
        try:
            conn.autocommit = False
            cursor.execute("update Portfolio.dbo.StatAgregated set PortfolioCost=?, Invested=? where user_id=? and date=?",
                           portfoliocost, invested, user_id, today)
        except pyodbc.DatabaseError as err:
            conn.rollback()
        else:
            conn.commit()
        finally:
            conn.autocommit = True
    else:
        # if the date new => insert
        try:
            conn.autocommit = False
            cursor.execute("insert into [Portfolio].[dbo].[StatAgregated](date, User_id, Invested, PortfolioCost)"
                           "values (?, ?, ?, ?)", (today, user_id, invested, portfoliocost))
        except pyodbc.DatabaseError as err:
            print(err, flush=True)
            conn.rollback()
        else:
            print(2, flush=True)
            conn.commit()
        finally:
            conn.autocommit = True


    return

x = get_dataupdate()


#print(x)




#y = lastdate()

























