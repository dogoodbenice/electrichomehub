import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadZone from "@/components/documentation/upload-zone";

export default function Documentation() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Centralized Documentation</h2>
        <Button className="bg-brand-red hover:bg-red-600">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>
      
      <UploadZone />
    </div>
  );
}
