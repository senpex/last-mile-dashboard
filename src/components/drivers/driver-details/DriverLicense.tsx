
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Save, X, Upload, Trash2 } from "lucide-react";

interface DriverLicenseProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const DriverLicense: React.FC<DriverLicenseProps> = ({ 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel 
}) => {
  const driverLicenseData = {
    id: "DL123456789",
    expirationDate: "2025-12-31",
    state: "California",
    ssn: "***-**-1234"
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-sm">Driver License</h4>
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

        {/* Driver License Images */}
        <div className="mb-4">
          <Label className="text-sm font-medium mb-2 block">License Images</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=120&fit=crop" 
                alt="Driver License Front" 
                className="w-full border rounded"
              />
              {isEditing && (
                <Button variant="outline" size="sm" className="absolute top-2 right-2 h-6 w-6 p-0 border-red-500 text-red-700 hover:bg-red-50">
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=120&fit=crop" 
                alt="Driver License Back" 
                className="w-full border rounded"
              />
              {isEditing && (
                <Button variant="outline" size="sm" className="absolute top-2 right-2 h-6 w-6 p-0 border-red-500 text-red-700 hover:bg-red-50">
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
          {isEditing && (
            <div className="mt-2 p-3 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <Input type="file" accept="image/*" className="hidden" id="license-upload" multiple />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => document.getElementById('license-upload')?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="w-3 h-3" />
                Upload License Images
              </Button>
            </div>
          )}
        </div>

        {/* Driver License Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="license-id" className="text-sm font-medium">Driver License ID</Label>
            {isEditing ? (
              <Input id="license-id" defaultValue={driverLicenseData.id} className="mt-1" />
            ) : (
              <p className="mt-1 text-sm text-gray-900">{driverLicenseData.id}</p>
            )}
          </div>
          <div>
            <Label htmlFor="license-expiration" className="text-sm font-medium">Date of Expiration</Label>
            {isEditing ? (
              <Input id="license-expiration" type="date" defaultValue={driverLicenseData.expirationDate} className="mt-1" />
            ) : (
              <p className="mt-1 text-sm text-gray-900">{driverLicenseData.expirationDate}</p>
            )}
          </div>
          <div>
            <Label htmlFor="license-state" className="text-sm font-medium">State</Label>
            {isEditing ? (
              <Input id="license-state" defaultValue={driverLicenseData.state} className="mt-1" />
            ) : (
              <p className="mt-1 text-sm text-gray-900">{driverLicenseData.state}</p>
            )}
          </div>
          <div>
            <Label htmlFor="ssn" className="text-sm font-medium">SSN</Label>
            {isEditing ? (
              <Input id="ssn" defaultValue={driverLicenseData.ssn} className="mt-1" />
            ) : (
              <p className="mt-1 text-sm text-gray-900">{driverLicenseData.ssn}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverLicense;
