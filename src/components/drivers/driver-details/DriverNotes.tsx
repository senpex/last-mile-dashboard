
import React from 'react';

interface DriverNotesProps {
  driver: any;
}

export const DriverNotes: React.FC<DriverNotesProps> = ({ driver }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Internal Notes</label>
        <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-900">
          {driver.notes || 'No notes available'}
        </div>
      </div>
    </div>
  );
};
