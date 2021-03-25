from pikaia import app
from pikaia.models.models import User
from flask import request, jsonify, make_response
from werkzeug.security import check_password_hash

import jwt
import datetime


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


