
  const getStatusBadgeVariant = useCallback((status: string) => {
    const dictionaryId = statusMapping[status];
    
    switch (dictionaryId) {
      case "completed":
        return "success";
      case "cancelled_order":
        return "destructive";
      case "cancelled_by_admin":
        return "warning";
      case "in_transit":
        return "sky"; // New sky blue variant
      case "started_working":
      case "arrived_for_pickup":
        return "warning";
      default:
        return "secondary";
    }
  }, [statusMapping]);
