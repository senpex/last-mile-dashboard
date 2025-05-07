
import React from 'react';
import { Truck, ChevronDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Dictionary } from "@/types/dictionary";

interface DriverInfoTableProps {
  customerName: string;
  driverName: string;
  price: string;
  tip: string;
  couriersEarnings: string | undefined;
  driverStatus: string;
  orderStatusesDictionary: Dictionary;
}

export const DriverInfoTable = ({
  customerName,
  driverName,
  price,
  tip,
  couriersEarnings,
  driverStatus,
  orderStatusesDictionary
}: DriverInfoTableProps) => {
  const handleDriverStatusChange = (newStatus: string) => {
    toast.success(`Driver status updated to ${newStatus}`);
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-3 flex items-center">
        <Truck className="w-4 h-4 mr-2" />
        Driver info
      </h3>
      <div className="rounded-md border bg-card/50 p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Earnings</TableHead>
              <TableHead>Delivery Fee</TableHead>
              <TableHead>Extra Service Fee</TableHead>
              <TableHead>Tip</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{driverName}</TableCell>
              <TableCell>{couriersEarnings || "$10.00"}</TableCell>
              <TableCell>$8.00</TableCell>
              <TableCell>$0.00</TableCell>
              <TableCell>{tip}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-6 text-xs px-2 flex items-center">
                      {driverStatus}
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-50 bg-white">
                    {orderStatusesDictionary.items.map((item) => (
                      <DropdownMenuItem 
                        key={item.id} 
                        onClick={() => handleDriverStatusChange(item.value)}
                        title={item.description}
                      >
                        {item.value}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
