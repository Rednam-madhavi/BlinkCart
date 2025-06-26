import React from 'react';
import clsx from 'clsx';

const Button = ({
    children,
    className,
    type = "button",
    disabled = false,
    ...props
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={clsx(
                'inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium',
                'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1',
                'disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
