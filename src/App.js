import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FaceModel from "./screens/FaceModel";
import HomeScreen from "./screens/HomeScreen";
import Navigation from "./header/Navigation";
import bgImage from "./assets/bg-AI.webp";
import FaceRecognition from "./screens/FaceRecognition";
import ObjectDetect from "./screens/ObjectDetect";

function App() {
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // State to store the dynamically generated background color
  const [bgColor, setBgColor] = useState(generateRandomColor());

  // Effect to change the background color whenever the component mounts
  useEffect(() => {
    setBgColor(generateRandomColor());
  }, []);
  return (
    <div
      style={{
        backgroundColor: bgImage,
        minHeight: "100vh",
        overflow: "hidden",
      }}
      className="object-cover"
    >
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route exact path="/face" element={<FaceRecognition />} />
          <Route exact path="/object-detect" element={<ObjectDetect />} />

          {/* Add more routes and components as needed */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
