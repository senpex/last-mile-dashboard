
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Sidebar from "@/components/layout/Sidebar";
import { DateRange } from "react-day-picker";
import { getDictionary } from "@/lib/storage";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourierChat from "@/components/chat/CourierChat";
import { deliveriesData } from "@/data/deliveriesData";
import DeliveryFilters from "@/components/deliveries/DeliveryFilters";
import DeliveryTable from "@/components/deliveries/DeliveryTable";
import DeliveryPagination from "@/components/deliveries/DeliveryPagination";
import { useDeliveriesTable } from "@/hooks/useDeliveriesTable";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date("2025-03-24T00:00:00"),
    to: new Date("2025-03-24T23:59:59")
  });
  const [timezone, setTimezone] = useState<string>("America/New_York");
  const [statusDictionary, setStatusDictionary] = useState<any | null>(null);
  const [activeView, setActiveView] = useState<string>("main");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState("");
  const pageSizeOptions = [10, 20, 50, 100];

  const {
    availableColumns,
    visibleColumns,
    setVisibleColumns,
    columnOrder,
    draggedColumn,
    dragOverColumn,
    searchTerm,
    setSearchTerm,
    filteredDeliveries,
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    currentItems,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    handlePageChange,
    handlePageSizeChange
  } = useDeliveriesTable(deliveriesData);

  useEffect(() => {
    const dict = getDictionary("1");
    if (dict) {
      setStatusDictionary(dict);
    }
  }, []);

  const handleCourierClick = (name: string) => {
    setSelectedCourier(name);
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setSelectedCourier("");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 flex-1 overflow-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Deliveries Dashboard</h1>
          </div>

          <Tabs defaultValue="main" className="mb-6">
            <TabsList>
              <TabsTrigger value="main" onClick={() => setActiveView("main")}>Main</TabsTrigger>
              <TabsTrigger value="archive" onClick={() => setActiveView("archive")}>Archive</TabsTrigger>
            </TabsList>
          </Tabs>

          <DeliveryFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            dateRange={dateRange}
            setDateRange={setDateRange}
            timezone={timezone}
            setTimezone={setTimezone}
            availableColumns={availableColumns}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />

          <DeliveryTable
            currentItems={currentItems}
            columnOrder={columnOrder}
            visibleColumns={visibleColumns}
            draggedColumn={draggedColumn}
            dragOverColumn={dragOverColumn}
            availableColumns={availableColumns}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDragEnd={handleDragEnd}
            handleDrop={handleDrop}
            onCourierClick={handleCourierClick}
          />
        </div>

        <DeliveryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          pageSizeOptions={pageSizeOptions}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
      </div>
      
      {isChatOpen && selectedCourier && (
        <CourierChat 
          open={isChatOpen} 
          courierName={selectedCourier} 
          onClose={handleChatClose} 
          hasUnreadMessages={false}
        />
      )}
    </div>
  );
};

export default Index;
