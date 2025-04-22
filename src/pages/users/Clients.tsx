import React, { useState, useEffect, useMemo } from 'react';
import Layout from "@/components/layout/Layout";
import { DateRange } from "react-day-picker";
import { ColumnOption } from "@/components/table/ColumnSelector";
import { ClientsFilters } from "@/components/clients/ClientsFilters";
import { ClientsTable } from '@/components/clients/ClientsTable';
import { ClientsSidebar } from "@/components/clients/ClientsSidebar";
import { ClientsPagination } from '@/components/clients/ClientsPagination';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, X, Clock, ChevronDown } from "lucide-react";
import { toast } from "sonner";

type StripeStatus = 'verified' | 'unverified' | 'pending';

const getRandomPhone = (): string => {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const lineNumber = Math.floor(Math.random() * 9000) + 1000;
  return `(${areaCode}) ${prefix}-${lineNumber}`;
};

const getRandomZipcode = (): string => {
  return String(Math.floor(Math.random() * 90000) + 10000);
};

const getRandomAddress = (): string => {
  const streetNumbers = [123, 456, 789, 1010, 555, 777, 888, 999, 321, 654];
  const streetNames = ["Main St", "Oak Ave", "Pine Rd", "Maple Dr", "Cedar Ln", "Elm Blvd", "Park Ave", "River Rd", "Lake Dr", "Forest Way"];
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];
  const states = ["NY", "CA", "IL", "TX", "AZ", "PA", "TX", "CA", "TX", "CA"];
  
  const randomIndex = Math.floor(Math.random() * 10);
  return `${streetNumbers[randomIndex]} ${streetNames[randomIndex]}, ${cities[randomIndex]}, ${states[randomIndex]}`;
};

const generateRandomClients = (count: number, startId: number = 20000): any[] => {
  const firstNames = ["Alice", "Bob", "Charlie", "David", "Eve", "Mallory", "Trent", "Wendy", "Walter", "Peggy"];
  const lastNames = ["Smith", "Jones", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson"];
  const companyNames = ["Acme Corp", "Globex Industries", "Soylent Corp", "Initech", "Wayne Enterprises", "Stark Industries", "Oscorp", "Cyberdyne Systems", "Umbrella Corp", "Tyrell Corp"];
  const statuses = ["active", "inactive", "pending"];
  const stripeStatuses: StripeStatus[] = ['verified', 'unverified', 'pending'];

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${companyNames[i % companyNames.length].toLowerCase().replace(/\s+/g, '')}.com`;

    return {
      id: startId + i,
      name,
      email,
      phone: getRandomPhone(),
      company: companyNames[i % companyNames.length],
      address: getRandomAddress(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      stripeStatus: stripeStatuses[Math.floor(Math.random() * stripeStatuses.length)],
      zipcode: getRandomZipcode(),
      notes: Math.random() > 0.7 ? `Notes for ${name}` : "",
      totalOrders: Math.floor(Math.random() * 100),
      lastOrderDate: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString()
    };
  });
};

const ClientsPage = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [timezone, setTimezone] = useState<string>("America/New_York");
  const [activeView, setActiveView] = useState("main");
  const [clients, setClients] = useState([
    {
      id: 20001,
      name: "Alice Smith",
      email: "alice.smith@acmecorp.com",
      phone: "(123) 456-7890",
      company: "Acme Corp",
      address: "123 Main St, Anytown, CA",
      status: "active",
      stripeStatus: 'verified' as StripeStatus,
      zipcode: "90210",
      notes: "High-value client",
      totalOrders: 42,
      lastOrderDate: "2024-01-15T10:30:00Z"
    },
    {
      id: 20002,
      name: "Bob Jones",
      email: "bob.jones@globexindustries.com",
      phone: "(123) 456-7891",
      company: "Globex Industries",
      address: "456 Oak Ave, Anytown, CA",
      status: "inactive",
      stripeStatus: 'unverified' as StripeStatus,
      zipcode: "90211",
      notes: "Potential client",
      totalOrders: 15,
      lastOrderDate: "2024-02-20T14:45:00Z"
    },
    {
      id: 20003,
      name: "Charlie Williams",
      email: "charlie.williams@soylentcorp.com",
      phone: "(123) 456-7892",
      company: "Soylent Corp",
      address: "789 Pine Ln, Anytown, CA",
      status: "pending",
      stripeStatus: 'pending' as StripeStatus,
      zipcode: "90212",
      notes: "New client",
      totalOrders: 7,
      lastOrderDate: "2024-03-10T09:15:00Z"
    }
  ]);
  
  const [selectedZipcodes, setSelectedZipcodes] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  
  const availableColumns: ColumnOption[] = [
    { id: "id", label: "ID", default: true },
    { id: "name", label: "Name", default: true },
    { id: "email", label: "Email", default: true },
    { id: "phone", label: "Phone", default: true },
    { id: "company", label: "Company", default: true },
    { id: "address", label: "Address", default: true },
    { id: "zipcode", label: "Zipcode", default: false },
    { id: "status", label: "Status", default: true },
    { id: "stripeStatus", label: "Stripe Status", default: true },
    { id: "totalOrders", label: "Total Orders", default: true },
    { id: "lastOrderDate", label: "Last Order Date", default: true },
    { id: "notes", label: "Notes", default: true },
    { id: "actions", label: "Actions", default: true }
  ];
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    availableColumns.filter(col => col.default).map(col => col.id)
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(availableColumns.filter(col => col.default).map(col => col.id));
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageSizeOptions = [5, 10, 20, 30, 50];
  const [rowsPerPage, setRowsPerPage] = useState<string>("10");
  const [filteredClients, setFilteredClients] = useState<any[]>([]);
  const totalItems = filteredClients.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentItems = filteredClients.slice(startIndex, endIndex);
  const [editingNotes, setEditingNotes] = useState<number | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'ascending' | 'descending' | null;
  }>({
    key: null,
    direction: null
  });
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  useEffect(() => {
    setFilteredClients(clients);
  }, [clients]);

  useEffect(() => {
    let filtered = clients;
    
    if (searchTerm.length >= 3) {
      filtered = filtered.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.id.toString().includes(searchTerm)
      );
    }
    
    if (selectedCompanies.length > 0) {
      filtered = filtered.filter(client => selectedCompanies.includes(client.company));
    }
    
    if (selectedZipcodes.length > 0) {
      filtered = filtered.filter(client => selectedZipcodes.includes(client.zipcode));
    }
    
    if (selectedCities.length > 0) {
      filtered = filtered.filter(client => selectedCities.includes(`City ${client.id % 10}`));
    }
    
    if (selectedStates.length > 0) {
      const addressStateMap: { [key: string]: string } = {
        "NY": "NY", 
        "CA": "CA", 
        "IL": "IL", 
        "TX": "TX", 
        "AZ": "AZ", 
        "PA": "PA", 
        "WA": "WA", 
        "FL": "FL", 
        "CO": "CO", 
        "GA": "GA"
      };
      filtered = filtered.filter(client => {
        const state = addressStateMap[client.id % 10] || "CA";
        return selectedStates.includes(state);
      });
    }
    
    setFilteredClients(filtered);
  }, [searchTerm, selectedCompanies, selectedZipcodes, selectedCities, selectedStates, clients]);

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
    setClients(prevClients => {
      const highestId = Math.max(...prevClients.map(c => c.id));
      const newClients = generateRandomClients(50, highestId + 1);
      return [...prevClients, ...newClients];
    });
  }, []);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
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
        pages.push(-1); // First ellipsis
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < totalPages - 1) {
        pages.push(-2); // Second ellipsis
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const handleToggleFilterSidebar = () => {
    setIsFilterSidebarOpen(prev => !prev);
  };

  const renderStripeStatus = (status: 'verified' | 'unverified' | 'pending') => {
    let bgColor = '';
    let icon = null;
    let text = '';
    switch (status) {
      case 'verified':
        bgColor = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        icon = <Check className="h-3.5 w-3.5 mr-1" />;
        text = 'Verified';
        break;
      case 'unverified':
        bgColor = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        icon = <X className="h-3.5 w-3.5 mr-1" />;
        text = 'Unverified';
        break;
      case 'pending':
        bgColor = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        icon = <Clock className="h-3.5 w-3.5 mr-1" />;
        text = 'Pending';
        break;
    }
    return <div className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${bgColor}`}>
        {icon}
        {text}
      </div>;
  };

  const handleNotesClick = (clientId: number) => {
    setEditingNotes(clientId);
  };

  const handleNotesChange = (clientId: number, notes: string) => {
    setClients(prevClients => prevClients.map(client => client.id === clientId ? {
      ...client,
      notes
    } : client));
  };

  const saveNotes = (clientId: number) => {
    setEditingNotes(null);
    toast.success("Client notes updated successfully");
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    setDraggedColumn(columnId);
    e.dataTransfer.setData('text/plain', columnId);
    e.dataTransfer.effectAllowed = 'move';
    
    const ghostElement = document.createElement('div');
    ghostElement.textContent = columnId;
    ghostElement.style.position = 'absolute';
    ghostElement.style.top = '-1000px';
    ghostElement.style.padding = '8px';
    ghostElement.style.backgroundColor = 'white';
    ghostElement.style.border = '1px solid #ccc';
    ghostElement.style.borderRadius = '4px';
    document.body.appendChild(ghostElement);
    
    e.dataTransfer.setDragImage(ghostElement, 20, 20);
    
    setTimeout(() => {
      document.body.removeChild(ghostElement);
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
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
      toast.success(`Column order updated: ${draggedColumn} moved`);
    }
    
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    const headers = document.querySelectorAll('th');
    headers.forEach(header => {
      header.classList.remove('opacity-50');
    });
    
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const getSortedVisibleColumns = () => {
    return visibleColumns.filter(column => columnOrder.includes(column)).sort((a, b) => columnOrder.indexOf(a) - columnOrder.indexOf(b));
  };

  const sortedColumns = getSortedVisibleColumns();

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
    
    if (direction) {
      const sortedClients = [...filteredClients].sort((a, b) => {
        if (a[key] === undefined || b[key] === undefined) return 0;
        
        if (typeof a[key] === 'string' && typeof b[key] === 'string') {
          return direction === 'ascending'
            ? a[key].localeCompare(b[key])
            : b[key].localeCompare(a[key]);
        }
        
        if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
        return 0;
      });
      
      setFilteredClients(sortedClients);
    } else {
      if (searchTerm.length >= 3) {
        const filtered = clients.filter(client => 
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          client.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
          client.phone.includes(searchTerm) ||
          client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.id.toString().includes(searchTerm)
        );
        setFilteredClients(filtered);
      } else {
        setFilteredClients(clients);
      }
    }
  };

  const renderStatus = (status: string) => {
    let bgColor = '';
    let text = '';
    switch (status) {
      case 'active':
        bgColor = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        text = 'Active';
        break;
      case 'inactive':
        bgColor = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        text = 'Inactive';
        break;
      case 'pending':
        bgColor = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        text = 'Pending';
        break;
      default:
        bgColor = 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        text = 'Unknown';
        break;
    }
    return <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${bgColor}`}>
        {text}
      </div>;
  };

  const allZipcodes = useMemo(() => {
    const uniqueZipcodes = new Set<string>();
    clients.forEach(client => {
      if (client.zipcode) {
        uniqueZipcodes.add(client.zipcode);
      }
    });
    return Array.from(uniqueZipcodes).sort();
  }, [clients]);

  const allCities = useMemo(() => {
    const cities = new Set<string>();
    clients.forEach(client => {
      const city = `City ${client.id % 10}`;
      cities.add(city);
    });
    return Array.from(cities).sort();
  }, [clients]);

  const allStates = useMemo(() => {
    const states = new Set<string>(["CA", "NY", "TX", "FL", "IL", "WA", "AZ", "CO", "GA", "NC"]);
    return Array.from(states).sort();
  }, []);

  const allCompanies = useMemo(() => {
    const companies = new Set<string>();
    clients.forEach(client => {
      if (client.company) {
        companies.add(client.company);
      }
    });
    return Array.from(companies).sort();
  }, [clients]);

  const selectedStatuses: string[] = [];
  const setSelectedStatuses = () => {};
  const allClientStatuses = ["active", "inactive", "pending"];

  return (
    <Layout showFooter={false}>
      <div className="flex flex-col h-screen">
        <ClientsFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          timezone={timezone}
          onTimezoneChange={setTimezone}
          availableColumns={availableColumns}
          visibleColumns={visibleColumns}
          onVisibleColumnsChange={setVisibleColumns}
          activeView={activeView}
          onActiveViewChange={setActiveView}
          onToggleFilterSidebar={handleToggleFilterSidebar}
          isFilterSidebarOpen={isFilterSidebarOpen}
        />

        <div className="flex flex-1 w-full overflow-hidden relative">
          <ClientsSidebar
            open={isFilterSidebarOpen}
            onClose={() => setIsFilterSidebarOpen(false)}
            selectedStatuses={selectedStatuses}
            setSelectedStatuses={setSelectedStatuses}
            allClientStatuses={allClientStatuses}
            allZipcodes={allZipcodes}
            selectedZipcodes={selectedZipcodes}
            setSelectedZipcodes={setSelectedZipcodes}
            allCities={allCities}
            selectedCities={selectedCities}
            setSelectedCities={setSelectedCities}
            allStates={allStates}
            selectedStates={selectedStates}
            setSelectedStates={setSelectedStates}
            allCompanies={allCompanies}
            selectedCompanies={selectedCompanies}
            setSelectedCompanies={setSelectedCompanies}
          />

          <div className={`flex-1 w-full transition-all duration-300 ease-in-out ${isFilterSidebarOpen ? "ml-[10px]" : "ml-[10px]"}`}>
            <ClientsTable
              currentItems={currentItems}
              sortedColumns={sortedColumns}
              availableColumns={availableColumns}
              editingNotes={editingNotes}
              draggedColumn={draggedColumn}
              dragOverColumn={dragOverColumn}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              renderStripeStatus={renderStripeStatus}
              handleNotesClick={handleNotesClick}
              handleNotesChange={handleNotesChange}
              saveNotes={saveNotes}
              className="mt-[10px]"
              sortConfig={sortConfig}
              requestSort={requestSort}
              renderStatus={renderStatus}
            />
          </div>
        </div>

        <ClientsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </Layout>
  );
};

export default ClientsPage;
