# Personalised Dashboard


Welcome to the **Personalised Dashboard**! This project combines **Computer Vision**, **Deep Learning**, and modern web technologies to create a comprehensive solution for real-time face recognition and drowsiness detection. The system is designed to enhance safety and security, particularly in environments like driving, by monitoring users' faces and alerting them when signs of drowsiness or distraction are detected.

---

## 🚀 Key Features

### **Face Recognition**
- **Real-Time Face Scanning and Recognition**: Utilizes **FaceAPI.js** for accurate face detection and recognition.
- **User-Friendly Interface**: Displays recognized faces with bounding boxes and confidence scores.

### **Drowsiness Detection**
- **Eye State Tracking**: Monitors the user's eye state to detect drowsiness or excessive blinking.
- **Gaze Direction Tracking**: Tracks the user's gaze to identify distractions.
- **Head Pose Estimation**: Analyzes head orientation to detect abnormal movements or drowsiness.
- **Alert System**: Plays an alarm sound and displays visual alerts when drowsiness or distraction is detected.

---

## 🛠️ Technologies Used

### **Frontend**
- **React**: For building the user interface.
- **Tailwind CSS**: For styling and responsive design.
- **FaceAPI.js**: For face detection and recognition.

### **Backend**
- **Flask**: For drowsiness detection and API communication.
- **OpenCV**: For face and eye detection.
- **MediaPipe**: For gaze and head pose tracking.
- **Keras**: For the deep learning model used to classify eye state.

---

## 🚀 Setup and Installation

### **1. Backend Setup**

#### Prerequisites
- **Python Version**: Python 3.7 - 3.9 (Python < 3.10 required)
- Webcam for real-time monitoring.

#### Steps
1. **Set Up the Environment**:
   - Using Virtual Environment (venv):
     ```bash
     python -m venv drowsiness_env
     ```
   - Activate Virtual Environment:
     - **Windows**:
       ```bash
       drowsiness_env\Scripts\activate
       ```
     - **macOS/Linux**:
       ```bash
       source drowsiness_env/bin/activate
       ```
   - Using Conda Environment:
     ```bash
     conda create --name drowsiness_env python=3.9 -y
     conda activate drowsiness_env
     ```

2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   pip install opencv-python protobuf==3.20.0
   ```

3. **Run the Backend**:
   - For standalone drowsiness detection:
     ```bash
     python test.py
     ```
   - To start the backend server:
     ```bash
     python app.py
     ```

### **2. Frontend Setup**

#### Prerequisites
- **Node.js** and **npm** installed.

#### Steps
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the frontend:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 🖥️ How It Works

### **Face Recognition**
- The frontend uses **FaceAPI.js** to detect and recognize faces in real-time.
- The webcam feed is processed to identify faces, and the results are displayed with bounding boxes and confidence scores.

### **Drowsiness Detection**
- The frontend communicates with the **Flask backend** to monitor the user's eye state, gaze direction, and head pose.
- If drowsiness is detected, the backend sends an alert to the frontend, which displays a visual warning and plays an alarm sound.

---

## 🛠️ Troubleshooting

### **Backend Issues**
- **Webcam not detected**: Ensure your webcam is properly connected and accessible by other applications.
- **Model loading errors**: Ensure `cnnfinal.h5` is placed in the correct directory.
- **Dependency issues**: Ensure you have the latest version of pip:
  ```bash
  pip install --upgrade pip
  ```

### **Frontend Issues**
- **FaceAPI.js not working**: Ensure the model files for FaceAPI.js are correctly loaded and accessible.
- **Backend connection issues**: Verify that the Flask backend is running and the API endpoints are correctly configured.
- **Dependency issues**: Ensure all dependencies are installed by running:
  ```bash
  npm install
  ```

---

## 🐛 Reporting Issues and Contributing

### **Reporting Errors or Bugs**
1. **Check Existing Issues**: Search existing GitHub issues to avoid duplicates.
2. **Create a Detailed Bug Report**:
   - Include:
     - Description of the error
     - Steps to reproduce
     - Environment details (OS, Python/Node.js version, etc.)
     - Screenshots or error logs (if applicable)

### **Contributing**
We welcome contributions! Follow these steps:
1. Fork the repository.
2. Create a new branch for your changes.
3. Commit your changes.
4. Push your changes and create a pull request.

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **FaceAPI.js**: For face detection and recognition.
- **OpenCV**: For face and eye detection.
- **MediaPipe**: For gaze and head pose tracking.
- **Keras**: For the deep learning model used to classify eye state.
- **React**: For building the user interface.
- **Tailwind CSS**: For styling and responsive design.
- **Flask**: For backend drowsiness detection.

---

Get started today and experience the power of **Face Recognition and Drowsiness Detection**! 🚗💤🚨
