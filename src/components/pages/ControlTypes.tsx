import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";

export const ControlTypes = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Control Document Types</h1>
          <p className="text-sm text-muted-foreground">
            Dashboard / Master Data / Control Document Types
          </p>
        </div>
        <Button className="bg-gold text-black hover:bg-gold-rich">
          <Plus className="h-4 w-4 mr-2" />
          Add Control Type
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Types", value: "15" },
          { label: "Active", value: "12" },
          { label: "Preventive", value: "8" },
          { label: "Detective", value: "4" },
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

      {/* Create Control Type Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create Control Document Type</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="controlTypeId">Control Type ID *</Label>
                <Input id="controlTypeId" placeholder="e.g., CT-001" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="controlTypeName">Control Type Name *</Label>
                <Input id="controlTypeName" placeholder="Enter control type name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select id="category" className="w-full p-2 border rounded-lg">
                  <option value="">Select category</option>
                  <option value="preventive">Preventive</option>
                  <option value="detective">Detective</option>
                  <option value="corrective">Corrective</option>
                  <option value="directive">Directive</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the control type and its purpose"
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="effectivenessLevel">Effectiveness Level</Label>
                <select id="effectivenessLevel" className="w-full p-2 border rounded-lg">
                  <option value="">Select level</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Review Frequency</Label>
                <select id="frequency" className="w-full p-2 border rounded-lg">
                  <option value="">Select frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-gold text-black hover:bg-gold-rich">
                Create Control Type
              </Button>
              <Button type="reset" variant="outline">
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Control Types Table */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Control Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Effectiveness</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Frequency</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "CT-001", name: "Access Control Matrix", category: "Preventive", effectiveness: "High", frequency: "Monthly" },
                  { id: "CT-002", name: "Transaction Monitoring", category: "Detective", effectiveness: "High", frequency: "Daily" },
                  { id: "CT-003", name: "Segregation of Duties", category: "Preventive", effectiveness: "High", frequency: "Quarterly" },
                  { id: "CT-004", name: "Reconciliation Controls", category: "Detective", effectiveness: "Medium", frequency: "Weekly" },
                  { id: "CT-005", name: "Authorization Controls", category: "Preventive", effectiveness: "High", frequency: "Daily" },
                ].map((type) => (
                  <tr key={type.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium text-gold">{type.id}</td>
                    <td className="py-3 px-4">{type.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={
                        type.category === "Preventive" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                      }>
                        {type.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={
                        type.effectiveness === "High" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                      }>
                        {type.effectiveness}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{type.frequency}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
