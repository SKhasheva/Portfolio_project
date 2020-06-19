from flask import Flask
from flask_session import Session
import os
import configparser

config = configparser.RawConfigParser()
config.read('conf.properties')

api_dict = dict(config.items('api'))
url = api_dict['host'] + ':' + api_dict['port']

db_dict = dict(config.items('db'))
db_connection = 'Driver={0};Server={1};Database={2};Trusted_Connection={3}'.format(
    db_dict['driver'], db_dict['server'], db_dict['database'], db_dict['trusted_connection'])

app = Flask(__name__, static_url_path='', static_folder='static')
#app.config['SESSION_TYPE'] = 'filesystem'
app.testing = True
#app.secret_key = 'testing'
app.config.update(
            SECRET_KEY='foo',
            SERVER_NAME=url,
            DB_CONN=db_connection
)

from app import view
