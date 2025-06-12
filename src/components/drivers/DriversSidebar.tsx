
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from 'lucide-react';

export interface DriversSidebarProps {
  // Add any specific props if needed in the future
}

export const DriversSidebar: React.FC<DriversSidebarProps> = () => {
  return (
    <div className="w-80 space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Drivers Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Drivers</span>
              <span className="font-medium">54</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Available</span>
              <span className="font-medium text-green-600">32</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Busy</span>
              <span className="font-medium text-yellow-600">15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Offline</span>
              <span className="font-medium text-red-600">7</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
