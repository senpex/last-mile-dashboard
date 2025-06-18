
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Upload } from "lucide-react";

interface InsurancePolicyProps {
  isEditing: boolean;
  driverData: any;
  onDataChange: (field: string, value: any) => void;
}

export const InsurancePolicy: React.FC<InsurancePolicyProps> = ({
  isEditing,
  driverData,
  onDataChange
}) => {
  const [policyImage, setPolicyImage] = useState<string | null>(
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  );

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setPolicyImage(result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleDeleteImage = () => {
    setPolicyImage(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Insurance Policy</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Image Section */}
        <div className="space-y-2">
          <Label>Policy Document</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            {policyImage ? (
              <div className="relative">
                <img 
                  src={policyImage} 
                  alt="Insurance Policy" 
                  className="w-full h-40 object-cover rounded"
                />
                {isEditing && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={handleDeleteImage}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleImageUpload}
                    >
                      <Upload className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12">
                <p className="text-gray-500 mb-2">No policy document</p>
                {isEditing && (
                  <Button
                    variant="outline"
                    onClick={handleImageUpload}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Fields Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="policy-number">Policy Number</Label>
            <Input
              id="policy-number"
              value={driverData?.policyNumber || "POL123456789"}
              onChange={(e) => onDataChange('policyNumber', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="policy-expiration">Date of Expiration</Label>
            <Input
              id="policy-expiration"
              type="date"
              value={driverData?.policyExpiration || "2025-06-30"}
              onChange={(e) => onDataChange('policyExpiration', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
