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
const ZoomControl = ({
  collapsed = false
}: ZoomControlProps) => {
  const {
    zoom,
    setZoom
  } = useZoom();
  const handleZoomChange = (value: number[]) => {
    setZoom(value[0]);
  };
  const decreaseZoom = () => {
    setZoom(Math.max(MIN_ZOOM, zoom - 0.1));
  };
  const increaseZoom = () => {
    setZoom(Math.min(MAX_ZOOM, zoom + 0.1));
  };
  return;
};
export default ZoomControl;