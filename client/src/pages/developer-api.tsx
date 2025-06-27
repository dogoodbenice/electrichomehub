import { Rocket, Code, Download, Key, Zap, Terminal, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CodeBlock from "@/components/developer/code-block";
import APIEndpoint from "@/components/developer/api-endpoint";

export default function DeveloperAPI() {
  const quickStartCode = `// Initialize Electric Home Hub API
const ehh = new ElectricHomeHub({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Get all devices with response example
const response = await ehh.getDevices();

console.log(response);
// Output:
{
  "devices": [
    {
      "id": 1,
      "name": "Smart Fridge",
      "model": "RF28R7351",
      "manufacturer": "Samsung",
      "category": "Appliance",
      "status": "online",
      "lastSeen": "2025-06-27T19:22:00Z",
      "warrantyExpiry": "2026-12-15",
      "location": "Kitchen"
    },
    {
      "id": 2,
      "name": "Smart Thermostat",
      "model": "Nest Learning",
      "manufacturer": "Google",
      "category": "HVAC",
      "status": "online",
      "lastSeen": "2025-06-27T19:21:45Z",
      "warrantyExpiry": "2027-03-10",
      "location": "Living Room"
    }
  ],
  "total": 2,
  "page": 1,
  "limit": 10
}`;

  const endpoints = [
    {
      method: "GET",
      endpoint: "/api/v1/devices",
      description: "Retrieve all registered devices"
    },
    {
      method: "POST",
      endpoint: "/api/v1/devices",
      description: "Register a new device"
    },
    {
      method: "GET",
      endpoint: "/api/v1/alerts",
      description: "Get proactive monitoring alerts"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="bg-card border-border p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-brand-red">Developer API & Integration</h2>
          <div className="flex space-x-3">
            <Button className="bg-brand-red hover:bg-red-600">
              <Key className="w-4 h-4 mr-2" />
              Get API Key
            </Button>
            <Button variant="outline" className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              Download SDK
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Start */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Rocket className="w-5 h-5 text-brand-red" />
              <span>Quick Start Guide</span>
            </h3>
            
            <div className="rounded-lg mb-4 w-full h-48 bg-gradient-to-r from-black to-gray-900 border border-brand-red/20 flex items-center justify-center relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-black">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)',
                  backgroundSize: '20px 20px'
                }}></div>
              </div>
              
              {/* Icon arrangement */}
              <div className="relative z-10 flex items-center justify-center space-x-8">
                <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center animate-pulse">
                  <Terminal className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Zap className="w-8 h-8 text-brand-red animate-pulse" style={{animationDelay: '0.5s'}} />
                  <div className="w-16 h-px bg-brand-red"></div>
                  <Zap className="w-6 h-6 text-brand-red/70 animate-pulse" style={{animationDelay: '1s'}} />
                </div>
                <div className="w-12 h-12 bg-brand-red/80 rounded-full flex items-center justify-center animate-pulse" style={{animationDelay: '1.5s'}}>
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Subtle text overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-brand-red text-sm font-medium">API Integration Workflow</p>
              </div>
            </div>
            
            <CodeBlock code={quickStartCode} />
          </div>
          
          {/* API Endpoints */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Code className="w-5 h-5 text-brand-red" />
              <span>Popular Endpoints</span>
            </h3>
            <div className="space-y-3">
              {endpoints.map((endpoint, index) => (
                <APIEndpoint
                  key={index}
                  method={endpoint.method}
                  endpoint={endpoint.endpoint}
                  description={endpoint.description}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* White Label Information */}
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-semibold mb-4 text-brand-red">White Label Solutions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-black border-border">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Custom Branding</h4>
                <p className="text-sm text-muted-foreground">
                  Full UI customization with your brand colors, logos, and domain
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-black border-border">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">API Integration</h4>
                <p className="text-sm text-muted-foreground">
                  Seamless integration with existing customer portals and systems
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-black border-border">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Enterprise Support</h4>
                <p className="text-sm text-muted-foreground">
                  Dedicated technical support and custom feature development
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}
