
import React, { createContext, useContext, useEffect, useState } from "react";

// Define the zoom range (0.7 to 1.3 = 30% reduction to 30% increase)
const MIN_ZOOM = 0.7;
const MAX_ZOOM = 1.3;
const DEFAULT_ZOOM = 1.0;

type ZoomLevel = number;

interface ZoomContextType {
  zoom: ZoomLevel;
  setZoom: (zoom: ZoomLevel) => void;
}

const ZoomContext = createContext<ZoomContextType | undefined>(undefined);

export const ZoomProvider = ({ children }: { children: React.ReactNode }) => {
  const [zoom, setZoom] = useState<ZoomLevel>(() => {
    // Check for saved zoom preference
    const savedZoom = localStorage.getItem("zoom");
    return savedZoom ? parseFloat(savedZoom) : DEFAULT_ZOOM;
  });

  useEffect(() => {
    // Apply zoom to document element
    document.documentElement.style.setProperty('--zoom-level', zoom.toString());
    
    // Save zoom preference
    localStorage.setItem("zoom", zoom.toString());
  }, [zoom]);

  // Create a wrapped setZoom function that enforces min/max values
  const handleSetZoom = (newZoom: ZoomLevel) => {
    // Clamp the zoom value between MIN_ZOOM and MAX_ZOOM
    const clampedZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
    setZoom(clampedZoom);
  };

  return (
    <ZoomContext.Provider value={{ zoom, setZoom: handleSetZoom }}>
      {children}
    </ZoomContext.Provider>
  );
};

export const useZoom = () => {
  const context = useContext(ZoomContext);
  
  if (context === undefined) {
    throw new Error("useZoom must be used within a ZoomProvider");
  }
  
  return context;
};
