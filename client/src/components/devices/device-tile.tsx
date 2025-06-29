import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as LucideIcons from "lucide-react";
import type { Device } from "@shared/schema";

interface DeviceTileProps {
  device: Device;
  onClick?: () => void;
}

export default function DeviceTile({ device, onClick }: DeviceTileProps) {
  // Get the icon component dynamically
  const IconComponent = (LucideIcons as any)[device.iconType] || LucideIcons.Smartphone;
  
  const getWarrantyBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'expiring_soon':
        return 'secondary';
      case 'expired':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getWarrantyBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 hover:bg-green-600';
      case 'expiring_soon':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'expired':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return '';
    }
  };

  return (
    <Card 
      className="device-tile bg-card border-border hover:border-brand-red cursor-pointer" 
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="flex flex-col items-center text-center space-y-1.5">
          <IconComponent className="w-6 h-6 text-brand-red" />
          <h4 className="font-medium text-xs leading-tight">{device.name}</h4>
          <p className="text-xs text-muted-foreground truncate w-full">{device.model}</p>
          <Badge 
            variant={getWarrantyBadgeVariant(device.warrantyStatus)}
            className={`text-xs px-1.5 py-0.5 ${getWarrantyBadgeClass(device.warrantyStatus)}`}
          >
            {device.warrantyStatus === 'active' ? 'Active' : 
             device.warrantyStatus === 'expiring_soon' ? 'Expiring' : 
             'Expired'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
