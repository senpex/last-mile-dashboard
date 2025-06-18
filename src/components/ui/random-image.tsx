
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye } from "lucide-react";

interface RandomImageProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

const UNSPLASH_IMAGES = [
  "photo-1649972904349-6e44c42644a7", // woman sitting on a bed using a laptop
  "photo-1488590528505-98d2b5aba04b", // turned on gray laptop computer
  "photo-1518770660439-4636190af475", // macro photography of black circuit board
  "photo-1461749280684-dccba630e2f6", // monitor showing Java programming
  "photo-1486312338219-ce68d2c6f44d", // person using MacBook Pro
  "photo-1581091226825-a6a2a5aee158", // woman in white long sleeve shirt using black laptop computer
  "photo-1485827404703-89b55fcc595e", // white robot near brown wall
  "photo-1526374965328-7f61d4dc18c5", // Matrix movie still
  "photo-1531297484001-80022131f5a1", // gray and black laptop computer on surface
  "photo-1487058792275-0ad4aaf24ca7", // Colorful software or web code on a computer monitor
];

export const RandomImage: React.FC<RandomImageProps> = ({ 
  width = 400, 
  height = 300, 
  className = "", 
  alt = "Random image" 
}) => {
  const [imageId, setImageId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Generate random image on component mount
    const randomIndex = Math.floor(Math.random() * UNSPLASH_IMAGES.length);
    setImageId(UNSPLASH_IMAGES[randomIndex]);
  }, []);

  const imageUrl = `https://images.unsplash.com/${imageId}?w=${width}&h=${height}&fit=crop`;
  const expandedImageUrl = `https://images.unsplash.com/${imageId}?w=1200&h=800&fit=crop`;

  const handleImageClick = () => {
    setIsExpanded(true);
  };

  const handleCloseModal = () => {
    setIsExpanded(false);
  };

  if (!imageId) {
    return (
      <div 
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{ width, height }}
      />
    );
  }

  return (
    <>
      <div 
        className={`relative cursor-pointer group border rounded overflow-hidden ${className}`}
        onClick={handleImageClick}
      >
        <img 
          src={imageUrl} 
          alt={alt}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          style={{ width, height }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
          <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <Dialog open={isExpanded} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center p-4">
            <img 
              src={expandedImageUrl} 
              alt={alt}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
