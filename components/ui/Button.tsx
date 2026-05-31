import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className="w-full bg-neutral-900 text-white text-xs uppercase tracking-widest py-4 hover:bg-neutral-800 transition-colors duration-300 font-medium"
        >
            {children}
        </button>
    );
}

