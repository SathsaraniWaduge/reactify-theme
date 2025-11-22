import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Download } from "lucide-react";

export const AuditTrails = () => {
  const auditTrailLogs = [
    {
      timestamp: "2025-09-07 10:45:22",
      user: "A. Silva",
      action: "Create Audit",
      resource: "AUD-2024-009",
      details: "Created new compliance audit",
      ipAddress: "192.168.1.105",
      result: "Success",
    },
    {
      timestamp: "2025-09-07 10:30:15",
      user: "K. Perera",
      action: "Update",
      resource: "AUD-2024-005",
      details: "Updated audit findings",
      ipAddress: "192.168.1.110",
      result: "Success",
    },
    {
      timestamp: "2025-09-07 10:15:47",
      user: "N. Fernando",
      action: "Delete",
      resource: "USR-045",
      details: "Deleted inactive user account",
      ipAddress: "192.168.1.115",
      result: "Success",
    },
    {
      timestamp: "2025-09-07 09:45:33",
      user: "Unknown",
      action: "Login Attempt",
      resource: "System",
      details: "Failed login attempt",
      ipAddress: "192.168.1.200",
      result: "Failed",
    },
    {
      timestamp: "2025-09-07 09:30:18",
      user: "A. Silva",
      action: "Export",
      resource: "REPORT-2024-Q3",
      details: "Exported quarterly report",
      ipAddress: "192.168.1.105",
      result: "Success",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="text-sm text-muted-foreground mb-2">
          <a href="#" className="hover:underline">Dashboard</a> / <a href="#" className="hover:underline">Security & Compliance</a> / Audit Trails
        </div>
        <h1 className="text-3xl font-bold mb-2">Audit Trails</h1>
        <p className="text-muted-foreground">
          Complete audit trail of all system activities for compliance, security monitoring, and forensic analysis.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Events Today</div>
            <div className="text-3xl font-bold">1,245</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Successful Actions</div>
            <div className="text-3xl font-bold">1,198</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Failed Actions</div>
            <div className="text-3xl font-bold text-destructive">47</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Unique Users</div>
            <div className="text-3xl font-bold">68</div>
          </CardHeader>
        </Card>
      </div>

      {/* Audit Trail Logs */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Audit Trail Logs</CardTitle>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search logs..." className="pl-8 w-full md:w-[300px]" />
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditTrailLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="font-mono text-sm">{log.resource}</TableCell>
                  <TableCell>{log.details}</TableCell>
                  <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                  <TableCell>
                    <Badge variant={log.result === "Success" ? "secondary" : "destructive"}>
                      {log.result}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
