
export interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  hireStatus: string;
  transports: string[];
  rating: number;
  stripeStatus: 'verified' | 'unverified' | 'pending';
  zipcode: string;
  address: string;
  notes: string;
  profileTypes: string[];
}
