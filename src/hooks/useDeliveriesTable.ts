
import { useState } from "react";
import { Delivery } from "@/types/delivery";
import { ColumnOption } from "@/components/table/ColumnSelector";
import { useFilteredDeliveries } from "./useFilteredDeliveries";
import { useTableColumns } from "./useTableColumns";
import { usePagination } from "./usePagination";
import { useStatusDictionary } from "./useStatusDictionary";

export interface UseDeliveriesTableProps {
  deliveries: Delivery[];
  showMyDeliveriesOnly?: boolean;
}

export function useDeliveriesTable({ deliveries, showMyDeliveriesOnly = false }: UseDeliveriesTableProps) {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  // Available columns configuration
  const availableColumns: ColumnOption[] = [
    { id: "status", label: "Status", default: true },
    { id: "packageId", label: "ID", default: true },
    { id: "orderName", label: "Order name", default: true },
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
    { id: "couriersEarnings", label: "Couriers Earnings", default: true },
  ];

  // Use our custom hooks
  const {
    filteredDeliveries,
    searchTerm,
    setSearchTerm,
    activeView, 
    setActiveView,
    allDeliveryStatuses,
    selectedStatuses, 
    setSelectedStatuses,
    allOrganizations,
    selectedOrganizations, 
    setSelectedOrganizations,
    allCouriers,
    selectedCouriers, 
    setSelectedCouriers
  } = useFilteredDeliveries({ 
    deliveries,
    showMyDeliveriesOnly
  });

  const {
    visibleColumns,
    setVisibleColumns,
    sortedColumns,
    draggedColumn,
    dragOverColumn,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop
  } = useTableColumns(availableColumns);

  const {
    pageSize,
    setPageSize,
    currentPage,
    pageSizeOptions,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    handlePageChange,
    handlePageSizeChange,
    getPageNumbers
  } = usePagination({ 
    totalItems: filteredDeliveries.length 
  });

  const {
    getStatusDisplay,
    getStatusBadgeVariant
  } = useStatusDictionary();

  const currentItems = filteredDeliveries.slice(startIndex, endIndex);

  const toggleFilterSidebar = () => {
    setIsFilterSidebarOpen(prev => !prev);
  };

  return {
    // Pagination
    pageSize,
    setPageSize,
    currentPage,
    pageSizeOptions,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    currentItems,
    handlePageChange,
    handlePageSizeChange,
    getPageNumbers,
    
    // Filtering
    searchTerm,
    setSearchTerm,
    activeView,
    setActiveView,
    isFilterSidebarOpen,
    toggleFilterSidebar,
    
    // Status filters
    allDeliveryStatuses,
    selectedStatuses,
    setSelectedStatuses,
    
    // Organization filters
    allOrganizations,
    selectedOrganizations,
    setSelectedOrganizations,
    
    // Courier filters
    allCouriers,
    selectedCouriers,
    setSelectedCouriers,
    
    // Column management
    availableColumns,
    visibleColumns,
    setVisibleColumns,
    sortedColumns,
    draggedColumn,
    dragOverColumn,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    
    // Status display
    getStatusDisplay,
    getStatusBadgeVariant
  };
}
