import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "@/hooks/use-toast";
import {
  Plus, Calendar, Download, Eye, Edit, Trash2, RefreshCw, FileText, 
  AlertTriangle, CheckCircle, Clock, BarChart3, Users, Target,
  ChevronDown, ChevronUp, Building2, Server, UserCheck, TrendingUp,
  FileSpreadsheet, Wand2, Filter, Search, X
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import {
  AuditPlanItem, generateAuditPlan, getMonthlyDistribution,
  getPlanRiskDistribution, getPlanProgress, getResourceAllocation,
  auditors, teamMemberPool, auditCategories, auditStatuses, riskLevels,
  annualPlan2025
} from "@/data/annualPlanMockData";
import { auditEntities } from "@/data/riskManagementMockData";

const RISK_COLORS = {
  Extreme: "hsl(0, 84%, 60%)",
  High: "hsl(25, 95%, 53%)",
  Medium: "hsl(45, 93%, 47%)",
  Low: "hsl(142, 76%, 36%)",
};

const STATUS_COLORS = {
  Completed: "bg-success/10 text-success border-success/20",
  "In Progress": "bg-warning/10 text-warning border-warning/20",
  Planned: "bg-primary/10 text-primary border-primary/20",
  Delayed: "bg-destructive/10 text-destructive border-destructive/20",
  Cancelled: "bg-muted text-muted-foreground",
};

export const AnnualAuditPlan = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [auditPlan, setAuditPlan] = useState<AuditPlanItem[]>(annualPlan2025);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRisk, setFilterRisk] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [editingItem, setEditingItem] = useState<AuditPlanItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null);

  // Form state for add/edit
  const [formData, setFormData] = useState<Partial<AuditPlanItem>>({});

  const monthlyDistribution = useMemo(() => getMonthlyDistribution(auditPlan), [auditPlan]);
  const riskDistribution = useMemo(() => getPlanRiskDistribution(auditPlan), [auditPlan]);
  const progressMetrics = useMemo(() => getPlanProgress(auditPlan), [auditPlan]);
  const resourceAllocation = useMemo(() => getResourceAllocation(auditPlan), [auditPlan]);

  // Filtered audits
  const filteredAudits = useMemo(() => {
    return auditPlan.filter(audit => {
      if (searchQuery && !audit.entityName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !audit.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filterRisk !== "all" && audit.riskLevel !== filterRisk) return false;
      if (filterStatus !== "all" && audit.status !== filterStatus) return false;
      if (filterCategory !== "all" && audit.category !== filterCategory) return false;
      return true;
    });
  }, [auditPlan, searchQuery, filterRisk, filterStatus, filterCategory]);

  // Auto-generate plan
  const handleGeneratePlan = () => {
    const newPlan = generateAuditPlan(selectedYear);
    setAuditPlan(newPlan);
    toast({
      title: "Plan Generated",
      description: `Generated ${newPlan.length} audit items for ${selectedYear} based on risk assessments.`,
    });
  };

  // Add new audit item
  const handleAddItem = () => {
    if (!formData.entityId || !formData.scheduledMonth) {
      toast({ title: "Error", description: "Please fill required fields", variant: "destructive" });
      return;
    }

    const entity = auditEntities.find(e => e.id === formData.entityId);
    if (!entity) return;

    const newItem: AuditPlanItem = {
      id: `AP-${selectedYear}-${String(auditPlan.length + 1).padStart(4, '0')}`,
      entityId: entity.id,
      entityName: entity.name,
      entityType: entity.entityType,
      category: formData.category || 'Operational',
      riskLevel: entity.riskLevel,
      riskScore: entity.overallRiskScore,
      scheduledMonth: formData.scheduledMonth,
      startDate: formData.startDate || new Date().toISOString().split('T')[0],
      endDate: formData.endDate || new Date().toISOString().split('T')[0],
      status: 'Planned',
      leadAuditor: formData.leadAuditor || auditors[0].name,
      teamMembers: formData.teamMembers || [],
      estimatedDays: formData.estimatedDays || 5,
      objectives: formData.objectives || [],
      progress: 0,
      notes: formData.notes,
    };

    setAuditPlan([...auditPlan, newItem]);
    setFormData({});
    setIsAddDialogOpen(false);
    toast({ title: "Success", description: "Audit item added to the plan" });
  };

  // Edit audit item
  const handleEditItem = () => {
    if (!editingItem) return;
    
    setAuditPlan(auditPlan.map(item => 
      item.id === editingItem.id ? { ...editingItem, ...formData } : item
    ));
    setEditingItem(null);
    setFormData({});
    toast({ title: "Success", description: "Audit item updated" });
  };

  // Delete audit item
  const handleDeleteItem = (id: string) => {
    setAuditPlan(auditPlan.filter(item => item.id !== id));
    toast({ title: "Deleted", description: "Audit item removed from plan" });
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text(`BOC Bank - Annual Audit Plan ${selectedYear}`, 14, 20);
    
    // Summary
    doc.setFontSize(12);
    doc.text(`Total Audits: ${progressMetrics.total}`, 14, 35);
    doc.text(`Completed: ${progressMetrics.completed} | In Progress: ${progressMetrics.inProgress} | Planned: ${progressMetrics.planned}`, 14, 42);
    doc.text(`Completion Rate: ${progressMetrics.completionRate}%`, 14, 49);
    
    // Risk distribution
    doc.text(`Risk Distribution: Extreme(${riskDistribution.extreme}) | High(${riskDistribution.high}) | Medium(${riskDistribution.medium}) | Low(${riskDistribution.low})`, 14, 56);
    
    // Table
    autoTable(doc, {
      startY: 65,
      head: [['ID', 'Entity', 'Type', 'Category', 'Risk', 'Month', 'Status', 'Lead Auditor', 'Days']],
      body: filteredAudits.map(audit => [
        audit.id,
        audit.entityName.substring(0, 25),
        audit.entityType,
        audit.category,
        audit.riskLevel,
        ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][audit.scheduledMonth - 1],
        audit.status,
        audit.leadAuditor,
        audit.estimatedDays.toString(),
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [212, 175, 55] },
    });
    
    doc.save(`BOC_Annual_Audit_Plan_${selectedYear}.pdf`);
    toast({ title: "Exported", description: "PDF downloaded successfully" });
  };

  // Export to Excel
  const exportToExcel = () => {
    const wsData = filteredAudits.map(audit => ({
      'Audit ID': audit.id,
      'Entity ID': audit.entityId,
      'Entity Name': audit.entityName,
      'Entity Type': audit.entityType,
      'Category': audit.category,
      'Risk Level': audit.riskLevel,
      'Risk Score': audit.riskScore,
      'Scheduled Month': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][audit.scheduledMonth - 1],
      'Start Date': audit.startDate,
      'End Date': audit.endDate,
      'Status': audit.status,
      'Lead Auditor': audit.leadAuditor,
      'Team Members': audit.teamMembers.join(', '),
      'Estimated Days': audit.estimatedDays,
      'Actual Days': audit.actualDays || '',
      'Progress': `${audit.progress}%`,
      'Findings': audit.findings || '',
      'Objectives': audit.objectives.join('; '),
      'Notes': audit.notes || '',
    }));
    
    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Audit Plan');
    
    // Add summary sheet
    const summaryData = [
      { Metric: 'Total Audits', Value: progressMetrics.total },
      { Metric: 'Completed', Value: progressMetrics.completed },
      { Metric: 'In Progress', Value: progressMetrics.inProgress },
      { Metric: 'Planned', Value: progressMetrics.planned },
      { Metric: 'Delayed', Value: progressMetrics.delayed },
      { Metric: 'Completion Rate', Value: `${progressMetrics.completionRate}%` },
      { Metric: 'Extreme Risk Audits', Value: riskDistribution.extreme },
      { Metric: 'High Risk Audits', Value: riskDistribution.high },
      { Metric: 'Medium Risk Audits', Value: riskDistribution.medium },
      { Metric: 'Low Risk Audits', Value: riskDistribution.low },
    ];
    const summaryWs = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');
    
    XLSX.writeFile(wb, `BOC_Annual_Audit_Plan_${selectedYear}.xlsx`);
    toast({ title: "Exported", description: "Excel file downloaded successfully" });
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'Branch': return <Building2 className="h-4 w-4" />;
      case 'IT System': return <Server className="h-4 w-4" />;
      default: return <UserCheck className="h-4 w-4" />;
    }
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Annual Audit Plan</h1>
          <p className="text-sm text-muted-foreground">
            Risk-based audit planning with automated scheduling and CRUD management
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(parseInt(v))}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={handleGeneratePlan}>
            <Wand2 className="h-4 w-4 mr-2" />
            Auto-Generate
          </Button>
          
          <Button variant="outline" onClick={exportToExcel}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Excel
          </Button>
          
          <Button variant="outline" onClick={exportToPDF}>
            <FileText className="h-4 w-4 mr-2" />
            PDF
          </Button>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Add Audit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Audit Item</DialogTitle>
              </DialogHeader>
              <AuditFormFields 
                formData={formData} 
                setFormData={setFormData}
                entities={auditEntities}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleAddItem}>Add to Plan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold">{progressMetrics.total}</div>
            <div className="text-xs text-muted-foreground">Total Audits</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div className="text-2xl font-bold">{progressMetrics.completed}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div className="text-2xl font-bold">{progressMetrics.inProgress}</div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div className="text-2xl font-bold">{riskDistribution.extreme + riskDistribution.high}</div>
            <div className="text-xs text-muted-foreground">High Risk</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-info" />
            </div>
            <div className="text-2xl font-bold">{progressMetrics.completionRate}%</div>
            <div className="text-xs text-muted-foreground">Completion</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold">{resourceAllocation.length}</div>
            <div className="text-xs text-muted-foreground">Auditors</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Metrics */}
      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="charts">Analytics</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        {/* Calendar View */}
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Monthly Audit Distribution - {selectedYear}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {monthlyDistribution.map((month, index) => (
                  <Collapsible 
                    key={month.month}
                    open={expandedMonth === index}
                    onOpenChange={() => setExpandedMonth(expandedMonth === index ? null : index)}
                  >
                    <Card className="border-2 hover:border-primary transition-all cursor-pointer">
                      <CollapsibleTrigger asChild>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold text-lg">{month.month}</span>
                            <Badge variant="outline">{month.total} audits</Badge>
                          </div>
                          
                          {/* Risk indicators */}
                          <div className="flex gap-1 mb-3">
                            {month.extreme > 0 && (
                              <div className="h-2 rounded" style={{ width: `${(month.extreme / month.total) * 100}%`, backgroundColor: RISK_COLORS.Extreme }} />
                            )}
                            {month.high > 0 && (
                              <div className="h-2 rounded" style={{ width: `${(month.high / month.total) * 100}%`, backgroundColor: RISK_COLORS.High }} />
                            )}
                            {month.medium > 0 && (
                              <div className="h-2 rounded" style={{ width: `${(month.medium / month.total) * 100}%`, backgroundColor: RISK_COLORS.Medium }} />
                            )}
                            {month.low > 0 && (
                              <div className="h-2 rounded" style={{ width: `${(month.low / month.total) * 100}%`, backgroundColor: RISK_COLORS.Low }} />
                            )}
                          </div>
                          
                          <div className="grid grid-cols-4 gap-1 text-xs text-center">
                            <div><span className="font-bold text-destructive">{month.extreme}</span><br/>Ext</div>
                            <div><span className="font-bold text-orange-500">{month.high}</span><br/>High</div>
                            <div><span className="font-bold text-yellow-500">{month.medium}</span><br/>Med</div>
                            <div><span className="font-bold text-success">{month.low}</span><br/>Low</div>
                          </div>
                          
                          <div className="flex items-center justify-center mt-3">
                            {expandedMonth === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </div>
                        </CardContent>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <div className="border-t px-4 pb-4 max-h-48 overflow-y-auto">
                          {auditPlan.filter(a => a.scheduledMonth === index + 1).slice(0, 5).map(audit => (
                            <div key={audit.id} className="flex items-center justify-between py-2 border-b last:border-0">
                              <div className="flex items-center gap-2">
                                {getEntityIcon(audit.entityType)}
                                <span className="text-sm truncate max-w-[120px]">{audit.entityName}</span>
                              </div>
                              <Badge 
                                variant="outline" 
                                className="text-xs"
                                style={{ borderColor: RISK_COLORS[audit.riskLevel], color: RISK_COLORS[audit.riskLevel] }}
                              >
                                {audit.riskLevel}
                              </Badge>
                            </div>
                          ))}
                          {auditPlan.filter(a => a.scheduledMonth === index + 1).length > 5 && (
                            <p className="text-xs text-muted-foreground text-center pt-2">
                              +{auditPlan.filter(a => a.scheduledMonth === index + 1).length - 5} more
                            </p>
                          )}
                        </div>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" name="Completed" fill="hsl(142, 76%, 36%)" stackId="a" />
                  <Bar dataKey="inProgress" name="In Progress" fill="hsl(38, 92%, 50%)" stackId="a" />
                  <Bar dataKey="planned" name="Planned" fill="hsl(220, 70%, 50%)" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="charts" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Distribution Pie */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Extreme', value: riskDistribution.extreme, fill: RISK_COLORS.Extreme },
                        { name: 'High', value: riskDistribution.high, fill: RISK_COLORS.High },
                        { name: 'Medium', value: riskDistribution.medium, fill: RISK_COLORS.Medium },
                        { name: 'Low', value: riskDistribution.low, fill: RISK_COLORS.Low },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Audit Trend by Risk Level</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="extreme" name="Extreme" stroke={RISK_COLORS.Extreme} fill={RISK_COLORS.Extreme} fillOpacity={0.3} stackId="1" />
                    <Area type="monotone" dataKey="high" name="High" stroke={RISK_COLORS.High} fill={RISK_COLORS.High} fillOpacity={0.3} stackId="1" />
                    <Area type="monotone" dataKey="medium" name="Medium" stroke={RISK_COLORS.Medium} fill={RISK_COLORS.Medium} fillOpacity={0.3} stackId="1" />
                    <Area type="monotone" dataKey="low" name="Low" stroke={RISK_COLORS.Low} fill={RISK_COLORS.Low} fillOpacity={0.3} stackId="1" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Plan Execution Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Overall Completion</span>
                  <span className="font-bold">{progressMetrics.completionRate}%</span>
                </div>
                <Progress value={progressMetrics.completionRate} className="h-3" />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <div className="text-2xl font-bold text-success">{progressMetrics.completed}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-warning/10 rounded-lg">
                    <div className="text-2xl font-bold text-warning">{progressMetrics.inProgress}</div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{progressMetrics.planned}</div>
                    <div className="text-sm text-muted-foreground">Planned</div>
                  </div>
                  <div className="text-center p-4 bg-destructive/10 rounded-lg">
                    <div className="text-2xl font-bold text-destructive">{progressMetrics.delayed}</div>
                    <div className="text-sm text-muted-foreground">Delayed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Resource Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Auditor</TableHead>
                    <TableHead>Assigned Audits</TableHead>
                    <TableHead>Total Days</TableHead>
                    <TableHead>Workload</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resourceAllocation.map((resource, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{resource.auditor}</TableCell>
                      <TableCell>{resource.audits}</TableCell>
                      <TableCell>{resource.days} days</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={Math.min((resource.days / 200) * 100, 100)} className="w-24 h-2" />
                          <span className="text-sm text-muted-foreground">
                            {Math.round((resource.days / 200) * 100)}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* List View Tab */}
        <TabsContent value="list" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search audits..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterRisk} onValueChange={setFilterRisk}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Risk Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risks</SelectItem>
                    {riskLevels.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {auditStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {auditCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                {(searchQuery || filterRisk !== "all" || filterStatus !== "all" || filterCategory !== "all") && (
                  <Button variant="ghost" onClick={() => {
                    setSearchQuery("");
                    setFilterRisk("all");
                    setFilterStatus("all");
                    setFilterCategory("all");
                  }}>
                    <X className="h-4 w-4 mr-1" /> Clear
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Audit Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Audit Items ({filteredAudits.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Entity</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Risk</TableHead>
                      <TableHead>Month</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Lead</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAudits.slice(0, 20).map((audit) => (
                      <TableRow key={audit.id}>
                        <TableCell className="font-mono text-sm">{audit.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getEntityIcon(audit.entityType)}
                            <span className="truncate max-w-[150px]">{audit.entityName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{audit.category}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            style={{ borderColor: RISK_COLORS[audit.riskLevel], color: RISK_COLORS[audit.riskLevel] }}
                          >
                            {audit.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>{months[audit.scheduledMonth - 1]}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={STATUS_COLORS[audit.status]}>
                            {audit.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={audit.progress} className="w-16 h-2" />
                            <span className="text-xs">{audit.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{audit.leadAuditor}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => { setEditingItem(audit); setFormData(audit); }}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Edit Audit Item</DialogTitle>
                                </DialogHeader>
                                <AuditFormFields 
                                  formData={formData} 
                                  setFormData={setFormData}
                                  entities={auditEntities}
                                  isEdit
                                />
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <Button onClick={handleEditItem}>Save Changes</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Audit Item?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will remove "{audit.entityName}" from the annual plan.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteItem(audit.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredAudits.length > 20 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Showing 20 of {filteredAudits.length} items. Use filters to narrow results.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Form Fields Component
const AuditFormFields = ({ 
  formData, 
  setFormData, 
  entities,
  isEdit = false 
}: { 
  formData: Partial<AuditPlanItem>; 
  setFormData: (data: Partial<AuditPlanItem>) => void;
  entities: any[];
  isEdit?: boolean;
}) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        {!isEdit && (
          <div className="space-y-2">
            <Label>Entity *</Label>
            <Select value={formData.entityId} onValueChange={(v) => setFormData({ ...formData, entityId: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select entity" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {entities.slice(0, 50).map(e => (
                  <SelectItem key={e.id} value={e.id}>
                    {e.name} ({e.riskLevel})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="space-y-2">
          <Label>Category *</Label>
          <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v as any })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {auditCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Scheduled Month *</Label>
          <Select 
            value={formData.scheduledMonth?.toString()} 
            onValueChange={(v) => setFormData({ ...formData, scheduledMonth: parseInt(v) })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m, i) => <SelectItem key={i} value={(i + 1).toString()}>{m}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Lead Auditor *</Label>
          <Select value={formData.leadAuditor} onValueChange={(v) => setFormData({ ...formData, leadAuditor: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select auditor" />
            </SelectTrigger>
            <SelectContent>
              {auditors.map(a => <SelectItem key={a.id} value={a.name}>{a.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Start Date</Label>
          <Input 
            type="date" 
            value={formData.startDate} 
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>End Date</Label>
          <Input 
            type="date" 
            value={formData.endDate} 
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Estimated Days</Label>
          <Input 
            type="number" 
            value={formData.estimatedDays} 
            onChange={(e) => setFormData({ ...formData, estimatedDays: parseInt(e.target.value) })}
          />
        </div>
        {isEdit && (
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as any })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {auditStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea 
          value={formData.notes || ''} 
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes..."
        />
      </div>
    </div>
  );
};
