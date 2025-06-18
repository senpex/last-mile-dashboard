
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Upload } from "lucide-react";

interface DriverLicenseProps {
  isEditing: boolean;
  driverData: any;
  onDataChange: (field: string, value: any) => void;
}

export const DriverLicense: React.FC<DriverLicenseProps> = ({
  isEditing,
  driverData,
  onDataChange
}) => {
  const [frontImage, setFrontImage] = useState<string | null>(
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  );
  const [backImage, setBackImage] = useState<string | null>(
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  );

  const handleImageUpload = (type: 'front' | 'back') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (type === 'front') {
            setFrontImage(result);
          } else {
            setBackImage(result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleDeleteImage = (type: 'front' | 'back') => {
    if (type === 'front') {
      setFrontImage(null);
    } else {
      setBackImage(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver License</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Images Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Front Image */}
          <div className="space-y-2">
            <Label>Front Image</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {frontImage ? (
                <div className="relative">
                  <img 
                    src={frontImage} 
                    alt="Driver License Front" 
                    className="w-full h-32 object-cover rounded"
                  />
                  {isEditing && (
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteImage('front')}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleImageUpload('front')}
                      >
                        <Upload className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8">
                  <p className="text-gray-500 mb-2">No front image</p>
                  {isEditing && (
                    <Button
                      variant="outline"
                      onClick={() => handleImageUpload('front')}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Back Image */}
          <div className="space-y-2">
            <Label>Back Image</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {backImage ? (
                <div className="relative">
                  <img 
                    src={backImage} 
                    alt="Driver License Back" 
                    className="w-full h-32 object-cover rounded"
                  />
                  {isEditing && (
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteImage('back')}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleImageUpload('back')}
                      >
                        <Upload className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8">
                  <p className="text-gray-500 mb-2">No back image</p>
                  {isEditing && (
                    <Button
                      variant="outline"
                      onClick={() => handleImageUpload('back')}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fields Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="license-id">Driver License ID</Label>
            <Input
              id="license-id"
              value={driverData?.licenseId || "DL123456789"}
              onChange={(e) => onDataChange('licenseId', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="license-expiration">Date of Expiration</Label>
            <Input
              id="license-expiration"
              type="date"
              value={driverData?.licenseExpiration || "2025-12-31"}
              onChange={(e) => onDataChange('licenseExpiration', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="license-state">State</Label>
            <Input
              id="license-state"
              value={driverData?.licenseState || "CA"}
              onChange={(e) => onDataChange('licenseState', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ssn">SSN</Label>
            <Input
              id="ssn"
              value={driverData?.ssn || "***-**-1234"}
              onChange={(e) => onDataChange('ssn', e.target.value)}
              disabled={!isEditing}
              type={isEditing ? "text" : "password"}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
