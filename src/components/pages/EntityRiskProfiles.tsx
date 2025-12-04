import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { auditEntities, getEntityRiskProfile } from "@/data/riskManagementMockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { User, Search, Download, FileText, History, Users, AlertTriangle, TrendingUp, TrendingDown, Minus } from "lucide-react";

export const EntityRiskProfiles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntity, setSelectedEntity] = useState(auditEntities[0]);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = [...new Set(auditEntities.map(e => e.category))];

  const filteredEntities = auditEntities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          entity.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || entity.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }).slice(0, 50);

  const profile = getEntityRiskProfile(selectedEntity.id);

  const radarData = [
    { factor: 'Financial', value: profile.riskFactors.financialImpact, fullMark: 100 },
    { factor: 'Regulatory', value: profile.riskFactors.regulatoryCompliance, fullMark: 100 },
    { factor: 'Operational', value: profile.riskFactors.operationalComplexity, fullMark: 100 },
    { factor: 'Historical', value: profile.riskFactors.historicalPerformance, fullMark: 100 },
    { factor: 'External', value: profile.riskFactors.externalFactors, fullMark: 100 },
  ];

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

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground mb-2">
            Dashboard / Risk Management / Entity Risk Profiles
          </div>
          <h1 className="text-3xl font-bold">Entity Risk Profiles</h1>
          <p className="text-muted-foreground mt-1">
            Detailed risk profiles for all audit entities with historical data and key contacts
          </p>
        </div>
        <Button className="bg-gold text-black hover:bg-gold/90">
          <Download className="h-4 w-4 mr-2" />
          Export Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Entity List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Select Entity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="h-[500px] overflow-y-auto space-y-2">
              {filteredEntities.map((entity) => (
                <div
                  key={entity.id}
                  onClick={() => setSelectedEntity(entity)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedEntity.id === entity.id 
                      ? 'bg-gold/20 border border-gold' 
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{entity.name}</div>
                      <div className="text-xs text-muted-foreground">{entity.id}</div>
                    </div>
                    <Badge className={`${getRiskBadgeClass(entity.riskLevel)} text-xs`}>
                      {entity.overallRiskScore}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Entity Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{profile.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{profile.id} • {profile.category} • {profile.region}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getRiskBadgeClass(profile.riskLevel)}>
                  {profile.riskLevel} Risk
                </Badge>
                {getTrendIcon(profile.trend)}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="history">Audit History</TabsTrigger>
                <TabsTrigger value="findings">Open Findings</TabsTrigger>
                <TabsTrigger value="contacts">Key Contacts</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Risk Score Card */}
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <div className="text-sm text-muted-foreground">Overall Risk Score</div>
                      <div className="text-5xl font-bold text-gold mt-2">{profile.overallRiskScore}</div>
                      <div className="text-sm text-muted-foreground mt-1">out of 100</div>
                    </div>
                    
                    <div className="space-y-3">
                      {Object.entries(profile.riskFactors).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="font-medium">{value as number}</span>
                          </div>
                          <Progress value={value as number} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Radar Chart */}
                  <div>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="factor" tick={{ fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Risk Factors" dataKey="value" stroke="#d4af37" fill="#d4af37" fillOpacity={0.5} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Risk History Chart */}
                <div className="mt-6">
                  <h4 className="font-medium mb-4">Risk Score Trend</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={profile.riskHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#d4af37" strokeWidth={2} dot={{ fill: '#d4af37' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Audit Type</TableHead>
                      <TableHead className="text-center">Findings</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead>Auditor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profile.auditHistory.map((audit, index) => (
                      <TableRow key={index}>
                        <TableCell>{audit.date}</TableCell>
                        <TableCell>{audit.type}</TableCell>
                        <TableCell className="text-center font-bold">{audit.findings}</TableCell>
                        <TableCell className="text-center">
                          <Badge className="bg-green-500 text-white">{audit.status}</Badge>
                        </TableCell>
                        <TableCell>{audit.auditor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="findings">
                <div className="space-y-4">
                  {profile.openFindings.map((finding) => (
                    <div key={finding.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className={`h-4 w-4 ${finding.severity === 'High' ? 'text-red-500' : 'text-yellow-500'}`} />
                            <span className="font-medium">{finding.id}</span>
                          </div>
                          <p className="text-sm mt-1">{finding.description}</p>
                        </div>
                        <Badge className={finding.severity === 'High' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'}>
                          {finding.severity}
                        </Badge>
                      </div>
                      <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
                        <span>Due: {finding.dueDate}</span>
                        <span>Owner: {finding.owner}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="contacts">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {profile.keyContacts.map((contact, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-muted-foreground">{contact.role}</div>
                          <div className="text-sm text-gold">{contact.email}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
