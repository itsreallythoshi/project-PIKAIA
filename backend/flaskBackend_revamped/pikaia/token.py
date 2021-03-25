from pikaia import app
from flask import jsonify, request
from pikaia.models.models import User
from functools import wraps
import jwt


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
