import { useRef, useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";

interface OrderMapProps {
  pickupAddress: string;
  deliveryAddress: string;
  driverName: string;
}

export const OrderMap = ({ pickupAddress, deliveryAddress, driverName }: OrderMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const dialogMapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [dialogMap, setDialogMap] = useState<google.maps.Map | null>(null);

  const initMap = async (container: HTMLDivElement, setMapInstance: (map: google.maps.Map) => void) => {
    setMapError(null);
    console.log("Initializing map in container:", container);
    
    const loader = new Loader({
      apiKey: "AIzaSyD--I0r1HmH90XbB_l-KzBEx-Y3I1uGtOE",
      version: "weekly",
    });

    try {
      const google = await loader.load();
      console.log("Google Maps API loaded");
      
      const mapInstance = new google.maps.Map(container, {
        zoom: 12,
        center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#242f3e" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }]
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }]
          }
        ],
        disableDefaultUI: true,
      });
      
      console.log("Map instance created");
      setMapInstance(mapInstance);

      const geocoder = new google.maps.Geocoder();
      
      const enhancedPickupAddress = pickupAddress.includes(", San Francisco") 
        ? pickupAddress 
        : `${pickupAddress}, San Francisco, CA, USA`;
      
      const enhancedDeliveryAddress = deliveryAddress.includes(", San Francisco") 
        ? deliveryAddress 
        : `${deliveryAddress}, San Francisco, CA, USA`;

      console.log("Geocoding pickup:", enhancedPickupAddress);
      
      geocoder.geocode({ address: enhancedPickupAddress }, (pickupResults, pickupStatus) => {
        if (pickupStatus !== "OK" || !pickupResults?.[0]) {
          console.error("Pickup geocode failed:", pickupStatus, enhancedPickupAddress);
          setMapError(`Could not find pickup location: ${enhancedPickupAddress}`);
          return;
        }

        const pickupLocation = pickupResults[0].geometry.location;
        console.log("Pickup location found:", pickupLocation.toString());
        
        new google.maps.Marker({
          position: pickupLocation,
          map: mapInstance,
          title: "Pickup",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#FF5252",
            fillOpacity: 1,
            strokeColor: "#fff",
            strokeWeight: 2,
          },
        });

        console.log("Geocoding delivery:", enhancedDeliveryAddress);
        
        geocoder.geocode({ address: enhancedDeliveryAddress }, (deliveryResults, deliveryStatus) => {
          if (deliveryStatus !== "OK" || !deliveryResults?.[0]) {
            console.error("Delivery geocode failed:", deliveryStatus, enhancedDeliveryAddress);
            setMapError(`Could not find delivery location: ${enhancedDeliveryAddress}`);
            return;
          }

          const deliveryLocation = deliveryResults[0].geometry.location;
          console.log("Delivery location found:", deliveryLocation.toString());
          
          new google.maps.Marker({
            position: deliveryLocation,
            map: mapInstance,
            title: "Delivery",
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#2196F3",
              fillOpacity: 1,
              strokeColor: "#fff",
              strokeWeight: 2,
            },
          });

          const bounds = new google.maps.LatLngBounds();
          bounds.extend(pickupLocation);
          bounds.extend(deliveryLocation);
          mapInstance.fitBounds(bounds);
          
          mapInstance.setZoom(mapInstance.getZoom() - 0.5);

          const driverLocation = new google.maps.LatLng(
            (pickupLocation.lat() + deliveryLocation.lat()) / 2,
            (pickupLocation.lng() + deliveryLocation.lng()) / 2
          );

          new google.maps.Marker({
            position: driverLocation,
            map: mapInstance,
            title: `Driver: ${driverName}`,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#4CAF50",
              fillOpacity: 1,
              strokeColor: "#fff",
              strokeWeight: 2,
            },
          });

          new google.maps.Polyline({
            path: [pickupLocation, deliveryLocation],
            geodesic: true,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            map: mapInstance,
          });
        });
      });

    } catch (error: any) {
      console.error("Error loading Google Maps:", error);
      setMapError(`Map error: ${error?.message || "Unknown error"}`);
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      initMap(mapRef.current, setMap);
    }
  }, []);

  useEffect(() => {
    if (isDialogOpen) {
      console.log("Dialog opened, initializing map...");
      setDialogMap(null);
      
      const timer = setTimeout(() => {
        console.log("Timeout finished, dialog ref exists:", !!dialogMapRef.current);
        if (dialogMapRef.current) {
          dialogMapRef.current.style.display = 'block';
          dialogMapRef.current.style.height = '500px';
          dialogMapRef.current.style.width = '100%';
          
          initMap(dialogMapRef.current, setDialogMap);
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isDialogOpen]);

  const handleZoomIn = () => {
    if (isDialogOpen && dialogMap) {
      dialogMap.setZoom((dialogMap.getZoom() || 12) + 1);
    } else if (map) {
      map.setZoom((map.getZoom() || 12) + 1);
    }
  };

  const handleZoomOut = () => {
    if (isDialogOpen && dialogMap) {
      dialogMap.setZoom((dialogMap.getZoom() || 12) - 1);
    } else if (map) {
      map.setZoom((map.getZoom() || 12) - 1);
    }
  };

  return (
    <>
      <div 
        className="relative w-full h-[140px] rounded-md overflow-hidden shadow-sm cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <div 
          ref={mapRef} 
          className="w-full h-full"
        />
        {mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white text-sm p-2 text-center">
              {mapError}
            </div>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[556px] h-[140px] p-0 bg-[#242f3e] border-[#3a4c63] text-white overflow-hidden">
          <DialogTitle className="sr-only">Map View</DialogTitle>
          <DialogDescription className="sr-only">
            Interactive map showing pickup, delivery, and driver locations
          </DialogDescription>
          
          <div className="relative w-full h-full">
            <div className="absolute top-2 right-2 flex gap-2 z-10">
              <Button
                variant="secondary"
                size="icon"
                onClick={handleZoomIn}
                className="h-6 w-6 bg-[#3a4c63] hover:bg-[#4a5c73] text-white border-none"
              >
                <ZoomIn className="h-3 w-3" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={handleZoomOut}
                className="h-6 w-6 bg-[#3a4c63] hover:bg-[#4a5c73] text-white border-none"
              >
                <ZoomOut className="h-3 w-3" />
              </Button>
            </div>
            <div 
              id="dialogMap"
              ref={dialogMapRef}
              className="w-full h-full bg-[#242f3e]"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
