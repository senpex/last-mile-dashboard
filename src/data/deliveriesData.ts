import { Delivery } from "@/types/delivery";

export const deliveriesData: Delivery[] = [
  {
    id: 1,
    packageId: "WMT-10042501",
    orderName: "Grocery Delivery",
    status: "Dropoff Complete",
    pickupTime: "03/24/2025 12:49 PM",
    pickupLocation: {
      name: "Walmart 0100 - Bentonville, AR",
      address: "406 S WALTON BLVD, BENTONVILLE, AR 72712, US"
    },
    dropoffTime: "03/24/2025 08:00 PM",
    dropoffLocation: {
      name: "Saranya Natarajan",
      address: "1600 Emmerson St, Centerton, AR 72719, US"
    },
    customerName: "Saranya Natarajan",
    price: "$33.00",
    tip: "$0.00",
    fees: "",
    courier: "GARY BURTON",
    organization: "Walmart US Stores",
    distance: "6.9 mi",
    couriersEarnings: "$28.50"
  },
  {
    id: 2,
    packageId: "WMT-10042502",
    orderName: "Weekly Essentials",
    status: "Dropoff Complete",
    pickupTime: "03/24/2025 11:34 AM",
    pickupLocation: {
      name: "Walmart 0100 - Bentonville, AR",
      address: "406 S WALTON BLVD, BENTONVILLE, AR 72712, US"
    },
    dropoffTime: "03/24/2025 08:00 PM",
    dropoffLocation: {
      name: "Roma Solis",
      address: "1051 Little Osage Ave, Bentonville, AR 72713, US"
    },
    customerName: "Roma Solis",
    price: "$33.00",
    tip: "$0.00",
    fees: "",
    courier: "GARY BURTON",
    organization: "Walmart US Stores",
    distance: "4.1 mi",
    couriersEarnings: "$27.00"
  },
  {
    id: 3,
    packageId: "WMT-10042503",
    orderName: "Pantry Restock",
    status: "Dropoff Complete",
    pickupTime: "03/24/2025 11:34 AM",
    pickupLocation: {
      name: "Walmart 0100 - Bentonville, AR",
      address: "406 S WALTON BLVD, BENTONVILLE, AR 72712, US"
    },
    dropoffTime: "03/24/2025 08:00 PM",
    dropoffLocation: {
      name: "Juan Galarraga",
      address: "3511 SW Awakening Ave, Bentonville, AR 72713, US"
    },
    customerName: "Juan Galarraga",
    price: "$25.00",
    tip: "$0.00",
    fees: "",
    courier: "Michael Groves",
    organization: "Walmart US Stores",
    distance: "6.1 mi",
    couriersEarnings: "$22.50"
  },
  {
    id: 4,
    packageId: "WMT-10042504",
    orderName: "Home Essentials",
    status: "Dropoff Complete",
    pickupTime: "03/24/2025 11:34 AM",
    pickupLocation: {
      name: "Walmart 0100 - Bentonville, AR",
      address: "406 S WALTON BLVD, BENTONVILLE, AR 72712, US"
    },
    dropoffTime: "03/24/2025 08:00 PM",
    dropoffLocation: {
      name: "Wendy Lancaster",
      address: "6305 SW Brush Blvd, Bentonville, AR 72713, US"
    },
    customerName: "Wendy Lancaster",
    price: "$33.00",
    tip: "$0.00",
    fees: "",
    courier: "Laura Ramirez",
    organization: "Walmart US Stores",
    distance: "7.4 mi",
    couriersEarnings: "$29.00"
  },
  {
    id: 5,
    packageId: "CUN-21980357",
    orderName: "Lunch Order",
    status: "Canceled By Customer",
    pickupTime: "03/24/2025 11:20 AM",
    pickupLocation: {
      name: "Curry Up Now - Palo Alto",
      address: "321 Hamilton Ave, Palo Alto, CA 94301, US"
    },
    dropoffTime: "03/24/2025 11:40 AM",
    dropoffLocation: {
      name: "Duane Morris LLP",
      address: "260 Homer Ave Ste 202, Palo Alto, CA 94301, USA"
    },
    customerName: "Duane Morris LLP",
    price: "$0.00",
    tip: "$5.00",
    fees: "",
    courier: "",
    organization: "Curry Up Now",
    distance: "0.2 mi",
    couriersEarnings: "$0.00"
  },
  {
    id: 6,
    packageId: "TGT-80031245",
    orderName: "Household Items",
    status: "In Transit",
    pickupTime: "03/24/2025 10:15 AM",
    pickupLocation: {
      name: "Target Store #5372 - Rogers, AR",
      address: "2404 W Pleasant Crossing Dr, Rogers, AR 72758, US"
    },
    dropoffTime: "03/24/2025 12:30 PM",
    dropoffLocation: {
      name: "Melissa Parker",
      address: "211 SE Kenwood St, Bentonville, AR 72712, US"
    },
    customerName: "Melissa Parker",
    price: "$42.50",
    tip: "$7.00",
    fees: "$3.99",
    courier: "James Wilson",
    organization: "Target Corporation",
    distance: "5.2 mi",
    couriersEarnings: "$32.50"
  },
  {
    id: 30,
    packageId: "PSY-52978143",
    orderName: "Party Supplies",
    status: "Scheduled Order",
    pickupTime: "03/25/2025 10:00 AM",
    pickupLocation: {
      name: "Party City - Rogers",
      address: "4409 W Walnut St, Rogers, AR 72756, US"
    },
    dropoffTime: "03/25/2025 11:30 AM",
    dropoffLocation: {
      name: "Community Center - Bentonville",
      address: "1101 SW Citizens Cir, Bentonville, AR 72712, US"
    },
    customerName: "Bentonville Community Center",
    price: "$115.95",
    tip: "$20.00",
    fees: "$7.99",
    courier: "",
    organization: "Party City",
    distance: "6.7 mi",
    couriersEarnings: "$0.00"
  },
  {
    id: 8,
    packageId: "WMT-10042510",
    orderName: "Weekly Grocery",
    status: "Dropoff Complete",
    pickupTime: "03/24/2025 09:15 AM",
    pickupLocation: {
      name: "Walmart 0100 - Bentonville, AR",
      address: "406 S WALTON BLVD, BENTONVILLE, AR 72712, US"
    },
    dropoffTime: "03/24/2025 10:30 AM",
    dropoffLocation: {
      name: "Thomas Reynolds",
      address: "405 SW F St, Bentonville, AR 72712, US"
    },
    customerName: "Thomas Reynolds",
    price: "$28.50",
    tip: "$5.00",
    fees: "$2.99",
    courier: "John Smith",
    organization: "Walmart US Stores",
    distance: "3.2 mi",
    couriersEarnings: "$25.50"
  },
  {
    id: 9,
    packageId: "WMT-10042511",
    orderName: "Electronics Delivery",
    status: "In Transit",
    pickupTime: "03/24/2025 10:00 AM",
    pickupLocation: {
      name: "Best Buy - Rogers, AR",
      address: "2001 Promenade Blvd, Rogers, AR 72758, US"
    },
    dropoffTime: "03/24/2025 11:15 AM",
    dropoffLocation: {
      name: "Emma Patel",
      address: "1204 Tiger Blvd, Bentonville, AR 72712, US"
    },
    customerName: "Emma Patel",
    price: "$42.50",
    tip: "$8.00",
    fees: "$3.50",
    courier: "John Smith",
    organization: "Best Buy",
    distance: "5.8 mi",
    couriersEarnings: "$38.00"
  },
  {
    id: 10,
    packageId: "WMT-10042512",
    orderName: "Office Supplies",
    status: "Dropoff Complete",
    pickupTime: "03/24/2025 11:20 AM",
    pickupLocation: {
      name: "Office Depot - Rogers, AR",
      address: "4408 W Walnut St, Rogers, AR 72756, US"
    },
    dropoffTime: "03/24/2025 12:30 PM",
    dropoffLocation: {
      name: "Central Office Building",
      address: "702 SE 5th St, Bentonville, AR 72712, US"
    },
    customerName: "Central Office Building",
    price: "$35.00",
    tip: "$6.50",
    fees: "$2.99",
    courier: "John Smith",
    organization: "Office Depot",
    distance: "6.4 mi",
    couriersEarnings: "$32.00"
  },
  {
    id: 11,
    packageId: "WMT-10042513",
    orderName: "Hardware Delivery",
    status: "Dropoff Complete",
    pickupTime: "03/24/2025 12:15 PM",
    pickupLocation: {
      name: "Home Depot - Bentonville, AR",
      address: "1900 SE Walton Blvd, Bentonville, AR 72712, US"
    },
    dropoffTime: "03/24/2025 01:30 PM",
    dropoffLocation: {
      name: "Robert Johnson",
      address: "801 NE 7th St, Bentonville, AR 72712, US"
    },
    customerName: "Robert Johnson",
    price: "$45.00",
    tip: "$10.00",
    fees: "$3.99",
    courier: "John Smith",
    organization: "Home Depot",
    distance: "4.2 mi",
    couriersEarnings: "$42.50"
  },
  {
    id: 12,
    packageId: "WMT-10042514",
    orderName: "Pharmaceutical Delivery",
    status: "Dropoff Complete",
    pickupTime: "03/24/2025 01:45 PM",
    pickupLocation: {
      name: "Walgreens - Bentonville, AR",
      address: "2000 S Walton Blvd, Bentonville, AR 72712, US"
    },
    dropoffTime: "03/24/2025 02:30 PM",
    dropoffLocation: {
      name: "Sarah Williams",
      address: "305 NW 3rd St, Bentonville, AR 72712, US"
    },
    customerName: "Sarah Williams",
    price: "$22.50",
    tip: "$4.50",
    fees: "$1.99",
    courier: "John Smith",
    organization: "Walgreens",
    distance: "2.8 mi",
    couriersEarnings: "$21.00"
  },
  {
    id: 13,
    packageId: "WMT-10042515",
    orderName: "Book Delivery",
    status: "In Transit",
    pickupTime: "03/24/2025 03:00 PM",
    pickupLocation: {
      name: "Barnes & Noble - Rogers, AR",
      address: "2795 W Martin Luther King Blvd, Fayetteville, AR 72704, US"
    },
    dropoffTime: "03/24/2025 04:15 PM",
    dropoffLocation: {
      name: "Bentonville Public Library",
      address: "405 S Main St, Bentonville, AR 72712, US"
    },
    customerName: "Bentonville Public Library",
    price: "$32.00",
    tip: "$6.00",
    fees: "$2.50",
    courier: "John Smith",
    organization: "Barnes & Noble",
    distance: "7.5 mi",
    couriersEarnings: "$29.50"
  },
  {
    id: 14,
    packageId: "WMT-10042516",
    orderName: "Pet Supplies",
    status: "Picking Up",
    pickupTime: "03/24/2025 04:30 PM",
    pickupLocation: {
      name: "PetSmart - Rogers, AR",
      address: "4200 W Green Acres Rd, Rogers, AR 72758, US"
    },
    dropoffTime: "03/24/2025 05:45 PM",
    dropoffLocation: {
      name: "Michael Thompson",
      address: "905 SE C St, Bentonville, AR 72712, US"
    },
    customerName: "Michael Thompson",
    price: "$38.50",
    tip: "$7.50",
    fees: "$3.00",
    courier: "John Smith",
    organization: "PetSmart",
    distance: "6.1 mi",
    couriersEarnings: "$35.00"
  },
  {
    id: 15,
    packageId: "WMT-10042517",
    orderName: "Clothing Delivery",
    status: "Arrived For Pickup",
    pickupTime: "03/25/2025 09:00 AM",
    pickupLocation: {
      name: "Target Store #5372 - Rogers, AR",
      address: "2404 W Pleasant Crossing Dr, Rogers, AR 72758, US"
    },
    dropoffTime: "03/25/2025 10:15 AM",
    dropoffLocation: {
      name: "Jennifer Martinez",
      address: "504 SW B St, Bentonville, AR 72712, US"
    },
    customerName: "Jennifer Martinez",
    price: "$36.00",
    tip: "$6.00",
    fees: "$2.99",
    courier: "John Smith",
    organization: "Target Corporation",
    distance: "5.4 mi",
    couriersEarnings: "$33.00"
  },
  {
    id: 16,
    packageId: "WMT-10042518",
    orderName: "Electronics Order",
    status: "Scheduled Order",
    pickupTime: "03/25/2025 11:00 AM",
    pickupLocation: {
      name: "Apple Store - Rogers, AR",
      address: "2203 Promenade Blvd, Rogers, AR 72758, US"
    },
    dropoffTime: "03/25/2025 12:15 PM",
    dropoffLocation: {
      name: "David Wilson",
      address: "708 NW A St, Bentonville, AR 72712, US"
    },
    customerName: "David Wilson",
    price: "$55.00",
    tip: "$12.00",
    fees: "$4.99",
    courier: "John Smith",
    organization: "Apple",
    distance: "6.8 mi",
    couriersEarnings: "$50.00"
  },
  {
    id: 17,
    packageId: "WMT-10042519",
    orderName: "Lunch Delivery",
    status: "Canceled By Customer",
    pickupTime: "03/25/2025 12:00 PM",
    pickupLocation: {
      name: "Panera Bread - Rogers, AR",
      address: "2215 W Walnut St, Rogers, AR 72756, US"
    },
    dropoffTime: "03/25/2025 12:45 PM",
    dropoffLocation: {
      name: "Walmart Home Office",
      address: "702 SW 8th St, Bentonville, AR 72716, US"
    },
    customerName: "Walmart Home Office",
    price: "$28.50",
    tip: "$5.00",
    fees: "$2.50",
    courier: "John Smith",
    organization: "Panera Bread",
    distance: "5.2 mi",
    couriersEarnings: "$0.00"
  },
  {
    id: 18,
    packageId: "WMT-10042520",
    orderName: "Furniture Delivery",
    status: "Scheduled Order",
    pickupTime: "03/26/2025 09:30 AM",
    pickupLocation: {
      name: "IKEA - Frisco, TX",
      address: "7171 IKEA Dr, Frisco, TX 75034, US"
    },
    dropoffTime: "03/26/2025 02:30 PM",
    dropoffLocation: {
      name: "Amanda Garcia",
      address: "505 SE F St, Bentonville, AR 72712, US"
    },
    customerName: "Amanda Garcia",
    price: "$150.00",
    tip: "$25.00",
    fees: "$15.99",
    courier: "John Smith",
    organization: "IKEA",
    distance: "350.2 mi",
    couriersEarnings: "$145.00"
  },
  {
    id: 19,
    packageId: "WMT-10042521",
    orderName: "Garden Supplies",
    status: "Scheduled Order",
    pickupTime: "03/26/2025 11:00 AM",
    pickupLocation: {
      name: "Lowe's - Rogers, AR",
      address: "3301 SE Walton Blvd, Bentonville, AR 72712, US"
    },
    dropoffTime: "03/26/2025 12:30 PM",
    dropoffLocation: {
      name: "Richard Taylor",
      address: "902 NW 8th St, Bentonville, AR 72712, US"
    },
    customerName: "Richard Taylor",
    price: "$85.00",
    tip: "$15.00",
    fees: "$7.99",
    courier: "John Smith",
    organization: "Lowe's",
    distance: "4.7 mi",
    couriersEarnings: "$78.00"
  },
  {
    id: 20,
    packageId: "WMT-10042522",
    orderName: "Grocery Delivery",
    status: "Scheduled Order",
    pickupTime: "03/26/2025 01:00 PM",
    pickupLocation: {
      name: "Whole Foods - Rogers, AR",
      address: "3425 S Market St, Rogers, AR 72758, US"
    },
    dropoffTime: "03/26/2025 02:15 PM",
    dropoffLocation: {
      name: "Elizabeth Brown",
      address: "605 SW D St, Bentonville, AR 72712, US"
    },
    customerName: "Elizabeth Brown",
    price: "$42.00",
    tip: "$8.00",
    fees: "$3.99",
    courier: "John Smith",
    organization: "Whole Foods",
    distance: "5.9 mi",
    couriersEarnings: "$38.00"
  },
  {
    id: 21,
    packageId: "WMT-10042523",
    orderName: "Electronics Delivery",
    status: "Scheduled Order",
    pickupTime: "03/26/2025 03:30 PM",
    pickupLocation: {
      name: "Best Buy - Rogers, AR",
      address: "2001 Promenade Blvd, Rogers, AR 72758, US"
    },
    dropoffTime: "03/26/2025 04:45 PM",
    dropoffLocation: {
      name: "William Davis",
      address: "804 SE 5th St, Bentonville, AR 72712, US"
    },
    customerName: "William Davis",
    price: "$65.00",
    tip: "$12.00",
    fees: "$4.99",
    courier: "John Smith",
    organization: "Best Buy",
    distance: "6.3 mi",
    couriersEarnings: "$60.00"
  },
  {
    id: 22,
    packageId: "WMT-10042524",
    orderName: "Floral Delivery",
    status: "Dropoff Complete",
    pickupTime: "03/24/2025 02:00 PM",
    pickupLocation: {
      name: "Bloom Floral - Bentonville, AR",
      address: "102 SW A St, Bentonville, AR 72712, US"
    },
    dropoffTime: "03/24/2025 03:15 PM",
    dropoffLocation: {
      name: "Mary Johnson",
      address: "506 NW 3rd St, Bentonville, AR 72712, US"
    },
    customerName: "Mary Johnson",
    price: "$32.00",
    tip: "$7.00",
    fees: "$2.99",
    courier: "John Smith",
    organization: "Bloom Floral",
    distance: "1.8 mi",
    couriersEarnings: "$30.00"
  },
  {
    id: 23,
    packageId: "WMT-10042525",
    orderName: "Auto Parts",
    status: "Dropoff Complete",
    pickupTime: "03/24/2025 03:45 PM",
    pickupLocation: {
      name: "AutoZone - Bentonville, AR",
      address: "1200 S Walton Blvd, Bentonville, AR 72712, US"
    },
    dropoffTime: "03/24/2025 04:30 PM",
    dropoffLocation: {
      name: "James Anderson",
      address: "305 NW 5th St, Bentonville, AR 72712, US"
    },
    customerName: "James Anderson",
    price: "$28.00",
    tip: "$5.50",
    fees: "$2.50",
    courier: "John Smith",
    organization: "AutoZone",
    distance: "2.5 mi",
    couriersEarnings: "$26.00"
  },
  {
    id: 24,
    packageId: "WMT-10042526",
    orderName: "Office Delivery",
    status: "Canceled By Customer",
    pickupTime: "03/25/2025 09:30 AM",
    pickupLocation: {
      name: "Staples - Rogers, AR",
      address: "4408 W Walnut St, Rogers, AR 72756, US"
    },
    dropoffTime: "03/25/2025 10:45 AM",
    dropoffLocation: {
      name: "Tyler Harris",
      address: "702 SE C St, Bentonville, AR 72712, US"
    },
    customerName: "Tyler Harris",
    price: "$26.00",
    tip: "$5.00",
    fees: "$2.99",
    courier: "John Smith",
    organization: "Staples",
    distance: "6.1 mi",
    couriersEarnings: "$0.00"
  },
  {
    id: 25,
    packageId: "WMT-10042527",
    orderName: "Food Delivery",
    status: "Dropoff Complete",
    pickupTime: "03/25/2025 12:30 PM",
    pickupLocation: {
      name: "Chipotle - Bentonville, AR",
      address: "1403 S Walton Blvd, Bentonville, AR 72712, US"
    },
    dropoffTime: "03/25/2025 01:15 PM",
    dropoffLocation: {
      name: "Crystal Bridges Museum",
      address: "600 Museum Way, Bentonville, AR 72712, US"
    },
    customerName: "Crystal Bridges Museum",
    price: "$22.00",
    tip: "$4.50",
    fees: "$1.99",
    courier: "John Smith",
    organization: "Chipotle",
    distance: "3.2 mi",
    couriersEarnings: "$20.50"
  },
  {
    id: 26,
    packageId: "WMT-10042528",
    orderName: "Wine Delivery",
    status: "In Transit",
    pickupTime: "03/25/2025 02:00 PM",
    pickupLocation: {
      name: "Pinnacle Hills Liquor - Rogers, AR",
      address: "5001 W Pauline Whitaker Pkwy, Rogers, AR 72758, US"
    },
    dropoffTime: "03/25/2025 03:15 PM",
    dropoffLocation: {
      name: "Patricia Smith",
      address: "408 SW D St, Bentonville, AR 72712, US"
    },
    customerName: "Patricia Smith",
    price: "$45.00",
    tip: "$10.00",
    fees: "$3.99",
    courier: "John Smith",
    organization: "Pinnacle Hills Liquor",
    distance: "7.3 mi",
    couriersEarnings: "$42.00"
  },
  {
    id: 27,
    packageId: "WMT-10042529",
    orderName: "Grocery Delivery",
    status: "Arrived For Pickup",
    pickupTime: "03/25/2025 04:15 PM",
    pickupLocation: {
      name: "Walmart 0100 - Bentonville, AR",
      address: "406 S WALTON BLVD, BENTONVILLE, AR 72712, US"
    },
    dropoffTime: "03/25/2025 05:30 PM",
    dropoffLocation: {
      name: "Christopher Lee",
      address: "906 SW 8th St, Bentonville, AR 72712, US"
    },
    customerName: "Christopher Lee",
    price: "$35.00",
    tip: "$7.00",
    fees: "$2.99",
    courier: "John Smith",
    organization: "Walmart US Stores",
    distance: "4.8 mi",
    couriersEarnings: "$32.00"
  }
];
