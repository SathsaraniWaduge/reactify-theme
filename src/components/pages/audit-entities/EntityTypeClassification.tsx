import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  Building2, Server, MapPin, Landmark, Users, Briefcase, Plus, Edit, Trash2,
  CheckCircle, XCircle, Settings, Info, Layers
} from "lucide-react";
import { toast } from "sonner";

interface EntityTypeConfig {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: string;
  allowedSizes: string[];
  defaultSize: string;
  requiresController: boolean;
  requiresParent: boolean;
  maxTravelDays: number;
  auditFrequency: 'Quarterly' | 'Semi-Annual' | 'Annual' | 'Bi-Annual';
  riskWeight: number;
  isActive: boolean;
  entityCount: number;
  createdAt: string;
  updatedAt: string;
}

const defaultEntityTypes: EntityTypeConfig[] = [
  {
    id: '1',
    code: 'BANK',
    name: 'Bank',
    description: 'Root bank entity - Bank of Ceylon Head Office',
    icon: 'Landmark',
    allowedSizes: ['BANK'],
    defaultSize: 'BANK',
    requiresController: false,
    requiresParent: false,
    maxTravelDays: 0,
    auditFrequency: 'Quarterly',
    riskWeight: 100,
    isActive: true,
    entityCount: 1,
    createdAt: '2020-01-01',
    updatedAt: '2025-01-10',
  },
  {
    id: '2',
    code: 'HOD',
    name: 'Head Office Division',
    description: 'Divisions at the Head Office level',
    icon: 'Building2',
    allowedSizes: ['BANK'],
    defaultSize: 'BANK',
    requiresController: false,
    requiresParent: true,
    maxTravelDays: 0,
    auditFrequency: 'Semi-Annual',
    riskWeight: 80,
    isActive: true,
    entityCount: 10,
    createdAt: '2020-01-01',
    updatedAt: '2025-01-10',
  },
  {
    id: '3',
    code: 'PO',
    name: 'Provincial Office',
    description: 'Provincial coordination offices',
    icon: 'MapPin',
    allowedSizes: ['BANK'],
    defaultSize: 'BANK',
    requiresController: false,
    requiresParent: true,
    maxTravelDays: 3,
    auditFrequency: 'Annual',
    riskWeight: 60,
    isActive: true,
    entityCount: 6,
    createdAt: '2020-01-01',
    updatedAt: '2025-01-10',
  },
  {
    id: '4',
    code: 'BRANCH',
    name: 'Branch',
    description: 'Bank branches across the country',
    icon: 'Building2',
    allowedSizes: ['SG', 'A', 'B', 'C'],
    defaultSize: 'B',
    requiresController: true,
    requiresParent: true,
    maxTravelDays: 5,
    auditFrequency: 'Annual',
    riskWeight: 70,
    isActive: true,
    entityCount: 25,
    createdAt: '2020-01-01',
    updatedAt: '2025-01-10',
  },
  {
    id: '5',
    code: 'SYSTEM',
    name: 'System',
    description: 'IT systems and applications',
    icon: 'Server',
    allowedSizes: ['BANK'],
    defaultSize: 'BANK',
    requiresController: false,
    requiresParent: true,
    maxTravelDays: 0,
    auditFrequency: 'Semi-Annual',
    riskWeight: 90,
    isActive: true,
    entityCount: 14,
    createdAt: '2020-01-01',
    updatedAt: '2025-01-10',
  },
  {
    id: '6',
    code: 'ISL',
    name: 'Island-wide Service Location',
    description: 'Service locations across the island',
    icon: 'MapPin',
    allowedSizes: ['SG', 'A', 'B', 'C'],
    defaultSize: 'C',
    requiresController: false,
    requiresParent: true,
    maxTravelDays: 2,
    auditFrequency: 'Bi-Annual',
    riskWeight: 40,
    isActive: true,
    entityCount: 8,
    createdAt: '2020-01-01',
    updatedAt: '2025-01-10',
  },
];

const iconMap: Record<string, React.ElementType> = {
  Landmark,
  Building2,
  MapPin,
  Server,
  Users,
  Briefcase,
};

export const EntityTypeClassification = () => {
  const [entityTypes, setEntityTypes] = useState<EntityTypeConfig[]>(defaultEntityTypes);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<EntityTypeConfig | null>(null);
  const [formData, setFormData] = useState<Partial<EntityTypeConfig>>({});

  const handleAdd = () => {
    setSelectedType(null);
    setFormData({
      code: '',
      name: '',
      description: '',
      icon: 'Building2',
      allowedSizes: ['BANK'],
      defaultSize: 'BANK',
      requiresController: false,
      requiresParent: true,
      maxTravelDays: 0,
      auditFrequency: 'Annual',
      riskWeight: 50,
      isActive: true,
    });
    setDialogOpen(true);
  };

  const handleEdit = (type: EntityTypeConfig) => {
    setSelectedType(type);
    setFormData(type);
    setDialogOpen(true);
  };

  const handleDelete = (type: EntityTypeConfig) => {
    setSelectedType(type);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedType) {
      setEntityTypes(prev => prev.filter(t => t.id !== selectedType.id));
      toast.success(`Entity type "${selectedType.name}" deleted`);
    }
    setDeleteDialogOpen(false);
    setSelectedType(null);
  };

  const handleSave = () => {
    if (!formData.code || !formData.name) {
      toast.error('Code and Name are required');
      return;
    }

    if (selectedType) {
      // Edit
      setEntityTypes(prev => prev.map(t => 
        t.id === selectedType.id 
          ? { ...t, ...formData, updatedAt: new Date().toISOString().split('T')[0] } as EntityTypeConfig
          : t
      ));
      toast.success(`Entity type "${formData.name}" updated`);
    } else {
      // Add
      const newType: EntityTypeConfig = {
        ...formData,
        id: String(Date.now()),
        entityCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      } as EntityTypeConfig;
      setEntityTypes(prev => [...prev, newType]);
      toast.success(`Entity type "${formData.name}" created`);
    }

    setDialogOpen(false);
    setSelectedType(null);
    setFormData({});
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Building2;
    return <IconComponent className="h-5 w-5" />;
  };

  const totalEntities = entityTypes.reduce((sum, t) => sum + t.entityCount, 0);
  const activeTypes = entityTypes.filter(t => t.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Entity Types</p>
                <p className="text-2xl font-bold">{entityTypes.length}</p>
              </div>
              <Layers className="h-8 w-8 text-primary opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Active Types</p>
                <p className="text-2xl font-bold text-green-600">{activeTypes}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Total Entities</p>
                <p className="text-2xl font-bold text-blue-600">{totalEntities}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Avg Risk Weight</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(entityTypes.reduce((sum, t) => sum + t.riskWeight, 0) / entityTypes.length)}%
                </p>
              </div>
              <Settings className="h-8 w-8 text-orange-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Entity Type Classification
              </CardTitle>
              <CardDescription>
                Configure and manage audit entity types for the audit universe
              </CardDescription>
            </div>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add Entity Type
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12"></TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Allowed Sizes</TableHead>
                <TableHead>Audit Frequency</TableHead>
                <TableHead>Risk Weight</TableHead>
                <TableHead>Entities</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entityTypes.map((type) => (
                <TableRow key={type.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="p-2 rounded-lg bg-primary/10 w-fit">
                      {getIcon(type.icon)}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono font-semibold">{type.code}</TableCell>
                  <TableCell className="font-medium">{type.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                    {type.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {type.allowedSizes.map(size => (
                        <Badge key={size} variant="outline" className="text-xs">
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{type.auditFrequency}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${type.riskWeight}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{type.riskWeight}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{type.entityCount}</Badge>
                  </TableCell>
                  <TableCell>
                    {type.isActive ? (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Active
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(type)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(type)}
                        disabled={type.entityCount > 0}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedType ? 'Edit Entity Type' : 'Add New Entity Type'}
            </DialogTitle>
            <DialogDescription>
              Configure the entity type settings and classification rules
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Code *</Label>
              <Input
                value={formData.code || ''}
                onChange={(e) => setFormData(p => ({ ...p, code: e.target.value.toUpperCase() }))}
                placeholder="BRANCH"
                disabled={!!selectedType}
              />
            </div>

            <div className="space-y-2">
              <Label>Name *</Label>
              <Input
                value={formData.name || ''}
                onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                placeholder="Branch"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                placeholder="Description of this entity type..."
              />
            </div>

            <div className="space-y-2">
              <Label>Icon</Label>
              <Select 
                value={formData.icon} 
                onValueChange={(v) => setFormData(p => ({ ...p, icon: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="Landmark">Landmark</SelectItem>
                  <SelectItem value="Building2">Building</SelectItem>
                  <SelectItem value="MapPin">Location</SelectItem>
                  <SelectItem value="Server">Server</SelectItem>
                  <SelectItem value="Users">Users</SelectItem>
                  <SelectItem value="Briefcase">Briefcase</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Audit Frequency</Label>
              <Select 
                value={formData.auditFrequency} 
                onValueChange={(v) => setFormData(p => ({ ...p, auditFrequency: v as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Semi-Annual">Semi-Annual</SelectItem>
                  <SelectItem value="Annual">Annual</SelectItem>
                  <SelectItem value="Bi-Annual">Bi-Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Default Size</Label>
              <Select 
                value={formData.defaultSize} 
                onValueChange={(v) => setFormData(p => ({ ...p, defaultSize: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="BANK">BANK</SelectItem>
                  <SelectItem value="SG">SG (Super Grade)</SelectItem>
                  <SelectItem value="A">Grade A</SelectItem>
                  <SelectItem value="B">Grade B</SelectItem>
                  <SelectItem value="C">Grade C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Risk Weight (%)</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={formData.riskWeight || 50}
                onChange={(e) => setFormData(p => ({ ...p, riskWeight: parseInt(e.target.value) }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Max Travel Days</Label>
              <Input
                type="number"
                min={0}
                max={7}
                value={formData.maxTravelDays || 0}
                onChange={(e) => setFormData(p => ({ ...p, maxTravelDays: parseInt(e.target.value) }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-0.5">
                <Label>Requires Parent Entity</Label>
                <p className="text-xs text-muted-foreground">Must have a parent in hierarchy</p>
              </div>
              <Switch
                checked={formData.requiresParent}
                onCheckedChange={(v) => setFormData(p => ({ ...p, requiresParent: v }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-0.5">
                <Label>Requires Controller</Label>
                <p className="text-xs text-muted-foreground">Must be assigned to a controller</p>
              </div>
              <Switch
                checked={formData.requiresController}
                onCheckedChange={(v) => setFormData(p => ({ ...p, requiresController: v }))}
              />
            </div>

            <div className="col-span-2 flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-0.5">
                <Label>Active</Label>
                <p className="text-xs text-muted-foreground">Entity type is available for new entities</p>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(v) => setFormData(p => ({ ...p, isActive: v }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {selectedType ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Entity Type</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedType?.name}"? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
