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
  showStatePicker?: boolean;
}

export function DateRangePicker({ 
  dateRange, 
  onDateRangeChange,
  showStatePicker = true 
}: DateRangePickerProps) {
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

  // Generate time options for select dropdowns
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
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 text-sm h-9">
          <CalendarIcon className="h-4 w-4" />
          <span>{formatDisplayText()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" alignOffset={0} sideOffset={5}>
        <div className="flex flex-col max-h-[500px] max-w-[500px]">
          <div className="flex">
            {showStatePicker ? (
              <div className="w-32 border-r p-2 max-h-[400px] overflow-y-auto">
                {datePresets.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="ghost"
                    className="w-full justify-start text-left mb-1 text-xs h-8"
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
            ) : null}
            
            <div className="p-2 flex-1">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs font-medium mb-1">Start</div>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left text-xs h-8 mb-1"
                    onClick={() => {}}
                  >
                    {dateRange?.from ? (
                      format(dateRange.from, "MMM dd, yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                  
                  <Select value={startTime} onValueChange={setStartTime}>
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
                
                <div>
                  <div className="text-xs font-medium mb-1">End</div>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left text-xs h-8 mb-1"
                    onClick={() => {}}
                  >
                    {dateRange?.to ? (
                      format(dateRange.to, "MMM dd, yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                  
                  <Select value={endTime} onValueChange={setEndTime}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="11:59 PM" />
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
                <Calendar
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={onDateRangeChange}
                  numberOfMonths={1}
                  showOutsideDays={false}
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
          
          <div className="border-t p-2 flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              onClick={() => {
                onDateRangeChange(undefined);
                setIsCalendarOpen(false);
              }}
            >
              Reset
            </Button>
            <Button
              size="sm"
              className="h-8 text-xs"
              onClick={() => {
                setIsCalendarOpen(false);
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
