import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Alert } from "@shared/schema";

interface AlertCardProps {
  alert: Alert;
}

export default function AlertCard({ alert }: AlertCardProps) {
  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return AlertCircle;
      case 'warning':
        return AlertTriangle;
      default:
        return Info;
    }
  };

  const getAlertClass = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-900 border-red-700';
      case 'warning':
        return 'bg-yellow-900 border-yellow-700';
      default:
        return 'bg-card border-border';
    }
  };

  const getIconClass = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      default:
        return 'text-blue-400';
    }
  };

  const getTextClass = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-100';
      case 'warning':
        return 'text-yellow-100';
      default:
        return 'text-white';
    }
  };

  const getDescriptionClass = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-200';
      case 'warning':
        return 'text-yellow-200';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTimeClass = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-300';
      case 'warning':
        return 'text-yellow-300';
      default:
        return 'text-muted-foreground';
    }
  };

  const Icon = getAlertIcon(alert.severity);
  const timeAgo = alert.createdAt ? 
    Math.floor((Date.now() - new Date(alert.createdAt).getTime()) / (1000 * 60 * 60)) + ' hours ago' :
    'Recently';

  return (
    <Card className={`${getAlertClass(alert.severity)} transition-colors`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Icon className={`w-5 h-5 ${getIconClass(alert.severity)} mt-0.5`} />
          <div className="flex-1">
            <h3 className={`font-medium ${getTextClass(alert.severity)}`}>
              {alert.title}
            </h3>
            <p className={`text-sm mt-1 ${getDescriptionClass(alert.severity)}`}>
              {alert.description}
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <span className={`text-xs ${getTimeClass(alert.severity)}`}>
                {timeAgo}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`text-xs ${getTimeClass(alert.severity)} hover:${getTextClass(alert.severity)} underline`}
              >
                View Details
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`text-xs ${getTimeClass(alert.severity)} hover:${getTextClass(alert.severity)} underline`}
              >
                Mark as Read
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
