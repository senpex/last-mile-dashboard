import React, { useState } from 'react';
import { MapPin, Map, Edit, Trash2, Phone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Delivery } from "@/types/delivery";
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
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="flex items-center gap-1 text-destructive">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
            
            {additionalLocations.map((location, index) => <TableRow key={index}>
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
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1 text-destructive"
                    onClick={() => handleDeleteLocation(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>)}
            
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
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="flex items-center gap-1 text-destructive">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>;
};
