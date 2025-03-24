
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
  return (
    <div className="flex flex-col">
      <span className="font-medium">{location.name}</span>
      <span className="text-xs text-muted-foreground">{location.address}</span>
    </div>
  );
};

const DeliveriesGrid = ({ deliveries }: DeliveriesGridProps) => {
  // Define columns with proper typing
  const columnDefs = useMemo<ColDef<Delivery>[]>(() => [
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
  ] as ColDef<Delivery>[], []);

  // Default column definitions
  const defaultColDef = useMemo<ColDef<Delivery>>(() => ({
    resizable: true,
    suppressMovable: false,
    flex: 1
  }), []);

  return (
    <div className="ag-theme-alpine h-[calc(100vh-210px)] w-full">
      <AgGridReact<Delivery>
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
        domLayout="autoHeight"
      />
    </div>
  );
};

export default DeliveriesGrid;
