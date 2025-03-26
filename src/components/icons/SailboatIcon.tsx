
import React from 'react';

interface SailboatIconProps {
  className?: string;
  size?: number;
  color?: string;
}

const SailboatIcon: React.FC<SailboatIconProps> = ({ 
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
      <path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z" />
      <path d="M21 18c0-1.87-1.5-6-9-6-7.5 0-9 4.13-9 6" />
      <path d="M12 2v16" />
      <path d="M4 11s1.5-5 8-5 8 5 8 5" />
    </svg>
  );
};

export default SailboatIcon;
