import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaSmile,
  FaPen,
  FaModx,
  FaAccessibleIcon,
} from "react-icons/fa";
import FaceModel from "../screens/FaceModel";

const Navigation = () => {
  return (
    <div className="bg-blue-500 p-4 text-white flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <FaAccessibleIcon size={22} />
        <span className="text-lg font-bold">Logo</span>
      </div>

      {/* Routes */}
      <div className="hidden lg:flex space-x-4">
        <Link to="/" className="flex items-center">
          <FaHome className="mr-2" /> Home
        </Link>
        <Link to="/object-detect" className="flex items-center">
          <FaModx className="mr-2" /> Obj Detect
        </Link>
        <Link to="/facegen" className="flex items-center">
          <FaSmile className="mr-2" /> FaceGen
        </Link>
        <Link to="/create" className="flex items-center">
          <FaPen className="mr-2" /> Create
        </Link>
        {/* Add more links as needed */}
      </div>
    </div>
  );
};

export default Navigation;
