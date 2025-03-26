
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
      <path d="M3,12 L3,17 L8,17 L8,8 L6,8 C4.34,8 3,9.34 3,11 L3,12z" />
      
      {/* Hood */}
      <path d="M8,8 L10,3 L14,3 L16,8" />
      
      {/* Cargo bed */}
      <path d="M8,8 L16,8 L19,11 L21,11 L21,17 L8,17 L8,8z" />
      
      {/* Wheel wells */}
      <path d="M5,14 C5,12.89 5.89,12 7,12 C8.11,12 9,12.89 9,14" strokeWidth="1" />
      <path d="M14,14 C14,12.89 14.89,12 16,12 C17.11,12 18,12.89 18,14" strokeWidth="1" />
      
      {/* Wheels */}
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
};

export default PickupTruckIcon;
