
import { UserCircle2 as UserRound } from "lucide-react";

interface SenderRecipientInfoProps {
  senderInfo: {
    name: string;
    phone: string;
  };
  recipientInfo: {
    name: string;
    phone: string;
  };
}

export const SenderRecipientInfo = ({ senderInfo, recipientInfo }: SenderRecipientInfoProps) => {
  return (
    <>
      <div className="flex items-start gap-2">
        <UserRound className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
        <div>
          <div className="text-[11px] text-muted-foreground mb-0.5">Sender:</div>
          <div className="text-xs font-medium">{senderInfo.name}</div>
          <div className="text-xs text-muted-foreground">{senderInfo.phone}</div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="h-3 border-l border-dashed border-border/50"></div>
      </div>
      <div className="flex items-start gap-2">
        <UserRound className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
        <div>
          <div className="text-[11px] text-muted-foreground mb-0.5">Recipient:</div>
          <div className="text-xs font-medium">{recipientInfo.name}</div>
          <div className="text-xs text-muted-foreground">{recipientInfo.phone}</div>
        </div>
      </div>
    </>
  );
};

interface DriverInfoProps {
  driverInfo: {
    name: string;
    phone: string;
    vehicle: string;
    rating: string;
    totalDeliveries: string;
  };
}

export const DriverInfo = ({ driverInfo }: DriverInfoProps) => {
  return (
    <div className="flex items-start gap-2">
      <UserRound className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
      <div>
        <div className="text-[11px] text-muted-foreground mb-0.5">Driver Details:</div>
        <div className="text-xs font-medium">{driverInfo.name}</div>
        <div className="text-xs text-muted-foreground">{driverInfo.phone}</div>
        <div className="text-xs text-muted-foreground">Vehicle: {driverInfo.vehicle}</div>
        <div className="text-xs text-muted-foreground">Rating: ⭐️ {driverInfo.rating}</div>
        <div className="text-xs text-muted-foreground">Deliveries: {driverInfo.totalDeliveries}</div>
      </div>
    </div>
  );
};
