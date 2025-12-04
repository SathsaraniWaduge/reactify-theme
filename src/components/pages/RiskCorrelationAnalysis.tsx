import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { riskCorrelations, riskFactorWeights } from "@/data/riskManagementMockData";
import { GitBranch, Download, RefreshCw, Info } from "lucide-react";

export const RiskCorrelationAnalysis = () => {
  const getCorrelationColor = (correlation: number) => {
    if (correlation >= 0.7) return 'bg-red-600 text-white';
    if (correlation >= 0.5) return 'bg-orange-500 text-white';
    if (correlation >= 0.3) return 'bg-yellow-500 text-black';
    return 'bg-green-500 text-white';
  };

  const getStrengthBadge = (strength: string) => {
    switch (strength) {
      case 'Strong': return 'bg-red-100 text-red-600';
      case 'Moderate': return 'bg-yellow-100 text-yellow-700';
      case 'Weak': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Create correlation matrix
  const factors = riskFactorWeights.map(f => f.name);
  const correlationMatrix = factors.map(f1 => {
    return factors.map(f2 => {
      if (f1 === f2) return 1;
      const found = riskCorrelations.find(
        c => (c.factor1 === f1 && c.factor2 === f2) || (c.factor1 === f2 && c.factor2 === f1)
      );
      return found ? found.correlation : 0.1 + Math.random() * 0.3;
    });
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground mb-2">
            Dashboard / Risk Management / Correlation Analysis
          </div>
          <h1 className="text-3xl font-bold">Risk Correlation Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Analyze relationships between risk factors to identify dependencies and compounding risks
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Recalculate
          </Button>
          <Button className="bg-gold text-black hover:bg-gold/90">
            <Download className="h-4 w-4 mr-2" />
            Export Analysis
          </Button>
        </div>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Understanding Correlation Analysis</h4>
              <p className="text-sm text-blue-700 mt-1">
                Correlation values range from 0 to 1, where 1 indicates perfect positive correlation. 
                Strong correlations (≥0.7) suggest that risk factors move together and may require 
                coordinated mitigation strategies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Factor Pairs</div>
            <div className="text-3xl font-bold text-gold">{riskCorrelations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Strong Correlations</div>
            <div className="text-3xl font-bold text-red-600">
              {riskCorrelations.filter(c => c.strength === 'Strong').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Moderate Correlations</div>
            <div className="text-3xl font-bold text-orange-500">
              {riskCorrelations.filter(c => c.strength === 'Moderate').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Weak Correlations</div>
            <div className="text-3xl font-bold text-green-600">
              {riskCorrelations.filter(c => c.strength === 'Weak').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Correlation Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Correlation Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border p-2 bg-muted text-left"></th>
                  {factors.map(f => (
                    <th key={f} className="border p-2 bg-muted text-center font-medium text-xs">
                      {f.split(' ').slice(0, 2).join(' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {factors.map((f1, i) => (
                  <tr key={f1}>
                    <td className="border p-2 bg-muted font-medium text-xs">
                      {f1.split(' ').slice(0, 2).join(' ')}
                    </td>
                    {correlationMatrix[i].map((corr, j) => (
                      <td 
                        key={j} 
                        className={`border p-2 text-center font-bold ${
                          i === j ? 'bg-gray-200 text-gray-600' : getCorrelationColor(corr)
                        }`}
                      >
                        {corr.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded"></div>
              <span className="text-sm">Strong (≥0.7)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm">Moderate (0.5-0.69)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm">Weak (0.3-0.49)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">Very Weak (&lt;0.3)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Correlations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Significant Correlations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Factor 1</TableHead>
                <TableHead>Factor 2</TableHead>
                <TableHead className="text-center">Correlation</TableHead>
                <TableHead className="text-center">Strength</TableHead>
                <TableHead>Implication</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riskCorrelations.map((corr, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{corr.factor1}</TableCell>
                  <TableCell className="font-medium">{corr.factor2}</TableCell>
                  <TableCell className="text-center">
                    <span className={`px-2 py-1 rounded font-bold ${getCorrelationColor(corr.correlation)}`}>
                      {corr.correlation.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={getStrengthBadge(corr.strength)}>{corr.strength}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {corr.strength === 'Strong' 
                      ? 'High interdependency - address together'
                      : corr.strength === 'Moderate'
                      ? 'Moderate linkage - monitor both'
                      : 'Limited relationship - independent focus'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
