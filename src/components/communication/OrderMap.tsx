import { useRef, useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Navigation, Car } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Create a singleton loader instance
const loaderInstance = new Loader({
  apiKey: "AIzaSyD--I0r1HmH90XbB_l-KzBEx-Y3I1uGtOE",
  version: "weekly",
  libraries: ["geometry", "places"],
});

// Global reference to the loaded Google Maps API
let googleMapsPromise: Promise<typeof google> | null = null;

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
  const [route, setRoute] = useState<google.maps.DirectionsResult | null>(null);
  const [carMarker, setCarMarker] = useState<google.maps.Marker | null>(null);
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const [pickupLocation, setPickupLocation] = useState<google.maps.LatLng | null>(null);
  const [deliveryLocation, setDeliveryLocation] = useState<google.maps.LatLng | null>(null);

  // Function to animate car along the route
  const animateCarAlongRoute = (
    routePath: google.maps.LatLng[], 
    marker: google.maps.Marker, 
    map: google.maps.Map,
    duration = 10000
  ) => {
    if (animationRef.current) {
      window.cancelAnimationFrame(animationRef.current);
    }
    
    setAnimationInProgress(true);
    const startTime = performance.now();
    const totalPoints = routePath.length;
    let lastPointIndex = 0;
    
    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Calculate current position - use exact same calculation for both car and progress bar
      const pointIndex = Math.min(
        Math.floor(progress * totalPoints),
        totalPoints - 1
      );
      
      // Only update progress when point index changes, ensuring smooth visual updates
      if (pointIndex !== lastPointIndex) {
        lastPointIndex = pointIndex;
        setProgress(progress);
      }
      
      if (pointIndex > 0) {
        const currentPosition = routePath[pointIndex];
        const prevPosition = routePath[pointIndex - 1];
        
        // Update marker position
        marker.setPosition(currentPosition);
        
        // Calculate heading for car rotation
        const heading = google.maps.geometry.spherical.computeHeading(
          prevPosition,
          currentPosition
        );
        
        // Set car icon rotation
        const icon = marker.getIcon() as google.maps.Symbol;
        if (icon) {
          icon.rotation = heading;
          marker.setIcon(icon);
        }
      }
      
      // Continue animation if not complete
      if (progress < 1) {
        animationRef.current = window.requestAnimationFrame(tick);
      } else {
        setAnimationInProgress(false);
        // Reset to beginning after a pause
        setTimeout(() => {
          if (!isDialogOpen) { // Only loop if not in dialog view
            animateCarAlongRoute(routePath, marker, map, duration);
          }
        }, 2000);
      }
    };
    
    animationRef.current = window.requestAnimationFrame(tick);
  };

  // Load Google Maps API once
  const getGoogleMaps = () => {
    if (!googleMapsPromise) {
      googleMapsPromise = loaderInstance.load();
    }
    return googleMapsPromise;
  };

  const initMap = async (container: HTMLDivElement, setMapInstance: (map: google.maps.Map) => void) => {
    setMapError(null);
    console.log("Initializing map in container:", container);
    
    try {
      const google = await getGoogleMaps();
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
            stylers: [{ color: "#212835" }]
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

        const pickup = pickupResults[0].geometry.location;
        setPickupLocation(pickup);
        console.log("Pickup location found:", pickup.toString());
        
        // Create nice looking pickup marker
        new google.maps.Marker({
          position: pickup,
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
          animation: google.maps.Animation.DROP,
        });

        console.log("Geocoding delivery:", enhancedDeliveryAddress);
        
        geocoder.geocode({ address: enhancedDeliveryAddress }, (deliveryResults, deliveryStatus) => {
          if (deliveryStatus !== "OK" || !deliveryResults?.[0]) {
            console.error("Delivery geocode failed:", deliveryStatus, enhancedDeliveryAddress);
            setMapError(`Could not find delivery location: ${enhancedDeliveryAddress}`);
            return;
          }

          const delivery = deliveryResults[0].geometry.location;
          setDeliveryLocation(delivery);
          console.log("Delivery location found:", delivery.toString());
          
          // Create nice looking delivery marker
          new google.maps.Marker({
            position: delivery,
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
            animation: google.maps.Animation.DROP,
          });

          const bounds = new google.maps.LatLngBounds();
          bounds.extend(pickup);
          bounds.extend(delivery);
          mapInstance.fitBounds(bounds);
          mapInstance.setZoom(mapInstance.getZoom() - 0.5);

          // Calculate route between points using Directions API
          const directionsService = new google.maps.DirectionsService();
          const directionsRenderer = new google.maps.DirectionsRenderer({
            map: mapInstance,
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: "#4CAF50",
              strokeOpacity: 0.8,
              strokeWeight: 5,
            }
          });

          directionsService.route({
            origin: pickup,
            destination: delivery,
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              setRoute(result);
              directionsRenderer.setDirections(result);
              
              // Extract route path for animation
              const routePath = result.routes[0].overview_path;
              
              // Create car marker
              const carMarker = new google.maps.Marker({
                position: pickup,
                map: mapInstance,
                title: `Driver: ${driverName}`,
                icon: {
                  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  scale: 6,
                  fillColor: "#4CAF50",
                  fillOpacity: 1,
                  strokeColor: "#fff",
                  strokeWeight: 2,
                  rotation: 0, // Will be updated during animation
                },
                zIndex: 999,
              });
              
              setCarMarker(carMarker);
              
              // Add info window for driver
              const infoWindow = new google.maps.InfoWindow({
                content: `<div class="p-2"><strong>${driverName}</strong><br>En route</div>`,
              });
              
              carMarker.addListener("click", () => {
                infoWindow.open(mapInstance, carMarker);
              });
              
              // Start the animation
              animateCarAlongRoute(routePath, carMarker, mapInstance);
            } else {
              console.error("Directions request failed:", status);
              setMapError("Could not calculate route between locations");
              
              // Fall back to simple polyline if directions fail
              new google.maps.Polyline({
                path: [pickup, delivery],
                geodesic: true,
                strokeColor: "#FFFFFF",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                map: mapInstance,
              });
            }
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
    
    return () => {
      // Clean up animation when component unmounts
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
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
    const activeMap = isDialogOpen && dialogMap ? dialogMap : map;
    if (activeMap) {
      activeMap.setZoom((activeMap.getZoom() || 12) + 1);
    }
  };

  const handleZoomOut = () => {
    const activeMap = isDialogOpen && dialogMap ? dialogMap : map;
    if (activeMap) {
      activeMap.setZoom((activeMap.getZoom() || 12) - 1);
    }
  };

  const handleCenterOnRoute = () => {
    const activeMap = isDialogOpen && dialogMap ? dialogMap : map;
    if (activeMap && pickupLocation && deliveryLocation) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(pickupLocation);
      bounds.extend(deliveryLocation);
      activeMap.fitBounds(bounds);
    }
  };

  return (
    <>
      <div 
        className="relative w-full h-[140px] rounded-md overflow-hidden shadow-sm cursor-pointer group"
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
        
        <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col gap-1">
            <Button
              variant="secondary"
              size="icon"
              className="h-6 w-6 bg-[#3a4c63] hover:bg-[#4a5c73] text-white border-none shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
            >
              <ZoomIn className="h-3 w-3" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-6 w-6 bg-[#3a4c63] hover:bg-[#4a5c73] text-white border-none shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
            >
              <ZoomOut className="h-3 w-3" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-6 w-6 bg-[#3a4c63] hover:bg-[#4a5c73] text-white border-none shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                handleCenterOnRoute();
              }}
            >
              <Navigation className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {animationInProgress && (
          <div className="absolute bottom-1 left-1 right-1">
            <div className="bg-black/50 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-green-500 h-full transition-none" 
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[1112px] h-[560px] p-0 bg-[#242f3e] border-[#3a4c63] text-white overflow-hidden">
          <DialogTitle className="sr-only">Map View</DialogTitle>
          <DialogDescription className="sr-only">
            Interactive map showing pickup, delivery, and driver locations
          </DialogDescription>
          
          <div className="relative w-full h-full flex flex-col">
            <div className="absolute top-2 right-2 flex gap-2 z-10">
              <Button
                variant="secondary"
                size="icon"
                onClick={handleZoomIn}
                className="h-8 w-8 bg-[#3a4c63] hover:bg-[#4a5c73] text-white border-none"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={handleZoomOut}
                className="h-8 w-8 bg-[#3a4c63] hover:bg-[#4a5c73] text-white border-none"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={handleCenterOnRoute}
                className="h-8 w-8 bg-[#3a4c63] hover:bg-[#4a5c73] text-white border-none"
              >
                <Navigation className="h-4 w-4" />
              </Button>
            </div>
            <div 
              id="dialogMap"
              ref={dialogMapRef}
              className="flex-1 w-full bg-[#242f3e]"
            />
            {animationInProgress && (
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="bg-black/50 h-2 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="bg-green-500 h-full rounded-full transition-none" 
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-white/70">
                  <div className="flex items-center gap-1">
                    <Car className="h-3 w-3" />
                    <span>{driverName}</span>
                  </div>
                  <div>
                    ETA: {Math.floor((1 - progress) * 10)} min
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
