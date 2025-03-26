
import React from 'react';
import { 
  User,
  Car as CarIcon,
  Truck,
  RefrigeratorIcon,
  PackageOpen,
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
  transportType: TransportType;
  className?: string;
}

const TransportIcon: React.FC<TransportIconProps> = ({ 
  transportType, 
  className = "", 
  size = 24,
  ...props 
}) => {
  // Ensure size is always a number
  const iconSize = Number(size);
  const iconClasses = `${className}`;
  
  switch (transportType.toLowerCase() as TransportType) {
    case 'helper':
      return <User className={`text-violet-600 ${iconClasses}`} size={iconSize} {...props} />;
    case 'car':
      return <CarIcon className={`text-blue-600 ${iconClasses}`} size={iconSize} {...props} />;
    case 'suv':
      return <CarIcon className={`text-teal-600 ${iconClasses}`} size={iconSize} {...props} />;
    case 'pickup_truck':
      return <Truck className={`text-orange-600 ${iconClasses}`} size={iconSize} {...props} />;
    case '9ft_cargo_van':
      return <Truck className={`text-blue-700 ${iconClasses}`} size={iconSize} strokeWidth={1.5} {...props} />;
    case '10ft_box_truck':
      return <Truck className={`text-red-600 ${iconClasses}`} size={iconSize} strokeWidth={1.75} {...props} />;
    case '15ft_box_truck':
      return <Truck className={`text-red-700 ${iconClasses}`} size={iconSize} strokeWidth={2} {...props} />;
    case '17ft_box_truck':
      return <Truck className={`text-red-800 ${iconClasses}`} size={iconSize} strokeWidth={2.25} {...props} />;
    case 'refrigerated_van':
      return <RefrigeratorIcon className={`text-blue-300 ${iconClasses}`} size={iconSize} {...props} />;
    default:
      return <PackageOpen className={`text-gray-500 ${iconClasses}`} size={iconSize} {...props} />;
  }
};

export default TransportIcon;
