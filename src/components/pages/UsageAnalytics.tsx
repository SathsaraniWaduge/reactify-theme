import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usageAnalyticsStats, usageStatistics, userActivityDetails, featureUsageDetails, performanceMetrics } from "@/data/monitoringMockData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export const UsageAnalytics = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "secondary"> = {
      Good: "secondary",
      Warning: "default",
      Error: "destructive",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="text-sm text-muted-foreground mb-2">
          <a href="#" className="hover:underline">Dashboard</a> / <a href="#" className="hover:underline">Monitoring & Audit</a> / Usage Analytics
        </div>
        <h1 className="text-3xl font-bold mb-2">Usage Analytics</h1>
        <p className="text-muted-foreground">
          Analyze system usage patterns and performance.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Active Users</div>
            <div className="text-3xl font-bold">{usageAnalyticsStats.activeUsers}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Page Views</div>
            <div className="text-3xl font-bold">{usageAnalyticsStats.pageViews}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Avg. Session Time</div>
            <div className="text-3xl font-bold">{usageAnalyticsStats.avgSessionTime}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Peak Usage</div>
            <div className="text-3xl font-bold">{usageAnalyticsStats.peakUsage}</div>
          </CardHeader>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="user-analytics">User Analytics</TabsTrigger>
          <TabsTrigger value="feature-usage">Feature Usage</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Daily Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground italic">Chart visualization</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Page Views by Section</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground italic">Chart visualization</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Today</TableHead>
                    <TableHead>Yesterday</TableHead>
                    <TableHead>Last Week</TableHead>
                    <TableHead>Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usageStatistics.map((stat, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{stat.metric}</TableCell>
                      <TableCell>{stat.today}</TableCell>
                      <TableCell>{stat.yesterday}</TableCell>
                      <TableCell>{stat.lastWeek}</TableCell>
                      <TableCell>
                        <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                          {stat.change}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user-analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>User Activity by Role</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground italic">Chart visualization</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground italic">Chart visualization</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Activity Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Session Count</TableHead>
                    <TableHead>Total Time</TableHead>
                    <TableHead>Page Views</TableHead>
                    <TableHead>Last Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userActivityDetails.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user.user}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.sessionCount}</TableCell>
                      <TableCell>{user.totalTime}</TableCell>
                      <TableCell>{user.pageViews}</TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feature-usage" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Feature Usage Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground italic">Chart visualization</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Feature Adoption Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground italic">Chart visualization</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Feature Usage Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Usage Count</TableHead>
                    <TableHead>Avg. Time</TableHead>
                    <TableHead>Adoption Rate</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {featureUsageDetails.map((feature, index) => (
                    <TableRow key={index}>
                      <TableCell>{feature.feature}</TableCell>
                      <TableCell>{feature.users}</TableCell>
                      <TableCell>{feature.usageCount}</TableCell>
                      <TableCell>{feature.avgTime}</TableCell>
                      <TableCell>{feature.adoptionRate}</TableCell>
                      <TableCell>
                        {feature.trend === "up" && <TrendingUp className="h-4 w-4 text-green-600" />}
                        {feature.trend === "stable" && <Minus className="h-4 w-4 text-gray-600" />}
                        {feature.trend === "down" && <TrendingDown className="h-4 w-4 text-red-600" />}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Response Time Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground italic">Chart visualization</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>System Load</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground italic">Chart visualization</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Current</TableHead>
                    <TableHead>Average</TableHead>
                    <TableHead>Peak</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceMetrics.map((metric, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{metric.metric}</TableCell>
                      <TableCell>{metric.current}</TableCell>
                      <TableCell>{metric.average}</TableCell>
                      <TableCell>{metric.peak}</TableCell>
                      <TableCell>{getStatusBadge(metric.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
