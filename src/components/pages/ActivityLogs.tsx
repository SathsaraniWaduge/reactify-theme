import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { activityLogsStats, activityLogs } from "@/data/monitoringMockData";
import { Search, Download } from "lucide-react";

export const ActivityLogs = () => {
  const getLevelBadge = (level: string) => {
    const variants: Record<string, "default" | "destructive" | "secondary"> = {
      Info: "secondary",
      Warning: "default",
      Error: "destructive",
    };
    return <Badge variant={variants[level] || "secondary"}>{level}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="text-sm text-muted-foreground mb-2">
          <a href="#" className="hover:underline">Dashboard</a> / <a href="#" className="hover:underline">Monitoring & Audit</a> / System Activity & Error Logs
        </div>
        <h1 className="text-3xl font-bold mb-2">System Activity & Error Logs</h1>
        <p className="text-muted-foreground">
          Monitor system events, errors, and performance metrics.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Events Today</div>
            <div className="text-3xl font-bold">{activityLogsStats.eventsToday}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Errors</div>
            <div className="text-3xl font-bold">{activityLogsStats.errors}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Warnings</div>
            <div className="text-3xl font-bold">{activityLogsStats.warnings}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Critical Events</div>
            <div className="text-3xl font-bold">{activityLogsStats.criticalEvents}</div>
          </CardHeader>
        </Card>
      </div>

      {/* Activity Logs */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>System Activity Logs</CardTitle>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search logs..." className="pl-8 w-full md:w-[300px]" />
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">Clear Filters</Button>
            </div>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            <Button variant="default" size="sm">All Events</Button>
            <Button variant="outline" size="sm">Errors Only</Button>
            <Button variant="outline" size="sm">Warnings Only</Button>
            <Button variant="outline" size="sm">Critical Events</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell>{getLevelBadge(log.level)}</TableCell>
                  <TableCell>{log.source}</TableCell>
                  <TableCell>{log.event}</TableCell>
                  <TableCell>{log.details}</TableCell>
                  <TableCell>
                    <Button variant="link" size="sm" className="h-auto p-0">
                      Details
                    </Button>
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
          <CardTitle>Event Distribution by Type</CardTitle>
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
