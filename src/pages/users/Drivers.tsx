import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { DriversTable } from "@/components/drivers/DriversTable";
import { DriverProfileDrawer } from "@/components/drivers/DriverProfileDrawer";
import { DriversFilters } from "@/components/drivers/DriversFilters";
import { DriversPagination } from "@/components/drivers/DriversPagination";
import { UserFiltersLayout } from "@/components/users/UserFiltersLayout";
import { Button } from "@/components/ui/button";
import { Users, Filter, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ColumnOption } from "@/components/table/ColumnSelector";
import { DeliveryStatus } from "@/types/delivery";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DriversPage = () => {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'ascending' | 'descending' | null }>({
    key: 'id',
    direction: 'ascending'
  });
  
  // Add new state for driver profile drawer
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [isDriverProfileOpen, setIsDriverProfileOpen] = useState(false);

  // Filter states
  const [selectedStatuses, setSelectedStatuses] = useState<DeliveryStatus[]>([]);
  const [selectedZipcodes, setSelectedZipcodes] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  // Table column states
  const [availableColumns, setAvailableColumns] = useState<ColumnOption[]>([
    { id: "id", label: "ID", isVisible: true },
    { id: "name", label: "Name", isVisible: true },
    { id: "email", label: "Email", isVisible: true },
    { id: "phone", label: "Phone", isVisible: true },
    { id: "zipcode", label: "Zipcode", isVisible: true },
    { id: "address", label: "Address", isVisible: false },
    { id: "transport", label: "Transport", isVisible: true },
    { id: "rating", label: "Rating", isVisible: true },
    { id: "status", label: "Status", isVisible: true },
    { id: "hireStatus", label: "Hire Status", isVisible: true },
    { id: "stripeStatus", label: "Stripe Status", isVisible: true },
    { id: "profileType", label: "Profile Type", isVisible: true },
    { id: "notes", label: "Notes", isVisible: true },
    { id: "actions", label: "Actions", isVisible: true },
  ]);

  const [sortedColumns, setSortedColumns] = useState<string[]>(
    availableColumns.filter(col => col.isVisible).map(col => col.id)
  );

  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<number | null>(null);

  // Mock data
  const allDeliveryStatuses: DeliveryStatus[] = [
    "Online",
    "Offline",
    "Busy",
    "Not approved",
    "Available",
    "On Break"
  ];

  const allZipcodes = ["10001", "20001", "30001", "40001", "50001"];
  const allCities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
  const allStates = ["NY", "CA", "IL", "TX", "AZ"];

  const transportTypes: { [key: string]: string } = {
    "car": "Car",
    "bike": "Bike",
    "scooter": "Scooter",
    "walk": "Walking",
    "motorcycle": "Motorcycle",
    "truck": "Truck",
    "van": "Van"
  };

  const statusDictionary: { [key: string]: string } = {
    "online": "Online",
    "offline": "Offline",
    "busy": "Busy",
    "not_approved": "Not Approved",
    "available": "Available",
    "on_break": "On Break"
  };

  const statusColors: { [key: string]: string } = {
    "online": "#22c55e",
    "offline": "#6b7280",
    "busy": "#f97316",
    "not_approved": "#ef4444",
    "available": "#3b82f6",
    "on_break": "#eab308"
  };

  // Mock data for drivers
  const mockDrivers = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Driver ${i + 1}`,
    email: `driver${i + 1}@example.com`,
    phone: `+1 (555) ${String(100 + i).padStart(3, '0')}-${String(1000 + i).slice(1)}`,
    zipcode: allZipcodes[Math.floor(Math.random() * allZipcodes.length)],
    address: `${1000 + i} Main St, ${allCities[Math.floor(Math.random() * allCities.length)]}, ${allStates[Math.floor(Math.random() * allStates.length)]} ${allZipcodes[Math.floor(Math.random() * allZipcodes.length)]}`,
    transports: [
      Object.keys(transportTypes)[Math.floor(Math.random() * Object.keys(transportTypes).length)],
      Object.keys(transportTypes)[Math.floor(Math.random() * Object.keys(transportTypes).length)]
    ].filter((v, i, a) => a.indexOf(v) === i), // Remove duplicates
    rating: Math.floor(Math.random() * 5) + 1,
    status: Object.keys(statusDictionary)[Math.floor(Math.random() * Object.keys(statusDictionary).length)],
    hireStatus: ["pending", "approved", "rejected"][Math.floor(Math.random() * 3)],
    stripeStatus: ["verified", "unverified", "pending"][Math.floor(Math.random() * 3)],
    profileTypes: [
      ["Business", "Individual", "Enterprise"][Math.floor(Math.random() * 3)],
      ["Premium", "Standard", "Basic"][Math.floor(Math.random() * 3)]
    ].filter((v, i, a) => a.indexOf(v) === i), // Remove duplicates
    notes: Math.random() > 0.7 ? `Note for driver ${i + 1}: ${Math.random().toString(36).substring(2, 15)}` : ""
  }));

  // Filter and sort the data
  const filteredItems = mockDrivers.filter(driver => {
    // Apply status filter
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(statusDictionary[driver.status] as DeliveryStatus)) {
      return false;
    }
    
    // Apply zipcode filter
    if (selectedZipcodes.length > 0 && !selectedZipcodes.includes(driver.zipcode)) {
      return false;
    }
    
    // Apply city filter
    if (selectedCities.length > 0 && !driver.address.includes(selectedCities.find(city => driver.address.includes(city)) || "")) {
      return false;
    }
    
    // Apply state filter
    if (selectedStates.length > 0 && !driver.address.includes(selectedStates.find(state => driver.address.includes(state)) || "")) {
      return false;
    }
    
    return true;
  });

  // Sort the filtered data
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, sortedItems.length);
  const currentItems = sortedItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  // Request sort function
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = 'ascending';
      }
    }
    
    setSortConfig({ key, direction });
  };

  // Handle column drag and drop
  const handleColumnDragStart = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    setDraggedColumn(columnId);
  };

  const handleColumnDragOver = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleColumnDrop = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    e.preventDefault();
    
    if (!draggedColumn || draggedColumn === columnId) return;
    
    const newSortedColumns = [...sortedColumns];
    const draggedColumnIndex = newSortedColumns.indexOf(draggedColumn);
    const dropColumnIndex = newSortedColumns.indexOf(columnId);
    
    if (draggedColumnIndex !== -1 && dropColumnIndex !== -1) {
      newSortedColumns.splice(draggedColumnIndex, 1);
      newSortedColumns.splice(dropColumnIndex, 0, draggedColumn);
      setSortedColumns(newSortedColumns);
    }
    
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const handleColumnDragEnd = () => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  // Handle notes editing
  const handleNotesClick = (driverId: number) => {
    setEditingNotes(driverId);
  };

  const handleNotesChange = (driverId: number, notes: string) => {
    const updatedDrivers = mockDrivers.map(driver => 
      driver.id === driverId ? { ...driver, notes } : driver
    );
    // In a real app, you would update the state or make an API call here
  };

  const saveNotes = (driverId: number) => {
    setEditingNotes(null);
    toast({
      title: "Notes saved",
      description: `Notes for driver #${driverId} have been saved.`,
    });
  };

  // Handle filters
  const handleFiltersAdd = (filters: any) => {
    setSelectedStatuses(filters.statuses);
    setSelectedZipcodes(filters.zipcodes);
    setSelectedCities(filters.cities);
    setSelectedStates(filters.states);
  };

  // Render rating stars
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            )}
          />
        ))}
      </div>
    );
  };

  // Render status badge
  const renderStatus = (statusId: string) => {
    return (
      <Badge
        variant="secondary"
        style={{
          backgroundColor: statusColors[statusId] || '#gray',
          color: 'white'
        }}
      >
        {statusDictionary[statusId] || statusId}
      </Badge>
    );
  };

  // Render hire status badge
  const renderHireStatus = (hireStatusId: string, driverId: number) => {
    const colors: Record<string, string> = {
      pending: "#eab308",
      approved: "#22c55e",
      rejected: "#ef4444"
    };

    const labels: Record<string, string> = {
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected"
    };

    return (
      <Badge
        variant="secondary"
        style={{
          backgroundColor: colors[hireStatusId] || '#gray',
          color: 'white'
        }}
      >
        {labels[hireStatusId] || hireStatusId}
      </Badge>
    );
  };

  // Render stripe status badge
  const renderStripeStatus = (status: 'verified' | 'unverified' | 'pending') => {
    const colors: Record<string, string> = {
      verified: "#22c55e",
      unverified: "#6b7280",
      pending: "#eab308"
    };

    const labels: Record<string, string> = {
      verified: "Verified",
      unverified: "Unverified",
      pending: "Pending"
    };

    return (
      <Badge
        variant="secondary"
        style={{
          backgroundColor: colors[status] || '#gray',
          color: 'white'
        }}
      >
        {labels[status] || status}
      </Badge>
    );
  };

  // Add the missing onViewDriver function
  const handleViewDriver = (driver: any) => {
    setSelectedDriver(driver);
    setIsDriverProfileOpen(true);
  };

  const handleCloseDriverProfile = () => {
    setIsDriverProfileOpen(false);
    setSelectedDriver(null);
  };

  return (
    <Layout>
      <div className="flex h-full">
        <UserFiltersLayout
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          filterContent={
            <DriversFilters
              selectedStatuses={selectedStatuses}
              setSelectedStatuses={setSelectedStatuses}
              allDeliveryStatuses={allDeliveryStatuses}
              allZipcodes={allZipcodes}
              selectedZipcodes={selectedZipcodes}
              setSelectedZipcodes={setSelectedZipcodes}
              allCities={allCities}
              selectedCities={selectedCities}
              setSelectedCities={setSelectedCities}
              allStates={allStates}
              selectedStates={selectedStates}
              setSelectedStates={setSelectedStates}
              onFiltersAdd={handleFiltersAdd}
            />
          }
          title="Drivers"
          icon={<Users className="h-6 w-6" />}
          buttonContent={
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Driver
            </Button>
          }
          showFilterToggle={true}
          filterIcon={<Filter className="h-4 w-4" />}
          filterToggleText={sidebarOpen ? "Hide Filters" : "Show Filters"}
        >
          <div className="space-y-4">
            <DriversTable
              currentItems={currentItems}
              sortedColumns={sortedColumns}
              availableColumns={availableColumns}
              transportTypes={transportTypes}
              statusDictionary={statusDictionary}
              statusColors={statusColors}
              editingNotes={editingNotes}
              draggedColumn={draggedColumn}
              dragOverColumn={dragOverColumn}
              onDragStart={handleColumnDragStart}
              onDragOver={handleColumnDragOver}
              onDrop={handleColumnDrop}
              onDragEnd={handleColumnDragEnd}
              renderRating={renderRating}
              renderStatus={renderStatus}
              renderHireStatus={renderHireStatus}
              renderStripeStatus={renderStripeStatus}
              handleNotesClick={handleNotesClick}
              handleNotesChange={handleNotesChange}
              saveNotes={saveNotes}
              sortConfig={sortConfig}
              requestSort={requestSort}
              onViewDriver={handleViewDriver}
            />
            
            <DriversPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={setItemsPerPage}
              totalItems={filteredItems.length}
              startIndex={startIndex}
              endIndex={endIndex}
            />
          </div>
        </UserFiltersLayout>
      </div>

      <DriverProfileDrawer
        driver={selectedDriver}
        isOpen={isDriverProfileOpen}
        onClose={handleCloseDriverProfile}
        transportTypes={transportTypes}
        statusDictionary={statusDictionary}
        statusColors={statusColors}
        renderRating={renderRating}
      />
    </Layout>
  );
};

export default DriversPage;
