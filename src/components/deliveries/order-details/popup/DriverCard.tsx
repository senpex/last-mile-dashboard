
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock } from "lucide-react";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import { Driver } from "@/data/driversData";

interface DriverCardProps {
  driver: Driver;
  isSelected: boolean;
  onSelect: () => void;
  onChatWithDriver: (driver: Driver, event: React.MouseEvent) => void;
  getStatusColor: (status: string) => string;
}

export const DriverCard = ({
  driver,
  isSelected,
  onSelect,
  onChatWithDriver,
  getStatusColor
}: DriverCardProps) => {
  const transportTypes = driver.transportType.split(',');

  return (
    <div 
      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
        isSelected 
          ? 'border-primary bg-primary/5 shadow-sm' 
          : 'border-border hover:border-border/80 hover:bg-muted/30'
      }`} 
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Avatar className="h-12 w-12 flex-shrink-0">
            <AvatarImage src={driver.avatar} />
            <AvatarFallback className="text-xs font-medium">
              {driver.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <h4 className="font-medium text-sm truncate text-foreground">
                  {driver.name}
                </h4>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 py-0 text-xs hover:bg-primary/10 flex-shrink-0"
                  onClick={(e) => onChatWithDriver(driver, e)}
                >
                  Chat
                </Button>
                <Badge 
                  variant="outline" 
                  className={`text-xs px-2 py-0.5 flex-shrink-0 ${getStatusColor(driver.status)}`}
                >
                  {driver.status}
                </Badge>
              </div>
              
              <div className="flex items-center gap-1 flex-shrink-0">
                {transportTypes.map((transportType, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-center p-1.5 rounded bg-muted border"
                    title={transportType.trim()}
                  >
                    <TransportIcon 
                      transportType={transportType.trim() as TransportType} 
                      size={14} 
                      className="h-3.5 w-3.5" 
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{driver.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate max-w-24">{driver.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{driver.eta}</span>
                </div>
              </div>
              <span className="text-xs font-medium flex-shrink-0">
                {driver.totalDeliveries} deliveries
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
