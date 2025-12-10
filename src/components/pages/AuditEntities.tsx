import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Download, FileSpreadsheet, FileText } from "lucide-react";
import { auditEntitiesData, AuditEntity, getEntityStats } from "@/data/auditEntitiesMockData";
import { EntityStatsCards } from "./audit-entities/EntityStatsCards";
import { EntityDashboardCharts } from "./audit-entities/EntityDashboardCharts";
import { AddEntityDialog } from "./audit-entities/AddEntityDialog";
import { EntityDetailDialog } from "./audit-entities/EntityDetailDialog";
import { EntitiesTable } from "./audit-entities/EntitiesTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const AuditEntities = () => {
  const [entities, setEntities] = useState<AuditEntity[]>(auditEntitiesData);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editEntity, setEditEntity] = useState<AuditEntity | null>(null);
  const [viewEntity, setViewEntity] = useState<AuditEntity | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleAddEntity = (entityData: Partial<AuditEntity>) => {
    const newEntity: AuditEntity = {
      ...entityData as AuditEntity,
      documents: [],
      scheduledAudits: [],
      auditHistory: [],
      keyContacts: [],
      riskFactors: {},
      trend: 'stable',
      additionalInfo: {},
    };
    setEntities(prev => [newEntity, ...prev]);
  };

  const handleEditEntity = (entityData: Partial<AuditEntity>) => {
    setEntities(prev => 
      prev.map(e => e.id === entityData.id ? { ...e, ...entityData } as AuditEntity : e)
    );
    setEditEntity(null);
  };

  const handleDeleteEntity = (entityId: string) => {
    setEntities(prev => prev.filter(e => e.id !== entityId));
  };

  const handleBulkDelete = (entityIds: string[]) => {
    setEntities(prev => prev.filter(e => !entityIds.includes(e.id)));
  };

  const handleViewEntity = (entity: AuditEntity) => {
    setViewEntity(entity);
    setViewDialogOpen(true);
  };

  const handleEditClick = (entity: AuditEntity) => {
    setEditEntity(entity);
    setAddDialogOpen(true);
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const stats = getEntityStats();
    
    // Title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("BOC Audit Entities Report", 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Summary
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("Summary Statistics", 14, 45);
    
    autoTable(doc, {
      startY: 50,
      head: [['Metric', 'Value']],
      body: [
        ['Total Entities', stats.total.toString()],
        ['Extreme Risk', stats.byRisk.extreme.toString()],
        ['High Risk', stats.byRisk.high.toString()],
        ['Medium Risk', stats.byRisk.medium.toString()],
        ['Low Risk', stats.byRisk.low.toString()],
        ['Average Risk Score', stats.avgRiskScore.toString()],
        ['Upcoming Audits', stats.upcomingAudits.toString()],
      ],
      theme: 'striped',
      headStyles: { fillColor: [212, 175, 55] },
    });
    
    // Entities Table
    const tableY = (doc as any).lastAutoTable.finalY + 15;
    doc.text("Audit Entities", 14, tableY);
    
    autoTable(doc, {
      startY: tableY + 5,
      head: [['Code', 'Name', 'Type', 'Risk Level', 'Score', 'Compliance', 'Last Audit']],
      body: entities.slice(0, 30).map(e => [
        e.code,
        e.name.substring(0, 25),
        e.entityType,
        e.riskLevel,
        e.riskScore.toString(),
        e.complianceStatus,
        e.lastAuditDate,
      ]),
      theme: 'striped',
      headStyles: { fillColor: [212, 175, 55] },
      styles: { fontSize: 8 },
    });
    
    doc.save('audit-entities-report.pdf');
    toast.success("PDF exported successfully");
  };

  // Export to Excel
  const exportToExcel = () => {
    const stats = getEntityStats();
    
    // Summary sheet
    const summaryData = [
      ['BOC Audit Entities Report'],
      [`Generated: ${new Date().toLocaleDateString()}`],
      [],
      ['Summary Statistics'],
      ['Total Entities', stats.total],
      ['Extreme Risk', stats.byRisk.extreme],
      ['High Risk', stats.byRisk.high],
      ['Medium Risk', stats.byRisk.medium],
      ['Low Risk', stats.byRisk.low],
      ['Average Risk Score', stats.avgRiskScore],
      ['Upcoming Audits', stats.upcomingAudits],
    ];
    
    // Entities data
    const entitiesData = entities.map(e => ({
      'Code': e.code,
      'Name': e.name,
      'Type': e.entityType,
      'Category': e.category,
      'Region': e.region,
      'Risk Level': e.riskLevel,
      'Risk Score': e.riskScore,
      'Compliance Status': e.complianceStatus,
      'Status': e.status,
      'Last Audit Date': e.lastAuditDate,
      'Next Audit Date': e.nextAuditDate,
      'Audit Frequency': e.auditFrequency,
      'Owner': e.ownerName,
      'Owner Email': e.ownerEmail,
      'Department': e.ownerDepartment,
      'Assigned Auditor': e.assignedAuditor,
    }));
    
    const wb = XLSX.utils.book_new();
    
    const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');
    
    const entitiesWs = XLSX.utils.json_to_sheet(entitiesData);
    XLSX.utils.book_append_sheet(wb, entitiesWs, 'Entities');
    
    XLSX.writeFile(wb, 'audit-entities-report.xlsx');
    toast.success("Excel exported successfully");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Audit Entities</h1>
          <p className="text-sm text-muted-foreground">
            Dashboard / Master Data / Audit Entities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={exportToPDF}>
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={exportToExcel}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
          <Button onClick={() => { setEditEntity(null); setAddDialogOpen(true); }} className="bg-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Add New Entity
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="entities">Entities List</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6 mt-6">
          {/* Stats Cards */}
          <EntityStatsCards />
          
          {/* Dashboard Charts */}
          <EntityDashboardCharts />
        </TabsContent>
        
        <TabsContent value="entities" className="mt-6">
          {/* Entities Table */}
          <EntitiesTable
            entities={entities}
            onView={handleViewEntity}
            onEdit={handleEditClick}
            onDelete={handleDeleteEntity}
            onBulkDelete={handleBulkDelete}
          />
        </TabsContent>
      </Tabs>

      {/* Add/Edit Dialog */}
      <AddEntityDialog
        open={addDialogOpen}
        onOpenChange={(open) => {
          setAddDialogOpen(open);
          if (!open) setEditEntity(null);
        }}
        onSave={editEntity ? handleEditEntity : handleAddEntity}
        editEntity={editEntity}
      />

      {/* View Detail Dialog */}
      <EntityDetailDialog
        entity={viewEntity}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />
    </div>
  );
};
