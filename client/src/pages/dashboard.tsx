import { useQuery } from "@tanstack/react-query";
import { Smartphone, FileText, AlertTriangle, Badge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatsGrid from "@/components/dashboard/stats-grid";
import DeviceGrid from "@/components/devices/device-grid";
import type { DashboardStats } from "@/lib/types";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  if (isLoading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Quick Action Buttons */}
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="bg-black border-card hover:border-brand-red rounded-lg p-6 h-auto text-left transition-all duration-200 group justify-start"
            >
              <div className="flex items-center space-x-3">
                <Smartphone className="w-6 h-6 text-brand-red" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold group-hover:text-brand-red">Track Devices</h3>
                  <p className="text-muted-foreground text-sm">Monitor all your electric hardware in one place</p>
                </div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="bg-black border-card hover:border-brand-red rounded-lg p-6 h-auto text-left transition-all duration-200 group justify-start"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-brand-red" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold group-hover:text-brand-red">Manage Documents</h3>
                  <p className="text-muted-foreground text-sm">Centralized storage for manuals and documentation</p>
                </div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="bg-black border-card hover:border-brand-red rounded-lg p-6 h-auto text-left transition-all duration-200 group justify-start"
            >
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-brand-red" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold group-hover:text-brand-red">Monitor Issues</h3>
                  <p className="text-muted-foreground text-sm">Proactive alerts for device problems and recalls</p>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Dashboard Overview */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Dashboard Overview</h2>
            <div className="flex space-x-3">
              <Badge variant="secondary" className="bg-card px-3 py-1 rounded-full text-sm">
                {stats?.totalDevices || 0} Devices
              </Badge>
              <Badge variant="destructive" className="bg-brand-red px-3 py-1 rounded-full text-sm">
                {stats?.activeAlerts || 0} Alerts
              </Badge>
            </div>
          </div>
          
          {stats && <StatsGrid stats={stats} />}
        </section>

        {/* Device Grid Preview */}
        <section>
          <DeviceGrid />
        </section>
      </div>
    </div>
  );
}
