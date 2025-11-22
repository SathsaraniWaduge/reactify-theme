import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { passwordResetStats, lockedAccounts, recentPasswordResets } from "@/data/userAdminMockData";
import { UnlockIcon, RefreshCw, Shield, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const PasswordReset = () => {
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password reset request submitted successfully!");
  };

  const handleUnlockAccount = (user: string) => {
    toast.success(`Account ${user} unlocked successfully!`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Password Reset / Unlock</h1>
        <p className="text-muted-foreground">
          Reset user passwords and unlock accounts
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reset Requests Today</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{passwordResetStats.resetRequestsToday}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locked Accounts</CardTitle>
            <UnlockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{passwordResetStats.lockedAccounts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{passwordResetStats.pendingApprovals}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{passwordResetStats.completedToday}</div>
          </CardContent>
        </Card>
      </div>

      {/* Password Reset Form */}
      <Card>
        <CardHeader>
          <CardTitle>Reset User Password</CardTitle>
          <CardDescription>Submit a password reset request for a user</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="resetUser">User *</Label>
                <Select required>
                  <SelectTrigger id="resetUser">
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usr001">USR-001 (John Doe)</SelectItem>
                    <SelectItem value="usr002">USR-002 (Jane Smith)</SelectItem>
                    <SelectItem value="usr003">USR-003 (Robert Johnson)</SelectItem>
                    <SelectItem value="usr004">USR-004 (Sarah Williams)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="resetType">Reset Type *</Label>
                <Select required>
                  <SelectTrigger id="resetType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temporary">Temporary Password</SelectItem>
                    <SelectItem value="email">Email Reset Link</SelectItem>
                    <SelectItem value="force">Force Change on Next Login</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="requestedBy">Requested By *</Label>
                <Input id="requestedBy" placeholder="Enter your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="approver">Approver</Label>
                <Select>
                  <SelectTrigger id="approver">
                    <SelectValue placeholder="Select approver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin1">Admin 1</SelectItem>
                    <SelectItem value="admin2">Admin 2</SelectItem>
                    <SelectItem value="system">System (Auto-approve)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="resetReason">Reason *</Label>
              <Textarea 
                id="resetReason" 
                placeholder="Enter reason for password reset" 
                required 
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="notifyUser" defaultChecked />
              <Label htmlFor="notifyUser" className="font-normal">Send notification to user</Label>
            </div>

            <div className="flex gap-2">
              <Button type="submit">Submit Reset Request</Button>
              <Button type="reset" variant="outline">Clear Form</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Locked Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Locked Accounts</CardTitle>
          <CardDescription>Users whose accounts are currently locked</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Lock Reason</TableHead>
                <TableHead>Locked Since</TableHead>
                <TableHead>Failed Attempts</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lockedAccounts.map((account, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{account.user}</TableCell>
                  <TableCell>{account.department}</TableCell>
                  <TableCell>{account.lockReason}</TableCell>
                  <TableCell>{account.lockedSince}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">{account.failedAttempts}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleUnlockAccount(account.user)}
                      >
                        <UnlockIcon className="h-4 w-4 mr-1" />
                        Unlock
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Password Resets */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Password Resets</CardTitle>
          <CardDescription>History of password reset requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Approved By</TableHead>
                <TableHead>Completed Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPasswordResets.map((reset, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{reset.user}</TableCell>
                  <TableCell>{reset.requestedBy}</TableCell>
                  <TableCell>{reset.requestDate}</TableCell>
                  <TableCell>{reset.approvedBy}</TableCell>
                  <TableCell>{reset.completedDate}</TableCell>
                  <TableCell>
                    <Badge variant={reset.status === "Completed" ? "default" : "secondary"}>
                      {reset.status}
                    </Badge>
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
