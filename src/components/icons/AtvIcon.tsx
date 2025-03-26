
import React from 'react';

interface AtvIconProps {
  className?: string;
  size?: number;
  color?: string;
}

const AtvIcon: React.FC<AtvIconProps> = ({ 
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
      {/* ATV body */}
      <rect x="7" y="7" width="10" height="5" rx="1" />
      
      {/* Handlebars */}
      <path d="M5,9 L7,9" />
      <path d="M17,9 L19,9" />
      
      {/* Wheels - bigger than normal */}
      <circle cx="5" cy="15" r="3" />
      <circle cx="19" cy="15" r="3" />
      
      {/* Front wheel connection */}
      <path d="M5,12 L5,9" />
      <path d="M19,12 L19,9" />
      
      {/* Seat */}
      <path d="M10,7 L14,7" strokeWidth="3" />
    </svg>
  );
};

export default AtvIcon;
