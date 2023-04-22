"""
File name: app.py
Main class file to initalize flask application and apis

There are three main api endpoints:
1. default or health - GET API - to check the health of the application
2. findrelativeimages - POST API - takes text and image input and provides the predicted list of text and images
3. lda - GET API - return current trends html visualization

@author Intelligence Beyond Fashion - Lambton college team
"""
# Import dependencies
import json
import os
from flask import Flask, request, jsonify, render_template
import sys
import joblib
import requests
sys.modules['sklearn.externals.joblib'] = joblib
import tensorflow as tf
import pyLDAvis
import pandas as pd
from google.cloud import storage
import numpy as np
from flask_cors import CORS, cross_origin
from sentence_transformers import SentenceTransformer
import shutil
import urllib.request

# Constants
UPLOAD_FOLDER = './upload'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

# Initalize flask app and upload folder
app = Flask(__name__, template_folder='template')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = "ibf"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Source data
source_data = pd.read_csv('./input/input.csv')

# Loading text model from google cloud storage
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./google_cloud_key.json"
storage_client = storage.Client()
bucket_name = "ibfdev"
bucket = storage_client.get_bucket(bucket_name)
blob = bucket.blob("sentence_transformers_text_model.sav")
blob.download_to_filename("./models/sentence_transformers_text_model.sav")
text_model = SentenceTransformer('stsb-mpnet-base-v2')

# Get image model
reconstructed_image_model = tf.keras.models.load_model("./models/reconstructive_own_image_model.h5")

# Text embeddings
data = np.load("./embeddings/sentence_transformer_text_embeddings.npy")
for value in data:
    normalized_value = np.linalg.norm(value)
    value/=normalized_value
sentence_transformer_embeddings = data

# Image embeddings
data = np.load("./embeddings/own_image_model_finetune_embedding.npy")
for value in data:
    normalized_value = np.linalg.norm(value)
    value/=normalized_value
own_image_model_embeddings = data

# Combined embeddings
source_text_and_images = np.concatenate([own_image_model_embeddings, sentence_transformer_embeddings], axis=1)

"""
    Returns the json data with image and label
    @param image - image series
    @param label - label data
    @return json - containing the image and label information used in data manipulation
"""
def image_format(image, label):
    return {'image_input': image, 'label_input': label}, label

"""
    Reads and returns the image and label data using the image path and label given
    @param image_path - path of the image
    @param label - label data
    @return image and label data
"""
def data_manipulation(image_path,label):
    img = tf.io.read_file(image_path)
    img = tf.image.decode_jpeg(img, channels=3)
    img = tf.image.resize(img,[224,224])
    return img,label

"""
    Making predictions for the given text and images. Returns N similar images from the dataset.
    @param text - (string) - product title
    @param image_path - (string) - path of the image
    @param N - (int) - Number of images to be returned
    @return predicted products data in json format
"""
def predictions(text, image_path, N):
    data = text_model.encode(text)
    for value in data:
        normalized_value = np.linalg.norm(value)
        value /= normalized_value
    text_data = data

    dataset = tf.data.Dataset.from_tensor_slices((pd.Series(image_path).values, pd.Series(-1).values)).map(data_manipulation).map(image_format).batch(1)
    data = reconstructed_image_model.predict(dataset)
    for value in data:
        normalized_value = np.linalg.norm(value)
        value /= normalized_value
    image_data = value

    source_data['values'] = np.reshape(np.matmul(source_text_and_images, np.concatenate([image_data, text_data]).T).T, (len(source_text_and_images),))
    data = source_data[np.reshape((np.matmul(source_text_and_images, np.concatenate([image_data, text_data]).T).T > 0.0), (len(source_text_and_images),))].sort_values(by='values', ascending=False).iloc[:N].reset_index()
    return json.dumps(json.loads(data.reset_index().to_json(orient='records')), indent=2)

"""
    Default API
    @return - (string) - health status of the application
"""
@app.route("/")
@cross_origin()
def default():
    return "Intelligence beyond fashion app, health okay"

"""
    Health API
    @return - (string) - health status of the application
"""
@app.route("/health")
@cross_origin()
def health():
    return "Intelligence beyond fashion app, health okay"

"""
    Find the relative products API
    @param - (string) - text - product title
    @param - (string) - file - product image
    @return - (json) - predicted products data
"""
@app.route('/findrelativeimages', methods=["POST"]) 
@cross_origin()
def findrelativeimages():
    if request.method == 'POST':
        imageurl = request.form.get("imageurl")
        print(imageurl)
        if imageurl:
            imageurl = str(imageurl)
            text = str(request.form.get('text'))
            filename = str(request.form.get('filename'))
            print(text)
            print(filename)
            shutil.rmtree(app.config['UPLOAD_FOLDER'], ignore_errors=True)
            os.mkdir(app.config['UPLOAD_FOLDER'])
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)  
            imageurl = imageurl.replace(" ", "%20")
            page = requests.get(imageurl)
            folder = open(filepath, "wb")
            folder.write(page.content)
            image_path = app.config['UPLOAD_FOLDER'] + "/" + filename
        else:
            if 'file' not in request.files:
                return "No file input"
            file = request.files['file']
            if file.filename == '':
                return "Filename is empty"
            shutil.rmtree(app.config['UPLOAD_FOLDER'], ignore_errors=True)
            os.mkdir(app.config['UPLOAD_FOLDER'])
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
            image_path = app.config['UPLOAD_FOLDER'] + "/" + file.filename
            text = [request.form.get("text")][0]

        return predictions(text, image_path, 15)
    else:
        return "Method not supported"

"""
    Get current trends visualization in html format
    @return - (html) - rendered html template of current visualization trends
"""
@app.route('/lda', methods=["POST"]) 
@cross_origin()
def lda():
    with open('./models/lda_vis.pkl', 'rb') as f:
        vis = pd.read_pickle(f)
    pyLDAvis.save_html(vis, './template/lda_vis.html')
    return render_template('./lda_vis.html')

if __name__ == '__main__':
    app.run(port=80, debug=True)