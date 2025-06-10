import React, { useState } from 'react';
import { FileCheck, CheckCircle2, Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Predefined requirements list
const PREDEFINED_REQUIREMENTS = [
  "Age verification required",
  "ID check mandatory",
  "Temperature controlled delivery",
  "Fragile item handling",
  "Direct handoff only",
  "Building access code required",
  "Special delivery instructions",
  "Insurance documentation",
  "Chain of custody tracking",
  "Quality inspection needed"
];

export const OrderRequirementsSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [requirements, setRequirements] = useState([
    {
      id: 1,
      name: "Alcohol delivery license",
      active: true
    }, {
      id: 2,
      name: "Hazmat delivery license",
      active: true
    }, {
      id: 3,
      name: "Pharmacy delivery license",
      active: true
    }, {
      id: 4,
      name: "Recipient verification code",
      active: true
    }, {
      id: 5,
      name: "Proof of delivery",
      active: true
    }, {
      id: 6,
      name: "Signature from recipient",
      active: true
    }, {
      id: 7,
      name: "Items to be scanned at the pick-up and drop-offs",
      active: true
    }
  ]);
  const [editingRequirement, setEditingRequirement] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [selectedPredefinedRequirement, setSelectedPredefinedRequirement] = useState<string>("");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      toast.success("Requirements updated successfully");
    }
  };

  const handleAddRequirement = () => {
    if (!selectedPredefinedRequirement) {
      toast.error("Please select a requirement from the list");
      return;
    }

    // Check if requirement already exists
    const exists = requirements.some(req => req.name === selectedPredefinedRequirement);
    if (exists) {
      toast.error("This requirement is already added");
      return;
    }

    const newRequirement = {
      id: Math.max(...requirements.map(r => r.id)) + 1,
      name: selectedPredefinedRequirement,
      active: true
    };
    setRequirements([...requirements, newRequirement]);
    setSelectedPredefinedRequirement("");
    toast.success("Requirement added successfully");
  };

  const handleDeleteRequirement = (id: number) => {
    setRequirements(requirements.filter(req => req.id !== id));
  };

  const handleStartEdit = (req: any) => {
    setEditingRequirement(req.id);
    setEditingText(req.name);
  };

  const handleSaveEdit = () => {
    setRequirements(requirements.map(req => 
      req.id === editingRequirement 
        ? { ...req, name: editingText }
        : req
    ));
    setEditingRequirement(null);
    setEditingText("");
  };

  const handleCancelEdit = () => {
    setEditingRequirement(null);
    setEditingText("");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium flex items-center">
          <FileCheck className="w-4 h-4 mr-2" />
          Order Requirements
        </h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 text-xs flex items-center gap-1.5"
          onClick={handleEditClick}
        >
          <Edit className="h-4 w-4" />
          {isEditing ? "Done" : "Edit"}
        </Button>
      </div>
      <div className="rounded-md border bg-card/50 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {requirements.map(req => (
            <div key={req.id} className="flex items-center p-2 transition-colors group">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mr-2" />
              {editingRequirement === req.id ? (
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="h-6 text-xs"
                    onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                  />
                  <Button
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <>
                  <span className="text-xs font-medium flex-1">
                    {req.name}
                  </span>
                  {isEditing && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => handleStartEdit(req)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteRequirement(req.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
          {isEditing && (
            <div className="flex items-center gap-2 p-2">
              <Select
                value={selectedPredefinedRequirement}
                onValueChange={setSelectedPredefinedRequirement}
              >
                <SelectTrigger className="h-7 text-xs flex-1">
                  <SelectValue placeholder="Select requirement..." />
                </SelectTrigger>
                <SelectContent>
                  {PREDEFINED_REQUIREMENTS.map(requirement => (
                    <SelectItem key={requirement} value={requirement}>
                      {requirement}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs flex items-center gap-1.5"
                onClick={handleAddRequirement}
                disabled={!selectedPredefinedRequirement}
              >
                <Plus className="h-4 w-4" />
                Add Requirement
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
