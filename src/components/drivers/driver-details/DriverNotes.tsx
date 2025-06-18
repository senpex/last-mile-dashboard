
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Save, X } from "lucide-react";

interface DriverNotesProps {
  driver: any;
  onNotesUpdate?: (notes: string) => void;
}

export const DriverNotes: React.FC<DriverNotesProps> = ({ 
  driver, 
  onNotesUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(driver?.notes || '');

  const handleSave = () => {
    onNotesUpdate?.(notes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNotes(driver?.notes || '');
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Notes</CardTitle>
        {!isEditing ? (
          <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this driver..."
            rows={4}
          />
        ) : (
          <div className="min-h-[100px] p-3 bg-muted/50 rounded-md">
            {notes || <span className="text-muted-foreground">No notes available</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
