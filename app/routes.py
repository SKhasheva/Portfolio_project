from app import app
from flask import json, request, redirect, send_from_directory, session, render_template, Response, jsonify
import pyodbc
import json
import urllib3
import xml.etree.ElementTree as ET

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
        return '', 400

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

##################################getting current portfolio####################################
# return detailed portfolio data as:
# ticker - ticker of share
# cost - previous cost of shares
# cnt - number of shares
def portfolio():
    cursorone = conn.cursor()
    cursor = conn.cursor()
    user_id = session['user_id']

    #####get last update date of portfolio
    try:
        maxtime = cursorone.execute("SELECT max(Date) FROM Portfolio.dbo.StatDetails where User_id =?", user_id).fetchone()
    except Exception as err:
        return '', 400

    #get current portfolio using last update date
    try:
        rows = cursor.execute("SELECT ticker, cost, cnt FROM Portfolio.dbo.vw_StatDetails where User_id =? and Date =?",
            user_id, maxtime[0]).fetchall()
    except Exception as err:
        return '', 400

    portfoliodetails = []
    for row in rows:
        portfoliodetails.append(({"ticker": row.ticker.strip(),
                           "cost": row.cost,
                           "cnt": row.cnt}))

    return maxtime[0], portfoliodetails

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

    #calculate the current cost of portfolio: multuply number of shares to their current prices
    sharelist = sharespricelist()
    myportfolio = portfolio()
    totalprice = 0.0

    for element in myportfolio[1]:
        for active in sharelist:
            if element["ticker"] == active["ticker"]:
                totalprice += float(element["cnt"]) * float(active["price"])

    # get the historical data
    try:
        rows = cursor.execute("SELECT date, Invested, PortfolioCost FROM Portfolio.dbo.StatAgregated where User_id =? ORDER BY date ASC", user_id).fetchall()
    except Exception as err:
        return '', 400

    # forming data for chart. The current cost of portfolio was calculated above
    data = []
    for row in rows:
        if row.date == myportfolio[0]:
            data.append({"date": row.date,
                      "invested": row.Invested,
                      "portfolioCost": totalprice})
        else:
            data.append({"date": row.date,
                      "invested": row.Invested,
                      "portfolioCost": row.PortfolioCost})

    str = json.dumps(data)
    print(str, flush=True)
    return jsonify(data)

##################################returning cdetailed portfolio data####################################
# return detailed portfolio data as:
# ticker - ticker of share
# cost - previous cost of shares
# cnt - number of shares
# price - current price of share (taken from API)
# curcost - cost of shares in Portfolio (count * current price)
@app.route("/portfolio_details")
def curpotfolio():

    sharelist = sharespricelist()
    myportfolio = portfolio()

    # adding current price of shares to the output
    currentportfolio = []
    for element in myportfolio[1]:
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










