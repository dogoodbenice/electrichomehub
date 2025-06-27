import { AlertCircle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface BackendUnavailableProps {
  title?: string;
  message?: string;
  showDeveloperLink?: boolean;
}

export default function BackendUnavailable({ 
  title = "Backend Connection Required",
  message = "This feature requires a backend server to access real device data, documentation, and monitoring capabilities.",
  showDeveloperLink = true
}: BackendUnavailableProps) {
  return (
    <div className="flex justify-center items-center min-h-[400px] p-4">
      <Card className="max-w-lg w-full bg-card border-border">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-brand-red" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            {message}
          </p>
          
          {showDeveloperLink && (
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">
                Learn how to connect your own data sources:
              </p>
              <Link href="/developer">
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Developer API Documentation
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}