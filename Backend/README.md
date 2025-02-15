# Backend: Drowsiness Detection System

Welcome to the **Drowsiness Detection System** backend! This powerful system leverages **Computer Vision** and **Deep Learning** to monitor drivers in real-time, ensuring safer driving conditions by detecting signs of drowsiness and distraction. With features like eye state tracking, gaze direction monitoring, and head pose estimation, this system is designed to keep drivers alert and focused on the road.

---

## 🚀 Key Features

### **Drowsiness Detection**
- Tracks the driver's eye state to detect drowsiness or excessive blinking.
- Alerts the driver with an alarm sound when drowsiness is detected.

### **Gaze Direction Tracking**
- Monitors the driver's gaze direction to identify distractions.
- Ensures the driver is focused on the road ahead.

### **Head Pose Estimation**
- Analyzes head orientation to detect abnormal movements or signs of drowsiness.

### **Real-Time Monitoring**
- Utilizes a webcam feed for continuous monitoring of the driver's face, eyes, and head position.

### **Alert System**
- Plays an alarm sound (`alarm.wav`) when drowsiness or distraction is detected.

### **Face and Eye Detection**
- Uses Haar cascades for accurate face and eye detection.

---

## 🛠️ Prerequisites

Before getting started, ensure you have the following:

- **Python Version**: Python 3.7 - 3.9 (Python < 3.10 required)
- A working **webcam** for real-time monitoring.
- Dependencies listed in `requirements.txt`.

---

## 🚀 Setup and Installation

### 1. **Set Up the Environment**

#### Using Virtual Environment (venv)
```bash
python -m venv drowsiness_env
```

#### Activate Virtual Environment
- **Windows**:
  ```bash
  drowsiness_env\Scripts\activate
  ```
- **macOS/Linux**:
  ```bash
  source drowsiness_env/bin/activate
  ```

#### Using Conda Environment
```bash
conda create --name drowsiness_env python=3.9 -y
conda activate drowsiness_env
```

### 2. **Install Dependencies**
```bash
pip install -r requirements.txt
pip install opencv-python protobuf==3.20.0
```

### 3. **Verify Setup**
```bash
pip list
```

---

## 🖥️ Running the Backend

### **Standalone Drowsiness Detection**
To use the drowsiness detection feature as a standalone application, run:
```bash
python test.py
```
This will start the webcam feed and track the driver's eye state, gaze direction, and head pose in real-time.

### **Start the Backend Server**
To start the backend server for API communication, run:
```bash
python app.py
```

---

## 📁 Required Files

Ensure the following files are available in the project directory:

- **Pre-trained model for eye state classification**:
  - `cnnfinal.h5`

- **Haar cascade files for face and eye detection**:
  - `haarcascade_frontalface_alt.xml`
  - `haarcascade_lefteye_2splits.xml`
  - `haarcascade_righteye_2splits.xml`

- **Alarm Sound**:
  - `alarm.wav` (will be played when drowsiness is detected)

---

## 🛠️ Troubleshooting

- **Webcam not detected**: Ensure your webcam is properly connected and accessible by other applications.
- **Model loading errors**: Ensure `cnnfinal.h5` is placed in the correct directory.
- **Dependency issues**: Ensure you have the latest version of pip:
  ```bash
  pip install --upgrade pip
  ```

---

## 🐛 Reporting Issues and Contributing

### **Reporting Errors or Bugs**
1. **Check Existing Issues**: Search existing GitHub issues to avoid duplicates.
2. **Create a Detailed Bug Report**:
   - Include:
     - Description of the error
     - Steps to reproduce
     - Environment details (OS, Python version, etc.)
     - Full error traceback

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

- **OpenCV**: For face and eye detection algorithms.
- **MediaPipe**: For real-time gaze and head pose tracking.
- **Keras**: For the deep learning model used to classify eye state.

---

Get started today and make driving safer with the **Drowsiness Detection System**! 🚗💤🚨
