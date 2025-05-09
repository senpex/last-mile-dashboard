
import React, { useState } from 'react';
import { MapPin, Map, Edit, Trash2, Phone, Plus, MoveVertical } from "lucide-react";
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
  contactName?: string;
  phoneNumber?: string;
  routeTime?: string;
  aptNumber?: string;
  longitude?: string;
  latitude?: string;
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
  // Convert pickup and dropoff points into the same format as additional locations
  const [routeLocations, setRouteLocations] = useState<AdditionalLocation[]>([
    // First location - pickup point
    {
      name: delivery.pickupLocation.name,
      address: delivery.pickupLocation.address,
      description: "Pickup location for order items",
      distance: "0.0 miles",
      status: "Completed",
      deliveredAt: delivery.pickupTime,
      contactName: "John Smith",
      phoneNumber: "(415) 555-1234",
      routeTime: "10:15 AM",
      aptNumber: "101",
      longitude: "-122.4194",
      latitude: "37.7749",
      isPickupPoint: true
    },
    // Middle locations - additional stops
    ...initialAdditionalLocations,
    // Last location - dropoff point
    {
      name: delivery.dropoffLocation.name,
      address: delivery.dropoffLocation.address,
      description: "Final destination for delivery",
      distance: delivery.distance,
      status: status === "Dropoff Complete" ? "Completed" : status === "In Transit" ? "In Progress" : "Pending",
      deliveredAt: delivery.dropoffTime,
      contactName: delivery.customerName || "Customer",
      phoneNumber: "(415) 555-9876",
      routeTime: "11:30 AM",
      aptNumber: "305",
      longitude: "-122.4284",
      latitude: "37.7833",
      isDropoffPoint: true
    }
  ] as any[]);
  
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  const handleAddLocation = () => {
    const newLocation: AdditionalLocation = {
      name: "",
      address: "",
      description: "",
      distance: "",
      status: "Pending",
      deliveredAt: "",
      contactName: "",
      phoneNumber: "",
      routeTime: "",
      aptNumber: "",
      longitude: "",
      latitude: ""
    };
    
    // Insert the new location before the last location (dropoff point)
    const updatedLocations = [...routeLocations];
    updatedLocations.splice(routeLocations.length - 1, 0, newLocation);
    setRouteLocations(updatedLocations);
  };
  
  const handleDeleteLocation = (index: number) => {
    // Only prevent deleting pickup point (first location)
    if (index === 0) {
      return;
    }
    
    const updatedLocations = [...routeLocations];
    updatedLocations.splice(index, 1);
    setRouteLocations(updatedLocations);
  };
  
  const handleEditClick = (index: number) => {
    if (editingRowIndex === index) {
      setEditingRowIndex(null);
    } else {
      setEditingRowIndex(index);
    }
  };

  const handleDragStart = (index: number) => {
    // Prevent dragging pickup point (always stays first)
    if (index === 0) return;
    
    setDraggedIndex(index);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
  };
  
  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    
    // Prevent dropping at position 0 (pickup point must stay first)
    if (index === 0) return;
    
    const updatedLocations = [...routeLocations];
    const draggedLocation = updatedLocations[draggedIndex];
    
    // Remove the dragged item
    updatedLocations.splice(draggedIndex, 1);
    
    // Insert at new position
    updatedLocations.splice(index, 0, draggedLocation);
    
    setRouteLocations(updatedLocations);
    setDraggedIndex(null);
  };

  const orderStatuses = [
    "Completed", "In Progress", "Pending", "Canceled"
  ];
  
  const barcodeOptions = ["Yes", "No"];
  
  const renderLocationBadge = (location: AdditionalLocation, index: number) => {
    if (index === 0) {
      return (
        <Badge variant="outline" className="mb-1 w-fit bg-blue-100 text-blue-800 border-blue-200">Pickup point</Badge>
      );
    } else if (index === routeLocations.length - 1) {
      return (
        <Badge variant="outline" className="mb-1 w-fit bg-green-100 text-green-800 border-green-200">Dropoff point</Badge>
      );
    }
    return null;
  };
  
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
              <TableHead className="w-[40px]"></TableHead>
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
            {routeLocations.map((location, index) => (
              <React.Fragment key={index}>
                <TableRow 
                  draggable={index !== 0} // Prevent dragging the pickup point
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  className={draggedIndex === index ? "opacity-50 bg-muted/30" : ""}
                >
                  <TableCell>
                    {index !== 0 && (
                      <div className="flex justify-center cursor-move" title="Drag to reorder">
                        <MoveVertical className="h-5 w-5 text-muted-foreground/60" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      {renderLocationBadge(location, index)}
                      {location.name || location.address ? <>
                          <p className="text-sm font-medium">{location.name || "-"}</p>
                          <p className="text-xs text-muted-foreground">{location.address || "-"}</p>
                        </> : <p className="text-sm font-medium">-</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{location.contactName || "-"}</p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      {location.phoneNumber ? (
                        <><Phone className="h-3 w-3 mr-1" /> {location.phoneNumber}</>
                      ) : "-"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{location.description || "-"}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{location.distance || "-"}</p>
                  </TableCell>
                  <TableCell>
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
                      disabled={index === 0} // Only prevent deleting the pickup point
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
                {editingRowIndex === index && (
                  <TableRow>
                    <TableCell colSpan={9} className="p-4 bg-muted/20">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-3 grid grid-cols-3 gap-4">
                          <div>
                            <label className="text-xs font-medium mb-1 block">Location</label>
                            <Input className="h-9 text-sm" defaultValue={location.address || "Enter address here..."} />
                          </div>
                          <div>
                            <label className="text-xs font-medium mb-1 block">Apt #</label>
                            <Input className="h-9 text-sm" defaultValue={location.aptNumber || ""} />
                          </div>
                          <div className="flex space-x-2">
                            <div className="w-1/2">
                              <label className="text-xs font-medium mb-1 block">Longitude</label>
                              <Input className="h-9 text-sm" defaultValue={location.longitude || "-122.4084"} />
                            </div>
                            <div className="w-1/2">
                              <label className="text-xs font-medium mb-1 block">Latitude</label>
                              <Input className="h-9 text-sm" defaultValue={location.latitude || "37.7845"} />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-xs font-medium mb-1 block">Distance</label>
                          <Input className="h-9 text-sm" defaultValue={location.distance || "0.0 miles"} />
                        </div>
                        <div>
                          <label className="text-xs font-medium mb-1 block">Contact name</label>
                          <Input className="h-9 text-sm" defaultValue={location.contactName || "Contact Person"} />
                        </div>
                        <div>
                          <label className="text-xs font-medium mb-1 block">Phone number</label>
                          <Input className="h-9 text-sm" defaultValue={location.phoneNumber || "(415) 555-0000"} />
                        </div>
                        
                        <div>
                          <label className="text-xs font-medium mb-1 block">Route time</label>
                          <Input className="h-9 text-sm" defaultValue={location.routeTime || "10:45 AM"} />
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
                        
                        <div className="col-span-3">
                          <label className="text-xs font-medium mb-1 block">Stop notes</label>
                          <Textarea className="text-sm h-9 py-1.5 min-h-0" rows={1} defaultValue={location.description || "Additional stop location"} />
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
          </TableBody>
        </Table>
      </div>
    </div>;
};
