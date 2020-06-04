from app import app
from flask import json, request, redirect, send_from_directory, session, render_template, Response, jsonify
import pyodbc
import json
import urllib3
import xml.etree.ElementTree as ET
from datetime import date

@app.route('/')
def index():
    #print('sveta', flush=True)
    return app.send_static_file('login.html')

conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=SVKHASHE-T470S;'
                      'Database=Portfolio;'
                      'Trusted_Connection=yes;')

#####################################login process#####################################
@app.route('/login/', methods=['POST'])
def get_login():
    cursor = conn.cursor()
    username = request.form.get('username')
    pas = request.form.get('password')
    try:
        row = cursor.execute('SELECT id, password, name FROM Portfolio.dbo.Users where Login = \'' + str(username)+'\'').fetchone()
    except Exception as err:
        return err, 400

    #if User Name exists in data base and password is correct for that user
    #add User Name and User Id to session
    #and redirect to index page in case
    #else redirect to loginError page
    if row and row.password.strip() == pas:
        session['username'] = row.name
        session['user_id'] = row.id
        return redirect('http://127.0.0.1:5000/home')
    else:
        return redirect('http://127.0.0.1:5000/loginError.html')

##################################return User Name from session####################################
@app.route('/username/', methods=['GET'])
def username():
    return session['username']

##################################logout process############################################
@app.route('/logout/', methods=['GET'])
def logout():
    session.clear()
    return redirect('http://127.0.0.1:5000/login.html')

##################################getting shares list with prices####################################
# get list of shares with prices from Moscow Exchange (https://www.moex.com/en/)
# ticker - ticker of share
# name - Latin name of the share
# price - last price for yesterday
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

    return shareslist

##################################getting last update date####################################
def lastdate():
    cursorone = conn.cursor()
    user_id = session['user_id']

    #####get last update date of portfolio
    try:
        maxtime = cursorone.execute("SELECT max(Date) FROM Portfolio.dbo.StatAgregated where User_id =?", user_id).fetchone()
    except Exception as err:
        return err, 400

    return maxtime[0]

##################################getting current portfolio####################################
# return detailed portfolio data as:
# ticker - ticker of share
# cost - previous cost of shares
# cnt - number of shares
def portfolio():
    cursorone = conn.cursor()
    cursor = conn.cursor()
    user_id = session['user_id']

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

##################################calculate current cost of portfolio####################################
def currentportfoliocost():
    sharelist = sharespricelist()
    myportfolio = portfolio()
    totalprice = 0.0

    for element in myportfolio:
        for active in sharelist:
            if element["ticker"] == active["ticker"]:
                totalprice += float(element["cnt"]) * float(active["price"])

    return totalprice


##################################returning data  for chart####################################
#return data for chart as:
#date - date of purchase
#invested - ammount of invested money
#portfolioCost - cost of portfolio, calculated according to shares prices
#last data point of portfolioCost is calculated with respect to current prices of shares

@app.route('/chart/', methods=['GET'])
def chartdata():
    cursor = conn.cursor()
    user_id = session['user_id']
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
    return jsonify(data)

##################################returning cdetailed portfolio data####################################
# return detailed portfolio data as:
# ticker - ticker of share
# cnt - number of shares
# price - current price of share (taken from API)
# curcost - cost of shares in Portfolio (count * current price)
@app.route("/portfolio_details")
def curpotfolio():

    sharelist = sharespricelist()
    myportfolio = portfolio()

    # adding current price of shares to the output
    currentportfolio = []
    for element in myportfolio:
        for active in sharelist:
            if element["ticker"] == active["ticker"]:
                element.update({"price": active["price"]})
                element.update({"curcost": int(element["cnt"])*float(active["price"])})
                currentportfolio.append(element)


    return jsonify(currentportfolio)

##################################returning shares list with prices####################################
@app.route("/shareslist")
def getshareslist():
    sharelist = sharespricelist()
    return jsonify(sharelist)

##################################getting shares list with prices####################################
@app.route("/home")
def my_index():
    return render_template("index.html", flask_token="Hello   world")

##################################getting shares list with prices####################################
@app.route('/dataupdate/', methods=['POST'])
def get_dataupdate():

    data = request.get_json()
    #data = [{'ticker': 'FXRU', 'price': '875.1', 'cnt': 1}, {'ticker': 'FXUS', 'price': '3780', 'cnt': 1}, {'invested': '4655.10'}]
    # ?????  if (any(data)):
    user_id = session['user_id']
    # user_id = 1

    params_detailed = []
    today = date.today().isoformat()
    investednow = 0
    currportfoliocost = currentportfoliocost()
    print('curr portfolio cost')
    print(currportfoliocost)

    cursorone = conn.cursor()
    cursor = conn.cursor()
    #get the last id form StatDetailed
    try:
        maxid = cursorone.execute("SELECT max(id) FROM Portfolio.dbo.StatDetails").fetchone()
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
    if (lastupdate):
        try:
            investedprev = cursorone.execute("SELECT Invested FROM Portfolio.dbo.StatAgregated where User_id =? and Date =?", user_id, lastupdate).fetchone()
        except Exception as err:
            return err, 400
        invested = float(investedprev[0])+investednow
        portfoliocost = investednow+currportfoliocost
    else:
        lastupdate = '15000101'
        invested = investednow
        portfoliocost = investednow

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


    return 'ok', 200














