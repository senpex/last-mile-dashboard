
import React from 'react';
import { MapPin, CheckCircle2, Clock } from "lucide-react";

interface AdditionalLocationProps {
  name: string;
  address: string;
  description: string;
  distance: string;
  status: string;
  deliveredAt: string;
}

export const AdditionalLocation = ({
  name,
  address,
  description,
  distance,
  status,
  deliveredAt
}: AdditionalLocationProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-600';
      case 'in progress':
        return 'text-blue-600';
      case 'pending':
        return 'text-amber-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'in progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="rounded-md border bg-card/50 p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
          <h4 className="text-sm font-medium">{name}</h4>
        </div>
        <div className="flex items-center">
          {getStatusIcon(status)}
          <span className={`text-xs font-medium ml-1 ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-2">{address}</p>
      <p className="text-xs text-muted-foreground mb-2">{description}</p>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Distance: {distance}</span>
        <span>Delivered: {deliveredAt}</span>
      </div>
    </div>
  );
};
