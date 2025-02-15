# Frontend: Face Recognition and Drowsiness Detection

Welcome to the **Frontend** of the **Face Recognition and Drowsiness Detection System**! This application combines cutting-edge technologies to provide a seamless user experience for real-time face scanning, recognition, and drowsiness detection. Built with **React** and styled using **Tailwind CSS**, this frontend integrates with a **Flask backend** to deliver a robust and user-friendly interface.

---

## 🚀 Key Features

### **Face Recognition**
- **Face Scanning and Recognition**: Utilizes **FaceAPI.js** for real-time face detection and recognition.
- **User-Friendly Interface**: Displays recognized faces with confidence scores and bounding boxes.

### **Drowsiness Detection**
- **Real-Time Monitoring**: Integrates with a **Flask backend** to detect drowsiness using eye state, gaze direction, and head pose estimation.
- **Alert System**: Displays visual alerts when drowsiness is detected.

---

## 🛠️ Technologies Used

- **Frontend**:
  - **React**: For building the user interface.
  - **Tailwind CSS**: For styling and responsive design.
  - **FaceAPI.js**: For face detection and recognition.

- **Backend**:
  - **Flask**: For drowsiness detection and API communication.

---

## 🚀 Running the Frontend

### **Prerequisites**
- Ensure you have **Node.js** and **npm** installed on your machine.
- The **Flask backend** should be up and running (refer to the backend README for setup instructions).

### **Install Dependencies**
1. Navigate to the frontend directory:
   ```bash
   cd frontend/WOW
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```

### **Run the Frontend**
Start the development server using:
```bash
npm run dev
```
This will launch the application in your default browser. If it doesn't, open your browser and navigate to:
```
http://localhost:3000
```

---

## 🖥️ How It Works

### **Face Recognition**
- The frontend uses **FaceAPI.js** to detect and recognize faces in real-time.
- The webcam feed is processed to identify faces, and the results are displayed with bounding boxes and confidence scores.

### **Drowsiness Detection**
- The frontend communicates with the **Flask backend** to monitor the driver's eye state, gaze direction, and head pose.
- If drowsiness is detected, the backend sends an alert to the frontend, which displays a visual warning to the user.

---

## 🛠️ Troubleshooting

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
     - Environment details (OS, Node.js version, etc.)
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
- **React**: For building the user interface.
- **Tailwind CSS**: For styling and responsive design.
- **Flask**: For backend drowsiness detection.

---

Get started today and experience the power of **Face Recognition and Drowsiness Detection**! 🚗💤🚨
