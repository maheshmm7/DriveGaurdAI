import React from "react";

const DrowsinessDetection = ({ videoRef, face, canvasRef, status, eyeStates, isScanning }) => {
  return (
    <div className="relative w-full max-w-4xl p-8 bg-gray-900 rounded-3xl shadow-2xl border-2 border-blue-500">
      <div className="relative">
        <video 
          ref={videoRef} 
          autoPlay 
          className="w-full h-auto rounded-lg shadow-lg border-2 border-blue-500" 
          width="640" 
          height="480"
        />
        <canvas ref={canvasRef} width="640" height="480" hidden />
        {isScanning && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <p className="text-white text-2xl">Scanning Mode Active</p>
          </div>
        )}
      </div>

      {!isScanning && (
        <div className="mt-8 grid grid-cols-2 gap-8">
          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg text-center border-2 border-blue-500">
            <p className="text-xl font-semibold text-blue-400">Status</p>
            <p className={`text-2xl mt-2 ${status === "Drowsy" ? "text-red-500" : "text-green-400"}`}>
              {status}
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg text-center border-2 border-blue-500">
            <p className="text-xl font-semibold text-blue-400">Eye States</p>
            <p className="mt-2 text-lg">
              👀 Left Eye: <span className={eyeStates[0] === "Close" ? "text-red-500" : "text-green-400"}>
                {eyeStates[0]}
              </span>
            </p>
            <p className="text-lg">
              👀 Right Eye: <span className={eyeStates[1] === "Close" ? "text-red-500" : "text-green-400"}>
                {eyeStates[1]}
              </span>
            </p>
            <p className="mt-2 text-blue-400">Face Status: {face}</p>         
          </div>
        </div>
      )}
    </div>
  );
};

export default DrowsinessDetection;
