
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { timezones } from "@/lib/timezones";

interface TimezonePickerProps {
  selectedTimezone: string;
  onTimezoneChange: (timezone: string) => void;
}

export function TimezonePicker({ selectedTimezone, onTimezoneChange }: TimezonePickerProps) {
  // Find the current timezone offset
  const currentTimezoneInfo = timezones.find(tz => tz.value === selectedTimezone);
  const offsetDisplay = currentTimezoneInfo ? currentTimezoneInfo.offset : '';
  
  // Get label for display
  const timezoneLabel = currentTimezoneInfo ? currentTimezoneInfo.label : selectedTimezone.replace('_', ' ');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9" title="Change timezone">
          <Clock className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="end">
        <div className="p-3 border-b bg-muted/50">
          <div className="font-medium">Select timezone</div>
          <div className="text-sm text-muted-foreground">Current: {timezoneLabel} {offsetDisplay}</div>
        </div>
        <ScrollArea className="h-80">
          <div className="p-2">
            {timezones.map((timezone) => (
              <Button
                key={timezone.value}
                variant="ghost"
                className="w-full justify-start text-left font-normal p-2 h-auto"
                onClick={() => onTimezoneChange(timezone.value)}
              >
                <div className="flex flex-col items-start">
                  <div className="font-medium">{timezone.label}</div>
                  <div className="text-xs text-muted-foreground">{timezone.offset}</div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
