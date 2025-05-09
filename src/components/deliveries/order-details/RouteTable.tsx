import React, { useState } from 'react';
import { MapPin, Map, Edit, Trash2, Phone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Delivery } from "@/types/delivery";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

interface AdditionalLocation {
  name: string;
  address: string;
  description: string;
  distance: string;
  status: string;
  deliveredAt: string;
}

interface RouteTableProps {
  delivery: Delivery;
  additionalLocations: AdditionalLocation[];
  status: string;
  onOpenMap: () => void;
}

export const RouteTable = ({
  delivery,
  additionalLocations: initialAdditionalLocations,
  status,
  onOpenMap
}: RouteTableProps) => {
  const [additionalLocations, setAdditionalLocations] = useState<AdditionalLocation[]>(initialAdditionalLocations);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  
  const handleAddLocation = () => {
    const newLocation: AdditionalLocation = {
      name: "",
      address: "",
      description: "",
      distance: "",
      status: "Pending",
      deliveredAt: ""
    };
    setAdditionalLocations([...additionalLocations, newLocation]);
  };
  
  const handleDeleteLocation = (index: number) => {
    const updatedLocations = [...additionalLocations];
    updatedLocations.splice(index, 1);
    setAdditionalLocations(updatedLocations);
  };
  
  const handleEditClick = (index: number) => {
    if (editingRowIndex === index) {
      setEditingRowIndex(null);
    } else {
      setEditingRowIndex(index);
    }
  };

  const orderStatuses = [
    "Completed", "In Progress", "Pending", "Canceled"
  ];
  
  const barcodeOptions = ["Yes", "No"];
  
  return <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium flex items-center">
          <MapPin className="w-4 h-4 mr-2" /> 
          Route
        </h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1.5" onClick={onOpenMap}>
            <Map className="h-4 w-4" />
            View Map
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1.5" onClick={handleAddLocation}>
            <Plus className="h-4 w-4" />
            Add Location
          </Button>
        </div>
      </div>
      <div className="rounded-md border bg-card/50 p-0">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[180px]">Locations</TableHead>
              <TableHead className="w-[180px]">Contact</TableHead>
              <TableHead className="w-[220px]">Description</TableHead>
              <TableHead className="w-[100px]">Distance</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[120px]">Delivered At</TableHead>
              <TableHead className="w-[100px]">Action 1</TableHead>
              <TableHead className="w-[100px]">Action 2</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex flex-col">
                  <Badge variant="outline" className="mb-1 w-fit bg-blue-100 text-blue-800 border-blue-200">Pickup point</Badge>
                  <p className="text-sm font-medium">{delivery.pickupLocation.name}</p>
                  <p className="text-xs text-muted-foreground">{delivery.pickupLocation.address}</p>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-sm font-medium">John Smith</p>
                <p className="text-xs text-muted-foreground flex items-center">
                  <Phone className="h-3 w-3 mr-1" /> (415) 555-1234
                </p>
              </TableCell>
              <TableCell>
                <p className="text-sm">Pickup location for order items</p>
              </TableCell>
              <TableCell>
                <p className="text-sm">0.0 miles</p>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>
              </TableCell>
              <TableCell>
                <p className="text-sm">{delivery.pickupTime}</p>
              </TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-xs flex items-center gap-1"
                  onClick={() => handleEditClick(-1)}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1 text-destructive">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
            {editingRowIndex === -1 && (
              <TableRow>
                <TableCell colSpan={8} className="p-4 bg-muted/20">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-3 grid grid-cols-3 gap-4">
                      <div className="flex gap-2">
                        <div className="w-2/3">
                          <label className="text-xs font-medium mb-1 block">Location</label>
                          <Input className="h-9 text-sm" defaultValue={delivery.pickupLocation.name} />
                        </div>
                        <div className="w-1/3">
                          <label className="text-xs font-medium mb-1 block">Apt #</label>
                          <Input className="h-9 text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium mb-1 block">Contact name</label>
                        <Input className="h-9 text-sm" defaultValue="John Smith" />
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-1/2">
                          <label className="text-xs font-medium mb-1 block">Longitude</label>
                          <Input className="h-9 text-sm" />
                        </div>
                        <div className="w-1/2">
                          <label className="text-xs font-medium mb-1 block">Latitude</label>
                          <Input className="h-9 text-sm" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium mb-1 block">Phone number</label>
                      <Input className="h-9 text-sm" defaultValue="(415) 555-1234" />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block">Distance</label>
                      <Input className="h-9 text-sm" defaultValue="0.0 miles" />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block">Route time</label>
                      <Input className="h-9 text-sm" />
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium mb-1 block">Status</label>
                      <Select defaultValue="Completed">
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          {orderStatuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block">Barcode scanning</label>
                      <Select defaultValue="No">
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {barcodeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      {/* Empty space for alignment */}
                    </div>
                    
                    <div className="col-span-3">
                      <label className="text-xs font-medium mb-1 block">Stop notes</label>
                      <Textarea className="text-sm h-9 py-1.5 min-h-0" rows={1} defaultValue="Pickup location for order items" />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setEditingRowIndex(null)}>
                      Cancel
                    </Button>
                    <Button size="sm" className="h-7 text-xs">
                      Save Changes
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
            
            {additionalLocations.map((location, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>
                    {location.name || location.address ? <>
                        <p className="text-sm font-medium">{location.name || "-"}</p>
                        <p className="text-xs text-muted-foreground">{location.address || "-"}</p>
                      </> : <p className="text-sm font-medium">-</p>}
                  </TableCell>
                  <TableCell>
                    {/* Display "-" for empty contact information */}
                    <p className="text-sm font-medium">-</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{location.description || "-"}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{location.distance || "-"}</p>
                  </TableCell>
                  <TableCell>
                    {/* Display "-" for empty status or if status is "Pending" */}
                    {location.status && location.status !== "Pending" ? (
                      <Badge variant="outline" className={location.status === "Completed" ? "bg-green-100 text-green-800" : location.status === "In Progress" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>
                        {location.status}
                      </Badge>
                    ) : (
                      <p className="text-sm">-</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{location.deliveredAt || "-"}</p>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs flex items-center gap-1"
                      onClick={() => handleEditClick(index)}
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs flex items-center gap-1 text-destructive"
                      onClick={() => handleDeleteLocation(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
                {editingRowIndex === index && (
                  <TableRow>
                    <TableCell colSpan={8} className="p-4 bg-muted/20">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-3 grid grid-cols-3 gap-4">
                          <div className="flex gap-2">
                            <div className="w-2/3">
                              <label className="text-xs font-medium mb-1 block">Location</label>
                              <Input className="h-9 text-sm" defaultValue={location.name} />
                            </div>
                            <div className="w-1/3">
                              <label className="text-xs font-medium mb-1 block">Apt #</label>
                              <Input className="h-9 text-sm" />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-medium mb-1 block">Contact name</label>
                            <Input className="h-9 text-sm" />
                          </div>
                          <div className="flex space-x-2">
                            <div className="w-1/2">
                              <label className="text-xs font-medium mb-1 block">Longitude</label>
                              <Input className="h-9 text-sm" />
                            </div>
                            <div className="w-1/2">
                              <label className="text-xs font-medium mb-1 block">Latitude</label>
                              <Input className="h-9 text-sm" />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-xs font-medium mb-1 block">Phone number</label>
                          <Input className="h-9 text-sm" />
                        </div>
                        <div>
                          <label className="text-xs font-medium mb-1 block">Distance</label>
                          <Input className="h-9 text-sm" defaultValue={location.distance} />
                        </div>
                        <div>
                          <label className="text-xs font-medium mb-1 block">Route time</label>
                          <Input className="h-9 text-sm" />
                        </div>
                        
                        <div>
                          <label className="text-xs font-medium mb-1 block">Status</label>
                          <Select defaultValue={location.status || "Pending"}>
                            <SelectTrigger className="h-9 text-sm">
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                              {orderStatuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-xs font-medium mb-1 block">Barcode scanning</label>
                          <Select defaultValue="No">
                            <SelectTrigger className="h-9 text-sm">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              {barcodeOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          {/* Empty space for alignment */}
                        </div>
                        
                        <div className="col-span-3">
                          <label className="text-xs font-medium mb-1 block">Stop notes</label>
                          <Textarea className="text-sm h-9 py-1.5 min-h-0" rows={1} defaultValue={location.description} />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setEditingRowIndex(null)}>
                          Cancel
                        </Button>
                        <Button size="sm" className="h-7 text-xs">
                          Save Changes
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
            
            <TableRow>
              <TableCell>
                <div className="flex flex-col">
                  <Badge variant="outline" className="mb-1 w-fit bg-green-100 text-green-800 border-green-200">Dropoff point</Badge>
                  <p className="text-sm font-medium">{delivery.dropoffLocation.name}</p>
                  <p className="text-xs text-muted-foreground">{delivery.dropoffLocation.address}</p>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-sm font-medium">{delivery.customerName}</p>
                <p className="text-xs text-muted-foreground flex items-center">
                  <Phone className="h-3 w-3 mr-1" /> (415) 555-9876
                </p>
              </TableCell>
              <TableCell>
                <p className="text-sm">Final destination for delivery</p>
              </TableCell>
              <TableCell>
                <p className="text-sm">{delivery.distance}</p>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={status === "Dropoff Complete" ? "bg-green-100 text-green-800" : status === "In Transit" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"}>
                  {status === "Dropoff Complete" ? "Completed" : status === "In Transit" ? "In Progress" : "Pending"}
                </Badge>
              </TableCell>
              <TableCell>
                <p className="text-sm">{delivery.dropoffTime}</p>
              </TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-xs flex items-center gap-1"
                  onClick={() => handleEditClick(-2)}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1 text-destructive">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
            {editingRowIndex === -2 && (
              <TableRow>
                <TableCell colSpan={8} className="p-4 bg-muted/20">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-3 grid grid-cols-3 gap-4">
                      <div className="flex gap-2">
                        <div className="w-2/3">
                          <label className="text-xs font-medium mb-1 block">Location</label>
                          <Input className="h-9 text-sm" defaultValue={delivery.dropoffLocation.name} />
                        </div>
                        <div className="w-1/3">
                          <label className="text-xs font-medium mb-1 block">Apt #</label>
                          <Input className="h-9 text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium mb-1 block">Contact name</label>
                        <Input className="h-9 text-sm" defaultValue={delivery.customerName} />
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-1/2">
                          <label className="text-xs font-medium mb-1 block">Longitude</label>
                          <Input className="h-9 text-sm" />
                        </div>
                        <div className="w-1/2">
                          <label className="text-xs font-medium mb-1 block">Latitude</label>
                          <Input className="h-9 text-sm" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium mb-1 block">Phone number</label>
                      <Input className="h-9 text-sm" defaultValue="(415) 555-9876" />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block">Distance</label>
                      <Input className="h-9 text-sm" defaultValue={delivery.distance} />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block">Route time</label>
                      <Input className="h-9 text-sm" />
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium mb-1 block">Status</label>
                      <Select defaultValue={status === "Dropoff Complete" ? "Completed" : status === "In Transit" ? "In Progress" : "Pending"}>
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          {orderStatuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block">Barcode scanning</label>
                      <Select defaultValue="No">
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {barcodeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      {/* Empty space for alignment */}
                    </div>
                    
                    <div className="col-span-3">
                      <label className="text-xs font-medium mb-1 block">Stop notes</label>
                      <Textarea className="text-sm h-9 py-1.5 min-h-0" rows={1} defaultValue="Final destination for delivery" />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setEditingRowIndex(null)}>
                      Cancel
                    </Button>
                    <Button size="sm" className="h-7 text-xs">
                      Save Changes
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>;
};
