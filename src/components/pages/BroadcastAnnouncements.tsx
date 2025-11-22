import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { broadcastAnnouncementsData } from "@/data/notificationsMockData";
import { Plus, RotateCcw } from "lucide-react";

export const BroadcastAnnouncements = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-300";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800 border-green-300"
      : "bg-red-100 text-red-800 border-red-300";
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Broadcast Announcements</h1>
        <p className="text-muted-foreground">Create and manage system-wide announcements and notifications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Active Announcements</div>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Scheduled</div>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Expired</div>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Last Created</div>
            <div className="text-2xl font-bold">Today</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Announcement title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Announcement message" required rows={4} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select required>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="audience">Audience</Label>
                <Select required>
                  <SelectTrigger id="audience">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="auditors">Auditors Only</SelectItem>
                    <SelectItem value="managers">Managers Only</SelectItem>
                    <SelectItem value="admins">Administrators Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="start-date" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input id="end-date" type="date" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="send-email" />
                <Label htmlFor="send-email" className="text-sm font-normal cursor-pointer">
                  Send as email notification
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="send-sms" />
                <Label htmlFor="send-sms" className="text-sm font-normal cursor-pointer">
                  Send as SMS notification
                </Label>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="gap-2">
                <Plus className="h-4 w-4" />
                Create Announcement
              </Button>
              <Button type="reset" variant="outline" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Announcement History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {broadcastAnnouncementsData.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableCell className="font-medium">{announcement.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPriorityColor(announcement.priority)}>
                        {announcement.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{announcement.audience}</TableCell>
                    <TableCell>{announcement.startDate}</TableCell>
                    <TableCell>{announcement.endDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(announcement.status)}>
                        {announcement.status === "active" ? "Active" : "Expired"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
