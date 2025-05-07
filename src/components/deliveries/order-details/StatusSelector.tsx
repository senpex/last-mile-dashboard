
import React from 'react';
import { DeliveryStatus } from "@/types/delivery";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface StatusSelectorProps {
  status: string;
  statuses: DeliveryStatus[];
  getStatusBadgeVariant: (status: string) => string;
  getStatusColor: (statusOption: string) => string;
  onStatusChange: (status: DeliveryStatus) => void;
}

export const StatusSelector = ({
  status,
  statuses,
  getStatusBadgeVariant,
  getStatusColor,
  onStatusChange
}: StatusSelectorProps) => {
  const handleStatusChange = (newStatus: DeliveryStatus) => {
    onStatusChange(newStatus);
    toast.success(`Order status updated to ${newStatus}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className={cn(
            status === "Dropoff Complete" ? "bg-green-100 text-green-800 hover:bg-green-200" : "",
            getStatusBadgeVariant(status) === "destructive" ? "bg-red-100 text-red-800 hover:bg-red-200" : "",
            getStatusBadgeVariant(status) === "warning" ? "bg-amber-100 text-amber-800 hover:bg-amber-200" : "",
            getStatusBadgeVariant(status) === "default" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : "",
            getStatusBadgeVariant(status) === "outline" ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : "",
            "rounded-md flex items-center gap-1 py-1 px-3 h-7 justify-between font-medium"
          )}
        >
          {status}
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-1 bg-popover">
        <div className="grid gap-1">
          {statuses.map(statusOption => (
            <Button 
              key={statusOption} 
              variant="ghost" 
              size="sm" 
              className={cn(
                "justify-start text-left font-normal",
                statusOption === status ? "bg-accent text-accent-foreground" : "",
                getStatusColor(statusOption)
              )}
              onClick={() => handleStatusChange(statusOption)}
            >
              {statusOption}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
