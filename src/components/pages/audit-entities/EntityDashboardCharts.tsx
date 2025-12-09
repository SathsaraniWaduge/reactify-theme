import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { getEntityStats, recentEntityActivity } from "@/data/auditEntitiesMockData";
import { Activity, FileText, Users, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const EntityDashboardCharts = () => {
  const stats = getEntityStats();

  const riskDistributionData = [
    { name: 'Extreme', value: stats.byRisk.extreme, color: 'hsl(var(--destructive))' },
    { name: 'High', value: stats.byRisk.high, color: 'hsl(33 100% 35%)' },
    { name: 'Medium', value: stats.byRisk.medium, color: 'hsl(45 100% 50%)' },
    { name: 'Low', value: stats.byRisk.low, color: 'hsl(var(--success))' },
  ];

  const entityTypeData = [
    { name: 'Branches', count: stats.byType.branch, fill: 'hsl(var(--primary))' },
    { name: 'IT Systems', count: stats.byType.itSystem, fill: 'hsl(220 70% 50%)' },
    { name: 'Customers', count: stats.byType.customer, fill: 'hsl(280 70% 50%)' },
  ];

  const complianceData = [
    { name: 'Compliant', value: stats.byCompliance.compliant, color: 'hsl(var(--success))' },
    { name: 'Non-Compliant', value: stats.byCompliance.nonCompliant, color: 'hsl(var(--destructive))' },
    { name: 'Pending', value: stats.byCompliance.pending, color: 'hsl(45 100% 50%)' },
    { name: 'Remediation', value: stats.byCompliance.remediation, color: 'hsl(33 100% 35%)' },
  ];

  const trendData = [
    { month: 'Jul', entities: 42, audits: 15 },
    { month: 'Aug', entities: 44, audits: 18 },
    { month: 'Sep', entities: 46, audits: 22 },
    { month: 'Oct', entities: 48, audits: 20 },
    { month: 'Nov', entities: 49, audits: 25 },
    { month: 'Dec', entities: 50, audits: 28 },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create': return <FileText className="h-4 w-4 text-success" />;
      case 'update': return <Activity className="h-4 w-4 text-primary" />;
      case 'document': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'audit': return <Clock className="h-4 w-4 text-warning" />;
      case 'compliance': return <Users className="h-4 w-4 text-purple-500" />;
      default: return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Risk Distribution Pie Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Risk Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={riskDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {riskDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Entity Type Distribution */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Entity Types</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={entityTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Compliance Status */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Compliance Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={complianceData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {complianceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Trend Chart */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Entity & Audit Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="entities" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
              <Line type="monotone" dataKey="audits" stroke="hsl(var(--success))" strokeWidth={2} dot={{ fill: 'hsl(var(--success))' }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity Timeline */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
            {recentEntityActivity.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                <div className="mt-1">{getActivityIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.action}</p>
                  <p className="text-xs text-muted-foreground truncate">{activity.entity}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
