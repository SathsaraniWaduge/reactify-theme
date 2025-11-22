import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { notificationPreferencesData } from "@/data/notificationsMockData";
import { Search, Save, Download, Edit, RotateCcw } from "lucide-react";

export const NotificationPreferences = () => {
  const getStatusBadge = (enabled: boolean) => {
    return enabled ? (
      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
        Enabled
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
        Disabled
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Notification Preferences per User</h1>
        <p className="text-muted-foreground">Manage notification preferences for individual users</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Total Users</div>
            <div className="text-2xl font-bold">142</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Email Enabled</div>
            <div className="text-2xl font-bold">128</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">SMS Enabled</div>
            <div className="text-2xl font-bold">42</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Push Enabled</div>
            <div className="text-2xl font-bold">95</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>User Notification Preferences</span>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-9 w-[300px]" />
              </div>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Set Default Preferences
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export Preferences
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Email Notifications</TableHead>
                  <TableHead>SMS Notifications</TableHead>
                  <TableHead>Push Notifications</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notificationPreferencesData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.user}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getStatusBadge(user.emailNotifications)}</TableCell>
                    <TableCell>{getStatusBadge(user.smsNotifications)}</TableCell>
                    <TableCell>{getStatusBadge(user.pushNotifications)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <RotateCcw className="h-3 w-3" />
                          Reset
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Default Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="default-email" defaultChecked />
                <Label htmlFor="default-email" className="text-sm font-normal cursor-pointer">
                  Enable email notifications by default
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="default-sms" />
                <Label htmlFor="default-sms" className="text-sm font-normal cursor-pointer">
                  Enable SMS notifications by default
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="default-push" defaultChecked />
                <Label htmlFor="default-push" className="text-sm font-normal cursor-pointer">
                  Enable push notifications by default
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="audit-assignment" defaultChecked />
                <Label htmlFor="audit-assignment" className="text-sm font-normal cursor-pointer">
                  Send audit assignment notifications
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="deadline-reminder" defaultChecked />
                <Label htmlFor="deadline-reminder" className="text-sm font-normal cursor-pointer">
                  Send deadline reminder notifications
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="system-update" />
                <Label htmlFor="system-update" className="text-sm font-normal cursor-pointer">
                  Send system update notifications
                </Label>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" />
                Save Default Preferences
              </Button>
              <Button type="reset" variant="outline" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
