import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auditEntities, riskDistribution, riskScoringHistory, earlyWarningIndicators, predictiveAnalytics } from "@/data/riskManagementMockData";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";
import { Download, RefreshCw, Shield, AlertTriangle, TrendingUp, Activity, FileText, Printer } from "lucide-react";

export const RiskDashboard = () => {
  const pieData = [
    { name: 'Extreme', value: riskDistribution.extreme, color: '#dc2626' },
    { name: 'High', value: riskDistribution.high, color: '#f97316' },
    { name: 'Medium', value: riskDistribution.medium, color: '#eab308' },
    { name: 'Low', value: riskDistribution.low, color: '#22c55e' },
  ];

  const topRiskEntities = auditEntities
    .sort((a, b) => b.overallRiskScore - a.overallRiskScore)
    .slice(0, 10);

  const categoryRiskData = [...new Set(auditEntities.map(e => e.category))].map(category => {
    const entities = auditEntities.filter(e => e.category === category);
    const avgScore = entities.reduce((sum, e) => sum + e.overallRiskScore, 0) / entities.length;
    return {
      category,
      avgScore: Math.round(avgScore * 10) / 10,
      count: entities.length,
    };
  });

  const getRiskBadgeClass = (level: string) => {
    switch (level) {
      case 'Extreme': return 'bg-red-600 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-black';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground mb-2">
            Dashboard / Risk Management / Risk Dashboard
          </div>
          <h1 className="text-3xl font-bold">Risk Management Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Executive overview of organizational risk posture with export capabilities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print Report
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button className="bg-gold text-black hover:bg-gold/90">
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Total Entities</div>
                <div className="text-3xl font-bold">{auditEntities.length}</div>
              </div>
              <Shield className="h-8 w-8 text-gold" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Extreme Risk</div>
                <div className="text-3xl font-bold text-red-600">{riskDistribution.extreme}</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">High Risk</div>
                <div className="text-3xl font-bold text-orange-500">{riskDistribution.high}</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Medium Risk</div>
                <div className="text-3xl font-bold text-yellow-600">{riskDistribution.medium}</div>
              </div>
              <Activity className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Low Risk</div>
                <div className="text-3xl font-bold text-green-600">{riskDistribution.low}</div>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Trend Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Risk Trend Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={riskScoringHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avgScore" stroke="#d4af37" name="Avg Score" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Risk Entities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-500" />
              Top 10 High Risk Entities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead className="text-center">Score</TableHead>
                  <TableHead className="text-center">Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topRiskEntities.map((entity, index) => (
                  <TableRow key={entity.id}>
                    <TableCell className="font-bold">{index + 1}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{entity.name}</div>
                        <div className="text-xs text-muted-foreground">{entity.id}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-bold">{entity.overallRiskScore}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={getRiskBadgeClass(entity.riskLevel)}>{entity.riskLevel}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Category Risk Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Risk by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={categoryRiskData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="category" type="category" width={100} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="avgScore" fill="#d4af37" name="Avg Risk Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Early Warnings Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Active Early Warning Indicators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {earlyWarningIndicators.slice(0, 4).map((warning) => (
              <div key={warning.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={warning.priority === 'Critical' ? 'bg-red-600 text-white' : 'bg-orange-500 text-white'}>
                    {warning.priority}
                  </Badge>
                  <span className="text-red-600 font-bold">{warning.change}</span>
                </div>
                <div className="font-medium text-sm">{warning.entity}</div>
                <div className="text-xs text-muted-foreground mt-1">{warning.indicator}</div>
                <div className="text-xs text-muted-foreground mt-2">Period: {warning.period}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Model Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Predictive Model Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-sm text-muted-foreground">Model Accuracy</div>
              <div className="text-2xl font-bold text-green-600">{predictiveAnalytics.modelAccuracy}%</div>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-sm text-muted-foreground">Data Points Analyzed</div>
              <div className="text-2xl font-bold">{predictiveAnalytics.dataPoints.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-sm text-muted-foreground">Last Model Update</div>
              <div className="text-2xl font-bold">{predictiveAnalytics.lastModelUpdate}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-sm text-muted-foreground">High Risk Predictions</div>
              <div className="text-2xl font-bold text-red-600">{predictiveAnalytics.highRiskPredictions.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
