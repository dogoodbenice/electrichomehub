import { useQuery } from "@tanstack/react-query";
import { Upload, FileText, Download, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UploadZone from "@/components/documentation/upload-zone";
import type { Document } from "@shared/schema";

export default function Documentation() {
  const { data: documents, isLoading } = useQuery<Document[]>({
    queryKey: ["/api/documents"],
  });

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "manual":
        return <FileText className="w-5 h-5" />;
      case "warranty":
        return <Tag className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case "manual":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "warranty":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Device Documents</h2>
        <Button 
          className="bg-brand-red hover:bg-red-600"
          onClick={() => window.location.href = '/electrichomehub/documentation.html'}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>
      
      <UploadZone />
      
      {/* Documents List */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Document Library</h3>
        
        {isLoading ? (
          <div className="text-center py-8">Loading documents...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents?.map((document) => (
              <Card key={document.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {getDocumentIcon(document.type)}
                      <CardTitle className="text-sm font-medium truncate">
                        {document.name}
                      </CardTitle>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className={getDocumentTypeColor(document.type)}>
                        {document.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {document.category}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      {document.uploadDate ? new Date(document.uploadDate).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {documents?.length === 0 && !isLoading && (
          <div className="text-center py-8 text-muted-foreground">
            No documents uploaded yet. Upload your first device manual or warranty document above.
          </div>
        )}
      </div>
    </div>
  );
}
