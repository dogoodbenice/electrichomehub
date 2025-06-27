import { Activity, ShieldCheck, Folder, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardStats } from "@/lib/types";

interface StatsGridProps {
  stats: DashboardStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const statItems = [
    {
      title: "Total Devices",
      value: stats.totalDevices,
      icon: Activity,
      color: "text-brand-red"
    },
    {
      title: "Active Warranties",
      value: stats.activeWarranties,
      icon: ShieldCheck,
      color: "text-green-500"
    },
    {
      title: "Documents",
      value: stats.totalDocuments,
      icon: Folder,
      color: "text-blue-500"
    },
    {
      title: "Active Alerts",
      value: stats.activeAlerts,
      icon: AlertCircle,
      color: stats.activeAlerts > 0 ? "text-brand-red alert-pulse" : "text-green-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item) => (
        <Card key={item.title} className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{item.title}</p>
                <p className={`text-2xl font-bold ${item.value > 0 && item.title === "Active Alerts" ? "text-brand-red" : ""}`}>
                  {item.value}
                </p>
              </div>
              <item.icon className={`w-8 h-8 ${item.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
