
import React from 'react';

interface BoxTruckIconProps {
  className?: string;
  size?: number;
  color?: string;
  variant?: '10ft' | '15ft' | '17ft';
}

const BoxTruckIcon: React.FC<BoxTruckIconProps> = ({ 
  className = "", 
  size = 24, 
  color = "currentColor",
  variant = '10ft'
}) => {
  // Adjust box width based on truck size
  const boxScale = variant === '10ft' ? 1 : variant === '15ft' ? 1.3 : 1.5;
  
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
      {/* Cabin */}
      <path d="M3,9 L3,17 L7,17 L7,9 C7,8 6,7 5,7 C4,7 3,8 3,9" />
      
      {/* Box body - scaled based on variant */}
      <rect x="7" y="7" width={7 * boxScale} height="10" />
      
      {/* Wheels */}
      <circle cx="5" cy="17" r="2" />
      <circle cx={7 + (5 * boxScale)} cy="17" r="2" />
      
      {/* Rear door indicator */}
      <path d={`M${7 + (7 * boxScale)},9 L${7 + (7 * boxScale)},15`} strokeWidth="1" />
    </svg>
  );
};

export default BoxTruckIcon;
