
import React, { useState } from 'react';
import { FileText, Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface OrderNotesProps {
  notes: string | undefined;
}

export const OrderNotes = ({ notes }: OrderNotesProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState(notes || "");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Notes updated successfully");
  };

  const handleCancel = () => {
    setEditedNotes(notes || "");
    setIsEditing(false);
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-3 flex items-center justify-between">
        <div className="flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          Notes
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs flex items-center gap-1 border-green-500 text-green-700 hover:bg-green-50"
                onClick={handleSave}
              >
                <Save className="h-3 w-3" />
                Save
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs flex items-center gap-1 border-red-500 text-red-700 hover:bg-red-50"
                onClick={handleCancel}
              >
                <X className="h-3 w-3" />
                Cancel
              </Button>
            </>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs flex items-center gap-1"
              onClick={handleEdit}
            >
              <Edit className="h-3 w-3" />
              Edit
            </Button>
          )}
        </div>
      </h3>
      <div className="rounded-md border bg-card/50 p-4">
        {isEditing ? (
          <textarea 
            value={editedNotes}
            onChange={(e) => setEditedNotes(e.target.value)}
            className="w-full min-h-[100px] text-sm bg-transparent border-none outline-none resize-none"
            placeholder="Enter notes for this order..."
          />
        ) : (
          <p className="text-sm">
            {editedNotes || "No notes available for this order."}
          </p>
        )}
      </div>
    </div>
  );
};
