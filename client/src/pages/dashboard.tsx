import { useQuery } from "@tanstack/react-query";
import { Smartphone, FileText, AlertTriangle, Zap, Globe, Shield, Code, Heart, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatsGrid from "@/components/dashboard/stats-grid";
import DeviceGrid from "@/components/devices/device-grid";
import BackendUnavailable from "@/components/ui/backend-unavailable";
import { isStaticDeployment } from "@/lib/staticData";
import type { DashboardStats } from "@/lib/types";

export default function Dashboard() {
  const { data: stats, isLoading, error } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  if (isLoading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  // Show backend unavailable message for static deployments when API fails
  if (error && isStaticDeployment()) {
    return (
      <div className="space-y-8">
        {/* Hero Section - Always show */}
        <section className="hero-dots border-b border-border relative overflow-hidden pt-[7px] pb-[7px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8 fade-in-up">
              <h1 className="text-4xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                  Electric Home Hub
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">The smart platform empowering anyone to seamlessly manage all their electric hardware</p>
            </div>

            {/* Electric Divider */}
            <div className="flex items-center justify-center my-8 fade-in-up-delay">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-brand-red"></div>
                <Zap className="w-5 h-5 text-white animate-pulse" />
                <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
                <Heart className="w-4 h-4 text-white animate-pulse" style={{animationDelay: '0.5s'}} />
                <div className="w-1 h-1 bg-brand-red/50 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <Home className="w-3 h-3 text-white animate-pulse" style={{animationDelay: '1.5s'}} />
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-brand-red"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-up-delay">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-4 icon-pulse">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Universal Compatibility</h3>
                <p className="text-muted-foreground text-sm">
                  Monitor all electric hardware in your home, regardless of manufacturer or brand
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-4 icon-pulse" style={{ animationDelay: '1s' }}>
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Centralized Control</h3>
                <p className="text-muted-foreground text-sm">
                  Store all manuals, warranties, and documentation in one secure digital repository
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-4 icon-pulse" style={{ animationDelay: '2s' }}>
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Proactive Protection</h3>
                <p className="text-muted-foreground text-sm">
                  Stay ahead with alerts for recalls, firmware updates, and emerging device issues
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Backend Unavailable Message */}
        <BackendUnavailable 
          title="Connect Your Backend"
          message="This frontend showcase demonstrates the Electric Home Hub interface. Connect a backend server to access real device data, documentation storage, and monitoring features."
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="hero-dots border-b border-border relative overflow-hidden pt-[7px] pb-[7px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8 fade-in-up">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to <span className="text-brand-red">Electric Home Hub</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">The smart platform empowering anyone to seamlessly manage all their electric hardware</p>
          </div>

          {/* Electric Divider */}
          <div className="flex items-center justify-center my-8 fade-in-up-delay">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-brand-red"></div>
              <Zap className="w-5 h-5 text-white animate-pulse" />
              <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
              <Heart className="w-4 h-4 text-white animate-pulse" style={{animationDelay: '0.5s'}} />
              <div className="w-1 h-1 bg-brand-red/50 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <Home className="w-3 h-3 text-white animate-pulse" style={{animationDelay: '1.5s'}} />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-brand-red"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-up-delay">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-4 icon-pulse">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Universal Compatibility</h3>
              <p className="text-muted-foreground text-sm">
                Monitor all electric hardware in your home, regardless of manufacturer or brand
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-4 icon-pulse" style={{ animationDelay: '1s' }}>
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Centralized Control</h3>
              <p className="text-muted-foreground text-sm">
                Store all manuals, warranties, and documentation in one secure digital repository
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-4 icon-pulse" style={{ animationDelay: '2s' }}>
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Proactive Protection</h3>
              <p className="text-muted-foreground text-sm">
                Stay ahead with alerts for recalls, firmware updates, and emerging device issues
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Developer API Call to Action */}
      <section className="bg-gradient-to-r from-black to-gray-900 border-b border-brand-red/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Build Your Own Electric Home Hub</h2>
            <p className="text-muted-foreground">Use our powerful Developer suite to create custom solutions for your customers</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="outline" 
              className="w-full bg-black border-2 border-brand-red hover:bg-brand-red/10 rounded-lg p-8 h-auto text-left transition-all duration-200 group justify-start relative overflow-hidden"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-xl font-semibold text-brand-red mb-1">Developer API Access</h3>
                  <p className="text-muted-foreground">White-label our platform and build custom Electric Home Hub solutions</p>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="destructive" className="bg-brand-red text-white px-3 py-1">
                  API
                </Badge>
              </div>
            </Button>
          </div>
        </div>
      </section>
      {/* Electric Divider */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-brand-red"></div>
          <Zap className="w-5 h-5 text-white animate-pulse" />
          <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
          <Heart className="w-4 h-4 text-white animate-pulse" style={{animationDelay: '0.5s'}} />
          <div className="w-1 h-1 bg-brand-red/50 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <Home className="w-3 h-3 text-white animate-pulse" style={{animationDelay: '1.5s'}} />
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-brand-red"></div>
        </div>
      </div>
      {/* Quick Action Buttons */}
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">Straightforward control for your own grid</h2>
            <p className="text-sm text-[#dedede]">Keep track, manage your status and keep aware of changes</p>
          </div>
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
                  <p className="text-muted-foreground text-sm">Proactive alerts for any device problems and recalls</p>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </section>
      {/* Electric Divider */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-brand-red"></div>
          <Zap className="w-5 h-5 text-white animate-pulse" />
          <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
          <Heart className="w-4 h-4 text-white animate-pulse" style={{animationDelay: '0.5s'}} />
          <div className="w-1 h-1 bg-brand-red/50 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <Home className="w-3 h-3 text-white animate-pulse" style={{animationDelay: '1.5s'}} />
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-brand-red"></div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Dashboard Overview */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your future dashboard</h2>
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
