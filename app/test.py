import pyodbc
'''
conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=SVKHASHE-T470S;'
                      'Database=Test_tmp;'
                      'Trusted_Connection=yes;')

cursor = conn.cursor()
cursor.execute('SELECT * FROM Test_tmp.dbo.Table1')

for row in cursor:
    print(row)
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
