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
