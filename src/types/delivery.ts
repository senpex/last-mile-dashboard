
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
  | "Not Approved";

export interface DeliveryLocation {
  name: string;
  address: string;
}

export interface Delivery {
  id: number;
  packageId: string;
  orderName: string;
  status: string;
  pickupTime: string;
  pickupLocation: DeliveryLocation;
  dropoffTime: string;
  dropoffLocation: DeliveryLocation;
  customerName: string;
  price: string;
  tip: string;
  courier: string;
  organization: string;
  distance: string;
  couriersEarnings?: string;
  notes?: string;
}
