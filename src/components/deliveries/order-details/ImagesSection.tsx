import React, { useState, useRef } from 'react';
import { Images, Edit, Save, X, ExternalLink, Clock, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ImageData {
  id: string;
  url: string;
  timestamp: string;
}

interface ImagesSectionProps {}

export const ImagesSection = ({}: ImagesSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentImageSetter, setCurrentImageSetter] = useState<React.Dispatch<React.SetStateAction<ImageData[]>> | null>(null);
  
  // Sample image data for each category
  const [clientImages, setClientImages] = useState<ImageData[]>([
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      timestamp: "2024-06-04 10:15 AM"
    },
    {
      id: "2", 
      url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      timestamp: "2024-06-04 10:18 AM"
    }
  ]);
  
  const [popImages, setPopImages] = useState<ImageData[]>([
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
      timestamp: "2024-06-04 11:30 AM"
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1469041797191-50ace28483c3", 
      timestamp: "2024-06-04 11:35 AM"
    }
  ]);
  
  const [podImages, setPodImages] = useState<ImageData[]>([
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2",
      timestamp: "2024-06-04 2:45 PM"
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1487252665478-49b61b47f302",
      timestamp: "2024-06-04 2:50 PM"
    }
  ]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Images updated successfully");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDeleteImage = (imageId: string, images: ImageData[], setImages: React.Dispatch<React.SetStateAction<ImageData[]>>) => {
    const newImages = images.filter(image => image.id !== imageId);
    setImages(newImages);
    toast.success("Image deleted successfully");
  };

  const handleAddImage = (images: ImageData[], setImages: React.Dispatch<React.SetStateAction<ImageData[]>>) => {
    setCurrentImageSetter(setImages);
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && currentImageSetter) {
      // Create a local URL for the uploaded file
      const imageUrl = URL.createObjectURL(file);
      
      const newImage: ImageData = {
        id: Date.now().toString(),
        url: imageUrl,
        timestamp: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      };
      
      currentImageSetter(prevImages => [...prevImages, newImage]);
      toast.success("Image uploaded successfully");
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setCurrentImageSetter(null);
    }
  };

  const renderImageGroup = (title: string, images: ImageData[], setImages: React.Dispatch<React.SetStateAction<ImageData[]>>) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
        {isEditing && (
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs flex items-center gap-1"
            onClick={() => handleAddImage(images, setImages)}
          >
            <Plus className="h-3 w-3" />
            Add Image
          </Button>
        )}
      </div>
      <div className="space-y-2">
        {images.map((image, index) => (
          <div key={image.id} className="flex items-center justify-between p-3 border rounded-md bg-card/50">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                <img 
                  src={image.url} 
                  alt={`${title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <Input
                    value={image.url}
                    onChange={(e) => {
                      const newImages = [...images];
                      newImages[index] = { ...newImages[index], url: e.target.value };
                      setImages(newImages);
                    }}
                    className="text-xs"
                    placeholder="Image URL"
                  />
                ) : (
                  <div className="text-xs text-blue-600 hover:text-blue-800 truncate cursor-pointer">
                    {image.url}
                  </div>
                )}
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{image.timestamp}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {!isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => window.open(image.url, '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                  onClick={() => handleDeleteImage(image.id, images, setImages)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      
      <h3 className="text-sm font-medium mb-3 flex items-center justify-between">
        <div className="flex items-center">
          <Images className="w-4 h-4 mr-2" />
          Images
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
      <div className="rounded-md border bg-card/50 p-4 space-y-6">
        {renderImageGroup("Clients images", clientImages, setClientImages)}
        {renderImageGroup("POP (proof of pickup)", popImages, setPopImages)}
        {renderImageGroup("POD (proof of delivery)", podImages, setPodImages)}
      </div>
    </div>
  );
};
