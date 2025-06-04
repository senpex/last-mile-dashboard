import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const StatusChangeLog = () => {
  const statusChangeEvents = [
    {
      operationName: "Item is delivered",
      operationDate: "06/04/2025 08:21",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Bianca",
      courierSurname: "Moody"
    },
    {
      operationName: "Arrived to drop-off location",
      operationDate: "06/04/2025 08:21",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Bianca",
      courierSurname: "Moody"
    },
    {
      operationName: "Item in transit",
      operationDate: "06/04/2025 07:51",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Bianca",
      courierSurname: "Moody"
    },
    {
      operationName: "Arrived to pickup location",
      operationDate: "06/04/2025 07:41",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Bianca",
      courierSurname: "Moody"
    },
    {
      operationName: "Started working",
      operationDate: "06/04/2025 07:07",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Bianca",
      courierSurname: "Moody"
    },
    {
      operationName: "Courier selected",
      operationDate: "06/04/2025 07:07",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Bianca",
      courierSurname: "Moody"
    },
    {
      operationName: "Courier reported problem",
      operationDate: "06/04/2025 07:05",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Jorge",
      courierSurname: "Dumanaula"
    },
    {
      operationName: "Courier selected",
      operationDate: "06/04/2025 06:49",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Jorge",
      courierSurname: "Dumanaula"
    },
    {
      operationName: "Started working",
      operationDate: "06/04/2025 06:47",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Jorge",
      courierSurname: "Dumanaula"
    },
    {
      operationName: "Courier selected",
      operationDate: "06/04/2025 06:33",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Jorge",
      courierSurname: "Dumanaula"
    },
    {
      operationName: "Courier reported problem",
      operationDate: "06/04/2025 06:24",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Lee",
      courierSurname: "Peniche"
    },
    {
      operationName: "Courier selected",
      operationDate: "06/04/2025 04:47",
      senderName: "Aziz",
      senderSurname: "UseNash",
      courierName: "Lee",
      courierSurname: "Peniche"
    },
    {
      operationName: "Order paid",
      operationDate: "06/04/2025 04:43",
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
