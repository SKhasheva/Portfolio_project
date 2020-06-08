import pyodbc
import urllib3
import xml.etree.ElementTree as ET

########################################################################################################################
conn = pyodbc.connect('Driver={SQL Server};Server=SVKHASHE-T470S;Database=Portfolio;Trusted_Connection=yes;')

#####################################login process######################################################################
def model_get_login(username):
    cursor = conn.cursor()
    try:
        row = cursor.execute(
            'SELECT id, password, name FROM Portfolio.dbo.Users where Login = \'' + str(username) + '\'').fetchone()
    except Exception as err:
        return err, 400

    return row.id, row.password, row.name

##################################getting shares list with prices#######################################################
def model_sharespricelist():
    url = 'https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQTF/securities.xml?iss.meta=off&iss.only=' \
          'securities&securities.columns=SECID,LATNAME,PREVADMITTEDQUOTE'
    http = urllib3.PoolManager()
    r = http.request('GET', url)

    return ET.fromstring(r.data)

##################################getting last update date##############################################################
def model_lastdate(user_id):
    cursorone = conn.cursor()
    try:
        maxtime = cursorone.execute("SELECT max(Date) FROM Portfolio.dbo.StatAgregated where User_id =?", user_id).\
            fetchone()
    except Exception as err:
        return err, 400

    return maxtime[0]

##################################getting current portfolio#############################################################
def model_portfolio(user_id):
    cursor = conn.cursor()
    try:
        rows = cursor.execute("SELECT ticker, cnt FROM Portfolio.dbo.vw_StatDetails where User_id =?",
                              user_id).fetchall()
    except Exception as err:
        return err, 400

    return rows

##################################returning data  for chart#############################################################
def model_chartdata(user_id):
    cursor = conn.cursor()
    try:
        rows = cursor.execute("SELECT date, Invested, PortfolioCost FROM Portfolio.dbo.StatAgregated where User_id =?"
                              " ORDER BY date ASC", user_id).fetchall()
    except Exception as err:
        return err, 400

    return rows

###################################################get last id##########################################################
def model_lastid():
    cursor = conn.cursor()
    try:
        maxid = cursor.execute("SELECT max(id) FROM Portfolio.dbo.StatDetails").fetchone()
    except Exception as err:
        return err, 400

    return maxid[0]

#################################################get ttoal invested sum#################################################
def model_totalinvested(user_id, lastupdate):
    cursor = conn.cursor()
    try:
        investedprev = cursor.execute("SELECT Invested FROM Portfolio.dbo.StatAgregated where User_id =? and Date =?",
                                      user_id, lastupdate).fetchone()
    except Exception as err:
        return err, 400

    return float(investedprev[0])

################################################update data in db#######################################################
def model_dataupdate(params_detailed, user_id, lastupdate, today, portfoliocost, invested):
    try:
        conn.autocommit = False
        cursor = conn.cursor()
        cursor.executemany(
            "insert into [Portfolio].[dbo].[StatDetails](Id, Date, User_id, Ticker, Price, Cnt) "
            "values (?, ?, ?, ?, ?, ?)", params_detailed)
        if lastupdate == today:
            #if there was update today => update
            cursor.execute(
                "update Portfolio.dbo.StatAgregated set PortfolioCost=?, Invested=? where user_id=? and date=?",
                portfoliocost, invested, user_id, today)
        else:
            # if there wasn't update today => insert
            cursor.execute("insert into [Portfolio].[dbo].[StatAgregated](date, User_id, Invested, PortfolioCost)"
                            "values (?, ?, ?, ?)", (today, user_id, invested, portfoliocost))
    except pyodbc.DatabaseError as err:
        print(err)
        conn.rollback()
    else:
        print('data updated')
        conn.commit()
    finally:
        conn.autocommit = True

    return






