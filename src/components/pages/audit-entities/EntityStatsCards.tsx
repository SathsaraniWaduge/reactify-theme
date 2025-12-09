import { Card, CardContent } from "@/components/ui/card";
import { Building2, Server, Users, AlertTriangle, CheckCircle, Clock, TrendingUp, Shield } from "lucide-react";
import { getEntityStats } from "@/data/auditEntitiesMockData";

export const EntityStatsCards = () => {
  const stats = getEntityStats();

  const cards = [
    { 
      label: "Total Entities", 
      value: stats.total, 
      icon: Building2, 
      color: "text-primary",
      bgColor: "bg-primary/10" 
    },
    { 
      label: "Extreme Risk", 
      value: stats.byRisk.extreme, 
      icon: AlertTriangle, 
      color: "text-destructive",
      bgColor: "bg-destructive/10" 
    },
    { 
      label: "High Risk", 
      value: stats.byRisk.high, 
      icon: TrendingUp, 
      color: "text-warning",
      bgColor: "bg-warning/10" 
    },
    { 
      label: "Medium Risk", 
      value: stats.byRisk.medium, 
      icon: Shield, 
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10" 
    },
    { 
      label: "Low Risk", 
      value: stats.byRisk.low, 
      icon: CheckCircle, 
      color: "text-success",
      bgColor: "bg-success/10" 
    },
    { 
      label: "Compliant", 
      value: stats.byCompliance.compliant, 
      icon: CheckCircle, 
      color: "text-success",
      bgColor: "bg-success/10" 
    },
    { 
      label: "Pending Review", 
      value: stats.byCompliance.pending, 
      icon: Clock, 
      color: "text-muted-foreground",
      bgColor: "bg-muted" 
    },
    { 
      label: "Upcoming Audits", 
      value: stats.upcomingAudits, 
      icon: Clock, 
      color: "text-primary",
      bgColor: "bg-primary/10" 
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {cards.map((card) => (
        <Card key={card.label} className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-primary/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </div>
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="text-xs text-muted-foreground">{card.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
