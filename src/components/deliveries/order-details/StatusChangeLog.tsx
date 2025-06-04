
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const StatusChangeLog = () => {
  const statusChangeEvents = [
    {
      operationName: "Item is delivered",
      operationDate: "06/04/2025 08:21",
      packStatus: "Item is delivered",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Bianca",
      courierSurname: "Moody"
    },
    {
      operationName: "Arrived to drop-off location",
      operationDate: "06/04/2025 08:21",
      packStatus: "Route is delivered",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Bianca",
      courierSurname: "Moody"
    },
    {
      operationName: "Item in transit",
      operationDate: "06/04/2025 07:51",
      packStatus: "Item in transit",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Bianca",
      courierSurname: "Moody"
    },
    {
      operationName: "Arrived to pickup location",
      operationDate: "06/04/2025 07:41",
      packStatus: "Arrived to location",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Bianca",
      courierSurname: "Moody"
    },
    {
      operationName: "Started working",
      operationDate: "06/04/2025 07:07",
      packStatus: "Started route",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Bianca",
      courierSurname: "Moody"
    },
    {
      operationName: "Courier selected",
      operationDate: "06/04/2025 07:07",
      packStatus: "Courier selected",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Bianca",
      courierSurname: "Moody"
    },
    {
      operationName: "Courier reported problem",
      operationDate: "06/04/2025 07:05",
      packStatus: "Sender reported courier",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Jorge",
      courierSurname: "Dumanaula"
    },
    {
      operationName: "Courier selected",
      operationDate: "06/04/2025 06:49",
      packStatus: "Courier selected",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Jorge",
      courierSurname: "Dumanaula"
    },
    {
      operationName: "Started working",
      operationDate: "06/04/2025 06:47",
      packStatus: "Started route",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Jorge",
      courierSurname: "Dumanaula"
    },
    {
      operationName: "Courier selected",
      operationDate: "06/04/2025 06:33",
      packStatus: "Courier selected",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Jorge",
      courierSurname: "Dumanaula"
    },
    {
      operationName: "Courier reported problem",
      operationDate: "06/04/2025 06:24",
      packStatus: "Sender reported courier",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Lee",
      courierSurname: "Peniche"
    },
    {
      operationName: "Courier selected",
      operationDate: "06/04/2025 04:47",
      packStatus: "Courier selected",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Lee",
      courierSurname: "Peniche"
    },
    {
      operationName: "Order paid",
      operationDate: "06/04/2025 04:43",
      packStatus: "Package paid",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Lee",
      courierSurname: "Peniche"
    }
  ];

  return (
    <div className="rounded-md border bg-card/50 p-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Operation name</TableHead>
              <TableHead className="w-[140px]">Date</TableHead>
              <TableHead className="w-[150px]">Pack status</TableHead>
              <TableHead className="w-[100px]">Sender name</TableHead>
              <TableHead className="w-[120px]">Sender surname</TableHead>
              <TableHead className="w-[100px]">Courier name</TableHead>
              <TableHead className="w-[120px]">Courier surname</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statusChangeEvents.map((event, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-sm">{event.operationName}</TableCell>
                <TableCell className="text-sm">{event.operationDate}</TableCell>
                <TableCell className="text-sm">{event.packStatus}</TableCell>
                <TableCell className="text-sm">{event.senderName}</TableCell>
                <TableCell className="text-sm">{event.senderSurname}</TableCell>
                <TableCell className="text-sm">{event.courierName}</TableCell>
                <TableCell className="text-sm">{event.courierSurname}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
