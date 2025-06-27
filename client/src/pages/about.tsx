import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const features = [
    "Universal device compatibility across all brands",
    "Proactive monitoring and alert system",
    "Centralized document management",
    "Developer-friendly API for integrations"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">About Electric Home Hub</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400" 
            alt="Modern technology workspace with multiple monitors and professional setup" 
            className="rounded-lg w-full h-64 object-cover"
          />
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-muted-foreground">
              Electric Home Hub was created to solve the fragmented experience of managing smart home devices from multiple manufacturers. We believe homeowners shouldn't need dozens of apps to monitor their electric appliances and systems.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2 text-muted-foreground">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-red" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Enterprise Solutions</h3>
            <p className="text-muted-foreground">
              We offer white-label solutions for appliance manufacturers, retailers, and service providers who want to offer enhanced customer experiences through our platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
