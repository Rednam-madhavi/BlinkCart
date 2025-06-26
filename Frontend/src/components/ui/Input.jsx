import React from 'react';
import clsx from 'clsx';

const Input = ({
  label,
  id,
  className = '',
  inputClassName = '',
  type = 'text',
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={clsx('flex flex-col space-y-1', className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={clsx(
          'px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          'disabled:bg-gray-100 disabled:cursor-not-allowed',
          inputClassName
        )}
        {...props}
      />
    </div>
  );
};

export default Input;
