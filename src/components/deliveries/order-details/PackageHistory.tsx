import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const PackageHistory = () => {
  const packageEvents = [
    {
      eventName: "Pack edited",
      dispatcher: "Sarah Johnson",
      date: "Today, 9:45 AM",
      log1: "Package details modified by dispatcher",
      log2: "Weight updated from 2.5kg to 3.2kg",
      log3: "Special handling instructions added"
    },
    {
      eventName: "Comments entered",
      dispatcher: "Mike Chen",
      date: "Today, 10:00 AM",
      log1: "Customer requested specific delivery time",
      log2: "Fragile item - handle with care",
      log3: "Delivery to front desk only"
    },
    {
      eventName: "Package Pickup",
      dispatcher: "Emily Rodriguez",
      date: "Today, 10:15 AM",
      log1: "Driver arrived at pickup location",
      log2: "Package received and verified",
      log3: "Departure from pickup confirmed"
    },
    {
      eventName: "Pack sent to all 0",
      dispatcher: "James Wilson",
      date: "Today, 10:30 AM",
      log1: "Package broadcast to available drivers",
      log2: "Notification sent to delivery team",
      log3: "Route optimization initiated"
    },
    {
      eventName: "Edited through API",
      dispatcher: "System Auto",
      date: "Today, 10:45 AM",
      log1: "Automatic status update via API",
      log2: "GPS coordinates refreshed",
      log3: "ETA recalculated based on traffic"
    },
    {
      eventName: "Status Update",
      dispatcher: "Anna Davis",
      date: "Today, 11:30 AM",
      log1: "Delivery confirmation received",
      log2: "Customer signature obtained",
      log3: "Order marked as completed"
    }
  ];

  return (
    <div className="rounded-md border bg-card/50 p-4">
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Package Event History</h3>
        <p className="text-xs text-muted-foreground">Detailed tracking log for this package delivery</p>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">Event Name</TableHead>
              <TableHead className="w-[120px]">Dispatcher</TableHead>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead>Log 1</TableHead>
              <TableHead>Log 2</TableHead>
              <TableHead>Log 3</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packageEvents.map((event, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-sm">{event.eventName}</TableCell>
                <TableCell className="text-sm">{event.dispatcher}</TableCell>
                <TableCell className="text-sm">{event.date}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{event.log1}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{event.log2}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{event.log3}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
