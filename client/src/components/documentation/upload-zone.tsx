import { useState } from "react";
import { UploadCloud, FileText, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UploadZone() {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file upload logic here
    console.log('Files dropped:', e.dataTransfer.files);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Upload Zone */}
      <div className="lg:col-span-1">
        <Card 
          className={`bg-card border-2 border-dashed transition-colors ${
            isDragOver ? 'border-brand-red' : 'border-border'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CardContent className="p-8 text-center">
            <UploadCloud className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Drag and drop files or click to browse
            </p>
            <Button className="bg-brand-red hover:bg-red-600">
              Choose Files
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Document Categories */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-brand-red" />
              <span>User Manuals</span>
              <span className="text-sm text-muted-foreground ml-auto">24 files</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm">Samsung RF28R7351 User Manual.pdf</span>
              <Button variant="ghost" size="sm" className="text-brand-red hover:text-red-600">
                View
              </Button>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm">Nest Learning Thermostat Guide.pdf</span>
              <Button variant="ghost" size="sm" className="text-brand-red hover:text-red-600">
                View
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-brand-red" />
              <span>Service Records</span>
              <span className="text-sm text-muted-foreground ml-auto">12 files</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm">HVAC Annual Maintenance 2024.pdf</span>
              <Button variant="ghost" size="sm" className="text-brand-red hover:text-red-600">
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
