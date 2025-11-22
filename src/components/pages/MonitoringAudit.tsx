import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { monitoringStats, recentMonitoringEvents } from "@/data/monitoringMockData";
import { Activity, Shield, AlertTriangle, Server } from "lucide-react";

export const MonitoringAudit = () => {
  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, "default" | "destructive" | "secondary"> = {
      Info: "secondary",
      Warning: "default",
      Error: "destructive",
    };
    return <Badge variant={variants[severity] || "secondary"}>{severity}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="text-sm text-muted-foreground mb-2">
          <a href="#" className="hover:underline">Dashboard</a> / Monitoring & Audit
        </div>
        <h1 className="text-3xl font-bold mb-2">Monitoring & Audit</h1>
        <p className="text-muted-foreground">
          Monitor system activity, audit user actions, track security events, and analyze usage patterns.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Sessions</CardDescription>
            <CardTitle className="text-3xl">{monitoringStats.activeSessions}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Security Events</CardDescription>
            <CardTitle className="text-3xl text-amber-600">{monitoringStats.securityEvents}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Failed Logins</CardDescription>
            <CardTitle className="text-3xl">{monitoringStats.failedLogins}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>System Errors</CardDescription>
            <CardTitle className="text-3xl">{monitoringStats.systemErrors}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Sub-navigation */}
      <div className="flex gap-2 flex-wrap border-b pb-2">
        <Link to="/activity-logs">
          <Button variant="outline">Activity Logs</Button>
        </Link>
        <Link to="/action-trail">
          <Button variant="outline">Action Trail</Button>
        </Link>
        <Link to="/security-logs">
          <Button variant="outline">Security Logs</Button>
        </Link>
        <Link to="/login-sessions">
          <Button variant="outline">Login Sessions</Button>
        </Link>
        <Link to="/usage-analytics">
          <Button variant="outline">Usage Analytics</Button>
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/activity-logs">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">System Activity Logs</CardTitle>
              </div>
              <CardDescription>Monitor system events, errors, and performance metrics.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <div><strong>Events Today:</strong> 1,245</div>
                <div><strong>Errors:</strong> 0</div>
              </div>
              <Button variant="link" className="px-0 mt-2">
                View Logs →
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/action-trail">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">User Action Trail</CardTitle>
              </div>
              <CardDescription>Track user actions and changes made in the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <div><strong>Actions Today:</strong> 856</div>
                <div><strong>Critical Actions:</strong> 12</div>
              </div>
              <Button variant="link" className="px-0 mt-2">
                View Trail →
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/security-logs">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Security Event Logs</CardTitle>
              </div>
              <CardDescription>Monitor security events and potential threats.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <div><strong>Events Today:</strong> 7</div>
                <div><strong>Threats Detected:</strong> 2</div>
              </div>
              <Button variant="link" className="px-0 mt-2">
                View Logs →
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/login-sessions">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Login Sessions</CardTitle>
              </div>
              <CardDescription>Track login attempts and active user sessions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <div><strong>Active Sessions:</strong> 42</div>
                <div><strong>Failed Attempts:</strong> 3</div>
              </div>
              <Button variant="link" className="px-0 mt-2">
                View Sessions →
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/usage-analytics">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Usage Analytics</CardTitle>
              </div>
              <CardDescription>Analyze system usage patterns and performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <div><strong>Active Users:</strong> 38</div>
                <div><strong>Peak Usage:</strong> 10:30 AM</div>
              </div>
              <Button variant="link" className="px-0 mt-2">
                View Analytics →
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Monitoring Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Monitoring Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentMonitoringEvents.map((event, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm">{event.time}</TableCell>
                  <TableCell>{event.eventType}</TableCell>
                  <TableCell>{event.source}</TableCell>
                  <TableCell>{event.details}</TableCell>
                  <TableCell>{getSeverityBadge(event.severity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
