import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, BarChart3, TrendingUp } from "lucide-react";
import type { Device } from "@shared/schema";

export default function DataExport() {
  const { data: devices, isLoading } = useQuery<Device[]>({
    queryKey: ["/api/devices"],
  });

  const getCategoryStats = () => {
    if (!devices) return [];
    
    const categoryCount = devices.reduce((acc, device) => {
      acc[device.category] = (acc[device.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = devices.length;
    return Object.entries(categoryCount).map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / total) * 100)
    }));
  };

  const getWarrantyStats = () => {
    if (!devices) return { active: 0, expired: 0 };
    
    return devices.reduce((acc, device) => {
      if (device.warrantyStatus === 'active') acc.active++;
      else acc.expired++;
      return acc;
    }, { active: 0, expired: 0 });
  };

  const categoryStats = getCategoryStats();
  const warrantyStats = getWarrantyStats();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Data Export & Visualization</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Export Options */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Export Your Data</h3>
          <div className="space-y-4">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Device Inventory Report</h4>
                    <p className="text-sm text-muted-foreground">Complete list with warranty status</p>
                  </div>
                  <Button 
                    className="bg-brand-red hover:bg-red-600"
                    onClick={() => window.location.href = '/electrichomehub/data-export.html'}
                  >
                    Export CSV
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Alert History</h4>
                    <p className="text-sm text-muted-foreground">Past 12 months of monitoring alerts</p>
                  </div>
                  <Button 
                    className="bg-brand-red hover:bg-red-600"
                    onClick={() => window.location.href = '/electrichomehub/data-export.html'}
                  >
                    Export JSON
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Document Archive</h4>
                    <p className="text-sm text-muted-foreground">All uploaded manuals and records</p>
                  </div>
                  <Button 
                    className="bg-brand-red hover:bg-red-600"
                    onClick={() => window.location.href = '/electrichomehub/data-export.html'}
                  >
                    Export ZIP
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Data Visualization */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Device Analytics</h3>
          
          {isLoading ? (
            <div className="text-center py-8">Loading analytics...</div>
          ) : (
            <>
              {/* Category Distribution */}
              <Card className="bg-card border-border mb-4">
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Device Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryStats.map((stat, index) => (
                      <div key={stat.category}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{stat.category}</span>
                          <span className="text-sm text-muted-foreground">
                            {stat.count} devices ({stat.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              index === 0 ? 'bg-brand-red' : 
                              index === 1 ? 'bg-blue-500' : 
                              index === 2 ? 'bg-green-500' : 
                              index === 3 ? 'bg-purple-500' : 
                              'bg-orange-500'
                            }`}
                            style={{ width: `${stat.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Warranty Status */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Warranty Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Active Warranties</span>
                      </div>
                      <Badge variant="secondary">{warrantyStats.active}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">Expired Warranties</span>
                      </div>
                      <Badge variant="destructive">{warrantyStats.expired}</Badge>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <div className="text-xs text-muted-foreground">
                        Total Devices: {devices?.length || 0}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
