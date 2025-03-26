
import React from 'react';

interface CargoVanIconProps {
  className?: string;
  size?: number;
  color?: string;
}

const CargoVanIcon: React.FC<CargoVanIconProps> = ({ 
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
      {/* Van body - longer for cargo */}
      <path d="M3,8 L3,17 L21,17 L21,8 C21,6.34 19.66,5 18,5 L6,5 C4.34,5 3,6.34 3,8" />
      
      {/* Front window/windshield */}
      <path d="M3,9 L7,5" />
      <path d="M21,9 L17,5" strokeWidth="1" />
      
      {/* Cargo area indicator */}
      <path d="M10,5 L10,17" strokeWidth="1" />
      <path d="M10,11 L21,11" strokeWidth="1" />
      
      {/* Wheels */}
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
};

export default CargoVanIcon;
