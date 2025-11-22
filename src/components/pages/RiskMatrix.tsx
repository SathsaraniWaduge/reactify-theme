import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const RiskMatrix = () => {
  const riskMatrix = [
    { impact: "Very High", likelihood: ["Medium", "High", "High", "Extreme", "Extreme"] },
    { impact: "High", likelihood: ["Medium", "Medium", "High", "High", "Extreme"] },
    { impact: "Medium", likelihood: ["Low", "Medium", "Medium", "High", "High"] },
    { impact: "Low", likelihood: ["Low", "Low", "Medium", "Medium", "High"] },
    { impact: "Very Low", likelihood: ["Low", "Low", "Low", "Medium", "Medium"] },
  ];

  const likelihoodLabels = ["Rare", "Unlikely", "Possible", "Likely", "Almost Certain"];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Extreme":
        return "bg-red-600 text-white";
      case "High":
        return "bg-orange-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-black";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="text-sm text-muted-foreground mb-2">
          <a href="#" className="hover:underline">Dashboard</a> / <a href="#" className="hover:underline">Risk Management</a> / Risk Matrix
        </div>
        <h1 className="text-3xl font-bold mb-2">Risk Matrix</h1>
        <p className="text-muted-foreground">
          Visual representation of risk levels based on impact and likelihood to prioritize audit activities and risk mitigation efforts.
        </p>
      </div>

      {/* Risk Level Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded"></div>
              <span>Extreme Risk - Immediate action required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded"></div>
              <span>High Risk - Senior management attention needed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-500 rounded"></div>
              <span>Medium Risk - Management responsibility</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded"></div>
              <span>Low Risk - Routine procedures</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-3 bg-muted text-left font-semibold">Impact / Likelihood</th>
                  {likelihoodLabels.map((label) => (
                    <th key={label} className="border p-3 bg-muted text-center font-semibold min-w-[120px]">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {riskMatrix.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border p-3 bg-muted font-semibold">{row.impact}</td>
                    {row.likelihood.map((risk, colIndex) => (
                      <td key={colIndex} className={`border p-4 text-center ${getRiskColor(risk)}`}>
                        <div className="font-bold">{risk}</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Current Risk Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Extreme Risk</div>
            <div className="text-3xl font-bold text-red-600">3</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">High Risk</div>
            <div className="text-3xl font-bold text-orange-500">8</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Medium Risk</div>
            <div className="text-3xl font-bold text-yellow-600">15</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Low Risk</div>
            <div className="text-3xl font-bold text-green-600">24</div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
