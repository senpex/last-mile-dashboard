
export interface Location {
  name: string;
  address: string;
}

export type DeliveryStatus = 
  | "Dropoff Complete" 
  | "Canceled By Customer" 
  | "Cancelled By Admin" 
  | "In Transit" 
  | "Picking Up" 
  | "Arrived For Pickup"
  | "Scheduled Order"
  | "Online"
  | "Offline"
  | "Busy";

export interface Delivery {
  id: number;
  packageId: string;
  orderName: string;
  status: string;
  pickupTime: string;
  pickupLocation: Location;
  dropoffTime: string;
  dropoffLocation: Location;
  customerName: string;
  price: string;
  tip: string;
  courier: string;
  organization: string;
  distance: string;
  couriersEarnings?: string;
  notes?: string;
}
