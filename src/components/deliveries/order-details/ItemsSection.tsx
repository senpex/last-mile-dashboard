
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
      dimensions: {
        width: "70.00",
        length: "12.00", 
        height: "39.00",
        weight: "12.00"
      },
      pickupStatus: "Not scanned",
      dropoffStatus: "Not scanned",
      returnStatus: "",
      address: "1250 Nascimento Ct, Manteca, CA, 95337, US"
    },
    {
      id: "6572",
      remoteId: "RM001",
      description: "Electronics Package",
      barcode: "S29434",
      dimensions: {
        width: "45.00",
        length: "30.00", 
        height: "15.00",
        weight: "8.50"
      },
      pickupStatus: "Scanned",
      dropoffStatus: "Not scanned",
      returnStatus: "",
      address: "892 Main Street, Sacramento, CA, 95814, US"
    },
    {
      id: "6573",
      remoteId: "RM002",
      description: "Clothing Items",
      barcode: "S29435",
      dimensions: {
        width: "60.00",
        length: "40.00", 
        height: "25.00",
        weight: "15.25"
      },
      pickupStatus: "Scanned",
      dropoffStatus: "Scanned",
      returnStatus: "Not scanned",
      address: "567 Oak Avenue, Fresno, CA, 93721, US"
    },
    {
      id: "6574",
      remoteId: "",
      description: "Medical Supplies",
      barcode: "S29436",
      dimensions: {
        width: "35.00",
        length: "25.00", 
        height: "20.00",
        weight: "6.75"
      },
      pickupStatus: "Not scanned",
      dropoffStatus: "Not scanned",
      returnStatus: "",
      address: "1455 Hospital Drive, San Jose, CA, 95112, US"
    },
    {
      id: "6575",
      remoteId: "RM003",
      description: "Food Products",
      barcode: "S29437",
      dimensions: {
        width: "80.00",
        length: "50.00", 
        height: "35.00",
        weight: "22.00"
      },
      pickupStatus: "Damaged",
      dropoffStatus: "Not scanned",
      returnStatus: "",
      address: "789 Commerce Blvd, Oakland, CA, 94607, US"
    },
    {
      id: "6576",
      remoteId: "RM004",
      description: "Office Equipment",
      barcode: "S29438",
      dimensions: {
        width: "65.00",
        length: "45.00", 
        height: "30.00",
        weight: "18.50"
      },
      pickupStatus: "Scanned",
      dropoffStatus: "Scanned",
      returnStatus: "Scanned",
      address: "321 Business Park, San Francisco, CA, 94105, US"
    },
    {
      id: "6577",
      remoteId: "",
      description: "Home Appliances",
      barcode: "S29439",
      dimensions: {
        width: "90.00",
        length: "60.00", 
        height: "45.00",
        weight: "35.75"
      },
      pickupStatus: "Not scanned",
      dropoffStatus: "Not scanned",
      returnStatus: "",
      address: "654 Residential Lane, San Diego, CA, 92101, US"
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
              <TableHead className="w-[160px]">Dimensions</TableHead>
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
                <TableCell className="text-sm">
                  <div className="space-y-1">
                    <div>Width: {item.dimensions.width}</div>
                    <div>Length: {item.dimensions.length}</div>
                    <div>Height: {item.dimensions.height}</div>
                    <div>Weight: {item.dimensions.weight}</div>
                  </div>
                </TableCell>
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
