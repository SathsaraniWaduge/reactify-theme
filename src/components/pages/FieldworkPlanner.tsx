import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fieldworkPlannerData, teamMembers } from "@/data/auditExecutionMockData";
import { Save, X, Edit, Eye } from "lucide-react";

export const FieldworkPlanner = () => {
  const getRiskBadgeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-green-100 text-green-800 border-green-300";
      case "B":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "C":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "D":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "open":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "follow-up":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "close":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Audit Fieldwork Planner</h1>
        <p className="text-muted-foreground">Plan and manage audit fieldwork activities</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Fieldwork Plan</CardTitle>
          <CardDescription>Enter the details to plan audit fieldwork</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="engagement-id">Audit Engagement ID</Label>
                <Input id="engagement-id" placeholder="Enter Engagement ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="program-id">Audit Program ID</Label>
                <Input id="program-id" placeholder="Enter Program ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team-id">Audit Team ID</Label>
                <Input id="team-id" placeholder="Enter Team ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="concern-sn">Audit Concern SN</Label>
                <Input id="concern-sn" placeholder="Enter Concern SN" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team-member">Team Member</Label>
                <Select>
                  <SelectTrigger id="team-member">
                    <SelectValue placeholder="Select Team Member" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" />
                Save Fieldwork Plan
              </Button>
              <Button type="button" variant="outline" className="gap-2">
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Audit Fieldworks</CardTitle>
          <CardDescription>View and manage existing fieldwork plans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Engagement ID</TableHead>
                  <TableHead>Concern SN</TableHead>
                  <TableHead>Observation ID</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Risk Grade</TableHead>
                  <TableHead>Audit Status</TableHead>
                  <TableHead>WF Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fieldworkPlannerData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.engagementId}</TableCell>
                    <TableCell>{item.concernSn}</TableCell>
                    <TableCell>{item.observationId}</TableCell>
                    <TableCell>{item.riskScore}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getRiskBadgeColor(item.riskGrade)}>
                        {item.riskGrade}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadgeColor(item.auditStatus)}>
                        {item.auditStatus.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">{item.wfStatus.replace("-", " ")}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <Eye className="h-3 w-3" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
