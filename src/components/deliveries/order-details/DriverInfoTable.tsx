
import React, { useState, useEffect } from 'react';
import { Truck, ChevronDown, Edit, Trash2, Plus, Save, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Dictionary } from "@/types/dictionary";
import { getDictionary } from "@/lib/storage";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const [selectedDriver, setSelectedDriver] = useState<string>("0");
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

  const [editedDriver, setEditedDriver] = useState<DriverInfo | null>(null);

  useEffect(() => {
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

  const handleFindDriver = (driverName: string) => {
    toast.info(`Finding replacement driver for ${driverName}`);
  };

  const handleInputChange = (field: keyof DriverInfo, value: string) => {
    if (editedDriver) {
      setEditedDriver({
        ...editedDriver,
        [field]: value
      });
    }
  };

  const handleRadioChange = (value: string) => {
    setSelectedDriver(value);
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
          Add driver/helper
        </Button>
      </h3>
      <div className="rounded-md border bg-card/50 p-0">
        {/* Header Row */}
        <div className="border-b bg-muted/50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-6 flex-shrink-0"></div> {/* Space for radio button */}
            
            <div className="grid grid-cols-7 gap-3 flex-1 min-w-0">
              <div className="text-xs font-semibold text-muted-foreground">Role</div>
              <div className="text-xs font-semibold text-muted-foreground">Name</div>
              <div className="text-xs font-semibold text-muted-foreground">Earnings</div>
              <div className="text-xs font-semibold text-muted-foreground">Delivery Fee</div>
              <div className="text-xs font-semibold text-muted-foreground">Extra Service Fee</div>
              <div className="text-xs font-semibold text-muted-foreground">Tip</div>
              <div className="text-xs font-semibold text-muted-foreground">Status</div>
            </div>
            
            <div className="w-24 flex-shrink-0">
              <div className="text-xs font-semibold text-muted-foreground">Action</div>
            </div>
          </div>
        </div>

        <RadioGroup value={selectedDriver} onValueChange={handleRadioChange}>
          {drivers.map((driver, index) => (
            <div key={index} className="border-b last:border-b-0 p-4">
              <div className="flex items-center gap-3">
                <div className="w-6 flex-shrink-0">
                  <RadioGroupItem value={index.toString()} />
                </div>
                
                <div className="grid grid-cols-7 gap-3 flex-1 min-w-0 items-center">
                  <div className="flex-shrink-0">
                    <Badge 
                      variant={index === 0 ? "default" : "secondary"} 
                      className="text-xs px-2 py-0.5 whitespace-nowrap"
                    >
                      {index === 0 ? "Driver" : "Helper"}
                    </Badge>
                  </div>
                  
                  <div className="text-sm truncate min-w-0">{driver.name}</div>
                  
                  <div className="min-w-0">
                    {editingDriverIndex === index ? (
                      <Input 
                        value={editedDriver?.earnings || ""} 
                        onChange={(e) => handleInputChange('earnings', e.target.value)}
                        className="h-7 w-full min-w-[80px]"
                      />
                    ) : (
                      <div className="text-sm truncate">{driver.earnings}</div>
                    )}
                  </div>
                  
                  <div className="min-w-0">
                    {editingDriverIndex === index ? (
                      <Input 
                        value={editedDriver?.deliveryFee || ""} 
                        onChange={(e) => handleInputChange('deliveryFee', e.target.value)}
                        className="h-7 w-full min-w-[80px]"
                      />
                    ) : (
                      <div className="text-sm truncate">{driver.deliveryFee}</div>
                    )}
                  </div>
                  
                  <div className="min-w-0">
                    {editingDriverIndex === index ? (
                      <Input 
                        value={editedDriver?.extraServiceFee || ""} 
                        onChange={(e) => handleInputChange('extraServiceFee', e.target.value)}
                        className="h-7 w-full min-w-[80px]"
                      />
                    ) : (
                      <div className="text-sm truncate">{driver.extraServiceFee}</div>
                    )}
                  </div>
                  
                  <div className="min-w-0">
                    {editingDriverIndex === index ? (
                      <Input 
                        value={editedDriver?.tip || ""} 
                        onChange={(e) => handleInputChange('tip', e.target.value)}
                        className="h-7 w-full min-w-[80px]"
                      />
                    ) : (
                      <div className="text-sm truncate">{driver.tip}</div>
                    )}
                  </div>
                  
                  <div className="min-w-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-7 text-xs px-2 flex items-center w-full min-w-[120px] justify-between">
                          <span className="truncate">{driver.status}</span>
                          <ChevronDown className="h-3 w-3 ml-1 flex-shrink-0" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="z-50 bg-white min-w-[200px]">
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
                  </div>
                </div>
                
                <div className="w-24 flex-shrink-0">
                  {editingDriverIndex === index ? (
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="h-7 text-xs px-2 flex items-center justify-center gap-1 w-full"
                      onClick={() => handleSaveDriver(index)}
                    >
                      <Save className="h-3.5 w-3.5" />
                      <span>Save</span>
                    </Button>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-7 text-xs px-2 flex items-center w-full justify-between">
                          <span>Action</span>
                          <ChevronDown className="h-3 w-3 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="z-50 bg-white">
                        <DropdownMenuItem onClick={() => handleEditDriver(driver.name, index)} className="flex items-center gap-2">
                          <Edit className="h-3.5 w-3.5" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFindDriver(driver.name)} className="flex items-center gap-2">
                          <Search className="h-3.5 w-3.5" />
                          Find Driver
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteDriver(driver.name, index)} className="flex items-center gap-2 text-red-500">
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
