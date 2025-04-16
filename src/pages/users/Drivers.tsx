
import React from 'react';
import Layout from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus, Search, MessageCircle, Filter } from "lucide-react";
import TransportIcon from "@/components/icons/TransportIcon";
import ColumnSelector from "@/components/table/ColumnSelector";
import { Input } from "@/components/ui/input";
import { UsersTableContainer } from "@/components/ui/users-table-container";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis, PaginationInfo, PaginationSize } from "@/components/ui/pagination";
import CourierChat from '@/components/chat/CourierChat';
import { useDriversTable } from '@/hooks/useDriversTable';

const DriversPage = () => {
  const {
    currentItems,
    totalItems,
    totalPages,
    pageSize,
    currentPage,
    pageSizeOptions,
    handlePageChange,
    handlePageSizeChange,
    getPageNumbers,
    
    searchTerm,
    setSearchTerm,
    isFilterSidebarOpen,
    handleToggleFilterSidebar,
    
    statusDictionary,
    hireStatusDictionary,
    transportTypes,
    
    availableColumns,
    visibleColumns,
    setVisibleColumns,
    sortedColumns,
    dragOverColumn,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    
    sortConfig,
    requestSort,
    
    chatOpen,
    selectedCourier,
    handleChatClose,
    
    renderCellContent
  } = useDriversTable();

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
              <div className={`flex h-full py-4 ${isFilterSidebarOpen ? 'pl-0' : ''}`}>
                {isFilterSidebarOpen && <div className="min-w-[240px] max-w-[240px] border-r bg-background mr-5">
                    <div className="p-4">
                      <h3 className="font-medium mb-3">Filter Drivers</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Status</h4>
                          <div className="space-y-2">
                            {['online', 'offline', 'busy'].map(status => <div key={status} className="flex items-center">
                                <input type="checkbox" id={`status-${status}`} className="h-4 w-4 rounded border-gray-300 mr-2" />
                                <label htmlFor={`status-${status}`} className="text-sm">
                                  {statusDictionary?.[status] || status}
                                </label>
                              </div>)}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Hire Status</h4>
                          <div className="space-y-2">
                            {Object.entries(hireStatusDictionary || {}).map(([id, label]) => <div key={id} className="flex items-center">
                                <input type="checkbox" id={`hire-status-${id}`} className="h-4 w-4 rounded border-gray-300 mr-2" />
                                <label htmlFor={`hire-status-${id}`} className="text-sm">
                                  {label}
                                </label>
                              </div>)}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Transport Type</h4>
                          <div className="space-y-2">
                            {Object.entries(transportTypes || {}).map(([id, name]) => <div key={id} className="flex items-center">
                                <input type="checkbox" id={`transport-${id}`} className="h-4 w-4 rounded border-gray-300 mr-2" />
                                <label htmlFor={`transport-${id}`} className="text-sm flex items-center gap-1.5">
                                  <TransportIcon transportType={id} size={12} className="h-[12px] w-[12px]" />
                                  {name}
                                </label>
                              </div>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>}
                
                <UsersTableContainer stickyHeader={false} className={isFilterSidebarOpen ? 'flex-1 pl-0' : 'w-full'}>
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
