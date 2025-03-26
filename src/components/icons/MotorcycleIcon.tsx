
import React from 'react';

interface MotorcycleIconProps {
  className?: string;
  size?: number;
  color?: string;
}

const MotorcycleIcon: React.FC<MotorcycleIconProps> = ({ 
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
      <path d="M5 16l-3 6h2l2-4" />
      <path d="M5.5 12H10l4 4.5V20" />
      <path d="M14 12h1.5a3.5 3.5 0 0 0 0-7h-3L16 12" />
      <circle cx="5" cy="15" r="1" />
      <circle cx="18" cy="15" r="1" />
    </svg>
  );
};

export default MotorcycleIcon;
