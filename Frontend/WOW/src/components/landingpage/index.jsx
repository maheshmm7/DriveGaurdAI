import React, { useRef, useEffect, useState } from "react";
import DrowsinessDetection from "../drowsiness/DrowsinessDetection";
import FaceRecognizer from "../face/FaceRecognizer";

const Index = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("Initializing...");
  const [eyeStates, setEyeStates] = useState(["Loading...", "Loading..."]);
  const [face, setFace] = useState("unknown");
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };
    startVideo();

    // Only start drowsiness detection if not in scanning mode
    if (!isScanning) {
      const interval = setInterval(() => {
        captureFrame();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const captureFrame = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) sendToServer(blob);
      }, "image/jpeg");
    }
  };

  const sendToServer = async (blob) => {
    try {
      const formData = new FormData();
      formData.append("image", blob, "frame.jpg");
      const response = await fetch("http://127.0.0.1:5000/detect", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to send frame");
      const data = await response.json();
      setStatus(data.status);
      setEyeStates(data.eye_states || ["Unknown", "Unknown"]);
    } catch (err) {
      console.error("Error sending frame:", err);
      setStatus("Error detecting drowsiness.");
      setEyeStates(["Error", "Error"]);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <DrowsinessDetection 
        videoRef={videoRef} 
        canvasRef={canvasRef} 
        status={status} 
        eyeStates={eyeStates} 
        face={face}
        isScanning={isScanning}
      />
      <FaceRecognizer 
        setFace={setFace} 
        videoRef={videoRef}
        setIsScanning={setIsScanning}
      />
    </div>
  );
};

export default Index;