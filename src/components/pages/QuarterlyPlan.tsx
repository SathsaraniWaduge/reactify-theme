import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Download } from "lucide-react";

export const QuarterlyPlan = () => {
  const quarterlyPlans = [
    {
      id: "QP-2024-Q1",
      quarter: "Q1 2024",
      audits: 15,
      completed: 15,
      inProgress: 0,
      status: "Completed",
    },
    {
      id: "QP-2024-Q2",
      quarter: "Q2 2024",
      audits: 18,
      completed: 16,
      inProgress: 2,
      status: "In Progress",
    },
    {
      id: "QP-2024-Q3",
      quarter: "Q3 2024",
      audits: 20,
      completed: 10,
      inProgress: 8,
      status: "In Progress",
    },
    {
      id: "QP-2024-Q4",
      quarter: "Q4 2024",
      audits: 17,
      completed: 0,
      inProgress: 0,
      status: "Planned",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="text-sm text-muted-foreground mb-2">
          <a href="#" className="hover:underline">Dashboard</a> / <a href="#" className="hover:underline">Audit Planner</a> / Quarterly Plan
        </div>
        <h1 className="text-3xl font-bold mb-2">Quarterly Audit Plan</h1>
        <p className="text-muted-foreground">
          Plan and track audit activities on a quarterly basis for better resource allocation and timeline management.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Total Quarters</div>
            <div className="text-3xl font-bold">4</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Total Audits</div>
            <div className="text-3xl font-bold">70</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Completed</div>
            <div className="text-3xl font-bold">41</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">In Progress</div>
            <div className="text-3xl font-bold">10</div>
          </CardHeader>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Quarterly Plan
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Quarterly Plans Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quarterly Audit Plans - 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan ID</TableHead>
                <TableHead>Quarter</TableHead>
                <TableHead>Total Audits</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>In Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quarterlyPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.id}</TableCell>
                  <TableCell>{plan.quarter}</TableCell>
                  <TableCell>{plan.audits}</TableCell>
                  <TableCell>{plan.completed}</TableCell>
                  <TableCell>{plan.inProgress}</TableCell>
                  <TableCell>
                    <Badge variant={plan.status === "Completed" ? "secondary" : "default"}>
                      {plan.status}
                    </Badge>
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
