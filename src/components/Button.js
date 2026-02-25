import React from 'react';
import './Button.css';


const Button = ({ 
  children, 
  variant = 'primary', 
  disabled = false, 
  onClick, 
  type = 'button',
  className = '',
  ...props 
}) => {
  const buttonClass = `btn btn-${variant} ${className}`.trim();
  
  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
