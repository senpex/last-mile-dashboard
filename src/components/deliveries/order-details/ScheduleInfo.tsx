
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
  const [editedPickupDate, setEditedPickupDate] = useState('2024-06-03');
  const [editedDropoffDate, setEditedDropoffDate] = useState('2024-06-03');

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
    setEditedPickupDate('2024-06-03');
    setEditedDropoffDate('2024-06-03');
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
                <div className="flex gap-2">
                  <Input 
                    value={editedPickupDate} 
                    onChange={(e) => setEditedPickupDate(e.target.value)}
                    className="h-6 w-28 text-sm"
                    type="date"
                  />
                  <Input 
                    value={editedPickupTime} 
                    onChange={(e) => setEditedPickupTime(e.target.value)}
                    className="h-6 w-20 text-sm"
                    type="time"
                  />
                </div>
              ) : (
                <span>{editedPickupDate} {editedPickupTime}</span>
              )}
              <span className="font-medium ml-4">End:</span> 
              {isEditing ? (
                <div className="flex gap-2">
                  <Input 
                    value={editedPickupDate} 
                    onChange={(e) => setEditedPickupDate(e.target.value)}
                    className="h-6 w-28 text-sm"
                    type="date"
                  />
                  <span className="text-sm">{calculateEndTime(editedPickupTime)}</span>
                </div>
              ) : (
                <span>{editedPickupDate} {calculateEndTime(editedPickupTime)}</span>
              )}
            </div>
          </div>
          
          <div className="w-full">
            <h4 className="text-xs text-muted-foreground mb-2">Dropoff Window</h4>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Start:</span>
              {isEditing ? (
                <div className="flex gap-2">
                  <Input 
                    value={editedDropoffDate} 
                    onChange={(e) => setEditedDropoffDate(e.target.value)}
                    className="h-6 w-28 text-sm"
                    type="date"
                  />
                  <Input 
                    value={editedDropoffTime} 
                    onChange={(e) => setEditedDropoffTime(e.target.value)}
                    className="h-6 w-20 text-sm"
                    type="time"
                  />
                </div>
              ) : (
                <span>{editedDropoffDate} {editedDropoffTime}</span>
              )}
              <span className="font-medium ml-4">End:</span>
              {isEditing ? (
                <div className="flex gap-2">
                  <Input 
                    value={editedDropoffDate} 
                    onChange={(e) => setEditedDropoffDate(e.target.value)}
                    className="h-6 w-28 text-sm"
                    type="date"
                  />
                  <span className="text-sm">{calculateEndTime(editedDropoffTime)}</span>
                </div>
              ) : (
                <span>{editedDropoffDate} {calculateEndTime(editedDropoffTime)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
