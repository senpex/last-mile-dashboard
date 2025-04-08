
import React from 'react';
import { Table, TableContainer } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Delivery, DeliveryStatus } from "@/types/delivery";
import { ColumnOption } from "@/components/table/ColumnSelector";
import { DeliverySidebar } from "@/components/deliveries/DeliverySidebar";
import { TableHeaderComponent } from './TableHeader';
import { TableBodyComponent } from './TableBody';

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
          <div className="w-full max-w-full min-w-[300px] overflow-x-auto mr-0 ml-auto">
            <ScrollArea orientation="horizontal" className="max-w-[calc(100vw-80px)]">
              <TableContainer stickyHeader={false} className="p-3">
                <Table>
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
  );
}
