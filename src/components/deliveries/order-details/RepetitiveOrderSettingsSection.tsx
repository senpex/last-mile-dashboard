import React, { useState } from 'react';
import { Calendar, Clock, Edit, User, Save, X } from "lucide-react";
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
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs flex items-center gap-1 border-green-500 text-green-700 hover:bg-green-50"
              onClick={handleEditClick}
            >
              <Save className="h-3 w-3" />
              Save
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs flex items-center gap-1 border-red-500 text-red-700 hover:bg-red-50"
              onClick={() => setIsEditing(false)}
            >
              <X className="h-3 w-3" />
              Cancel
            </Button>
          </div>
        )}
      </div>
      
      <div className="rounded-md border bg-card/50 p-6 space-y-6">
        {!isEditing ? (
          // View Mode
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Pickup Schedule
              </h4>
              <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                {getEnabledDays().map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-foreground">{item.day}</span>
                    <span className="text-sm font-medium text-foreground">{item.time}</span>
                  </div>
                ))}
                {getEnabledDays().length === 0 && (
                  <div className="text-center py-4">
                    <span className="text-sm text-muted-foreground italic">No pickup days configured</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Start Date
              </h4>
              <div className="bg-muted/30 rounded-lg p-3">
                <span className="text-sm font-medium text-foreground">{startDate}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Assigned Driver
              </h4>
              <div className="bg-muted/30 rounded-lg p-3">
                <span className="text-sm font-medium text-foreground">
                  {assignedDriverId === "unassigned" ? "—" : `${assignedDriverId} - ${getAssignedDriverName()}`}
                </span>
              </div>
            </div>
          </div>
        ) : (
          // Edit Mode
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Pickup Schedule
              </h4>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {schedule.map((item, index) => (
                    <div key={item.day} className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-background/50 transition-colors">
                      <div className="flex items-center space-x-3 flex-1">
                        <Checkbox
                          id={`day-${index}`}
                          checked={item.enabled}
                          onCheckedChange={(checked) => handleDayToggle(index, checked as boolean)}
                        />
                        <label 
                          htmlFor={`day-${index}`} 
                          className="text-sm font-medium min-w-[80px] cursor-pointer"
                        >
                          {item.day}
                        </label>
                      </div>
                      <Input
                        type="time"
                        value={item.time}
                        onChange={(e) => handleTimeChange(index, e.target.value)}
                        disabled={!item.enabled}
                        className="h-8 text-sm w-24"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Start Date
                </h4>
                <div className="bg-muted/30 rounded-lg p-3">
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-9 text-sm w-full"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Assigned Driver
                </h4>
                <div className="bg-muted/30 rounded-lg p-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFindDriverClick}
                    className="h-9 text-sm px-4 w-full justify-start"
                  >
                    {assignedDriverId === "unassigned" ? "Find Driver" : `${assignedDriverId} - ${getAssignedDriverName()}`}
                  </Button>
                </div>
              </div>
            </div>
          </div>
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