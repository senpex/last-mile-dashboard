
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Save, X, Upload, Trash2 } from "lucide-react";

interface InsurancePolicyProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const InsurancePolicy: React.FC<InsurancePolicyProps> = ({ 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel 
}) => {
  const insuranceData = {
    policyNumber: "POL-789456123",
    expirationDate: "2025-06-30"
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-sm">Insurance Policy</h4>
          {isEditing ? (
            <div className="flex gap-1">
              <Button variant="outline" size="sm" onClick={onSave} className="h-7 px-2 border-green-500 text-green-700 hover:bg-green-50">
                <Save className="w-3 h-3 mr-1" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={onCancel} className="h-7 px-2 border-red-500 text-red-700 hover:bg-red-50">
                <X className="w-3 h-3 mr-1" />
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1" onClick={onEdit}>
              <Edit className="h-3 w-3" />
              Edit
            </Button>
          )}
        </div>

        {/* Insurance Policy Image */}
        <div className="mb-4">
          <Label className="text-sm font-medium mb-2 block">Policy Document</Label>
          <div className="relative w-full max-w-md">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop" 
              alt="Insurance Policy Document" 
              className="w-full border rounded"
            />
            {isEditing && (
              <Button variant="outline" size="sm" className="absolute top-2 right-2 h-6 w-6 p-0 border-red-500 text-red-700 hover:bg-red-50">
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
          {isEditing && (
            <div className="mt-2 p-3 border-2 border-dashed border-gray-300 rounded-lg text-center max-w-md">
              <Input type="file" accept="image/*,.pdf" className="hidden" id="insurance-upload" />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => document.getElementById('insurance-upload')?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="w-3 h-3" />
                Upload Policy Document
              </Button>
            </div>
          )}
        </div>

        {/* Insurance Policy Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="policy-number" className="text-sm font-medium">Policy Number</Label>
            {isEditing ? (
              <Input id="policy-number" defaultValue={insuranceData.policyNumber} className="mt-1" />
            ) : (
              <p className="mt-1 text-sm text-gray-900">{insuranceData.policyNumber}</p>
            )}
          </div>
          <div>
            <Label htmlFor="policy-expiration" className="text-sm font-medium">Date of Expiration</Label>
            {isEditing ? (
              <Input id="policy-expiration" type="date" defaultValue={insuranceData.expirationDate} className="mt-1" />
            ) : (
              <p className="mt-1 text-sm text-gray-900">{insuranceData.expirationDate}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsurancePolicy;
