import React from 'react';

const LoadingSpinner = ({ fullPage = false }) => (
  <div className={`flex items-center justify-center ${fullPage ? 'min-h-screen' : 'py-10'}`}>
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
  </div>
);

export default LoadingSpinner;