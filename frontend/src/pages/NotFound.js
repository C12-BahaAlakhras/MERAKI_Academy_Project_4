import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white text-black text-center">
      <div>
        <h1 className="text-7xl font-bold mb-6">404</h1>
        <p className="text-xl mb-8">
          Oops! The page you are looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="text-lg font-medium text-black border border-black px-6 py-2 rounded-md hover:bg-gray-100 transition duration-300"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
