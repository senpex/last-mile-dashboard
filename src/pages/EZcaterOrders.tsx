
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Package, GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EZcaterOrders = () => {
  const {
    toast
  } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'ascending' | 'descending' | null }>({
    key: null,
    direction: null
  });
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [columnOrder, setColumnOrder] = useState([
    "id", "customer", "dateTime", "status", "location", "value", "items", "actions"
  ]);

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
    
    setSortConfig({ key, direction });
  };
  
  const statusOptions = ["pending", "confirmed", "in-transit", "delivered", "cancelled"];

  // Column dragging handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    setDraggedColumn(columnId);
    e.dataTransfer.setData('text/plain', columnId);
    
    // Create a custom drag image
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
    if (draggedColumn && draggedColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDragOverColumn(null);
    document.body.classList.remove('column-dragging');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
    e.preventDefault();
    
    if (!draggedColumn || draggedColumn === targetColumnId) {
      setDraggedColumn(null);
      setDragOverColumn(null);
      return;
    }
    
    const newColumnOrder = [...columnOrder];
    const draggedIndex = newColumnOrder.findIndex(col => col === draggedColumn);
    const targetIndex = newColumnOrder.findIndex(col => col === targetColumnId);
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
      // Remove the dragged column
      newColumnOrder.splice(draggedIndex, 1);
      
      // Insert it at the new position
      const insertAtIndex = targetIndex > draggedIndex ? targetIndex - 1 : targetIndex;
      newColumnOrder.splice(insertAtIndex, 0, draggedColumn);
      
      setColumnOrder(newColumnOrder);
    }
    
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  // Column definitions
  const columns = {
    id: { label: "Order ID" },
    customer: { label: "Customer" },
    dateTime: { label: "Date & Time" },
    status: { label: "Status" },
    location: { label: "Location" },
    value: { label: "Value" },
    items: { label: "Items" },
    actions: { label: "Actions" }
  };

  // Render sort icon
  const renderSortIcon = (columnId: string) => {
    if (sortConfig.key !== columnId) {
      return null;
    }
    
    return sortConfig.direction === 'ascending' 
      ? <ChevronUp className="h-4 w-4 ml-1 text-destructive" /> 
      : <ChevronDown className="h-4 w-4 ml-1 text-destructive" />;
  };

  return <Layout>
      <div className="px-4 py-6 w-full overflow-x-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">eZcater Orders</h1>
            <p className="text-muted-foreground">
              Manage and track all eZcater platform delivery orders
            </p>
          </div>
          <Button>
            <Package className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </div>

        <Card className="p-4 mt-6 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input placeholder="Search orders by ID, customer, or location..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full" />
            </div>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(status => <Badge key={status} variant={selectedStatus === status ? getStatusBadgeVariant(status) : "outline"} className="cursor-pointer capitalize" onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}>
                  {status.replace('-', ' ')}
                </Badge>)}
            </div>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50 border-b-0">
                <TableRow>
                  {columnOrder.map(columnId => {
                    const column = columns[columnId as keyof typeof columns];
                    const isSortable = ['id', 'customer', 'dateTime', 'location', 'value', 'items'].includes(columnId);
                    
                    return (
                      <TableHead 
                        key={columnId}
                        className={`whitespace-nowrap ${draggedColumn === columnId ? 'opacity-50 bg-accent' : ''}`}
                        sortable={isSortable}
                        sortDirection={sortConfig.key === columnId ? sortConfig.direction : null}
                        onSort={() => isSortable && requestSort(columnId)}
                        dragOver={dragOverColumn === columnId}
                        dragging={draggedColumn === columnId}
                      >
                        <div className="flex items-center gap-1">
                          <div 
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, columnId)}
                            onDragOver={(e) => handleDragOver(e, columnId)}
                            onDragEnd={handleDragEnd}
                            onDrop={(e) => handleDrop(e, columnId)}
                            className={`cursor-grab transition-all duration-200 ${
                              draggedColumn === columnId ? 'opacity-50' : ''
                            }`}
                          >
                            <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                          </div>
                          <button 
                            className="flex items-center cursor-pointer hover:text-primary transition-colors"
                            type="button"
                            onClick={() => isSortable && requestSort(columnId)}
                          >
                            <span>{column.label}</span>
                            {renderSortIcon(columnId)}
                          </button>
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map(order => <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{`${order.date} ${order.time}`}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(order.status)} className="capitalize">
                        {order.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.location}</TableCell>
                    <TableCell>{order.value}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => handleViewOrder(order.id)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>)}
                {sortedOrders.length === 0 && <TableRow>
                    <TableCell colSpan={8} className="text-center py-6">
                      No orders found matching your filters.
                    </TableCell>
                  </TableRow>}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </Layout>;
};

export default EZcaterOrders;
