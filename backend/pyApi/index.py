import nltk
from numpy.core.numeric import False_

# nltk.download('stopwords') 
# nltk.download('wordnet')
# nltk.download('punkt')
# nltk.download('averaged_perceptron_tagger')

# Setting random seed
seed = 123

# Data manipulation/analysis
import numpy as np
import pandas as pd

import gensim
from gensim.parsing.preprocessing import preprocess_string
from gensim.models.doc2vec import Doc2Vec, TaggedDocument

# Data partitioning
import re, random, string
from nltk import word_tokenize, sent_tokenize, pos_tag
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import RegexpTokenizer
import numpy.linalg as la
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer, TfidfTransformer
from gensim import models
from gensim.parsing.preprocessing import strip_tags, strip_punctuation, strip_multiple_whitespaces, strip_numeric, remove_stopwords
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity

# Model saving
import pickle

from flask import Flask, jsonify
import pymongo

"""#TF-IDF class"""
doc2vec_fname = "doc2vec_model"
tdidf_fname = "tdidf_model"
class Tfidf_model:

    def __init__(self, titles):
        self.lemmatizer = WordNetLemmatizer()
        self.model = None
        self.vectorizer = None
        self.titles = titles

    def lemmatise_text(self, tokens):
        pos_map = {'J': 'a', 'N': 'n', 'R': 'r', 'V': 'v'}
        pos_tags = pos_tag(tokens)
        tokens = [self.lemmatizer.lemmatize(t, pos=pos_map.get(p[0], 'v')) for t, p in pos_tags]
        
        return tokens

    def tfidf_analyzer(self, text):
        stop_words = set(stopwords.words("english"))
        removed_punctuation = re.sub(r'[^\w\s]', '', text)
        removed_extra_whitespace = " ".join(removed_punctuation.split())
        lower_text = removed_extra_whitespace.lower()
        word_tokens = word_tokenize(lower_text)
        filtered_text = [word for word in word_tokens if word not in stop_words]
        lemmatised_text = self.lemmatise_text(filtered_text)

        return lemmatised_text
    
    def train(self, train_set):
        self.vectorizer = TfidfVectorizer(analyzer=self.tfidf_analyzer)
        self.model = self.vectorizer.fit_transform(train_set).toarray()
        pickle.dump(self.vectorizer, open(tdidf_fname + "_vectorizer" + ".pkl", "wb"))
        pickle.dump(self.model, open(tdidf_fname + "_model" + ".pkl", "wb"))

    def get_sim(self, query):
        vectorizer = pickle.load(open(tdidf_fname + "_vectorizer" + ".pkl", 'rb'))
        model = pickle.load(open(tdidf_fname + "_model" + ".pkl", 'rb'))
        testVectorizerArray = vectorizer.transform([query]).toarray()
        sk_sims = []
        most_similar = []
        cos_sim = lambda a, b : round(np.inner(a, b)/(la.norm(a)*la.norm(b)), 3)

        for i in range(len(model)):
            vector = model[i]
            for testV in testVectorizerArray:
                cosine = cos_sim(vector, testV)
                sk_sims.append((i, cosine))
        # print(len(self.titles))
        for i in sorted(sk_sims, key=lambda item: -item[1])[:10]:
            # print('{}: {}'.format(i[0], i[1]))
            most_similar.append((i[0], i[1]))
        return most_similar

"""#Doc2Vec class"""

class Doc2Vec_model:
    def __init__(self):
        self.lemmatizer = WordNetLemmatizer()
        self.model = None
        self.filters=[
            lambda x: x.lower(), 
            remove_stopwords, 
            strip_tags, 
            strip_punctuation, 
            strip_multiple_whitespaces, 
            strip_numeric, 
            self.lemmatize_sentence]

    def lemmatize_sentence(self, text):
        tokens = text.split()
        pos_map = {'J': 'a', 'N': 'n', 'R': 'r', 'V': 'v'}
        pos_tags = pos_tag(tokens)
        tokens = [self.lemmatizer.lemmatize(t.lower(), pos=pos_map.get(p[0], 'v')) for t, p in pos_tags]
        return " ".join(tokens)

    def train(self, text_corpus):
        processed_corpus = [preprocess_string(s, self.filters) for s in text_corpus]
        tagged_corpus = [TaggedDocument(d, [i]) for i, d in enumerate(processed_corpus)]
        self.model = Doc2Vec(tagged_corpus, dm=0, vector_size=200, window=2, min_count=1, epochs=100, hs=1)
        self.model.save(doc2vec_fname)

    def get_sim(self, query):
        loaded_model = Doc2Vec.load(doc2vec_fname)
        new_doc = gensim.parsing.preprocessing.preprocess_string(query, self.filters)
        test_doc_vector = loaded_model.infer_vector(new_doc)
        most_similar = loaded_model.dv.most_similar(positive = [test_doc_vector])
        return most_similar    

from flask import Flask, request, jsonify

app = Flask(__name__)
myclient = pymongo.MongoClient("mongo-db", 27027)
mydb = myclient["gp-organization"]
def get_df(all=False):
    q = 0
    if all:
        q = mydb["projects"].find({},{ "_id": 0, "title": 1, "description": 1 })
    else:
        q = mydb["projects"].find({"projectType": {"$in": [1,2]}},{ "_id": 0, "title": 1, "description": 1 })
    df = pd.DataFrame(list(q.sort("projectType", 1)))
    return df

def get_number_of_old_projects():
    q = mydb.projects.count_documents({"projectType": 0})
    return q

#Flask runs on port number 5000 by default
def train_and_save():
    df1 = get_df(True)
    tfidf = Tfidf_model(df1["title"].values)
    tfidf.train(df1['description'].values)

    df2 = get_df(True)
    doc2vec = Doc2Vec_model()
    doc2vec.train(df2['description'].values)

@app.route("/")
def hello(): 
    return "Welcome to machine learning model APIs!"

def print_arrays(x, y):
    print("----------------------------  PRINTING  ----------------------------")
    for a, b in zip(x, y):
        print('{} :{}% \n {} :{}%'.format(a[0], a[1]*100, b[0], b[1]*100))
        print("---"*7)

def print_array(x):
    for a in x:
        print('{} :{}%'.format(a[0], a[1]*100))
        print("---"*7)

def scale_to_number_of_old_projects(sim_array, df, old_size):
    new_doc2vec_sim = []
    for s in sim_array:
        new_index = s[0] - old_size
        if new_index >= 0:
            new_doc2vec_sim.append((df['title'].iloc[new_index], s[1]))
    return new_doc2vec_sim

@app.route('/predict',methods=['POST'])
def predict():
    json_data = request.get_json()
    title = json_data["title"]
    description = json_data["description"]
    db_changed = json_data["db_change"]
    output = "does not exist"
    add = True

    df = get_df()
    # print(df.columns)
    if len(df.columns) == 0:
        return jsonify({"output": output, "add": add})
    
    if db_changed == True:
        print("----------------------------  retraining  ----------------------------")
        train_and_save()
    
    
    # if df is empty just add
    tfidf = Tfidf_model(df["title"].values)
    doc2vec = Doc2Vec_model()

    tfidf_sim = tfidf.get_sim(description)
    doc2vec_sim = doc2vec.get_sim(description)
    
    old_size = get_number_of_old_projects()
    new_doc2vec_sim = scale_to_number_of_old_projects(doc2vec_sim, df, old_size)
    new_tfidf_sim = scale_to_number_of_old_projects(tfidf_sim, df, old_size)
    
    

    print_arrays(new_doc2vec_sim, new_tfidf_sim)

    if len(new_doc2vec_sim) > 0 and len(new_tfidf_sim) > 0:
        if new_tfidf_sim[0][0] == new_doc2vec_sim[0][0] and new_doc2vec_sim[0][0] != title:
            # if tfidf_sim[0][0] == doc2vec_sim[0][0] and tfidf_sim[0][1]>.5 and doc2vec_sim[0][1] and doc2vec_sim[0][0] != title:
            output = "already exists"
            add = False

    return jsonify({"output": output, "add": add})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')