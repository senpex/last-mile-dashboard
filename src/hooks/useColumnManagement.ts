
import { useState } from 'react';
import { ColumnOption } from "@/components/table/ColumnSelector";

export const useColumnManagement = (initialColumns: ColumnOption[]) => {
  const [columns, setColumns] = useState<ColumnOption[]>(initialColumns);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const sortedColumns = columns
    .filter(col => col.visible)
    .map(col => col.id);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    setDraggedColumn(columnId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
    e.preventDefault();
    
    if (!draggedColumn || draggedColumn === targetColumnId) {
      setDraggedColumn(null);
      setDragOverColumn(null);
      return;
    }

    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      const draggedIndex = newColumns.findIndex(col => col.id === draggedColumn);
      const targetIndex = newColumns.findIndex(col => col.id === targetColumnId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const [draggedCol] = newColumns.splice(draggedIndex, 1);
        newColumns.splice(targetIndex, 0, draggedCol);
      }
      
      return newColumns;
    });

    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const updateColumnVisibility = (columnId: string, visible: boolean) => {
    setColumns(prevColumns =>
      prevColumns.map(col =>
        col.id === columnId ? { ...col, visible } : col
      )
    );
  };

  return {
    columns,
    sortedColumns,
    draggedColumn,
    dragOverColumn,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    updateColumnVisibility,
  };
};
