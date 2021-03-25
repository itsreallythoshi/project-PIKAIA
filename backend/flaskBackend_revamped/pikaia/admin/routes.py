from pikaia import app, db
from pikaia.token import token_required
from pikaia.models.models import User
from flask import request, jsonify
from werkzeug.security import generate_password_hash

import uuid


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
