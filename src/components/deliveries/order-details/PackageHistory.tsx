
import React from 'react';

export const PackageHistory = () => {
  return (
    <div className="rounded-md border bg-card/50 p-4">
      <div className="space-y-3">
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center mr-2">
            <span className="text-xs font-medium text-blue-700">1</span>
          </div>
          <div>
            <p className="text-sm font-medium">Package received at pickup location</p>
            <p className="text-xs text-muted-foreground">Today, 10:15 AM</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-green-100 rounded-full w-6 h-6 flex items-center justify-center mr-2">
            <span className="text-xs font-medium text-green-700">2</span>
          </div>
          <div>
            <p className="text-sm font-medium">Package in transit</p>
            <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-green-100 rounded-full w-6 h-6 flex items-center justify-center mr-2">
            <span className="text-xs font-medium text-green-700">3</span>
          </div>
          <div>
            <p className="text-sm font-medium">Package delivered to recipient</p>
            <p className="text-xs text-muted-foreground">Today, 11:05 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
};
