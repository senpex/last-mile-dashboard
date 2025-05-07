
import React from 'react';

export const MailingHistory = () => {
  return (
    <div className="rounded-md border bg-card/50 p-4">
      <div className="space-y-2">
        <div className="border-b pb-2">
          <p className="text-sm font-medium">Order confirmation email</p>
          <p className="text-xs text-muted-foreground">Sent to customer - Today, 10:00 AM</p>
        </div>
        <div className="border-b pb-2">
          <p className="text-sm font-medium">Pickup notification</p>
          <p className="text-xs text-muted-foreground">Sent to customer - Today, 10:15 AM</p>
        </div>
        <div>
          <p className="text-sm font-medium">Delivery confirmation</p>
          <p className="text-xs text-muted-foreground">Sent to customer - Today, 11:05 AM</p>
        </div>
      </div>
    </div>
  );
};
