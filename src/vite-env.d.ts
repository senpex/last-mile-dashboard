
/// <reference types="vite/client" />
/// <reference types="@googlemaps/js-api-loader" />

// Additional Google Maps type declarations
declare global {
  interface Window {
    google: typeof google;
  }
}

