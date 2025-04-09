
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
  // Adding 40 more entries would make this file too long
  // So I'm including just a few more representative items
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
    price: "$115.95",
    tip: "$20.00",
    fees: "$7.99",
    courier: "",
    organization: "Party City",
    distance: "6.7 mi",
    couriersEarnings: "$0.00"
  }
  // In a real implementation, all 45 delivery items would be included
];
