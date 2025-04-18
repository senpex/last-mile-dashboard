
import { useRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface OrderMapProps {
  pickupAddress: string;
  deliveryAddress: string;
  driverName: string;
}

export const OrderMap = ({ pickupAddress, deliveryAddress, driverName }: OrderMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: "AIzaSyD--I0r1HmH90XbB_l-KzBEx-Y3I1uGtOE",
        version: "weekly",
      });

      try {
        const google = await loader.load();
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();

        if (!mapRef.current) return;

        const map = new google.maps.Map(mapRef.current, {
          zoom: 12,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          ],
          disableDefaultUI: true,
        });

        directionsRenderer.setMap(map);

        // Calculate and display route
        const request = {
          origin: pickupAddress,
          destination: deliveryAddress,
          travelMode: google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result, status) => {
          if (status === "OK" && result) {
            directionsRenderer.setDirections(result);
            
            // Add driver marker at a point along the route (simulated)
            const route = result.routes[0].overview_path;
            const middlePoint = route[Math.floor(route.length / 2)];
            
            new google.maps.Marker({
              position: middlePoint,
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
          }
        });
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, [pickupAddress, deliveryAddress, driverName]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[200px] rounded-md overflow-hidden shadow-sm"
    />
  );
};
