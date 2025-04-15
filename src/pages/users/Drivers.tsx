import React, { useState, useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus, Search, MessageCircle, ChevronDown, Check, X, Clock, Pencil, FileText, Filter } from "lucide-react";
import { getDictionary } from "@/lib/storage";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import ColumnSelector, { ColumnOption } from "@/components/table/ColumnSelector";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { UsersTableContainer } from "@/components/ui/users-table-container";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis, PaginationInfo, PaginationSize } from "@/components/ui/pagination";
import CourierChat from '@/components/chat/CourierChat';
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DeliveryFilters } from '@/components/deliveries/DeliveryFilters';

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

const DriversPage = () => {
  // ... rest of the code remains unchanged until line 1000

  return <Layout showFooter={false}>
      <div className="flex flex-col h-screen w-full">
        <div className="px-0 py-6 flex-1 overflow-auto">
          <div className="space-y-4 w-full">
            <div className="flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">Drivers Management</h1>
                <Button size="sm" className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 h-7">
                  <Plus className="w-3 h-3" />
                  Add Driver
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between px-6">
              <Button variant={isFilterSidebarOpen ? "default" : "outline"} className={`flex items-center gap-2 text-sm h-9 ${isFilterSidebarOpen ? 'bg-primary text-primary-foreground' : ''}`} onClick={handleToggleFilterSidebar} aria-expanded={isFilterSidebarOpen}>
                <Filter className="h-4 w-4" />
                <span>{isFilterSidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
              </Button>
              
              <div className="flex items-center h-9 gap-2">
                <div className="relative h-9">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search drivers..." className="w-[200px] pl-8 text-xs h-9" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <ColumnSelector columns={availableColumns} visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} />
              </div>
            </div>

            <div className="border rounded-md mx-6">
              <div className="flex h-full py-4 ml-0">
                {isFilterSidebarOpen && <div className="min-w-[240px] max-w-[240px] border-r bg-background">
                    <div className="p-4">
                      <h3 className="font-medium mb-3">Filter Drivers</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Status</h4>
                          <div className="space-y-2">
                            {['online', 'offline', 'busy'].map(status => <div key={status} className="flex items-center">
                                <input type="checkbox" id={`status-${status}`} className="h-4 w-4 rounded border-gray-300 mr-2" />
                                <label htmlFor={`status-${status}`} className="text-sm">
                                  {statusDictionary[status] || status}
                                </label>
                              </div>)}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Hire Status</h4>
                          <div className="space-y-2">
                            {Object.keys(hireStatusDictionary).map(status => <div key={status} className="flex items-center">
                                <input type="checkbox" id={`hire-status-${status}`} className="h-4 w-4 rounded border-gray-300 mr-2" />
                                <label htmlFor={`hire-status-${status}`} className="text-sm">
                                  {hireStatusDictionary[status]}
                                </label>
                              </div>)}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Transport Type</h4>
                          <div className="space-y-2">
                            {Object.entries(transportTypes).map(([id, name]) => <div key={id} className="flex items-center">
                                <input type="checkbox" id={`transport-${id}`} className="h-4 w-4 rounded border-gray-300 mr-2" />
                                <label htmlFor={`transport-${id}`} className="text-sm flex items-center gap-1.5">
                                  <TransportIcon transportType={id as TransportType} size={12} className="h-[12px] w-[12px]" />
                                  {name}
                                </label>
                              </div>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>}
                
                <UsersTableContainer stickyHeader={false} className={isFilterSidebarOpen ? 'flex-1' : 'w-full'}>
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        {sortedColumns.map(columnId => {
                        const column = availableColumns.find(col => col.id === columnId);
                        if (!column) return null;
                        return <TableHead key={columnId} dragOver={dragOverColumn === columnId} className={`${columnId === "id" ? "text-right" : ""} whitespace-nowrap truncate max-w-[200px]`} sortable={columnId !== "actions" && columnId !== "transport" && columnId !== "notes"} sortDirection={sortConfig.key === columnId ? sortConfig.direction : null} onSort={() => requestSort(columnId)}>
                            <div className="flex items-center gap-1 overflow-hidden">
                              <div draggable={true} onDragStart={e => handleDragStart(e, columnId)} onDragOver={e => handleDragOver(e, columnId)} onDragEnd={handleDragEnd} onDrop={e => handleDrop(e, columnId)} className="cursor-grab">
                                <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                              </div>
                              <span className="truncate">{column.label}</span>
                            </div>
                          </TableHead>;
                      })}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentItems.map(driver => <TableRow key={driver.id}>
                          {sortedColumns.map(columnId => <TableCell key={`${driver.id}-${columnId}`} className={columnId === "id" ? "font-sans" : ""}>
                              {renderCellContent(driver, columnId)}
                            </TableCell>)}
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </UsersTableContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-auto w-full">
          <div className="px-6 py-4 flex justify-between items-center">
            <PaginationInfo total={totalItems} pageSize={pageSize} currentPage={currentPage} />
            
            <Pagination className="flex-1 flex justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink href="#" onClick={e => {
                  e.preventDefault();
                  handlePageChange(1);
                }} className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} aria-disabled={currentPage === 1}>
                    <span className="sr-only">First page</span>
                    ⟪
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={e => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }} className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} aria-disabled={currentPage === 1} />
                </PaginationItem>
                
                {getPageNumbers().map((page, i) => <PaginationItem key={i}>
                    {page === -1 || page === -2 ? <PaginationEllipsis /> : <PaginationLink href="#" isActive={page === currentPage} onClick={e => {
                  e.preventDefault();
                  handlePageChange(page);
                }}>
                        {page}
                      </PaginationLink>}
                  </PaginationItem>)}
                
                <PaginationItem>
                  <PaginationNext href="#" onClick={e => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }} className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""} aria-disabled={currentPage === totalPages} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" onClick={e => {
                  e.preventDefault();
                  handlePageChange(totalPages);
                }} className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""} aria-disabled={currentPage === totalPages}>
                    <span className="sr-only">Last page</span>
                    ⟫
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            
            <PaginationSize sizes={pageSizeOptions} pageSize={pageSize} onChange={handlePageSizeChange} />
          </div>
        </div>
      </div>
      
      {chatOpen && selectedCourier && <CourierChat open={chatOpen} courierName={selectedCourier} onClose={handleChatClose} hasUnreadMessages={false} />}
    </Layout>;
};

export default DriversPage;
