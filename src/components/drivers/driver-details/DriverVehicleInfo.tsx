
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";

interface DriverVehicleInfoProps {
  driver: any;
  transportTypes: { [key: string]: string };
}

export const DriverVehicleInfo: React.FC<DriverVehicleInfoProps> = ({
  driver,
  transportTypes
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Transport Types</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {driver?.transports?.map((transportId: string, index: number) => {
              const transportName = transportTypes[transportId] || `Transport ${transportId}`;
              return (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  <TransportIcon 
                    transportType={transportId as TransportType} 
                    size={14} 
                    className="h-[14px] w-[14px]" 
                  />
                  {transportName}
                </Badge>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
