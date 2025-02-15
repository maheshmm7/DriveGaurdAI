import cv2
import os
import numpy as np
from keras.models import load_model
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from pygame import mixer

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow requests from frontend

# Load pre-trained models
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_alt.xml')
leye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_lefteye_2splits.xml')
reye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_righteye_2splits.xml')
drowsiness_model = load_model('cnnfinal.h5')

# Labels for classification
labels = ['Close', 'Open']

# Initialize sound mixer
mixer.init()
alarm_sound = mixer.Sound('alarm.wav')

# Ensure an upload folder exists
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def home():
    return jsonify({"message": "Drowsiness Detection API is running!"})

@app.route('/detect', methods=['POST'])
def detect_drowsiness():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files['image']
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    # Read image
    img = cv2.imread(filepath)
    if img is None:
        return jsonify({"error": "Invalid image format"}), 400

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detect faces and eyes
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(25, 25))
    left_eye = leye_cascade.detectMultiScale(gray)
    right_eye = reye_cascade.detectMultiScale(gray)

    eye_states = []

    for (x, y, w, h) in right_eye:
        r_eye = img[y:y+h, x:x+w]
        r_eye = preprocess_eye(r_eye)
        rpred = np.argmax(drowsiness_model.predict(r_eye), axis=1)
        eye_states.append(labels[rpred[0]])
        break

    for (x, y, w, h) in left_eye:
        l_eye = img[y:y+h, x:x+w]
        l_eye = preprocess_eye(l_eye)
        lpred = np.argmax(drowsiness_model.predict(l_eye), axis=1)
        eye_states.append(labels[lpred[0]])
        break

    # Determine drowsiness status
    if eye_states.count('Close') >= 1:
        status = "Drowsy"
        alarm_sound.play()
    else:
        status = "Alert"

    return jsonify({
        "status": status,
        "eye_states": eye_states
    })

def preprocess_eye(eye):
    """Preprocess eye images for model prediction."""
    eye = cv2.cvtColor(eye, cv2.COLOR_BGR2GRAY)
    eye = cv2.resize(eye, (24, 24))
    eye = eye / 255.0
    eye = eye.reshape(24, 24, -1)
    eye = np.expand_dims(eye, axis=0)
    return eye

if __name__ == '__main__':
    app.run(debug=True)
