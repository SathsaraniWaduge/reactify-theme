import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AuditEntity } from "@/data/auditEntitiesMockData";
import { 
  Building2, Shield, FileText, Calendar, Users, TrendingUp, 
  TrendingDown, Minus, Mail, Phone, Download, ExternalLink,
  CheckCircle, AlertTriangle, Clock
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface EntityDetailDialogProps {
  entity: AuditEntity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EntityDetailDialog = ({ entity, open, onOpenChange }: EntityDetailDialogProps) => {
  if (!entity) return null;

  const getRiskBadgeClass = (level: string) => {
    switch (level) {
      case 'Extreme': return 'bg-destructive/10 text-destructive border-destructive/30';
      case 'High': return 'bg-warning/10 text-warning border-warning/30';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30';
      case 'Low': return 'bg-success/10 text-success border-success/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getComplianceBadgeClass = (status: string) => {
    switch (status) {
      case 'Compliant': return 'bg-success/10 text-success border-success/30';
      case 'Non-Compliant': return 'bg-destructive/10 text-destructive border-destructive/30';
      case 'Pending Review': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30';
      case 'Remediation Required': return 'bg-warning/10 text-warning border-warning/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRatingBadgeClass = (rating: string) => {
    switch (rating) {
      case 'Satisfactory': return 'bg-success/10 text-success';
      case 'Needs Improvement': return 'bg-yellow-500/10 text-yellow-600';
      case 'Unsatisfactory': return 'bg-warning/10 text-warning';
      case 'Critical': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-destructive" />;
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-success" />;
      default: return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">{entity.name}</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {entity.code} • {entity.entityType} • {entity.region}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getRiskBadgeClass(entity.riskLevel)}>
                {entity.riskLevel} Risk
              </Badge>
              <Badge variant="outline" className={getComplianceBadgeClass(entity.complianceStatus)}>
                {entity.complianceStatus}
              </Badge>
            </div>
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Audit History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Audits</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Basic Info Card */}
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Building2 className="h-4 w-4" /> Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Category</p>
                      <p className="font-medium">{entity.category}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <Badge variant="outline">{entity.status}</Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Audit</p>
                      <p className="font-medium">{entity.lastAuditDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Audit</p>
                      <p className="font-medium">{entity.nextAuditDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Audit Frequency</p>
                      <p className="font-medium">{entity.auditFrequency}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Version</p>
                      <p className="font-medium">v{entity.version}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-muted-foreground text-sm">Description</p>
                    <p className="text-sm mt-1">{entity.description}</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Ownership Card */}
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Users className="h-4 w-4" /> Ownership & Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">{entity.ownerName}</p>
                    <p className="text-xs text-muted-foreground">{entity.ownerDepartment}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs">{entity.ownerEmail}</p>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-sm font-medium mb-2">Key Contacts</p>
                    <div className="space-y-2">
                      {entity.keyContacts.map((contact, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div>
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-xs text-muted-foreground">{contact.role}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Mail className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Phone className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Additional Info */}
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(entity.additionalInfo).map(([key, value]) => (
                    <div key={key} className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">{key}</p>
                      <p className="font-medium text-sm mt-1">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Audit History Tab */}
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>Complete Audit History</span>
                  <Badge variant="outline">{entity.auditHistory.length} Audits</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Audit Type</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Lead Auditor</TableHead>
                      <TableHead>Findings</TableHead>
                      <TableHead>Recommendations</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entity.auditHistory.map((audit) => (
                      <TableRow key={audit.id}>
                        <TableCell className="font-medium">{audit.auditType}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{audit.startDate}</p>
                            <p className="text-muted-foreground">to {audit.endDate}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{audit.leadAuditor}</p>
                            <p className="text-muted-foreground">{audit.teamSize} members</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{audit.findings}</span>
                            {audit.criticalFindings > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {audit.criticalFindings} critical
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <span>{audit.implementedRecommendations}/{audit.recommendations}</span>
                            </div>
                            <Progress 
                              value={(audit.implementedRecommendations / audit.recommendations) * 100} 
                              className="h-1.5" 
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRatingBadgeClass(audit.rating)}>
                            {audit.rating}
                          </Badge>
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
          <TabsContent value="documents" className="mt-4">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>Related Documents</span>
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-2" /> Upload Document
                  </Button>
                </CardTitle>
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
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entity.documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            {doc.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{doc.type}</Badge>
                        </TableCell>
                        <TableCell>{doc.category}</TableCell>
                        <TableCell>{doc.uploadDate}</TableCell>
                        <TableCell>{doc.uploadedBy}</TableCell>
                        <TableCell>{doc.size}</TableCell>
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
          
          {/* Risk Assessment Tab */}
          <TabsContent value="risk" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Shield className="h-4 w-4" /> Risk Score Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-4xl font-bold text-primary">{entity.riskScore}</p>
                      <p className="text-sm text-muted-foreground">Overall Risk Score</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(entity.trend)}
                      <span className="text-sm capitalize">{entity.trend}</span>
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t">
                    {Object.entries(entity.riskFactors).map(([factor, score]) => (
                      <div key={factor} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="capitalize">{factor.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="font-medium">{score}%</span>
                        </div>
                        <Progress 
                          value={score} 
                          className={`h-2 ${score >= 80 ? '[&>div]:bg-destructive' : score >= 60 ? '[&>div]:bg-warning' : score >= 40 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-success'}`}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Risk Assessment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-destructive/10 rounded-lg text-center">
                      <AlertTriangle className="h-5 w-5 text-destructive mx-auto mb-1" />
                      <p className="text-2xl font-bold text-destructive">
                        {entity.auditHistory.reduce((sum, a) => sum + a.criticalFindings, 0)}
                      </p>
                      <p className="text-xs text-muted-foreground">Critical Findings</p>
                    </div>
                    <div className="p-3 bg-warning/10 rounded-lg text-center">
                      <Clock className="h-5 w-5 text-warning mx-auto mb-1" />
                      <p className="text-2xl font-bold text-warning">
                        {entity.auditHistory.reduce((sum, a) => sum + a.recommendations - a.implementedRecommendations, 0)}
                      </p>
                      <p className="text-xs text-muted-foreground">Open Recommendations</p>
                    </div>
                    <div className="p-3 bg-success/10 rounded-lg text-center">
                      <CheckCircle className="h-5 w-5 text-success mx-auto mb-1" />
                      <p className="text-2xl font-bold text-success">
                        {entity.auditHistory.reduce((sum, a) => sum + a.implementedRecommendations, 0)}
                      </p>
                      <p className="text-xs text-muted-foreground">Implemented</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <Calendar className="h-5 w-5 text-primary mx-auto mb-1" />
                      <p className="text-2xl font-bold text-primary">{entity.auditHistory.length}</p>
                      <p className="text-xs text-muted-foreground">Total Audits</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Scheduled Audits Tab */}
          <TabsContent value="scheduled" className="mt-4">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>Scheduled Audits</span>
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" /> Schedule Audit
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Audit ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Lead Auditor</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entity.scheduledAudits.map((audit) => (
                      <TableRow key={audit.id}>
                        <TableCell className="font-medium">{audit.id}</TableCell>
                        <TableCell>{audit.auditType}</TableCell>
                        <TableCell>{audit.scheduledDate}</TableCell>
                        <TableCell>{audit.leadAuditor}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={
                              audit.priority === 'High' 
                                ? 'bg-destructive/10 text-destructive' 
                                : audit.priority === 'Medium'
                                ? 'bg-warning/10 text-warning'
                                : 'bg-success/10 text-success'
                            }
                          >
                            {audit.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{audit.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
