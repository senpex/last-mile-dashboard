
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { GripVertical } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColumnOption } from "@/components/table/ColumnSelector";
import { Dictionary } from "@/types/dictionary";

interface Delivery {
  id: number;
  packageId: string;
  orderName: string;
  status: string;
  pickupTime: string;
  pickupLocation: {
    name: string;
    address: string;
  };
  dropoffTime: string;
  dropoffLocation: {
    name: string;
    address: string;
  };
  price: string;
  tip: string;
  fees: string;
  courier: string;
  organization: string;
  distance: string;
}

interface DeliveriesTableProps {
  currentItems: Delivery[];
  sortedColumns: string[];
  availableColumns: ColumnOption[];
  statusDictionary: Dictionary | null;
  statusMapping: Record<string, string>;
  draggedColumn: string | null;
  setDraggedColumn: (columnId: string | null) => void;
  dragOverColumn: string | null;
  setDragOverColumn: (columnId: string | null) => void;
  handleDragStart: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  handleDragOver: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  handleDrop: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  handleDragEnd: () => void;
}

const DeliveriesTable: React.FC<DeliveriesTableProps> = ({
  currentItems,
  sortedColumns,
  availableColumns,
  statusDictionary,
  statusMapping,
  draggedColumn,
  setDraggedColumn,
  dragOverColumn,
  setDragOverColumn,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
}) => {
  
  const getStatusDisplay = (statusValue: string): string => {
    if (!statusDictionary) return statusValue;
    
    const dictionaryId = statusMapping[statusValue];
    if (!dictionaryId) return statusValue;
    
    const dictionaryItem = statusDictionary.items.find(item => 
      item.id === dictionaryId
    );
    
    return dictionaryItem ? dictionaryItem.value : statusValue;
  };

  const getStatusBadgeVariant = (status: string) => {
    const dictionaryId = statusMapping[status];
    
    switch (dictionaryId) {
      case "completed":
        return "success";
      case "cancelled_order":
        return "destructive";
      case "in_transit":
        return "default";
      case "started_working":
      case "arrived_for_pickup":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <div className="flex-1 overflow-auto px-4">
      <div className="border rounded-md overflow-hidden my-4">
        <ScrollArea orientation="both">
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
                      dragOver={dragOverColumn === columnId}
                      onDragStart={(e) => handleDragStart(e, columnId)}
                      onDragOver={(e) => handleDragOver(e, columnId)}
                      onDragEnd={handleDragEnd}
                      onDrop={(e) => handleDrop(e, columnId)}
                      className={`${columnId === "distance" ? "text-right" : ""} whitespace-nowrap truncate max-w-[200px]`}
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
              {currentItems.length > 0 ? (
                currentItems.map((delivery) => (
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
                          return <TableCell key={columnId}>{delivery.courier}</TableCell>;
                        case "organization":
                          return <TableCell key={columnId}>{delivery.organization}</TableCell>;
                        case "distance":
                          return <TableCell key={columnId} className="text-right">{delivery.distance}</TableCell>;
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
        </ScrollArea>
      </div>
    </div>
  );
};

export default DeliveriesTable;
