import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, Server, MapPin, Users, AlertTriangle, CheckCircle, 
  Clock, TrendingUp, Activity, FileText, Landmark, Briefcase
} from "lucide-react";
import { getEntityStats, AuditEntity } from "@/data/auditEntitiesMockData";
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area
} from "recharts";

interface EntityDashboardWidgetsProps {
  entities: AuditEntity[];
  onDrillDown: (filter: { type: string; value: string }) => void;
}

const RISK_COLORS = {
  CRITICAL: '#dc2626',
  HIGH: '#f97316',
  MEDIUM: '#eab308',
  LOW: '#22c55e',
};

const TYPE_COLORS = {
  Bank: '#6366f1',
  HOD: '#8b5cf6',
  PO: '#06b6d4',
  Branch: '#10b981',
  System: '#f59e0b',
  ISL: '#ec4899',
};

const TEAM_COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#ef4444'];

export const EntityDashboardWidgets = ({ entities, onDrillDown }: EntityDashboardWidgetsProps) => {
  const stats = getEntityStats();

  // Prepare chart data
  const typeDistributionData = Object.entries(stats.byType).map(([name, value]) => ({
    name,
    value,
    color: TYPE_COLORS[name as keyof typeof TYPE_COLORS],
  }));

  const riskDistributionData = Object.entries(stats.byRisk).map(([name, value]) => ({
    name,
    value,
    color: RISK_COLORS[name as keyof typeof RISK_COLORS],
  }));

  const teamAllocationData = Object.entries(stats.byTeam).map(([name, value]) => ({
    name,
    value,
  }));

  const costCentreData = Object.entries(stats.byCostCentre)
    .filter(([_, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name, value }));

  const auditTimelineData = [
    { month: 'Jan', completed: 8, scheduled: 12, overdue: 2 },
    { month: 'Feb', completed: 10, scheduled: 10, overdue: 1 },
    { month: 'Mar', completed: 12, scheduled: 15, overdue: 3 },
    { month: 'Apr', completed: 9, scheduled: 11, overdue: 2 },
    { month: 'May', completed: 11, scheduled: 14, overdue: 1 },
    { month: 'Jun', completed: 7, scheduled: 10, overdue: 4 },
  ];

  const sizeDistributionData = Object.entries(stats.bySize).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="space-y-6">
      {/* Summary Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-primary"
          onClick={() => onDrillDown({ type: 'all', value: 'all' })}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Total Entities</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Landmark className="h-8 w-8 text-primary opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-destructive"
          onClick={() => onDrillDown({ type: 'risk', value: 'CRITICAL' })}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Critical Risk</p>
                <p className="text-2xl font-bold text-destructive">{stats.byRisk.CRITICAL}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-orange-500"
          onClick={() => onDrillDown({ type: 'risk', value: 'HIGH' })}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">High Risk</p>
                <p className="text-2xl font-bold text-orange-500">{stats.byRisk.HIGH}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-yellow-500"
          onClick={() => onDrillDown({ type: 'status', value: 'Active' })}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Active Entities</p>
                <p className="text-2xl font-bold">{stats.byStatus.Active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-red-400"
          onClick={() => onDrillDown({ type: 'overdue', value: 'true' })}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Overdue Audits</p>
                <p className="text-2xl font-bold text-red-500">{stats.overdueAudits}</p>
              </div>
              <Clock className="h-8 w-8 text-red-400 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-blue-400"
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Open Findings</p>
                <p className="text-2xl font-bold text-blue-500">{stats.openFindings}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-400 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Entity Type Distribution */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Entity Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    onClick={(data) => onDrillDown({ type: 'entityType', value: data.name })}
                    className="cursor-pointer"
                  >
                    {typeDistributionData.map((entry, index) => (
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
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {typeDistributionData.map((item) => (
                <Badge 
                  key={item.name}
                  variant="outline"
                  className="cursor-pointer hover:bg-accent text-xs"
                  style={{ borderColor: item.color, color: item.color }}
                  onClick={() => onDrillDown({ type: 'entityType', value: item.name })}
                >
                  {item.name}: {item.value}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Overview */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Risk Level Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskDistributionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis type="number" fontSize={11} />
                  <YAxis dataKey="name" type="category" width={70} fontSize={11} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[0, 4, 4, 0]}
                    onClick={(data) => onDrillDown({ type: 'risk', value: data.name })}
                    className="cursor-pointer"
                  >
                    {riskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {riskDistributionData.map((item) => (
                <div 
                  key={item.name}
                  className="flex items-center justify-between p-2 rounded-md bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => onDrillDown({ type: 'risk', value: item.name })}
                >
                  <span className="text-xs font-medium">{item.name}</span>
                  <Badge 
                    className="text-xs"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.value}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audit Team Allocation */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Users className="h-4 w-4" />
              Audit Team Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamAllocationData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" fontSize={10} angle={-45} textAnchor="end" height={50} />
                  <YAxis fontSize={11} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                    onClick={(data) => onDrillDown({ type: 'team', value: data.name })}
                    className="cursor-pointer"
                  >
                    {teamAllocationData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={TEAM_COLORS[index % TEAM_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audit Coverage Timeline */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Audit Coverage Timeline (2025)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={auditTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" fontSize={11} />
                  <YAxis fontSize={11} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="scheduled" 
                    stackId="1"
                    stroke="#6366f1" 
                    fill="#6366f1" 
                    fillOpacity={0.3}
                    name="Scheduled"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="completed" 
                    stackId="2"
                    stroke="#22c55e" 
                    fill="#22c55e" 
                    fillOpacity={0.6}
                    name="Completed"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="overdue" 
                    stackId="3"
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.6}
                    name="Overdue"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Cost Centre Analysis */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Cost Centre Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costCentreData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" fontSize={11} />
                  <YAxis fontSize={11} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`${value} entities`, 'Count']}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                    onClick={(data) => onDrillDown({ type: 'costCentre', value: data.name })}
                    className="cursor-pointer"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {costCentreData.slice(0, 4).map((item, index) => (
                <Badge 
                  key={item.name}
                  variant="secondary"
                  className="text-xs cursor-pointer hover:bg-accent"
                  onClick={() => onDrillDown({ type: 'costCentre', value: item.name })}
                >
                  CC {item.name}: {item.value}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Entity Size & Status Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Entity Size Breakdown */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Entity Size Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(stats.bySize).map(([size, count]) => (
              <div 
                key={size}
                className="flex items-center justify-between p-2 rounded bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                onClick={() => onDrillDown({ type: 'size', value: size })}
              >
                <span className="text-sm font-medium">{size}</span>
                <Badge variant="outline">{count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Status Overview */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Status Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <div 
                key={status}
                className="flex items-center justify-between p-2 rounded bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                onClick={() => onDrillDown({ type: 'status', value: status })}
              >
                <span className="text-sm font-medium">{status}</span>
                <Badge 
                  variant={status === 'Active' ? 'default' : status === 'Deactivated' ? 'destructive' : 'secondary'}
                >
                  {count}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Metrics */}
        <Card className="hover:shadow-lg transition-shadow col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Audit Metrics Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-xs text-muted-foreground">Total Findings</p>
                <p className="text-xl font-bold text-blue-500">{stats.totalFindings}</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="text-xs text-muted-foreground">Open Findings</p>
                <p className="text-xl font-bold text-orange-500">{stats.openFindings}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="text-xs text-muted-foreground">Pending Actions</p>
                <p className="text-xl font-bold text-purple-500">{stats.pendingActions}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-xs text-muted-foreground">Upcoming Audits</p>
                <p className="text-xl font-bold text-green-500">{stats.upcomingAudits}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
