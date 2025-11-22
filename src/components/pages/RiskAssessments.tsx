import { riskAssessmentData } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, AlertTriangle, CheckCircle } from "lucide-react";

export const RiskAssessments = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Risk Assessments</h1>
          <p className="text-sm text-muted-foreground">
            Dashboard / Risk Management / Risk Assessments
          </p>
        </div>
        <Button className="bg-gold text-black hover:bg-gold-rich">
          <Plus className="h-4 w-4 mr-2" />
          Create Risk Assessment
        </Button>
      </div>

      {/* Risk Matrix Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6 p-4 bg-muted rounded-lg">
            <div className="font-semibold">Risk Levels</div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-success" />
                <span className="text-sm">Low Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-warning" />
                <span className="text-sm">Medium Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-destructive" />
                <span className="text-sm">High Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-purple-600" />
                <span className="text-sm">Extreme Risk</span>
              </div>
            </div>
          </div>

          {/* Risk Matrix Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-3 bg-muted/50"></th>
                  <th className="border p-3 bg-muted/50 font-semibold">Insignificant</th>
                  <th className="border p-3 bg-muted/50 font-semibold">Minor</th>
                  <th className="border p-3 bg-muted/50 font-semibold">Moderate</th>
                  <th className="border p-3 bg-muted/50 font-semibold">Major</th>
                  <th className="border p-3 bg-muted/50 font-semibold">Catastrophic</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Rare", colors: ["bg-success", "bg-success", "bg-success", "bg-warning", "bg-warning"] },
                  { label: "Unlikely", colors: ["bg-success", "bg-success", "bg-warning", "bg-warning", "bg-destructive"] },
                  { label: "Possible", colors: ["bg-success", "bg-warning", "bg-warning", "bg-destructive", "bg-destructive"] },
                  { label: "Likely", colors: ["bg-warning", "bg-warning", "bg-destructive", "bg-destructive", "bg-purple-600"] },
                  { label: "Almost Certain", colors: ["bg-warning", "bg-destructive", "bg-destructive", "bg-purple-600", "bg-purple-600"] },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <th className="border p-3 bg-muted/50 font-semibold text-left">{row.label}</th>
                    {row.colors.map((color, cellIdx) => (
                      <td
                        key={cellIdx}
                        className={`border p-8 ${color} text-white text-center font-bold cursor-pointer hover:scale-105 transition-transform`}
                      >
                        {color.includes("success")
                          ? "Low"
                          : color.includes("warning")
                          ? "Medium"
                          : color.includes("purple")
                          ? "Extreme"
                          : "High"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Risk Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { label: "Total Factors", value: riskAssessmentData.totalFactors, icon: null },
              { label: "Low Risk", value: riskAssessmentData.lowRisk, icon: CheckCircle, color: "text-success" },
              { label: "Medium Risk", value: riskAssessmentData.mediumRisk, icon: AlertTriangle, color: "text-warning" },
              { label: "High Risk", value: riskAssessmentData.highRisk, icon: AlertTriangle, color: "text-destructive" },
              { label: "Extreme Risk", value: riskAssessmentData.extremeRisk, icon: AlertTriangle, color: "text-purple-600" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 text-center border rounded-lg hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-sm text-muted-foreground mb-2">{item.label}</div>
                <div className={`text-3xl font-bold ${item.color || "text-gold"}`}>
                  {item.value}
                </div>
                {item.icon && <item.icon className={`h-5 w-5 mx-auto mt-2 ${item.color}`} />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sample Risk Factors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: "Data Security", likelihood: "Likely", impact: "Major", risk: "High" },
          { name: "Compliance", likelihood: "Possible", impact: "Moderate", risk: "Medium" },
          { name: "Financial Controls", likelihood: "Unlikely", impact: "Catastrophic", risk: "High" },
        ].map((factor, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold">{factor.name}</h3>
                <Badge
                  variant="outline"
                  className={
                    factor.risk === "High"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-warning/10 text-warning"
                  }
                >
                  {factor.risk}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">📊 Likelihood:</span>
                  <span className="font-medium">{factor.likelihood}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">💥 Impact:</span>
                  <span className="font-medium">{factor.impact}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
