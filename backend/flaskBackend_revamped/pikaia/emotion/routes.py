from pikaia import app, db
from pikaia.emotion_analysis import preProcessEmotionModel
from pikaia.token import token_required
from pikaia.models.models import Emotion
from flask import request, jsonify

import uuid
import numpy as np

# class Name on Emotions
class_names = ['joy', 'fear', 'anger', 'sadness', 'neutral']


@app.route('/emotions', methods=['GET'])
@token_required
def get_all_chat_emotions(current_user):
    # admin users cannot have chats
    if current_user.admin:
        return jsonify({'message': 'Admin users cannot read user chat conversations!'})

    emotions = Emotion.query.filter_by(user_id=current_user.id).all()

    # an array to hold all the dictionaries
    output = []
    # inserting each to-do into it's own dictionary
    for emotion in emotions:
        emotion_data = {'id': emotion.id, 'public_id': emotion.public_id, 'user_Input': emotion.user_input,
                        'user_emotion': emotion.user_emotion}
        output.append(emotion_data)
    return jsonify({'emotions': output})


@app.route('/emotion', methods=['POST'])
@token_required
def user_get_emotion(current_user):
    if current_user.admin:
        return jsonify({'message': 'This delete route is not for Admin users user route /chat/[user_id]'})

    # Requesting and Encoding jason data
    client_request = request.get_json(force=True)

    # Encoding json
    encodedRequest = ([client_request['userInput']])

    user_emotion = (class_names[np.argmax(preProcessEmotionModel(encodedRequest))])

    # Saving data
    new_emotion = Emotion(public_id=str(uuid.uuid4()), user_input=client_request['userInput'],
                          user_emotion=user_emotion, user_id=current_user.id)
    db.session.add(new_emotion)
    db.session.commit()

    return jsonify({'userInputEmotion': user_emotion}), 200


@app.route('/emotions', methods=['DELETE'])
@token_required
def user_delete_all_emotions(current_user):
    # admin users cannot use this route
    if current_user.admin:
        return jsonify({'message': 'This delete route is not for Admin users user route /chat/[user_id]'})

    deleted = 0
    while True:
        emotion_query = Emotion.query.filter_by(user_id=current_user.id).first()
        # no emotion in iteration
        if not emotion_query:
            break

        db.session.delete(emotion_query)
        deleted += 1

    if deleted == 0:
        return jsonify({'message': 'No emotions to delete!'})

    db.session.commit()
    return jsonify({'message': 'all emotions were successfully deleted'})
