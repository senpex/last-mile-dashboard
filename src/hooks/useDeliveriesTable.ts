
import { useState, useEffect } from "react";
import { Delivery } from "@/types/delivery";
import { ColumnOption } from "@/components/table/ColumnSelector";

export const useDeliveriesTable = (deliveries: Delivery[]) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredDeliveries, setFilteredDeliveries] = useState<Delivery[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const availableColumns: ColumnOption[] = [
    { id: "id", label: "ID", default: true },
    { id: "packageId", label: "Package ID", default: true },
    { id: "orderName", label: "Order Name", default: true },
    { id: "status", label: "Status", default: true },
    { id: "pickupTime", label: "Pickup Time", default: true },
    { id: "pickupLocation", label: "Pickup Location", default: true },
    { id: "dropoffTime", label: "Dropoff Time", default: true },
    { id: "dropoffLocation", label: "Dropoff Location", default: true },
    { id: "customerName", label: "Customer Name", default: true },
    { id: "price", label: "Price", default: true },
    { id: "tip", label: "Tip", default: false },
    { id: "fees", label: "Fees", default: false },
    { id: "courier", label: "Courier", default: true },
    { id: "organization", label: "Organization", default: true },
    { id: "distance", label: "Distance", default: true },
    { id: "couriersEarnings", label: "Courier's Earnings", default: true }
  ];

  // Initialize visible columns and column order
  useEffect(() => {
    const defaultColumns = availableColumns
      .filter(col => col.default)
      .map(col => col.id);
    
    setVisibleColumns(defaultColumns);
    setColumnOrder(defaultColumns);
  }, []);

  // Update column order when visible columns change
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

  // Filter deliveries when search term or deliveries change
  useEffect(() => {
    if (searchTerm.length >= 3) {
      const filtered = deliveries.filter(delivery => 
        delivery.packageId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.orderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (delivery.customerName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (delivery.courier || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDeliveries(filtered);
    } else {
      setFilteredDeliveries(deliveries);
    }
    setCurrentPage(1);
  }, [searchTerm, deliveries]);

  // Pagination calculations
  const totalItems = filteredDeliveries.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentItems = filteredDeliveries.slice(startIndex, endIndex);

  // Column drag and drop handlers
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

  // Page change handlers
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return {
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
    startIndex,
    endIndex,
    currentItems,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    handlePageChange,
    handlePageSizeChange
  };
};
