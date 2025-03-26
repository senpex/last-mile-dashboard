
import React from 'react';

interface PickupTruckIconProps {
  className?: string;
  size?: number;
  color?: string;
}

const PickupTruckIcon: React.FC<PickupTruckIconProps> = ({ 
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
      {/* Base of the pickup truck */}
      <path d="M3,12 L3,17 L6,17 M21,17 L18,17" />
      {/* Cabin */}
      <path d="M3,12 L8,7 L12,7 L12,17" />
      {/* Cargo bed */}
      <path d="M12,12 L20,12 L21,17 L12,17 L12,12" />
      {/* Wheels */}
      <circle cx="7.5" cy="17" r="1.5" />
      <circle cx="16.5" cy="17" r="1.5" />
    </svg>
  );
};

export default PickupTruckIcon;
