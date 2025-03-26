
import React from 'react';

interface LimousineIconProps {
  className?: string;
  size?: number;
  color?: string;
}

const LimousineIcon: React.FC<LimousineIconProps> = ({ 
  className = "", 
  size = 24, 
  color = "currentColor" 
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Long car body */}
      <rect x="2" y="9" width="20" height="6" rx="1" />
      
      {/* Roof */}
      <path d="M4,9 L4,6 L20,6 L20,9" />
      
      {/* Windows (vertical lines) */}
      <path d="M6,6 L6,9" strokeWidth="1" />
      <path d="M10,6 L10,9" strokeWidth="1" />
      <path d="M14,6 L14,9" strokeWidth="1" />
      <path d="M18,6 L18,9" strokeWidth="1" />
      
      {/* Wheels */}
      <circle cx="6" cy="15" r="2" />
      <circle cx="18" cy="15" r="2" />
    </svg>
  );
};

export default LimousineIcon;
