
import React, { useState, useEffect } from 'react';
import { Truck, ChevronDown, Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Dictionary } from "@/types/dictionary";
import { getDictionary } from "@/lib/storage";

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
  driverStatus: initialDriverStatus,
  orderStatusesDictionary
}: DriverInfoTableProps) => {
  const [pickupStatusesDictionary, setPickupStatusesDictionary] = useState<Dictionary | null>(null);
  const [currentDriverStatus, setCurrentDriverStatus] = useState("Courier selected");

  useEffect(() => {
    // Load the dictionary 1401 for pickup statuses
    const dictionary = getDictionary("1401");
    if (dictionary) {
      setPickupStatusesDictionary(dictionary);
      console.log("Loaded pickup status dictionary:", dictionary);
    } else {
      console.warn("Dictionary with ID 1401 not found");
    }
  }, []);

  const handleDriverStatusChange = (newStatus: string) => {
    setCurrentDriverStatus(newStatus);
    toast.success(`Driver status updated to ${newStatus}`);
  };
  
  const handleEditDriver = (driverName: string) => {
    toast.info(`Editing driver: ${driverName}`);
  };
  
  const handleDeleteDriver = (driverName: string) => {
    toast.warning(`Deleting driver: ${driverName}`);
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
              <TableHead>Action</TableHead>
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
                      {currentDriverStatus}
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-50 bg-white">
                    {pickupStatusesDictionary?.items.map((item) => (
                      <DropdownMenuItem 
                        key={item.id} 
                        onClick={() => handleDriverStatusChange(item.value)}
                        title={item.description}
                      >
                        {item.value}
                      </DropdownMenuItem>
                    )) || orderStatusesDictionary.items.map((item) => (
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
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-6 text-xs px-2 flex items-center">
                      Action
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-50 bg-white">
                    <DropdownMenuItem onClick={() => handleEditDriver(driverName)} className="flex items-center gap-2">
                      <Edit className="h-3.5 w-3.5" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteDriver(driverName)} className="flex items-center gap-2 text-red-500">
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sarah Davis</TableCell>
              <TableCell>$12.50</TableCell>
              <TableCell>$9.50</TableCell>
              <TableCell>$2.00</TableCell>
              <TableCell>$3.00</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-6 text-xs px-2 flex items-center">
                      {currentDriverStatus}
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-50 bg-white">
                    {pickupStatusesDictionary?.items.map((item) => (
                      <DropdownMenuItem 
                        key={item.id} 
                        onClick={() => handleDriverStatusChange(item.value)}
                        title={item.description}
                      >
                        {item.value}
                      </DropdownMenuItem>
                    )) || orderStatusesDictionary.items.map((item) => (
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
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-6 text-xs px-2 flex items-center">
                      Action
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-50 bg-white">
                    <DropdownMenuItem onClick={() => handleEditDriver("Sarah Davis")} className="flex items-center gap-2">
                      <Edit className="h-3.5 w-3.5" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteDriver("Sarah Davis")} className="flex items-center gap-2 text-red-500">
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </DropdownMenuItem>
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
