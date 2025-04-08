
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
}
