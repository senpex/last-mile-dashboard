
import React, { useState, useEffect } from 'react';
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus, Search } from "lucide-react";
import ColumnSelector, { ColumnOption } from "@/components/table/ColumnSelector";
import { Input } from "@/components/ui/input";
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
import { 
  UsersTable, 
  UsersTableHeader, 
  UsersTableBody, 
  UsersTableRow, 
  UsersTableHead, 
  UsersTableCell 
} from "@/components/users/UsersTable";
import { UsersTableContainer } from "@/components/users/UsersTableContainer";

const DriversPage = () => {
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredDrivers, setFilteredDrivers] = useState<any[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageSizeOptions = [5, 10, 20, 30, 50];

  const availableColumns: ColumnOption[] = [
    { id: "id", label: "ID", default: true },
    { id: "name", label: "Driver Name", default: true },
    { id: "email", label: "Email", default: true },
    { id: "phone", label: "Phone", default: true },
    { id: "status", label: "Status", default: true },
    { id: "vehicleType", label: "Vehicle Type", default: true },
    { id: "rating", label: "Rating", default: true },
    { id: "actions", label: "Actions", default: true },
  ];
  
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    availableColumns.filter(col => col.default).map(col => col.id)
  );
  
  const [columnOrder, setColumnOrder] = useState<string[]>(
    availableColumns.filter(col => col.default).map(col => col.id)
  );

  const drivers = [
    { id: 1001, name: "John Smith", email: "john.smith@example.com", phone: "(123) 456-7890", status: "Active", vehicleType: "Car", rating: 4.8 },
    { id: 1002, name: "Emma Johnson", email: "emma.johnson@example.com", phone: "(123) 456-7891", status: "Active", vehicleType: "Scooter", rating: 4.7 },
    { id: 1003, name: "Michael Brown", email: "michael.brown@example.com", phone: "(123) 456-7892", status: "Offline", vehicleType: "Motorcycle", rating: 4.9 },
    { id: 1004, name: "Sophia Williams", email: "sophia.williams@example.com", phone: "(123) 456-7893", status: "Active", vehicleType: "Car", rating: 4.6 },
    { id: 1005, name: "Daniel Jones", email: "daniel.jones@example.com", phone: "(123) 456-7894", status: "Pending", vehicleType: "Van", rating: 3.9 },
    { id: 1006, name: "Olivia Miller", email: "olivia.miller@example.com", phone: "(123) 456-7895", status: "Active", vehicleType: "Car", rating: 4.5 },
    { id: 1007, name: "James Davis", email: "james.davis@example.com", phone: "(123) 456-7896", status: "Suspended", vehicleType: "Bicycle", rating: 3.2 },
    { id: 1008, name: "Ava Garcia", email: "ava.garcia@example.com", phone: "(123) 456-7897", status: "Active", vehicleType: "Car", rating: 4.7 },
    { id: 1009, name: "William Rodriguez", email: "william.rodriguez@example.com", phone: "(123) 456-7898", status: "Active", vehicleType: "Motorcycle", rating: 4.8 },
    { id: 1010, name: "Isabella Martinez", email: "isabella.martinez@example.com", phone: "(123) 456-7899", status: "Offline", vehicleType: "Scooter", rating: 4.6 },
    { id: 1011, name: "Benjamin Anderson", email: "benjamin.anderson@example.com", phone: "(123) 456-7810", status: "Active", vehicleType: "Car", rating: 4.9 },
    { id: 1012, name: "Mia Wilson", email: "mia.wilson@example.com", phone: "(123) 456-7811", status: "Pending", vehicleType: "Van", rating: 4.0 },
  ];

  const totalItems = filteredDrivers.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentItems = filteredDrivers.slice(startIndex, endIndex);

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
  };

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
    setFilteredDrivers(drivers);
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const filtered = drivers.filter(driver => 
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.phone.includes(searchTerm) ||
        driver.id.toString().includes(searchTerm) ||
        driver.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDrivers(filtered);
    } else {
      setFilteredDrivers(drivers);
    }
  }, [searchTerm]);

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

  // Helper function to get status badge styling
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case 'offline':
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case 'pending':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case 'suspended':
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-full w-full">
        <div className="px-6 py-6 flex-1 overflow-auto">
          <div className="space-y-4">
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

            <div className="border rounded-md">
              <UsersTableContainer stickyHeader={false}>
                <UsersTable>
                  <UsersTableHeader className="bg-muted/50">
                    <UsersTableRow>
                      {sortedColumns.map((columnId) => {
                        const column = availableColumns.find(col => col.id === columnId);
                        if (!column) return null;
                        
                        return (
                          <UsersTableHead 
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
                          </UsersTableHead>
                        );
                      })}
                    </UsersTableRow>
                  </UsersTableHeader>
                  <UsersTableBody>
                    {currentItems.map((driver) => (
                      <UsersTableRow key={driver.id}>
                        {sortedColumns.includes("id") && (
                          <UsersTableCell className="font-sans">{driver.id}</UsersTableCell>
                        )}
                        {sortedColumns.includes("name") && (
                          <UsersTableCell>{driver.name}</UsersTableCell>
                        )}
                        {sortedColumns.includes("email") && (
                          <UsersTableCell>{driver.email}</UsersTableCell>
                        )}
                        {sortedColumns.includes("phone") && (
                          <UsersTableCell>{driver.phone}</UsersTableCell>
                        )}
                        {sortedColumns.includes("status") && (
                          <UsersTableCell>
                            <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(driver.status)}`}>
                              {driver.status}
                            </div>
                          </UsersTableCell>
                        )}
                        {sortedColumns.includes("vehicleType") && (
                          <UsersTableCell>{driver.vehicleType}</UsersTableCell>
                        )}
                        {sortedColumns.includes("rating") && (
                          <UsersTableCell>{driver.rating}/5.0</UsersTableCell>
                        )}
                        {sortedColumns.includes("actions") && (
                          <UsersTableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </UsersTableCell>
                        )}
                      </UsersTableRow>
                    ))}
                  </UsersTableBody>
                </UsersTable>
              </UsersTableContainer>
            </div>
          </div>
        </div>

        <div className="border-t mt-auto w-full">
          <div className="px-6 py-4 flex justify-between items-center">
            <PaginationInfo 
              total={totalItems} 
              pageSize={pageSize} 
              currentPage={currentPage} 
            />
            
            <Pagination className="flex-1 flex justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    aria-disabled={currentPage === 1}
                  >
                    <span className="sr-only">First page</span>
                    ⟪
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                
                {getPageNumbers().map((page, i) => (
                  <PaginationItem key={i}>
                    {page === -1 || page === -2 ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink 
                        href="#" 
                        isActive={page === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(totalPages);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    aria-disabled={currentPage === totalPages}
                  >
                    <span className="sr-only">Last page</span>
                    ⟫
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            
            <PaginationSize
              sizes={pageSizeOptions}
              pageSize={pageSize}
              onChange={handlePageSizeChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DriversPage;
