
export type StripeStatus = 'verified' | 'unverified' | 'pending';

const getRandomPhone = (): string => {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const prefix = Math.floor(Math.random() * 900) + 100;
  const lineNumber = Math.floor(Math.random() * 9000) + 1000;
  return `(${areaCode}) ${prefix}-${lineNumber}`;
};

const getRandomZipcode = (): string => {
  return String(Math.floor(Math.random() * 90000) + 10000);
};

const generateRandomTransports = (): string[] => {
  const transportIds = ['1', '2', '3', '4', '5', 'pickup_truck', '9ft_cargo_van', '10ft_box_truck', '15ft_box_truck', '17ft_box_truck', 'refrigerated_van'];
  const count = Math.floor(Math.random() * 3) + 1;
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * transportIds.length);
    const transportId = transportIds[randomIndex];
    if (!result.includes(transportId)) {
      result.push(transportId);
    }
  }
  return result;
};

const generateRandomRating = (): number => {
  return Number((Math.random() * 2 + 3).toFixed(1));
};

const generateRandomHireStatus = (): string => {
  const hireStatuses = ['hired', 'left_vm', 'contact_again', 'not_interested', 'blacklist', 'out_of_service'];
  const randomIndex = Math.floor(Math.random() * hireStatuses.length);
  return hireStatuses[randomIndex];
};

const generateRandomStripeStatus = (): StripeStatus => {
  const statuses: StripeStatus[] = ['verified', 'unverified', 'pending'];
  const randomIndex = Math.floor(Math.random() * 3);
  return statuses[randomIndex];
};

export const generateRandomProfileTypes = (): string[] => {
  const types = ['Driver', 'Mover', 'Helper'];
  const numTypes = Math.floor(Math.random() * 3) + 1;
  const selectedTypes = [];
  const shuffled = [...types].sort(() => 0.5 - Math.random());
  for (let i = 0; i < numTypes; i++) {
    selectedTypes.push(shuffled[i]);
  }
  return selectedTypes;
};

export const getRandomAddress = (): string => {
  const streetNumbers = [123, 456, 789, 1010, 555, 777, 888, 999, 321, 654];
  const streetNames = ["Main St", "Oak Ave", "Pine Rd", "Maple Dr", "Cedar Ln", "Elm Blvd", "Park Ave", "River Rd", "Lake Dr", "Forest Way"];
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];
  const states = ["NY", "CA", "IL", "TX", "AZ", "PA", "TX", "CA", "TX", "CA"];
  const randomIndex = Math.floor(Math.random() * 10);
  return `${streetNumbers[randomIndex]} ${streetNames[randomIndex]}, ${cities[randomIndex]}, ${states[randomIndex]}`;
};

export const generateRandomDrivers = (count: number, startId: number = 10000): any[] => {
  const firstNames = ["John", "Jane", "Michael", "Emma", "David", "Sarah", "Robert", "Jennifer", "William", "Elizabeth"];
  const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"];
  const statuses = ["online", "offline", "busy"];

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    
    return {
      id: startId + i,
      name,
      email,
      phone: getRandomPhone(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      hireStatus: generateRandomHireStatus(),
      transports: generateRandomTransports(),
      rating: generateRandomRating(),
      stripeStatus: generateRandomStripeStatus(),
      zipcode: getRandomZipcode(),
      address: getRandomAddress(),
      notes: Math.random() > 0.7 ? `Notes for ${name}` : "",
      profileTypes: generateRandomProfileTypes()
    };
  });
};
