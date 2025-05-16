
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface GooglePlacesAutocompleteProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onPlaceSelected?: (place: google.maps.places.PlaceResult) => void;
  className?: string;
  defaultValue?: string;
}

export function GooglePlacesAutocomplete({
  onPlaceSelected,
  className,
  defaultValue = "",
  ...props
}: GooglePlacesAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [value, setValue] = useState(defaultValue);

  // Load the Google Maps API
  useEffect(() => {
    const loader = new Loader({
      apiKey: "", // Will use the API key from window
      version: "weekly",
      libraries: ["places"]
    });

    loader.load().then(() => {
      setIsLoaded(true);
    }).catch(e => {
      console.error("Error loading Google Maps API", e);
    });
  }, []);

  // Initialize the Autocomplete once the API is loaded and the input is rendered
  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      fields: ["address_components", "formatted_address", "geometry", "name"],
      types: ["address"]
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      onPlaceSelected?.(place);
    });

    return () => {
      // Clean up listener when component unmounts
      window.google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [isLoaded, onPlaceSelected]);

  return (
    <Input
      ref={inputRef}
      type="text"
      className={cn("h-9 text-sm", className)}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
}
