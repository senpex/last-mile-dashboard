
import React from 'react';

interface ShuttleIconProps {
  className?: string;
  size?: number;
  color?: string;
}

const ShuttleIcon: React.FC<ShuttleIconProps> = ({ 
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
      <path d="M3 6h18v10H3z" />
      <path d="M3 16h18" />
      <path d="M8 6v10" />
      <path d="M16 6v10" />
      <path d="M12 6v10" />
      <path d="M4 3v3" />
      <path d="M20 3v3" />
      <path d="M5 16v2" />
      <path d="M19 16v2" />
    </svg>
  );
};

export default ShuttleIcon;
