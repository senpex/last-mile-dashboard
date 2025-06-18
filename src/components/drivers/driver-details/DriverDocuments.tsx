
import React from 'react';
import { Badge } from "../../ui/badge";

interface DriverDocumentsProps {
  driver: any;
}

export const DriverDocuments: React.FC<DriverDocumentsProps> = ({ driver }) => {
  return (
    <div className="space-y-4">
      {driver.documents?.map((doc: any, index: number) => (
        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex-1">
            <div className="font-medium text-sm">{doc.name}</div>
            <div className="text-xs text-gray-500">{doc.type} • Uploaded {doc.uploadDate}</div>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={doc.status === 'approved' ? 'default' : doc.status === 'pending' ? 'secondary' : 'destructive'}
            >
              {doc.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};
