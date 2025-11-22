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
import { Search, Download, Eye, FileDown, Trash2 } from "lucide-react";
import { exportLogsData } from "@/data/reportingMockData";

const ExportLogs = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Data Export Logs & History</h1>
        <p className="text-muted-foreground">
          Track data exports and download history.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Exports Today</div>
          <div className="text-3xl font-bold">15</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Total Size</div>
          <div className="text-3xl font-bold">245 MB</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Failed Exports</div>
          <div className="text-3xl font-bold">0</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Last Export</div>
          <div className="text-2xl font-bold">10 min ago</div>
        </Card>
      </div>

      {/* Export History */}
      <Card className="p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search exports..." className="pl-10" />
          </div>
          <Button>
            <FileDown className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Logs
          </Button>
        </div>

        <h3 className="text-xl font-semibold mb-4">Export History</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Export ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Data Type</TableHead>
              <TableHead>Export Date</TableHead>
              <TableHead>File Size</TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exportLogsData.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.exportId}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.dataType}</TableCell>
                <TableCell>{log.exportDate}</TableCell>
                <TableCell>{log.fileSize}</TableCell>
                <TableCell>{log.format}</TableCell>
                <TableCell>
                  <Badge variant="default">{log.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Export Statistics */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Export Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Total Exports</div>
            <div className="text-3xl font-bold">1,245</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Total Data Exported</div>
            <div className="text-3xl font-bold">24.8 GB</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Success Rate</div>
            <div className="text-3xl font-bold text-green-600">99.2%</div>
          </Card>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3">Exports by Type</h4>
            <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-lg">
              <p className="text-muted-foreground">Chart: Exports by Type</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Export Volume Trend</h4>
            <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-lg">
              <p className="text-muted-foreground">Chart: Export Volume Trend</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Export Data Form */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Export Data</h3>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="audits">Audits</SelectItem>
                  <SelectItem value="findings">Audit Findings</SelectItem>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="activities">User Activities</SelectItem>
                  <SelectItem value="compliance">Compliance Data</SelectItem>
                  <SelectItem value="all">All Data</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Export Format</Label>
              <Select defaultValue="excel">
                <SelectTrigger>
                  <SelectValue placeholder="Excel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV (.csv)</SelectItem>
                  <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                  <SelectItem value="json">JSON (.json)</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
              <Label>Custom Date Range</Label>
              <div className="flex gap-2">
                <Input type="date" className="flex-1" />
                <Input type="date" className="flex-1" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Filters (optional)</Label>
            <Textarea placeholder="Enter filter criteria (JSON format)" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="headers" defaultChecked />
              <Label htmlFor="headers" className="font-normal cursor-pointer">
                Include headers
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="compress" />
              <Label htmlFor="compress" className="font-normal cursor-pointer">
                Compress file
              </Label>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit">
              <FileDown className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button type="reset" variant="ghost">
              Clear Form
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ExportLogs;
