
export interface OrderData {
  id: string;
  status: 'active' | 'completed' | 'cancelled';
  pickupAddress: string;
  deliveryAddress: string;
  driverName: string;
  clientName: string;
  eta: string;
  createdAt: string;
  pickupTime: string;
  dropoffTime: string;
}

export interface RepeatedOrderData extends OrderData {
  schedule: Array<{
    day: string;
    time: string;
  }>;
}

export interface OrderDetailsProps {
  orderData: OrderData;
  showDriverInfo?: boolean;
  user?: {
    id: string;
    name: string;
    role: string;
    status: string;
    priority: string;
    orderId?: string;
  };
}
