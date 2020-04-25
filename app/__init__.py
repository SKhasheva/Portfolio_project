from flask import Flask
from flask_session import Session
import os
import urllib3
import xml.etree.ElementTree as ET

app = Flask(__name__, static_url_path='', static_folder='static')
#app.config['SESSION_TYPE'] = 'filesystem'
app.testing = True
#app.secret_key = 'testing'
app.config.update(
            SECRET_KEY='foo',
            SERVER_NAME='127.0.0.1:5000'
)

from app import routes
