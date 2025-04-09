
import { Delivery } from "@/types/delivery";

// Generate random IDs 
const generatePackageId = (): string => {
  const prefixes = ["WMT", "AMZ", "TGT", "CRB", "BBY", "HMD", "CUN", "GRB", "SBX", "APL"];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
  return `${randomPrefix}-${randomNumber}`;
};

// Generate random order names
const generateOrderName = (): string => {
  const orderTypes = [
    "Grocery Delivery", "Electronics Bundle", "Fashion Order", "Home Essentials", 
    "Office Supplies", "Beauty Products", "Pet Supplies", "Meal Delivery", 
    "Household Items", "Pharmacy Order", "Book Order", "Gift Bundle",
    "Weekly Shopping", "Hardware Delivery", "Party Supplies", "Sports Equipment",
    "DIY Materials", "Pantry Restock", "Health Products", "Seasonal Items"
  ];
  return orderTypes[Math.floor(Math.random() * orderTypes.length)];
};

// Generate random statuses
const generateStatus = (): string => {
  const statuses = [
    "Dropoff Complete", "Canceled By Customer", "Cancelled By Admin", "In Transit",
    "Picking Up", "Arrived For Pickup", "Scheduled Order", "Draft Order", "Paid Order",
    "Courier Selected", "Item Not Given", "Reported Order", "Waiting For Pay",
    "Repeated Order", "Recipient Unavailable", "Accepted Repeated Order"
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Generate random date and time
const generateDateTime = (): string => {
  const now = new Date();
  const randomHours = Math.floor(Math.random() * 24);
  const randomMinutes = Math.floor(Math.random() * 60);
  const randomDay = Math.floor(Math.random() * 7) - 3; // -3 to 3 days from now
  
  const date = new Date(now);
  date.setDate(date.getDate() + randomDay);
  date.setHours(randomHours);
  date.setMinutes(randomMinutes);
  
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  }) + ' ' + date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// Generate random location
const generateLocation = (isPickup: boolean): { name: string; address: string } => {
  const pickupLocations = [
    { name: "Walmart Supercenter - Rogers", address: "4208 Pleasant Crossing Blvd, Rogers, AR 72758, US" },
    { name: "Target - Bentonville", address: "1404 N Walton Blvd, Bentonville, AR 72712, US" },
    { name: "Best Buy - Rogers", address: "2001 Promenade Blvd, Rogers, AR 72758, US" },
    { name: "Home Depot - Bentonville", address: "1701 SE Walton Blvd, Bentonville, AR 72712, US" },
    { name: "Whole Foods - Fayetteville", address: "3425 N College Ave, Fayetteville, AR 72703, US" },
    { name: "Lowe's - Rogers", address: "3721 W Walnut St, Rogers, AR 72756, US" },
    { name: "Apple Store - Rogers", address: "2203 S Promenade Blvd, Rogers, AR 72758, US" },
    { name: "Starbucks - Bentonville", address: "1401 S Walton Blvd, Bentonville, AR 72712, US" },
    { name: "CVS Pharmacy - Bentonville", address: "100 SW 14th St, Bentonville, AR 72712, US" },
    { name: "Ulta Beauty - Rogers", address: "4208 S Pleasant Crossing Blvd, Rogers, AR 72758, US" }
  ];

  const dropoffLocations = [
    { name: "John Davidson", address: "1234 Westfield Ave, Bentonville, AR 72712, US" },
    { name: "Sarah Johnson", address: "567 Oakwood Dr, Rogers, AR 72756, US" },
    { name: "Michael Thompson", address: "890 Pine St, Fayetteville, AR 72701, US" },
    { name: "Emily Wilson", address: "432 Maple Rd, Bentonville, AR 72712, US" },
    { name: "David Clark", address: "765 Elm St, Rogers, AR 72756, US" },
    { name: "Jennifer Martinez", address: "321 Cedar Ln, Bentonville, AR 72712, US" },
    { name: "Robert Brown", address: "987 Birch Ave, Fayetteville, AR 72703, US" },
    { name: "Amanda Taylor", address: "654 Spruce Dr, Rogers, AR 72758, US" },
    { name: "Christopher White", address: "123 Walnut St, Bentonville, AR 72712, US" },
    { name: "Jessica Thomas", address: "876 Hickory Ln, Fayetteville, AR 72704, US" }
  ];

  const locations = isPickup ? pickupLocations : dropoffLocations;
  return locations[Math.floor(Math.random() * locations.length)];
};

// Generate random price
const generatePrice = (): string => {
  const price = (Math.floor(Math.random() * 15000) / 100).toFixed(2);
  return `$${price}`;
};

// Generate random tip
const generateTip = (): string => {
  if (Math.random() < 0.2) return "$0.00"; // 20% chance of no tip
  const tip = (Math.floor(Math.random() * 2000) / 100).toFixed(2);
  return `$${tip}`;
};

// Generate random courier
const generateCourier = (): string => {
  const couriers = [
    "John Smith", "Michael Groves", "Laura Ramirez", "Gary Burton", "Ashley Rodriguez",
    "James Wilson", "Lisa Martinez", "Paul Garcia", "Nicole Adams", "Tyler Wilson",
    "Derek Johnson", "Rachel Green", "Kevin Martinez", "Victoria Chang", "Christopher Allen",
    "Marcus Johnson", "Samantha Brown", "Frank Torres", "", "" // 20% chance of empty courier
  ];
  return couriers[Math.floor(Math.random() * couriers.length)];
};

// Generate random organization
const generateOrganization = (): string => {
  const organizations = [
    "Walmart US Stores", "Amazon Logistics", "Target Corporation", "Whole Foods",
    "Best Buy", "Home Depot", "Apple Inc.", "CVS Health", "Lowe's",
    "Starbucks", "Ulta Beauty", "Grubhub", "DoorDash", "Instacart"
  ];
  return organizations[Math.floor(Math.random() * organizations.length)];
};

// Generate random distance
const generateDistance = (): string => {
  const distance = (Math.floor(Math.random() * 150) / 10).toFixed(1);
  return `${distance} mi`;
};

// Generate random earnings
const generateEarnings = (): string => {
  if (Math.random() < 0.2) return ""; // 20% chance of empty earnings
  const earnings = (Math.floor(Math.random() * 5000) / 100).toFixed(2);
  return `$${earnings}`;
};

// Generate 50 random deliveries
export const additionalDeliveriesData: Delivery[] = Array.from({ length: 50 }, (_, i) => {
  const status = generateStatus();
  const courier = status === "Cancelled By Admin" || status === "Canceled By Customer" || 
                 status === "Draft Order" || status === "Waiting For Pay" ? "" : generateCourier();
  
  return {
    id: 100 + i,
    packageId: generatePackageId(),
    orderName: generateOrderName(),
    status: status,
    pickupTime: generateDateTime(),
    pickupLocation: generateLocation(true),
    dropoffTime: generateDateTime(),
    dropoffLocation: generateLocation(false),
    customerName: generateLocation(false).name,
    price: generatePrice(),
    tip: generateTip(),
    courier: courier,
    organization: generateOrganization(),
    distance: generateDistance(),
    couriersEarnings: courier ? generateEarnings() : ""
  };
});
