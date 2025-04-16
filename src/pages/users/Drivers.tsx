
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DriversTable } from '@/components/drivers/DriversTable';

// Sample hire status dictionary
const hireStatusDictionary: Record<string, string> = {
  'active': 'Active',
  'inactive': 'Inactive',
  'pending': 'Pending Approval',
  'rejected': 'Rejected',
  'onboarding': 'Onboarding'
};

// Function to update driver hire status
const updateDriverHireStatus = (driverId: number, status: string) => {
  console.log(`Updating driver ${driverId} status to ${status}`);
  // Here you would typically make an API call to update the status
};

const renderHireStatus = (hireStatusId: string, driverId: number) => {
  const hireStatusText = hireStatusDictionary[hireStatusId] || `Unknown (${hireStatusId})`;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-auto">
          {hireStatusText}
          <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[160px]">
        {Object.entries(hireStatusDictionary).map(([key, value]) => (
          <DropdownMenuItem 
            key={key} 
            onClick={() => updateDriverHireStatus(driverId, key)} 
            className={hireStatusId === key ? "bg-muted" : ""}
          >
            {value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Sample data for drivers
const sampleDrivers = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john.doe@example.com",
    phone: "+1 555-123-4567",
    zipcode: "90210",
    transports: ["car", "bike"],
    rating: 4.5,
    status: "active",
    hireStatus: "active",
    stripeStatus: "verified",
    notes: "Reliable driver, always on time"
  },
  // Add more sample drivers as needed
];

// Mock dictionaries
const transportTypes: Record<string, string> = {
  "car": "Car",
  "bike": "Bike",
  "scooter": "Scooter",
  "van": "Van"
};

const statusDictionary: Record<string, string> = {
  "active": "Active",
  "inactive": "Inactive",
  "pending": "Pending"
};

const statusColors: Record<string, string> = {
  "active": "bg-green-100 text-green-800",
  "inactive": "bg-red-100 text-red-800",
  "pending": "bg-yellow-100 text-yellow-800"
};

const DriversPage: React.FC = () => {
  // State to manage available columns and their visibility
  const [availableColumns] = useState([
    { id: "id", label: "ID", default: true },
    { id: "name", label: "Name", default: true },
    { id: "email", label: "Email", default: true },
    { id: "phone", label: "Phone", default: true },
    { id: "zipcode", label: "Zipcode", default: true },
    { id: "transport", label: "Transport", default: true },
    { id: "rating", label: "Rating", default: true },
    { id: "status", label: "Status", default: true },
    { id: "hireStatus", label: "Hire Status", default: true },
    { id: "stripeStatus", label: "Stripe Status", default: false },
    { id: "notes", label: "Notes", default: false },
    { id: "actions", label: "Actions", default: true }
  ]);
  
  const [sortedColumns] = useState(availableColumns.map(col => col.id));
  const [editingNotes, setEditingNotes] = useState<number | null>(null);
  
  // Mock functions for table props
  const onDragStart = () => {}
  const onDragOver = () => {}
  const onDrop = () => {}
  const onDragEnd = () => {}
  const renderRating = (rating: number) => <span>{rating}/5</span>
  const renderStatus = (statusId: string) => <span>{statusDictionary[statusId]}</span>
  const renderStripeStatus = (status: 'verified' | 'unverified' | 'pending') => <span>{status}</span>
  const handleNotesClick = (driverId: number) => setEditingNotes(driverId)
  const handleNotesChange = () => {}
  const saveNotes = () => setEditingNotes(null)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Drivers</h1>
      
      <DriversTable
        currentItems={sampleDrivers}
        sortedColumns={sortedColumns}
        availableColumns={availableColumns}
        transportTypes={transportTypes}
        statusDictionary={statusDictionary}
        statusColors={statusColors}
        editingNotes={editingNotes}
        draggedColumn={null}
        dragOverColumn={null}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
        renderRating={renderRating}
        renderStatus={renderStatus}
        renderHireStatus={renderHireStatus}
        renderStripeStatus={renderStripeStatus}
        handleNotesClick={handleNotesClick}
        handleNotesChange={handleNotesChange}
        saveNotes={saveNotes}
      />
    </div>
  );
};

export default DriversPage;
