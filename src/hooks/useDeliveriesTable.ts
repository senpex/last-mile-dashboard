
import { useState, useCallback } from 'react';
import { Delivery, DeliveryStatus } from "@/types/delivery";

// Define status mapping
const statusMapping: Record<string, string> = {
  "In Transit": "in_transit",
  "Dropoff Complete": "completed",
  "Canceled By Customer": "cancelled_order",
  "Cancelled By Admin": "cancelled_by_admin",
  "Started Working": "started_working",
  "Arrived For Pickup": "arrived_for_pickup"
  // Add other status mappings as needed
};

export const useDeliveriesTable = ({ 
  deliveries, 
  showMyDeliveriesOnly 
}: { 
  deliveries: Delivery[], 
  showMyDeliveriesOnly: boolean 
}) => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSizeOptions: number[] = [5, 10, 20, 50];
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeView, setActiveView] = useState<string>("table");
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "status",
    "packageId",
    "orderName",
    "customerName",
    "pickupTime",
    "pickupLocation",
    "dropoffTime",
    "dropoffLocation",
    "price",
    "tip",
    "courier",
    "organization",
    "distance",
    "couriersEarnings"
  ]);
  const [sortedColumns, setSortedColumns] = useState<string[]>([
    "status",
    "packageId",
    "orderName",
    "customerName",
    "pickupTime",
    "pickupLocation",
    "dropoffTime",
    "dropoffLocation",
    "price",
    "tip",
    "courier",
    "organization",
    "distance",
    "couriersEarnings"
  ]);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<DeliveryStatus[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
  const [selectedCouriers, setSelectedCouriers] = useState<string[]>([]);

  const toggleFilterSidebar = () => {
    setIsFilterSidebarOpen(!isFilterSidebarOpen);
  };

  // Ensure we're using the correct type for delivery statuses
  const allDeliveryStatuses: DeliveryStatus[] = Array.from(new Set(
    deliveries.map(delivery => delivery.status as DeliveryStatus)
  ));
  
  const allOrganizations: string[] = Array.from(new Set(deliveries.map(delivery => delivery.organization)));
  const allCouriers: string[] = Array.from(new Set(deliveries.map(delivery => delivery.courier || "").filter(Boolean)));

  const getStatusDisplay = useCallback((status: string) => {
    return status;
  }, []);

  const getStatusBadgeVariant = useCallback((status: string) => {
    const dictionaryId = statusMapping[status];
    
    switch (dictionaryId) {
      case "completed":
        return "success";
      case "cancelled_order":
        return "destructive";
      case "cancelled_by_admin":
        return "warning";
      case "in_transit":
        return "sky"; // Sky blue variant
      case "started_working":
      case "arrived_for_pickup":
        return "warning";
      default:
        return "secondary";
    }
  }, []);

  const handleDragStart = (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => {
    e.dataTransfer.setData('text/plain', columnId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnd = () => {
    // Reset any visual feedback
  };

  const handleDrop = (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => {
    const draggedColumnId = e.dataTransfer.getData('text/plain');
    if (draggedColumnId === columnId) return;

    setSortedColumns(prevColumns => {
      const newColumns = [...prevColumns];
      const draggedIndex = newColumns.indexOf(draggedColumnId);
      const dropIndex = newColumns.indexOf(columnId);

      newColumns.splice(draggedIndex, 1);
      newColumns.splice(dropIndex, 0, draggedColumnId);

      return newColumns;
    });
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    // Make sure searchTerm is a string before calling toLowerCase()
    const searchTermLower = typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '';
    
    const matchesSearchTerm =
      delivery.packageId.toLowerCase().includes(searchTermLower) ||
      delivery.orderName.toLowerCase().includes(searchTermLower) ||
      delivery.customerName.toLowerCase().includes(searchTermLower) ||
      delivery.pickupLocation.name.toLowerCase().includes(searchTermLower) ||
      delivery.pickupLocation.address.toLowerCase().includes(searchTermLower) ||
      delivery.dropoffLocation.name.toLowerCase().includes(searchTermLower) ||
      delivery.dropoffLocation.address.toLowerCase().includes(searchTermLower) ||
      (delivery.courier?.toLowerCase().includes(searchTermLower) ?? false) ||
      delivery.organization.toLowerCase().includes(searchTermLower) ||
      delivery.status.toLowerCase().includes(searchTermLower);

    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(delivery.status as DeliveryStatus);
    const matchesOrganization = selectedOrganizations.length === 0 || selectedOrganizations.includes(delivery.organization);
    const matchesCourier = selectedCouriers.length === 0 || (delivery.courier && selectedCouriers.includes(delivery.courier));

    return matchesSearchTerm && matchesStatus && matchesOrganization && matchesCourier;
  });

  const deliveriesToShow = showMyDeliveriesOnly ? filteredDeliveries.filter(delivery => delivery.courier === "John Doe") : filteredDeliveries;

  const totalItems = deliveriesToShow.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = deliveriesToShow.slice(startIndex, endIndex);

  return {
    pageSize,
    setPageSize,
    currentPage,
    pageSizeOptions,
    currentItems,
    totalItems,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
    getPageNumbers,
    searchTerm,
    setSearchTerm,
    activeView,
    setActiveView,
    availableColumns: [
      { id: "status", label: "Status", default: true },
      { id: "packageId", label: "Package ID", default: true },
      { id: "orderName", label: "Order Name", default: true },
      { id: "customerName", label: "Customer Name", default: true },
      { id: "pickupTime", label: "Pickup Time", default: true },
      { id: "pickupLocation", label: "Pickup Location", default: true },
      { id: "dropoffTime", label: "Dropoff Time", default: true },
      { id: "dropoffLocation", label: "Dropoff Location", default: true },
      { id: "price", label: "Price", default: true },
      { id: "tip", label: "Tip", default: true },
      { id: "courier", label: "Courier", default: true },
      { id: "organization", label: "Organization", default: true },
      { id: "distance", label: "Distance", default: true },
      { id: "couriersEarnings", label: "Courier's Earnings", default: true }
    ],
    visibleColumns,
    setVisibleColumns,
    sortedColumns,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    getStatusDisplay,
    getStatusBadgeVariant,
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
  };
};
