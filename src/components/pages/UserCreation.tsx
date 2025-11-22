import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { currentUsers } from "@/data/userAdminMockData";
import { Badge } from "@/components/ui/badge";
import { Edit, UserX } from "lucide-react";

export const UserCreation = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">User Creation & Deactivation</h1>
        <div className="text-sm text-muted-foreground">
          Dashboard / User Administration / User Creation & Deactivation
        </div>
        <p className="text-muted-foreground mt-2">
          Manage user accounts by creating new profiles or deactivating existing ones, ensuring compliance with organizational policies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create New User */}
        <Card>
          <CardHeader>
            <CardTitle>Create New User</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label>User ID</Label>
                <Input placeholder="USR-001" pattern="[A-Z]{3}-\\d{3}" required />
              </div>
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="john.doe@boc.lk" required />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input type="tel" placeholder="+94 123 456 789" />
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="">Select Department</option>
                  <option>Audit</option>
                  <option>Finance</option>
                  <option>IT</option>
                  <option>HR</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input placeholder="Senior Auditor" />
              </div>
              <div className="space-y-2">
                <Label>Initial Password</Label>
                <Input type="password" placeholder="Temporary password" required />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" multiple>
                  <option>Auditor</option>
                  <option>Admin</option>
                  <option>Controller</option>
                  <option>Reviewer</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="bg-gold text-black hover:bg-gold-rich">Create User</Button>
                <Button type="reset" variant="ghost">Reset Form</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Deactivate User */}
        <Card>
          <CardHeader>
            <CardTitle>Deactivate User</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label>User ID</Label>
                <Input placeholder="USR-001" required />
              </div>
              <div className="space-y-2">
                <Label>Reason for Deactivation</Label>
                <Textarea placeholder="E.g., Employee left the organization" required />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="notifyUser" defaultChecked className="rounded" />
                <Label htmlFor="notifyUser">Send email notification</Label>
              </div>
              <div className="space-y-2">
                <Label>Transfer Responsibilities</Label>
                <Input placeholder="To User ID (e.g., USR-002)" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="archiveData" defaultChecked className="rounded" />
                <Label htmlFor="archiveData">Archive user data for compliance</Label>
              </div>
              <div className="space-y-2">
                <Label>Effective Date</Label>
                <Input type="date" required />
              </div>
              <div className="flex gap-3">
                <Button type="submit" variant="destructive">Deactivate User</Button>
                <Button type="reset" variant="ghost">Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Current Users */}
      <Card>
        <CardHeader>
          <CardTitle>Current Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Department</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{user.id}</td>
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.department}</td>
                    <td className="py-3 px-4">{user.role}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={user.status === "Active" ? "bg-success/10 text-success" : "bg-muted"}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm"><UserX className="h-4 w-4" /></Button>
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
