import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { auditSamplesData, accountableEmployees } from "@/data/auditExecutionMockData";
import { Save, X, Edit, Eye } from "lucide-react";

export const AuditSamples = () => {
  const getAnswerBadgeColor = (answer: string) => {
    switch (answer) {
      case "yes":
        return "bg-green-100 text-green-800 border-green-300";
      case "no":
        return "bg-red-100 text-red-800 border-red-300";
      case "na":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Audit Samples</h1>
        <p className="text-muted-foreground">Manage audit samples and testing data</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Audit Sample</CardTitle>
          <CardDescription>Enter the details for audit sample management</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sample-engagement-id">Audit Engagement ID</Label>
                <Input id="sample-engagement-id" placeholder="Enter Engagement ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sample-concern-sn">Audit Concern SN</Label>
                <Input id="sample-concern-sn" placeholder="Enter Concern SN" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sample-id">Sample ID</Label>
                <Input id="sample-id" placeholder="Enter Sample ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="field01">Field 01</Label>
                <Input id="field01" placeholder="Enter Field 01" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="field02">Field 02</Label>
                <Input id="field02" placeholder="Enter Field 02" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="field03">Field 03</Label>
                <Input id="field03" placeholder="Enter Field 03" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="field04">Field 04</Label>
                <Input id="field04" placeholder="Enter Field 04" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="field05">Field 05</Label>
                <Input id="field05" placeholder="Enter Field 05" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="answer">Answer</Label>
                <Select>
                  <SelectTrigger id="answer">
                    <SelectValue placeholder="Select Answer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="na">Not Applicable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountable-employee">Accountable Employee</Label>
                <Select>
                  <SelectTrigger id="accountable-employee">
                    <SelectValue placeholder="Select Employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {accountableEmployees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" />
                Save Sample
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
          <CardTitle>Existing Audit Samples</CardTitle>
          <CardDescription>View and manage existing audit sample records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Engagement ID</TableHead>
                  <TableHead>Concern SN</TableHead>
                  <TableHead>Sample ID</TableHead>
                  <TableHead>Field 01</TableHead>
                  <TableHead>Field 02</TableHead>
                  <TableHead>Field 03</TableHead>
                  <TableHead>Answer</TableHead>
                  <TableHead>Accountable Employee</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditSamplesData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.engagementId}</TableCell>
                    <TableCell>{item.concernSn}</TableCell>
                    <TableCell>{item.sampleId}</TableCell>
                    <TableCell>{item.field01}</TableCell>
                    <TableCell>{item.field02}</TableCell>
                    <TableCell>{item.field03}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getAnswerBadgeColor(item.answer)}>
                        {item.answer === "na" ? "N/A" : item.answer.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.accountableEmployee}</TableCell>
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
