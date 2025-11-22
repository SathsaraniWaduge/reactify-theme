import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { activeSessions } from "@/data/userAdminMockData";
import { Badge } from "@/components/ui/badge";
import { LogOut, Monitor } from "lucide-react";

export const SessionManagement = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Session Management / Forced Logout</h1>
        <div className="text-sm text-muted-foreground">
          Dashboard / User Administration / Session Management / Forced Logout
        </div>
        <p className="text-muted-foreground mt-2">
          Monitor and manage active user sessions with the ability to forcefully terminate sessions for security purposes.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Sessions", value: "38" },
          { label: "Desktop", value: "24" },
          { label: "Mobile", value: "14" },
          { label: "Avg Duration", value: "2.5h" },
        ].map((stat) => (
          <Card key={stat.label} className="hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-3xl font-bold text-gold mt-2">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bulk Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Bulk Session Actions</h3>
              <p className="text-sm text-muted-foreground">
                Perform actions on multiple sessions at once
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Force Logout All
              </Button>
              <Button variant="outline">
                <Monitor className="h-4 w-4 mr-2" />
                Refresh Sessions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
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
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Duration</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeSessions.map((session, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{session.user}</td>
                    <td className="py-3 px-4">{session.loginTime}</td>
                    <td className="py-3 px-4">{session.ipAddress}</td>
                    <td className="py-3 px-4">{session.device}</td>
                    <td className="py-3 px-4">{session.location}</td>
                    <td className="py-3 px-4">{session.duration}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-success/10 text-success">
                        {session.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="destructive" size="sm">
                          <LogOut className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Session Policy */}
      <Card>
        <CardHeader>
          <CardTitle>Session Policy Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Maximum Session Duration</h4>
                  <p className="text-sm text-muted-foreground">Auto logout after</p>
                </div>
                <div className="text-gold font-bold">8 hours</div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Idle Timeout</h4>
                  <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                </div>
                <div className="text-gold font-bold">30 mins</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Concurrent Sessions</h4>
                  <p className="text-sm text-muted-foreground">Max per user</p>
                </div>
                <div className="text-gold font-bold">3</div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Force Logout on Password Change</h4>
                  <p className="text-sm text-muted-foreground">Terminate other sessions</p>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success">Enabled</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
