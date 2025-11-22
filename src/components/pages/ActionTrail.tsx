import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { actionTrailStats, actionTrail } from "@/data/monitoringMockData";
import { Search, Download } from "lucide-react";

export const ActionTrail = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="text-sm text-muted-foreground mb-2">
          <a href="#" className="hover:underline">Dashboard</a> / <a href="#" className="hover:underline">Monitoring & Audit</a> / User Action Audit Trail
        </div>
        <h1 className="text-3xl font-bold mb-2">User Action Audit Trail</h1>
        <p className="text-muted-foreground">
          Track user actions and changes made in the system.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Actions Today</div>
            <div className="text-3xl font-bold">{actionTrailStats.actionsToday}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Critical Actions</div>
            <div className="text-3xl font-bold">{actionTrailStats.criticalActions}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Data Changes</div>
            <div className="text-3xl font-bold">{actionTrailStats.dataChanges}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Access Events</div>
            <div className="text-3xl font-bold">{actionTrailStats.accessEvents}</div>
          </CardHeader>
        </Card>
      </div>

      {/* Action Trail */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>User Action Trail</CardTitle>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search actions..." className="pl-8 w-full md:w-[300px]" />
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Trail
              </Button>
              <Button variant="outline">Clear Filters</Button>
            </div>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            <Button variant="default" size="sm">All Actions</Button>
            <Button variant="outline" size="sm">Critical Actions</Button>
            <Button variant="outline" size="sm">Data Changes</Button>
            <Button variant="outline" size="sm">Access Events</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actionTrail.map((action, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm">{action.timestamp}</TableCell>
                  <TableCell>{action.user}</TableCell>
                  <TableCell>{action.action}</TableCell>
                  <TableCell>{action.target}</TableCell>
                  <TableCell>{action.details}</TableCell>
                  <TableCell className="font-mono text-sm">{action.ipAddress}</TableCell>
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

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Actions by User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground italic">Chart visualization</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Action Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground italic">Chart visualization</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
