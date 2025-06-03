
import React from 'react';

interface CourierInfoProps {
  courier: string | undefined;
  status?: string;
  onStatusChange?: (newStatus: any) => void;
}

export const CourierInfo = ({ courier, status, onStatusChange }: CourierInfoProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Courier Information</h3>
      <div className="rounded-md border bg-card/50 p-4">
        <div className="flex justify-between mb-2">
          <p className="text-sm">Courier</p>
          <p className="text-sm font-medium">{courier || "Not assigned"}</p>
        </div>
        {status && (
          <div className="flex justify-between">
            <p className="text-sm">Status</p>
            <p className="text-sm font-medium">{status}</p>
          </div>
        )}
      </div>
    </div>
  );
};
