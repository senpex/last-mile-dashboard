import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GripVertical, MessageCircle, FileText, ChevronUp, ChevronDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Delivery, DeliveryStatus } from "@/types/delivery";
import { ColumnOption } from "@/components/table/ColumnSelector";
import { DeliverySidebar } from "@/components/deliveries/DeliverySidebar";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { OrderDetailsSheet } from "@/components/deliveries/OrderDetailsSheet";
import { UsersTableContainer } from "@/components/ui/users-table-container";

interface DeliveryTableProps {
  items: Delivery[];
  sortedColumns: string[];
  availableColumns: ColumnOption[];
  getStatusDisplay: (status: string) => string;
  getStatusBadgeVariant: (status: string) => string;
  onCourierClick: (courierName: string) => void;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, columnId: string) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>, columnId: string) => void;
  handleDragEnd: () => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, columnId: string) => void;
  isFilterSidebarOpen: boolean;
  toggleFilterSidebar: () => void;
  flaggedOrders: Set<number>;
  onOrderFlag: (orderId: number, isFlagged: boolean) => void;
  allDeliveryStatuses: DeliveryStatus[];
  selectedStatuses: DeliveryStatus[];
  setSelectedStatuses: (statuses: DeliveryStatus[]) => void;
  allOrganizations: string[];
  selectedOrganizations: string[];
  setSelectedOrganizations: (organizations: string[]) => void;
  allCouriers: string[];
  selectedCouriers: string[];
  setSelectedCouriers: (couriers: string[]) => void;
  allZipcodes: string[];
  selectedZipcodes: string[];
  setSelectedZipcodes: (zipcodes: string[]) => void;
  allCities: string[];
  selectedCities: string[];
  setSelectedCities: (cities: string[]) => void;
  allStates: string[];
  selectedStates: string[];
  setSelectedStates: (states: string[]) => void;
  allPickupAddresses: string[];
  selectedPickupAddresses: string[];
  setSelectedPickupAddresses: (addresses: string[]) => void;
  allDropoffAddresses: string[];
  selectedDropoffAddresses: string[];
  setSelectedDropoffAddresses: (addresses: string[]) => void;
  allSenderNames: string[];
  selectedSenderNames: string[];
  setSelectedSenderNames: (names: string[]) => void;
  allRecipientNames: string[];
  selectedRecipientNames: string[];
  setSelectedRecipientNames: (names: string[]) => void;
  sortConfig?: {
    key: string | null;
    direction: 'ascending' | 'descending' | null;
  };
  requestSort?: (key: string) => void;
}

const getColumnWidth = (columnId: string): string => {
  switch (columnId) {
    case "status":
      return "w-[120px] min-w-[120px]";
    case "packageId":
      return "w-[100px] min-w-[100px]";
    case "orderName":
      return "w-[150px] min-w-[150px]";
    case "customerName":
      return "w-[150px] min-w-[150px]";
    case "pickupTime":
      return "w-[120px] min-w-[120px]";
    case "pickupLocation":
      return "w-[200px] min-w-[200px]";
    case "dropoffTime":
      return "w-[120px] min-w-[120px]";
    case "dropoffLocation":
      return "w-[200px] min-w-[200px]";
    case "price":
      return "w-[80px] min-w-[80px]";
    case "tip":
      return "w-[80px] min-w-[80px]";
    case "courier":
      return "w-[130px] min-w-[130px]";
    case "organization":
      return "w-[150px] min-w-[150px]";
    case "distance":
      return "w-[100px] min-w-[100px]";
    case "couriersEarnings":
      return "w-[130px] min-w-[130px]";
    case "notes":
      return "w-[200px] min-w-[150px]";
    default:
      return "w-[120px] min-w-[120px]";
  }
};
const doesCustomerNeedAttention = (customerId: string | number): boolean => {
  let idAsNumber: number;
  if (typeof customerId === 'string') {
    idAsNumber = parseInt(customerId.replace(/\D/g, '') || '0', 10);
  } else {
    idAsNumber = customerId;
  }
  return idAsNumber % 10 < 3;
};
const doesCourierNeedAttention = (deliveryId: number): boolean => {
  return deliveryId % 10 < 3;
};

const DeliveryTable = ({
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
  flaggedOrders,
  onOrderFlag,
  allDeliveryStatuses,
  selectedStatuses,
  setSelectedStatuses,
  allOrganizations,
  selectedOrganizations,
  setSelectedOrganizations,
  allCouriers,
  selectedCouriers,
  setSelectedCouriers,
  allZipcodes,
  selectedZipcodes,
  setSelectedZipcodes,
  allCities,
  selectedCities,
  setSelectedCities,
  allStates,
  selectedStates,
  setSelectedStates,
  allPickupAddresses,
  selectedPickupAddresses,
  setSelectedPickupAddresses,
  allDropoffAddresses,
  selectedDropoffAddresses,
  setSelectedDropoffAddresses,
  allSenderNames,
  selectedSenderNames,
  setSelectedSenderNames,
  allRecipientNames,
  selectedRecipientNames,
  setSelectedRecipientNames,
  sortConfig = {
    key: null,
    direction: null
  },
  requestSort = () => {}
}: DeliveryTableProps) => {
  const [editingNotes, setEditingNotes] = useState<number | null>(null);
  const [notesText, setNotesText] = useState<{
    [key: number]: string;
  }>({});
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  
  const updateDeliveryNotes = (deliveryId: number, notes: string) => {
    console.log(`Updating notes for delivery ${deliveryId}:`, notes);
    setNotesText(prev => ({
      ...prev,
      [deliveryId]: notes
    }));
    setEditingNotes(null);
  };
  
  const handleOpenOrderDetails = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setIsOrderDetailsOpen(true);
  };
  
  const renderSortIcon = (columnId: string) => {
    if (sortConfig.key !== columnId) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? <ChevronUp className="h-4 w-4 ml-1 text-destructive" /> : <ChevronDown className="h-4 w-4 ml-1 text-destructive" />;
  };
  
  const renderCellContent = (delivery: Delivery, columnId: string) => {
    switch (columnId) {
      case "status":
        return <TableCell key={columnId} className={`${getColumnWidth(columnId)} min-w-[120px] w-[120px] text-left`}>
            <Badge variant={getStatusBadgeVariant(delivery.status) as any} className={`
                ${delivery.status === "Dropoff Complete" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                w-full text-center justify-center truncate overflow-hidden whitespace-nowrap
              `}>
              {getStatusDisplay(delivery.status)}
            </Badge>
          </TableCell>;
      case "packageId":
        return <TableCell key={columnId} className={`${getColumnWidth(columnId)} text-left`}>
            <Button 
              variant="link" 
              className="p-0 h-auto font-sans text-sm font-normal text-primary hover:text-primary/80 hover:underline"
              onClick={() => handleOpenOrderDetails(delivery)}
            >
              {delivery.packageId}
            </Button>
          </TableCell>;
      case "orderName":
        return <TableCell key={columnId} className={`${getColumnWidth(columnId)} text-left`}>{delivery.orderName}</TableCell>;
      case "customerName":
        return <TableCell key={columnId} className={`${getColumnWidth(columnId)} text-left`}>
            <div className="flex items-center gap-1.5">
              {delivery.customerName}
              {doesCustomerNeedAttention(delivery.id) && <MessageCircle size={16} className="text-blue-500 shrink-0 cursor-pointer" onClick={() => onCourierClick(`Customer: ${delivery.customerName}`)} />}
            </div>
          </TableCell>;
      case "pickupTime":
        return <TableCell key={columnId} className={`${getColumnWidth(columnId)} text-left`}>{delivery.pickupTime}</TableCell>;
      case "pickupLocation":
        return <TableCell key={columnId} className={`${getColumnWidth(columnId)} text-left`}>
            <div className="flex flex-col">
              <span className="font-medium">{delivery.pickupLocation.name}</span>
              <span className="text-xs text-muted-foreground truncate">{delivery.pickupLocation.address}</span>
            </div>
          </TableCell>;
      case "dropoffTime":
        return <TableCell key={columnId} className={`${getColumnWidth(columnId)} text-left`}>{delivery.dropoffTime}</TableCell>;
      case "dropoffLocation":
        return <TableCell key={columnId} className={`${getColumnWidth(columnId)} text-left`}>
            <div className="flex flex-col">
              <span className="font-medium">{delivery.dropoffLocation.name}</span>
              <span className="text-xs text-muted-foreground truncate">{delivery.dropoffLocation.address}</span>
            </div>
          </TableCell>;
      case "price":
        return <TableCell key={columnId} className={`${getColumnWidth(columnId)} text-left`}>{delivery.price}</TableCell>;
      case "tip":
        return <TableCell key={columnId} className={`${getColumnWidth(columnId)} text-left`}>{delivery.tip}</TableCell>;
      case "courier":
        return <TableCell key={columnId} className={`${getColumnWidth(columnId)} text-left`}>
            {delivery.courier ? <div className="flex items-center gap-1.5">
                <Button variant="link" className="p-0 h-auto font-normal text-primary" onClick={() => onCourierClick(delivery.courier)}>
                  {delivery.courier}
                </Button>
                {doesCourierNeedAttention(delivery.id) && <MessageCircle size={16} className="text-blue-500 shrink-0 cursor-pointer" onClick={() => onCourierClick(`Courier: ${delivery.courier}`)} />}
              </div> : <span>-</span>}
          </TableCell>;
      case "organization":
        return <TableCell key={columnId} className={`${getColumnWidth(columnId)} text-left`}>{delivery.organization}</TableCell>;
      case "distance":
        return <TableCell key={columnId} className={`${getColumnWidth(columnId)} text-left`}>{delivery.distance}</TableCell>;
      case "couriersEarnings":
        return <TableCell key={columnId} className={`${getColumnWidth(columnId)} text-left`}>{delivery.couriersEarnings || "-"}</TableCell>;
      case "notes":
        return <TableCell key={columnId} className={`${getColumnWidth(columnId)} text-left`}>
            {editingNotes === delivery.id ? <div className="flex flex-col gap-2">
                <Textarea placeholder="Add notes about this delivery..." className="min-h-[80px] text-sm" value={notesText[delivery.id] || delivery.notes || ''} onChange={e => setNotesText({
              ...notesText,
              [delivery.id]: e.target.value
            })} />
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs" onClick={() => setEditingNotes(null)}>
                    Cancel
                  </Button>
                  <Button size="sm" className="h-7 px-2 text-xs" onClick={() => updateDeliveryNotes(delivery.id, notesText[delivery.id] || '')}>
                    Save
                  </Button>
                </div>
              </div> : <div className="relative cursor-pointer group flex items-start gap-1" onClick={() => setEditingNotes(delivery.id)}>
                <FileText size={14} className="text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  {delivery.notes || notesText[delivery.id] ? <p className={cn("text-sm max-w-[200px] truncate overflow-hidden whitespace-nowrap", "group-hover:text-primary transition-colors")}>
                      {notesText[delivery.id] || delivery.notes}
                    </p> : <p className="text-muted-foreground italic text-xs group-hover:text-primary transition-colors">
                      Click to add notes
                    </p>}
                  <Button size="sm" variant="ghost" className="absolute right-0 top-0 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => {
                e.stopPropagation();
                setEditingNotes(delivery.id);
              }}>
                    <span className="sr-only">Edit notes</span>
                    <FileText size={12} />
                  </Button>
                </div>
              </div>}
          </TableCell>;
      default:
        return <TableCell key={columnId} className={`${getColumnWidth(columnId)} text-left`}></TableCell>;
    }
  };
  
  return <div className="flex flex-1 w-full overflow-hidden relative p-4 gap-4">
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
        zipcodes={allZipcodes}
        selectedZipcodes={selectedZipcodes}
        onZipcodeChange={setSelectedZipcodes}
        cities={allCities}
        selectedCities={selectedCities}
        onCityChange={setSelectedCities}
        states={allStates}
        selectedStates={selectedStates}
        onStateChange={setSelectedStates}
        pickupAddresses={allPickupAddresses}
        selectedPickupAddresses={selectedPickupAddresses}
        onPickupAddressChange={setSelectedPickupAddresses}
        dropoffAddresses={allDropoffAddresses}
        selectedDropoffAddresses={selectedDropoffAddresses}
        onDropoffAddressChange={setSelectedDropoffAddresses}
        senderNames={allSenderNames}
        selectedSenderNames={selectedSenderNames}
        onSenderNameChange={setSelectedSenderNames}
        recipientNames={allRecipientNames}
        selectedRecipientNames={selectedRecipientNames}
        onRecipientNameChange={setSelectedRecipientNames}
      />
      
      <div className={`transition-all duration-300 ${isFilterSidebarOpen ? 'ml-0' : 'ml-0'} flex-1 overflow-hidden`}>
        <UsersTableContainer stickyHeader={false} independent={true} height="h-[calc(100vh-310px)]">
          <Table className="w-full">
            <TableHeader className="bg-muted/50 border-b-0 sticky top-0 z-10">
              <TableRow>
                {sortedColumns.map(columnId => {
                  const column = availableColumns.find(col => col.id === columnId);
                  if (!column) return null;
                  return <TableHead key={columnId} className={`${getColumnWidth(columnId)} text-left whitespace-nowrap`} onClick={() => requestSort(columnId)}>
                      <div className="flex items-center gap-1">
                        <div draggable={true} onDragStart={e => handleDragStart(e, columnId)} onDragOver={e => handleDragOver(e, columnId)} onDragEnd={handleDragEnd} onDrop={e => handleDrop(e, columnId)} className="cursor-grab">
                          <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                        </div>
                        <button className="flex items-center cursor-pointer hover:text-primary transition-colors" type="button">
                          <span className="truncate">{column.label}</span>
                          {renderSortIcon(columnId)}
                        </button>
                      </div>
                    </TableHead>;
              })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length > 0 ? items.map(delivery => (
                <TableRow key={delivery.id}>
                  {sortedColumns.map(columnId => renderCellContent(delivery, columnId))}
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={sortedColumns.length} className="h-24 text-center">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </UsersTableContainer>
      </div>
      
      <OrderDetailsSheet
        isOpen={isOrderDetailsOpen}
        onClose={() => setIsOrderDetailsOpen(false)}
        delivery={selectedDelivery}
        flaggedOrders={flaggedOrders}
        onOrderFlag={onOrderFlag}
      />
    </div>;
};

export default DeliveryTable;
