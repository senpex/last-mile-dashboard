
import React, { useState, useMemo } from 'react';
import { Layout } from "@/components/layout/Layout";
import { DriversTable } from "@/components/drivers/DriversTable";
import { DriversSidebar } from "@/components/drivers/DriversSidebar";
import { DriversFilters } from "@/components/drivers/DriversFilters";
import { DriversPagination } from "@/components/drivers/DriversPagination";
import { DriverProfileSheet } from "@/components/drivers/DriverProfileSheet";
import { Star, StarHalf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { driversData } from "@/data/driversData";
import { useColumnManagement, ExtendedColumnOption } from "@/hooks/useColumnManagement";
import { DateRange } from "react-day-picker";

const availableColumns: ExtendedColumnOption[] = [
  { id: "id", label: "ID", visible: true },
  { id: "name", label: "Name", visible: true },
  { id: "email", label: "Email", visible: true },
  { id: "phone", label: "Phone", visible: true },
  { id: "zipcode", label: "Zip Code", visible: true },
  { id: "address", label: "Address", visible: false },
  { id: "transport", label: "Transport", visible: true },
  { id: "rating", label: "Rating", visible: true },
  { id: "status", label: "Status", visible: true },
  { id: "hireStatus", label: "Hire Status", visible: false },
  { id: "stripeStatus", label: "Stripe Status", visible: false },
  { id: "profileType", label: "Profile Types", visible: false },
  { id: "notes", label: "Notes", visible: true },
  { id: "actions", label: "Actions", visible: true },
];

const transportTypes = {
  "bicycle": "Bicycle",
  "motorcycle": "Motorcycle", 
  "car": "Car",
  "van": "Van",
  "truck": "Truck"
};

const statusDictionary = {
  "1": "Available",
  "2": "Busy", 
  "3": "Offline",
  "4": "On Break"
};

const statusColors = {
  "1": "#22c55e",
  "2": "#f59e0b", 
  "3": "#ef4444",
  "4": "#6b7280"
};

const Drivers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNotes, setEditingNotes] = useState<number | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [timezone, setTimezone] = useState('America/New_York');
  const [activeView, setActiveView] = useState('table');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'ascending' | 'descending' | null }>({
    key: null,
    direction: null,
  });

  const {
    columns,
    sortedColumns,
    draggedColumn,
    dragOverColumn,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    updateColumnVisibility,
  } = useColumnManagement(availableColumns);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return driversData;
    
    return [...driversData].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [sortConfig]);

  const filteredData = useMemo(() => {
    return sortedData.filter(driver =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.includes(searchTerm)
    );
  }, [sortedData, searchTerm]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="ml-1 text-sm text-muted-foreground">({rating})</span>
      </div>
    );
  };

  const renderStatus = (statusId: string) => {
    return (
      <Badge 
        variant="secondary" 
        className="text-white"
        style={{ backgroundColor: statusColors[statusId] || '#6B7280' }}
      >
        {statusDictionary[statusId] || 'Unknown'}
      </Badge>
    );
  };

  const renderHireStatus = (hireStatusId: string, driverId: number) => {
    const isHired = hireStatusId === 'hired';
    return (
      <Badge variant={isHired ? "default" : "outline"}>
        {isHired ? 'Hired' : 'Available'}
      </Badge>
    );
  };

  const renderStripeStatus = (status: 'verified' | 'unverified' | 'pending') => {
    const statusConfig = {
      verified: { label: 'Verified', variant: 'default' as const, className: 'bg-green-500' },
      pending: { label: 'Pending', variant: 'secondary' as const, className: '' },
      unverified: { label: 'Unverified', variant: 'outline' as const, className: '' }
    };
    
    const config = statusConfig[status] || statusConfig.unverified;
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const handleNotesClick = (driverId: number) => {
    setEditingNotes(driverId);
  };

  const handleNotesChange = (driverId: number, notes: string) => {
    // Update driver notes logic here
  };

  const saveNotes = (driverId: number) => {
    setEditingNotes(null);
  };

  const handleEditProfile = (driverId: number) => {
    const driver = driversData.find(d => d.id === driverId);
    setSelectedDriver(driver);
    setIsProfileSheetOpen(true);
  };

  const handleCloseProfileSheet = () => {
    setIsProfileSheetOpen(false);
    setSelectedDriver(null);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <DriversSidebar 
            totalDrivers={totalItems}
          />
          
          <div className="flex-1 space-y-4">
            <DriversFilters 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              timezone={timezone}
              onTimezoneChange={setTimezone}
              availableColumns={columns}
              visibleColumns={sortedColumns}
              onVisibleColumnsChange={() => {}}
              activeView={activeView}
              onActiveViewChange={setActiveView}
              onToggleFilterSidebar={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
              isFilterSidebarOpen={isFilterSidebarOpen}
            />
            
            <DriversTable
              currentItems={currentItems}
              sortedColumns={sortedColumns}
              availableColumns={columns}
              transportTypes={transportTypes}
              statusDictionary={statusDictionary}
              statusColors={statusColors}
              editingNotes={editingNotes}
              draggedColumn={draggedColumn}
              dragOverColumn={dragOverColumn}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              renderRating={renderRating}
              renderStatus={renderStatus}
              renderHireStatus={renderHireStatus}
              renderStripeStatus={renderStripeStatus}
              handleNotesClick={handleNotesClick}
              handleNotesChange={handleNotesChange}
              saveNotes={saveNotes}
              onEditProfile={handleEditProfile}
              sortConfig={sortConfig}
              requestSort={requestSort}
            />
            
            <DriversPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={itemsPerPage}
              pageSizeOptions={[10, 25, 50, 100]}
              onPageChange={setCurrentPage}
              onPageSizeChange={setItemsPerPage}
            />
          </div>
        </div>
      </div>

      <DriverProfileSheet
        isOpen={isProfileSheetOpen}
        onClose={handleCloseProfileSheet}
        driver={selectedDriver}
        transportTypes={transportTypes}
        statusDictionary={statusDictionary}
        statusColors={statusColors}
      />
    </Layout>
  );
};

export default Drivers;
