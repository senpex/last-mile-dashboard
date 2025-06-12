
export interface Driver {
  id: number;
  name: string;
  rating: number;
  status: string;
  location: string;
  distance: string;
  eta: string;
  phone: string;
  avatar?: string;
  transportType: string;
  totalDeliveries: number;
  email: string;
  zipcode: string;
  address: string;
  transports: string[];
  hireStatus: string;
  stripeStatus: 'verified' | 'unverified' | 'pending';
  profileTypes: string[];
  notes: string;
}

export const mockDrivers: Driver[] = [
  {
    id: 1,
    name: "John Smith",
    rating: 4.8,
    status: "Available",
    location: "Downtown SF",
    distance: "2.1 miles",
    eta: "8 min",
    phone: "+1 (555) 123-4567",
    transportType: "car,helper",
    totalDeliveries: 1234
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    rating: 4.9,
    status: "Available",
    location: "Mission District",
    distance: "3.5 miles",
    eta: "12 min",
    phone: "+1 (555) 987-6543",
    transportType: "suv",
    totalDeliveries: 856
  },
  {
    id: 3,
    name: "David Chen",
    rating: 4.7,
    status: "Busy",
    location: "SOMA",
    distance: "1.8 miles",
    eta: "15 min",
    phone: "+1 (555) 456-7890",
    transportType: "pickup_truck,9ft_cargo_van",
    totalDeliveries: 2103
  },
  {
    id: 4,
    name: "Sarah Johnson",
    rating: 4.6,
    status: "Available",
    location: "Financial District",
    distance: "4.2 miles",
    eta: "18 min",
    phone: "+1 (555) 321-0987",
    transportType: "10ft_box_truck",
    totalDeliveries: 678
  },
  {
    id: 5,
    name: "Michael Brown",
    rating: 4.5,
    status: "Available",
    location: "Castro",
    distance: "2.8 miles",
    eta: "10 min",
    phone: "+1 (555) 234-5678",
    transportType: "car",
    totalDeliveries: 945
  },
  {
    id: 6,
    name: "Emily Davis",
    rating: 4.7,
    status: "On Break",
    location: "Richmond",
    distance: "6.1 miles",
    eta: "25 min",
    phone: "+1 (555) 345-6789",
    transportType: "suv,helper",
    totalDeliveries: 723
  },
  {
    id: 7,
    name: "James Wilson",
    rating: 4.8,
    status: "Available",
    location: "Haight",
    distance: "3.2 miles",
    eta: "14 min",
    phone: "+1 (555) 456-7891",
    transportType: "pickup_truck",
    totalDeliveries: 1567
  },
  {
    id: 8,
    name: "Ashley Martinez",
    rating: 4.6,
    status: "Busy",
    location: "Sunset",
    distance: "5.4 miles",
    eta: "22 min",
    phone: "+1 (555) 567-8912",
    transportType: "9ft_cargo_van",
    totalDeliveries: 834
  },
  {
    id: 9,
    name: "Daniel Garcia",
    rating: 4.9,
    status: "Available",
    location: "North Beach",
    distance: "1.9 miles",
    eta: "9 min",
    phone: "+1 (555) 678-9123",
    transportType: "car,helper",
    totalDeliveries: 1289
  },
  {
    id: 10,
    name: "Jessica Thompson",
    rating: 4.4,
    status: "Available",
    location: "Chinatown",
    distance: "2.3 miles",
    eta: "11 min",
    phone: "+1 (555) 789-1234",
    transportType: "suv",
    totalDeliveries: 612
  },
  {
    id: 11,
    name: "Christopher Lee",
    rating: 4.7,
    status: "Offline",
    location: "Nob Hill",
    distance: "1.5 miles",
    eta: "7 min",
    phone: "+1 (555) 891-2345",
    transportType: "car",
    totalDeliveries: 1045
  },
  {
    id: 12,
    name: "Amanda White",
    rating: 4.8,
    status: "Available",
    location: "Potrero Hill",
    distance: "4.7 miles",
    eta: "19 min",
    phone: "+1 (555) 912-3456",
    transportType: "pickup_truck,helper",
    totalDeliveries: 987
  },
  {
    id: 13,
    name: "Ryan Taylor",
    rating: 4.5,
    status: "Available",
    location: "Dogpatch",
    distance: "3.8 miles",
    eta: "16 min",
    phone: "+1 (555) 123-4568",
    transportType: "10ft_box_truck",
    totalDeliveries: 756
  },
  {
    id: 14,
    name: "Nicole Anderson",
    rating: 4.9,
    status: "Busy",
    location: "Bernal Heights",
    distance: "5.2 miles",
    eta: "21 min",
    phone: "+1 (555) 234-5679",
    transportType: "9ft_cargo_van,helper",
    totalDeliveries: 1398
  },
  {
    id: 15,
    name: "Kevin Miller",
    rating: 4.6,
    status: "Available",
    location: "Glen Park",
    distance: "4.9 miles",
    eta: "20 min",
    phone: "+1 (555) 345-6781",
    transportType: "suv",
    totalDeliveries: 823
  },
  {
    id: 16,
    name: "Stephanie Jackson",
    rating: 4.7,
    status: "Available",
    location: "Inner Richmond",
    distance: "5.8 miles",
    eta: "24 min",
    phone: "+1 (555) 456-7892",
    transportType: "car,helper",
    totalDeliveries: 1167
  },
  {
    id: 17,
    name: "Brandon Harris",
    rating: 4.4,
    status: "On Break",
    location: "Outer Sunset",
    distance: "7.3 miles",
    eta: "28 min",
    phone: "+1 (555) 567-8923",
    transportType: "pickup_truck",
    totalDeliveries: 645
  },
  {
    id: 18,
    name: "Rachel Clark",
    rating: 4.8,
    status: "Available",
    location: "Marina",
    distance: "2.6 miles",
    eta: "12 min",
    phone: "+1 (555) 678-9134",
    transportType: "car",
    totalDeliveries: 1234
  },
  {
    id: 19,
    name: "Tyler Lewis",
    rating: 4.5,
    status: "Available",
    location: "Hayes Valley",
    distance: "2.1 miles",
    eta: "10 min",
    phone: "+1 (555) 789-1245",
    transportType: "suv,helper",
    totalDeliveries: 789
  },
  {
    id: 20,
    name: "Megan Walker",
    rating: 4.9,
    status: "Busy",
    location: "Lower Haight",
    distance: "3.4 miles",
    eta: "15 min",
    phone: "+1 (555) 891-2356",
    transportType: "9ft_cargo_van",
    totalDeliveries: 1456
  },
  {
    id: 21,
    name: "Justin Hall",
    rating: 4.6,
    status: "Available",
    location: "Mission Bay",
    distance: "3.1 miles",
    eta: "13 min",
    phone: "+1 (555) 912-3467",
    transportType: "pickup_truck,helper",
    totalDeliveries: 912
  },
  {
    id: 22,
    name: "Brittany Young",
    rating: 4.7,
    status: "Available",
    location: "SOMA",
    distance: "1.7 miles",
    eta: "8 min",
    phone: "+1 (555) 123-4569",
    transportType: "car",
    totalDeliveries: 1089
  },
  {
    id: 23,
    name: "Jordan King",
    rating: 4.4,
    status: "Offline",
    location: "Tenderloin",
    distance: "2.4 miles",
    eta: "11 min",
    phone: "+1 (555) 234-5671",
    transportType: "suv",
    totalDeliveries: 567
  },
  {
    id: 24,
    name: "Samantha Wright",
    rating: 4.8,
    status: "Available",
    location: "Russian Hill",
    distance: "1.8 miles",
    eta: "9 min",
    phone: "+1 (555) 345-6782",
    transportType: "car,helper",
    totalDeliveries: 1278
  },
  {
    id: 25,
    name: "Austin Lopez",
    rating: 4.5,
    status: "Available",
    location: "Pacific Heights",
    distance: "2.7 miles",
    eta: "12 min",
    phone: "+1 (555) 456-7893",
    transportType: "10ft_box_truck",
    totalDeliveries: 834
  },
  {
    id: 26,
    name: "Kayla Hill",
    rating: 4.9,
    status: "Busy",
    location: "Fillmore",
    distance: "4.3 miles",
    eta: "18 min",
    phone: "+1 (555) 567-8924",
    transportType: "pickup_truck",
    totalDeliveries: 1567
  },
  {
    id: 27,
    name: "Derek Scott",
    rating: 4.6,
    status: "Available",
    location: "Presidio",
    distance: "5.1 miles",
    eta: "22 min",
    phone: "+1 (555) 678-9135",
    transportType: "9ft_cargo_van,helper",
    totalDeliveries: 923
  },
  {
    id: 28,
    name: "Alexis Green",
    rating: 4.7,
    status: "On Break",
    location: "Japantown",
    distance: "3.6 miles",
    eta: "16 min",
    phone: "+1 (555) 789-1246",
    transportType: "suv",
    totalDeliveries: 1145
  },
  {
    id: 29,
    name: "Marcus Adams",
    rating: 4.4,
    status: "Available",
    location: "Western Addition",
    distance: "4.1 miles",
    eta: "17 min",
    phone: "+1 (555) 891-2357",
    transportType: "car",
    totalDeliveries: 678
  },
  {
    id: 30,
    name: "Victoria Baker",
    rating: 4.8,
    status: "Available",
    location: "Cow Hollow",
    distance: "2.9 miles",
    eta: "13 min",
    phone: "+1 (555) 912-3468",
    transportType: "pickup_truck,helper",
    totalDeliveries: 1234
  },
  {
    id: 31,
    name: "Cameron Gonzalez",
    rating: 4.5,
    status: "Available",
    location: "Telegraph Hill",
    distance: "1.6 miles",
    eta: "7 min",
    phone: "+1 (555) 123-4571",
    transportType: "car,helper",
    totalDeliveries: 789
  },
  {
    id: 32,
    name: "Jasmine Nelson",
    rating: 4.9,
    status: "Busy",
    location: "South Beach",
    distance: "2.8 miles",
    eta: "12 min",
    phone: "+1 (555) 234-5672",
    transportType: "suv",
    totalDeliveries: 1456
  },
  {
    id: 33,
    name: "Trevor Carter",
    rating: 4.6,
    status: "Available",
    location: "Excelsior",
    distance: "6.7 miles",
    eta: "26 min",
    phone: "+1 (555) 345-6783",
    transportType: "10ft_box_truck",
    totalDeliveries: 912
  },
  {
    id: 34,
    name: "Gabrielle Mitchell",
    rating: 4.7,
    status: "Available",
    location: "Visitacion Valley",
    distance: "7.9 miles",
    eta: "30 min",
    phone: "+1 (555) 456-7894",
    transportType: "9ft_cargo_van",
    totalDeliveries: 1089
  },
  {
    id: 35,
    name: "Logan Perez",
    rating: 4.4,
    status: "Offline",
    location: "Bayview",
    distance: "8.2 miles",
    eta: "32 min",
    phone: "+1 (555) 567-8925",
    transportType: "pickup_truck",
    totalDeliveries: 567
  },
  {
    id: 36,
    name: "Destiny Roberts",
    rating: 4.8,
    status: "Available",
    location: "Hunters Point",
    distance: "7.5 miles",
    eta: "29 min",
    phone: "+1 (555) 678-9136",
    transportType: "car",
    totalDeliveries: 1278
  },
  {
    id: 37,
    name: "Ethan Turner",
    rating: 4.5,
    status: "Available",
    location: "Portola",
    distance: "5.9 miles",
    eta: "24 min",
    phone: "+1 (555) 789-1247",
    transportType: "suv,helper",
    totalDeliveries: 834
  },
  {
    id: 38,
    name: "Tiffany Phillips",
    rating: 4.9,
    status: "Busy",
    location: "Diamond Heights",
    distance: "4.8 miles",
    eta: "20 min",
    phone: "+1 (555) 891-2358",
    transportType: "car,helper",
    totalDeliveries: 1567
  },
  {
    id: 39,
    name: "Sean Campbell",
    rating: 4.6,
    status: "Available",
    location: "Twin Peaks",
    distance: "4.4 miles",
    eta: "19 min",
    phone: "+1 (555) 912-3469",
    transportType: "pickup_truck",
    totalDeliveries: 923
  },
  {
    id: 40,
    name: "Crystal Parker",
    rating: 4.7,
    status: "On Break",
    location: "Forest Hill",
    distance: "5.3 miles",
    eta: "23 min",
    phone: "+1 (555) 123-4572",
    transportType: "9ft_cargo_van,helper",
    totalDeliveries: 1145
  },
  {
    id: 41,
    name: "Corey Evans",
    rating: 4.4,
    status: "Available",
    location: "West Portal",
    distance: "6.1 miles",
    eta: "25 min",
    phone: "+1 (555) 234-5673",
    transportType: "10ft_box_truck",
    totalDeliveries: 678
  },
  {
    id: 42,
    name: "Vanessa Edwards",
    rating: 4.8,
    status: "Available",
    location: "Ingleside",
    distance: "6.8 miles",
    eta: "27 min",
    phone: "+1 (555) 345-6784",
    transportType: "suv",
    totalDeliveries: 1234
  },
  {
    id: 43,
    name: "Isaac Collins",
    rating: 4.5,
    status: "Available",
    location: "Oceanview",
    distance: "8.4 miles",
    eta: "33 min",
    phone: "+1 (555) 456-7895",
    transportType: "car",
    totalDeliveries: 789
  },
  {
    id: 44,
    name: "Sierra Stewart",
    rating: 4.9,
    status: "Busy",
    location: "Merced Heights",
    distance: "7.1 miles",
    eta: "28 min",
    phone: "+1 (555) 567-8926",
    transportType: "pickup_truck,helper",
    totalDeliveries: 1456
  },
  {
    id: 45,
    name: "Blake Sanchez",
    rating: 4.6,
    status: "Available",
    location: "Stonestown",
    distance: "6.9 miles",
    eta: "27 min",
    phone: "+1 (555) 678-9137",
    transportType: "9ft_cargo_van",
    totalDeliveries: 912
  },
  {
    id: 46,
    name: "Alicia Morris",
    rating: 4.7,
    status: "Available",
    location: "Lakeshore",
    distance: "7.8 miles",
    eta: "31 min",
    phone: "+1 (555) 789-1248",
    transportType: "car,helper",
    totalDeliveries: 1089
  },
  {
    id: 47,
    name: "Caleb Rogers",
    rating: 4.4,
    status: "Offline",
    location: "Parkside",
    distance: "8.1 miles",
    eta: "32 min",
    phone: "+1 (555) 891-2359",
    transportType: "suv",
    totalDeliveries: 567
  },
  {
    id: 48,
    name: "Jenna Reed",
    rating: 4.8,
    status: "Available",
    location: "Outer Richmond",
    distance: "7.2 miles",
    eta: "29 min",
    phone: "+1 (555) 912-3471",
    transportType: "10ft_box_truck",
    totalDeliveries: 1278
  },
  {
    id: 49,
    name: "Malik Cook",
    rating: 4.5,
    status: "Available",
    location: "Seacliff",
    distance: "5.7 miles",
    eta: "24 min",
    phone: "+1 (555) 123-4573",
    transportType: "pickup_truck",
    totalDeliveries: 834
  },
  {
    id: 50,
    name: "Maya Bailey",
    rating: 4.9,
    status: "Busy",
    location: "Lincoln Park",
    distance: "6.3 miles",
    eta: "26 min",
    phone: "+1 (555) 234-5674",
    transportType: "car",
    totalDeliveries: 1567
  },
  {
    id: 51,
    name: "Devin Rivera",
    rating: 4.6,
    status: "Available",
    location: "Richmond District",
    distance: "6.5 miles",
    eta: "26 min",
    phone: "+1 (555) 345-6785",
    transportType: "suv,helper",
    totalDeliveries: 923
  },
  {
    id: 52,
    name: "Paige Cooper",
    rating: 4.7,
    status: "On Break",
    location: "Golden Gate Park",
    distance: "5.4 miles",
    eta: "23 min",
    phone: "+1 (555) 456-7896",
    transportType: "9ft_cargo_van",
    totalDeliveries: 1145
  },
  {
    id: 53,
    name: "Jared Richardson",
    rating: 4.4,
    status: "Available",
    location: "Panhandle",
    distance: "3.7 miles",
    eta: "16 min",
    phone: "+1 (555) 567-8927",
    transportType: "car,helper",
    totalDeliveries: 678
  },
  {
    id: 54,
    name: "Chloe Cox",
    rating: 4.8,
    status: "Available",
    location: "Cole Valley",
    distance: "3.9 miles",
    eta: "17 min",
    phone: "+1 (555) 678-9138",
    transportType: "pickup_truck,helper",
    totalDeliveries: 1234
  }
];

export const driversData = mockDrivers.map(driver => ({
  ...driver,
  email: `${driver.name.toLowerCase().replace(' ', '.')}@example.com`,
  zipcode: '94102',
  address: `${Math.floor(Math.random() * 9999) + 1} ${driver.location} St, San Francisco, CA`,
  transports: driver.transportType.split(','),
  hireStatus: Math.random() > 0.7 ? 'hired' : 'available',
  stripeStatus: ['verified', 'unverified', 'pending'][Math.floor(Math.random() * 3)] as 'verified' | 'unverified' | 'pending',
  profileTypes: ['Standard', 'Premium', 'Enterprise'].slice(0, Math.floor(Math.random() * 3) + 1),
  notes: Math.random() > 0.5 ? `Notes for ${driver.name}` : ''
}));
