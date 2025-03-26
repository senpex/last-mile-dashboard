
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
      <path d="M4,8 L8,8 L8,17 L4,17 L4,8 Z" />
      
      {/* Cargo bed */}
      <path d="M10,8 L18,8 L20,12 L20,17 L10,17 L10,8 Z" />
      
      {/* Bottom line */}
      <line x1="3" y1="17" x2="21" y2="17" />
      
      {/* Windshield */}
      <line x1="6" y1="8" x2="6" y2="12" />
      
      {/* Wheels */}
      <circle cx="7" cy="17" r="2" fill="none" />
      <circle cx="17" cy="17" r="2" fill="none" />
    </svg>
  );
};

export default PickupTruckIcon;
