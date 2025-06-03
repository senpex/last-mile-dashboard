
export interface Location {
  name: string;
  address: string;
  description?: string;
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
  | "Busy"
  | "Not approved"
  | "Available"
  | "On Break";

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
  recipient?: any;
  price: string;
  tip: string;
  courier: string;
  organization: string;
  distance: string;
  couriersEarnings?: string;
  notes?: string;
}
