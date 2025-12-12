import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  ChevronRight, ChevronLeft, Check, AlertCircle, Building2, 
  DollarSign, Mail, Users, Calendar, Loader2 
} from "lucide-react";
import { 
  AuditEntity, EntityType, EntitySize, AuditTeamType, RiskLevel,
  entityTypeConfig, costCentres, auditTeamRegions, isEntityNameUnique, getNextEntityId
} from "@/data/auditEntitiesMockData";

interface AddEntityWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (entity: AuditEntity) => void;
  editEntity?: AuditEntity | null;
}

const steps = [
  { id: 1, title: 'Basic Identification', icon: Building2, description: 'Entity name and type' },
  { id: 2, title: 'Financial & Operational', icon: DollarSign, description: 'Cost centre and contact' },
  { id: 3, title: 'Audit Execution Setup', icon: Users, description: 'Team and travel allocation' },
  { id: 4, title: 'Review & Confirm', icon: Check, description: 'Verify all details' },
];

export const AddEntityWizard = ({ open, onOpenChange, onSave, editEntity }: AddEntityWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isValidating, setIsValidating] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    entityName: '',
    entityType: '' as EntityType,
    entitySize: '' as EntitySize,
    costCentre: '',
    email: '',
    auditTeamType: '' as AuditTeamType,
    officialTravelDays: 0,
    riskLevel: 'MEDIUM' as RiskLevel,
    parentEntityId: '',
  });

  // Reset form when dialog opens/closes or edit entity changes
  useEffect(() => {
    if (open) {
      if (editEntity) {
        setFormData({
          entityName: editEntity.entityName,
          entityType: editEntity.entityType,
          entitySize: editEntity.entitySize,
          costCentre: editEntity.costCentre,
          email: editEntity.email,
          auditTeamType: editEntity.auditTeamType,
          officialTravelDays: editEntity.officialTravelDays,
          riskLevel: editEntity.riskLevel,
          parentEntityId: editEntity.parentEntityId || '',
        });
      } else {
        setFormData({
          entityName: '',
          entityType: '' as EntityType,
          entitySize: '' as EntitySize,
          costCentre: '',
          email: '',
          auditTeamType: '' as AuditTeamType,
          officialTravelDays: 0,
          riskLevel: 'MEDIUM',
          parentEntityId: '',
        });
      }
      setCurrentStep(1);
      setNameError(null);
    }
  }, [open, editEntity]);

  // Handle entity type change - auto-set size
  useEffect(() => {
    if (formData.entityType && entityTypeConfig[formData.entityType]) {
      const config = entityTypeConfig[formData.entityType];
      if (config.sizes.length === 1) {
        setFormData(prev => ({ ...prev, entitySize: config.defaultSize }));
      } else if (!editEntity) {
        setFormData(prev => ({ ...prev, entitySize: '' as EntitySize }));
      }
    }
  }, [formData.entityType, editEntity]);

  // Validate entity name uniqueness
  const validateName = async (name: string) => {
    if (!name.trim()) {
      setNameError('Entity name is required');
      return false;
    }
    
    setIsValidating(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
    
    const isUnique = isEntityNameUnique(name, editEntity?.entityId);
    setIsValidating(false);
    
    if (!isUnique) {
      setNameError('An entity with this name already exists');
      return false;
    }
    
    setNameError(null);
    return true;
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'entityName') {
      setNameError(null);
    }
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.entityName && !!formData.entityType && !!formData.entitySize && !nameError;
      case 2:
        return !!formData.costCentre && !!formData.email;
      case 3:
        return !!formData.auditTeamType;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      const isValid = await validateName(formData.entityName);
      if (!isValid) return;
    }
    
    if (canProceed() && currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const now = new Date().toISOString().split('T')[0];
    
    const newEntity: AuditEntity = {
      entityId: editEntity?.entityId || getNextEntityId(),
      entityName: formData.entityName,
      entityType: formData.entityType,
      entitySize: formData.entitySize,
      costCentre: formData.costCentre,
      email: formData.email,
      auditTeamType: formData.auditTeamType,
      officialTravelDays: formData.officialTravelDays,
      riskLevel: formData.riskLevel,
      status: editEntity?.status || 'Active',
      lastAuditDate: editEntity?.lastAuditDate || null,
      nextAuditDate: editEntity?.nextAuditDate || null,
      parentEntityId: formData.parentEntityId || null,
      controllerEntityId: editEntity?.controllerEntityId || null,
      createdAt: editEntity?.createdAt || now,
      updatedAt: now,
      version: editEntity ? editEntity.version + 1 : 1,
      createdBy: editEntity?.createdBy || 'AU001',
      updatedBy: 'AU001',
      totalAudits: editEntity?.totalAudits || 0,
      openFindings: editEntity?.openFindings || 0,
      closedFindings: editEntity?.closedFindings || 0,
      pendingActions: editEntity?.pendingActions || 0,
    };

    onSave(newEntity);
    toast.success(editEntity ? 'Entity updated successfully' : `Entity ${newEntity.entityId} created successfully`);
    onOpenChange(false);
  };

  const progressPercent = (currentStep / steps.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            {editEntity ? 'Edit Audit Entity' : 'Add New Audit Entity'}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {editEntity 
              ? `Editing entity ${editEntity.entityId} - Version ${editEntity.version}`
              : 'Complete the wizard to create a new audit entity in the universe'
            }
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-3">
          <Progress value={progressPercent} className="h-2" />
          <div className="flex justify-between gap-1">
            {steps.map((step) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isComplete = currentStep > step.id;
              
              return (
                <div 
                  key={step.id}
                  className={`flex flex-col items-center text-center flex-1 ${
                    isActive ? 'text-primary' : isComplete ? 'text-green-500' : 'text-muted-foreground'
                  }`}
                >
                  <div className={`
                    w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 mb-1
                    ${isActive ? 'border-primary bg-primary/10' : isComplete ? 'border-green-500 bg-green-500/10' : 'border-muted'}
                  `}>
                    {isComplete ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : <StepIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium hidden xs:block sm:block">{step.title}</span>
                  <span className="text-[10px] font-medium block xs:hidden sm:hidden">{step.id}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="py-4 min-h-[280px]">
          {/* Step 1: Basic Identification */}
          {currentStep === 1 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Basic Identification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="entityName">Entity Name *</Label>
                  <div className="relative">
                    <Input
                      id="entityName"
                      value={formData.entityName}
                      onChange={(e) => handleInputChange('entityName', e.target.value)}
                      onBlur={(e) => e.target.value && validateName(e.target.value)}
                      placeholder="Enter entity name"
                      className={nameError ? 'border-destructive' : ''}
                    />
                    {isValidating && (
                      <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                  {nameError && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {nameError}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entityType">Entity Type *</Label>
                  <Select
                    value={formData.entityType}
                    onValueChange={(value) => handleInputChange('entityType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="Bank">Bank</SelectItem>
                      <SelectItem value="HOD">HOD (Head Office Division)</SelectItem>
                      <SelectItem value="PO">PO (Provincial Office)</SelectItem>
                      <SelectItem value="Branch">Branch</SelectItem>
                      <SelectItem value="System">System</SelectItem>
                      <SelectItem value="ISL">ISL (Island Service Location)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entitySize">Entity Size / Grade *</Label>
                  {formData.entityType && entityTypeConfig[formData.entityType]?.sizes.length === 1 ? (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-sm py-1 px-3">
                        {entityTypeConfig[formData.entityType].defaultSize}
                      </Badge>
                      <span className="text-xs text-muted-foreground">(Auto-assigned for {formData.entityType})</span>
                    </div>
                  ) : (
                    <Select
                      value={formData.entitySize}
                      onValueChange={(value) => handleInputChange('entitySize', value)}
                      disabled={!formData.entityType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={formData.entityType ? "Select grade" : "Select entity type first"} />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {formData.entityType && entityTypeConfig[formData.entityType]?.sizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            Grade {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="riskLevel">Initial Risk Level</Label>
                  <Select
                    value={formData.riskLevel}
                    onValueChange={(value) => handleInputChange('riskLevel', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="CRITICAL">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-600" />
                          CRITICAL
                        </div>
                      </SelectItem>
                      <SelectItem value="HIGH">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-orange-500" />
                          HIGH
                        </div>
                      </SelectItem>
                      <SelectItem value="MEDIUM">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-500" />
                          MEDIUM
                        </div>
                      </SelectItem>
                      <SelectItem value="LOW">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500" />
                          LOW
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Financial & Operational Details */}
          {currentStep === 2 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial & Operational Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="costCentre">Cost Centre *</Label>
                  <Select
                    value={formData.costCentre}
                    onValueChange={(value) => handleInputChange('costCentre', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select cost centre" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {costCentres.map((cc) => (
                        <SelectItem key={cc} value={cc}>
                          {cc} {cc === '660' && '(Head Office)'} {cc === '55' && '(IT Systems)'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Common codes: 660 (Head Office), 55 (IT Division), 100-500 (Regional)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="entity.name@boc.lk"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-muted/50 border">
                  <p className="text-sm font-medium mb-2">Selected Entity Details</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Type:</span>{' '}
                      <Badge variant="outline">{formData.entityType || '-'}</Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Size:</span>{' '}
                      <Badge variant="outline">{formData.entitySize || '-'}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Audit Execution Setup */}
          {currentStep === 3 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Audit Execution Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="auditTeamType">Audit Team Type *</Label>
                  <Select
                    value={formData.auditTeamType}
                    onValueChange={(value) => handleInputChange('auditTeamType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select audit team" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {Object.entries(auditTeamRegions).map(([code, name]) => (
                        <SelectItem key={code} value={code}>
                          {code} - {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="officialTravelDays">Official Travel Days</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="officialTravelDays"
                      type="number"
                      min={0}
                      max={7}
                      value={formData.officialTravelDays}
                      onChange={(e) => handleInputChange('officialTravelDays', parseInt(e.target.value) || 0)}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Number of travel days required for audit team (0-7)
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm font-medium mb-2 text-primary">Audit Team Information</p>
                  <p className="text-xs text-muted-foreground">
                    {formData.auditTeamType && auditTeamRegions[formData.auditTeamType] 
                      ? `This entity will be assigned to the ${auditTeamRegions[formData.auditTeamType]} audit team.`
                      : 'Select a team to see assignment details.'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review & Confirm */}
          {currentStep === 4 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Review & Confirm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">Entity Details</h4>
                      {!editEntity && (
                        <Badge variant="outline" className="text-primary">
                          ID: {getNextEntityId()}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Name:</span>
                        <p className="font-medium">{formData.entityName}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Type:</span>
                        <p className="font-medium">{formData.entityType}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Size/Grade:</span>
                        <p className="font-medium">{formData.entitySize}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cost Centre:</span>
                        <p className="font-medium">{formData.costCentre}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Audit Team:</span>
                        <p className="font-medium">{formData.auditTeamType}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Travel Days:</span>
                        <p className="font-medium">{formData.officialTravelDays}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Risk Level:</span>
                        <Badge 
                          className={
                            formData.riskLevel === 'CRITICAL' ? 'bg-red-600' :
                            formData.riskLevel === 'HIGH' ? 'bg-orange-500' :
                            formData.riskLevel === 'MEDIUM' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }
                        >
                          {formData.riskLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Note:</strong> {editEntity 
                        ? 'This update will be version tracked and logged in the audit trail.'
                        : 'Upon creation, this entity will be added to the audit universe and assigned the next sequential Entity ID.'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0 sm:justify-between mt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="w-full sm:w-auto"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            {currentStep < steps.length ? (
              <Button onClick={handleNext} disabled={!canProceed()} className="w-full sm:w-auto">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                <Check className="h-4 w-4 mr-1" />
                {editEntity ? 'Update Entity' : 'Create Entity'}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
