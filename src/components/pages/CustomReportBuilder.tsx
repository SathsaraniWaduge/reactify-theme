import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { X, Play, Save, Trash2, Edit } from "lucide-react";
import { customReportsData } from "@/data/reportingMockData";

const CustomReportBuilder = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Custom Report Builder</h1>
        <p className="text-muted-foreground">
          Create custom reports with drag-and-drop interface.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Custom Reports</div>
          <div className="text-3xl font-bold">8</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Saved Templates</div>
          <div className="text-3xl font-bold">5</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Last Created</div>
          <div className="text-2xl font-bold">Today</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Popular Fields</div>
          <div className="text-2xl font-bold">Audit Date</div>
        </Card>
      </div>

      {/* Create New Custom Report */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Create New Custom Report</h3>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label>Report Name</Label>
            <Input placeholder="Enter report name" required />
          </div>

          <div className="space-y-2">
            <Label>Report Description</Label>
            <Textarea placeholder="Enter report description" />
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Data Source</h4>
            <div className="space-y-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select data source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="audits">Audits</SelectItem>
                  <SelectItem value="findings">Audit Findings</SelectItem>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="activities">User Activities</SelectItem>
                  <SelectItem value="compliance">Compliance Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Available Fields</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium mb-2">Audit Fields</h5>
                <div className="flex flex-wrap gap-2">
                  {["Audit ID", "Audit Name", "Audit Date", "Auditor", "Status", "Risk Level"].map(
                    (field) => (
                      <Button key={field} type="button" variant="outline" size="sm">
                        {field}
                      </Button>
                    )
                  )}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium mb-2">Finding Fields</h5>
                <div className="flex flex-wrap gap-2">
                  {["Finding ID", "Description", "Severity", "Recommendation", "Due Date", "Status"].map(
                    (field) => (
                      <Button key={field} type="button" variant="outline" size="sm">
                        {field}
                      </Button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Selected Fields</h4>
            <div className="border-2 border-dashed rounded-lg p-4 min-h-[80px] bg-muted/20">
              <div className="flex flex-wrap gap-2">
                {["Audit Date", "Audit Name", "Status"].map((field) => (
                  <div
                    key={field}
                    className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm flex items-center gap-2"
                  >
                    {field}
                    <X className="h-3 w-3 cursor-pointer" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Filters</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date Range</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Grouping & Sorting</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Group By</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="auditor">Auditor</SelectItem>
                    <SelectItem value="risk-level">Risk Level</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select defaultValue="date">
                  <SelectTrigger>
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="risk">Risk Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Output Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <SelectItem value="html">HTML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Include Charts</Label>
                <Select defaultValue="yes">
                  <SelectTrigger>
                    <SelectValue placeholder="Yes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit">
              <Play className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button type="button" variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save as Template
            </Button>
            <Button type="reset" variant="ghost">
              Clear Form
            </Button>
          </div>
        </form>
      </Card>

      {/* Saved Custom Reports */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Saved Custom Reports</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Last Generated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customReportsData.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.reportName}</TableCell>
                <TableCell>{report.createdBy}</TableCell>
                <TableCell>{report.createdDate}</TableCell>
                <TableCell>{report.lastGenerated}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Play className="h-3 w-3 mr-1" />
                      Generate
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
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

export default CustomReportBuilder;
