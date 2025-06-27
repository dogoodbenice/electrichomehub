import { useQuery } from "@tanstack/react-query";
import AlertCard from "@/components/monitoring/alert-card";
import type { Alert } from "@shared/schema";

export default function IssueMonitoring() {
  const { data: alerts, isLoading } = useQuery<Alert[]>({
    queryKey: ["/api/alerts"],
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Proactive Issue Monitoring</h2>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-sm text-muted-foreground">Monitoring Active</span>
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">Loading alerts...</div>
      ) : (
        <div className="space-y-4">
          {alerts?.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
          
          {alerts?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No alerts at this time. Your devices are running smoothly!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
