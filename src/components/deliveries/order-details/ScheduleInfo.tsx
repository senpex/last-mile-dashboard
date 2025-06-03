
import React, { useState } from 'react';
import { Clock, Edit, Save, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

interface ScheduleInfoProps {
  pickupTime: string;
  dropoffTime: string;
}

export const ScheduleInfo = ({ pickupTime, dropoffTime }: ScheduleInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPickupTime, setEditedPickupTime] = useState(pickupTime);
  const [editedDropoffTime, setEditedDropoffTime] = useState(dropoffTime);
  const [isPickupDialogOpen, setIsPickupDialogOpen] = useState(false);
  const [isDropoffDialogOpen, setIsDropoffDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState("12:00");

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

  // Generate time options
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeOptions.push(timeString);
    }
  }

  const handlePickupTimeUpdate = () => {
    const formattedDateTime = `${format(selectedDate, 'MM/dd/yyyy')} ${selectedTime}`;
    setEditedPickupTime(formattedDateTime);
    setIsPickupDialogOpen(false);
  };

  const handleDropoffTimeUpdate = () => {
    const formattedDateTime = `${format(selectedDate, 'MM/dd/yyyy')} ${selectedTime}`;
    setEditedDropoffTime(formattedDateTime);
    setIsDropoffDialogOpen(false);
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
                <Dialog open={isPickupDialogOpen} onOpenChange={setIsPickupDialogOpen}>
                  <DialogTrigger asChild>
                    <div className="border rounded px-2 py-1 cursor-pointer hover:bg-gray-50 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {editedPickupTime}
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Select Pickup Date & Time</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        className="rounded-md border"
                      />
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={handlePickupTimeUpdate} className="w-full">
                        Update Pickup Time
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
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
                <Dialog open={isDropoffDialogOpen} onOpenChange={setIsDropoffDialogOpen}>
                  <DialogTrigger asChild>
                    <div className="border rounded px-2 py-1 cursor-pointer hover:bg-gray-50 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {editedDropoffTime}
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Select Dropoff Date & Time</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        className="rounded-md border"
                      />
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={handleDropoffTimeUpdate} className="w-full">
                        Update Dropoff Time
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
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
