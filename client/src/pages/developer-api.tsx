import { Rocket, Code, Download, Key } from "lucide-react";
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

// Get all devices
const devices = await ehh.getDevices();`;

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
            
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400" 
              alt="Developer workspace with multiple monitors" 
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />
            
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
