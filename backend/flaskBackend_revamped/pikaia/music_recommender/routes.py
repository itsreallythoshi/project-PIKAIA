from pikaia import app, db
from pikaia.token import token_required
from pikaia.models.models import Songs, Ratings
from flask import request, jsonify


@app.route('/add-music', methods=['POST'])
@token_required
def add_music(current_user):
    # allowing only admin user to perform an action
    if not current_user.admin:
        return jsonify({'message': 'You do not have the permission to perform that function!'})

    data = request.get_json()
    new_song = Songs(song_name=data['song_name'], song_link=data['song_link'])
    db.session.add(new_song)
    db.session.commit()
    return jsonify({'message': 'New music added!'})


# @app.route('/recommend-music', methods=['GET'])
# @token_required
# def recommend_music(current_user):
#     user = User.query.all()
#     ratings = Ratings.query.all()
#     print(ratings)
#     return jsonify({'musics': "Terminal"})


@app.route('/rating', methods=['POST'])
@token_required
def user_create_song_rating(current_user):
    # admin users cannot use this route
    if current_user.admin:
        return jsonify({'message': 'This delete route is not for Admin users user route /chat/[user_id]'})

    data = request.get_json()

    new_rating = Ratings(song_id=data['song_id'], user_id=current_user.id, ratings=data['rating'])
    db.session.add(new_rating)
    db.session.commit()
    return jsonify({'message': 'Rating added'})
