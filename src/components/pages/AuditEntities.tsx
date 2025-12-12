import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  Download, FileSpreadsheet, FileText, Landmark, Building2, 
  Layers, Network, Database
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import { auditEntitiesData, getEntityStats } from "@/data/auditEntitiesMockData";
import { BusinessEntityRegistry } from "./audit-entities/BusinessEntityRegistry";
import { EntityTypeClassification } from "./audit-entities/EntityTypeClassification";
import { EntityControllerHierarchy } from "./audit-entities/EntityControllerHierarchy";

export const AuditEntities = () => {
  const [activeModule, setActiveModule] = useState("registry");
  const stats = getEntityStats();

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
      body: auditEntitiesData.slice(0, 40).map(e => [
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
    const entitiesData = auditEntitiesData.map(e => ({
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
        </div>
      </div>

      {/* Main Module Tabs */}
      <Tabs value={activeModule} onValueChange={setActiveModule} className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-3 h-auto p-1">
          <TabsTrigger 
            value="registry" 
            className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Database className="h-4 w-4" />
            <div className="text-left">
              <div className="font-medium">Business Entity Registry</div>
              <div className="text-xs opacity-70 hidden sm:block">Manage audit entities</div>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="classification" 
            className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Layers className="h-4 w-4" />
            <div className="text-left">
              <div className="font-medium">Entity Type Classification</div>
              <div className="text-xs opacity-70 hidden sm:block">Configure entity types</div>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="hierarchy" 
            className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Network className="h-4 w-4" />
            <div className="text-left">
              <div className="font-medium">Entity-Controller Hierarchy</div>
              <div className="text-xs opacity-70 hidden sm:block">View relationships</div>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Business Entity Registry */}
        <TabsContent value="registry" className="mt-0">
          <BusinessEntityRegistry />
        </TabsContent>

        {/* Entity Type Classification */}
        <TabsContent value="classification" className="mt-0">
          <EntityTypeClassification />
        </TabsContent>

        {/* Entity-Controller Hierarchy */}
        <TabsContent value="hierarchy" className="mt-0">
          <EntityControllerHierarchy />
        </TabsContent>
      </Tabs>
    </div>
  );
};
