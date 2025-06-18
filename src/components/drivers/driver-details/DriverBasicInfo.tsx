
import React from 'react';

interface DriverBasicInfoProps {
  driver: any;
}

export const DriverBasicInfo: React.FC<DriverBasicInfoProps> = ({ driver }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">First Name</label>
          <div className="mt-1 text-sm text-gray-900">{driver.firstName}</div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Last Name</label>
          <div className="mt-1 text-sm text-gray-900">{driver.lastName}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1 text-sm text-gray-900">{driver.email}</div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <div className="mt-1 text-sm text-gray-900">{driver.phone}</div>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Address</label>
        <div className="mt-1 text-sm text-gray-900">{driver.address}</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">City</label>
          <div className="mt-1 text-sm text-gray-900">{driver.city}</div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">State</label>
          <div className="mt-1 text-sm text-gray-900">{driver.state}</div>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">ZIP Code</label>
        <div className="mt-1 text-sm text-gray-900">{driver.zipCode}</div>
      </div>
    </div>
  );
};
