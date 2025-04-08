
import React from 'react';
import { Table, TableContainer } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Delivery, DeliveryStatus } from "@/types/delivery";
import { ColumnOption } from "@/components/table/ColumnSelector";
import { DeliverySidebar } from "@/components/deliveries/DeliverySidebar";
import { TableHeaderComponent } from './TableHeader';
import { TableBodyComponent } from './TableBody';

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
    <div className="flex-1 overflow-hidden">
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
        
        <div className={`flex-1 transition-all duration-300 ${isFilterSidebarOpen ? 'ml-2' : 'ml-0'}`}>
          <div className="w-full h-full min-w-[300px] mr-0 ml-auto">
            <div className="h-full w-full border rounded-md overflow-hidden p-[5px]"> {/* Added 5px padding */}
              <ScrollArea orientation="both" className="h-full">
                <TableContainer stickyHeader={false} height="auto" className="h-full border-0">
                  <Table className="h-full">
                    <TableHeaderComponent 
                      sortedColumns={sortedColumns}
                      availableColumns={availableColumns}
                      handleDragStart={handleDragStart}
                      handleDragOver={handleDragOver}
                      handleDragEnd={handleDragEnd}
                      handleDrop={handleDrop}
                    />
                    <TableBodyComponent 
                      items={items}
                      sortedColumns={sortedColumns}
                      getStatusDisplay={getStatusDisplay}
                      getStatusBadgeVariant={getStatusBadgeVariant}
                      onCourierClick={onCourierClick}
                    />
                  </Table>
                </TableContainer>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
