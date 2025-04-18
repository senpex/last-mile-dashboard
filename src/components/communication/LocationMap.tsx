
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
  lat: number;
  lng: number;
}

interface LocationMapProps {
  driverLocation: Location;
  pickupLocation: Location;
  dropoffLocation: Location;
}

export const LocationMap = ({ driverLocation, pickupLocation, dropoffLocation }: LocationMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'pk.YOUR_MAPBOX_TOKEN'; // Replace with your Mapbox token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [driverLocation.lng, driverLocation.lat],
      zoom: 12,
    });

    // Add markers
    new mapboxgl.Marker({ color: '#0000FF' })
      .setLngLat([driverLocation.lng, driverLocation.lat])
      .addTo(map.current);

    new mapboxgl.Marker({ color: '#00FF00' })
      .setLngLat([pickupLocation.lng, pickupLocation.lat])
      .addTo(map.current);

    new mapboxgl.Marker({ color: '#FF0000' })
      .setLngLat([dropoffLocation.lng, dropoffLocation.lat])
      .addTo(map.current);

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [driverLocation, pickupLocation, dropoffLocation]);

  return (
    <div className="w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};
