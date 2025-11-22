import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { auditTeamStats, auditTeams, availableAuditors } from "@/data/userAdminMockData";
import { Users, UserCheck, Briefcase, UserPlus } from "lucide-react";
import { toast } from "sonner";

export const AuditTeamManagement = () => {
  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Audit team created successfully!");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Audit Team Management</h1>
        <p className="text-muted-foreground">
          Manage audit teams, assign team members, and track team assignments
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditTeamStats.totalTeams}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Auditors</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditTeamStats.activeAuditors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teams in Field</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{auditTeamStats.teamsInField}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Auditors</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{auditTeamStats.availableAuditors}</div>
          </CardContent>
        </Card>
      </div>

      {/* Create Audit Team Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create Audit Team</CardTitle>
          <CardDescription>Create a new audit team and assign members</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateTeam} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="teamId">Team ID *</Label>
                <Input id="teamId" placeholder="Enter team ID" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name *</Label>
                <Input id="teamName" placeholder="Enter team name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamLeader">Team Leader *</Label>
                <Select required>
                  <SelectTrigger id="teamLeader">
                    <SelectValue placeholder="Select team leader" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user1">John Smith</SelectItem>
                    <SelectItem value="user2">Sarah Johnson</SelectItem>
                    <SelectItem value="user3">Robert Williams</SelectItem>
                    <SelectItem value="user4">Mary Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Audit Category *</Label>
                <Select required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operation">Operation</SelectItem>
                    <SelectItem value="credit">Credit</SelectItem>
                    <SelectItem value="is">IS</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamMembers">Team Members *</Label>
              <Select>
                <SelectTrigger id="teamMembers">
                  <SelectValue placeholder="Select team members (hold Ctrl/Cmd for multiple)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usr101">USR-101 (David Miller)</SelectItem>
                  <SelectItem value="usr102">USR-102 (Lisa Garcia)</SelectItem>
                  <SelectItem value="usr103">USR-103 (Thomas Davis)</SelectItem>
                  <SelectItem value="usr104">USR-104 (Jennifer Wilson)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">Hold Ctrl/Cmd to select multiple members</p>
            </div>

            <div className="flex gap-2">
              <Button type="submit">Create Team</Button>
              <Button type="reset" variant="outline">Clear Form</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Audit Teams Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Teams</CardTitle>
          <CardDescription>All audit teams and their current assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team ID</TableHead>
                <TableHead>Team Name</TableHead>
                <TableHead>Team Leader</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Engagement</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditTeams.map((team) => (
                <TableRow key={team.teamId}>
                  <TableCell className="font-medium">{team.teamId}</TableCell>
                  <TableCell>{team.teamName}</TableCell>
                  <TableCell>{team.teamLeader}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{team.members}</Badge>
                  </TableCell>
                  <TableCell>{team.category}</TableCell>
                  <TableCell className="text-sm">{team.currentEngagement}</TableCell>
                  <TableCell>
                    <Badge variant={team.status === "Active" ? "default" : "outline"}>
                      {team.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Available Auditors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Available Auditors</CardTitle>
          <CardDescription>Auditors available for team assignment</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Auditor ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Certification</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availableAuditors.map((auditor) => (
                <TableRow key={auditor.auditorId}>
                  <TableCell className="font-medium">{auditor.auditorId}</TableCell>
                  <TableCell>{auditor.name}</TableCell>
                  <TableCell className="text-sm">{auditor.email}</TableCell>
                  <TableCell>{auditor.department}</TableCell>
                  <TableCell>{auditor.specialization}</TableCell>
                  <TableCell className="text-sm">{auditor.certification}</TableCell>
                  <TableCell>{auditor.experience}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={auditor.currentStatus === "Available" ? "default" : "secondary"}
                    >
                      {auditor.currentStatus}
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
