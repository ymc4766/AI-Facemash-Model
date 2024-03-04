// FaceRecognition.js
import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as faceapi from "face-api.js";

const FaceRecognition = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Error accessing camera:", err));
    };

    const detectFace = async () => {
      const video = videoRef.current;
      const canvas = faceapi.createCanvasFromMedia(video);
      document.body.append(canvas);

      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      }, 100);
    };

    const initializeFaceRecognition = async () => {
      await tf.setBackend("webgl");
      await tf.ready();
      await loadModels();
      startVideo();
      detectFace();
    };

    initializeFaceRecognition();
  }, []);

  return (
    <div className="mt-3">
      <h1>Face FaceRecognition Model</h1>
      <video ref={videoRef} autoPlay muted></video>
    </div>
  );
};

export default FaceRecognition;
