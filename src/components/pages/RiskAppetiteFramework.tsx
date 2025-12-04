import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { riskAppetiteFramework, reassessmentTriggers } from "@/data/riskManagementMockData";
import { Settings, Shield, AlertTriangle, CheckCircle, Clock, Save, RefreshCw, Zap } from "lucide-react";

export const RiskAppetiteFramework = () => {
  const [thresholds, setThresholds] = useState(riskAppetiteFramework.thresholds);
  const [tolerances, setTolerances] = useState(riskAppetiteFramework.tolerances);

  const getStatusColor = (current: number, max: number) => {
    const ratio = current / max;
    if (ratio >= 1) return 'text-red-600';
    if (ratio >= 0.8) return 'text-orange-500';
    return 'text-green-600';
  };

  const getProgressColor = (current: number, max: number) => {
    const ratio = current / max;
    if (ratio >= 1) return 'bg-red-600';
    if (ratio >= 0.8) return 'bg-orange-500';
    return 'bg-green-600';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground mb-2">
            Dashboard / Risk Management / Risk Appetite Framework
          </div>
          <h1 className="text-3xl font-bold">Risk Appetite Framework</h1>
          <p className="text-muted-foreground mt-1">
            Configure organizational risk tolerance levels and automated reassessment triggers
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button className="bg-gold text-black hover:bg-gold/90">
            <Save className="h-4 w-4 mr-2" />
            Save Configuration
          </Button>
        </div>
      </div>

      <Tabs defaultValue="thresholds" className="space-y-4">
        <TabsList>
          <TabsTrigger value="thresholds">Risk Thresholds</TabsTrigger>
          <TabsTrigger value="tolerances">Category Tolerances</TabsTrigger>
          <TabsTrigger value="triggers">Reassessment Triggers</TabsTrigger>
        </TabsList>

        <TabsContent value="thresholds">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Threshold Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Risk Level Thresholds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(thresholds).map(([level, config]) => (
                  <div key={level} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: config.color }}></div>
                        <span className="font-medium capitalize">{level}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {config.min} - {config.max}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground pl-6">{config.action}</div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          backgroundColor: config.color,
                          width: `${config.max - config.min}%`,
                          marginLeft: `${config.min}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Visual Scale */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Risk Scale Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 relative rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex flex-col">
                    <div className="flex-1 bg-red-600 flex items-center justify-center text-white font-bold">
                      EXTREME (80-100)
                    </div>
                    <div className="flex-1 bg-orange-500 flex items-center justify-center text-white font-bold">
                      HIGH (60-79)
                    </div>
                    <div className="flex-1 bg-yellow-500 flex items-center justify-center text-black font-bold">
                      MEDIUM (40-59)
                    </div>
                    <div className="flex-1 bg-green-500 flex items-center justify-center text-white font-bold">
                      LOW (0-39)
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Adjust thresholds to align with your organization's risk appetite. Changes will affect how entities are classified and trigger appropriate actions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tolerances">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Category Risk Tolerances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-center">Max Extreme</TableHead>
                    <TableHead className="text-center">Current Extreme</TableHead>
                    <TableHead className="text-center">Max High</TableHead>
                    <TableHead className="text-center">Current High</TableHead>
                    <TableHead className="text-center">Extreme Status</TableHead>
                    <TableHead className="text-center">High Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tolerances.map((tolerance) => (
                    <TableRow key={tolerance.category}>
                      <TableCell className="font-medium">{tolerance.category}</TableCell>
                      <TableCell className="text-center">{tolerance.maxExtremeCount}</TableCell>
                      <TableCell className={`text-center font-bold ${getStatusColor(tolerance.currentExtreme, tolerance.maxExtremeCount)}`}>
                        {tolerance.currentExtreme}
                      </TableCell>
                      <TableCell className="text-center">{tolerance.maxHighCount}</TableCell>
                      <TableCell className={`text-center font-bold ${getStatusColor(tolerance.currentHigh, tolerance.maxHighCount)}`}>
                        {tolerance.currentHigh}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={(tolerance.currentExtreme / tolerance.maxExtremeCount) * 100} 
                            className="h-2 flex-1"
                          />
                          {tolerance.currentExtreme >= tolerance.maxExtremeCount ? (
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={(tolerance.currentHigh / tolerance.maxHighCount) * 100} 
                            className="h-2 flex-1"
                          />
                          {tolerance.currentHigh >= tolerance.maxHighCount ? (
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="triggers">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Automated Reassessment Triggers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trigger ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead className="text-center">Frequency</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Last Triggered</TableHead>
                    <TableHead className="text-center">Trigger Count</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reassessmentTriggers.map((trigger) => (
                    <TableRow key={trigger.id}>
                      <TableCell className="font-mono text-sm">{trigger.id}</TableCell>
                      <TableCell className="font-medium">{trigger.name}</TableCell>
                      <TableCell className="text-sm max-w-[200px]">{trigger.condition}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{trigger.frequency}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={trigger.status === 'Active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}>
                          {trigger.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center text-sm">{trigger.lastTriggered}</TableCell>
                      <TableCell className="text-center font-bold">{trigger.triggerCount}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex gap-1 justify-center">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">Disable</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
