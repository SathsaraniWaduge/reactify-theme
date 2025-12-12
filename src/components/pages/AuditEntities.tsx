import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, Download, FileSpreadsheet, FileText, LayoutDashboard, List, Landmark } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import { auditEntitiesData, AuditEntity, getEntityStats } from "@/data/auditEntitiesMockData";
import { EntityDashboardWidgets } from "./audit-entities/EntityDashboardWidgets";
import { EntitiesDataTable } from "./audit-entities/EntitiesDataTable";
import { AddEntityWizard } from "./audit-entities/AddEntityWizard";
import { EntityProfilePage } from "./audit-entities/EntityProfilePage";
import { RecentActivityPanel } from "./audit-entities/RecentActivityPanel";

export const AuditEntities = () => {
  const [entities, setEntities] = useState<AuditEntity[]>(auditEntitiesData);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [wizardOpen, setWizardOpen] = useState(false);
  const [editEntity, setEditEntity] = useState<AuditEntity | null>(null);
  const [viewEntity, setViewEntity] = useState<AuditEntity | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [drillDownFilter, setDrillDownFilter] = useState<{ type: string; value: string } | null>(null);

  const stats = getEntityStats();

  // Handle drill-down from dashboard widgets
  const handleDrillDown = (filter: { type: string; value: string }) => {
    setDrillDownFilter(filter);
    setActiveTab("entities");
  };

  // CRUD Operations
  const handleAddEntity = (newEntity: AuditEntity) => {
    setEntities(prev => [newEntity, ...prev]);
  };

  const handleEditEntity = (updatedEntity: AuditEntity) => {
    setEntities(prev => 
      prev.map(e => e.entityId === updatedEntity.entityId ? updatedEntity : e)
    );
    setEditEntity(null);
  };

  const handleDeleteEntity = (entityId: string) => {
    setEntities(prev => 
      prev.map(e => e.entityId === entityId ? { ...e, status: 'Deactivated' as const } : e)
    );
  };

  const handleBulkAction = (entityIds: string[], action: string) => {
    switch (action) {
      case 'deactivate':
        setEntities(prev => 
          prev.map(e => entityIds.includes(e.entityId) ? { ...e, status: 'Deactivated' as const } : e)
        );
        toast.success(`${entityIds.length} entities deactivated`);
        break;
      case 'assign-team':
        toast.info('Team assignment dialog would open here');
        break;
      case 'update-status':
        toast.info('Status update dialog would open here');
        break;
    }
  };

  const handleViewEntity = (entity: AuditEntity) => {
    setViewEntity(entity);
    setProfileOpen(true);
  };

  const handleEditClick = (entity: AuditEntity) => {
    setEditEntity(entity);
    setWizardOpen(true);
  };

  // Export Functions
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("BOC AIIA - Audit Entities Report", 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString()} | Total Entities: ${stats.total}`, 14, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("Summary Statistics", 14, 45);
    
    autoTable(doc, {
      startY: 50,
      head: [['Metric', 'Value']],
      body: [
        ['Total Entities', stats.total.toString()],
        ['Bank', stats.byType.Bank.toString()],
        ['HOD', stats.byType.HOD.toString()],
        ['PO', stats.byType.PO.toString()],
        ['Branch', stats.byType.Branch.toString()],
        ['System', stats.byType.System.toString()],
        ['ISL', stats.byType.ISL.toString()],
        ['Critical Risk', stats.byRisk.CRITICAL.toString()],
        ['High Risk', stats.byRisk.HIGH.toString()],
        ['Active Entities', stats.byStatus.Active.toString()],
      ],
      theme: 'striped',
      headStyles: { fillColor: [0, 51, 102] },
    });
    
    const tableY = (doc as any).lastAutoTable.finalY + 15;
    doc.text("Entity Registry", 14, tableY);
    
    autoTable(doc, {
      startY: tableY + 5,
      head: [['ID', 'Name', 'Type', 'Size', 'Cost Centre', 'Team', 'Risk', 'Status']],
      body: entities.slice(0, 40).map(e => [
        e.entityId,
        e.entityName.substring(0, 25),
        e.entityType,
        e.entitySize,
        e.costCentre,
        e.auditTeamType,
        e.riskLevel,
        e.status,
      ]),
      theme: 'striped',
      headStyles: { fillColor: [0, 51, 102] },
      styles: { fontSize: 7 },
    });
    
    doc.save('boc-aiia-audit-entities.pdf');
    toast.success("PDF report exported successfully");
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    
    // Summary sheet
    const summaryData = [
      ['BOC AIIA - Audit Entities Report'],
      [`Generated: ${new Date().toLocaleDateString()}`],
      [],
      ['Summary Statistics'],
      ['Total Entities', stats.total],
      ['By Type'],
      ['Bank', stats.byType.Bank],
      ['HOD', stats.byType.HOD],
      ['PO', stats.byType.PO],
      ['Branch', stats.byType.Branch],
      ['System', stats.byType.System],
      ['ISL', stats.byType.ISL],
      [],
      ['By Risk Level'],
      ['CRITICAL', stats.byRisk.CRITICAL],
      ['HIGH', stats.byRisk.HIGH],
      ['MEDIUM', stats.byRisk.MEDIUM],
      ['LOW', stats.byRisk.LOW],
      [],
      ['By Audit Team'],
      ...Object.entries(stats.byTeam).map(([team, count]) => [team, count]),
    ];
    
    const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');
    
    // Entities sheet
    const entitiesData = entities.map(e => ({
      'Entity ID': e.entityId,
      'Entity Name': e.entityName,
      'Entity Type': e.entityType,
      'Entity Size': e.entitySize,
      'Cost Centre': e.costCentre,
      'Email': e.email,
      'Audit Team': e.auditTeamType,
      'Travel Days': e.officialTravelDays,
      'Risk Level': e.riskLevel,
      'Status': e.status,
      'Last Audit': e.lastAuditDate || '',
      'Next Audit': e.nextAuditDate || '',
      'Total Audits': e.totalAudits,
      'Open Findings': e.openFindings,
      'Closed Findings': e.closedFindings,
      'Version': e.version,
      'Created': e.createdAt,
      'Updated': e.updatedAt,
    }));
    
    const entitiesWs = XLSX.utils.json_to_sheet(entitiesData);
    XLSX.utils.book_append_sheet(wb, entitiesWs, 'Entities');
    
    XLSX.writeFile(wb, 'boc-aiia-audit-entities.xlsx');
    toast.success("Excel report exported successfully");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Landmark className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Audit Entities</h1>
            <p className="text-sm text-muted-foreground">
              Master Data / Audit Universe Management
            </p>
          </div>
          <Badge variant="secondary" className="ml-2">
            {stats.total} entities
          </Badge>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportToPDF}>
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm" onClick={exportToExcel}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
          <Button 
            onClick={() => { setEditEntity(null); setWizardOpen(true); }}
            className="bg-primary text-primary-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Entity
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); if (v === 'dashboard') setDrillDownFilter(null); }}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="entities" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Entity Registry
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3">
              <EntityDashboardWidgets 
                entities={entities}
                onDrillDown={handleDrillDown}
              />
            </div>
            <div className="xl:col-span-1">
              <RecentActivityPanel />
            </div>
          </div>
        </TabsContent>

        {/* Entity Registry Tab */}
        <TabsContent value="entities" className="mt-6">
          <EntitiesDataTable
            entities={entities}
            onView={handleViewEntity}
            onEdit={handleEditClick}
            onDelete={handleDeleteEntity}
            onBulkAction={handleBulkAction}
            initialFilter={drillDownFilter}
          />
        </TabsContent>
      </Tabs>

      {/* Add/Edit Entity Wizard */}
      <AddEntityWizard
        open={wizardOpen}
        onOpenChange={(open) => {
          setWizardOpen(open);
          if (!open) setEditEntity(null);
        }}
        onSave={editEntity ? handleEditEntity : handleAddEntity}
        editEntity={editEntity}
      />

      {/* Entity Profile Page */}
      <EntityProfilePage
        entity={viewEntity}
        open={profileOpen}
        onOpenChange={setProfileOpen}
        onEdit={handleEditClick}
      />
    </div>
  );
};
