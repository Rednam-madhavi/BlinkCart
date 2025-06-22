import React from 'react';
import clsx from 'clsx';

const Button = ({ children, className, ...props }) => {
    return (
        <button
            className={clsx(
                'px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;

