import React, { useEffect, useRef } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";

const ObjectDetect = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runcoco = async () => {
    const net = await cocossd.load();

    setInterval(() => {
      detect(net);
    }, 100);
  };

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

      const obj = await net.detect(video);
      console.log("obj", obj);

      const ctx = canvasRef.current.getContext("2d");
      //   const faces = await net?.estimateFaces(video);

      // Clear canvas before drawing

      // Draw face mesh on the canvas
    }
  };

  useEffect(() => {
    runcoco();
  });

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

export default ObjectDetect;
