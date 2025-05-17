
import { Loader } from '@googlemaps/js-api-loader';

// Create a singleton loader instance with all required libraries
export const googleMapsLoader = new Loader({
  apiKey: "AIzaSyD--I0r1HmH90XbB_l-KzBEx-Y3I1uGtOE",
  version: "weekly",
  libraries: ["places", "geometry"],
});

// Function to get the loader promise - ensures we only load the API once
export const getGoogleMapsApi = (() => {
  let googleMapsPromise: Promise<typeof google> | null = null;
  
  return () => {
    if (!googleMapsPromise) {
      googleMapsPromise = googleMapsLoader.load();
    }
    return googleMapsPromise;
  };
})();
