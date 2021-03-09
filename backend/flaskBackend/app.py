import json
import time
from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from tensorflow.python.keras.preprocessing.sequence import pad_sequences
from werkzeug.security import generate_password_hash, check_password_hash
from keras.models import load_model
from functools import wraps
import uuid
import jwt
import datetime
import numpy as np

from pandas import read_csv
import pandas as pd
from math import sqrt
from scipy.spatial.distance import euclidean, cosine

# Activate virtual env
# .\env\Scripts\activate

# preparing input to our model
from keras.preprocessing.text import Tokenizer

# datetime to create an expiration for jwt
# jwt for generating json web token -
# we are using PyJWT not JWT... so $ pip uninstall JWT $ pip install PyJWT - Question:33198428
# jsonify so we can return the information
# uuid to generate a random public id
# install SQLAlchemy using pip: $ pip install -U Flask-SQLAlchemy
# install JWT using pip: $ pip install PyJWT
# password_hash for -> once we put the passwords in the database we need it to be hashed

app = Flask(__name__)

# todo: track modifications part was added to suppress warnings... if it breaks anything just remove it
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'thisissecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
# DB URI /// - 3 slashes for URI means a relative path - within the project
# DB URI //// - 4 slashes -- it's an absolute path ex: mnt/c/Users/thoshi/Documents/api_example/todo.db

# instantiate SQLAlchemy
db = SQLAlchemy(app)


# class for user table
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    name = db.Column(db.String(50))
    password = db.Column(db.String(80))
    admin = db.Column(db.Boolean)


# we don't need a public id for each to-do. we can add if we want
# we can also add a foreign key for to-do if we want

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(50))
    complete = db.Column(db.Boolean)
    user_id = db.Column(db.Integer)


# numpy to jason encoder
class NumpyEncoder(json.JSONEncoder):
    """ Special json encoder for numpy types """

    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


# ============== decorator for header
# token_required takes in the function that gets decorated
# the inner decorated function gets passed in the positional arguments and the keyword arguments
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # create an empty token
        token = None
        # if there is a header called 'x-access-token'
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        # token is there
        try:
            # not-working-code: jwt.decode(token, app.config['SECRET_KEY'])
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({'message': 'Token is invalid!'}), 401

        # token is valid and we also have a user
        # pass the user object to the route
        return f(current_user, *args, **kwargs)

    # return the decorated function
    return decorated


# ============== create database using python shell ==============
# go to shell and type $ python
# $ from app import db
# $ db.create_all()
# to create the databases. a file called 'todo.db' will be created in the specified file path
# exit python shell using # exit()

# ============== check tables using sqlite3 ==============
# to install sqlite refer to the second answer(by-taimur alam):
# https://stackoverflow.com/questions/4578231/error-while-accessing-sqlite3-shell-from-django-application
# go to shell and type $ sqlite3 todo.db
# and view the tables $ .tables
# exit sqlite3 $ .exit
# if you had data you can query from there itself

# we use a public ID because. if we put the public ID in a token. we can see it if we decode the token. And we don't
# want the ID to match up exactly with the sequential ID's in the database, because then someone would know how many
# users there are in the database and simply supply the next number or the previous number. To make it harder to
# figure out the users we use the public id. we will generate the public id from a library called uid

# boiler place route for reference
# @app.route('/')
# def hello_world():
#     return 'Hello World!'

# use routes will only be accessible by admin users
# admin users can see other users, create a new user and delete users

# ============== user routes ============== get all users
#  todo: add decorator for all route methods when adding token
#  required decorator.. we also need to pass in the current user - because we are passing it to the function that
#  gets decorated
@app.route('/user', methods=['GET'])
@token_required
def get_all_users(current_user):
    # allowing only admin user to perform an action
    if not current_user.admin:
        return jsonify({'message': 'Cannot perform that function!'})

    # query users table
    users = User.query.all()
    output = []
    for user in users:
        user_data = {'public_id': user.public_id, 'name': user.name, 'password': user.password, 'admin': user.admin}
        output.append(user_data)

    return jsonify({'users': output})


# Emotion Analysis
@app.route('/emotion', methods=['POST'])
@token_required
def get_emotion(current_user):
    # query the database to find all to-do's that belong to the current user
    todos = Todo.query.filter_by(user_id=current_user.id).all()

    # Max input length (max number of words)
    max_seq_len = 500
    class_names = ['joy', 'fear', 'anger', 'sadness', 'neutral']
    emotion = request.get_json()

    print(emotion)
    model = load_model('ML__model/bi_gru_w2vec_v2_30eps.h5')

    # Tokenizer
    tokenizer = Tokenizer()
    seq = tokenizer.texts_to_sequences(emotion)
    padded = pad_sequences(seq, maxlen=max_seq_len)

    start_time = time.time()
    predictions = model.predict(padded)
    dumped = json.dumps(predictions, cls=NumpyEncoder)
    print('Message: ' + str(emotion))
    return jsonify(
        'prediction: {} ({:.2f} seconds)'.format(class_names[np.argmax(predictions)], (time.time() - start_time))), 200


# get one user
# todo: current user get's passing in first... public_id will be a positional argument... i.e: *args
@app.route('/user/<public_id>', methods=['GET'])
@token_required
def get_one_user(current_user, public_id):
    # allowing only admin user to perform an action
    if not current_user.admin:
        return jsonify({'message': 'Cannot perform that function!'})

    user = User.query.filter_by(public_id=public_id).first()
    # no user found
    if not user:
        return jsonify({'message': 'No user found!'})

    # if user found
    user_data = {'public_id': user.public_id, 'name': user.name, 'password': user.password, 'admin': user.admin}

    return jsonify({'user': user_data})


# create user
@app.route('/user', methods=['POST'])
@token_required
def create_user(current_user):
    # allowing only admin user to perform an action
    if not current_user.admin:
        return jsonify({'message': 'Cannot perform that function!'})

    data = request.get_json()

    hashed_password = generate_password_hash(data['password'], method='sha256')

    new_user = User(public_id=str(uuid.uuid4()), name=data['name'], password=hashed_password, admin=False)

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'New user created!'})


# promote user to an admin
@app.route('/user/<public_id>', methods=['PUT'])
@token_required
def promote_user(current_user, public_id):
    # allowing only admin user to perform an action
    if not current_user.admin:
        return jsonify({'message': 'Cannot perform that function!'})

    user = User.query.filter_by(public_id=public_id).first()
    # no user found
    if not user:
        return jsonify({'message': 'No user found!'})

    # user found
    user.admin = True
    db.session.commit()
    return jsonify({'message': 'The user has been promoted!'})


# delete user
@app.route('/user/<public_id>', methods=['DELETE'])
@token_required
def delete_user(current_user, public_id):
    # allowing only admin user to perform an action
    if not current_user.admin:
        return jsonify({'message': 'Cannot perform that function!'})

    user = User.query.filter_by(public_id=public_id).first()
    # no user found
    if not user:
        return jsonify({'message': 'No user found!'})

    # user found
    db.session.delete(user)
    db.session.commit()
    return {'message': 'user has been deleted! '}


# ============== authentication routes ==============
# this route will allow us to take the username and password for a user. enter it using
# http basic authentication. in return get a token. the front end can use that token for future stuff
# the token will expire after some time. when that token is put in the header of all subsequent requests...
# we know that the user is authenticated

@app.route('/login')
def login():
    auth = request.authorization

    # if no authentication information is passed in
    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify - missing authentication', 401,
                             {'WWW-Authenticate': 'Basic realm="Login required!"'})

    # authentication info is passed in
    # todo: username should be unique
    user = User.query.filter_by(name=auth.username).first()

    # no such user found
    if not user:
        return make_response('Could not verify - no such user', 401,
                             {'WWW-Authenticate': 'Basic realm="Login required!"'})

    # user exists in the database
    # check for password
    # password matches
    if check_password_hash(user.password, auth.password):
        # an expiration is a unix utc timestamp in python we can add a time delta to utc now. now the token is active
        # for only 30 minutes todo: let the user the option to stay signed in for a few days... and change the time
        #  delta app.config['SECRET_KEY'] will be used to encode the token token = jwt.encode( {'public_id':
        #  user.public_id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},app.config[
        #  'SECRET_KEY'])
        token = jwt.encode(
            {'public_id': user.public_id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=300)},
            app.config['SECRET_KEY'], algorithm="HS256")
        # to decode jwt token  # decode token data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        # not-working:   # return jsonify({'token': token.decode('UTF-8')})
        # for reference: # return jsonify({'token': data}) # got this from youtube comment - Rafael Gramoschi
        return jsonify({'token': token})
    # if password doesn't match
    return make_response('Could not verify - incorrect password', 401,
                         {'WWW-Authenticate': 'Basic realm="Login required!"'})


# ============== to-do items routes ==============
@app.route('/todo', methods=['GET'])
@token_required
def get_all_todos(current_user):
    # query the database to find all to-do's that belong to the current user
    todos = Todo.query.filter_by(user_id=current_user.id).all()

    # an array to hold all the dictionaries
    output = []
    # inserting each to-do into it's own dictionary
    for todo in todos:
        todo_data = {'id': todo.id, 'text': todo.text, 'complete': todo.complete}
        output.append(todo_data)

    return jsonify({'todos': output})


@app.route('/todo/<todo_id>', methods=['GET'])
@token_required
def get_one_todo(current_user, todo_id):
    # todo: this way no user can't see someone else's todo
    todo = Todo.query.filter_by(id=todo_id, user_id=current_user.id).first()

    # to-do not found
    if not todo:
        return jsonify({'message': 'No todo found!'})

    # to-do was found
    todo_data = {}
    todo_data['id'] = todo.id
    todo_data['text'] = todo.text
    todo_data['complete'] = todo.complete
    return jsonify(todo_data)


@app.route('/todo', methods=['POST'])
@token_required
def create_todo(current_user):
    data = request.get_json()

    # we get the user_id from the web token
    new_todo = Todo(text=data['text'], complete=False, user_id=current_user.id)
    db.session.add(new_todo)
    db.session.commit()
    return jsonify({'message': 'Todo Created!'})


@app.route('/todo/<todo_id>', methods=['PUT'])
@token_required
def complete_todo(current_user, todo_id):
    todo = Todo.query.filter_by(id=todo_id, user_id=current_user.id).first()

    # to-do not found
    if not todo:
        return jsonify({'message': 'No todo found!'})

    todo.complete = True
    db.session.commit()
    return jsonify({'message': 'Todo item set to complete'})


@app.route('/todo/<todo_id>', methods=['DELETE'])
@token_required
def delete_todo(current_user, todo_id):
    todo = Todo.query.filter_by(id=todo_id, user_id=current_user.id).first()

    # to-do not found
    if not todo:
        return jsonify({'message': 'No todo found!'})

    db.session.delete(todo)
    # a commit will save the change in the database
    db.session.commit()
    return jsonify({'message': 'Todo item deleted!'})


# =================================================================
# -------------------------- Recommender --------------------------
# =================================================================

class Music(db.Model):
    music_id = db.Column(db.Integer, primary_key=True)
    public_music_id = db.Column(db.String(50), unique=True)
    music_name = db.Column(db.String(50))
    music_link = db.Column(db.String(100))

    @validates('music_link')
    def validate_name(self, key, value):
        assert value != 'www.'
        return value


class Ratings(db.model):
    music_id = db.Column(db.String(50), foreign_key('music.music_id'))
    id = db.Column(db.Integer, foreign_key('user.id'))
    ratings = db.Column(db.Integer)


@app.route('/add-music', methods=['POST'])
@token_required
def add_music(current_user):
    # allowing only admin user to perform an action
    if not current_user.admin:
        return jsonify({'message': 'You do not have the permission to perform that function!'})

    data = request.get_json()
    new_music = Music(public_id=str(uuid.uuid4()), music_name=data['music_name'], music_link=data['music_link'])
    db.session.add(new_music)
    db.session.commit()
    return jsonify({'message': 'New music added!'})


@app.route('/recommend-music', methods=['GET'])
@token_required
def recommend_music(current_user):
    musics = Music.query.filter_by(user_id=current_user.id).all()
    output = []
    for music in musics:
        music_data = {'music_id': music.music_id, 'music_name': music.music_name}
        output.append(music_data)
    return jsonify({'musics': output})


@app.route('/recommend-music', methods=['GET'])
@token_required
def recommend_music(current_user):

    df = pd.read_sql_query(Ratings.query.filter_by(user_id=current_user.id).all())
    ratings = read_csv(df, index_col=0)
    ratings = ratings.fillna(0)

    def distance(person1, person2):
        taste_distance = euclidean(person1, person2)
        return taste_distance

    def most_similar_to(name):
        person = ratings.loc[name]
        closest_distance = float('inf')
        closest_person = ''
        for other_person in ratings.itertuples():
            if other_person.Index == name:
                # don't compare a person to themself
                continue
            distance_to_other_person = distance(person, ratings.loc[other_person.Index])
            if distance_to_other_person < closest_distance:
                # new high score! save it
                closest_distance = distance_to_other_person
                closest_person = other_person.Index
        return closest_person, closest_distance

    output = []
    ratings = Ratings.query.all()
    rows = ratings.statement.execute().fetchall()
    for row in rows:
        user_similarity, user_distance = most_similar_to(row.user)
        print(row, user_similarity, user_distance)

    return jsonify({'musics': output})


if __name__ == '__main__':
    app.run(debug=True)
