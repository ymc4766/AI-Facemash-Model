import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemash from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import { drawMesh } from "../utils/utilties";

// in dep and import
//set webcam
// define refrences
// load facemash
// detect fn
// drwing utilities
//set up triangle path
// set drowing point
// Add drawmesh to detect fn

const FaceModel = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runfacemash = async () => {
    const res = await facemash.load({
      inputResolution: { width: 640, height: 550 },
      scale: 0.8,
    });

    setInterval(() => {
      detect(res);
    }, 1000);
  };

  // detect fn

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // get video propertys
      // set video width
      // set canvas width , make detection , get canvas contextfor drwing

      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      //   const faces = await net.estimateFaces(video);
      //   console.log("detect", faces);

      //   const ctx = canvasRef.current.getContext("2d");
      //   drawMesh(faces, ctx);
      const ctx = canvasRef.current.getContext("2d");
      const faces = await net?.estimateFaces(video);

      // Clear canvas before drawing
      ctx.clearRect(0, 0, videoWidth, videoHeight);

      // Draw face mesh on the canvas
      drawMesh(faces, ctx);
    }
  };

  runfacemash();
  return (
    <div className=" py-3">
      <Webcam
        ref={webcamRef}
        className="absolute ml-auto mr-auto h-screen items-center left-0 right-0 justify-center z-30 w-[600px]"
      />
      <canvas
        className="absolute ml-auto mr-auto h-screen items-center left-0 right-0 
        z-50 w-[600px]"
        ref={canvasRef}
      />
    </div>
  );
};

export default FaceModel;
