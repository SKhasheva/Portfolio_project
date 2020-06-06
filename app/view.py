from app import app, controller
from flask import json, request, redirect, send_from_directory, session, render_template, Response, jsonify
#import json


########################################################################################################################
url = 'http://127.0.0.1:5000'

########################################################################################################################
@app.route('/')
def controller_index():
    #print('sveta', flush=True)
    return app.send_static_file('login.html')

#####################################login process######################################################################
@app.route('/login/', methods=['POST'])
def get_login():
    #if User Name exists in data base and password is correct for that user
    #add User Name and User Id to session
    #and redirect to index page in case
    #else redirect to loginError page
    username = request.form.get('username')
    pas = request.form.get('password')
    name, id = controller.controller_get_login(username, pas)
    if name:
        session['username'] = name
        session['user_id'] = id
        return redirect(url+'/home')
    else:
        return redirect(url + '/loginError.html')

###################################################application page#####################################################
@app.route("/home")
def my_index():
    return render_template("index.html", flask_token="Hello   world")

##################################return User Name from session#########################################################
@app.route('/username/', methods=['GET'])
def username():
    return session['username']

##################################logout process########################################################################
@app.route('/logout/', methods=['GET'])
def logout():
    session.clear()
    return redirect(url+'/login.html')

##################################returning data  for chart#############################################################
#return data for chart as:
#date - date of purchase
#invested - ammount of invested money
#portfolioCost - cost of portfolio, calculated according to shares prices
#last data point of portfolioCost is calculated with respect to current prices of shares
@app.route('/chart/', methods=['GET'])
def chartdata():
    user_id = session['user_id']
    data = controller.controller_chartdata(user_id)
    return jsonify(data)

##################################returning cdetailed portfolio data####################################################
# return detailed portfolio data as:
# ticker - ticker of share
# cnt - number of shares
# price - current price of share (taken from API)
# curcost - cost of shares in Portfolio (count * current price)
@app.route("/portfolio_details")
def curpotfolio():
    user_id = session['user_id']
    currentportfolio = controller.controller_curpotfolio(user_id)
    return jsonify(currentportfolio)

##################################returning shares list with prices#####################################################
# get list of shares with prices from Moscow Exchange (https://www.moex.com/en/)
# ticker - ticker of share
# name - Latin name of the share
# price - last price for yesterday
@app.route("/shareslist")
def getshareslist():
    sharelist = controller.controller_sharespricelist()
    return jsonify(sharelist)

################################################update data in db#######################################################
@app.route('/dataupdate/', methods=['POST'])
def get_dataupdate():
    data = request.get_json()
    user_id = session['user_id']
    controller.controller_dataupdate(data, user_id)
    return '', 200














