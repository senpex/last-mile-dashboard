
import React, { useState } from 'react';
import { Clock, Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ScheduleInfoProps {
  pickupTime: string;
  dropoffTime: string;
}

export const ScheduleInfo = ({ pickupTime, dropoffTime }: ScheduleInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPickupTime, setEditedPickupTime] = useState(pickupTime);
  const [editedDropoffTime, setEditedDropoffTime] = useState(dropoffTime);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Schedule updated successfully");
  };

  const handleCancel = () => {
    setEditedPickupTime(pickupTime);
    setEditedDropoffTime(dropoffTime);
    setIsEditing(false);
  };

  const calculateEndTime = (startTime: string) => {
    return startTime.replace(/:(\d\d)/, (match, minutes) => {
      const mins = parseInt(minutes) + 30;
      return `:${mins >= 60 ? (mins - 60).toString().padStart(2, '0') : mins.toString().padStart(2, '0')}`;
    });
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-3 flex items-center justify-between">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          Schedule
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs flex items-center gap-1"
                onClick={handleSave}
              >
                <Save className="h-3 w-3" />
                Save
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs flex items-center gap-1"
                onClick={handleCancel}
              >
                <X className="h-3 w-3" />
                Cancel
              </Button>
            </>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs flex items-center gap-1"
              onClick={handleEdit}
            >
              <Edit className="h-3 w-3" />
              Edit
            </Button>
          )}
        </div>
      </h3>
      <div className="rounded-md border bg-card/50 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="w-full">
            <h4 className="text-xs text-muted-foreground mb-2">Pickup Window</h4>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Start:</span> 
              {isEditing ? (
                <Input 
                  value={editedPickupTime} 
                  onChange={(e) => setEditedPickupTime(e.target.value)}
                  className="h-6 w-20 text-sm"
                  type="time"
                />
              ) : (
                editedPickupTime
              )}
              <span className="font-medium ml-4">End:</span> 
              {calculateEndTime(isEditing ? editedPickupTime : editedPickupTime)}
            </div>
          </div>
          
          <div className="w-full">
            <h4 className="text-xs text-muted-foreground mb-2">Dropoff Window</h4>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Start:</span>
              {isEditing ? (
                <Input 
                  value={editedDropoffTime} 
                  onChange={(e) => setEditedDropoffTime(e.target.value)}
                  className="h-6 w-20 text-sm"
                  type="time"
                />
              ) : (
                editedDropoffTime
              )}
              <span className="font-medium ml-4">End:</span>
              {calculateEndTime(isEditing ? editedDropoffTime : editedDropoffTime)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
