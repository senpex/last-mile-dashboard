
import React, { useState } from 'react';
import { Layout } from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColumnSelector, { ColumnOption } from "@/components/table/ColumnSelector";

const ClientsPage = () => {
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const availableColumns: ColumnOption[] = [
    { id: "id", label: "ID", default: true },
    { id: "name", label: "Name", default: true },
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
  ];

  React.useEffect(() => {
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
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Clients Management</h1>
          <div className="flex items-center justify-between mb-2">  {/* Changed mb-4 to mb-2 */}
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="w-3 h-3" />
              Add Client
            </Button>
            <div className="flex justify-end">
              <ColumnSelector
                columns={availableColumns}
                visibleColumns={visibleColumns}
                setVisibleColumns={setVisibleColumns}
              />
            </div>
          </div>
        </div>

        <div className="border rounded-md overflow-hidden mb-4">
          <ScrollArea orientation="horizontal">
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
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    {sortedColumns.includes("id") && (
                      <TableCell className="font-mono">{client.id}</TableCell>
                    )}
                    {sortedColumns.includes("name") && (
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
          </ScrollArea>
        </div>
      </div>
    </Layout>
  );
};

export default ClientsPage;
