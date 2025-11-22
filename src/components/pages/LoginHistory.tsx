import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginHistoryStats, securityAlerts, loginHistory } from "@/data/userAdminMockData";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

export const LoginHistory = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">User Login History & Audit Logs</h1>
        <div className="text-sm text-muted-foreground">
          Dashboard / User Administration / User Login History & Audit Logs
        </div>
        <p className="text-muted-foreground mt-2">
          Monitor user login activities and system audit logs to ensure security compliance and detect suspicious behavior.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-muted-foreground">Logins Today</div>
            <div className="text-3xl font-bold text-gold mt-2">{loginHistoryStats.loginsToday}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-muted-foreground">Failed Attempts</div>
            <div className="text-3xl font-bold text-destructive mt-2">{loginHistoryStats.failedAttempts}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-muted-foreground">Unique Users</div>
            <div className="text-3xl font-bold text-gold mt-2">{loginHistoryStats.uniqueUsers}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-muted-foreground">Security Alerts</div>
            <div className="text-3xl font-bold text-warning mt-2">{loginHistoryStats.securityAlerts}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Login History Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Login History Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label>User ID</Label>
                <Input placeholder="USR-001 (optional)" />
              </div>
              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="flex gap-2">
                  <Input type="date" placeholder="From" />
                  <Input type="date" placeholder="To" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Login Status</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="">All Statuses</option>
                  <option>Success</option>
                  <option>Failed</option>
                  <option>Locked</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>IP Address</Label>
                <Input placeholder="192.168.1.1 (optional)" />
              </div>
              <div className="space-y-2">
                <Label>Device Type</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="">All Devices</option>
                  <option>Desktop</option>
                  <option>Mobile</option>
                  <option>Tablet</option>
                </select>
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="bg-gold text-black hover:bg-gold-rich">Apply Filters</Button>
                <Button type="reset" variant="ghost">Reset</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Security Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityAlerts.map((alert) => (
                <Card key={alert.id} className="border-l-4 border-l-warning">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-warning mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                        <div className="text-xs text-muted-foreground mb-2">
                          <div><strong>Time:</strong> {alert.time}</div>
                          <div><strong>Severity:</strong> {alert.severity}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">View Details</Button>
                          <Button variant="ghost" size="sm">Lock Account</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Login History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Login History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Login Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">IP Address</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Device</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Location</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loginHistory.map((log, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{log.user}</td>
                    <td className="py-3 px-4">{log.loginTime}</td>
                    <td className="py-3 px-4">{log.ipAddress}</td>
                    <td className="py-3 px-4">{log.device}</td>
                    <td className="py-3 px-4">{log.location}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={
                          log.status === "Success"
                            ? "bg-success/10 text-success"
                            : "bg-destructive/10 text-destructive"
                        }
                      >
                        {log.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
