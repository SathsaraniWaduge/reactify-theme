import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, CheckCircle, Clock, BarChart3, Users } from "lucide-react";
import { enhancedDashboardStats } from "@/data/dashboardMockData";
import { AdvancedSearch, SearchFilters } from "@/components/dashboard/AdvancedSearch";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AuditProgressChart } from "@/components/dashboard/AuditProgressChart";
import { RecentAuditsTable } from "@/components/dashboard/RecentAuditsTable";

export const Dashboard = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    status: "",
    category: "",
    dateFrom: undefined,
    dateTo: undefined,
  });

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const stats = [
    {
      label: "Total Audits",
      value: enhancedDashboardStats.totalAudits,
      icon: BarChart3,
      trend: "+12%",
      trendUp: true,
    },
    {
      label: "Active Audits",
      value: enhancedDashboardStats.activeAudits,
      icon: Clock,
      trend: "+5",
      trendUp: true,
    },
    {
      label: "High Risk",
      value: enhancedDashboardStats.highRiskAudits,
      icon: AlertTriangle,
      trend: "-3",
      trendUp: false,
    },
    {
      label: "Pending Review",
      value: enhancedDashboardStats.pendingReview,
      icon: CheckCircle,
      trend: "-2",
      trendUp: false,
    },
    {
      label: "Compliance Rate",
      value: `${enhancedDashboardStats.complianceRate}%`,
      icon: TrendingUp,
      trend: "+1.2%",
      trendUp: true,
    },
    {
      label: "Auditors Assigned",
      value: enhancedDashboardStats.auditorsAssigned,
      icon: Users,
      trend: "+3",
      trendUp: true,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the BOC Integrated Audit Management System
        </p>
      </div>

      {/* Advanced Search */}
      <AdvancedSearch onSearch={handleSearch} />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <span
                    className={`text-xs font-medium ${
                      stat.trendUp ? "text-success" : "text-destructive"
                    }`}
                  >
                    {stat.trend}
                  </span>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AuditProgressChart />
        <QuickActions />
      </div>

      {/* Recent Audits Table */}
      <RecentAuditsTable filters={filters} />
    </div>
  );
};
