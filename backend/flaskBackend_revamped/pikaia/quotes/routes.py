from pikaia import app
from pikaia.token import token_required
from flask import jsonify
import requests


@app.route('/quotes', methods=['GET'])
@token_required
def user_get_quote(current_user):
    # admin users cannot have chats
    if current_user.admin:
        return jsonify({'message': 'Admin users cannot use quotes!'})

    quotes_endpoint = 'https://quotes.rest/qod?category=inspire'
    api_token = "25632gadhgahs6276712"
    headers = {'content-type': 'application/json',
               'X-TheySaidSo-Api-Secret': format(api_token)}

    try:
        # GET request to quotes API
        response = requests.get(quotes_endpoint, headers=headers)
    except:
        return jsonify({'error': 'Quote service unavailable'}), 503

    quote = response.json()['contents']['quotes'][0]['quote']
    author = response.json()['contents']['quotes'][0]['author']

    return jsonify({'quotes': quote, 'author': author})
