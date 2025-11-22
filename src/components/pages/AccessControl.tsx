import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

export const AccessControl = () => {
  const accessPolicies = [
    {
      id: "POL-001",
      name: "Administrator Full Access",
      users: 5,
      permissions: ["Read", "Write", "Delete", "Admin"],
      status: "Active",
    },
    {
      id: "POL-002",
      name: "Auditor Standard Access",
      users: 24,
      permissions: ["Read", "Write"],
      status: "Active",
    },
    {
      id: "POL-003",
      name: "Viewer Read-Only Access",
      users: 45,
      permissions: ["Read"],
      status: "Active",
    },
    {
      id: "POL-004",
      name: "Manager Review Access",
      users: 12,
      permissions: ["Read", "Write", "Approve"],
      status: "Active",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="text-sm text-muted-foreground mb-2">
          <a href="#" className="hover:underline">Dashboard</a> / <a href="#" className="hover:underline">Security & Compliance</a> / Access Control
        </div>
        <h1 className="text-3xl font-bold mb-2">Access Control</h1>
        <p className="text-muted-foreground">
          Manage access policies and permissions to ensure secure and appropriate system access for all users.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Access Policies</div>
            <div className="text-3xl font-bold">4</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Total Users</div>
            <div className="text-3xl font-bold">86</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Active Policies</div>
            <div className="text-3xl font-bold">4</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Recent Changes</div>
            <div className="text-3xl font-bold">7</div>
          </CardHeader>
        </Card>
      </div>

      {/* Access Policies */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Access Control Policies</CardTitle>
            <Button>
              <Shield className="h-4 w-4 mr-2" />
              Create Policy
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy ID</TableHead>
                <TableHead>Policy Name</TableHead>
                <TableHead>Users Assigned</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accessPolicies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">{policy.id}</TableCell>
                  <TableCell>{policy.name}</TableCell>
                  <TableCell>{policy.users}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {policy.permissions.map((perm) => (
                        <Badge key={perm} variant="outline" className="text-xs">
                          {perm}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{policy.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="link" size="sm" className="h-auto p-0">Edit</Button>
                      <Button variant="link" size="sm" className="h-auto p-0">Assign</Button>
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
