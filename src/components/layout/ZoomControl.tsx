
import React from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useZoom } from "./ZoomProvider";
import { cn } from "@/lib/utils";

// Zoom constants (must match ZoomProvider.tsx)
const MIN_ZOOM = 0.7;
const MAX_ZOOM = 1.3;

interface ZoomControlProps {
  collapsed?: boolean;
}

const ZoomControl = ({ collapsed = false }: ZoomControlProps) => {
  const { zoom, setZoom } = useZoom();
  
  const handleZoomChange = (value: number[]) => {
    setZoom(value[0]);
  };

  const decreaseZoom = () => {
    setZoom(Math.max(MIN_ZOOM, zoom - 0.1));
  };

  const increaseZoom = () => {
    setZoom(Math.min(MAX_ZOOM, zoom + 0.1));
  };

  return (
    <div className="w-full px-3 py-2 mb-2">
      <div 
        className={cn(
          "flex items-center gap-2",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        <button 
          onClick={decreaseZoom}
          className="text-sidebar-foreground hover:text-sidebar-accent-foreground"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        
        {!collapsed && (
          <div className="flex-1">
            <Slider
              value={[zoom]}
              min={MIN_ZOOM}
              max={MAX_ZOOM}
              step={0.05}
              onValueChange={handleZoomChange}
              className="w-full"
            />
          </div>
        )}
        
        <button 
          onClick={increaseZoom}
          className="text-sidebar-foreground hover:text-sidebar-accent-foreground"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ZoomControl;
