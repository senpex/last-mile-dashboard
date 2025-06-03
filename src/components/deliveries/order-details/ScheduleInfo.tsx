
import React, { useState } from 'react';
import { Clock, Edit, Save, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  const [isPickupPopoverOpen, setIsPickupPopoverOpen] = useState(false);
  const [isDropoffPopoverOpen, setIsDropoffPopoverOpen] = useState(false);
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
    setIsPickupPopoverOpen(false);
  };

  const handleDropoffTimeUpdate = () => {
    const formattedDateTime = `${format(selectedDate, 'MM/dd/yyyy')} ${selectedTime}`;
    setEditedDropoffTime(formattedDateTime);
    setIsDropoffPopoverOpen(false);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const renderDatePickerPopover = (isOpen: boolean, onOpenChange: (open: boolean) => void, onUpdate: () => void) => (
    <PopoverContent className="w-auto p-0" side="bottom" align="start">
      <div className="flex flex-col w-[320px]">
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Date</label>
              <div className="border rounded px-3 py-2 text-sm bg-background">
                {format(selectedDate, "MMM dd, yyyy")}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Time</label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="12:00 AM" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time} className="text-sm">
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              numberOfMonths={1}
              showOutsideDays={false}
              className="rounded-md border-0 p-0 w-full"
              classNames={{
                months: "flex w-full justify-center",
                month: "space-y-3 w-full",
                caption: "flex justify-center pt-1 relative items-center mb-3",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border border-input hover:bg-accent rounded-md transition-colors",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse",
                head_row: "flex w-full justify-center",
                head_cell: "text-muted-foreground rounded-md w-9 font-normal text-xs flex items-center justify-center h-8",
                row: "flex w-full mt-1 justify-center",
                cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 w-9 h-8 flex items-center justify-center",
                day: "h-8 w-8 p-0 font-normal text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors flex items-center justify-center cursor-pointer",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground font-medium",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
              }}
            />
          </div>
        </div>
        
        <div className="border-t bg-muted/20 p-3 flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs px-3"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            className="h-8 text-xs px-3"
            onClick={onUpdate}
          >
            Apply
          </Button>
        </div>
      </div>
    </PopoverContent>
  );

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
                <Popover open={isPickupPopoverOpen} onOpenChange={setIsPickupPopoverOpen}>
                  <PopoverTrigger asChild>
                    <div className="border rounded px-2 py-1 cursor-pointer hover:bg-gray-50 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {editedPickupTime}
                    </div>
                  </PopoverTrigger>
                  {renderDatePickerPopover(isPickupPopoverOpen, setIsPickupPopoverOpen, handlePickupTimeUpdate)}
                </Popover>
              ) : (
                editedPickupTime
              )}
              <span className="font-medium ml-4">End:</span> 
              {isEditing ? (
                <Popover open={isPickupPopoverOpen} onOpenChange={setIsPickupPopoverOpen}>
                  <PopoverTrigger asChild>
                    <div className="border rounded px-2 py-1 cursor-pointer hover:bg-gray-50 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {calculateEndTime(editedPickupTime)}
                    </div>
                  </PopoverTrigger>
                  {renderDatePickerPopover(isPickupPopoverOpen, setIsPickupPopoverOpen, handlePickupTimeUpdate)}
                </Popover>
              ) : (
                calculateEndTime(editedPickupTime)
              )}
            </div>
          </div>
          
          <div className="w-full">
            <h4 className="text-xs text-muted-foreground mb-2">Dropoff Window</h4>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Start:</span>
              {isEditing ? (
                <Popover open={isDropoffPopoverOpen} onOpenChange={setIsDropoffPopoverOpen}>
                  <PopoverTrigger asChild>
                    <div className="border rounded px-2 py-1 cursor-pointer hover:bg-gray-50 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {editedDropoffTime}
                    </div>
                  </PopoverTrigger>
                  {renderDatePickerPopover(isDropoffPopoverOpen, setIsDropoffPopoverOpen, handleDropoffTimeUpdate)}
                </Popover>
              ) : (
                editedDropoffTime
              )}
              <span className="font-medium ml-4">End:</span>
              {isEditing ? (
                <Popover open={isDropoffPopoverOpen} onOpenChange={setIsDropoffPopoverOpen}>
                  <PopoverTrigger asChild>
                    <div className="border rounded px-2 py-1 cursor-pointer hover:bg-gray-50 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {calculateEndTime(editedDropoffTime)}
                    </div>
                  </PopoverTrigger>
                  {renderDatePickerPopover(isDropoffPopoverOpen, setIsDropoffPopoverOpen, handleDropoffTimeUpdate)}
                </Popover>
              ) : (
                calculateEndTime(editedDropoffTime)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
