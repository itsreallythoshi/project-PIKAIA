# Emotion imports
import pandas as pd
# text preprocessing
from nltk.tokenize import word_tokenize
import re
from keras.models import load_model
# preparing input to our model
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences


# Loading the emotion model
def getEmotionModel():
    global loaded_model_v2
    loaded_model_v2 = load_model('./pikaia/models/ml_models/bi_gru_w2vec_v2_30eps.h5')
    print("Loaded Model")


# Reading the datasets
def readEmotionDataSets():
    global data_train
    global data_test
    data_train = pd.read_csv('./pikaia/models/data/data_train.csv', encoding='utf-8')
    data_test = pd.read_csv('./pikaia/models/data/data_test.csv', encoding='utf-8')
    print("Reading Emotion datasets")


# Calling the datasets and the model
readEmotionDataSets()
getEmotionModel()


def preProcessEmotionModel(encodedJson):
    max_seq_len = 500

    data = data_train.append(data_test, ignore_index=True)

    # defining a function to clean data
    def clean_text(data):
        # remove hashtags and @usernames
        data = re.sub(r"(#[\d\w\.]+)", '', data)
        data = re.sub(r"(@[\d\w\.]+)", '', data)

        # tokenization using nltk
        data = word_tokenize(data)
        return data

    texts = [' '.join(clean_text(text)) for text in data.Text]

    # Tokenizing and fitting the model using keras library
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(texts)

    def prediction():
        # Preprocessing the text
        seq = tokenizer.texts_to_sequences(encodedJson)
        padded = pad_sequences(seq, maxlen=max_seq_len)
        prediction = loaded_model_v2.predict(padded)
        return prediction

    return prediction()
