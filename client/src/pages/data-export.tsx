import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DataExport() {
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
                  <Button className="bg-brand-red hover:bg-red-600">
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
                  <Button className="bg-brand-red hover:bg-red-600">
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
                  <Button className="bg-brand-red hover:bg-red-600">
                    Export ZIP
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Sample Visualization */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Device Analytics</h3>
          
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400" 
            alt="Data visualization dashboard with charts and analytics" 
            className="rounded-lg mb-4 w-full h-48 object-cover"
          />
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Kitchen Appliances</span>
                  <span className="text-sm">12 devices</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-brand-red h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">HVAC Systems</span>
                  <span className="text-sm">8 devices</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Lighting & Security</span>
                  <span className="text-sm">15 devices</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
