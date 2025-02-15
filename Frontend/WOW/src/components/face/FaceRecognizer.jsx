import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { Button } from "./components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Alert, AlertDescription } from "./components/ui/alert";

const FaceRecognizer = ({ setFace, videoRef, setIsScanning }) => {
  const [loading, setLoading] = useState(true);
  const [modelLoadingStatus, setModelLoadingStatus] = useState({
    tinyFaceDetector: false,
    faceLandmark: false,
    faceRecognition: false,
    ssdMobilenet: false
  });
  const [knownFaces, setKnownFaces] = useState([]);
  const [showScanDialog, setShowScanDialog] = useState(false);
  const [newFaceName, setNewFaceName] = useState("");
  const [scanning, setScanning] = useState(false);
  const [recognizing, setRecognizing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadModels = async () => {
      try {
        setError("");
        
        // Load TinyFaceDetector model
        try {
          await faceapi.nets.tinyFaceDetector.loadFromUri("/model");
          setModelLoadingStatus(prev => ({ ...prev, tinyFaceDetector: true }));
        } catch (err) {
          console.error("Error loading TinyFaceDetector:", err);
          throw new Error("Failed to load face detector model");
        }

        // Load FaceLandmark68 model
        try {
          await faceapi.nets.faceLandmark68Net.loadFromUri("/model");
          setModelLoadingStatus(prev => ({ ...prev, faceLandmark: true }));
        } catch (err) {
          console.error("Error loading FaceLandmark68:", err);
          throw new Error("Failed to load facial landmarks model");
        }

        // Load FaceRecognition model
        try {
          await faceapi.nets.faceRecognitionNet.loadFromUri("/model");
          setModelLoadingStatus(prev => ({ ...prev, faceRecognition: true }));
        } catch (err) {
          console.error("Error loading FaceRecognition:", err);
          throw new Error("Failed to load face recognition model");
        }

        // Load SsdMobilenetv1 model
        try {
          await faceapi.nets.ssdMobilenetv1.loadFromUri("/model");
          setModelLoadingStatus(prev => ({ ...prev, ssdMobilenet: true }));
        } catch (err) {
          console.error("Error loading SsdMobilenetv1:", err);
          throw new Error("Failed to load face detection model");
        }

        // Load known faces from localStorage
        const savedFaces = localStorage.getItem('knownFaces');
        if (savedFaces) {
          setKnownFaces(JSON.parse(savedFaces));
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error in loadModels:", err);
        setError(err.message || "Failed to load face recognition models");
        setLoading(false);
      }
    };

    loadModels();
  }, []);

  const getLoadingStatus = () => {
    const totalModels = Object.keys(modelLoadingStatus).length;
    const loadedModels = Object.values(modelLoadingStatus).filter(status => status).length;
    return `Loading models (${loadedModels}/${totalModels})...`;
  };

  // Rest of your component code remains the same...
  const scanNewFace = async () => {
    if (!newFaceName.trim()) return;
    
    setScanning(true);
    setIsScanning(true);
    setError("");
    
    try {
      const detections = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detections) {
        const newFace = {
          name: newFaceName,
          descriptor: Array.from(detections.descriptor),
          timestamp: new Date().toISOString()
        };
        
        const updatedFaces = [...knownFaces, newFace];
        setKnownFaces(updatedFaces);
        localStorage.setItem('knownFaces', JSON.stringify(updatedFaces));
        
        setShowScanDialog(false);
        setNewFaceName("");
        setFace(`Successfully registered ${newFaceName}`);
      } else {
        setError("No face detected. Please ensure your face is clearly visible.");
      }
    } catch (err) {
      console.error("Error scanning face:", err);
      setError("Failed to scan face. Please try again.");
    }
    
    setScanning(false);
    setIsScanning(false);
  };

  const recognizeFace = async () => {
    if (knownFaces.length === 0) {
      setError("No known faces stored. Please scan a face first.");
      return;
    }

    setRecognizing(true);
    setError("");
    
    try {
      const detections = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detections) {
        // Find the best match among known faces
        let minDistance = Infinity;
        let bestMatch = null;

        knownFaces.forEach(knownFace => {
          const distance = faceapi.euclideanDistance(
            detections.descriptor,
            new Float32Array(knownFace.descriptor)
          );
          if (distance < minDistance) {
            minDistance = distance;
            bestMatch = knownFace;
          }
        });

        // Usually, distance < 0.6 is considered a good match
        if (minDistance < 0.6 && bestMatch) {
          setFace(`Welcome back, ${bestMatch.name}!`);
        } else {
          setFace("Unknown face detected");
          setShowScanDialog(true);
        }
      } else {
        setError("No face detected. Please ensure your face is clearly visible.");
      }
    } catch (err) {
      console.error("Error recognizing face:", err);
      setError("Failed to recognize face. Please try again.");
    }
    
    setRecognizing(false);
  };

  // Rest of your component code remains the same...

  return (
    <div className="p-4 bg-gray-900 rounded-3xl shadow-2xl border-2 border-blue-500">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-400">Face Recognition Status</h2>
        {loading ? (
          <p className="text-white">{getLoadingStatus()}</p>
        ) : error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <p className="text-green-400">Face recognition active</p>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={() => setShowScanDialog(true)}
            className="w-full"
            disabled={loading || !!error}
          >
            Scan New Face
          </Button>
          <Button 
            onClick={recognizeFace}
            className="w-full"
            disabled={loading || !!error || recognizing}
            variant="secondary"
          >
            {recognizing ? "Recognizing..." : "Recognize Face"}
          </Button>
        </div>

        {knownFaces.length > 0 && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-blue-400">Stored Faces: {knownFaces.length}</p>
            <div className="mt-2 text-sm text-gray-300">
              {knownFaces.map((face, index) => (
                <div key={index} className="flex justify-between items-center py-1">
                  <span>{face.name}</span>
                  <span className="text-xs">{new Date(face.timestamp).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog open={showScanDialog} onOpenChange={setShowScanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan New Face</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Input
              placeholder="Enter name"
              value={newFaceName}
              onChange={(e) => setNewFaceName(e.target.value)}
            />
            <Button 
              onClick={scanNewFace}
              disabled={scanning || !newFaceName.trim()}
              className="w-full"
            >
              {scanning ? "Scanning..." : "Scan Face"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FaceRecognizer;