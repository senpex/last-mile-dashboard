import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UsersTableContainer } from "@/components/ui/users-table-container";
import { Card } from "@/components/ui/card";
import { Package, GripVertical, ChevronUp, ChevronDown, Filter, Search, History as HistoryIcon, MoreVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EZcaterFiltersLayout } from "@/components/ezcater/EZcaterFiltersLayout";
import { SearchInput } from "@/components/ui/search-input";
import { TimezonePicker } from "@/components/TimezonePicker";
import ColumnSelector from "@/components/table/ColumnSelector";
import { EZcaterPagination } from "@/components/ezcater/EZcaterPagination";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CreateOrderSheet } from "@/components/ezcater/CreateOrderSheet";
const EZcaterOrders = () => {
  const {
    toast
  } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'ascending' | 'descending' | null;
  }>({
    key: null,
    direction: null
  });
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  // Updated column order to put actions at the end (swapped positions of actions and history)
  const [columnOrder, setColumnOrder] = useState(["webhook", "package", "requestNumber", "eventDate", "insertedDate", "pickupAddress", "dropoffAddress", "eventName", "status", "history", "actions"]);
  const [timezone, setTimezone] = useState<string>("America/New_York");
  // Also update the default visibleColumns array to match the new order
  const [visibleColumns, setVisibleColumns] = useState<string[]>(["webhook", "package", "requestNumber", "eventDate", "insertedDate", "pickupAddress", "dropoffAddress", "eventName", "status", "history", "actions"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageSizeOptions = [5, 10, 20, 50];
  // Add state for managing sheet open/close
  const [isCreateOrderSheetOpen, setIsCreateOrderSheetOpen] = useState(false);

  // Available column definitions for the column selector
  const availableColumns: {
    id: string;
    label: string;
    default: boolean;
  }[] = [{
    id: "webhook",
    label: "Webhook",
    default: true
  }, {
    id: "package",
    label: "Package",
    default: true
  }, {
    id: "requestNumber",
    label: "Request #",
    default: true
  }, {
    id: "eventDate",
    label: "Event Date",
    default: true
  }, {
    id: "insertedDate",
    label: "Inserted Date",
    default: true
  }, {
    id: "pickupAddress",
    label: "Pickup Address",
    default: true
  }, {
    id: "dropoffAddress",
    label: "Dropoff Address",
    default: true
  }, {
    id: "eventName",
    label: "Event Name",
    default: true
  }, {
    id: "status",
    label: "Status",
    default: true
  }, {
    id: "history",
    label: "History",
    default: true
  }, {
    id: "actions",
    label: "Actions",
    default: true
  }];

  // Sample data for eZcater orders with updated values
  const orders = [{
    webhook: "20000",
    package: "700000",
    requestNumber: "FGH-87F",
    eventDate: "2023-04-30 12:30 PM",
    insertedDate: "2023-04-28 09:15 AM",
    pickupAddress: "123 Main St, Boston, MA",
    dropoffAddress: "456 Corporate Dr, Boston, MA",
    eventName: "Executive Lunch",
    status: "pending"
  }, {
    webhook: "20000",
    package: "700000",
    requestNumber: "FGH-87F",
    eventDate: "2023-04-30 1:45 PM",
    insertedDate: "2023-04-28 10:30 AM",
    pickupAddress: "789 Market St, Cambridge, MA",
    dropoffAddress: "101 Tech Blvd, Cambridge, MA",
    eventName: "Team Meeting",
    status: "confirmed"
  }, {
    webhook: "20000",
    package: "700000",
    requestNumber: "FGH-87F",
    eventDate: "2023-05-01 11:15 AM",
    insertedDate: "2023-04-28 11:45 AM",
    pickupAddress: "222 Food Ave, Boston, MA",
    dropoffAddress: "333 Law Firm Plaza, Boston, MA",
    eventName: "Legal Department Lunch",
    status: "in-transit"
  }, {
    webhook: "20000",
    package: "700000",
    requestNumber: "FGH-87F",
    eventDate: "2023-05-01 12:00 PM",
    insertedDate: "2023-04-28 02:00 PM",
    pickupAddress: "444 Restaurant Row, Worcester, MA",
    dropoffAddress: "555 Medical Center Dr, Worcester, MA",
    eventName: "Medical Conference",
    status: "delivered"
  }, {
    webhook: "20000",
    package: "700000",
    requestNumber: "FGH-87F",
    eventDate: "2023-05-02 2:30 PM",
    insertedDate: "2023-04-29 08:45 AM",
    pickupAddress: "666 University Ave, Cambridge, MA",
    dropoffAddress: "777 Campus Center, Cambridge, MA",
    eventName: "Department Meeting",
    status: "cancelled"
  }];
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "confirmed":
        return "secondary";
      case "in-transit":
        return "default";
      case "delivered":
        return "success";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };
  const handleViewOrder = (id: string) => {
    toast({
      title: "Order Details",
      description: `Viewing details for order ${id}`
    });
  };
  const handleCreateOrder = (requestNumber: string) => {
    setIsCreateOrderSheetOpen(true);
  };
  const handleCancelRequest = (requestNumber: string) => {
    toast({
      title: "Cancel Request",
      description: `Cancelling request ${requestNumber}`
    });
  };
  const handleViewHistory = (requestNumber: string) => {
    toast({
      title: "View History",
      description: `Viewing history for request ${requestNumber}`
    });
  };
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.webhook.toLowerCase().includes(searchQuery.toLowerCase()) || order.package.toLowerCase().includes(searchQuery.toLowerCase()) || order.requestNumber.toLowerCase().includes(searchQuery.toLowerCase()) || order.eventName.toLowerCase().includes(searchQuery.toLowerCase()) || order.pickupAddress.toLowerCase().includes(searchQuery.toLowerCase()) || order.dropoffAddress.toLowerCase().includes(searchQuery.toLowerCase());

    // Update status filter logic to handle the new filter options
    if (!selectedStatus) {
      return matchesSearch; // "All" is selected (no filter)
    } else if (selectedStatus === "orders") {
      return matchesSearch && (order.status === "pending" || order.status === "confirmed" || order.status === "in-transit" || order.status === "delivered");
    } else if (selectedStatus === "modifications") {
      return matchesSearch && order.status === "cancelled";
    }
    return matchesSearch;
  });
  const sortedOrders = React.useMemo(() => {
    let sortableOrders = [...filteredOrders];
    if (sortConfig.key && sortConfig.direction) {
      sortableOrders.sort((a, b) => {
        let aValue, bValue;
        if (sortConfig.key === 'eventDate' || sortConfig.key === 'insertedDate') {
          // Convert dates for proper comparison
          aValue = new Date(a[sortConfig.key]).getTime();
          bValue = new Date(b[sortConfig.key]).getTime();
        } else {
          // For other fields, compare strings
          aValue = a[sortConfig.key as keyof typeof a];
          bValue = b[sortConfig.key as keyof typeof b];
        }
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOrders;
  }, [filteredOrders, sortConfig]);
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = null;
      }
    }
    setSortConfig({
      key,
      direction
    });
  };
  const filterOptions = ["all", "orders", "modifications"];

  // Log current column order for debugging
  useEffect(() => {
    console.log("Column order updated:", columnOrder);
  }, [columnOrder]);

  // Column dragging handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    console.log("Drag started:", columnId);
    setDraggedColumn(columnId);
    e.dataTransfer.setData('text/plain', columnId);
    e.dataTransfer.effectAllowed = 'move';

    // Use a transparent image as drag ghost
    const dragImage = new Image();
    dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(dragImage, 0, 0);

    // Add a class to the document body to indicate dragging state
    document.body.classList.add('column-dragging');

    // Create a visual preview element
    const dragPreview = document.createElement('div');
    dragPreview.className = 'px-2 py-1 bg-background border rounded shadow text-sm fixed pointer-events-none';
    dragPreview.textContent = columns[columnId as keyof typeof columns].label;
    dragPreview.style.position = 'fixed';
    dragPreview.style.left = `${e.clientX + 10}px`;
    dragPreview.style.top = `${e.clientY + 10}px`;
    dragPreview.style.zIndex = '9999';
    document.body.appendChild(dragPreview);
    const updatePreviewPosition = (e: MouseEvent) => {
      dragPreview.style.left = `${e.clientX + 10}px`;
      dragPreview.style.top = `${e.clientY + 10}px`;
    };
    const cleanup = () => {
      document.removeEventListener('mousemove', updatePreviewPosition);
      document.removeEventListener('dragend', cleanup);
      document.body.classList.remove('column-dragging');
      dragPreview.remove();
    };
    document.addEventListener('mousemove', updatePreviewPosition);
    document.addEventListener('dragend', cleanup);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedColumn && draggedColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };
  const handleDragEnd = () => {
    console.log("Drag ended");
    setDraggedColumn(null);
    setDragOverColumn(null);
    document.body.classList.remove('column-dragging');
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Drop event:", {
      draggedColumn,
      targetColumnId
    });
    if (!draggedColumn || draggedColumn === targetColumnId) {
      setDraggedColumn(null);
      setDragOverColumn(null);
      return;
    }
    const newColumnOrder = [...columnOrder];
    const draggedIndex = newColumnOrder.indexOf(draggedColumn);
    const targetIndex = newColumnOrder.indexOf(targetColumnId);
    console.log("Indexes:", {
      draggedIndex,
      targetIndex
    });
    if (draggedIndex !== -1 && targetIndex !== -1) {
      // Remove the dragged column
      newColumnOrder.splice(draggedIndex, 1);

      // Insert it at the new position
      newColumnOrder.splice(targetIndex, 0, draggedColumn);
      console.log("New column order:", newColumnOrder);
      setColumnOrder(newColumnOrder);

      // Show toast notification for user feedback
      toast({
        title: "Column order updated",
        description: `Moved ${columns[draggedColumn as keyof typeof columns].label} column`
      });
    }
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  // Calculate pagination metrics
  const totalItems = sortedOrders.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentPageItems = sortedOrders.slice(startIndex, endIndex);

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // Column definitions
  const columns = {
    webhook: {
      label: "Webhook"
    },
    package: {
      label: "Package"
    },
    requestNumber: {
      label: "Request #"
    },
    eventDate: {
      label: "Event Date"
    },
    insertedDate: {
      label: "Inserted Date"
    },
    pickupAddress: {
      label: "Pickup Address"
    },
    dropoffAddress: {
      label: "Dropoff Address"
    },
    eventName: {
      label: "Event Name"
    },
    status: {
      label: "Status"
    },
    actions: {
      label: "Actions"
    },
    history: {
      label: "History"
    }
  };

  // Render sort icon
  const renderSortIcon = (columnId: string) => {
    if (sortConfig.key !== columnId) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? <ChevronUp className="h-4 w-4 ml-1 text-destructive" /> : <ChevronDown className="h-4 w-4 ml-1 text-destructive" />;
  };
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const timezoneInfo = `All times in EST (${Intl.DateTimeFormat().resolvedOptions().timeZone})`;

  // Updated filter controls to show only the three requested buttons
  const filterControls = <div className="flex flex-wrap gap-2">
      <Button key="all" size="sm" variant={selectedStatus === null ? "default" : "outline"} onClick={() => setSelectedStatus(null)} className="capitalize">
        All
      </Button>
      <Button key="orders" size="sm" variant={selectedStatus === "orders" ? "default" : "outline"} onClick={() => setSelectedStatus("orders")} className="capitalize">
        Orders
      </Button>
      <Button key="modifications" size="sm" variant={selectedStatus === "modifications" ? "default" : "outline"} onClick={() => setSelectedStatus("modifications")} className="capitalize">
        Modifications
      </Button>
    </div>;

  // Search controls with the components from the selected element
  const searchControls = <div className="flex items-center space-x-2">
      <SearchInput placeholder="Search by webhook, package, request #, event name, or address..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full md:w-80" />
      <TimezonePicker selectedTimezone={timezone} onTimezoneChange={setTimezone} />
      <ColumnSelector columns={availableColumns} visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} size="icon" />
    </div>;
  return <Layout>
      <div className="w-full overflow-x-hidden">
        <EZcaterFiltersLayout title="eZcater Orders" timezoneInfo={timezoneInfo} filterControls={filterControls} searchControls={searchControls} className="border-0" />

        <div className="mx-0 py-[14px] px-[25px]">
          <UsersTableContainer>
            <Table>
              <TableHeader className="bg-muted/50 border-b-0 m-0 p-0">
                <TableRow className="border-b-0">
                  {columnOrder.filter(id => visibleColumns.includes(id)).map(columnId => {
                  const column = columns[columnId as keyof typeof columns];
                  const isSortable = ['webhook', 'package', 'requestNumber', 'eventDate', 'insertedDate', 'eventName'].includes(columnId);
                  return <TableHead key={columnId} className={`whitespace-nowrap min-w-[100px] ${columnId === 'actions' || columnId === 'history' ? 'w-[120px]' : ''} ${columnId === 'pickupAddress' || columnId === 'dropoffAddress' ? 'min-w-[200px]' : ''}`} dragOver={dragOverColumn === columnId} sortable={isSortable} sortDirection={sortConfig.key === columnId ? sortConfig.direction : null} onSort={() => isSortable && requestSort(columnId)}>
                      <div className="flex items-center gap-2">
                        <div draggable={columnId !== 'actions' && columnId !== 'history'} onDragStart={e => handleDragStart(e, columnId)} onDragOver={e => handleDragOver(e, columnId)} onDragEnd={handleDragEnd} onDrop={e => handleDrop(e, columnId)} className={`cursor-grab transition-opacity duration-200 ${draggedColumn === columnId ? 'opacity-50' : ''}`}>
                          <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                        </div>
                        <span>{column.label}</span>
                        {isSortable && renderSortIcon(columnId)}
                      </div>
                    </TableHead>;
                })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPageItems.map(order => <TableRow key={order.requestNumber}>
                    {columnOrder.filter(id => visibleColumns.includes(id)).map(columnId => {
                  switch (columnId) {
                    case "webhook":
                      return <TableCell key={columnId}>{order.webhook}</TableCell>;
                    case "package":
                      return <TableCell key={columnId} className="font-medium">
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4 text-muted-foreground" />
                              {order.package}
                            </div>
                          </TableCell>;
                    case "requestNumber":
                      return <TableCell key={columnId}>{order.requestNumber}</TableCell>;
                    case "eventDate":
                      return <TableCell key={columnId}>{order.eventDate}</TableCell>;
                    case "insertedDate":
                      return <TableCell key={columnId}>{order.insertedDate}</TableCell>;
                    case "pickupAddress":
                      return <TableCell key={columnId}>{order.pickupAddress}</TableCell>;
                    case "dropoffAddress":
                      return <TableCell key={columnId}>{order.dropoffAddress}</TableCell>;
                    case "eventName":
                      return <TableCell key={columnId}>{order.eventName}</TableCell>;
                    case "status":
                      return <TableCell key={columnId}>
                                    <Badge variant={getStatusBadgeVariant(order.status)} className="capitalize">
                                      {order.status.replace('-', ' ')}
                                    </Badge>
                                  </TableCell>;
                    case "actions":
                      return <TableCell key={columnId} className="flex space-x-2">
                            <Sheet>
                              <SheetTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => handleCreateOrder(order.requestNumber)}>
                                  Create
                                </Button>
                              </SheetTrigger>
                              <SheetContent side="right" className="w-full sm:max-w-xl md:max-w-4xl lg:max-w-6xl">
                                <CreateOrderSheet onClose={() => setIsCreateOrderSheetOpen(false)} />
                              </SheetContent>
                            </Sheet>
                            <Button size="sm" variant="outline" onClick={() => handleCancelRequest(order.requestNumber)}>
                              Cancel
                            </Button>
                          </TableCell>;
                    case "history":
                      return <TableCell key={columnId} className="text-center">
                                    <Button size="sm" variant="ghost" onClick={() => handleViewHistory(order.requestNumber)}>
                                      <HistoryIcon className="h-4 w-4" />
                                    </Button>
                                  </TableCell>;
                    default:
                      return <TableCell key={columnId}></TableCell>;
                  }
                })}
                  </TableRow>)}
                {currentPageItems.length === 0 && <TableRow>
                    <TableCell colSpan={visibleColumns.length} className="text-center py-6">
                      No orders found matching your filters.
                    </TableCell>
                  </TableRow>}
              </TableBody>
            </Table>
          </UsersTableContainer>
        </div>
        
        <EZcaterPagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} pageSize={pageSize} pageSizeOptions={pageSizeOptions} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} />
      </div>
    </Layout>;
};
export default EZcaterOrders;