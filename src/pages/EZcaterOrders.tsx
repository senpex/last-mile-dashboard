import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UsersTableContainer } from "@/components/ui/users-table-container";
import { Card } from "@/components/ui/card";
import { Package, GripVertical, ChevronUp, ChevronDown, Filter, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EZcaterFiltersLayout } from "@/components/ezcater/EZcaterFiltersLayout";
import { SearchInput } from "@/components/ui/search-input";
import { TimezonePicker } from "@/components/TimezonePicker";
import ColumnSelector from "@/components/table/ColumnSelector";
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
  const [columnOrder, setColumnOrder] = useState(["id", "customer", "dateTime", "status", "location", "value", "items", "actions"]);
  const [timezone, setTimezone] = useState<string>("America/New_York");
  const [visibleColumns, setVisibleColumns] = useState<string[]>(["id", "customer", "dateTime", "status", "location", "value", "items", "actions"]);

  // Available column definitions for the column selector
  const availableColumns: {
    id: string;
    label: string;
    default: boolean;
  }[] = [{
    id: "id",
    label: "Order ID",
    default: true
  }, {
    id: "customer",
    label: "Customer",
    default: true
  }, {
    id: "dateTime",
    label: "Date & Time",
    default: true
  }, {
    id: "status",
    label: "Status",
    default: true
  }, {
    id: "location",
    label: "Location",
    default: true
  }, {
    id: "value",
    label: "Value",
    default: true
  }, {
    id: "items",
    label: "Items",
    default: true
  }, {
    id: "actions",
    label: "Actions",
    default: true
  }];

  // Sample data for eZcater orders
  const orders = [{
    id: "EZ-2023-001",
    customer: "Corporate Office Inc.",
    date: "2023-04-29",
    time: "12:30 PM",
    status: "pending",
    location: "Boston, MA",
    value: "$245.50",
    items: 12
  }, {
    id: "EZ-2023-002",
    customer: "Tech Startup LLC",
    date: "2023-04-29",
    time: "1:45 PM",
    status: "confirmed",
    location: "Cambridge, MA",
    value: "$189.75",
    items: 8
  }, {
    id: "EZ-2023-003",
    customer: "Downtown Law Firm",
    date: "2023-04-30",
    time: "11:15 AM",
    status: "in-transit",
    location: "Boston, MA",
    value: "$325.00",
    items: 15
  }, {
    id: "EZ-2023-004",
    customer: "Medical Conference Center",
    date: "2023-04-30",
    time: "12:00 PM",
    status: "delivered",
    location: "Worcester, MA",
    value: "$520.25",
    items: 24
  }, {
    id: "EZ-2023-005",
    customer: "University Department Meeting",
    date: "2023-05-01",
    time: "2:30 PM",
    status: "cancelled",
    location: "Cambridge, MA",
    value: "$175.00",
    items: 10
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
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || order.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
  const sortedOrders = React.useMemo(() => {
    let sortableOrders = [...filteredOrders];
    if (sortConfig.key && sortConfig.direction) {
      sortableOrders.sort((a, b) => {
        let aValue, bValue;
        if (sortConfig.key === 'dateTime') {
          // Special handling for date+time sorting
          aValue = `${a.date} ${a.time}`;
          bValue = `${b.date} ${b.time}`;
        } else if (sortConfig.key === 'id' || sortConfig.key === 'customer' || sortConfig.key === 'location') {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        } else if (sortConfig.key === 'value') {
          // Remove $ and convert to number
          aValue = parseFloat(a.value.replace('$', ''));
          bValue = parseFloat(b.value.replace('$', ''));
        } else if (sortConfig.key === 'items') {
          aValue = a.items;
          bValue = b.items;
        } else {
          return 0;
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
  const statusOptions = ["pending", "confirmed", "in-transit", "delivered", "cancelled"];

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

  // Column definitions
  const columns = {
    id: {
      label: "Order ID"
    },
    customer: {
      label: "Customer"
    },
    dateTime: {
      label: "Date & Time"
    },
    status: {
      label: "Status"
    },
    location: {
      label: "Location"
    },
    value: {
      label: "Value"
    },
    items: {
      label: "Items"
    },
    actions: {
      label: "Actions"
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

  // Filter controls
  const filterControls = <div className="flex flex-wrap gap-2">
      {statusOptions.map(status => {})}
    </div>;

  // Search controls with the components from the selected element
  const searchControls = <div className="flex items-center space-x-2">
      <SearchInput placeholder="Search orders by ID, customer, or location..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full md:w-80" />
      <TimezonePicker selectedTimezone={timezone} onTimezoneChange={setTimezone} />
      <ColumnSelector columns={availableColumns} visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} size="icon" />
    </div>;
  return <Layout>
      <div className="w-full overflow-x-hidden">
        <EZcaterFiltersLayout title="eZcater Orders" timezoneInfo={timezoneInfo} filterControls={filterControls} searchControls={searchControls} className="border-0" />

        <div className="px-4 py-4">
          <UsersTableContainer>
            <Table>
              <TableHeader className="bg-muted/50 border-b-0 m-0 p-0">
                <TableRow className="border-b-0">
                  {columnOrder.filter(id => visibleColumns.includes(id)).map(columnId => {
                  const column = columns[columnId as keyof typeof columns];
                  const isSortable = ['id', 'customer', 'dateTime', 'location', 'value', 'items'].includes(columnId);
                  return <TableHead key={columnId} className={`whitespace-nowrap min-w-[100px] ${columnId === 'actions' ? 'w-[80px]' : ''}`} dragOver={dragOverColumn === columnId} sortable={isSortable} sortDirection={sortConfig.key === columnId ? sortConfig.direction : null} onSort={() => isSortable && requestSort(columnId)}>
                      <div className="flex items-center gap-2">
                        <div draggable={columnId !== 'actions'} onDragStart={e => handleDragStart(e, columnId)} onDragOver={e => handleDragOver(e, columnId)} onDragEnd={handleDragEnd} onDrop={e => handleDrop(e, columnId)} className={`cursor-grab transition-opacity duration-200 ${draggedColumn === columnId ? 'opacity-50' : ''}`}>
                          <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                        </div>
                        <span>{column.label}</span>
                      </div>
                    </TableHead>;
                })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map(order => <TableRow key={order.id}>
                    {columnOrder.filter(id => visibleColumns.includes(id)).map(columnId => {
                  switch (columnId) {
                    case "id":
                      return <TableCell key={columnId} className="font-medium">{order.id}</TableCell>;
                    case "customer":
                      return <TableCell key={columnId}>{order.customer}</TableCell>;
                    case "dateTime":
                      return <TableCell key={columnId}>{`${order.date} ${order.time}`}</TableCell>;
                    case "status":
                      return <TableCell key={columnId}>
                                    <Badge variant={getStatusBadgeVariant(order.status)} className="capitalize">
                                      {order.status.replace('-', ' ')}
                                    </Badge>
                                  </TableCell>;
                    case "location":
                      return <TableCell key={columnId}>{order.location}</TableCell>;
                    case "value":
                      return <TableCell key={columnId}>{order.value}</TableCell>;
                    case "items":
                      return <TableCell key={columnId}>{order.items}</TableCell>;
                    case "actions":
                      return <TableCell key={columnId} className="text-right">
                                    <Button size="sm" variant="outline" onClick={() => handleViewOrder(order.id)}>
                                      View
                                    </Button>
                                  </TableCell>;
                    default:
                      return <TableCell key={columnId}></TableCell>;
                  }
                })}
                  </TableRow>)}
                {sortedOrders.length === 0 && <TableRow>
                    <TableCell colSpan={8} className="text-center py-6">
                      No orders found matching your filters.
                    </TableCell>
                  </TableRow>}
              </TableBody>
            </Table>
          </UsersTableContainer>
        </div>
      </div>
    </Layout>;
};
export default EZcaterOrders;