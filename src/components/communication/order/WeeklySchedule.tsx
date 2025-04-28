
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WeeklyScheduleProps {
  schedule: Array<{
    day: string;
    time: string;
  }>;
}

export const WeeklySchedule = ({ schedule }: WeeklyScheduleProps) => {
  return (
    <div className="weekly-schedule-card rounded-md bg-muted/50 p-2.5 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs font-medium">Weekly Schedule</span>
      </div>
      <div className="grid gap-1.5">
        {schedule.map((slot, idx) => (
          <div key={idx} className="flex justify-between items-center text-[11px]">
            <span className="text-muted-foreground">{slot.day}:</span>
            <span className="font-medium">{slot.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RepeatedOrderBadge = () => (
  <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
    Repeated Order
  </Badge>
);
