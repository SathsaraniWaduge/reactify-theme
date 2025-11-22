import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inactiveUsers } from "@/data/userAdminMockData";
import { Badge } from "@/components/ui/badge";
import { Archive, Trash2, Mail } from "lucide-react";

export const InactiveUserCleanup = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Inactive User Cleanup</h1>
        <div className="text-sm text-muted-foreground">
          Dashboard / User Administration / Inactive User Cleanup
        </div>
        <p className="text-muted-foreground mt-2">
          Identify and manage inactive user accounts to maintain system security and compliance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Inactive Users", value: "18" },
          { label: "> 90 Days", value: "12" },
          { label: "> 180 Days", value: "6" },
          { label: "Archived", value: "42" },
        ].map((stat) => (
          <Card key={stat.label} className="hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-3xl font-bold text-gold mt-2">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cleanup Policy */}
      <Card>
        <CardHeader>
          <CardTitle>Cleanup Policy Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Inactivity Threshold (days)</Label>
                <Input type="number" defaultValue="90" />
              </div>
              <div className="space-y-2">
                <Label>Auto-Archive After (days)</Label>
                <Input type="number" defaultValue="180" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="autoCleanup" defaultChecked className="rounded" />
              <Label htmlFor="autoCleanup">Enable automatic cleanup</Label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="notifyInactive" defaultChecked className="rounded" />
              <Label htmlFor="notifyInactive">Notify users before deactivation</Label>
            </div>
            <div className="space-y-2">
              <Label>Notification Period (days before deactivation)</Label>
              <Input type="number" defaultValue="7" />
            </div>
            <Button type="submit" className="bg-gold text-black hover:bg-gold-rich">Save Policy</Button>
          </form>
        </CardContent>
      </Card>

      {/* Inactive Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Inactive Users</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Notify All
              </Button>
              <Button variant="outline" size="sm">
                <Archive className="h-4 w-4 mr-2" />
                Archive Selected
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">User ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Department</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Last Login</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Days Since</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inactiveUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="py-3 px-4">{user.id}</td>
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.department}</td>
                    <td className="py-3 px-4">{user.lastLogin}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={
                        user.daysSinceLogin > 180 
                          ? "bg-destructive/10 text-destructive"
                          : user.daysSinceLogin > 90
                          ? "bg-warning/10 text-warning"
                          : "bg-muted"
                      }>
                        {user.daysSinceLogin} days
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-muted">
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm"><Mail className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm"><Archive className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                      </div>
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
