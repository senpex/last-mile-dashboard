
import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from "@/components/ui/dialog";

// Predefined date ranges
const datePresets = [
  { label: "Today", days: 0, startOfDay: true },
  { label: "Yesterday", days: 1, startOfDay: true },
  { label: "Tomorrow", days: -1, startOfDay: true },
  { label: "This week", days: 7, startOfWeek: true },
  { label: "Last week", days: 14, startOfWeek: true },
  { label: "Next 7 days", days: -7 },
  { label: "Last 7 days", days: 7 },
  { label: "This month", days: 30, startOfMonth: true },
  { label: "Last month", days: 60, startOfMonth: true },
  { label: "Next month", days: -30, startOfMonth: true },
];

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

export function DateRangePicker({ dateRange, onDateRangeChange }: DateRangePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [startTime, setStartTime] = React.useState("12:00 AM");
  const [endTime, setEndTime] = React.useState("11:59 PM");
  
  // Create formatted display text for the date range button
  const formatDisplayText = () => {
    if (!dateRange?.from) {
      return "Select date range";
    }

    if (dateRange.to) {
      return `${format(dateRange.from, "MM/dd/yyyy")} ${startTime} - ${format(dateRange.to, "MM/dd/yyyy")} ${endTime}`;
    }

    return `${format(dateRange.from, "MM/dd/yyyy")} ${startTime}`;
  };

  // Apply a preset date range
  const applyPreset = (days: number, startOfPeriod?: boolean, periodType?: 'week' | 'month') => {
    const today = new Date();
    let from = today;
    let to = today;

    if (days > 0) {
      from = addDays(today, -days);
      to = today;
    } else if (days < 0) {
      from = today;
      to = addDays(today, -days);
    }

    // TODO: If needed, implement startOfWeek or startOfMonth logic here
    
    onDateRangeChange({ from, to });
  };

  // Generate time options for select dropdowns (12:00 AM to 11:59 PM)
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

  return (
    <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 text-sm h-9">
          <CalendarIcon className="h-4 w-4" />
          <span>{formatDisplayText()}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0">
        <div className="flex flex-col md:flex-row">
          {/* Presets column */}
          <div className="w-full md:w-40 border-r p-4">
            {datePresets.map((preset) => (
              <Button
                key={preset.label}
                variant="ghost"
                className="w-full justify-start text-left mb-1"
                onClick={() => {
                  applyPreset(
                    preset.days,
                    preset.startOfDay || preset.startOfWeek || preset.startOfMonth,
                    preset.startOfWeek ? 'week' : preset.startOfMonth ? 'month' : undefined
                  );
                }}
              >
                {preset.label}
              </Button>
            ))}
          </div>
          
          {/* Calendar and time inputs */}
          <div className="flex-1 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="mb-2 font-medium">Start</div>
                <div className="flex flex-col gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        {dateRange?.from ? (
                          format(dateRange.from, "MMM dd, yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={dateRange?.from}
                        onSelect={(date) => 
                          onDateRangeChange({ 
                            from: date, 
                            to: dateRange?.to 
                          })
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Select value={startTime} onValueChange={setStartTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="12:00 AM" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <div className="mb-2 font-medium">End</div>
                <div className="flex flex-col gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        {dateRange?.to ? (
                          format(dateRange.to, "MMM dd, yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={dateRange?.to}
                        onSelect={(date) =>
                          onDateRangeChange({
                            from: dateRange?.from,
                            to: date,
                          })
                        }
                        disabled={(date) =>
                          dateRange?.from ? date < dateRange.from : false
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Select value={endTime} onValueChange={setEndTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="11:59 PM" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={onDateRangeChange}
                numberOfMonths={2}
                showOutsideDays={false}
              />
            </div>
            
            <div className="flex justify-end mt-4 gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  onDateRangeChange(undefined);
                  setIsCalendarOpen(false);
                }}
              >
                Reset
              </Button>
              <Button
                onClick={() => {
                  setIsCalendarOpen(false);
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
