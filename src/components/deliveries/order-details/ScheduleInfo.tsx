
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
  const [selectedTime, setSelectedTime] = useState("12:00 AM");

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

  // Generate time options matching DateRangePicker style
  const timeOptions = React.useMemo(() => {
    const hours = Array.from({ length: 12 }, (_, i) => i === 0 ? 12 : i);
    const minutes = ["00", "15", "30", "45"];
    const periods = ["AM", "PM"];
    
    return hours.flatMap(hour => 
      minutes.flatMap(minute => 
        periods.map(period => `${hour}:${minute} ${period}`)
      )
    );
  }, []);

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
                  <DialogContent className="w-auto p-0">
                    <div className="flex flex-col max-h-[500px] max-w-[500px]">
                      <div className="flex">
                        <div className="p-2 flex-1">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <div className="text-xs font-medium mb-1">Date</div>
                              <Button 
                                variant="outline" 
                                className="w-full justify-start text-left text-xs h-8 mb-1"
                                onClick={() => {}}
                              >
                                {format(selectedDate, "MMM dd, yyyy")}
                              </Button>
                            </div>
                            
                            <div>
                              <div className="text-xs font-medium mb-1">Time</div>
                              <Select value={selectedTime} onValueChange={setSelectedTime}>
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue placeholder="12:00 AM" />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeOptions.map((time) => (
                                    <SelectItem key={time} value={time} className="text-xs">
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="mt-2">
                            <CalendarComponent
                              mode="single"
                              selected={selectedDate}
                              onSelect={(date) => date && setSelectedDate(date)}
                              numberOfMonths={1}
                              showOutsideDays={false}
                              className="rounded-md p-3 pointer-events-auto"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t p-2 flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => setIsPickupDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          className="h-8 text-xs"
                          onClick={handlePickupTimeUpdate}
                        >
                          Apply
                        </Button>
                      </div>
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
                  <DialogContent className="w-auto p-0">
                    <div className="flex flex-col max-h-[500px] max-w-[500px]">
                      <div className="flex">
                        <div className="p-2 flex-1">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <div className="text-xs font-medium mb-1">Date</div>
                              <Button 
                                variant="outline" 
                                className="w-full justify-start text-left text-xs h-8 mb-1"
                                onClick={() => {}}
                              >
                                {format(selectedDate, "MMM dd, yyyy")}
                              </Button>
                            </div>
                            
                            <div>
                              <div className="text-xs font-medium mb-1">Time</div>
                              <Select value={selectedTime} onValueChange={setSelectedTime}>
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue placeholder="12:00 AM" />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeOptions.map((time) => (
                                    <SelectItem key={time} value={time} className="text-xs">
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="mt-2">
                            <CalendarComponent
                              mode="single"
                              selected={selectedDate}
                              onSelect={(date) => date && setSelectedDate(date)}
                              numberOfMonths={1}
                              showOutsideDays={false}
                              className="rounded-md p-3 pointer-events-auto"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t p-2 flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => setIsDropoffDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          className="h-8 text-xs"
                          onClick={handleDropoffTimeUpdate}
                        >
                          Apply
                        </Button>
                      </div>
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
