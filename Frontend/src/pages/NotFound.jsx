import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-[89vh] flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="flex items-center justify-center mb-4 animate-bounce">
        <FiAlertTriangle className="text-blue-600 w-12 h-12" />
      </div>
      <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-600">404</h1>
      <h2 className="text-xl sm:text-2xl mt-2 font-semibold text-gray-800">
        Page Not Found
      </h2>
      <p className="text-gray-500 mt-2 max-w-md">
        The page you're looking for doesn’t exist or may have been moved.
      </p>
      <Link
        to="/"
        aria-label="Go back to home"
        className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition"
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
