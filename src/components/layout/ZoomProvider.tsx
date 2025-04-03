
import React, { createContext, useContext, useEffect, useState } from "react";

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
    return savedZoom ? parseFloat(savedZoom) : 1;
  });

  useEffect(() => {
    // Apply zoom to document element
    document.documentElement.style.setProperty('--zoom-level', zoom.toString());
    
    // Save zoom preference
    localStorage.setItem("zoom", zoom.toString());
  }, [zoom]);

  return (
    <ZoomContext.Provider value={{ zoom, setZoom }}>
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
