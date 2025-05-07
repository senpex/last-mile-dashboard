
import React from 'react';

export const ChatHistory = () => {
  return (
    <div className="rounded-md border bg-card/50 p-4">
      <div className="space-y-3">
        <div className="bg-muted rounded-lg p-2">
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium">Driver</span>
            <span className="text-xs text-muted-foreground">10:20 AM</span>
          </div>
          <p className="text-sm">I've arrived at the pickup location.</p>
        </div>
        
        <div className="bg-primary/10 rounded-lg p-2 ml-4">
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium">Customer</span>
            <span className="text-xs text-muted-foreground">10:22 AM</span>
          </div>
          <p className="text-sm">Great! I'll be down in 2 minutes.</p>
        </div>
        
        <div className="bg-muted rounded-lg p-2">
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium">Driver</span>
            <span className="text-xs text-muted-foreground">10:55 AM</span>
          </div>
          <p className="text-sm">I'm at the dropoff location now.</p>
        </div>
        
        <div className="bg-primary/10 rounded-lg p-2 ml-4">
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium">Customer</span>
            <span className="text-xs text-muted-foreground">10:56 AM</span>
          </div>
          <p className="text-sm">Perfect timing! I'll meet you at the lobby.</p>
        </div>
      </div>
    </div>
  );
};
