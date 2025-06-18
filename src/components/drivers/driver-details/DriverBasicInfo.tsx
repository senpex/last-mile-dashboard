
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface DriverBasicInfoProps {
  driver: any;
  renderStatus: (status: string) => React.ReactNode;
  renderStripeStatus: (status: 'verified' | 'unverified' | 'pending') => React.ReactNode;
}

export const DriverBasicInfo: React.FC<DriverBasicInfoProps> = ({
  driver,
  renderStatus,
  renderStripeStatus
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="driver-name">Name</Label>
            <Input id="driver-name" value={driver?.name || ''} readOnly />
          </div>
          <div>
            <Label htmlFor="driver-email">Email</Label>
            <Input id="driver-email" value={driver?.email || ''} readOnly />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="driver-phone">Phone</Label>
            <Input id="driver-phone" value={driver?.phone || ''} readOnly />
          </div>
          <div>
            <Label htmlFor="driver-zipcode">Zipcode</Label>
            <Input id="driver-zipcode" value={driver?.zipcode || ''} readOnly />
          </div>
        </div>
        
        <div>
          <Label htmlFor="driver-address">Address</Label>
          <Input id="driver-address" value={driver?.address || ''} readOnly />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Status</Label>
            <div className="mt-2">
              {driver?.status && renderStatus(driver.status)}
            </div>
          </div>
          <div>
            <Label>Stripe Status</Label>
            <div className="mt-2">
              {driver?.stripeStatus && renderStripeStatus(driver.stripeStatus)}
            </div>
          </div>
        </div>
        
        <div>
          <Label>Profile Types</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {driver?.profileTypes?.map((type: string, index: number) => (
              <Badge key={index} variant="secondary">
                {type}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <Label htmlFor="driver-rating">Rating</Label>
          <Input id="driver-rating" value={driver?.rating ? `${driver.rating.toFixed(1)} ⭐` : ''} readOnly />
        </div>
      </CardContent>
    </Card>
  );
};
