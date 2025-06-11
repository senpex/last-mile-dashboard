
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TransportIcon, { TransportType } from "@/components/icons/TransportIcon";
import { Star, MapPin, Clock } from "lucide-react";
import { Driver } from "@/data/driversData";

interface DriverCardProps {
  driver: Driver;
  isSelected: boolean;
  onSelect: (driverId: number) => void;
  onChatWithDriver: (driver: Driver, event: React.MouseEvent) => void;
}

export function DriverCard({ driver, isSelected, onSelect, onChatWithDriver }: DriverCardProps) {
  const transportTypes = driver.transportType.split(',');

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 border-green-200";
      case "Busy":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "On Break":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Offline":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div 
      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 dark:border-blue-400' 
          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
      }`} 
      onClick={() => onSelect(driver.id)}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={driver.avatar} />
          <AvatarFallback className="text-sm">
            {driver.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-sm truncate">{driver.name}</h4>
              <Button
                variant="outline"
                size="sm"
                className="h-6 px-2 py-0 text-xs hover:bg-blue-50 dark:hover:bg-blue-950"
                onClick={(e) => onChatWithDriver(driver, e)}
              >
                Chat
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={`text-xs px-2 py-0.5 ${getStatusColor(driver.status)}`}
              >
                {driver.status}
              </Badge>
              
              <div className="flex items-center gap-1">
                {transportTypes.map((transportType, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-center p-1 rounded bg-muted"
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
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{driver.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span className="truncate max-w-[120px]">{driver.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{driver.eta}</span>
              </div>
            </div>
            <span className="text-xs font-medium">{driver.totalDeliveries} deliveries</span>
          </div>
        </div>
      </div>
    </div>
  );
}
