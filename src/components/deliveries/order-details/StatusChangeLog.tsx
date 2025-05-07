
import React from 'react';

export const StatusChangeLog = () => {
  return (
    <div className="rounded-md border bg-card/50 p-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm">Order created</span>
          <span className="text-xs text-muted-foreground">Today, 9:30 AM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Status updated to "Scheduled Order"</span>
          <span className="text-xs text-muted-foreground">Today, 9:35 AM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Status updated to "Picking Up"</span>
          <span className="text-xs text-muted-foreground">Today, 10:15 AM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Status updated to "In Transit"</span>
          <span className="text-xs text-muted-foreground">Today, 10:30 AM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Status updated to "Dropoff Complete"</span>
          <span className="text-xs text-muted-foreground">Today, 11:05 AM</span>
        </div>
      </div>
    </div>
  );
};
