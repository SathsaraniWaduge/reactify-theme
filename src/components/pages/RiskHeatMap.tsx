import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { heatMapData, auditEntities, riskDistribution } from "@/data/riskManagementMockData";
import { Map, RefreshCw, Download, Info, Maximize2 } from "lucide-react";

export const RiskHeatMap = () => {
  const [viewType, setViewType] = useState<"category-region" | "category-type">("category-region");

  const getHeatColor = (score: number) => {
    if (score >= 80) return 'bg-red-600';
    if (score >= 60) return 'bg-orange-500';
    if (score >= 40) return 'bg-yellow-500';
    if (score >= 20) return 'bg-green-400';
    return 'bg-green-600';
  };

  const getTextColor = (score: number) => {
    if (score >= 40 && score < 60) return 'text-black';
    return 'text-white';
  };

  const regions = ['North', 'South', 'East', 'West', 'Central', 'International'];

  // Calculate category summaries
  const categorySummary = heatMapData.map(cat => {
    const totalEntities = cat.regions.reduce((sum, r) => sum + r.entityCount, 0);
    const avgScore = cat.regions.reduce((sum, r) => sum + r.avgRiskScore * r.entityCount, 0) / totalEntities;
    const extremeCount = cat.regions.reduce((sum, r) => sum + r.extremeCount, 0);
    const highCount = cat.regions.reduce((sum, r) => sum + r.highCount, 0);
    return {
      category: cat.category,
      totalEntities,
      avgScore: Math.round(avgScore * 10) / 10,
      extremeCount,
      highCount,
    };
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground mb-2">
            Dashboard / Risk Management / Risk Heat Map
          </div>
          <h1 className="text-3xl font-bold">Risk Heat Map</h1>
          <p className="text-muted-foreground mt-1">
            Real-time visual representation of risk distribution across categories and regions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button className="bg-gold text-black hover:bg-gold/90">
            <Download className="h-4 w-4 mr-2" />
            Export Heat Map
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Extreme Risk Zones</div>
                <div className="text-3xl font-bold text-red-600">{riskDistribution.extreme}</div>
              </div>
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <Map className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">High Risk Zones</div>
                <div className="text-3xl font-bold text-orange-500">{riskDistribution.high}</div>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <Map className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Categories</div>
                <div className="text-3xl font-bold text-gold">{heatMapData.length}</div>
              </div>
              <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                <Map className="h-6 w-6 text-black" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Regions</div>
                <div className="text-3xl font-bold text-gold">{regions.length}</div>
              </div>
              <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                <Map className="h-6 w-6 text-black" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Risk Level Legend</span>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-red-600 rounded"></div>
                <span className="text-sm">Extreme (80-100)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-500 rounded"></div>
                <span className="text-sm">High (60-79)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                <span className="text-sm">Medium (40-59)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-400 rounded"></div>
                <span className="text-sm">Low (20-39)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-600 rounded"></div>
                <span className="text-sm">Very Low (0-19)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Heat Map Grid */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              Category × Region Heat Map
            </CardTitle>
            <Button variant="ghost" size="sm">
              <Maximize2 className="h-4 w-4 mr-2" />
              Fullscreen
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-3 bg-muted text-left font-semibold min-w-[140px]">Category</th>
                  {regions.map(region => (
                    <th key={region} className="border p-3 bg-muted text-center font-semibold min-w-[120px]">
                      {region}
                    </th>
                  ))}
                  <th className="border p-3 bg-muted text-center font-semibold min-w-[100px]">Total</th>
                </tr>
              </thead>
              <tbody>
                {heatMapData.map((row) => {
                  const rowTotal = row.regions.reduce((sum, r) => sum + r.entityCount, 0);
                  const rowAvg = row.regions.reduce((sum, r) => sum + r.avgRiskScore * r.entityCount, 0) / rowTotal;
                  return (
                    <tr key={row.category}>
                      <td className="border p-3 bg-muted font-semibold">{row.category}</td>
                      {row.regions.map((cell) => (
                        <td 
                          key={cell.region} 
                          className={`border p-4 text-center cursor-pointer hover:opacity-80 transition-opacity ${getHeatColor(cell.avgRiskScore)} ${getTextColor(cell.avgRiskScore)}`}
                        >
                          <div className="font-bold text-lg">{cell.avgRiskScore}</div>
                          <div className="text-xs opacity-80">{cell.entityCount} entities</div>
                          {cell.extremeCount > 0 && (
                            <Badge className="mt-1 bg-white/20 text-xs">{cell.extremeCount} extreme</Badge>
                          )}
                        </td>
                      ))}
                      <td className={`border p-4 text-center font-bold ${getHeatColor(rowAvg)} ${getTextColor(rowAvg)}`}>
                        {Math.round(rowAvg * 10) / 10}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Category Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {categorySummary.map((cat) => (
          <Card key={cat.category} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="font-semibold mb-2">{cat.category}</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Entities:</span>
                  <span className="font-medium">{cat.totalEntities}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Score:</span>
                  <span className="font-medium">{cat.avgScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Extreme:</span>
                  <span className="font-medium text-red-600">{cat.extremeCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">High:</span>
                  <span className="font-medium text-orange-500">{cat.highCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
