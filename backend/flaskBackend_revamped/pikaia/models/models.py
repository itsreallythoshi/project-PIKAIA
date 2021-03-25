from pikaia import db


# class for user table
class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    public_id = db.Column(db.String(length=50), nullable=False, unique=True)
    name = db.Column(db.String(length=50), nullable=False)
    password = db.Column(db.String(length=80))
    admin = db.Column(db.Boolean)


# we need a public key for each chat conversation
class Chat(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    public_id = db.Column(db.String(length=50), nullable=False, unique=True)
    user_sentence = db.Column(db.String(length=200))
    chatbot_sentence = db.Column(db.String(length=200))
    user_emotion = db.Column(db.String(length=10))
    user_id = db.Column(db.Integer())


class Emotion(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    public_id = db.Column(db.String(length=50), nullable=False, unique=True)
    user_input = db.Column(db.String(200))
    user_emotion = db.Column(db.String(10))
    user_id = db.Column(db.Integer())


class Songs(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    song_name = db.Column(db.String(50), unique=True)
    song_link = db.Column(db.String(1000))


class Ratings(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    song_id = db.Column(db.Integer(), db.ForeignKey('songs.id'))
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    ratings = db.Column(db.Integer())
