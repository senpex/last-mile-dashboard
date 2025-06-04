
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const PackageHistory = () => {
  const packageEvents = [
    {
      eventName: "Package Pickup",
      dispatcher: "Sarah Johnson",
      date: "Today, 10:15 AM",
      log1: "Driver arrived at pickup location",
      log2: "Package received and verified",
      log3: "Departure from pickup confirmed"
    },
    {
      eventName: "Transit Update",
      dispatcher: "Mike Chen",
      date: "Today, 10:30 AM",
      log1: "Package in transit to destination",
      log2: "Route optimization applied",
      log3: "ETA updated based on traffic"
    },
    {
      eventName: "Delivery Attempt",
      dispatcher: "Emily Rodriguez",
      date: "Today, 11:05 AM",
      log1: "Arrived at delivery location",
      log2: "Customer contacted for delivery",
      log3: "Package successfully delivered"
    },
    {
      eventName: "Status Update",
      dispatcher: "James Wilson",
      date: "Today, 11:15 AM",
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
