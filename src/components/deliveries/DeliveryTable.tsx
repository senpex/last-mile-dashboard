
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GripVertical } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableContainer } from "@/components/ui/table";
import { Delivery, DeliveryStatus } from "@/types/delivery";
import { ColumnOption } from "@/components/table/ColumnSelector";
import { DeliverySidebar } from "@/components/deliveries/DeliverySidebar";

interface DeliveryTableProps {
  items: Delivery[];
  sortedColumns: string[];
  availableColumns: ColumnOption[];
  getStatusDisplay: (status: string) => string;
  getStatusBadgeVariant: (status: string) => string;
  onCourierClick: (courierName: string) => void;
  // Drag and drop handlers
  handleDragStart: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  handleDragOver: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  handleDragEnd: () => void;
  handleDrop: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  // Filter sidebar props
  isFilterSidebarOpen: boolean;
  toggleFilterSidebar: () => void;
  allDeliveryStatuses: DeliveryStatus[];
  selectedStatuses: DeliveryStatus[];
  setSelectedStatuses: (statuses: DeliveryStatus[]) => void;
}

export function DeliveryTable({
  items,
  sortedColumns,
  availableColumns,
  getStatusDisplay,
  getStatusBadgeVariant,
  onCourierClick,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleDrop,
  isFilterSidebarOpen,
  toggleFilterSidebar,
  allDeliveryStatuses,
  selectedStatuses,
  setSelectedStatuses
}: DeliveryTableProps) {
  return (
    <div className="flex-1 overflow-hidden px-px">
      <div className="flex h-full">
        <DeliverySidebar 
          open={isFilterSidebarOpen} 
          onClose={toggleFilterSidebar} 
          deliveryStatuses={allDeliveryStatuses} 
          selectedStatuses={selectedStatuses} 
          onStatusChange={setSelectedStatuses} 
        />
        
        <div className={`flex-1 transition-all duration-300 my-4 ${isFilterSidebarOpen ? 'ml-3' : ''}`}>
          <div className="flex flex-col h-full">
            <TableContainer stickyHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    {sortedColumns.map(columnId => {
                      const column = availableColumns.find(col => col.id === columnId);
                      if (!column) return null;
                      return (
                        <TableHead 
                          key={columnId} 
                          draggable={true} 
                          onDragStart={e => handleDragStart(e, columnId)} 
                          onDragOver={e => handleDragOver(e, columnId)} 
                          onDragEnd={handleDragEnd} 
                          onDrop={e => handleDrop(e, columnId)} 
                          className={`${columnId === "distance" || columnId === "couriersEarnings" ? "text-right" : ""} whitespace-nowrap truncate max-w-[200px]`}
                        >
                          <div className="flex items-center gap-1 overflow-hidden">
                            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab shrink-0" />
                            <span className="truncate">{column.label}</span>
                          </div>
                        </TableHead>
                      );
                    })}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.length > 0 ? (
                    items.map(delivery => (
                      <TableRow key={delivery.id}>
                        {sortedColumns.map(columnId => {
                          switch (columnId) {
                            case "status":
                              return (
                                <TableCell key={columnId}>
                                  <Badge 
                                    variant={getStatusBadgeVariant(delivery.status) as any}
                                    className={`${delivery.status === "Dropoff Complete" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}`}
                                  >
                                    {getStatusDisplay(delivery.status)}
                                  </Badge>
                                </TableCell>
                              );
                            case "packageId":
                              return (
                                <TableCell key={columnId}>
                                  <span className="font-sans text-sm">{delivery.packageId}</span>
                                </TableCell>
                              );
                            case "orderName":
                              return <TableCell key={columnId}>{delivery.orderName}</TableCell>;
                            case "customerName":
                              return <TableCell key={columnId}>{delivery.customerName}</TableCell>;
                            case "pickupTime":
                              return <TableCell key={columnId}>{delivery.pickupTime}</TableCell>;
                            case "pickupLocation":
                              return (
                                <TableCell key={columnId}>
                                  <div className="flex flex-col">
                                    <span className="font-medium">{delivery.pickupLocation.name}</span>
                                    <span className="text-xs text-muted-foreground">{delivery.pickupLocation.address}</span>
                                  </div>
                                </TableCell>
                              );
                            case "dropoffTime":
                              return <TableCell key={columnId}>{delivery.dropoffTime}</TableCell>;
                            case "dropoffLocation":
                              return (
                                <TableCell key={columnId}>
                                  <div className="flex flex-col">
                                    <span className="font-medium">{delivery.dropoffLocation.name}</span>
                                    <span className="text-xs text-muted-foreground">{delivery.dropoffLocation.address}</span>
                                  </div>
                                </TableCell>
                              );
                            case "price":
                              return <TableCell key={columnId}>{delivery.price}</TableCell>;
                            case "tip":
                              return <TableCell key={columnId}>{delivery.tip}</TableCell>;
                            case "fees":
                              return <TableCell key={columnId}>{delivery.fees}</TableCell>;
                            case "courier":
                              return (
                                <TableCell key={columnId}>
                                  {delivery.courier ? (
                                    <Button 
                                      variant="link" 
                                      className="p-0 h-auto font-normal text-primary" 
                                      onClick={() => onCourierClick(delivery.courier)}
                                    >
                                      {delivery.courier}
                                    </Button>
                                  ) : (
                                    <span>-</span>
                                  )}
                                </TableCell>
                              );
                            case "organization":
                              return <TableCell key={columnId}>{delivery.organization}</TableCell>;
                            case "distance":
                              return <TableCell key={columnId} className="text-right">{delivery.distance}</TableCell>;
                            case "couriersEarnings":
                              return <TableCell key={columnId} className="text-right">{delivery.couriersEarnings || "-"}</TableCell>;
                            default:
                              return <TableCell key={columnId}></TableCell>;
                          }
                        })}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={sortedColumns.length} className="h-24 text-center">
                        No results found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
