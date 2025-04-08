
import React from "react";
import { Delivery } from "@/types/delivery";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnOption } from "@/components/table/ColumnSelector";

interface DeliveryTableProps {
  currentItems: Delivery[];
  columnOrder: string[];
  visibleColumns: string[];
  draggedColumn: string | null;
  dragOverColumn: string | null;
  availableColumns: ColumnOption[];
  handleDragStart: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  handleDragOver: (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => void;
  handleDragEnd: () => void;
  handleDrop: (e: React.DragEvent<HTMLTableCellElement>, targetColumnId: string) => void;
  onCourierClick: (name: string) => void;
}

const DeliveryTable: React.FC<DeliveryTableProps> = ({
  currentItems,
  columnOrder,
  visibleColumns,
  draggedColumn,
  dragOverColumn,
  availableColumns,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleDrop,
  onCourierClick
}) => {
  const getSortedVisibleColumns = () => {
    return visibleColumns
      .filter(column => columnOrder.includes(column))
      .sort((a, b) => columnOrder.indexOf(a) - columnOrder.indexOf(b));
  };

  const sortedColumns = getSortedVisibleColumns();

  return (
    <ScrollArea orientation="horizontal">
      <div className="border rounded-md">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {sortedColumns.map((columnId) => {
                const column = availableColumns.find(col => col.id === columnId);
                if (!column) return null;

                return (
                  <TableHead
                    key={columnId}
                    draggable={true}
                    dragOver={dragOverColumn === columnId}
                    onDragStart={e => handleDragStart(e, columnId)}
                    onDragOver={e => handleDragOver(e, columnId)}
                    onDragEnd={handleDragEnd}
                    onDrop={e => handleDrop(e, columnId)}
                    className="whitespace-nowrap"
                  >
                    <div className="flex items-center gap-1">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      <span>{column.label}</span>
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((delivery) => (
              <TableRow key={delivery.id}>
                {sortedColumns.includes("id") && <TableCell>{delivery.id}</TableCell>}
                
                {sortedColumns.includes("packageId") && <TableCell>{delivery.packageId}</TableCell>}
                
                {sortedColumns.includes("orderName") && <TableCell>{delivery.orderName}</TableCell>}
                
                {sortedColumns.includes("status") && (
                  <TableCell>
                    <Badge>{delivery.status}</Badge>
                  </TableCell>
                )}
                
                {sortedColumns.includes("pickupTime") && <TableCell>{delivery.pickupTime}</TableCell>}
                
                {sortedColumns.includes("pickupLocation") && (
                  <TableCell>
                    <div className="truncate max-w-[200px]">{delivery.pickupLocation.name}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {delivery.pickupLocation.address}
                    </div>
                  </TableCell>
                )}
                
                {sortedColumns.includes("dropoffTime") && <TableCell>{delivery.dropoffTime}</TableCell>}
                
                {sortedColumns.includes("dropoffLocation") && (
                  <TableCell>
                    <div className="truncate max-w-[200px]">{delivery.dropoffLocation.name}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {delivery.dropoffLocation.address}
                    </div>
                  </TableCell>
                )}
                
                {sortedColumns.includes("customerName") && <TableCell>{delivery.customerName || "-"}</TableCell>}
                
                {sortedColumns.includes("price") && <TableCell>{delivery.price}</TableCell>}
                
                {sortedColumns.includes("tip") && <TableCell>{delivery.tip}</TableCell>}
                
                {sortedColumns.includes("fees") && <TableCell>{delivery.fees}</TableCell>}
                
                {sortedColumns.includes("courier") && (
                  <TableCell>
                    {delivery.courier ? (
                      <Button 
                        variant="link" 
                        className="p-0 h-auto" 
                        onClick={() => delivery.courier && onCourierClick(delivery.courier)}
                      >
                        {delivery.courier}
                      </Button>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                )}
                
                {sortedColumns.includes("organization") && <TableCell>{delivery.organization}</TableCell>}
                
                {sortedColumns.includes("distance") && <TableCell>{delivery.distance}</TableCell>}
                
                {sortedColumns.includes("couriersEarnings") && <TableCell>{delivery.couriersEarnings}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
};

export default DeliveryTable;
