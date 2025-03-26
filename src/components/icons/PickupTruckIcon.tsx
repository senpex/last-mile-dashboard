
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
      {/* Cabin */}
      <path d="M4,12 L4,17 L7,17 M4,12 L8,8 L12,8 L12,17" />
      {/* Cargo bed */}
      <path d="M12,8 L16,8 L19,12 L20,17 L12,17 L12,8" />
      {/* Bottom line */}
      <path d="M3,17 L21,17" />
      {/* Wheels */}
      <circle cx="7.5" cy="17" r="2" />
      <circle cx="16.5" cy="17" r="2" />
      {/* Window */}
      <path d="M8,8 L8,12 L12,12 L12,8" />
    </svg>
  );
};

export default PickupTruckIcon;
