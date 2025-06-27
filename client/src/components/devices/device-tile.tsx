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
      case 'Active':
        return 'default';
      case 'Expires Soon':
        return 'secondary';
      case 'Expired':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getWarrantyBadgeClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500 hover:bg-green-600';
      case 'Expires Soon':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Expired':
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
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center space-y-2">
          <IconComponent className="w-8 h-8 text-brand-red" />
          <h4 className="font-medium text-sm">{device.name}</h4>
          <p className="text-xs text-muted-foreground">{device.model}</p>
          <Badge 
            variant={getWarrantyBadgeVariant(device.warrantyStatus)}
            className={`text-xs ${getWarrantyBadgeClass(device.warrantyStatus)}`}
          >
            {device.warrantyStatus === 'Active' ? 'Warranty Active' : 
             device.warrantyStatus === 'Expires Soon' ? 'Expires Soon' : 
             'No Warranty'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
