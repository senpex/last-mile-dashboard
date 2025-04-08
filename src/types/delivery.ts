
export interface Location {
  name: string;
  address: string;
}

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
  fees?: string;
  courier: string;
  organization: string;
  distance: string;
  couriersEarnings?: string;
}

export type DeliveryStatus = 
  | "Dropoff Complete"
  | "Canceled By Customer" 
  | "In Transit"
  | "Arrived For Pickup"
  | "Picking Up"
  | "Recipient Unavailable"
  | "Draft Order"
  | "Paid Order"
  | "Courier Selected"
  | "Item Not Given"
  | "Reported Order"
  | "Waiting For Pay"
  | "Cancelled By Admin"
  | "Scheduled Order"
  | "Repeated Order"
  | "Forgot"
  | "Started Working"
  | "Accepted Repeated Order";
