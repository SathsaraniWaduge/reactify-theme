import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuditEntity, entityCategories, entityRegions } from "@/data/auditEntitiesMockData";
import { toast } from "sonner";
import { Building2, Shield, UserCheck, Calendar } from "lucide-react";

interface AddEntityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (entity: Partial<AuditEntity>) => void;
  editEntity?: AuditEntity | null;
}

export const AddEntityDialog = ({ open, onOpenChange, onSave, editEntity }: AddEntityDialogProps) => {
  const isEditing = !!editEntity;
  
  const [formData, setFormData] = useState({
    name: editEntity?.name || "",
    code: editEntity?.code || "",
    entityType: editEntity?.entityType || "Branch" as AuditEntity['entityType'],
    category: editEntity?.category || "",
    region: editEntity?.region || "",
    description: editEntity?.description || "",
    riskLevel: editEntity?.riskLevel || "Medium" as AuditEntity['riskLevel'],
    complianceStatus: editEntity?.complianceStatus || "Pending Review" as AuditEntity['complianceStatus'],
    status: editEntity?.status || "Active" as AuditEntity['status'],
    ownerName: editEntity?.ownerName || "",
    ownerEmail: editEntity?.ownerEmail || "",
    ownerDepartment: editEntity?.ownerDepartment || "",
    assignedAuditor: editEntity?.assignedAuditor || "",
    auditFrequency: editEntity?.auditFrequency || "Quarterly" as AuditEntity['auditFrequency'],
    nextAuditDate: editEntity?.nextAuditDate || "",
  });

  const [activeTab, setActiveTab] = useState("basic");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate code based on entity name
    if (field === 'name' && !isEditing) {
      const prefix = formData.entityType === 'Branch' ? 'BR' : formData.entityType === 'IT System' ? 'IT' : 'CUS';
      const words = value.split(' ').slice(0, 3).map(w => w[0]?.toUpperCase() || '').join('');
      setFormData(prev => ({ ...prev, code: `${prefix}-${words}` }));
    }
    
    // Auto-set audit frequency based on risk level
    if (field === 'riskLevel') {
      const frequency = value === 'Extreme' ? 'Monthly' : value === 'High' ? 'Quarterly' : value === 'Medium' ? 'Semi-Annual' : 'Annual';
      setFormData(prev => ({ ...prev, auditFrequency: frequency as AuditEntity['auditFrequency'] }));
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.code || !formData.category || !formData.region) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    onSave({
      ...formData,
      id: editEntity?.id || `ENT-${Date.now()}`,
      riskScore: editEntity?.riskScore || Math.floor(Math.random() * 40) + 30,
      lastAuditDate: editEntity?.lastAuditDate || new Date().toISOString().split('T')[0],
      createdAt: editEntity?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      version: (editEntity?.version || 0) + 1,
    });
    
    toast.success(isEditing ? "Entity updated successfully" : "Entity created successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            {isEditing ? "Edit Audit Entity" : "Add New Audit Entity"}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic" className="text-xs">
              <Building2 className="h-4 w-4 mr-1" />
              Basic Details
            </TabsTrigger>
            <TabsTrigger value="risk" className="text-xs">
              <Shield className="h-4 w-4 mr-1" />
              Risk Classification
            </TabsTrigger>
            <TabsTrigger value="ownership" className="text-xs">
              <UserCheck className="h-4 w-4 mr-1" />
              Ownership
            </TabsTrigger>
            <TabsTrigger value="scheduling" className="text-xs">
              <Calendar className="h-4 w-4 mr-1" />
              Scheduling
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Entity Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter entity name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Entity Code *</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => handleInputChange('code', e.target.value)}
                      placeholder="Auto-generated"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Entity Type *</Label>
                    <Select value={formData.entityType} onValueChange={(v) => handleInputChange('entityType', v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Branch">Branch</SelectItem>
                        <SelectItem value="IT System">IT System</SelectItem>
                        <SelectItem value="High Value Customer">High Value Customer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select value={formData.category} onValueChange={(v) => handleInputChange('category', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {entityCategories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Region *</Label>
                    <Select value={formData.region} onValueChange={(v) => handleInputChange('region', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {entityRegions.map(reg => (
                          <SelectItem key={reg} value={reg}>{reg}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status *</Label>
                    <Select value={formData.status} onValueChange={(v) => handleInputChange('status', v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Under Review">Under Review</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter entity description"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="risk" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Risk Classification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Risk Level *</Label>
                    <Select value={formData.riskLevel} onValueChange={(v) => handleInputChange('riskLevel', v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Extreme">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-destructive"></span>
                            Extreme
                          </span>
                        </SelectItem>
                        <SelectItem value="High">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-warning"></span>
                            High
                          </span>
                        </SelectItem>
                        <SelectItem value="Medium">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                            Medium
                          </span>
                        </SelectItem>
                        <SelectItem value="Low">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-success"></span>
                            Low
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Compliance Status *</Label>
                    <Select value={formData.complianceStatus} onValueChange={(v) => handleInputChange('complianceStatus', v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Compliant">Compliant</SelectItem>
                        <SelectItem value="Non-Compliant">Non-Compliant</SelectItem>
                        <SelectItem value="Pending Review">Pending Review</SelectItem>
                        <SelectItem value="Remediation Required">Remediation Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Based on the selected risk level, the recommended audit frequency is: 
                    <span className="font-medium text-foreground ml-1">{formData.auditFrequency}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ownership" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Ownership Assignment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input
                      id="ownerName"
                      value={formData.ownerName}
                      onChange={(e) => handleInputChange('ownerName', e.target.value)}
                      placeholder="Enter owner name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerEmail">Owner Email</Label>
                    <Input
                      id="ownerEmail"
                      type="email"
                      value={formData.ownerEmail}
                      onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                      placeholder="owner@boc.lk"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerDepartment">Department</Label>
                    <Input
                      id="ownerDepartment"
                      value={formData.ownerDepartment}
                      onChange={(e) => handleInputChange('ownerDepartment', e.target.value)}
                      placeholder="Enter department"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assignedAuditor">Assigned Auditor</Label>
                    <Input
                      id="assignedAuditor"
                      value={formData.assignedAuditor}
                      onChange={(e) => handleInputChange('assignedAuditor', e.target.value)}
                      placeholder="Select or enter auditor"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scheduling" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Audit Scheduling Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Audit Frequency</Label>
                    <Select value={formData.auditFrequency} onValueChange={(v) => handleInputChange('auditFrequency', v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Quarterly">Quarterly</SelectItem>
                        <SelectItem value="Semi-Annual">Semi-Annual</SelectItem>
                        <SelectItem value="Annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextAuditDate">Next Audit Date</Label>
                    <Input
                      id="nextAuditDate"
                      type="date"
                      value={formData.nextAuditDate}
                      onChange={(e) => handleInputChange('nextAuditDate', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm">
                    <strong>Scheduling Guidelines:</strong>
                  </p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• Extreme Risk entities: Monthly audits required</li>
                    <li>• High Risk entities: Quarterly audits recommended</li>
                    <li>• Medium Risk entities: Semi-annual audits</li>
                    <li>• Low Risk entities: Annual audits minimum</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-primary text-primary-foreground">
            {isEditing ? "Save Changes" : "Create Entity"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
