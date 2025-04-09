
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
  handleDragStart: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  handleDragOver: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  handleDragEnd: () => void;
  handleDrop: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  isFilterSidebarOpen: boolean;
  toggleFilterSidebar: () => void;
  allDeliveryStatuses: DeliveryStatus[];
  selectedStatuses: DeliveryStatus[];
  setSelectedStatuses: (statuses: DeliveryStatus[]) => void;
  allOrganizations: string[];
  selectedOrganizations: string[];
  setSelectedOrganizations: (organizations: string[]) => void;
  allCouriers: string[];
  selectedCouriers: string[];
  setSelectedCouriers: (couriers: string[]) => void;
}

// Helper function to determine column width based on column ID
const getColumnWidth = (columnId: string): string => {
  switch(columnId) {
    case "status": return "w-[120px] min-w-[120px]";
    case "packageId": return "w-[100px] min-w-[100px]";
    case "orderName": return "w-[150px] min-w-[150px]";
    case "customerName": return "w-[150px] min-w-[150px]";
    case "pickupTime": return "w-[120px] min-w-[120px]";
    case "pickupLocation": return "w-[200px] min-w-[200px]";
    case "dropoffTime": return "w-[120px] min-w-[120px]";
    case "dropoffLocation": return "w-[200px] min-w-[200px]";
    case "price": return "w-[80px] min-w-[80px]";
    case "tip": return "w-[80px] min-w-[80px]";
    case "courier": return "w-[130px] min-w-[130px]";
    case "organization": return "w-[150px] min-w-[150px]";
    case "distance": return "w-[100px] min-w-[100px]";
    case "couriersEarnings": return "w-[130px] min-w-[130px]";
    default: return "w-[120px] min-w-[120px]";
  }
};

// Helper function to determine if a customer needs attention (30% of customers will get this indicator)
const doesCustomerNeedAttention = (customerId: string | number): boolean => {
  // Convert id to a number and check if it's less than 30% of the max possible value
  // This ensures a consistent 30% of records will have the indicator
  let idAsNumber: number;
  
  if (typeof customerId === 'string') {
    idAsNumber = parseInt(customerId.replace(/\D/g, '') || '0', 10);
  } else {
    idAsNumber = customerId;
  }
  
  return idAsNumber % 10 < 3; // 30% probability (0, 1, 2 out of 0-9)
};

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
  setSelectedStatuses,
  allOrganizations,
  selectedOrganizations,
  setSelectedOrganizations,
  allCouriers,
  selectedCouriers,
  setSelectedCouriers
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
          organizations={allOrganizations}
          selectedOrganizations={selectedOrganizations}
          onOrganizationChange={setSelectedOrganizations}
          couriers={allCouriers}
          selectedCouriers={selectedCouriers}
          onCourierChange={setSelectedCouriers}
        />
        
        <div className="flex-1 transition-all duration-300 my-4 ml-2">
          <div className="flex flex-col h-full w-full">
            <div className="w-full flex-grow flex-shrink-0">
              <TableContainer 
                stickyHeader 
                className="w-full"
                filterSidebarOpen={isFilterSidebarOpen}
              >
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
                            className={`${getColumnWidth(columnId)} ${columnId === "distance" || columnId === "couriersEarnings" ? "text-right" : ""} whitespace-nowrap`}
                          >
                            <div className="flex items-center gap-1">
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
                                  <TableCell key={columnId} className={getColumnWidth(columnId)}>
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
                                  <TableCell key={columnId} className={getColumnWidth(columnId)}>
                                    <span className="font-sans text-sm">{delivery.packageId}</span>
                                  </TableCell>
                                );
                              case "orderName":
                                return <TableCell key={columnId} className={getColumnWidth(columnId)}>{delivery.orderName}</TableCell>;
                              case "customerName":
                                return (
                                  <TableCell key={columnId} className={getColumnWidth(columnId)}>
                                    <div className="flex items-center gap-1.5">
                                      {delivery.customerName}
                                      {doesCustomerNeedAttention(delivery.id) && (
                                        <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                                      )}
                                    </div>
                                  </TableCell>
                                );
                              case "pickupTime":
                                return <TableCell key={columnId} className={getColumnWidth(columnId)}>{delivery.pickupTime}</TableCell>;
                              case "pickupLocation":
                                return (
                                  <TableCell key={columnId} className={getColumnWidth(columnId)}>
                                    <div className="flex flex-col">
                                      <span className="font-medium">{delivery.pickupLocation.name}</span>
                                      <span className="text-xs text-muted-foreground truncate">{delivery.pickupLocation.address}</span>
                                    </div>
                                  </TableCell>
                                );
                              case "dropoffTime":
                                return <TableCell key={columnId} className={getColumnWidth(columnId)}>{delivery.dropoffTime}</TableCell>;
                              case "dropoffLocation":
                                return (
                                  <TableCell key={columnId} className={getColumnWidth(columnId)}>
                                    <div className="flex flex-col">
                                      <span className="font-medium">{delivery.dropoffLocation.name}</span>
                                      <span className="text-xs text-muted-foreground truncate">{delivery.dropoffLocation.address}</span>
                                    </div>
                                  </TableCell>
                                );
                              case "price":
                                return <TableCell key={columnId} className={getColumnWidth(columnId)}>{delivery.price}</TableCell>;
                              case "tip":
                                return <TableCell key={columnId} className={getColumnWidth(columnId)}>{delivery.tip}</TableCell>;
                              case "courier":
                                return (
                                  <TableCell key={columnId} className={getColumnWidth(columnId)}>
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
                                return <TableCell key={columnId} className={getColumnWidth(columnId)}>{delivery.organization}</TableCell>;
                              case "distance":
                                return <TableCell key={columnId} className={`${getColumnWidth(columnId)} text-right`}>{delivery.distance}</TableCell>;
                              case "couriersEarnings":
                                return <TableCell key={columnId} className={`${getColumnWidth(columnId)} text-right`}>{delivery.couriersEarnings || "-"}</TableCell>;
                              default:
                                return <TableCell key={columnId} className={getColumnWidth(columnId)}></TableCell>;
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
    </div>
  );
}
