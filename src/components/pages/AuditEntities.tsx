import { auditEntities } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye } from "lucide-react";

export const AuditEntities = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Audit Entities</h1>
          <p className="text-sm text-muted-foreground">
            Dashboard / Master Data / Audit Entities
          </p>
        </div>
        <Button className="bg-gold text-black hover:bg-gold-rich">
          <Plus className="h-4 w-4 mr-2" />
          Add New Entity
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Entities", value: "28" },
          { label: "High Risk", value: "5" },
          { label: "Medium Risk", value: "12" },
          { label: "Low Risk", value: "11" },
        ].map((stat) => (
          <Card key={stat.label} className="hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-3xl font-bold text-gold mt-2">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Entities Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Audit Entities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">
                    Code
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">
                    Entity Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">
                    Risk Level
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">
                    Last Audit
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {auditEntities.map((entity) => (
                  <tr key={entity.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{entity.code}</td>
                    <td className="py-3 px-4">{entity.name}</td>
                    <td className="py-3 px-4">{entity.category}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={
                          entity.riskLevel === "High"
                            ? "bg-destructive/10 text-destructive"
                            : entity.riskLevel === "Medium"
                            ? "bg-warning/10 text-warning"
                            : "bg-success/10 text-success"
                        }
                      >
                        {entity.riskLevel}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{entity.lastAuditDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
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
