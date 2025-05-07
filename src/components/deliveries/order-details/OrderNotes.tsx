
import React from 'react';
import { FileText } from "lucide-react";

interface OrderNotesProps {
  notes: string | undefined;
}

export const OrderNotes = ({ notes }: OrderNotesProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3 flex items-center">
        <FileText className="w-4 h-4 mr-2" />
        Notes
      </h3>
      <div className="rounded-md border bg-card/50 p-4">
        <p className="text-sm">
          {notes || "No notes available for this order."}
        </p>
      </div>
    </div>
  );
};
