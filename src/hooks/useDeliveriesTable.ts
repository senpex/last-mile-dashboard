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
  const [selectedZipcodes, setSelectedZipcodes] = useState<string[]>([]);
  
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'ascending' | 'descending' | null }>({
    key: null,
    direction: null
  });
  
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedPickupAddresses, setSelectedPickupAddresses] = useState<string[]>([]);
  const [selectedDropoffAddresses, setSelectedDropoffAddresses] = useState<string[]>([]);
  const [selectedSenderNames, setSelectedSenderNames] = useState<string[]>([]);
  const [selectedRecipientNames, setSelectedRecipientNames] = useState<string[]>([]);

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
  
  const allZipcodes: string[] = Array.from(
    new Set([
      ...deliveries.map(delivery => {
        const pickupZip = delivery.pickupLocation?.address?.match(/\b\d{5}(?:-\d{4})?\b/)?.[0];
        return pickupZip || "";
      }),
      ...deliveries.map(delivery => {
        const dropoffZip = delivery.dropoffLocation?.address?.match(/\b\d{5}(?:-\d{4})?\b/)?.[0];
        return dropoffZip || "";
      })
    ])
  ).filter(Boolean) as string[];

  const allCities: string[] = Array.from(
    new Set([
      ...deliveries.map(delivery => {
        const pickupCity = delivery.pickupLocation?.address?.match(/([^,]+),\s*[A-Z]{2}/)?.[1]?.trim();
        return pickupCity || "";
      }),
      ...deliveries.map(delivery => {
        const dropoffCity = delivery.dropoffLocation?.address?.match(/([^,]+),\s*[A-Z]{2}/)?.[1]?.trim();
        return dropoffCity || "";
      })
    ])
  ).filter(Boolean) as string[];
  
  const allStates: string[] = Array.from(
    new Set([
      ...deliveries.map(delivery => {
        const pickupState = delivery.pickupLocation?.address?.match(/,\s*([A-Z]{2})/)?.[1];
        return pickupState || "";
      }),
      ...deliveries.map(delivery => {
        const dropoffState = delivery.dropoffLocation?.address?.match(/,\s*([A-Z]{2})/)?.[1];
        return dropoffState || "";
      })
    ])
  ).filter(Boolean) as string[];
  
  const allPickupAddresses: string[] = Array.from(
    new Set(
      deliveries.map(delivery => delivery.pickupLocation?.address || "")
    )
  ).filter(Boolean) as string[];
  
  const allDropoffAddresses: string[] = Array.from(
    new Set(
      deliveries.map(delivery => delivery.dropoffLocation?.address || "")
    )
  ).filter(Boolean) as string[];
  
  const allSenderNames: string[] = Array.from(
    new Set(
      deliveries.map(delivery => delivery.pickupLocation?.name || "")
    )
  ).filter(Boolean) as string[];
  
  const allRecipientNames: string[] = Array.from(
    new Set(
      deliveries.map(delivery => delivery.dropoffLocation?.name || "")
    )
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
    { id: "notes", label: "Notes", default: true },
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
      selectedZipcodes,
      selectedCities,
      selectedStates,
      selectedPickupAddresses,
      selectedDropoffAddresses,
      selectedSenderNames,
      selectedRecipientNames,
      showMyDeliveriesOnly
    );
    console.log("Filters applied:", {
      searchTerm: debouncedSearchTerm,
      activeView,
      selectedStatuses,
      selectedOrganizations,
      selectedCouriers,
      selectedZipcodes,
      selectedCities,
      selectedStates,
      selectedPickupAddresses,
      selectedDropoffAddresses,
      selectedSenderNames,
      selectedRecipientNames,
      showMyDeliveriesOnly
    });
  }, [
    debouncedSearchTerm, 
    activeView, 
    deliveries, 
    selectedStatuses, 
    selectedOrganizations,
    selectedCouriers,
    selectedZipcodes,
    selectedCities,
    selectedStates,
    selectedPickupAddresses,
    selectedDropoffAddresses,
    selectedSenderNames,
    selectedRecipientNames,
    showMyDeliveriesOnly
  ]);

  const applyFilters = useCallback((
    items: Delivery[], 
    searchTerm: string, 
    activeTab: string,
    statusFilters: DeliveryStatus[],
    organizationFilters: string[],
    courierFilters: string[],
    zipcodeFilters: string[],
    cityFilters: string[],
    stateFilters: string[],
    pickupAddressFilters: string[],
    dropoffAddressFilters: string[],
    senderNameFilters: string[],
    recipientNameFilters: string[],
    showMyDeliveriesOnly: boolean
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
          delivery.couriersEarnings,
          delivery.notes
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
    
    if (zipcodeFilters.length > 0) {
      console.log("Filtering by zipcodes:", zipcodeFilters);
      results = results.filter(delivery => {
        const pickupZip = delivery.pickupLocation?.address?.match(/\b\d{5}(?:-\d{4})?\b/)?.[0] || "";
        const dropoffZip = delivery.dropoffLocation?.address?.match(/\b\d{5}(?:-\d{4})?\b/)?.[0] || "";
        
        return zipcodeFilters.some(zip => 
          pickupZip === zip || dropoffZip === zip
        );
      });
      console.log(`Filtered to ${results.length} deliveries with selected zipcodes:`, zipcodeFilters);
    }
    
    if (cityFilters.length > 0) {
      console.log("Filtering by cities:", cityFilters);
      results = results.filter(delivery => {
        const pickupCity = delivery.pickupLocation?.address?.match(/([^,]+),\s*[A-Z]{2}/)?.[1]?.trim() || "";
        const dropoffCity = delivery.dropoffLocation?.address?.match(/([^,]+),\s*[A-Z]{2}/)?.[1]?.trim() || "";
        
        return cityFilters.some(city => 
          pickupCity === city || dropoffCity === city
        );
      });
      console.log(`Filtered to ${results.length} deliveries with selected cities:`, cityFilters);
    }
    
    if (stateFilters.length > 0) {
      console.log("Filtering by states:", stateFilters);
      results = results.filter(delivery => {
        const pickupState = delivery.pickupLocation?.address?.match(/,\s*([A-Z]{2})/)?.[1] || "";
        const dropoffState = delivery.dropoffLocation?.address?.match(/,\s*([A-Z]{2})/)?.[1] || "";
        
        return stateFilters.some(state => 
          pickupState === state || dropoffState === state
        );
      });
      console.log(`Filtered to ${results.length} deliveries with selected states:`, stateFilters);
    }
    
    if (pickupAddressFilters.length > 0) {
      console.log("Filtering by pickup addresses:", pickupAddressFilters);
      results = results.filter(delivery => 
        delivery.pickupLocation?.address && pickupAddressFilters.includes(delivery.pickupLocation.address)
      );
      console.log(`Filtered to ${results.length} deliveries with selected pickup addresses:`, pickupAddressFilters);
    }
    
    if (dropoffAddressFilters.length > 0) {
      console.log("Filtering by dropoff addresses:", dropoffAddressFilters);
      results = results.filter(delivery => 
        delivery.dropoffLocation?.address && dropoffAddressFilters.includes(delivery.dropoffLocation.address)
      );
      console.log(`Filtered to ${results.length} deliveries with selected dropoff addresses:`, dropoffAddressFilters);
    }
    
    if (senderNameFilters.length > 0) {
      console.log("Filtering by sender names:", senderNameFilters);
      results = results.filter(delivery => 
        delivery.pickupLocation?.name && senderNameFilters.includes(delivery.pickupLocation.name)
      );
      console.log(`Filtered to ${results.length} deliveries with selected sender names:`, senderNameFilters);
    }
    
    if (recipientNameFilters.length > 0) {
      console.log("Filtering by recipient names:", recipientNameFilters);
      results = results.filter(delivery => 
        delivery.dropoffLocation?.name && recipientNameFilters.includes(delivery.dropoffLocation.name)
      );
      console.log(`Filtered to ${results.length} deliveries with selected recipient names:`, recipientNameFilters);
    }
    
    setFilteredDeliveries(results);
    setCurrentPage(1);
  }, [currentUserName]);

  const sortDeliveries = useCallback((items: Delivery[]) => {
    const sortableItems = [...items];
    
    if (!sortConfig.key || !sortConfig.direction) {
      return sortableItems;
    }
    
    return sortableItems.sort((a, b) => {
      let aValue: any;
      let bValue: any;
      
      switch (sortConfig.key) {
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        case "packageId":
          aValue = a.packageId;
          bValue = b.packageId;
          break;
        case "orderName":
          aValue = a.orderName;
          bValue = b.orderName;
          break;
        case "customerName":
          aValue = a.customerName;
          bValue = b.customerName;
          break;
        case "pickupTime":
          aValue = a.pickupTime;
          bValue = b.pickupTime;
          break;
        case "dropoffTime":
          aValue = a.dropoffTime;
          bValue = b.dropoffTime;
          break;
        case "pickupLocation":
          aValue = a.pickupLocation.name;
          bValue = b.pickupLocation.name;
          break;
        case "dropoffLocation":
          aValue = a.dropoffLocation.name;
          bValue = b.dropoffLocation.name;
          break;
        case "price":
          aValue = parseFloat(a.price.replace(/[^0-9.-]+/g, ''));
          bValue = parseFloat(b.price.replace(/[^0-9.-]+/g, ''));
          break;
        case "tip":
          aValue = parseFloat(a.tip.replace(/[^0-9.-]+/g, ''));
          bValue = parseFloat(b.tip.replace(/[^0-9.-]+/g, ''));
          break;
        case "courier":
          aValue = a.courier;
          bValue = b.courier;
          break;
        case "organization":
          aValue = a.organization;
          bValue = b.organization;
          break;
        case "distance":
          aValue = parseFloat(a.distance);
          bValue = parseFloat(b.distance);
          break;
        case "couriersEarnings":
          aValue = a.couriersEarnings ? parseFloat(a.couriersEarnings.replace(/[^0-9.-]+/g, '')) : 0;
          bValue = b.couriersEarnings ? parseFloat(b.couriersEarnings.replace(/[^0-9.-]+/g, '')) : 0;
          break;
        default:
          aValue = a[sortConfig.key as keyof Delivery];
          bValue = b[sortConfig.key as keyof Delivery];
      }
      
      if (aValue === null || aValue === undefined || aValue === '') {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (bValue === null || bValue === undefined || bValue === '') {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = null;
      }
    }
    
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    setFilteredDeliveries(prevDeliveries => sortDeliveries(prevDeliveries));
  }, [sortConfig, sortDeliveries]);

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

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    setDraggedColumn(columnId);
    e.dataTransfer.setData('text/plain', columnId);
    
    const dragImage = new Image();
    dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    e.preventDefault();
    if (draggedColumn && draggedColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
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
    allZipcodes,
    selectedZipcodes,
    setSelectedZipcodes,
    
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
    
    sortConfig,
    requestSort
  };
}
