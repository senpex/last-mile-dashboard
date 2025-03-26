
import React from 'react';

interface VanIconProps {
  className?: string;
  size?: number;
  color?: string;
}

const VanIcon: React.FC<VanIconProps> = ({ 
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
      {/* Van body */}
      <path d="M3,12 L3,17 L21,17 L21,8 C21,6.34 19.66,5 18,5 L6,5 C4.34,5 3,6.34 3,8 L3,12z" />
      
      {/* Front window/windshield */}
      <path d="M3,9 L7,5" />
      <path d="M21,9 L17,5" strokeWidth="1" />
      
      {/* Side door line */}
      <path d="M12,5 L12,17" strokeWidth="1" />
      
      {/* Wheels */}
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
};

export default VanIcon;
