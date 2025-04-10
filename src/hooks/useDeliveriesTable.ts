import { useState, useEffect, useCallback } from "react";
import { Delivery, DeliveryStatus } from "@/types/delivery";
import { Dictionary } from "@/types/dictionary";
import { getDictionary } from "@/lib/storage";
import { ColumnOption } from "@/components/table/ColumnSelector";

export interface UseDeliveriesTableProps {
  deliveries: Delivery[];
  showMyDeliveriesOnly?: boolean;
}

export function useDeliveriesTable({ deliveries, showMyDeliveriesOnly = false }: UseDeliveriesTableProps) {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusDictionary, setStatusDictionary] = useState<Dictionary | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [filteredDeliveries, setFilteredDeliveries] = useState<Delivery[]>([]);
  const [activeView, setActiveView] = useState<string>("main");
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<DeliveryStatus[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
  const [selectedCouriers, setSelectedCouriers] = useState<string[]>([]);
  const [zipcode, setZipcode] = useState<string>("");

  const currentUserName = "John Smith";

  const allDeliveryStatuses: DeliveryStatus[] = Array.from(
    new Set(deliveries.map(delivery => delivery.status as DeliveryStatus))
  );

  const allOrganizations: string[] = Array.from(
    new Set(deliveries.map(delivery => delivery.organization))
  ).filter(Boolean) as string[];

  const allCouriers: string[] = Array.from(
    new Set(deliveries.map(delivery => delivery.courier))
  ).filter(Boolean) as string[];

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

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    availableColumns.filter(col => col.default).map(col => col.id)
  );
  
  const [columnOrder, setColumnOrder] = useState<string[]>(
    availableColumns.filter(col => col.default).map(col => col.id)
  );

  const statusMapping: Record<string, string> = {
    "Dropoff Complete": "completed",
    "Canceled By Customer": "cancelled_order",
    "Cancelled By Admin": "cancelled_by_admin",
    "In Transit": "in_transit",
    "Picking Up": "started_working",
    "Arrived For Pickup": "arrived_for_pickup"
  };

  useEffect(() => {
    const dictionary = getDictionary("19");
    if (dictionary) {
      setStatusDictionary(dictionary);
      console.log("Loaded status dictionary:", dictionary);
    } else {
      console.warn("Dictionary with ID 19 not found");
    }
  }, []);

  useEffect(() => {
    setColumnOrder(prevOrder => {
      const newOrder = [...prevOrder];
      
      visibleColumns.forEach(column => {
        if (!newOrder.includes(column)) {
          newOrder.push(column);
        }
      });
      
      return newOrder.filter(column => visibleColumns.includes(column));
    });
  }, [visibleColumns]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length >= 4 || searchTerm.length === 0) {
        setDebouncedSearchTerm(searchTerm);
        console.log("Search term debounced:", searchTerm);
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    applyFilters(
      deliveries, 
      debouncedSearchTerm, 
      activeView, 
      selectedStatuses, 
      selectedOrganizations,
      selectedCouriers,
      showMyDeliveriesOnly,
      zipcode
    );
    console.log("Filters applied:", {
      searchTerm: debouncedSearchTerm,
      activeView,
      selectedStatuses,
      selectedOrganizations,
      selectedCouriers,
      showMyDeliveriesOnly,
      zipcode
    });
  }, [
    debouncedSearchTerm, 
    activeView, 
    deliveries, 
    selectedStatuses, 
    selectedOrganizations,
    selectedCouriers,
    showMyDeliveriesOnly,
    zipcode
  ]);

  const applyFilters = useCallback((
    items: Delivery[], 
    searchTerm: string, 
    activeTab: string,
    statusFilters: DeliveryStatus[],
    organizationFilters: string[],
    courierFilters: string[],
    showMyDeliveriesOnly: boolean,
    zipcode: string
  ) => {
    let results = [...items];
    
    if (showMyDeliveriesOnly) {
      results = results.filter(delivery => 
        delivery.courier === currentUserName
      );
      console.log(`Filtered to ${results.length} deliveries for current user: ${currentUserName}`);
    }
    
    if (searchTerm.length >= 4) {
      console.log("Performing search for:", searchTerm);

      results = results.filter(delivery => {
        const searchableFields = [
          delivery.packageId,
          delivery.orderName,
          delivery.status,
          delivery.pickupTime,
          delivery.pickupLocation.name,
          delivery.pickupLocation.address,
          delivery.dropoffTime,
          delivery.dropoffLocation.name,
          delivery.dropoffLocation.address,
          delivery.customerName,
          delivery.price,
          delivery.tip,
          delivery.courier,
          delivery.organization,
          delivery.distance,
          delivery.couriersEarnings
        ];

        return searchableFields.some(field => 
          field && field.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    
    if (activeTab === "attention") {
      results = results.filter(delivery => 
        delivery.status === "Canceled By Customer" || 
        delivery.status === "Cancelled By Admin"
      );
      console.log(`Filtered to ${results.length} cancelled deliveries for Attention Required tab`);
    }
    
    if (statusFilters.length > 0) {
      console.log("Filtering by statuses:", statusFilters);
      results = results.filter(delivery => 
        statusFilters.includes(delivery.status as DeliveryStatus)
      );
      console.log(`Filtered to ${results.length} deliveries with selected statuses:`, statusFilters);
    }
    
    if (organizationFilters.length > 0) {
      console.log("Filtering by organizations:", organizationFilters);
      results = results.filter(delivery => 
        delivery.organization && organizationFilters.includes(delivery.organization)
      );
      console.log(`Filtered to ${results.length} deliveries with selected organizations:`, organizationFilters);
    }
    
    if (courierFilters.length > 0) {
      console.log("Filtering by couriers:", courierFilters);
      results = results.filter(delivery => 
        delivery.courier && courierFilters.includes(delivery.courier)
      );
      console.log(`Filtered to ${results.length} deliveries with selected couriers:`, courierFilters);
    }
    
    if (zipcode) {
      console.log("Filtering by zipcode:", zipcode);
      results = results.filter(delivery => {
        const pickupAddress = delivery.pickupLocation.address || '';
        const dropoffAddress = delivery.dropoffLocation.address || '';
        
        return pickupAddress.includes(zipcode) || dropoffAddress.includes(zipcode);
      });
      console.log(`Filtered to ${results.length} deliveries with zipcode containing:`, zipcode);
    }
    
    setFilteredDeliveries(results);
    setCurrentPage(1);
  }, [currentUserName]);

  const totalItems = filteredDeliveries.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentItems = filteredDeliveries.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const getPageNumbers = useCallback(() => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        end = Math.min(4, totalPages - 1);
      }
      
      if (currentPage >= totalPages - 2) {
        start = Math.max(totalPages - 3, 2);
      }
      
      if (start > 2) {
        pages.push(-1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push(-2);
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  }, [currentPage, totalPages]);

  const handleDragStart = (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => {
    setDraggedColumn(columnId);
    e.dataTransfer.setData('text/plain', columnId);
    
    const dragImage = new Image();
    dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableCellElement>, columnId: string) => {
    e.preventDefault();
    if (draggedColumn && draggedColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLTableCellElement>, targetColumnId: string) => {
    e.preventDefault();
    
    if (!draggedColumn || draggedColumn === targetColumnId) {
      setDraggedColumn(null);
      setDragOverColumn(null);
      return;
    }
    
    const updatedOrder = [...columnOrder];
    const draggedIndex = updatedOrder.indexOf(draggedColumn);
    const targetIndex = updatedOrder.indexOf(targetColumnId);
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
      updatedOrder.splice(draggedIndex, 1);
      updatedOrder.splice(targetIndex, 0, draggedColumn);
      
      setColumnOrder(updatedOrder);
    }
    
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const getSortedVisibleColumns = useCallback(() => {
    return visibleColumns
      .filter(column => columnOrder.includes(column))
      .sort((a, b) => columnOrder.indexOf(a) - columnOrder.indexOf(b));
  }, [visibleColumns, columnOrder]);

  const sortedColumns = getSortedVisibleColumns();

  const getStatusDisplay = useCallback((statusValue: string): string => {
    if (!statusDictionary) return statusValue;
    
    const dictionaryId = statusMapping[statusValue];
    if (!dictionaryId) return statusValue;
    
    const dictionaryItem = statusDictionary.items.find(item => 
      item.id === dictionaryId
    );
    
    return dictionaryItem ? dictionaryItem.value : statusValue;
  }, [statusDictionary, statusMapping]);

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
        return "secondary";
      case "started_working":
      case "arrived_for_pickup":
        return "warning";
      default:
        return "secondary";
    }
  }, [statusMapping]);

  const toggleFilterSidebar = () => {
    setIsFilterSidebarOpen(prev => !prev);
  };

  return {
    pageSize,
    setPageSize,
    currentPage,
    pageSizeOptions: [10, 20, 50, 100],
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    currentItems,
    handlePageChange,
    handlePageSizeChange,
    getPageNumbers,
    
    searchTerm,
    setSearchTerm,
    activeView,
    setActiveView,
    applyFilters,
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
    setSelectedCouriers,
    
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
    
    getStatusDisplay,
    getStatusBadgeVariant,
    zipcode,
    setZipcode
  };
}
