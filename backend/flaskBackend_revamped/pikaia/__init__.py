from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from functools import wraps
import jwt

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pikaia.db'
app.config['SECRET_KEY'] = 'ec9439cfc6c796ae2029594d'
db = SQLAlchemy(app)

@app.route('/')
def hello_world():
    return 'Deployment Success Check! ML model deployed'

from pikaia.admin import routes
from pikaia.chatbot import routes
from pikaia.music_recommender import routes
from pikaia.user import routes
from pikaia.quotes import routes
