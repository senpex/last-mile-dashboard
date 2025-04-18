
import { useRef, useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface OrderMapProps {
  pickupAddress: string;
  deliveryAddress: string;
  driverName: string;
}

export const OrderMap = ({ pickupAddress, deliveryAddress, driverName }: OrderMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      // Clear any previous errors
      setMapError(null);
      
      const loader = new Loader({
        apiKey: "AIzaSyD--I0r1HmH90XbB_l-KzBEx-Y3I1uGtOE",
        version: "weekly",
      });

      try {
        const google = await loader.load();
        const map = new google.maps.Map(mapRef.current!, {
          zoom: 12,
          center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          ],
          disableDefaultUI: true,
        });

        // Create geocoder to convert addresses to coordinates
        const geocoder = new google.maps.Geocoder();
        
        // Always use city and state for better geocoding results
        const enhancedPickupAddress = pickupAddress.includes(", San Francisco") 
          ? pickupAddress 
          : `${pickupAddress}, San Francisco, CA, USA`;
        
        const enhancedDeliveryAddress = deliveryAddress.includes(", San Francisco") 
          ? deliveryAddress 
          : `${deliveryAddress}, San Francisco, CA, USA`;

        console.log("Geocoding pickup:", enhancedPickupAddress);
        
        // Get pickup location
        geocoder.geocode({ address: enhancedPickupAddress }, (pickupResults, pickupStatus) => {
          if (pickupStatus !== "OK" || !pickupResults?.[0]) {
            console.error("Pickup geocode failed:", pickupStatus, enhancedPickupAddress);
            setMapError(`Could not find pickup location: ${enhancedPickupAddress}`);
            return;
          }

          const pickupLocation = pickupResults[0].geometry.location;
          console.log("Pickup location found:", pickupLocation.toString());
          
          // Create pickup marker
          new google.maps.Marker({
            position: pickupLocation,
            map,
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
          
          // Get delivery location
          geocoder.geocode({ address: enhancedDeliveryAddress }, (deliveryResults, deliveryStatus) => {
            if (deliveryStatus !== "OK" || !deliveryResults?.[0]) {
              console.error("Delivery geocode failed:", deliveryStatus, enhancedDeliveryAddress);
              setMapError(`Could not find delivery location: ${enhancedDeliveryAddress}`);
              return;
            }

            const deliveryLocation = deliveryResults[0].geometry.location;
            console.log("Delivery location found:", deliveryLocation.toString());
            
            // Create delivery marker
            new google.maps.Marker({
              position: deliveryLocation,
              map,
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

            // Try to fit both markers in the view
            const bounds = new google.maps.LatLngBounds();
            bounds.extend(pickupLocation);
            bounds.extend(deliveryLocation);
            map.fitBounds(bounds);
            
            // Add some padding to the bounds
            map.setZoom(map.getZoom() - 0.5);

            // Calculate a point between pickup and delivery for the driver
            const driverLocation = new google.maps.LatLng(
              (pickupLocation.lat() + deliveryLocation.lat()) / 2,
              (pickupLocation.lng() + deliveryLocation.lng()) / 2
            );

            // Create driver marker
            new google.maps.Marker({
              position: driverLocation,
              map,
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

            // Draw a simple polyline between pickup and delivery
            new google.maps.Polyline({
              path: [pickupLocation, deliveryLocation],
              geodesic: true,
              strokeColor: "#FFFFFF",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              map,
            });
          });
        });
      } catch (error: any) {
        console.error("Error loading Google Maps:", error);
        setMapError(`Map error: ${error?.message || "Unknown error"}`);
      }
    };

    if (mapRef.current) {
      initMap();
    }
  }, [pickupAddress, deliveryAddress, driverName]);

  return (
    <div className="relative w-full h-[200px] rounded-md overflow-hidden shadow-sm">
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
  );
};
