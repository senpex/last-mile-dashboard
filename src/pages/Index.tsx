
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Sidebar from "@/components/layout/Sidebar";
import { DateRange } from "react-day-picker";
import { ColumnOption } from "@/components/table/ColumnSelector";
import DeliveriesHeader from "@/components/deliveries/DeliveriesHeader";
import DeliveriesTable from "@/components/deliveries/DeliveriesTable";
import DeliveriesPagination from "@/components/deliveries/DeliveriesPagination";
import { useDeliveries } from "@/hooks/useDeliveries";
import { useColumnManagement } from "@/hooks/useColumnManagement";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date("2025-03-24T00:00:00"),
    to: new Date("2025-03-24T23:59:59")
  });
  const [timezone, setTimezone] = useState<string>("America/New_York");
  const [activeView, setActiveView] = useState<string>("main");
  const pageSizeOptions = [10, 20, 50, 100];

  // Available columns definition
  const availableColumns: ColumnOption[] = [
    { id: "status", label: "Status", default: true },
    { id: "packageId", label: "ID", default: true },
    { id: "orderName", label: "Order name", default: true },
    { id: "pickupTime", label: "Pickup Time", default: true },
    { id: "pickupLocation", label: "Pickup Location", default: true },
    { id: "dropoffTime", label: "Dropoff Time", default: true },
    { id: "dropoffLocation", label: "Dropoff Location", default: true },
    { id: "price", label: "Price", default: true },
    { id: "tip", label: "Tip", default: true },
    { id: "fees", label: "Fees", default: false },
    { id: "courier", label: "Courier", default: true },
    { id: "organization", label: "Organization", default: true },
    { id: "distance", label: "Distance", default: true },
  ];

  // Use custom hooks for deliveries and column management
  const {
    searchTerm,
    setSearchTerm,
    statusDictionary,
    statusMapping,
    getPaginationData,
    handlePageChange,
    handlePageSizeChange,
    pageSize,
    currentPage,
  } = useDeliveries();

  const {
    visibleColumns,
    setVisibleColumns,
    draggedColumn,
    setDraggedColumn,
    dragOverColumn,
    setDragOverColumn,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    getSortedVisibleColumns
  } = useColumnManagement(availableColumns);

  // Get current pagination data
  const { totalItems, currentItems } = getPaginationData();
  const sortedColumns = getSortedVisibleColumns();

  return (
    <ThemeProvider>
      <div className="bg-background flex h-screen overflow-hidden">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed} 
        />
        
        <main className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-[70px]' : 'ml-[240px]'}`}>
          {/* Header with filters */}
          <DeliveriesHeader
            dateRange={dateRange}
            setDateRange={setDateRange}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            timezone={timezone}
            setTimezone={setTimezone}
            availableColumns={availableColumns}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            activeView={activeView}
            setActiveView={setActiveView}
          />
          
          {/* Table */}
          <DeliveriesTable
            currentItems={currentItems}
            sortedColumns={sortedColumns}
            availableColumns={availableColumns}
            statusDictionary={statusDictionary}
            statusMapping={statusMapping}
            draggedColumn={draggedColumn}
            setDraggedColumn={setDraggedColumn}
            dragOverColumn={dragOverColumn}
            setDragOverColumn={setDragOverColumn}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragEnd={handleDragEnd}
          />
          
          {/* Pagination */}
          <DeliveriesPagination
            totalItems={totalItems}
            pageSize={pageSize}
            currentPage={currentPage}
            pageSizeOptions={pageSizeOptions}
            handlePageChange={handlePageChange}
            handlePageSizeChange={handlePageSizeChange}
          />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
