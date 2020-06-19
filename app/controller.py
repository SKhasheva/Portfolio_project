from app import model
from datetime import date

#############################################################login process##############################################
def controller_get_login(username, pas):
    id, password, name = model.model_get_login(username)
    if name and password.strip() == pas:
        return name, id
    else:
        return False, 0

#############################################################signup process#############################################
def controller_signup(name, username, pas):
    id_, password_, name_ = model.model_get_login(username)
    if (id_):
        return False
    else:
        id = model.model_getmaxid() + 1
        model.model_signup(id, name, username, pas)

    return id

###########################################getting shares list with prices##############################################
# get list of shares with prices from Moscow Exchange (https://www.moex.com/en/)
# ticker - ticker of share
# name - Latin name of the share
# price - last price for yesterday
def controller_sharespricelist():
    shareslist = []
    sharelist_tmp = model.model_sharespricelist()
    for child in sharelist_tmp[0][0]:
        shareslist.append({"ticker": child.attrib['SECID'],
                           "name": child.attrib['LATNAME'],
                           "price":child.attrib['PREVADMITTEDQUOTE']})

    return shareslist

##################################################getting current portfolio#############################################
# return detailed portfolio data as:
# ticker - ticker of share
# cost - previous cost of shares
# cnt - number of shares
def controller_portfolio(user_id):
    portfolio_tmp = model.model_portfolio(user_id)
    portfoliodetails = []
    for row in portfolio_tmp:
        portfoliodetails.append(({"ticker": row.ticker.strip(),
                           "cnt": row.cnt}))

    return portfoliodetails

##################################returning cdetailed portfolio data####################################################
def controller_curpotfolio(user_id):
    sharelist = controller_sharespricelist()
    myportfolio = controller_portfolio(user_id)
    currentportfolio = []
    for element in myportfolio:
        for active in sharelist:
            if element["ticker"] == active["ticker"]:
                element.update({"price": active["price"]})
                element.update({"curcost": int(element["cnt"])*float(active["price"])})
                currentportfolio.append(element)

    return currentportfolio

##################################calculate current cost of portfolio###################################################
def controller_currentportfoliocost(user_id):
    myportfolio = controller_curpotfolio(user_id)
    totalprice = 0.0
    for element in myportfolio:
        totalprice += float(element["cnt"]) * float(element["price"])

    return totalprice

##################################returning data  for chart#############################################################
def controller_chartdata(user_id):
    maxdate = model.model_lastdate(user_id)
    totalprice = controller_currentportfoliocost(user_id)
    data_temp = model.model_chartdata(user_id)
    data = []

    for row in data_temp:
        if row.date == maxdate:
            data.append({"date": row.date,
                    "invested": row.Invested,
                    "portfolioCost": totalprice})
        else:
            data.append({"date": row.date,
                    "invested": row.Invested,
                    "portfolioCost": row.PortfolioCost})

    return data

################################################update data in db#######################################################
def controller_dataupdate(data, user_id):
    params_detailed = []
    today = date.today().isoformat()
    investednow = 0
    currportfoliocost = controller_currentportfoliocost(user_id)
    id = model.model_lastid()
    lastupdate = model.model_lastdate(user_id)

    # preparing data for insert / update
    for row in data:
        if 'ticker' in row:
            id += 1
            params_detailed.append((id, today, user_id, row['ticker'], row['price'], row['cnt']))
            investednow += int(row['cnt']) * float(row['price'])

    if (lastupdate):
        invested = model.model_totalinvested(user_id, lastupdate) + investednow
        portfoliocost = investednow + currportfoliocost
    else:
        #if no prev data exists => insert invested money
        lastupdate = '15000101'
        invested = investednow
        portfoliocost = investednow

    # insert/update data
    model.model_dataupdate(params_detailed, user_id, lastupdate, today, portfoliocost, invested)

    return






