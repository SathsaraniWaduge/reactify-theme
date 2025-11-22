import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { rolesPermissions } from "@/data/userAdminMockData";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";

export const RBAC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Role-Based Access Control (RBAC)</h1>
        <div className="text-sm text-muted-foreground">
          Dashboard / User Administration / Role-Based Access Control (RBAC)
        </div>
        <p className="text-muted-foreground mt-2">
          Define and manage user roles with specific permissions to ensure proper access control and security.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Roles", value: "7" },
          { label: "Active Roles", value: "5" },
          { label: "Users with Roles", value: "142" },
          { label: "Permissions", value: "24" },
        ].map((stat) => (
          <Card key={stat.label} className="hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-3xl font-bold text-gold mt-2">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create New Role */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Role</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label>Role Name</Label>
                <Input placeholder="E.g., Senior Auditor" required />
              </div>
              <div className="space-y-2">
                <Label>Role Description</Label>
                <Textarea placeholder="Describe the role and its responsibilities" required />
              </div>
              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="border rounded-md p-4 space-y-2 max-h-40 overflow-y-auto">
                  {[
                    "View Dashboard",
                    "Create Audit",
                    "Edit Audit",
                    "Delete Audit",
                    "View Reports",
                    "Generate Reports",
                    "Manage Users",
                    "View Risk Assessments",
                    "Create Risk Assessments",
                  ].map((perm) => (
                    <div key={perm} className="flex items-center gap-2">
                      <input type="checkbox" id={perm} className="rounded" />
                      <Label htmlFor={perm} className="text-sm font-normal">{perm}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Priority Level</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>Select Priority</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="bg-gold text-black hover:bg-gold-rich">Create Role</Button>
                <Button type="reset" variant="ghost">Reset</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Assign Role to User */}
        <Card>
          <CardHeader>
            <CardTitle>Assign Role to User</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label>User ID</Label>
                <Input placeholder="USR-001" required />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                  <option value="">Select Role</option>
                  {rolesPermissions.map((role) => (
                    <option key={role.id} value={role.id}>{role.roleName}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Effective Date</Label>
                <Input type="date" required />
              </div>
              <div className="space-y-2">
                <Label>Expiry Date (Optional)</Label>
                <Input type="date" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="notifyUserRole" defaultChecked className="rounded" />
                <Label htmlFor="notifyUserRole">Send notification to user</Label>
              </div>
              <div className="space-y-2">
                <Label>Additional Notes</Label>
                <Textarea placeholder="Any additional notes or comments" />
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="bg-gold text-black hover:bg-gold-rich">Assign Role</Button>
                <Button type="reset" variant="ghost">Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Roles and Permissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Roles and Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Role ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Role Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Description</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Users</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Permissions</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rolesPermissions.map((role) => (
                  <tr key={role.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{role.id}</td>
                    <td className="py-3 px-4 font-semibold">{role.roleName}</td>
                    <td className="py-3 px-4">{role.description}</td>
                    <td className="py-3 px-4">{role.userCount}</td>
                    <td className="py-3 px-4 text-sm">{role.permissions}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-success/10 text-success">
                        {role.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
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
