
import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Badge } from "@/components/ui/badge";
import { ColDef } from "ag-grid-community";

export type Delivery = {
  id: number;
  status: string;
  pickupTime: string;
  pickupLocation: {
    name: string;
    address: string;
  };
  dropoffTime: string;
  dropoffLocation: {
    name: string;
    address: string;
  };
  price: string;
  tip: string;
  fees: string;
  courier: string;
  organization: string;
  distance: string;
};

type DeliveriesGridProps = {
  deliveries: Delivery[];
};

// Custom cell renderers
const StatusCellRenderer = (props: any) => {
  const status = props.value;
  
  if (status === "Dropoff Complete") {
    return (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        {status}
      </Badge>
    );
  } else if (status === "Canceled By Customer") {
    return <Badge variant="destructive">{status}</Badge>;
  } else {
    return <Badge variant="outline">{status}</Badge>;
  }
};

const LocationCellRenderer = (props: any) => {
  const location = props.value;
  if (!location) {
    console.error("LocationCellRenderer received undefined value:", props);
    return <div>Invalid location data</div>;
  }
  return (
    <div className="flex flex-col">
      <span className="font-medium">{location.name}</span>
      <span className="text-xs text-muted-foreground">{location.address}</span>
    </div>
  );
};

const DeliveriesGrid = ({ deliveries }: DeliveriesGridProps) => {
  console.log("DeliveriesGrid received data:", deliveries); // Debug log
  
  // Define columns with proper typing
  const columnDefs = useMemo<ColDef[]>(() => [
    { 
      headerName: "Status", 
      field: "status", 
      cellRenderer: StatusCellRenderer,
      width: 140,
      sortable: true,
      filter: true
    },
    { 
      headerName: "Pickup Time", 
      field: "pickupTime",
      sortable: true,
      filter: true
    },
    { 
      headerName: "Pickup Location", 
      field: "pickupLocation", 
      cellRenderer: LocationCellRenderer,
      width: 200,
      sortable: true,
      filter: true
    },
    { 
      headerName: "Dropoff Time", 
      field: "dropoffTime",
      sortable: true,
      filter: true
    },
    { 
      headerName: "Dropoff Location", 
      field: "dropoffLocation", 
      cellRenderer: LocationCellRenderer,
      width: 200,
      sortable: true,
      filter: true
    },
    { 
      headerName: "Price", 
      field: "price",
      sortable: true,
      filter: true
    },
    { 
      headerName: "Tip", 
      field: "tip",
      sortable: true,
      filter: true
    },
    { 
      headerName: "Fees", 
      field: "fees",
      sortable: true,
      filter: true
    },
    { 
      headerName: "Courier", 
      field: "courier",
      sortable: true,
      filter: true
    },
    { 
      headerName: "Organization", 
      field: "organization",
      sortable: true,
      filter: true
    },
    { 
      headerName: "Distance", 
      field: "distance",
      sortable: true,
      filter: true,
      headerClass: "text-right",
      cellClass: "text-right"
    }
  ], []);

  // Default column definitions
  const defaultColDef = useMemo(() => ({
    resizable: true,
    suppressMovable: false,
    flex: 1
  }), []);

  if (!deliveries || deliveries.length === 0) {
    console.log("No deliveries data available");
    return <div className="p-4 border rounded text-center">No data available</div>;
  }

  return (
    <div className="relative">
      <div className="bg-muted/30 p-2 mb-2 rounded text-sm">
        Showing {deliveries.length} deliveries
      </div>
      <div className="ag-theme-alpine h-[600px] w-full border rounded overflow-hidden">
        <AgGridReact
          rowData={deliveries}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          enableCellTextSelection={true}
          suppressRowClickSelection={true}
          suppressCellFocus={true}
        />
      </div>
    </div>
  );
};

export default DeliveriesGrid;
