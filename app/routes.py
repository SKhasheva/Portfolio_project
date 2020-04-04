from app import app
from flask import json, request, redirect, send_from_directory, session
import pyodbc

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
        return redirect('http://127.0.0.1:5000/index.html')
    else:
        return redirect('http://127.0.0.1:5000/loginError.html')
##################################adding id to session####################################
@app.route('/username/', methods=['GET'])
def username():
    return session['username']

##################################adding id to session####################################
@app.route('/logout/', methods=['GET'])
def logout():
    session.clear()
    return redirect('http://127.0.0.1:5000/login.html')




