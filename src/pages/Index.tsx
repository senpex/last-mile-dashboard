
import React, { useState } from "react";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Sidebar from "@/components/layout/Sidebar";
import { DateRange } from "react-day-picker";
import CourierChat from "@/components/chat/CourierChat";
import { DeliveryFilters } from "@/components/deliveries/DeliveryFilters";
import { DeliveryTable } from "@/components/deliveries/DeliveryTable";
import { DeliveryPagination } from "@/components/deliveries/DeliveryPagination";
import { DeliverySidebar } from "@/components/deliveries/DeliverySidebar";
import { useDeliveriesTable } from "@/hooks/useDeliveriesTable";
import { deliveriesData } from "@/data/deliveriesData";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date("2025-03-24T00:00:00"),
    to: new Date("2025-03-24T23:59:59")
  });
  const [timezone, setTimezone] = useState<string>("America/New_York");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState("");

  // Use our custom hook for table functionality
  const {
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
    availableColumns,
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
    setSelectedStatuses
  } = useDeliveriesTable({ deliveries: deliveriesData });

  const handleCourierClick = (courierName: string) => {
    if (!courierName) return; // Don't open chat for empty courier names
    setSelectedCourier(courierName);
    setIsChatOpen(true);
  };

  return (
    <ThemeProvider>
      <div className="bg-background flex h-screen overflow-hidden">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed} 
        />
        
        {/* Filter Sidebar */}
        <DeliverySidebar 
          open={isFilterSidebarOpen}
          onClose={toggleFilterSidebar}
          deliveryStatuses={allDeliveryStatuses}
          selectedStatuses={selectedStatuses}
          onStatusChange={setSelectedStatuses}
        />
        
        <main className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-[70px]' : 'ml-[240px]'}`}>
          {/* Filters Section */}
          <DeliveryFilters 
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
            onToggleFilterSidebar={toggleFilterSidebar}
            isFilterSidebarOpen={isFilterSidebarOpen}
          />
          
          {/* Table Section */}
          <DeliveryTable 
            items={currentItems}
            sortedColumns={sortedColumns}
            availableColumns={availableColumns}
            getStatusDisplay={getStatusDisplay}
            getStatusBadgeVariant={getStatusBadgeVariant}
            onCourierClick={handleCourierClick}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDragEnd={handleDragEnd}
            handleDrop={handleDrop}
          />
          
          {/* Pagination Section */}
          <DeliveryPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            pageNumbers={getPageNumbers()}
            pageSizeOptions={pageSizeOptions}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </main>
      </div>

      {/* Courier Chat Component */}
      <CourierChat 
        open={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        courierName={selectedCourier}
      />
    </ThemeProvider>
  );
};

export default Index;
