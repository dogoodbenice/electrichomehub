import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Dashboard from "@/pages/dashboard";
import DeviceTracking from "@/pages/device-tracking";
import Documentation from "@/pages/documentation";
import IssueMonitoring from "@/pages/issue-monitoring";
import DeveloperAPI from "@/pages/developer-api";
import DataExport from "@/pages/data-export";
import FAQ from "@/pages/faq";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";
import { getBasePath } from "./lib/staticData";

const basePath = getBasePath();
const isGitHubPages = window.location.hostname.includes('github.io');

function Router() {
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    // Check for intended route stored by 404 page
    const intendedRoute = sessionStorage.getItem('intended-route');
    if (intendedRoute) {
      sessionStorage.removeItem('intended-route');
      setLocation(intendedRoute);
    }
  }, [setLocation]);

  return (
    <WouterRouter>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/tracking" component={DeviceTracking} />
        <Route path="/documentation" component={Documentation} />
        <Route path="/monitoring" component={IssueMonitoring} />
        <Route path="/developer" component={DeveloperAPI} />
        <Route path="/data-export" component={DataExport} />
        <Route path="/faq" component={FAQ} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-black text-white flex flex-col">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
