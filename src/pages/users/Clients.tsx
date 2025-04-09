import React, { useState, useEffect } from 'react';
import { Layout } from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableContainer } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
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

const ClientsPage = () => {
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredClients, setFilteredClients] = useState<any[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageSizeOptions = [5, 10, 20, 30, 50];

  const availableColumns: ColumnOption[] = [
    { id: "id", label: "ID", default: true },
    { id: "organization", label: "Organization", default: true },
    { id: "contact", label: "Contact Person", default: true },
    { id: "email", label: "Email", default: true },
    { id: "phone", label: "Phone", default: true },
    { id: "type", label: "Type", default: true },
    { id: "actions", label: "Actions", default: true },
  ];
  
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    availableColumns.filter(col => col.default).map(col => col.id)
  );
  
  const [columnOrder, setColumnOrder] = useState<string[]>(
    availableColumns.filter(col => col.default).map(col => col.id)
  );

  const clients = [
    { id: 1234, name: "Acme Corp", contact: "Alex Johnson", email: "alex@acmecorp.com", phone: "(123) 456-7890", type: "Business" },
    { id: 23456, name: "TechStart", contact: "Sarah Lee", email: "sarah@techstart.com", phone: "(123) 456-7891", type: "Business" },
    { id: 34567, name: "Robert Brown", contact: "Robert Brown", email: "robert.brown@example.com", phone: "(123) 456-7892", type: "Individual" },
    { id: 45678, name: "Global Industries", contact: "Michael Chen", email: "m.chen@globalind.com", phone: "(123) 456-7893", type: "Business" },
    { id: 56789, name: "Next Level Tech", contact: "Emily Wong", email: "emily@nextleveltech.com", phone: "(123) 456-7894", type: "Business" },
    { id: 67890, name: "David Smith", contact: "David Smith", email: "david.smith@example.com", phone: "(123) 456-7895", type: "Individual" },
    { id: 78901, name: "Modern Solutions", contact: "Jessica Taylor", email: "j.taylor@modernsol.com", phone: "(123) 456-7896", type: "Business" },
    { id: 89012, name: "Jennifer Adams", contact: "Jennifer Adams", email: "jennifer.adams@example.com", phone: "(123) 456-7897", type: "Individual" },
    { id: 90123, name: "Peak Performance", contact: "Daniel Wilson", email: "daniel@peakperf.com", phone: "(123) 456-7898", type: "Business" },
    { id: 10234, name: "Smart Systems", contact: "Rachel Green", email: "rachel@smartsystems.com", phone: "(123) 456-7899", type: "Business" },
    { id: 11234, name: "Future Tech", contact: "Steve Rogers", email: "steve@futuretech.com", phone: "(123) 456-7810", type: "Business" },
    { id: 12345, name: "Lisa Johnson", contact: "Lisa Johnson", email: "lisa.johnson@example.com", phone: "(123) 456-7811", type: "Individual" },
  ];

  const totalItems = filteredClients.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentItems = filteredClients.slice(startIndex, endIndex);

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
    setFilteredClients(clients);
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const filtered = clients.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm) ||
        client.id.toString().includes(searchTerm)
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clients);
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

  return (
    <Layout>
      <div className="flex flex-col h-full w-full">
        <div className="px-6 py-6 flex-1 overflow-auto">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Clients Management</h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center h-9 gap-2">
                <Button size="sm" className="flex items-center gap-1 text-xs px-2 py-1 h-9">
                  <Plus className="w-3 h-3" />
                  Add Client
                </Button>
              </div>
              <div className="flex items-center h-9 gap-2">
                <div className="relative h-9">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search clients..."
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
              <ScrollArea orientation="horizontal">
                <TableContainer stickyHeader={false}>
                  <Table>
                    <TableHeader className="bg-muted/50">
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
                      {currentItems.map((client) => (
                        <TableRow key={client.id}>
                          {sortedColumns.includes("id") && (
                            <TableCell className="font-sans">{client.id}</TableCell>
                          )}
                          {sortedColumns.includes("organization") && (
                            <TableCell>{client.name}</TableCell> 
                          )}
                          {sortedColumns.includes("contact") && (
                            <TableCell>{client.contact}</TableCell>
                          )}
                          {sortedColumns.includes("email") && (
                            <TableCell>{client.email}</TableCell>
                          )}
                          {sortedColumns.includes("phone") && (
                            <TableCell>{client.phone}</TableCell>
                          )}
                          {sortedColumns.includes("type") && (
                            <TableCell>
                              <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                client.type === "Business" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                              }`}>
                                {client.type}
                              </div>
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

export default ClientsPage;
