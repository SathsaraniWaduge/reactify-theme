import { dashboardStats, recentAudits } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Integrated Audit Management System
        </p>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)] transition-all duration-300 cursor-pointer group hover:scale-105">
          <CardContent className="p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold to-gold-rich opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="text-sm text-muted-foreground group-hover:text-black transition-colors">
                Total Audits
              </div>
              <div className="text-3xl font-bold text-gold group-hover:text-black transition-colors mt-2">
                {dashboardStats.totalAudits}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)] transition-all duration-300 cursor-pointer group hover:scale-105">
          <CardContent className="p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold to-gold-rich opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="text-sm text-muted-foreground group-hover:text-black transition-colors">
                Active Audits
              </div>
              <div className="text-3xl font-bold text-gold group-hover:text-black transition-colors mt-2">
                {dashboardStats.activeAudits}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)] transition-all duration-300 cursor-pointer group hover:scale-105">
          <CardContent className="p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold to-gold-rich opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="text-sm text-muted-foreground group-hover:text-black transition-colors">
                High Risk
              </div>
              <div className="text-3xl font-bold text-gold group-hover:text-black transition-colors mt-2">
                {dashboardStats.highRiskAudits}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)] transition-all duration-300 cursor-pointer group hover:scale-105">
          <CardContent className="p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold to-gold-rich opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="text-sm text-muted-foreground group-hover:text-black transition-colors">
                Pending Review
              </div>
              <div className="text-3xl font-bold text-gold group-hover:text-black transition-colors mt-2">
                {dashboardStats.pendingReview}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Audit Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-r from-gold/10 to-gold-light/10 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-16 w-16 text-gold mx-auto mb-4" />
                <p className="text-muted-foreground">Chart visualization area</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black text-white">
          <CardHeader>
            <CardTitle className="text-gold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20 text-white">
              New Audit
            </Button>
            <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20 text-white">
              Risk Assessment
            </Button>
            <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20 text-white">
              Generate Report
            </Button>
            <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20 text-white">
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Audits */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Audits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Audit ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Entity
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Risk
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentAudits.map((audit) => (
                  <tr key={audit.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{audit.id}</td>
                    <td className="py-3 px-4">{audit.entity}</td>
                    <td className="py-3 px-4">{audit.type}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={
                          audit.status === "Completed"
                            ? "bg-success/10 text-success"
                            : "bg-warning/10 text-warning"
                        }
                      >
                        {audit.status === "Completed" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {audit.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={
                          audit.risk === "High"
                            ? "bg-destructive/10 text-destructive"
                            : audit.risk === "Medium"
                            ? "bg-warning/10 text-warning"
                            : "bg-success/10 text-success"
                        }
                      >
                        {audit.risk === "High" && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {audit.risk}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
