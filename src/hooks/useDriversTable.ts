
import { useState, useEffect, useCallback } from "react";
import { ColumnOption } from "@/components/table/ColumnSelector";
import { Dictionary } from "@/types/dictionary";
import { getDictionary } from "@/lib/storage";
import { TransportType } from "@/components/icons/TransportIcon";

// Mock data types for drivers
export interface Driver {
  id: string;
  name: string;
  phone: string;
  rating: number;
  status: string;
  hireStatus: string;
  transports: string[];
  stripeStatus: 'verified' | 'unverified' | 'pending';
  zipcode: string;
  notes?: string;
}

type StripeStatus = 'verified' | 'unverified' | 'pending';

export interface UseDriversTableProps {
  initialDrivers?: Driver[];
}

export function useDriversTable({ initialDrivers = [] }: UseDriversTableProps = {}) {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusDictionary, setStatusDictionary] = useState<Dictionary | null>(null);
  const [hireStatusDictionary, setHireStatusDictionary] = useState<Record<string, string>>({
    'hired': 'Hired',
    'left_vm': 'Left VM',
    'contact_again': 'Contact Again',
    'not_interested': 'Not Interested',
    'blacklist': 'Blacklist',
    'out_of_service': 'Out of Service'
  });
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState<string | null>(null);

  // States for filter options
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedHireStatuses, setSelectedHireStatuses] = useState<string[]>([]);
  const [selectedTransports, setSelectedTransports] = useState<string[]>([]);
  
  const transportTypes: Record<string, string> = {
    '1': 'Car',
    '2': 'SUV',
    '3': 'Van',
    '4': 'Motorcycle',
    '5': 'Scooter',
    'pickup_truck': 'Pickup Truck',
    '9ft_cargo_van': '9ft Cargo Van',
    '10ft_box_truck': '10ft Box Truck',
    '15ft_box_truck': '15ft Box Truck',
    '17ft_box_truck': '17ft Box Truck',
    'refrigerated_van': 'Refrigerated Van'
  };
  
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'ascending' | 'descending' | null }>({
    key: null,
    direction: null
  });
  
  const availableColumns: ColumnOption[] = [
    { id: "name", label: "Name", default: true },
    { id: "phone", label: "Phone", default: true },
    { id: "rating", label: "Rating", default: true },
    { id: "status", label: "Status", default: true },
    { id: "hireStatus", label: "Hire Status", default: true },
    { id: "transports", label: "Transport", default: true },
    { id: "stripeStatus", label: "Stripe Status", default: true },
    { id: "zipcode", label: "Zipcode", default: true },
    { id: "notes", label: "Notes", default: true },
    { id: "actions", label: "Actions", default: true },
  ];

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    availableColumns.filter(col => col.default).map(col => col.id)
  );
  
  const [columnOrder, setColumnOrder] = useState<string[]>(
    availableColumns.filter(col => col.default).map(col => col.id)
  );

  // Generate mock data
  useEffect(() => {
    if (initialDrivers.length > 0) {
      setDrivers(initialDrivers);
      return;
    }

    const getRandomPhone = (): string => {
      const areaCode = Math.floor(Math.random() * 900) + 100;
      const prefix = Math.floor(Math.random() * 900) + 100;
      const lineNumber = Math.floor(Math.random() * 9000) + 1000;
      return `(${areaCode}) ${prefix}-${lineNumber}`;
    };

    const getRandomZipcode = (): string => {
      return String(Math.floor(Math.random() * 90000) + 10000);
    };

    const generateRandomTransports = (): string[] => {
      const transportIds = Object.keys(transportTypes);
      const count = Math.floor(Math.random() * 3) + 1;
      const result: string[] = [];
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * transportIds.length);
        const transportId = transportIds[randomIndex];
        if (!result.includes(transportId)) {
          result.push(transportId);
        }
      }
      return result;
    };

    const generateRandomRating = (): number => {
      return Number((Math.random() * 2 + 3).toFixed(1));
    };

    const generateRandomHireStatus = (): string => {
      const hireStatuses = ['hired', 'left_vm', 'contact_again', 'not_interested', 'blacklist', 'out_of_service'];
      const randomIndex = Math.floor(Math.random() * hireStatuses.length);
      return hireStatuses[randomIndex];
    };

    const generateRandomStripeStatus = (): StripeStatus => {
      const statuses: StripeStatus[] = ['verified', 'unverified', 'pending'];
      const randomIndex = Math.floor(Math.random() * 3);
      return statuses[randomIndex];
    };

    const generateRandomStatus = (): string => {
      const statuses = ['online', 'offline', 'busy'];
      const randomIndex = Math.floor(Math.random() * statuses.length);
      return statuses[randomIndex];
    };

    // Generate 50 mock drivers
    const mockDrivers: Driver[] = Array.from({ length: 50 }, (_, i) => ({
      id: `D${1000 + i}`,
      name: `Driver ${i + 1}`,
      phone: getRandomPhone(),
      rating: generateRandomRating(),
      status: generateRandomStatus(),
      hireStatus: generateRandomHireStatus(),
      transports: generateRandomTransports(),
      stripeStatus: generateRandomStripeStatus(),
      zipcode: getRandomZipcode(),
      notes: i % 3 === 0 ? `Note for driver ${i + 1}` : undefined
    }));

    setDrivers(mockDrivers);
  }, [initialDrivers]);

  // Load dictionary
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

  // Handle search term debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length >= 3 || searchTerm.length === 0) {
        setDebouncedSearchTerm(searchTerm);
        console.log("Search term debounced:", searchTerm);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // Apply filters
  useEffect(() => {
    applyFilters(
      drivers, 
      debouncedSearchTerm, 
      selectedStatuses,
      selectedHireStatuses,
      selectedTransports
    );
  }, [
    debouncedSearchTerm, 
    drivers, 
    selectedStatuses,
    selectedHireStatuses,
    selectedTransports
  ]);

  // Apply sorting
  useEffect(() => {
    setFilteredDrivers(prevDrivers => sortDrivers(prevDrivers));
  }, [sortConfig]);

  const applyFilters = useCallback((
    items: Driver[], 
    searchTerm: string,
    statusFilters: string[],
    hireStatusFilters: string[],
    transportFilters: string[]
  ) => {
    let results = [...items];
    
    if (searchTerm.length >= 3) {
      console.log("Performing search for:", searchTerm);

      results = results.filter(driver => {
        const searchableFields = [
          driver.id,
          driver.name,
          driver.phone,
          driver.status,
          driver.hireStatus,
          driver.zipcode,
          driver.notes
        ];

        return searchableFields.some(field => 
          field && field.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    
    if (statusFilters.length > 0) {
      results = results.filter(driver => 
        statusFilters.includes(driver.status)
      );
    }
    
    if (hireStatusFilters.length > 0) {
      results = results.filter(driver => 
        hireStatusFilters.includes(driver.hireStatus)
      );
    }
    
    if (transportFilters.length > 0) {
      results = results.filter(driver => 
        driver.transports.some(transport => transportFilters.includes(transport))
      );
    }
    
    setFilteredDrivers(results);
    setCurrentPage(1);
  }, []);

  const sortDrivers = useCallback((items: Driver[]) => {
    const sortableItems = [...items];
    
    if (!sortConfig.key || !sortConfig.direction) {
      return sortableItems;
    }
    
    return sortableItems.sort((a, b) => {
      let aValue: any;
      let bValue: any;
      
      switch (sortConfig.key) {
        case "name":
        case "phone":
        case "status":
        case "hireStatus":
        case "zipcode":
        case "notes":
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
          break;
        case "rating":
          aValue = parseFloat(String(a.rating));
          bValue = parseFloat(String(b.rating));
          break;
        case "stripeStatus":
          aValue = a.stripeStatus;
          bValue = b.stripeStatus;
          break;
        case "transports":
          aValue = a.transports.length;
          bValue = b.transports.length;
          break;
        default:
          aValue = a[sortConfig.key as keyof Driver];
          bValue = b[sortConfig.key as keyof Driver];
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

  const totalItems = filteredDrivers.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentItems = filteredDrivers.slice(startIndex, endIndex);
  const pageSizeOptions = [10, 20, 50, 100];

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

  const handleChatOpen = (driverName: string) => {
    setSelectedCourier(driverName);
    setChatOpen(true);
  };

  const handleChatClose = () => {
    setChatOpen(false);
  };

  const handleToggleFilterSidebar = () => {
    setIsFilterSidebarOpen(prev => !prev);
  };

  const renderCellContent = (driver: Driver, columnId: string) => {
    switch (columnId) {
      case "name":
        return driver.name;
      case "phone":
        return driver.phone;
      case "rating":
        return `${driver.rating}`;
      case "status":
        return (
          <div className="flex items-center gap-1">
            <span className={`h-2 w-2 rounded-full ${
              driver.status === 'online' ? 'bg-green-500' :
              driver.status === 'busy' ? 'bg-orange-500' : 'bg-gray-400'
            }`} />
            <span>{driver.status}</span>
          </div>
        );
      case "hireStatus":
        return hireStatusDictionary[driver.hireStatus] || driver.hireStatus;
      case "transports":
        return (
          <div className="flex items-center gap-1">
            {driver.transports.map(transportId => (
              <span key={transportId} title={transportTypes[transportId] || transportId}>
                <TransportIcon 
                  transportType={transportId as TransportType} 
                  size={12} 
                  className="h-[12px] w-[12px]" 
                />
              </span>
            ))}
          </div>
        );
      case "stripeStatus":
        return (
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
            driver.stripeStatus === 'verified' ? 'bg-green-100 text-green-800' :
            driver.stripeStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {driver.stripeStatus === 'verified' ? 'Verified' :
             driver.stripeStatus === 'pending' ? 'Pending' : 'Unverified'}
          </span>
        );
      case "zipcode":
        return driver.zipcode;
      case "notes":
        return driver.notes || "-";
      case "actions":
        return (
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleChatOpen(driver.name)}>
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return {
    drivers,
    currentItems,
    totalItems,
    totalPages,
    pageSize,
    setPageSize,
    currentPage,
    pageSizeOptions,
    handlePageChange,
    handlePageSizeChange,
    getPageNumbers,
    
    searchTerm,
    setSearchTerm,
    isFilterSidebarOpen,
    handleToggleFilterSidebar,
    
    statusDictionary,
    hireStatusDictionary,
    transportTypes,
    
    selectedStatuses,
    setSelectedStatuses,
    selectedHireStatuses,
    setSelectedHireStatuses,
    selectedTransports,
    setSelectedTransports,
    
    availableColumns,
    visibleColumns,
    setVisibleColumns,
    sortedColumns,
    dragOverColumn,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    
    sortConfig,
    requestSort,
    
    chatOpen,
    selectedCourier,
    handleChatOpen,
    handleChatClose,
    
    renderCellContent
  };
}
