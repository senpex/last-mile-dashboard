
import React, { useState, useEffect } from 'react';
import { Truck, ChevronDown, Edit, Trash2, Plus, Save } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Dictionary } from "@/types/dictionary";
import { getDictionary } from "@/lib/storage";
import { Input } from "@/components/ui/input";

interface DriverInfoTableProps {
  customerName: string;
  driverName: string;
  price: string;
  tip: string;
  couriersEarnings: string | undefined;
  driverStatus: string;
  orderStatusesDictionary: Dictionary;
}

interface DriverInfo {
  name: string;
  earnings: string;
  deliveryFee: string;
  extraServiceFee: string;
  tip: string;
  status: string;
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
  const [editingDriverIndex, setEditingDriverIndex] = useState<number | null>(null);
  const [drivers, setDrivers] = useState<DriverInfo[]>([
    {
      name: driverName,
      earnings: couriersEarnings || "$10.00",
      deliveryFee: "$8.00",
      extraServiceFee: "$0.00",
      tip: tip,
      status: "Courier selected"
    },
    {
      name: "Sarah Davis",
      earnings: "$12.50",
      deliveryFee: "$9.50",
      extraServiceFee: "$2.00",
      tip: "$3.00",
      status: "Courier selected"
    }
  ]);

  // Create a temporary state for edited values
  const [editedDriver, setEditedDriver] = useState<DriverInfo | null>(null);

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

  const handleDriverStatusChange = (newStatus: string, index: number) => {
    const updatedDrivers = [...drivers];
    updatedDrivers[index].status = newStatus;
    setDrivers(updatedDrivers);
    setCurrentDriverStatus(newStatus);
    toast.success(`Driver status updated to ${newStatus}`);
  };
  
  const handleEditDriver = (driverName: string, index: number) => {
    setEditingDriverIndex(index);
    setEditedDriver({...drivers[index]});
    toast.info(`Editing driver: ${driverName}`);
  };

  const handleSaveDriver = (index: number) => {
    if (editedDriver) {
      const updatedDrivers = [...drivers];
      updatedDrivers[index] = editedDriver;
      setDrivers(updatedDrivers);
      setEditingDriverIndex(null);
      setEditedDriver(null);
      toast.success(`Driver ${editedDriver.name} information saved`);
    }
  };
  
  const handleDeleteDriver = (driverName: string, index: number) => {
    const updatedDrivers = [...drivers];
    updatedDrivers.splice(index, 1);
    setDrivers(updatedDrivers);
    toast.warning(`Driver ${driverName} has been removed`);
  };

  const handleAddHelper = () => {
    const newHelper: DriverInfo = {
      name: "-",
      earnings: "-",
      deliveryFee: "-",
      extraServiceFee: "-",
      tip: "-",
      status: "Courier selected"
    };
    
    setDrivers([...drivers, newHelper]);
    toast.success("Adding new helper driver");
  };

  const handleInputChange = (field: keyof DriverInfo, value: string) => {
    if (editedDriver) {
      setEditedDriver({
        ...editedDriver,
        [field]: value
      });
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-3 flex items-center justify-between">
        <div className="flex items-center">
          <Truck className="w-4 h-4 mr-2" />
          Driver info
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 text-xs flex items-center"
          onClick={handleAddHelper}
        >
          <Plus className="mr-1 h-3.5 w-3.5" />
          Add helper
        </Button>
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
            {drivers.map((driver, index) => (
              <TableRow key={index}>
                <TableCell>{driver.name}</TableCell>
                <TableCell>
                  {editingDriverIndex === index ? (
                    <Input 
                      value={editedDriver?.earnings || ""} 
                      onChange={(e) => handleInputChange('earnings', e.target.value)}
                      className="h-8 w-20"
                    />
                  ) : (
                    driver.earnings
                  )}
                </TableCell>
                <TableCell>
                  {editingDriverIndex === index ? (
                    <Input 
                      value={editedDriver?.deliveryFee || ""} 
                      onChange={(e) => handleInputChange('deliveryFee', e.target.value)}
                      className="h-8 w-20"
                    />
                  ) : (
                    driver.deliveryFee
                  )}
                </TableCell>
                <TableCell>
                  {editingDriverIndex === index ? (
                    <Input 
                      value={editedDriver?.extraServiceFee || ""} 
                      onChange={(e) => handleInputChange('extraServiceFee', e.target.value)}
                      className="h-8 w-20"
                    />
                  ) : (
                    driver.extraServiceFee
                  )}
                </TableCell>
                <TableCell>
                  {editingDriverIndex === index ? (
                    <Input 
                      value={editedDriver?.tip || ""} 
                      onChange={(e) => handleInputChange('tip', e.target.value)}
                      className="h-8 w-20"
                    />
                  ) : (
                    driver.tip
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-6 text-xs px-2 flex items-center">
                        {driver.status}
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="z-50 bg-white">
                      {pickupStatusesDictionary?.items.map((item) => (
                        <DropdownMenuItem 
                          key={item.id} 
                          onClick={() => handleDriverStatusChange(item.value, index)}
                          title={item.description}
                        >
                          {item.value}
                        </DropdownMenuItem>
                      )) || orderStatusesDictionary.items.map((item) => (
                        <DropdownMenuItem 
                          key={item.id} 
                          onClick={() => handleDriverStatusChange(item.value, index)}
                          title={item.description}
                        >
                          {item.value}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>
                  {editingDriverIndex === index ? (
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="h-6 text-xs px-2 flex items-center"
                      onClick={() => handleSaveDriver(index)}
                    >
                      <Save className="h-3.5 w-3.5 mr-1" />
                      Save
                    </Button>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-6 text-xs px-2 flex items-center">
                          Action
                          <ChevronDown className="h-3 w-3 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="z-50 bg-white">
                        <DropdownMenuItem onClick={() => handleEditDriver(driver.name, index)} className="flex items-center gap-2">
                          <Edit className="h-3.5 w-3.5" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteDriver(driver.name, index)} className="flex items-center gap-2 text-red-500">
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
