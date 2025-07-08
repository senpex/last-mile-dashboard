import React, { useState } from 'react';
import { Calendar, Clock, Edit, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { SendOrderPopup } from "./SendOrderPopup";
import { toast } from "sonner";

interface DaySchedule {
  day: string;
  enabled: boolean;
  time: string;
}

const DAYS_OF_WEEK = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const DRIVERS = [
  { id: "DRV001", name: "Michael Torres" },
  { id: "DRV002", name: "Sarah Johnson" },
  { id: "DRV003", name: "David Chen" },
  { id: "DRV004", name: "Maria Rodriguez" },
  { id: "DRV005", name: "Alex Thompson" }
];

export const RepetitiveOrderSettingsSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFindDriverPopupOpen, setIsFindDriverPopupOpen] = useState(false);
  const [startDate, setStartDate] = useState("2024-01-15");
  const [assignedDriverId, setAssignedDriverId] = useState("DRV001");
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    { day: "Monday", enabled: true, time: "09:00" },
    { day: "Tuesday", enabled: false, time: "09:00" },
    { day: "Wednesday", enabled: true, time: "14:30" },
    { day: "Thursday", enabled: false, time: "09:00" },
    { day: "Friday", enabled: true, time: "16:00" },
    { day: "Saturday", enabled: false, time: "09:00" },
    { day: "Sunday", enabled: false, time: "09:00" }
  ]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      toast.success("Repetitive order settings updated successfully");
    }
  };

  const handleDayToggle = (dayIndex: number, enabled: boolean) => {
    setSchedule(prev => prev.map((item, index) => 
      index === dayIndex ? { ...item, enabled } : item
    ));
  };

  const handleFindDriverClick = () => {
    setIsFindDriverPopupOpen(true);
  };

  const handleDriverSelect = (driverId: string) => {
    setAssignedDriverId(driverId);
    setIsFindDriverPopupOpen(false);
    const driver = DRIVERS.find(d => d.id === driverId);
    toast.success(`Driver assigned: ${driver?.name || driverId}`);
  };

  const handleTimeChange = (dayIndex: number, time: string) => {
    setSchedule(prev => prev.map((item, index) => 
      index === dayIndex ? { ...item, time } : item
    ));
  };

  const getEnabledDays = () => {
    return schedule.filter(item => item.enabled);
  };

  const getAssignedDriverName = () => {
    if (assignedDriverId === "unassigned") return "—";
    const driver = DRIVERS.find(d => d.id === assignedDriverId);
    return driver ? driver.name : "—";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Repetitive Order Settings
        </h3>
        {!isEditing ? (
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 text-xs flex items-center gap-1.5"
            onClick={handleEditClick}
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs flex items-center gap-1.5"
              onClick={handleEditClick}
            >
              Save
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs flex items-center gap-1.5"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
      
      <div className="rounded-md border bg-card/50 p-4 space-y-4">
        {!isEditing ? (
          // View Mode
          <>
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Pickup Schedule
              </h4>
              <div className="space-y-1">
                {getEnabledDays().map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-xs">
                    <span className="font-medium">{item.day}</span>
                    <span className="text-muted-foreground">{item.time}</span>
                  </div>
                ))}
                {getEnabledDays().length === 0 && (
                  <span className="text-xs text-muted-foreground">No pickup days configured</span>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                Start Date
              </h4>
              <span className="text-xs font-medium">{startDate}</span>
            </div>

            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center">
                <User className="w-3 h-3 mr-1" />
                Assigned Driver
              </h4>
              <span className="text-xs font-medium">
                {assignedDriverId === "unassigned" ? "—" : `${assignedDriverId} - ${getAssignedDriverName()}`}
              </span>
            </div>
          </>
        ) : (
          // Edit Mode
          <>
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-3 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Pickup Schedule
              </h4>
              <div className="space-y-2">
                {schedule.map((item, index) => (
                  <div key={item.day} className="flex items-center justify-between gap-3">
                    <div className="flex items-center space-x-2 flex-1">
                      <Checkbox
                        id={`day-${index}`}
                        checked={item.enabled}
                        onCheckedChange={(checked) => handleDayToggle(index, checked as boolean)}
                      />
                      <label 
                        htmlFor={`day-${index}`} 
                        className="text-xs font-medium min-w-[70px]"
                      >
                        {item.day}
                      </label>
                    </div>
                    <Input
                      type="time"
                      value={item.time}
                      onChange={(e) => handleTimeChange(index, e.target.value)}
                      disabled={!item.enabled}
                      className="h-7 text-xs w-20"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                Start Date
              </h4>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-7 text-xs w-40"
              />
            </div>

            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center">
                <User className="w-3 h-3 mr-1" />
                Assigned Driver
              </h4>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFindDriverClick}
                className="h-7 text-xs px-3"
              >
                {assignedDriverId === "unassigned" ? "Find Driver" : `${assignedDriverId} - ${getAssignedDriverName()}`}
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Find Driver Popup */}
      <SendOrderPopup
        isOpen={isFindDriverPopupOpen}
        onClose={() => setIsFindDriverPopupOpen(false)}
        orderId="REP-ORDER"
      />
    </div>
  );
};