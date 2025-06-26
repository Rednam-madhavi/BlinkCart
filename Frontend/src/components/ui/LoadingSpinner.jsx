import React from 'react';
import clsx from 'clsx';

const LoadingSpinner = ({ fullPage = false, size = 12 }) => (
  <div
    className={clsx(
      'flex items-center justify-center',
      fullPage ? 'min-h-screen' : 'py-10'
    )}
    role="status"
    aria-label="Loading"
  >
    <div
      className={clsx(
        'animate-spin rounded-full border-t-2 border-b-2 border-indigo-600',
        `h-${size} w-${size}`
      )}
    />
    <span className="sr-only">Loading...</span>
  </div>
);

export default LoadingSpinner;
