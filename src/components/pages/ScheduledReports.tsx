import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Pause, Play, Eye } from "lucide-react";
import { scheduledReportsData, deliveryHistoryData } from "@/data/reportingMockData";

const ScheduledReports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Scheduled Report Emails</h1>
        <p className="text-muted-foreground">
          Automate report generation and delivery.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Active Schedules</div>
          <div className="text-3xl font-bold">12</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Delivered Today</div>
          <div className="text-3xl font-bold">8</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Failed Deliveries</div>
          <div className="text-3xl font-bold">0</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Next Run</div>
          <div className="text-2xl font-bold">Today 18:00</div>
        </Card>
      </div>

      {/* Create New Scheduled Report */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Create New Scheduled Report</h3>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Report Name</Label>
              <Input placeholder="Enter schedule name" required />
            </div>

            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="predefined">Predefined Report</SelectItem>
                  <SelectItem value="custom">Custom Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Report</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="audit-summary">Audit Summary Report</SelectItem>
                  <SelectItem value="compliance">Compliance Status Report</SelectItem>
                  <SelectItem value="risk">Risk Assessment Report</SelectItem>
                  <SelectItem value="user-activity">User Activity Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Output Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue placeholder="PDF" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Schedule</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Delivery Time</Label>
              <Input type="time" defaultValue="09:00" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Recipients (comma-separated emails)</Label>
            <Textarea placeholder="email1@example.com, email2@example.com" required />
          </div>

          <div className="space-y-2">
            <Label>Email Subject</Label>
            <Input placeholder="Email subject" defaultValue="Scheduled Report: {report_name}" />
          </div>

          <div className="space-y-2">
            <Label>Email Message</Label>
            <Textarea placeholder="Email message" defaultValue="Please find the attached scheduled report." />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="attachment" defaultChecked />
              <Label htmlFor="attachment" className="font-normal cursor-pointer">
                Include report as attachment
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="link" />
              <Label htmlFor="link" className="font-normal cursor-pointer">
                Include report link in email
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="empty" defaultChecked />
              <Label htmlFor="empty" className="font-normal cursor-pointer">
                Send even if report is empty
              </Label>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit">Create Schedule</Button>
            <Button type="reset" variant="ghost">
              Clear Form
            </Button>
          </div>
        </form>
      </Card>

      {/* Active Scheduled Reports */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Active Scheduled Reports</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Schedule Name</TableHead>
              <TableHead>Report</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Next Run</TableHead>
              <TableHead>Recipients</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduledReportsData.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell className="font-medium">{schedule.scheduleName}</TableCell>
                <TableCell>{schedule.report}</TableCell>
                <TableCell>{schedule.schedule}</TableCell>
                <TableCell>{schedule.nextRun}</TableCell>
                <TableCell>{schedule.recipients}</TableCell>
                <TableCell>
                  <Badge variant={schedule.status === "Active" ? "default" : "secondary"}>
                    {schedule.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      {schedule.status === "Active" ? (
                        <>
                          <Pause className="h-3 w-3 mr-1" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 mr-1" />
                          Resume
                        </>
                      )}
                    </Button>
                    <Button size="sm" variant="outline">
                      Run Now
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Delivery History */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Delivery History</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Schedule Name</TableHead>
              <TableHead>Scheduled Date</TableHead>
              <TableHead>Delivered Date</TableHead>
              <TableHead>Recipients</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveryHistoryData.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell className="font-medium">{delivery.scheduleName}</TableCell>
                <TableCell>{delivery.scheduledDate}</TableCell>
                <TableCell>{delivery.deliveredDate}</TableCell>
                <TableCell>{delivery.recipients}</TableCell>
                <TableCell>
                  <Badge variant="default">{delivery.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      Resend
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ScheduledReports;
