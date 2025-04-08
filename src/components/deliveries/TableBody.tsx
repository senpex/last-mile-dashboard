
import React from 'react';
import { TableBody as UiTableBody, TableRow } from "@/components/ui/table";
import { Delivery } from "@/types/delivery";
import { DeliveryTableCell } from "./TableCell";

interface TableBodyProps {
  items: Delivery[];
  sortedColumns: string[];
  getStatusDisplay: (status: string) => string;
  getStatusBadgeVariant: (status: string) => string;
  onCourierClick: (courierName: string) => void;
}

export function TableBodyComponent({
  items,
  sortedColumns,
  getStatusDisplay,
  getStatusBadgeVariant,
  onCourierClick
}: TableBodyProps) {
  if (items.length === 0) {
    return (
      <UiTableBody>
        <TableRow>
          <td colSpan={sortedColumns.length} className="h-24 text-center">
            No results found
          </td>
        </TableRow>
      </UiTableBody>
    );
  }

  return (
    <UiTableBody>
      {items.map(delivery => (
        <TableRow key={delivery.id}>
          {sortedColumns.map(columnId => (
            <DeliveryTableCell
              key={`${delivery.id}-${columnId}`}
              columnId={columnId}
              delivery={delivery}
              getStatusDisplay={getStatusDisplay}
              getStatusBadgeVariant={getStatusBadgeVariant}
              onCourierClick={onCourierClick}
            />
          ))}
        </TableRow>
      ))}
    </UiTableBody>
  );
}
