import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { auditFieldworksData } from "@/data/auditExecutionMockData";
import { Save, X, Edit, Eye } from "lucide-react";

export const AuditFieldworks = () => {
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
        <h1 className="text-3xl font-bold mb-2">Audit Fieldworks</h1>
        <p className="text-muted-foreground">Track and manage audit fieldwork observations and recommendations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Audit Fieldwork</CardTitle>
          <CardDescription>Enter the details for audit fieldwork tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fieldwork-engagement-id">Audit Engagement ID</Label>
                <Input id="fieldwork-engagement-id" placeholder="Enter Engagement ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fieldwork-concern-sn">Audit Concern SN</Label>
                <Input id="fieldwork-concern-sn" placeholder="Enter Concern SN" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="observation-id">Audit Observation ID</Label>
                <Input id="observation-id" placeholder="Enter Observation ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recommendation-id">Audit Recommendation ID</Label>
                <Input id="recommendation-id" placeholder="Enter Recommendation ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="likelihood">Likelihood</Label>
                <Select>
                  <SelectTrigger id="likelihood">
                    <SelectValue placeholder="Select Likelihood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="risk-score">Risk Score</Label>
                <Input id="risk-score" type="number" min="1" max="10" placeholder="Enter Risk Score (1-10)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="risk-grade">Risk Grade</Label>
                <Select>
                  <SelectTrigger id="risk-grade">
                    <SelectValue placeholder="Select Risk Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A (Low Risk)</SelectItem>
                    <SelectItem value="B">B (Medium Risk)</SelectItem>
                    <SelectItem value="C">C (High Risk)</SelectItem>
                    <SelectItem value="D">D (Critical Risk)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="team-member-id">Team Member ID</Label>
                <Input id="team-member-id" placeholder="Enter Team Member ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="audit-status">Audit Status</Label>
                <Select>
                  <SelectTrigger id="audit-status">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="close">Close</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="wf-status">WF Status</Label>
                <Select>
                  <SelectTrigger id="wf-status">
                    <SelectValue placeholder="Select Workflow Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-progress-tm">In-Progress – Team Member</SelectItem>
                    <SelectItem value="in-progress-tl">In-Progress – Team Leader</SelectItem>
                    <SelectItem value="in-progress-r1">In-Progress – Reviewer1</SelectItem>
                    <SelectItem value="in-progress-r2">In-Progress – Reviewer2</SelectItem>
                    <SelectItem value="in-progress-agm">In-Progress – AGM</SelectItem>
                    <SelectItem value="rectification-branch">Rectification – Branch</SelectItem>
                    <SelectItem value="rectification-c1">Rectification – Controller1</SelectItem>
                    <SelectItem value="rectification-c2">Rectification – Controller2</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" />
                Save Fieldwork
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
          <CardDescription>View and manage existing audit fieldwork records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
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
                {auditFieldworksData.map((item) => (
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
                    <TableCell className="text-xs">{item.wfStatus.replace(/-/g, " ")}</TableCell>
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
