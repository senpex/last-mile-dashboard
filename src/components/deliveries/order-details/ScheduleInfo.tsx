
import React from 'react';
import { Clock } from "lucide-react";

interface ScheduleInfoProps {
  pickupTime: string;
  dropoffTime: string;
}

export const ScheduleInfo = ({ pickupTime, dropoffTime }: ScheduleInfoProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3 flex items-center">
        <Clock className="w-4 h-4 mr-2" />
        Schedule
      </h3>
      <div className="rounded-md border bg-card/50 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="w-full">
            <h4 className="text-xs text-muted-foreground mb-2">Pickup Window</h4>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Start:</span> {pickupTime}
              <span className="font-medium ml-4">End:</span> 
              {/* Simulate end time 30 minutes after pickup time */}
              {pickupTime.replace(/:(\d\d)/, (match, minutes) => {
                const mins = parseInt(minutes) + 30;
                return `:${mins >= 60 ? (mins - 60).toString().padStart(2, '0') : mins.toString().padStart(2, '0')}`;
              })}
            </div>
          </div>
          
          <div className="w-full">
            <h4 className="text-xs text-muted-foreground mb-2">Dropoff Window</h4>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Start:</span> {dropoffTime}
              <span className="font-medium ml-4">End:</span>
              {/* Simulate end time 30 minutes after dropoff time */}
              {dropoffTime.replace(/:(\d\d)/, (match, minutes) => {
                const mins = parseInt(minutes) + 30;
                return `:${mins >= 60 ? (mins - 60).toString().padStart(2, '0') : mins.toString().padStart(2, '0')}`;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
