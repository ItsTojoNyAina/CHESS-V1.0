import React from 'react';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost';
}> = ({ children, className = "", variant = "default", ...props }) => {
  const baseStyle = "px-4 py-2 rounded-full font-medium transition-colors";
  const variantStyles = {
    default: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-red-500 text-red-500 hover:bg-red-50",
    ghost: "text-white hover:bg-white/10",
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
