
import React, { useState, useEffect } from 'react';
import { Layout } from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableContainer } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus, Search } from "lucide-react";
import { getDictionary } from "@/lib/storage";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import ColumnSelector, { ColumnOption } from "@/components/table/ColumnSelector";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis,
  PaginationInfo,
  PaginationSize
} from "@/components/ui/pagination";

type StripeStatus = 'Unverified' | 'Pending' | 'Verified';
type HireStatus = string;

const getRandomStripeStatus = (): StripeStatus => {
  const statuses: StripeStatus[] = ['Unverified', 'Pending', 'Verified'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const generateRandomPhone = (): string => {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const lineNumber = Math.floor(Math.random() * 9000) + 1000;
  return `(${areaCode}) ${prefix}-${lineNumber}`;
};

const generateRandomTransports = (): string[] => {
  const transportIds = ['1', '2', '3', '4', '5', 'pickup_truck', '9ft_cargo_van', '10ft_box_truck', '15ft_box_truck', '17ft_box_truck', 'refrigerated_van'];
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

const DriversPage = () => {
  const [transportTypes, setTransportTypes] = useState<{[key: string]: string}>({});
  const [transportIcons, setTransportIcons] = useState<{[key: string]: string | undefined}>({});
  const [statusDictionary, setStatusDictionary] = useState<{[key: string]: string}>({});
  const [statusColors, setStatusColors] = useState<{[key: string]: string}>({});
  const [hireStatusDictionary, setHireStatusDictionary] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(true);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredDrivers, setFilteredDrivers] = useState<any[]>([]);
  const [drivers, setDrivers] = useState([
    { 
      id: 5432, 
      name: "John Doe", 
      email: "john.doe@example.com", 
      phone: "(123) 456-7890", 
      status: "online",
      transports: ["1", "3", "pickup_truck", "9ft_cargo_van"],
      rating: 4.8,
      stripe: getRandomStripeStatus(),
      hireStatus: "active"
    },
    { 
      id: 6543, 
      name: "Jane Smith", 
      email: "jane.smith@example.com", 
      phone: "(123) 456-7891", 
      status: "offline",
      transports: ["2"],
      rating: 3.5,
      stripe: getRandomStripeStatus(),
      hireStatus: "pending"
    },
    { 
      id: 7654, 
      name: "Mike Johnson", 
      email: "mike.johnson@example.com", 
      phone: "(123) 456-7892", 
      status: "busy",
      transports: ["4", "5"],
      rating: 5.0,
      stripe: getRandomStripeStatus(),
      hireStatus: "rejected"
    },
    { 
      id: 8001, 
      name: "Alice Williams", 
      email: "alice.w@example.com", 
      phone: generateRandomPhone(), 
      status: "online",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "active"
    },
    { 
      id: 8002, 
      name: "Robert Miller", 
      email: "robert.m@example.com", 
      phone: generateRandomPhone(), 
      status: "busy",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "active"
    },
    { 
      id: 8003, 
      name: "Emily Davis", 
      email: "emily.d@example.com", 
      phone: generateRandomPhone(), 
      status: "offline",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "pending"
    },
    { 
      id: 8004, 
      name: "James Wilson", 
      email: "james.w@example.com", 
      phone: generateRandomPhone(), 
      status: "online",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "rejected"
    },
    { 
      id: 8005, 
      name: "Sarah Taylor", 
      email: "sarah.t@example.com", 
      phone: generateRandomPhone(), 
      status: "busy",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "active"
    },
    { 
      id: 8006, 
      name: "Daniel Anderson", 
      email: "daniel.a@example.com", 
      phone: generateRandomPhone(), 
      status: "offline",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "pending"
    },
    { 
      id: 8007, 
      name: "Olivia Thomas", 
      email: "olivia.t@example.com", 
      phone: generateRandomPhone(), 
      status: "online",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "active"
    },
    { 
      id: 8008, 
      name: "Matthew Jackson", 
      email: "matthew.j@example.com", 
      phone: generateRandomPhone(), 
      status: "busy",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "rejected"
    },
    { 
      id: 8009, 
      name: "Sophia White", 
      email: "sophia.w@example.com", 
      phone: generateRandomPhone(), 
      status: "offline",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "active"
    },
    { 
      id: 8010, 
      name: "David Harris", 
      email: "david.h@example.com", 
      phone: generateRandomPhone(), 
      status: "online",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "pending"
    },
    { 
      id: 8011, 
      name: "Emma Martin", 
      email: "emma.m@example.com", 
      phone: generateRandomPhone(), 
      status: "busy",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "active"
    },
    { 
      id: 8012, 
      name: "Andrew Thompson", 
      email: "andrew.t@example.com", 
      phone: generateRandomPhone(), 
      status: "offline",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "rejected"
    },
    { 
      id: 8013, 
      name: "Isabella Garcia", 
      email: "isabella.g@example.com", 
      phone: generateRandomPhone(), 
      status: "online",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "active"
    },
    { 
      id: 8014, 
      name: "Joshua Martinez", 
      email: "joshua.m@example.com", 
      phone: generateRandomPhone(), 
      status: "busy",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "pending"
    },
    { 
      id: 8015, 
      name: "Charlotte Robinson", 
      email: "charlotte.r@example.com", 
      phone: generateRandomPhone(), 
      status: "offline",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "active"
    },
    { 
      id: 8016, 
      name: "Christopher Clark", 
      email: "chris.c@example.com", 
      phone: generateRandomPhone(), 
      status: "online",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "rejected"
    },
    { 
      id: 8017, 
      name: "Amelia Rodriguez", 
      email: "amelia.r@example.com", 
      phone: generateRandomPhone(), 
      status: "busy",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "active"
    },
    { 
      id: 8018, 
      name: "Joseph Lewis", 
      email: "joseph.l@example.com", 
      phone: generateRandomPhone(), 
      status: "offline",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "rejected"
    },
    { 
      id: 8019, 
      name: "Mia Walker", 
      email: "mia.w@example.com", 
      phone: generateRandomPhone(), 
      status: "online",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "active"
    },
    { 
      id: 8020, 
      name: "Ethan Hall", 
      email: "ethan.h@example.com", 
      phone: generateRandomPhone(), 
      status: "busy",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "rejected"
    },
    { 
      id: 8021, 
      name: "Harper Young", 
      email: "harper.y@example.com", 
      phone: generateRandomPhone(), 
      status: "offline",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "active"
    },
    { 
      id: 8022, 
      name: "Alexander Allen", 
      email: "alex.a@example.com", 
      phone: generateRandomPhone(), 
      status: "online",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "pending"
    },
    { 
      id: 8023, 
      name: "Abigail King", 
      email: "abigail.k@example.com", 
      phone: generateRandomPhone(), 
      status: "busy",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "active"
    },
    { 
      id: 8024, 
      name: "Benjamin Wright", 
      email: "ben.w@example.com", 
      phone: generateRandomPhone(), 
      status: "offline",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "rejected"
    },
    { 
      id: 8025, 
      name: "Sofia Scott", 
      email: "sofia.s@example.com", 
      phone: generateRandomPhone(), 
      status: "online",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "active"
    },
    { 
      id: 8026, 
      name: "William Green", 
      email: "william.g@example.com", 
      phone: generateRandomPhone(), 
      status: "busy",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "pending"
    },
    { 
      id: 8027, 
      name: "Elizabeth Baker", 
      email: "elizabeth.b@example.com", 
      phone: generateRandomPhone(), 
      status: "offline",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "active"
    },
    { 
      id: 8028, 
      name: "Michael Adams", 
      email: "michael.a@example.com", 
      phone: generateRandomPhone(), 
      status: "online",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "rejected"
    },
    { 
      id: 8029, 
      name: "Camila Nelson", 
      email: "camila.n@example.com", 
      phone: generateRandomPhone(), 
      status: "busy",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "active"
    },
    { 
      id: 8030, 
      name: "Jacob Hill", 
      email: "jacob.h@example.com", 
      phone: generateRandomPhone(), 
      status: "offline",
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripe: getRandomStripeStatus(),
      hireStatus: "pending"
    }
  ]);

  const availableColumns: ColumnOption[] = [
    { id: "id", label: "ID", default: true },
    { id: "name", label: "Name", default: true },
    { id: "email", label: "Email", default: true },
    { id: "phone", label: "Phone", default: true },
    { id: "transport", label: "Transport", default: true },
    { id: "rating", label: "Rating", default: true },
    { id: "status", label: "Status", default: true },
    { id: "hireStatus", label: "Hire status", default: true },
    { id: "stripe", label: "Stripe", default: true },
    { id: "actions", label: "Actions", default: true },
  ];
  
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    availableColumns.filter(col => col.default).map(col => col.id)
  );
  
  const [columnOrder, setColumnOrder] = useState<string[]>(
    availableColumns.filter(col => col.default).map(col => col.id)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageSizeOptions = [5, 10, 20, 30, 50];
  const [rowsPerPage, setRowsPerPage] = useState<string>("10");

  const handleHireStatusChange = (driverId: number, newStatus: string) => {
    setDrivers(prevDrivers => {
      return prevDrivers.map(driver => {
        if (driver.id === driverId) {
          toast.success(`Driver ${driver.name}'s hire status updated to ${hireStatusDictionary[newStatus] || newStatus}`);
          return { ...driver, hireStatus: newStatus };
        }
        return driver;
      });
    });
  };

  useEffect(() => {
    loadTransportDictionary();
    loadStatusDictionary();
    loadHireStatusDictionary();
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

  const getRandomHireStatus = (): string => {
    const hireStatusKeys = Object.keys(hireStatusDictionary);
    if (hireStatusKeys.length === 0) return "pending";
    const randomKey = hireStatusKeys[Math.floor(Math.random() * hireStatusKeys.length)];
    return randomKey;
  };

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const filtered = drivers.filter(driver => 
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.phone.includes(searchTerm) ||
        driver.id.toString().includes(searchTerm)
      );
      setFilteredDrivers(filtered);
    } else {
      setFilteredDrivers(drivers);
    }
  }, [searchTerm, drivers]);

  useEffect(() => {
    setFilteredDrivers(drivers);
  }, [drivers]);

  const loadTransportDictionary = () => {
    const transportDict = getDictionary("2");
    
    if (transportDict && transportDict.items.length > 0) {
      console.log("Transport Dictionary Items:", transportDict.items);
      const types: {[key: string]: string} = {};
      const icons: {[key: string]: string | undefined} = {};
      
      transportDict.items.forEach(item => {
        types[item.id] = item.value;
        icons[item.id] = item.icon;
      });
      
      setTransportTypes(types);
      setTransportIcons(icons);
      console.log("Loaded transport types:", types);
      console.log("Loaded transport icons:", icons);
    } else {
      console.log("Transport dictionary not found or empty for ID: 2");
    }
    setIsLoading(false);
  };

  const loadStatusDictionary = () => {
    const statusDict = getDictionary("6");
    
    if (statusDict && statusDict.items.length > 0) {
      console.log("Status Dictionary Items:", statusDict.items);
      const statuses: {[key: string]: string} = {};
      const colors: {[key: string]: string} = {};
      
      statusDict.items.forEach(item => {
        statuses[item.id] = item.value;
        
        if (item.value.toLowerCase().includes('online')) {
          colors[item.id] = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        } else if (item.value.toLowerCase().includes('busy')) {
          colors[item.id] = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        } else if (item.value.toLowerCase().includes('offline')) {
          colors[item.id] = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        } else {
          colors[item.id] = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        }
      });
      
      setStatusDictionary(statuses);
      setStatusColors(colors);
      console.log("Loaded status types:", statuses);
    } else {
      console.log("Status dictionary not found or empty for ID: 6");
    }
  };

  const loadHireStatusDictionary = () => {
    const hireStatusDict = getDictionary("1455");
    
    if (hireStatusDict && hireStatusDict.items.length > 0) {
      console.log("Hire Status Dictionary Items:", hireStatusDict.items);
      const statuses: {[key: string]: string} = {};
      
      hireStatusDict.items.forEach(item => {
        statuses[item.id] = item.value;
      });
      
      setHireStatusDictionary(statuses);
      console.log("Loaded hire status types:", statuses);
    } else {
      console.log("Hire status dictionary not found or empty for ID: 1455");
      setHireStatusDictionary({
        "active": "Active",
        "pending": "Pending Review",
        "rejected": "Rejected",
        "suspended": "Suspended"
      });
    }
  };

  const getRandomTransportIcon = () => {
    const transportTypes: TransportType[] = [
      'helper', 'car', 'suv', 'pickup_truck', '9ft_cargo_van',
      '10ft_box_truck', '15ft_box_truck', '17ft_box_truck', 'refrigerated_van'
    ];
    
    const randomIndex = Math.floor(Math.random() * transportTypes.length);
    const randomType = transportTypes[randomIndex];
    
    return (
      <div className="flex items-center justify-center">
        <TransportIcon 
          transportType={randomType}
          size={14} 
          className="h-[14px] w-[14px]"
        />
      </div>
    );
  };

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

  const getSortedVisibleColumns = () => {
    return visibleColumns
      .filter(column => columnOrder.includes(column))
      .sort((a, b) => columnOrder.indexOf(a) - columnOrder.indexOf(b));
  };

  const sortedColumns = getSortedVisibleColumns();

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        <span className="font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const renderStripeStatus = (status: StripeStatus) => {
    let badgeVariant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" = "default";
    
    switch(status) {
      case "Verified":
        badgeVariant = "success";
        break;
      case "Pending":
        badgeVariant = "warning";
        break;
      case "Unverified":
        badgeVariant = "outline";
        break;
    }
    
    return (
      <Badge variant={badgeVariant}>
        {status}
      </Badge>
    );
  };

  const renderStatus = (statusId: string) => {
    const statusText = statusDictionary[statusId] || `Unknown (${statusId})`;
    const statusColorClass = statusColors[statusId] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    
    return (
      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColorClass}`}>
        {statusText}
      </div>
    );
  };

  const renderHireStatus = (statusId: string, driverId: number) => {
    if (Object.keys(hireStatusDictionary).length === 0) {
      return <div className="text-sm text-muted-foreground">Loading...</div>;
    }
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
            {hireStatusDictionary[statusId] || statusId}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {Object.entries(hireStatusDictionary).map(([key, value]) => (
            <DropdownMenuItem 
              key={key}
              onClick={() => handleHireStatusChange(driverId, key)}
              className={statusId === key ? "bg-muted" : ""}
            >
              {value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const totalItems = filteredDrivers.length;

  return (
    <Layout showFooter={false}>
      <div className="w-full"> {/* Replaced container with full width */}
        <div className="flex flex-col h-[calc(100vh-56px)] space-y-4 px-6"> {/* Kept horizontal padding on content */}
          <h1 className="text-2xl font-bold">Drivers Management</h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center h-9 gap-2">
              <Button size="sm" className="flex items-center gap-1 text-xs px-2 py-1 h-9">
                <Plus className="w-3 h-3" />
                Add Driver
              </Button>
            </div>
            <div className="flex items-center h-9 gap-2">
              <div className="relative h-9">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search drivers..."
                  className="w-[200px] pl-8 text-xs h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ColumnSelector
                columns={availableColumns}
                visibleColumns={visibleColumns}
                setVisibleColumns={setVisibleColumns}
              />
            </div>
          </div>

          <ScrollArea className="flex-grow" orientation="both">
            <TableContainer stickyHeader={false} height="h-[calc(100vh-220px)]">
              <Table>
                <TableHeader>
                  <TableRow>
                    {sortedColumns.map((columnId) => {
                      const column = availableColumns.find(col => col.id === columnId);
                      if (!column) return null;
                      
                      return (
                        <TableHead 
                          key={columnId}
                          draggable={true}
                          dragOver={dragOverColumn === columnId}
                          onDragStart={(e) => handleDragStart(e, columnId)}
                          onDragOver={(e) => handleDragOver(e, columnId)}
                          onDragEnd={handleDragEnd}
                          onDrop={(e) => handleDrop(e, columnId)}
                          className={`${columnId === "id" ? "text-right" : ""} whitespace-nowrap truncate max-w-[200px]`}
                        >
                          <div className="flex items-center gap-1 overflow-hidden">
                            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab shrink-0" />
                            <span className="truncate">{column.label}</span>
                          </div>
                        </TableHead>
                      );
                    })}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDrivers.map((driver) => (
                    <TableRow key={driver.id}>
                      {sortedColumns.includes("id") && (
                        <TableCell className="font-sans">{driver.id}</TableCell>
                      )}
                      {sortedColumns.includes("name") && (
                        <TableCell>{driver.name}</TableCell>
                      )}
                      {sortedColumns.includes("email") && (
                        <TableCell>{driver.email}</TableCell>
                      )}
                      {sortedColumns.includes("phone") && (
                        <TableCell>{driver.phone}</TableCell>
                      )}
                      {sortedColumns.includes("transport") && (
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {driver.transports.map((transportId) => (
                              <div 
                                key={transportId} 
                                className="flex items-center justify-center p-2 rounded-md bg-muted" 
                                title={transportTypes[transportId] || `Transport ID: ${transportId}`}
                              >
                                <TransportIcon 
                                  transportType={transportId as TransportType} 
                                  size={14} 
                                  className="h-[14px] w-[14px]"
                                />
                              </div>
                            ))}
                          </div>
                        </TableCell>
                      )}
                      {sortedColumns.includes("rating") && (
                        <TableCell>
                          {renderRating(driver.rating)}
                        </TableCell>
                      )}
                      {sortedColumns.includes("status") && (
                        <TableCell>
                          {renderStatus(driver.status)}
                        </TableCell>
                      )}
                      {sortedColumns.includes("hireStatus") && (
                        <TableCell>
                          {renderHireStatus(driver.hireStatus, driver.id)}
                        </TableCell>
                      )}
                      {sortedColumns.includes("stripe") && (
                        <TableCell>
                          {renderStripeStatus(driver.stripe)}
                        </TableCell>
                      )}
                      {sortedColumns.includes("actions") && (
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ScrollArea>

          <div className="border-t bg-background px-4 py-3 flex justify-between items-center shadow-sm flex-shrink-0 w-full">
            <div className="text-sm text-muted-foreground">
              Total: <span className="bg-muted px-2 py-1 rounded">{filteredDrivers.length}</span>
            </div>
            
            <Pagination className="flex-1 flex justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink
                    className="cursor-not-allowed opacity-50"
                    aria-disabled="true"
                  >
                    <span className="sr-only">First page</span>
                    ⟪
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious
                    className="cursor-not-allowed opacity-50"
                    aria-disabled="true"
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className="cursor-not-allowed opacity-50"
                    aria-disabled="true"
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className="cursor-not-allowed opacity-50"
                    aria-disabled="true"
                  >
                    <span className="sr-only">Last page</span>
                    ⟫
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Rows per page</span>
              <Select
                value={rowsPerPage}
                onValueChange={setRowsPerPage}
              >
                <SelectTrigger className="w-[70px] h-8">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DriversPage;
