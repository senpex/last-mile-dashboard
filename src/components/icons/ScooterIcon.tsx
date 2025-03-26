
import React from 'react';

interface ScooterIconProps {
  className?: string;
  size?: number;
  color?: string;
}

const ScooterIcon: React.FC<ScooterIconProps> = ({ 
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
      {/* Handlebar post */}
      <line x1="12" y1="3" x2="12" y2="10" />
      
      {/* Foot platform */}
      <line x1="8" y1="15" x2="16" y2="15" strokeWidth="3" />
      
      {/* Handlebars */}
      <path d="M10,5 L14,5" />
      
      {/* Front wheel connection */}
      <path d="M12,10 L8,15" />
      
      {/* Wheels */}
      <circle cx="6" cy="17" r="2" />
      <circle cx="18" cy="17" r="2" />
      
      {/* Back wheel connection */}
      <path d="M18,15 L18,17" />
    </svg>
  );
};

export default ScooterIcon;
