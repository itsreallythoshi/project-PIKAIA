# Emotion imports
import nltk

nltk.download('punkt')
import pandas as pd
# text preprocessing
from nltk.tokenize import word_tokenize
import re
from keras.models import load_model
# preparing input to our model
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.utils import to_categorical


# Loading the emotion model
def getEmotionModel():
    global loaded_model_v2
    loaded_model_v2 = load_model('ml_models/bi_gru_w2vec_v2_30eps.h5')
    print("Loaded Model")


# Reading the datasets
def readEmotionDataSets():
    global data_train
    global data_test
    data_train = pd.read_csv('data/data_train.csv', encoding='utf-8')
    data_test = pd.read_csv('data/data_test.csv', encoding='utf-8')
    print("Reading Emotion datasets")


# Calling the datasets
readEmotionDataSets()
getEmotionModel()


def preProcessEmotionModel(encodedJson):
    max_seq_len = 500
    class_names = ['joy', 'fear', 'anger', 'sadness', 'neutral']

    X_train = data_train.Text
    X_test = data_test.Text
    y_train = data_train.Emotion
    y_test = data_test.Emotion
    data = data_train.append(data_test, ignore_index=True)

    # defining a function to clean data
    def clean_text(data):
        # remove hashtags and @usernames
        data = re.sub(r"(#[\d\w\.]+)", '', data)
        data = re.sub(r"(@[\d\w\.]+)", '', data)

        # tekenization using nltk
        data = word_tokenize(data)
        return data

    texts = [' '.join(clean_text(text)) for text in data.Text]
    texts_train = [' '.join(clean_text(text)) for text in X_train]
    texts_test = [' '.join(clean_text(text)) for text in X_test]

    # Tokenizing and fitting the model using keras library
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(texts)
    sequence_train = tokenizer.texts_to_sequences(texts_train)
    sequence_test = tokenizer.texts_to_sequences(texts_test)
    index_of_words = tokenizer.word_index

    X_train_pad = pad_sequences(sequence_train, maxlen=max_seq_len)
    X_test_pad = pad_sequences(sequence_test, maxlen=max_seq_len)
    X_train_pad

    # Categorizing labels
    encoding = {
        'joy': 0,
        'fear': 1,
        'anger': 2,
        'sadness': 3,
        'neutral': 4
    }

    # Integer labels
    y_train = [encoding[x] for x in data_train.Emotion]
    y_test = [encoding[x] for x in data_test.Emotion]

    y_train = to_categorical(y_train)
    y_test = to_categorical(y_test)
    y_train

    def prediction():
        # Preprocessing the text
        seq = tokenizer.texts_to_sequences(encodedJson)
        padded = pad_sequences(seq, maxlen=max_seq_len)
        prediction = loaded_model_v2.predict(padded)
        return prediction

    return prediction()
