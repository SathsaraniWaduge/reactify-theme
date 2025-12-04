import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auditEntities, riskFactorWeights, riskDistribution } from "@/data/riskManagementMockData";
import { Calculator, Settings, RefreshCw, Download, Search, Filter, TrendingUp, TrendingDown, Minus } from "lucide-react";

export const RiskScoringEngine = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [weights, setWeights] = useState(riskFactorWeights.map(w => ({ ...w })));
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const filteredEntities = auditEntities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          entity.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || entity.category === categoryFilter;
    const matchesRisk = riskFilter === "all" || entity.riskLevel === riskFilter;
    return matchesSearch && matchesCategory && matchesRisk;
  });

  const totalPages = Math.ceil(filteredEntities.length / itemsPerPage);
  const paginatedEntities = filteredEntities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getRiskBadgeClass = (level: string) => {
    switch (level) {
      case 'Extreme': return 'bg-red-600 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-black';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-green-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const categories = [...new Set(auditEntities.map(e => e.category))];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground mb-2">
            Dashboard / Risk Management / Risk Scoring Engine
          </div>
          <h1 className="text-3xl font-bold">Risk Scoring Engine</h1>
          <p className="text-muted-foreground mt-1">
            Automated continuous risk scoring for {auditEntities.length}+ audit entities using weighted multi-factor algorithm
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Recalculate All
          </Button>
          <Button className="bg-gold text-black hover:bg-gold/90">
            <Download className="h-4 w-4 mr-2" />
            Export Scores
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Entities</div>
            <div className="text-3xl font-bold text-gold">{auditEntities.length}</div>
          </CardContent>
        </Card>
        <Card className="border-red-200">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Extreme Risk</div>
            <div className="text-3xl font-bold text-red-600">{riskDistribution.extreme}</div>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">High Risk</div>
            <div className="text-3xl font-bold text-orange-500">{riskDistribution.high}</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Medium Risk</div>
            <div className="text-3xl font-bold text-yellow-600">{riskDistribution.medium}</div>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Low Risk</div>
            <div className="text-3xl font-bold text-green-600">{riskDistribution.low}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="entities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="entities">Entity Scores</TabsTrigger>
          <TabsTrigger value="weights">Factor Weights Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="entities">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Entity Risk Scores
                </CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search entities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={riskFilter} onValueChange={setRiskFilter}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Risk Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Extreme">Extreme</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                Showing {paginatedEntities.length} of {filteredEntities.length} entities
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entity ID</TableHead>
                    <TableHead>Entity Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-center">Financial</TableHead>
                    <TableHead className="text-center">Regulatory</TableHead>
                    <TableHead className="text-center">Operational</TableHead>
                    <TableHead className="text-center">Historical</TableHead>
                    <TableHead className="text-center">External</TableHead>
                    <TableHead className="text-center">Overall Score</TableHead>
                    <TableHead className="text-center">Risk Level</TableHead>
                    <TableHead className="text-center">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedEntities.map((entity) => (
                    <TableRow key={entity.id} className="hover:bg-muted/50">
                      <TableCell className="font-mono text-sm">{entity.id}</TableCell>
                      <TableCell className="font-medium">{entity.name}</TableCell>
                      <TableCell>{entity.category}</TableCell>
                      <TableCell className="text-center">{entity.riskFactors.financialImpact}</TableCell>
                      <TableCell className="text-center">{entity.riskFactors.regulatoryCompliance}</TableCell>
                      <TableCell className="text-center">{entity.riskFactors.operationalComplexity}</TableCell>
                      <TableCell className="text-center">{entity.riskFactors.historicalPerformance}</TableCell>
                      <TableCell className="text-center">{entity.riskFactors.externalFactors}</TableCell>
                      <TableCell className="text-center font-bold">{entity.overallRiskScore}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={getRiskBadgeClass(entity.riskLevel)}>{entity.riskLevel}</Badge>
                      </TableCell>
                      <TableCell className="text-center">{getTrendIcon(entity.trend)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weights">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Risk Factor Weight Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Adjust the weights for each risk factor. Total must equal 100%. Changes will trigger a recalculation of all entity risk scores.
                </p>
              </div>
              
              {weights.map((factor, index) => (
                <div key={factor.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{factor.name}</div>
                      <div className="text-sm text-muted-foreground">{factor.description}</div>
                    </div>
                    <div className="text-2xl font-bold text-gold">{factor.weight}%</div>
                  </div>
                  <Slider
                    value={[factor.weight]}
                    min={0}
                    max={50}
                    step={5}
                    onValueChange={(value) => {
                      const newWeights = [...weights];
                      newWeights[index].weight = value[0];
                      setWeights(newWeights);
                    }}
                    className="w-full"
                  />
                </div>
              ))}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-lg font-semibold">
                  Total Weight: <span className={weights.reduce((sum, w) => sum + w.weight, 0) === 100 ? 'text-green-600' : 'text-red-600'}>
                    {weights.reduce((sum, w) => sum + w.weight, 0)}%
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setWeights(riskFactorWeights.map(w => ({ ...w })))}>
                    Reset to Default
                  </Button>
                  <Button className="bg-gold text-black hover:bg-gold/90" disabled={weights.reduce((sum, w) => sum + w.weight, 0) !== 100}>
                    Apply Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
