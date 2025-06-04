
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ItemsSection = () => {
  const items = [
    {
      id: "6571",
      remoteId: "",
      description: "",
      barcode: "S29433",
      dimensions: "70.00/12.00/39.00/12.00",
      pickupStatus: "Not scanned",
      dropoffStatus: "Not scanned",
      returnStatus: "",
      address: "1250 Nascimento Ct, Manteca, CA, 95337, US"
    }
  ];

  const statusOptions = ["Not scanned", "Scanned", "Damaged"];

  return (
    <div className="rounded-md border bg-card/50 p-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Id</TableHead>
              <TableHead className="w-[100px]">Remote id</TableHead>
              <TableHead className="w-[120px]">Description</TableHead>
              <TableHead className="w-[100px]">Barcode</TableHead>
              <TableHead className="w-[160px]">Weight/Width/Length/Height</TableHead>
              <TableHead className="w-[120px]">Pickup status</TableHead>
              <TableHead className="w-[120px]">Dropoff status</TableHead>
              <TableHead className="w-[120px]">Return status</TableHead>
              <TableHead>Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-sm">{item.id}</TableCell>
                <TableCell className="text-sm">{item.remoteId}</TableCell>
                <TableCell className="text-sm">{item.description}</TableCell>
                <TableCell className="text-sm">{item.barcode}</TableCell>
                <TableCell className="text-sm">{item.dimensions}</TableCell>
                <TableCell className="text-sm">
                  <Select defaultValue={item.pickupStatus}>
                    <SelectTrigger className="w-full h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-sm">
                  <Select defaultValue={item.dropoffStatus}>
                    <SelectTrigger className="w-full h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-sm">
                  <Select defaultValue={item.returnStatus || "Not scanned"}>
                    <SelectTrigger className="w-full h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-sm">{item.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
