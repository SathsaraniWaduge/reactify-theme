import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, AlertTriangle } from "lucide-react";

export const AuditConcerns = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Audit Concerns</h1>
          <p className="text-sm text-muted-foreground">
            Dashboard / Master Data / Audit Concerns
          </p>
        </div>
        <Button className="bg-gold text-black hover:bg-gold-rich">
          <Plus className="h-4 w-4 mr-2" />
          Add Concern
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Concerns", value: "32", color: "text-gold" },
          { label: "High Priority", value: "8", color: "text-destructive" },
          { label: "Medium Priority", value: "15", color: "text-warning" },
          { label: "Resolved", value: "9", color: "text-success" },
        ].map((stat) => (
          <Card key={stat.label} className="hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className={`text-3xl font-bold ${stat.color} mt-2`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Audit Concern Form */}
      <Card>
        <CardHeader>
          <CardTitle>Report Audit Concern</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="concernId">Concern ID *</Label>
                <Input id="concernId" placeholder="e.g., AC-2024-001" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="concernType">Concern Type *</Label>
                <select id="concernType" className="w-full p-2 border rounded-lg">
                  <option value="">Select type</option>
                  <option value="financial">Financial Irregularity</option>
                  <option value="compliance">Compliance Issue</option>
                  <option value="operational">Operational Weakness</option>
                  <option value="fraud">Fraud Risk</option>
                  <option value="it">IT Security</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">Severity Level *</Label>
                <select id="severity" className="w-full p-2 border rounded-lg">
                  <option value="">Select severity</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="concernTitle">Concern Title *</Label>
              <Input id="concernTitle" placeholder="Brief title describing the concern" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="concernDescription">Detailed Description *</Label>
              <Textarea
                id="concernDescription"
                placeholder="Provide a detailed description of the concern, including observations and potential impact"
                className="min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="affectedArea">Affected Area *</Label>
                <Input id="affectedArea" placeholder="Department or process affected" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="identifiedBy">Identified By *</Label>
                <select id="identifiedBy" className="w-full p-2 border rounded-lg">
                  <option value="">Select auditor</option>
                  <option value="silva">A. Silva</option>
                  <option value="perera">K. Perera</option>
                  <option value="fernando">N. Fernando</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="identifiedDate">Date Identified *</Label>
                <Input type="date" id="identifiedDate" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedImpact">Estimated Financial Impact</Label>
                <Input type="number" id="estimatedImpact" placeholder="Amount in LKR" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recommendations">Recommendations</Label>
              <Textarea
                id="recommendations"
                placeholder="Suggested corrective actions and recommendations"
                className="min-h-[100px]"
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-gold text-black hover:bg-gold-rich">
                Submit Concern
              </Button>
              <Button type="reset" variant="outline">
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Audit Concerns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reported Concerns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Severity</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Affected Area</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "AC-2024-001", title: "Unauthorized Access Detected", type: "IT Security", severity: "High", area: "IT Department", status: "Open" },
                  { id: "AC-2024-002", title: "Reconciliation Discrepancy", type: "Financial", severity: "Medium", area: "Finance", status: "In Review" },
                  { id: "AC-2024-003", title: "Missing Documentation", type: "Compliance", severity: "Low", area: "Operations", status: "Open" },
                  { id: "AC-2023-125", title: "Approval Process Gap", type: "Operational", severity: "High", area: "Lending", status: "Resolved" },
                ].map((concern) => (
                  <tr key={concern.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium text-gold">{concern.id}</td>
                    <td className="py-3 px-4 max-w-xs truncate">{concern.title}</td>
                    <td className="py-3 px-4">{concern.type}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={
                        concern.severity === "High" || concern.severity === "Critical"
                          ? "bg-destructive/10 text-destructive"
                          : concern.severity === "Medium"
                          ? "bg-warning/10 text-warning"
                          : "bg-muted"
                      }>
                        {concern.severity === "High" && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {concern.severity}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{concern.area}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={
                        concern.status === "Resolved" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                      }>
                        {concern.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
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
