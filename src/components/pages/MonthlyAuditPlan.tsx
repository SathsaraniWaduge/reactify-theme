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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import {
  Plus, Calendar, Eye, Edit, Trash2, FileText,
  AlertTriangle, CheckCircle, Clock, BarChart3, Users, Target,
  ChevronLeft, ChevronRight, Building2, Server, UserCheck, TrendingUp,
  FileSpreadsheet, Search, X, CalendarDays, Bell, BellRing, PieChart
} from "lucide-react";
import {
  BarChart, Bar, PieChart as RechartsPie, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isBefore, addMonths, subMonths, parseISO, differenceInDays } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import {
  AuditPlanItem, AuditCategory, AuditStatus, RiskLevel,
  auditors, auditCategories, auditStatuses, riskLevels,
  annualPlan2025
} from "@/data/annualPlanMockData";
import { auditEntities } from "@/data/riskManagementMockData";

const RISK_COLORS = {
  Extreme: "hsl(0, 84%, 60%)",
  High: "hsl(25, 95%, 53%)",
  Medium: "hsl(45, 93%, 47%)",
  Low: "hsl(142, 76%, 36%)",
};

const RISK_BG_CLASSES = {
  Extreme: "bg-red-500/20 border-red-500/50 text-red-700 dark:text-red-300",
  High: "bg-orange-500/20 border-orange-500/50 text-orange-700 dark:text-orange-300",
  Medium: "bg-yellow-500/20 border-yellow-500/50 text-yellow-700 dark:text-yellow-300",
  Low: "bg-green-500/20 border-green-500/50 text-green-700 dark:text-green-300",
};

const STATUS_CLASSES = {
  Completed: "bg-success/10 text-success border-success/20",
  "In Progress": "bg-warning/10 text-warning border-warning/20",
  Planned: "bg-primary/10 text-primary border-primary/20",
  Delayed: "bg-destructive/10 text-destructive border-destructive/20",
  Cancelled: "bg-muted text-muted-foreground border-muted",
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const MonthlyAuditPlan = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedYear] = useState(2025);
  const [auditPlan, setAuditPlan] = useState<AuditPlanItem[]>(annualPlan2025);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRisk, setFilterRisk] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterEntityType, setFilterEntityType] = useState<string>("all");
  const [selectedAudit, setSelectedAudit] = useState<AuditPlanItem | null>(null);
  const [editingAudit, setEditingAudit] = useState<AuditPlanItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<AuditPlanItem>>({});
  const [activeTab, setActiveTab] = useState("calendar");

  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // Get audits for current month
  const monthlyAudits = useMemo(() => {
    return auditPlan.filter(audit => {
      const auditDate = parseISO(audit.startDate);
      return audit.scheduledMonth === currentMonth && 
             auditDate.getFullYear() === currentYear;
    });
  }, [auditPlan, currentMonth, currentYear]);

  // Filtered audits for display
  const filteredAudits = useMemo(() => {
    return monthlyAudits.filter(audit => {
      if (searchQuery && 
          !audit.entityName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !audit.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !audit.leadAuditor.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filterRisk !== "all" && audit.riskLevel !== filterRisk) return false;
      if (filterStatus !== "all" && audit.status !== filterStatus) return false;
      if (filterCategory !== "all" && audit.category !== filterCategory) return false;
      if (filterEntityType !== "all" && audit.entityType !== filterEntityType) return false;
      return true;
    });
  }, [monthlyAudits, searchQuery, filterRisk, filterStatus, filterCategory, filterEntityType]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = monthlyAudits.length;
    const completed = monthlyAudits.filter(a => a.status === 'Completed').length;
    const inProgress = monthlyAudits.filter(a => a.status === 'In Progress').length;
    const planned = monthlyAudits.filter(a => a.status === 'Planned').length;
    const delayed = monthlyAudits.filter(a => a.status === 'Delayed').length;

    const extreme = monthlyAudits.filter(a => a.riskLevel === 'Extreme').length;
    const high = monthlyAudits.filter(a => a.riskLevel === 'High').length;
    const medium = monthlyAudits.filter(a => a.riskLevel === 'Medium').length;
    const low = monthlyAudits.filter(a => a.riskLevel === 'Low').length;

    const totalDays = monthlyAudits.reduce((sum, a) => sum + a.estimatedDays, 0);
    const uniqueAuditors = new Set(monthlyAudits.map(a => a.leadAuditor)).size;

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    const riskCoverage = total > 0 ? Math.round(((extreme + high) / total) * 100) : 0;

    return {
      total, completed, inProgress, planned, delayed,
      extreme, high, medium, low,
      totalDays, uniqueAuditors, completionRate, riskCoverage
    };
  }, [monthlyAudits]);

  // Upcoming and overdue audits for reminders
  const { upcoming, overdue } = useMemo(() => {
    const today = new Date();
    const upcoming = monthlyAudits.filter(a => {
      const startDate = parseISO(a.startDate);
      const daysUntil = differenceInDays(startDate, today);
      return a.status === 'Planned' && daysUntil >= 0 && daysUntil <= 7;
    });
    const overdue = monthlyAudits.filter(a => {
      const endDate = parseISO(a.endDate);
      return a.status !== 'Completed' && a.status !== 'Cancelled' && isBefore(endDate, today);
    });
    return { upcoming, overdue };
  }, [monthlyAudits]);

  // Calendar days
  const calendarDays = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  // Get audits for a specific day
  const getAuditsForDay = (day: Date) => {
    return filteredAudits.filter(audit => {
      const startDate = parseISO(audit.startDate);
      const endDate = parseISO(audit.endDate);
      return day >= startDate && day <= endDate;
    });
  };

  // Navigation
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  // CRUD Operations
  const handleAddAudit = () => {
    if (!formData.entityId || !formData.startDate) {
      toast({ title: "Error", description: "Please fill required fields", variant: "destructive" });
      return;
    }

    const entity = auditEntities.find(e => e.id === formData.entityId);
    if (!entity) return;

    const newAudit: AuditPlanItem = {
      id: `AP-${selectedYear}-${String(auditPlan.length + 1).padStart(4, '0')}`,
      entityId: entity.id,
      entityName: entity.name,
      entityType: entity.entityType,
      category: (formData.category as AuditCategory) || 'Operational',
      riskLevel: entity.riskLevel,
      riskScore: entity.overallRiskScore,
      scheduledMonth: currentMonth,
      startDate: formData.startDate,
      endDate: formData.endDate || formData.startDate,
      status: 'Planned',
      leadAuditor: formData.leadAuditor || auditors[0].name,
      teamMembers: formData.teamMembers || [],
      estimatedDays: formData.estimatedDays || 5,
      objectives: formData.objectives || [],
      progress: 0,
      notes: formData.notes,
    };

    setAuditPlan([...auditPlan, newAudit]);
    setFormData({});
    setIsAddDialogOpen(false);
    toast({ title: "Success", description: "Audit added to monthly plan and synced with annual plan" });
  };

  const handleEditAudit = () => {
    if (!editingAudit) return;

    const updatedAudit = { ...editingAudit, ...formData };
    
    if (formData.startDate) {
      const newDate = parseISO(formData.startDate);
      updatedAudit.scheduledMonth = newDate.getMonth() + 1;
    }

    setAuditPlan(auditPlan.map(a => a.id === editingAudit.id ? updatedAudit : a));
    setEditingAudit(null);
    setFormData({});
    toast({ title: "Success", description: "Audit updated and synced with annual plan" });
  };

  const handleCancelAudit = (audit: AuditPlanItem) => {
    setAuditPlan(auditPlan.map(a => 
      a.id === audit.id ? { ...a, status: 'Cancelled' as AuditStatus } : a
    ));
    toast({ title: "Cancelled", description: "Audit has been cancelled" });
  };

  const handleDeleteAudit = (id: string) => {
    setAuditPlan(auditPlan.filter(a => a.id !== id));
    setIsDetailDialogOpen(false);
    toast({ title: "Deleted", description: "Audit removed from plan" });
  };

  const openEditDialog = (audit: AuditPlanItem) => {
    setEditingAudit(audit);
    setFormData({
      entityId: audit.entityId,
      category: audit.category,
      startDate: audit.startDate,
      endDate: audit.endDate,
      leadAuditor: audit.leadAuditor,
      teamMembers: audit.teamMembers,
      estimatedDays: audit.estimatedDays,
      objectives: audit.objectives,
      notes: audit.notes,
      status: audit.status,
    });
  };

  // Export functions
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text(`BOC Bank - Monthly Audit Plan`, 14, 20);
    doc.setFontSize(14);
    doc.text(`${MONTHS[currentMonth - 1]} ${currentYear}`, 14, 30);
    
    doc.setFontSize(11);
    doc.text(`Total Audits: ${metrics.total} | Completed: ${metrics.completed} | In Progress: ${metrics.inProgress}`, 14, 42);
    doc.text(`Completion Rate: ${metrics.completionRate}% | Risk Coverage: ${metrics.riskCoverage}%`, 14, 50);
    
    autoTable(doc, {
      startY: 60,
      head: [['ID', 'Entity', 'Type', 'Risk', 'Start Date', 'End Date', 'Status', 'Lead Auditor', 'Days']],
      body: filteredAudits.map(audit => [
        audit.id,
        audit.entityName.substring(0, 20),
        audit.entityType,
        audit.riskLevel,
        audit.startDate,
        audit.endDate,
        audit.status,
        audit.leadAuditor,
        audit.estimatedDays.toString(),
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [212, 175, 55] },
    });
    
    doc.save(`BOC_Monthly_Audit_Plan_${MONTHS[currentMonth - 1]}_${currentYear}.pdf`);
    toast({ title: "Exported", description: "PDF downloaded successfully" });
  };

  const exportToExcel = () => {
    const wsData = filteredAudits.map(audit => ({
      'Audit ID': audit.id,
      'Entity Name': audit.entityName,
      'Entity Type': audit.entityType,
      'Category': audit.category,
      'Risk Level': audit.riskLevel,
      'Start Date': audit.startDate,
      'End Date': audit.endDate,
      'Status': audit.status,
      'Lead Auditor': audit.leadAuditor,
      'Team Members': audit.teamMembers.join(', '),
      'Estimated Days': audit.estimatedDays,
      'Progress': `${audit.progress}%`,
      'Objectives': audit.objectives.join('; '),
      'Notes': audit.notes || '',
    }));
    
    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Monthly Plan');
    
    XLSX.writeFile(wb, `BOC_Monthly_Audit_Plan_${MONTHS[currentMonth - 1]}_${currentYear}.xlsx`);
    toast({ title: "Exported", description: "Excel file downloaded successfully" });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilterRisk("all");
    setFilterStatus("all");
    setFilterCategory("all");
    setFilterEntityType("all");
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'Branch': return <Building2 className="h-4 w-4" />;
      case 'IT System': return <Server className="h-4 w-4" />;
      default: return <UserCheck className="h-4 w-4" />;
    }
  };

  // Chart data
  const riskDistributionData = [
    { name: 'Extreme', value: metrics.extreme, fill: RISK_COLORS.Extreme },
    { name: 'High', value: metrics.high, fill: RISK_COLORS.High },
    { name: 'Medium', value: metrics.medium, fill: RISK_COLORS.Medium },
    { name: 'Low', value: metrics.low, fill: RISK_COLORS.Low },
  ].filter(d => d.value > 0);

  const statusDistributionData = [
    { name: 'Completed', value: metrics.completed, fill: 'hsl(142, 76%, 36%)' },
    { name: 'In Progress', value: metrics.inProgress, fill: 'hsl(45, 93%, 47%)' },
    { name: 'Planned', value: metrics.planned, fill: 'hsl(217, 91%, 60%)' },
    { name: 'Delayed', value: metrics.delayed, fill: 'hsl(0, 84%, 60%)' },
  ].filter(d => d.value > 0);

  const resourceUtilization = useMemo(() => {
    const auditorWorkload: Record<string, number> = {};
    monthlyAudits.forEach(audit => {
      auditorWorkload[audit.leadAuditor] = (auditorWorkload[audit.leadAuditor] || 0) + audit.estimatedDays;
    });
    return Object.entries(auditorWorkload)
      .map(([name, days]) => ({ name: name.split(' ')[0], days }))
      .sort((a, b) => b.days - a.days)
      .slice(0, 8);
  }, [monthlyAudits]);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Monthly Audit Plan</h1>
          <p className="text-sm text-muted-foreground">
            Detailed audit scheduling derived from annual plan with real-time tracking
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={exportToExcel}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Excel
          </Button>
          <Button variant="outline" size="sm" onClick={exportToPDF}>
            <FileText className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Add Audit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Schedule New Audit - {MONTHS[currentMonth - 1]} {currentYear}</DialogTitle>
              </DialogHeader>
              <AuditFormFields formData={formData} setFormData={setFormData} currentMonth={currentMonth} currentYear={currentYear} />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleAddAudit}>Add to Plan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Month Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-center min-w-[200px]">
                <h2 className="text-xl font-bold">{MONTHS[currentMonth - 1]} {currentYear}</h2>
                <p className="text-sm text-muted-foreground">{metrics.total} audits scheduled</p>
              </div>
              <Button variant="outline" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
            </div>
            
            {/* Reminders */}
            <div className="flex gap-2">
              {upcoming.length > 0 && (
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 py-1.5">
                  <Bell className="h-3 w-3 mr-1" />
                  {upcoming.length} upcoming (7 days)
                </Badge>
              )}
              {overdue.length > 0 && (
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 py-1.5">
                  <BellRing className="h-3 w-3 mr-1" />
                  {overdue.length} overdue
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
            <div className="text-xl md:text-2xl font-bold">{metrics.total}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
            <div className="text-xl md:text-2xl font-bold">{metrics.completed}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-warning" />
              <span className="text-xs text-muted-foreground">In Progress</span>
            </div>
            <div className="text-xl md:text-2xl font-bold">{metrics.inProgress}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-xs text-muted-foreground">High Risk</span>
            </div>
            <div className="text-xl md:text-2xl font-bold">{metrics.extreme + metrics.high}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Completion</span>
            </div>
            <div className="text-xl md:text-2xl font-bold">{metrics.completionRate}%</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Auditors</span>
            </div>
            <div className="text-xl md:text-2xl font-bold">{metrics.uniqueAuditors}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
          <TabsTrigger value="calendar">
            <CalendarDays className="h-4 w-4 mr-2 hidden md:inline" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="list">
            <BarChart3 className="h-4 w-4 mr-2 hidden md:inline" />
            List
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <PieChart className="h-4 w-4 mr-2 hidden md:inline" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="resources">
            <Users className="h-4 w-4 mr-2 hidden md:inline" />
            Resources
          </TabsTrigger>
        </TabsList>

        {/* Calendar View */}
        <TabsContent value="calendar" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search audits..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={filterRisk} onValueChange={setFilterRisk}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Risk Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risks</SelectItem>
                    {riskLevels.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {auditStatuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterEntityType} onValueChange={setFilterEntityType}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Entity Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Branch">Branch</SelectItem>
                    <SelectItem value="IT System">IT System</SelectItem>
                    <SelectItem value="High Value Customer">Customer</SelectItem>
                  </SelectContent>
                </Select>
                {(searchQuery || filterRisk !== "all" || filterStatus !== "all" || filterEntityType !== "all") && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Calendar Grid */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-primary" />
                Audit Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: calendarDays[0]?.getDay() || 0 }).map((_, i) => (
                  <div key={`empty-${i}`} className="min-h-[80px] md:min-h-[100px]" />
                ))}
                
                {calendarDays.map(day => {
                  const dayAudits = getAuditsForDay(day);
                  const hasExtreme = dayAudits.some(a => a.riskLevel === 'Extreme');
                  const hasHigh = dayAudits.some(a => a.riskLevel === 'High');
                  const hasMedium = dayAudits.some(a => a.riskLevel === 'Medium');
                  
                  return (
                    <div
                      key={day.toISOString()}
                      className={`min-h-[80px] md:min-h-[100px] border rounded-md p-1 ${
                        isToday(day) ? 'border-primary bg-primary/5' : 'border-border'
                      } hover:bg-muted/50 transition-colors`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-medium ${isToday(day) ? 'text-primary' : ''}`}>
                          {format(day, 'd')}
                        </span>
                        {dayAudits.length > 0 && (
                          <div className="flex gap-0.5">
                            {hasExtreme && <div className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                            {hasHigh && <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                            {hasMedium && <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />}
                          </div>
                        )}
                      </div>
                      <ScrollArea className="h-[60px] md:h-[75px]">
                        <div className="space-y-1">
                          {dayAudits.slice(0, 3).map(audit => (
                            <div
                              key={audit.id}
                              onClick={() => { setSelectedAudit(audit); setIsDetailDialogOpen(true); }}
                              className={`text-[10px] md:text-xs p-1 rounded cursor-pointer truncate border ${RISK_BG_CLASSES[audit.riskLevel]}`}
                              title={audit.entityName}
                            >
                              {audit.entityName.substring(0, 12)}...
                            </div>
                          ))}
                          {dayAudits.length > 3 && (
                            <div className="text-[10px] text-muted-foreground text-center">
                              +{dayAudits.length - 3} more
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  );
                })}
              </div>
              
              {/* Risk Legend */}
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-red-500" />
                  <span className="text-xs">Extreme Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-orange-500" />
                  <span className="text-xs">High Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-yellow-500" />
                  <span className="text-xs">Medium Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-500" />
                  <span className="text-xs">Low Risk</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* List View */}
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-3 items-center mb-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search audits..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {auditCategories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Entity</TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead>Risk</TableHead>
                      <TableHead className="hidden lg:table-cell">Dates</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Lead</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAudits.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          No audits found for this month
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAudits.map(audit => (
                        <TableRow key={audit.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getEntityIcon(audit.entityType)}
                              <div>
                                <div className="font-medium text-sm">{audit.entityName.substring(0, 20)}</div>
                                <div className="text-xs text-muted-foreground">{audit.id}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant="outline" className="text-xs">{audit.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${RISK_BG_CLASSES[audit.riskLevel]} border text-xs`}>
                              {audit.riskLevel}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-xs">
                            {audit.startDate} - {audit.endDate}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`${STATUS_CLASSES[audit.status]} text-xs`}>
                              {audit.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm">{audit.leadAuditor.split(' ')[0]}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={audit.progress} className="w-16 h-2" />
                              <span className="text-xs">{audit.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => { setSelectedAudit(audit); setIsDetailDialogOpen(true); }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => openEditDialog(audit)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPie>
                    <Pie
                      data={riskDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPie>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPie>
                    <Pie
                      data={statusDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {statusDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPie>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-3xl font-bold text-success">{metrics.completionRate}%</div>
                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-3xl font-bold text-destructive">{metrics.riskCoverage}%</div>
                  <div className="text-sm text-muted-foreground">High Risk Coverage</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-3xl font-bold text-primary">{metrics.totalDays}</div>
                  <div className="text-sm text-muted-foreground">Total Audit Days</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-3xl font-bold text-warning">{metrics.delayed}</div>
                  <div className="text-sm text-muted-foreground">Delayed Audits</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={resourceUtilization}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="days" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Team Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Auditor</TableHead>
                      <TableHead>Assigned Audits</TableHead>
                      <TableHead>Total Days</TableHead>
                      <TableHead>Specialization</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditors.map(auditor => {
                      const auditorAudits = monthlyAudits.filter(a => a.leadAuditor === auditor.name);
                      const totalDays = auditorAudits.reduce((sum, a) => sum + a.estimatedDays, 0);
                      return (
                        <TableRow key={auditor.id}>
                          <TableCell className="font-medium">{auditor.name}</TableCell>
                          <TableCell>{auditorAudits.length}</TableCell>
                          <TableCell>{totalDays}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{auditor.specialization}</Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Audit Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedAudit && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getEntityIcon(selectedAudit.entityType)}
                  {selectedAudit.entityName}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${RISK_BG_CLASSES[selectedAudit.riskLevel]} border`}>
                    {selectedAudit.riskLevel} Risk
                  </Badge>
                  <Badge variant="outline" className={STATUS_CLASSES[selectedAudit.status]}>
                    {selectedAudit.status}
                  </Badge>
                  <Badge variant="outline">{selectedAudit.category}</Badge>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground text-xs">Audit ID</Label>
                    <p className="font-medium">{selectedAudit.id}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Entity Type</Label>
                    <p className="font-medium">{selectedAudit.entityType}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Start Date</Label>
                    <p className="font-medium">{selectedAudit.startDate}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">End Date</Label>
                    <p className="font-medium">{selectedAudit.endDate}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Lead Auditor</Label>
                    <p className="font-medium">{selectedAudit.leadAuditor}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Duration</Label>
                    <p className="font-medium">{selectedAudit.estimatedDays} days</p>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground text-xs">Progress</Label>
                  <div className="flex items-center gap-3 mt-1">
                    <Progress value={selectedAudit.progress} className="flex-1" />
                    <span className="font-medium">{selectedAudit.progress}%</span>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground text-xs">Team Members</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedAudit.teamMembers.map((member, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{member}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground text-xs">Objectives</Label>
                  <ul className="list-disc list-inside mt-1 text-sm space-y-1">
                    {selectedAudit.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>

                {selectedAudit.notes && (
                  <div>
                    <Label className="text-muted-foreground text-xs">Notes</Label>
                    <p className="text-sm mt-1">{selectedAudit.notes}</p>
                  </div>
                )}
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => openEditDialog(selectedAudit)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                {selectedAudit.status !== 'Cancelled' && selectedAudit.status !== 'Completed' && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="text-destructive">
                        <X className="h-4 w-4 mr-2" />
                        Cancel Audit
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancel this audit?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will mark the audit as cancelled. This action can be undone by editing the audit.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>No, keep it</AlertDialogCancel>
                        <AlertDialogAction onClick={() => { handleCancelAudit(selectedAudit); setIsDetailDialogOpen(false); }}>
                          Yes, cancel audit
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this audit?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove the audit from both monthly and annual plans.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteAudit(selectedAudit.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingAudit} onOpenChange={(open) => !open && setEditingAudit(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Audit - {editingAudit?.entityName}</DialogTitle>
          </DialogHeader>
          <AuditFormFields 
            formData={formData} 
            setFormData={setFormData} 
            currentMonth={currentMonth} 
            currentYear={currentYear}
            isEdit
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditAudit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Form Fields Component
interface AuditFormFieldsProps {
  formData: Partial<AuditPlanItem>;
  setFormData: (data: Partial<AuditPlanItem>) => void;
  currentMonth: number;
  currentYear: number;
  isEdit?: boolean;
}

const AuditFormFields = ({ formData, setFormData, currentMonth, currentYear, isEdit }: AuditFormFieldsProps) => {
  const defaultStartDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;

  return (
    <div className="grid gap-4 py-4">
      {!isEdit && (
        <div className="grid gap-2">
          <Label>Entity *</Label>
          <Select value={formData.entityId || ''} onValueChange={(v) => setFormData({ ...formData, entityId: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select entity to audit" />
            </SelectTrigger>
            <SelectContent>
              {auditEntities.map(entity => (
                <SelectItem key={entity.id} value={entity.id}>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={RISK_BG_CLASSES[entity.riskLevel as RiskLevel]}>
                      {entity.riskLevel}
                    </Badge>
                    {entity.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Category</Label>
          <Select value={formData.category || ''} onValueChange={(v) => setFormData({ ...formData, category: v as AuditCategory })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {auditCategories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Lead Auditor</Label>
          <Select value={formData.leadAuditor || ''} onValueChange={(v) => setFormData({ ...formData, leadAuditor: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select auditor" />
            </SelectTrigger>
            <SelectContent>
              {auditors.map(auditor => (
                <SelectItem key={auditor.id} value={auditor.name}>{auditor.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Start Date *</Label>
          <Input
            type="date"
            value={formData.startDate || defaultStartDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label>End Date</Label>
          <Input
            type="date"
            value={formData.endDate || ''}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Estimated Days</Label>
          <Input
            type="number"
            value={formData.estimatedDays || ''}
            onChange={(e) => setFormData({ ...formData, estimatedDays: parseInt(e.target.value) })}
            placeholder="5"
          />
        </div>
        {isEdit && (
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select value={formData.status || ''} onValueChange={(v) => setFormData({ ...formData, status: v as AuditStatus })}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {auditStatuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="grid gap-2">
        <Label>Notes</Label>
        <Textarea
          value={formData.notes || ''}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes or objectives..."
          rows={3}
        />
      </div>
    </div>
  );
};

export default MonthlyAuditPlan;
