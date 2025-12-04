import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { predictiveAnalytics, earlyWarningIndicators, riskScoringHistory } from "@/data/riskManagementMockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, AlertTriangle, Brain, Target, RefreshCw, Download, Bell, Activity } from "lucide-react";

export const PredictiveAnalytics = () => {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-600 text-white';
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
            Dashboard / Risk Management / Predictive Analytics
          </div>
          <h1 className="text-3xl font-bold">Predictive Analytics</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered risk predictions with early warning indicators and trend analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Model
          </Button>
          <Button className="bg-gold text-black hover:bg-gold/90">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Model Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Model Accuracy</div>
                <div className="text-3xl font-bold text-green-600">{predictiveAnalytics.modelAccuracy}%</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Data Points</div>
                <div className="text-3xl font-bold text-gold">{predictiveAnalytics.dataPoints.toLocaleString()}</div>
              </div>
              <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-gold" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Active Warnings</div>
                <div className="text-3xl font-bold text-orange-500">{earlyWarningIndicators.length}</div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">High Risk Predictions</div>
                <div className="text-3xl font-bold text-red-600">{predictiveAnalytics.highRiskPredictions.length}</div>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Risk Score Trend & Projections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={predictiveAnalytics.projectedRiskTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[45, 70]} />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="actual" 
                stroke="#d4af37" 
                fill="#d4af37" 
                fillOpacity={0.3}
                name="Actual Risk Score"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="projected" 
                stroke="#ef4444" 
                fill="#ef4444"
                fillOpacity={0.2}
                name="Projected Risk Score"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Early Warning Indicators */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Early Warning Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entity</TableHead>
                  <TableHead>Indicator</TableHead>
                  <TableHead className="text-center">Change</TableHead>
                  <TableHead className="text-center">Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {earlyWarningIndicators.map((indicator) => (
                  <TableRow key={indicator.id}>
                    <TableCell className="font-medium">{indicator.entity}</TableCell>
                    <TableCell className="text-sm">{indicator.indicator}</TableCell>
                    <TableCell className="text-center">
                      <span className="text-red-600 font-bold">{indicator.change}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={getPriorityBadge(indicator.priority)}>{indicator.priority}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* High Risk Predictions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              High Risk Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictiveAnalytics.highRiskPredictions.map((prediction, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{prediction.entity}</span>
                    <Badge className="bg-red-100 text-red-600">{prediction.probability}% probability</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                    <div>
                      <span className="text-muted-foreground">Current: </span>
                      <span className="font-medium">{prediction.currentScore}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Predicted: </span>
                      <span className="font-medium text-red-600">{prediction.predictedScore}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Timeframe: </span>
                      <span className="font-medium">{prediction.timeframe}</span>
                    </div>
                  </div>
                  <Progress value={prediction.probability} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historical Risk Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Historical Risk Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskScoringHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="extremeCount" stroke="#dc2626" name="Extreme" strokeWidth={2} />
              <Line type="monotone" dataKey="highCount" stroke="#f97316" name="High" strokeWidth={2} />
              <Line type="monotone" dataKey="mediumCount" stroke="#eab308" name="Medium" strokeWidth={2} />
              <Line type="monotone" dataKey="lowCount" stroke="#22c55e" name="Low" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
