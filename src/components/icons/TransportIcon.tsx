
import React from 'react';
import { 
  User,
  Car as CarIcon,
  LucideProps 
} from 'lucide-react';
import PickupTruckIcon from './PickupTruckIcon';
import CargoVanIcon from './CargoVanIcon';
import BoxTruckIcon from './BoxTruckIcon';
import RefrigeratedVanIcon from './RefrigeratedVanIcon';

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
      return <PickupTruckIcon className={`text-orange-600 ${iconClasses}`} size={iconSize} {...props} />;
    case '9ft_cargo_van':
      return <CargoVanIcon className={`text-blue-700 ${iconClasses}`} size={iconSize} {...props} />;
    case '10ft_box_truck':
      return <BoxTruckIcon className={`text-red-600 ${iconClasses}`} size={iconSize} variant="10ft" {...props} />;
    case '15ft_box_truck':
      return <BoxTruckIcon className={`text-red-600 ${iconClasses}`} size={iconSize} variant="15ft" {...props} />;
    case '17ft_box_truck':
      return <BoxTruckIcon className={`text-red-600 ${iconClasses}`} size={iconSize} variant="17ft" {...props} />;
    case 'refrigerated_van':
      return <RefrigeratedVanIcon className={`text-blue-300 ${iconClasses}`} size={iconSize} {...props} />;
    default:
      return <User className={`text-gray-500 ${iconClasses}`} size={iconSize} {...props} />;
  }
};

export default TransportIcon;
