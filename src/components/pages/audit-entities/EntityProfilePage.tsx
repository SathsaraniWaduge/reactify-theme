import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { 
  Building2, Mail, MapPin, Calendar, Users, FileText, History, 
  GitBranch, Download, AlertTriangle, CheckCircle, Clock, TrendingUp,
  ChevronRight, ExternalLink, Printer
} from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { 
  AuditEntity, RiskLevel, generateAuditHistory, generateEntityDocuments,
  auditTeamRegions
} from "@/data/auditEntitiesMockData";

interface EntityProfilePageProps {
  entity: AuditEntity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (entity: AuditEntity) => void;
}

export const EntityProfilePage = ({ entity, open, onOpenChange, onEdit }: EntityProfilePageProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!entity) return null;

  const auditHistory = generateAuditHistory(entity.entityId);
  const documents = generateEntityDocuments(entity.entityId);

  const getRiskBadgeClass = (risk: RiskLevel) => {
    switch (risk) {
      case 'CRITICAL': return 'bg-red-600 text-white';
      case 'HIGH': return 'bg-orange-500 text-white';
      case 'MEDIUM': return 'bg-yellow-500 text-black';
      case 'LOW': return 'bg-green-500 text-white';
    }
  };

  const getRatingBadgeClass = (rating: string) => {
    switch (rating) {
      case 'Satisfactory': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Needs Improvement': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Unsatisfactory': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return '';
    }
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.text('Entity Profile Report', 14, 22);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Entity ID: ${entity.entityId}`, 14, 36);

    // Entity Details
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Entity Details', 14, 50);
    
    autoTable(doc, {
      startY: 55,
      head: [['Field', 'Value']],
      body: [
        ['Entity Name', entity.entityName],
        ['Entity Type', entity.entityType],
        ['Entity Size', entity.entitySize],
        ['Cost Centre', entity.costCentre],
        ['Email', entity.email],
        ['Audit Team', `${entity.auditTeamType} - ${auditTeamRegions[entity.auditTeamType]}`],
        ['Travel Days', entity.officialTravelDays.toString()],
        ['Risk Level', entity.riskLevel],
        ['Status', entity.status],
        ['Last Audit', entity.lastAuditDate || 'N/A'],
        ['Next Audit', entity.nextAuditDate || 'N/A'],
        ['Version', entity.version.toString()],
      ],
      theme: 'striped',
      headStyles: { fillColor: [212, 175, 55] },
    });

    // Audit History
    const tableY = (doc as any).lastAutoTable.finalY + 15;
    doc.text('Audit History', 14, tableY);
    
    autoTable(doc, {
      startY: tableY + 5,
      head: [['Year', 'Type', 'Lead Auditor', 'Findings', 'Rating', 'Status']],
      body: auditHistory.map(audit => [
        audit.auditYear.toString(),
        audit.auditType,
        audit.leadAuditor,
        audit.findings.toString(),
        audit.rating,
        audit.status,
      ]),
      theme: 'striped',
      headStyles: { fillColor: [212, 175, 55] },
      styles: { fontSize: 8 },
    });

    doc.save(`entity-profile-${entity.entityId}.pdf`);
    toast.success('PDF report downloaded');
  };

  // Export to Excel
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    
    // Entity Details Sheet
    const detailsData = [
      ['Entity Profile Report'],
      [`Generated: ${new Date().toLocaleDateString()}`],
      [],
      ['Field', 'Value'],
      ['Entity ID', entity.entityId],
      ['Entity Name', entity.entityName],
      ['Entity Type', entity.entityType],
      ['Entity Size', entity.entitySize],
      ['Cost Centre', entity.costCentre],
      ['Email', entity.email],
      ['Audit Team', `${entity.auditTeamType} - ${auditTeamRegions[entity.auditTeamType]}`],
      ['Travel Days', entity.officialTravelDays],
      ['Risk Level', entity.riskLevel],
      ['Status', entity.status],
      ['Last Audit', entity.lastAuditDate || 'N/A'],
      ['Next Audit', entity.nextAuditDate || 'N/A'],
      ['Total Audits', entity.totalAudits],
      ['Open Findings', entity.openFindings],
      ['Closed Findings', entity.closedFindings],
      ['Pending Actions', entity.pendingActions],
      ['Version', entity.version],
      ['Created', entity.createdAt],
      ['Updated', entity.updatedAt],
    ];
    
    const detailsWs = XLSX.utils.aoa_to_sheet(detailsData);
    XLSX.utils.book_append_sheet(wb, detailsWs, 'Entity Details');
    
    // Audit History Sheet
    const historyData = auditHistory.map(audit => ({
      'Year': audit.auditYear,
      'Type': audit.auditType,
      'Start Date': audit.startDate,
      'End Date': audit.endDate,
      'Lead Auditor': audit.leadAuditor,
      'Team Size': audit.teamMembers.length,
      'Total Findings': audit.findings,
      'Critical': audit.criticalFindings,
      'High': audit.highFindings,
      'Medium': audit.mediumFindings,
      'Low': audit.lowFindings,
      'Recommendations': audit.recommendations,
      'Implemented': audit.implementedRecommendations,
      'Rating': audit.rating,
      'Status': audit.status,
    }));
    
    const historyWs = XLSX.utils.json_to_sheet(historyData);
    XLSX.utils.book_append_sheet(wb, historyWs, 'Audit History');
    
    // Documents Sheet
    const docsData = documents.map(doc => ({
      'Document ID': doc.id,
      'Name': doc.name,
      'Type': doc.type,
      'Category': doc.category,
      'Upload Date': doc.uploadDate,
      'Uploaded By': doc.uploadedBy,
      'Size': doc.fileSize,
      'Version': doc.version,
      'Status': doc.status,
    }));
    
    const docsWs = XLSX.utils.json_to_sheet(docsData);
    XLSX.utils.book_append_sheet(wb, docsWs, 'Documents');
    
    XLSX.writeFile(wb, `entity-profile-${entity.entityId}.xlsx`);
    toast.success('Excel report downloaded');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">{entity.entityName}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="font-mono">{entity.entityId}</Badge>
                  <Badge className={getRiskBadgeClass(entity.riskLevel)}>{entity.riskLevel}</Badge>
                  <Badge variant="secondary">{entity.entityType}</Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={exportToPDF}>
                <Printer className="h-4 w-4 mr-1" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={exportToExcel}>
                <Download className="h-4 w-4 mr-1" />
                Excel
              </Button>
              <Button size="sm" onClick={() => { onEdit(entity); onOpenChange(false); }}>
                Edit Entity
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="hierarchy">Hierarchy</TabsTrigger>
            <TabsTrigger value="audit-trail">Audit Trail</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 mt-4">
            {/* Overview Tab */}
            <TabsContent value="overview" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Master Data */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold">Master Data</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Entity ID</span>
                        <p className="font-mono font-medium">{entity.entityId}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Entity Type</span>
                        <p className="font-medium">{entity.entityType}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Size/Grade</span>
                        <p className="font-medium">{entity.entitySize}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cost Centre</span>
                        <p className="font-medium">{entity.costCentre}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Email</span>
                        <p className="font-medium flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {entity.email}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Audit Assignment */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold">Audit Assignment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Audit Team</span>
                        <p className="font-medium">{entity.auditTeamType}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Region</span>
                        <p className="font-medium">{auditTeamRegions[entity.auditTeamType]}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Travel Days</span>
                        <p className="font-medium">{entity.officialTravelDays} days</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status</span>
                        <Badge variant="outline">{entity.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Audit Schedule */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Audit Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Last Audit</span>
                        <p className="font-medium">{entity.lastAuditDate || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Next Audit</span>
                        <p className="font-medium text-primary">{entity.nextAuditDate || 'Not Scheduled'}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Audits</span>
                        <p className="font-medium">{entity.totalAudits}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Risk Level</span>
                        <Badge className={getRiskBadgeClass(entity.riskLevel)}>{entity.riskLevel}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Version Info */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <History className="h-4 w-4" />
                      Version Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Version</span>
                        <p className="font-medium">v{entity.version}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Created</span>
                        <p className="font-medium">{entity.createdAt}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Created By</span>
                        <p className="font-medium">{entity.createdBy}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Updated</span>
                        <p className="font-medium">{entity.updatedAt}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Hierarchy Tab */}
            <TabsContent value="hierarchy" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <GitBranch className="h-4 w-4" />
                    Entity-Controller Hierarchy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Visual Hierarchy */}
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex flex-col items-start gap-2">
                        {/* Bank Level */}
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded bg-primary text-primary-foreground text-xs font-medium">
                            Bank of Ceylon - Head Office
                          </div>
                          <Badge variant="outline">EN000001</Badge>
                        </div>
                        
                        {/* Controller Level */}
                        {entity.controllerEntityId && (
                          <>
                            <div className="ml-6 h-4 border-l-2 border-muted-foreground/30"></div>
                            <div className="flex items-center gap-2 ml-6">
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              <div className="p-2 rounded bg-secondary text-secondary-foreground text-xs font-medium">
                                Controller Division
                              </div>
                              <Badge variant="outline">{entity.controllerEntityId}</Badge>
                            </div>
                          </>
                        )}
                        
                        {/* Current Entity */}
                        <div className="ml-12 h-4 border-l-2 border-muted-foreground/30"></div>
                        <div className="flex items-center gap-2 ml-12">
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          <div className="p-2 rounded bg-primary/20 text-primary text-xs font-medium border-2 border-primary">
                            {entity.entityName}
                          </div>
                          <Badge variant="outline">{entity.entityId}</Badge>
                          <Badge className={getRiskBadgeClass(entity.riskLevel)}>{entity.riskLevel}</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Hierarchy Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <span className="text-xs text-muted-foreground">Parent Entity</span>
                        <p className="font-medium">{entity.parentEntityId || 'None (Root Entity)'}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <span className="text-xs text-muted-foreground">Controller Entity</span>
                        <p className="font-medium">{entity.controllerEntityId || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Audit Trail Tab */}
            <TabsContent value="audit-trail" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <History className="h-4 w-4" />
                    Complete Audit History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Year</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Lead Auditor</TableHead>
                        <TableHead>Findings</TableHead>
                        <TableHead>Recommendations</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auditHistory.map((audit) => (
                        <TableRow key={audit.id}>
                          <TableCell className="font-medium">{audit.auditYear}</TableCell>
                          <TableCell>{audit.auditType}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {audit.startDate} - {audit.endDate}
                          </TableCell>
                          <TableCell>{audit.leadAuditor}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">{audit.findings}</span>
                              {audit.criticalFindings > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {audit.criticalFindings} critical
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{audit.implementedRecommendations}/{audit.recommendations}</span>
                              <Progress 
                                value={(audit.implementedRecommendations / audit.recommendations) * 100} 
                                className="w-16 h-1.5"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getRatingBadgeClass(audit.rating)}>{audit.rating}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{audit.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="m-0">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Related Documents
                  </CardTitle>
                  <Button size="sm" variant="outline">
                    Upload Document
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Upload Date</TableHead>
                        <TableHead>Uploaded By</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{doc.type}</Badge>
                          </TableCell>
                          <TableCell>{doc.category}</TableCell>
                          <TableCell className="text-muted-foreground">{doc.uploadDate}</TableCell>
                          <TableCell>{doc.uploadedBy}</TableCell>
                          <TableCell className="text-muted-foreground">{doc.fileSize}</TableCell>
                          <TableCell>
                            <Badge variant={doc.status === 'Current' ? 'default' : 'secondary'}>
                              {doc.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Metrics Tab */}
            <TabsContent value="metrics" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Findings Summary */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold">Findings Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Open Findings</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive">{entity.openFindings}</Badge>
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Closed Findings</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{entity.closedFindings}</Badge>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pending Actions</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{entity.pendingActions}</Badge>
                          <Clock className="h-4 w-4 text-yellow-500" />
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Resolution Rate</span>
                          <span className="font-bold text-green-600">
                            {entity.closedFindings + entity.openFindings > 0 
                              ? Math.round((entity.closedFindings / (entity.closedFindings + entity.openFindings)) * 100)
                              : 0}%
                          </span>
                        </div>
                        <Progress 
                          value={entity.closedFindings + entity.openFindings > 0 
                            ? (entity.closedFindings / (entity.closedFindings + entity.openFindings)) * 100
                            : 0} 
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Audit Activity */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold">Audit Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Total Audits Conducted</span>
                          <span className="text-2xl font-bold">{entity.totalAudits}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-muted/50">
                          <span className="text-xs text-muted-foreground">Created</span>
                          <p className="font-medium">{entity.createdAt}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                          <span className="text-xs text-muted-foreground">Last Modified</span>
                          <p className="font-medium">{entity.updatedAt}</p>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <span className="text-xs text-muted-foreground">Data Quality Score</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={95} className="flex-1" />
                          <span className="font-medium">95%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
