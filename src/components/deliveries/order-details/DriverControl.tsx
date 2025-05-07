
import React from 'react';

export const DriverControl = () => {
  return (
    <div className="rounded-md border bg-card/50 p-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm">Driver assigned</span>
          <span className="text-xs text-muted-foreground">Today, 10:05 AM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Driver arrived at pickup</span>
          <span className="text-xs text-muted-foreground">Today, 10:15 AM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Driver in transit</span>
          <span className="text-xs text-muted-foreground">Today, 10:30 AM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Driver arrived at dropoff</span>
          <span className="text-xs text-muted-foreground">Today, 11:00 AM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Delivery confirmed</span>
          <span className="text-xs text-muted-foreground">Today, 11:05 AM</span>
        </div>
      </div>
    </div>
  );
};
