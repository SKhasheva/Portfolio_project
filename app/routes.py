from app import app
from flask import json
import pyodbc

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

companies = [{"id": 1, "name": "Company One"}, {"id": 2, "name": "Company Two"}]

conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=SVKHASHE-T470S;'
                      'Database=Test_tmp;'
                      'Trusted_Connection=yes;')

cursor = conn.cursor()
cursor.execute('SELECT * FROM Test_tmp.dbo.Table1')

arik = ''
for row in cursor:
    arik += str(row) + "\n"

@app.route('/companies/<id>', methods=['GET'])
def get_xx(id):
  cursor = conn.cursor()
  cursor.execute('SELECT name FROM Test_tmp.dbo.Table1 where id = ' + id)
  for row in cursor:
    return str(row[0])

@app.route('/companies', methods=['GET'])
def get_companies():
  return arik #json.dumps(companies)


