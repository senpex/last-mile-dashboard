
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
