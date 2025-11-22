import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Download, Eye, Edit } from "lucide-react";

export const AnnualAuditPlan = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Annual Audit Plan</h1>
          <p className="text-sm text-muted-foreground">
            Dashboard / Audit Planner / Annual Audit Plan
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Plan
          </Button>
          <Button className="bg-gold text-black hover:bg-gold-rich">
            <Plus className="h-4 w-4 mr-2" />
            Create New Plan
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Audits", value: "24" },
          { label: "2024", value: "6" },
          { label: "2023", value: "8" },
          { label: "2022", value: "10" },
        ].map((stat) => (
          <Card key={stat.label} className="hover:shadow-lg transition-all cursor-pointer group">
            <CardContent className="p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold to-gold-rich opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="text-sm text-muted-foreground group-hover:text-black">{stat.label}</div>
                <div className="text-3xl font-bold text-gold group-hover:text-black mt-2">{stat.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Annual Audit Plan Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create Annual Audit Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="planYear">Plan Year *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auditCategory">Audit Category *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="financial">Financial Audit</SelectItem>
                    <SelectItem value="operational">Operational Audit</SelectItem>
                    <SelectItem value="compliance">Compliance Audit</SelectItem>
                    <SelectItem value="it">IT Audit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input type="date" id="startDate" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input type="date" id="endDate" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="objectives">Audit Objectives *</Label>
              <Textarea
                id="objectives"
                placeholder="Enter audit objectives and scope"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scope">Audit Scope</Label>
              <Textarea
                id="scope"
                placeholder="Define the scope and boundaries of the audit"
                className="min-h-[80px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="leadAuditor">Lead Auditor *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lead auditor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="silva">A. Silva</SelectItem>
                    <SelectItem value="perera">K. Perera</SelectItem>
                    <SelectItem value="fernando">N. Fernando</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedHours">Estimated Hours *</Label>
                <Input type="number" id="estimatedHours" placeholder="Enter estimated hours" />
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-gold text-black hover:bg-gold-rich">
                Create Annual Plan
              </Button>
              <Button type="reset" variant="outline">
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Existing Annual Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Annual Audit Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Year</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Start Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">End Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { year: "2024", category: "Financial", start: "2024-01-01", end: "2024-12-31", status: "Active" },
                  { year: "2023", category: "Operational", start: "2023-01-01", end: "2023-12-31", status: "Completed" },
                  { year: "2023", category: "IT Audit", start: "2023-03-01", end: "2023-11-30", status: "Completed" },
                ].map((plan, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{plan.year}</td>
                    <td className="py-3 px-4">{plan.category}</td>
                    <td className="py-3 px-4">{plan.start}</td>
                    <td className="py-3 px-4">{plan.end}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={plan.status === "Active" ? "bg-success/10 text-success" : "bg-muted"}>
                        {plan.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
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
