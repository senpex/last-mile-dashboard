
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
      {/* Van body */}
      <path d="M3,8 L3,17 L21,17 L21,12 L19,8 L3,8 Z" />
      
      {/* Windshield */}
      <path d="M3,8 L5,5 L17,5 L19,8" />
      
      {/* Side door line */}
      <line x1="12" y1="8" x2="12" y2="17" />
      
      {/* Front window */}
      <path d="M5,5 L5,8" stroke-dasharray="1" />
      
      {/* Back cargo text */}
      <text x="14.5" y="13" fontSize="3" fill={color} strokeWidth="0.2">9ft</text>
      
      {/* Wheels */}
      <circle cx="7" cy="17" r="2" fill="none" />
      <circle cx="17" cy="17" r="2" fill="none" />
    </svg>
  );
};

export default CargoVanIcon;
