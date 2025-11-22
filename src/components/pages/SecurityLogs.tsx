import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { securityLogsStats, securityLogs } from "@/data/monitoringMockData";
import { Search, Download } from "lucide-react";

export const SecurityLogs = () => {
  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, "default" | "destructive" | "secondary"> = {
      Warning: "default",
      Critical: "destructive",
      Info: "secondary",
    };
    return <Badge variant={variants[severity] || "secondary"}>{severity}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="text-sm text-muted-foreground mb-2">
          <a href="#" className="hover:underline">Dashboard</a> / <a href="#" className="hover:underline">Monitoring & Audit</a> / Security Event Logs
        </div>
        <h1 className="text-3xl font-bold mb-2">Security Event Logs</h1>
        <p className="text-muted-foreground">
          Monitor security events and potential threats.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Events Today</div>
            <div className="text-3xl font-bold">{securityLogsStats.eventsToday}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Threats Detected</div>
            <div className="text-3xl font-bold text-destructive">{securityLogsStats.threatsDetected}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Blocked IPs</div>
            <div className="text-3xl font-bold">{securityLogsStats.blockedIPs}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Security Alerts</div>
            <div className="text-3xl font-bold">{securityLogsStats.securityAlerts}</div>
          </CardHeader>
        </Card>
      </div>

      {/* Security Logs */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Security Event Logs</CardTitle>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search security events..." className="pl-8 w-full md:w-[300px]" />
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
              <Button variant="outline">Clear Filters</Button>
            </div>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            <Button variant="default" size="sm">All Events</Button>
            <Button variant="outline" size="sm">Threats Only</Button>
            <Button variant="outline" size="sm">Blocked IPs</Button>
            <Button variant="outline" size="sm">Security Alerts</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Source IP</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {securityLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell>{log.eventType}</TableCell>
                  <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                  <TableCell className="font-mono text-sm">{log.sourceIP}</TableCell>
                  <TableCell>{log.description}</TableCell>
                  <TableCell>{log.status}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Details
                      </Button>
                      {log.status === "Blocked" && (
                        <Button variant="link" size="sm" className="h-auto p-0">
                          Unblock
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Security Events by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground italic">Chart visualization</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
