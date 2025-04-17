
export type Recipient = {
  id: string;
  name: string;
  type: string;
};

export type MessageData = {
  message: string;
  recipients: Recipient[];
  channels: string[];
  timestamp: string;
};

export const mockRecipients = {
  clients: [{
    id: "c2",
    name: "Emma Johnson",
    type: "client"
  }, {
    id: "c3",
    name: "Michael Brown",
    type: "client"
  }],
  drivers: [],
  groups: [{
    id: "g1",
    name: "All Drivers in Zone 3",
    type: "group"
  }, {
    id: "g2",
    name: "Clients with active orders",
    type: "group"
  }, {
    id: "g3",
    name: "Today's Deliveries",
    type: "group"
  }]
};
