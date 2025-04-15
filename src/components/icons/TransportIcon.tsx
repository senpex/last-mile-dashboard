
import React from 'react';
import { 
  User,
  Car as CarIcon,
  Truck,
  RefrigeratorIcon,
  PackageOpen,
  Bus,
  AlertCircle,
  LucideProps 
} from 'lucide-react';

export type TransportType = 
  | 'helper'
  | 'car'
  | 'suv'
  | 'pickup_truck'
  | '9ft_cargo_van'
  | '10ft_box_truck'
  | '15ft_box_truck'
  | '17ft_box_truck'
  | 'refrigerated_van';

interface TransportIconProps extends Omit<LucideProps, 'ref'> {
  transportType?: TransportType;
  className?: string;
  // Make type optional
  type?: TransportType; // Add for backward compatibility
}

const TransportIcon: React.FC<TransportIconProps> = ({ 
  transportType, 
  type, // Support both transportType and type props
  className = "", 
  size = 24,
  ...props 
}) => {
  // Ensure size is always a number
  const iconSize = typeof size === 'string' ? parseInt(size, 10) : size;
  const iconClasses = `${className}`;
  
  // Use transportType or type, with a fallback to prevent the toLowerCase error
  const iconType = (transportType || type || 'car').toLowerCase() as TransportType;
  
  switch (iconType) {
    case 'helper':
      return <User className={`text-violet-600 ${iconClasses}`} size={iconSize} {...props} />;
    case 'car':
      return <CarIcon className={`text-blue-600 ${iconClasses}`} size={iconSize} {...props} />;
    case 'suv':
      return <CarIcon className={`text-teal-600 ${iconClasses}`} size={iconSize} {...props} />;
    case 'pickup_truck':
      return <Truck className={`text-orange-600 ${iconClasses}`} size={iconSize} {...props} />;
    case '9ft_cargo_van':
      return <Truck className={`text-blue-700 ${iconClasses}`} size={iconSize} {...props} />;
    case '10ft_box_truck':
      return <Truck className={`text-red-600 ${iconClasses}`} size={iconSize} {...props} />;
    case '15ft_box_truck':
      return <Truck className={`text-red-700 ${iconClasses}`} size={iconSize} {...props} />;
    case '17ft_box_truck':
      return <Truck className={`text-red-800 ${iconClasses}`} size={iconSize} {...props} />;
    case 'refrigerated_van':
      return <RefrigeratorIcon className={`text-blue-300 ${iconClasses}`} size={iconSize} {...props} />;
    default:
      return <PackageOpen className={`text-gray-500 ${iconClasses}`} size={iconSize} {...props} />;
  }
};

export default TransportIcon;
