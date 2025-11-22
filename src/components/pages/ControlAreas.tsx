import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Download } from "lucide-react";

export const ControlAreas = () => {
  const controlAreas = [
    {
      id: "CA-001",
      code: "FIN",
      name: "Financial Controls",
      category: "Financial",
      controls: 45,
      status: "Active",
    },
    {
      id: "CA-002",
      code: "OPS",
      name: "Operational Controls",
      category: "Operations",
      controls: 38,
      status: "Active",
    },
    {
      id: "CA-003",
      code: "IT",
      name: "IT General Controls",
      category: "Technology",
      controls: 52,
      status: "Active",
    },
    {
      id: "CA-004",
      code: "COMP",
      name: "Compliance Controls",
      category: "Compliance",
      controls: 30,
      status: "Active",
    },
    {
      id: "CA-005",
      code: "HR",
      name: "Human Resources Controls",
      category: "HR",
      controls: 25,
      status: "Active",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="text-sm text-muted-foreground mb-2">
          <a href="#" className="hover:underline">Dashboard</a> / <a href="#" className="hover:underline">Master Data</a> / Control Areas
        </div>
        <h1 className="text-3xl font-bold mb-2">Control Areas</h1>
        <p className="text-muted-foreground">
          Define and manage different control areas that categorize internal controls across the organization.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Total Areas</div>
            <div className="text-3xl font-bold">5</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Total Controls</div>
            <div className="text-3xl font-bold">190</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Active Areas</div>
            <div className="text-3xl font-bold">5</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Categories</div>
            <div className="text-3xl font-bold">5</div>
          </CardHeader>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Control Area
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Control Areas Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Control Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Area ID</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Area Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Controls</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {controlAreas.map((area) => (
                <TableRow key={area.id}>
                  <TableCell className="font-medium">{area.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{area.code}</Badge>
                  </TableCell>
                  <TableCell>{area.name}</TableCell>
                  <TableCell>{area.category}</TableCell>
                  <TableCell>{area.controls}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{area.status}</Badge>
                  </TableCell>
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
