export interface Location {
  name: string;
  address: string;
}

export type DeliveryStatus = 
  | "Online"
  | "Busy"
  | "Offline"
  | "Not Approved";

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
