import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface APIEndpointProps {
  method: string;
  endpoint: string;
  description: string;
}

export default function APIEndpoint({ method, endpoint, description }: APIEndpointProps) {
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-600 hover:bg-green-700';
      case 'POST':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'PUT':
        return 'bg-yellow-600 hover:bg-yellow-700';
      case 'DELETE':
        return 'bg-red-600 hover:bg-red-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <Card className="bg-black border-border">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge className={`text-xs ${getMethodColor(method)}`}>
              {method}
            </Badge>
            <code className="text-sm">{endpoint}</code>
          </div>
          <Button variant="ghost" size="sm" className="text-brand-red hover:underline text-xs">
            Try it
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
