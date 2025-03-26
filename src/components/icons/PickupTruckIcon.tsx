
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
      <path d="M3,17 L3,12 L7,8 L10,8 L10,17" />
      
      {/* Cargo bed */}
      <path d="M10,8 L14,8 L19,12 L19,17" />
      
      {/* Connecting the parts */}
      <line x1="3" y1="17" x2="19" y2="17" />
      
      {/* Front windshield */}
      <line x1="7" y1="8" x2="7" y2="12" />
      <line x1="7" y1="12" x2="10" y2="12" />
      <line x1="10" y1="8" x2="10" y2="12" />
      
      {/* Wheels */}
      <circle cx="6" cy="17" r="2" />
      <circle cx="16" cy="17" r="2" />
    </svg>
  );
};

export default PickupTruckIcon;
