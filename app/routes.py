from app import app
from flask import json, request, redirect, send_from_directory, session, render_template
import pyodbc
import json

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

    if row and row.password.strip() == pas:
        session['username'] = row.name
        session['user_id'] = row.id
        return redirect('http://127.0.0.1:5000/arik')
    else:
        return redirect('http://127.0.0.1:5000/loginError.html')
##################################adding id to session####################################
@app.route('/username/', methods=['GET'])
def username():
    return session['username']

##################################logout############################################
@app.route('/logout/', methods=['GET'])
def logout():
    session.clear()
    return redirect('http://127.0.0.1:5000/login.html')
##################################adding id to session####################################


##################################getting data  for chart####################################
@app.route('/chart/', methods=['GET'])
def chartdata():
    cursor = conn.cursor()
    user_id = session['user_id']
    try:
        rows = cursor.execute("SELECT date, Invested, PortfolioCost FROM Portfolio.dbo.StatAgregated where User_id =? ORDER BY date ASC", user_id).fetchall()
    except Exception as err:
        return '', 400
    stats = []
    for row in rows:
        stats.append({"date": row.date,
                      "invested": row.Invested,
                      "portfolioCost": row.PortfolioCost})


    return json.dumps(stats)

##################################getting shares list with prices####################################
def sharespricelist():
    url = 'https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQTF/securities.xml?iss.meta=off&iss.only=securities&securities.columns=SECID,SECNAME,PREVADMITTEDQUOTE'
    http = urllib3.PoolManager()
    r = http.request('GET', url)
    root = ET.fromstring(r.data)

    shareslist = []

    for child in root[0][0]:
        shareslist.append({"ticker": child.attrib['SECID'],
                           "name": child.attrib['SECNAME'],
                           "price":child.attrib['PREVADMITTEDQUOTE']})

    return shareslist

    #print(child.attrib['SECID'],child.attrib['PREVADMITTEDQUOTE'])

##################################getting data  for chart####################################
@app.route('/chart/', methods=['GET'])
def cha():
    cursor = conn.cursor()
    user_id = session['user_id']
    try:
        rows = cursor.execute("SELECT date, Invested, PortfolioCost FROM Portfolio.dbo.StatAgregated where User_id =? ORDER BY date ASC", user_id).fetchall()
    except Exception as err:
        return '', 400
    stats = []
    for row in rows:
        stats.append({"date": row.date,
                      "invested": row.Invested,
                      "portfolioCost": row.PortfolioCost})


    return json.dumps(stats)

##################################getting shares list with prices####################################
@app.route("/arik")
def my_index():
    return render_template("index.html", flask_token="Hello   world")










