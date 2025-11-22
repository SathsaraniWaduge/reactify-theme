import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Download } from "lucide-react";

export const AuditPrograms = () => {
  const auditPrograms = [
    {
      id: "PRG-001",
      name: "Compliance Audit Program 2024",
      category: "Compliance",
      audits: 25,
      status: "Active",
      progress: 65,
      lastUpdated: "2024-09-05",
    },
    {
      id: "PRG-002",
      name: "IT Security Audit 2024",
      category: "Technology",
      audits: 18,
      status: "Active",
      progress: 45,
      lastUpdated: "2024-09-01",
    },
    {
      id: "PRG-003",
      name: "Financial Audit Program",
      category: "Financial",
      audits: 30,
      status: "Active",
      progress: 80,
      lastUpdated: "2024-08-28",
    },
    {
      id: "PRG-004",
      name: "Operational Risk Assessment",
      category: "Operations",
      audits: 22,
      status: "Active",
      progress: 55,
      lastUpdated: "2024-08-25",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="text-sm text-muted-foreground mb-2">
          <a href="#" className="hover:underline">Dashboard</a> / <a href="#" className="hover:underline">Master Data</a> / Audit Programs
        </div>
        <h1 className="text-3xl font-bold mb-2">Audit Programs</h1>
        <p className="text-muted-foreground">
          Manage comprehensive audit programs that define audit objectives, scope, procedures, and methodologies.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Total Programs</div>
            <div className="text-3xl font-bold">4</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Active Programs</div>
            <div className="text-3xl font-bold">4</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Total Audits</div>
            <div className="text-3xl font-bold">95</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Avg Progress</div>
            <div className="text-3xl font-bold">61%</div>
          </CardHeader>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Audit Program
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Audit Programs Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Audit Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program ID</TableHead>
                <TableHead>Program Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Audits</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.id}</TableCell>
                  <TableCell>{program.name}</TableCell>
                  <TableCell>{program.category}</TableCell>
                  <TableCell>{program.audits}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-full max-w-[100px] bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${program.progress}%` }}
                        />
                      </div>
                      <span className="text-sm">{program.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{program.status}</Badge>
                  </TableCell>
                  <TableCell>{program.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="link" size="sm" className="h-auto p-0">View</Button>
                      <Button variant="link" size="sm" className="h-auto p-0">Edit</Button>
                    </div>
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
