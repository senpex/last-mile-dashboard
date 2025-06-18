
import React from 'react';

interface DriverVehicleInfoProps {
  driver: any;
}

export const DriverVehicleInfo: React.FC<DriverVehicleInfoProps> = ({ driver }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Vehicle Type</label>
          <div className="mt-1 text-sm text-gray-900">{driver.vehicleType}</div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Vehicle Make</label>
          <div className="mt-1 text-sm text-gray-900">{driver.vehicleMake}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Vehicle Model</label>
          <div className="mt-1 text-sm text-gray-900">{driver.vehicleModel}</div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Vehicle Year</label>
          <div className="mt-1 text-sm text-gray-900">{driver.vehicleYear}</div>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">License Plate</label>
        <div className="mt-1 text-sm text-gray-900">{driver.licensePlate}</div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Vehicle Color</label>
        <div className="mt-1 text-sm text-gray-900">{driver.vehicleColor}</div>
      </div>
    </div>
  );
};
