import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  ChevronRight, ChevronDown, Building2, Server, MapPin, Landmark, Users,
  Search, Filter, GitBranch, Network, Layers, Link2, Unlink, Edit, Eye,
  AlertTriangle, CheckCircle, FileText, Download, RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import { auditEntitiesData, AuditEntity, EntityType } from "@/data/auditEntitiesMockData";

interface HierarchyNode {
  entity: AuditEntity;
  children: HierarchyNode[];
  level: number;
  isExpanded: boolean;
}

const entityTypeIcons: Record<EntityType, React.ElementType> = {
  'Bank': Landmark,
  'HOD': Building2,
  'PO': MapPin,
  'Branch': Building2,
  'System': Server,
  'ISL': MapPin,
};

const riskColors: Record<string, string> = {
  'CRITICAL': 'text-red-600 bg-red-100 dark:bg-red-900/30',
  'HIGH': 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
  'MEDIUM': 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
  'LOW': 'text-green-600 bg-green-100 dark:bg-green-900/30',
};

export const EntityControllerHierarchy = () => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['EN000001']));
  const [selectedEntity, setSelectedEntity] = useState<AuditEntity | null>(null);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'tree' | 'list'>('tree');

  // Build hierarchy tree
  const hierarchyData = useMemo(() => {
    const entityMap = new Map<string, AuditEntity>();
    auditEntitiesData.forEach(e => entityMap.set(e.entityId, e));

    const buildTree = (parentId: string | null, level: number): HierarchyNode[] => {
      return auditEntitiesData
        .filter(e => e.parentEntityId === parentId)
        .filter(e => !filterType || e.entityType === filterType)
        .filter(e => !search || 
          e.entityName.toLowerCase().includes(search.toLowerCase()) ||
          e.entityId.toLowerCase().includes(search.toLowerCase())
        )
        .map(entity => ({
          entity,
          children: buildTree(entity.entityId, level + 1),
          level,
          isExpanded: expandedNodes.has(entity.entityId),
        }));
    };

    return buildTree(null, 0);
  }, [expandedNodes, filterType, search]);

  // Calculate stats
  const stats = useMemo(() => {
    const withParent = auditEntitiesData.filter(e => e.parentEntityId).length;
    const withController = auditEntitiesData.filter(e => e.controllerEntityId).length;
    const orphans = auditEntitiesData.filter(e => !e.parentEntityId && e.entityType !== 'Bank').length;
    const maxDepth = Math.max(...auditEntitiesData.map(e => {
      let depth = 0;
      let current = e;
      while (current.parentEntityId) {
        depth++;
        current = auditEntitiesData.find(p => p.entityId === current.parentEntityId) || current;
        if (depth > 10) break; // Prevent infinite loop
      }
      return depth;
    }));

    return { withParent, withController, orphans, maxDepth };
  }, []);

  const toggleNode = (entityId: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(entityId)) {
        next.delete(entityId);
      } else {
        next.add(entityId);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedNodes(new Set(auditEntitiesData.map(e => e.entityId)));
  };

  const collapseAll = () => {
    setExpandedNodes(new Set(['EN000001']));
  };

  const handleLinkEntity = (entity: AuditEntity) => {
    setSelectedEntity(entity);
    setLinkDialogOpen(true);
  };

  const handleViewDetails = (entity: AuditEntity) => {
    setSelectedEntity(entity);
    setDetailDialogOpen(true);
  };

  const getController = (controllerId: string | null) => {
    if (!controllerId) return null;
    return auditEntitiesData.find(e => e.entityId === controllerId);
  };

  const getParent = (parentId: string | null) => {
    if (!parentId) return null;
    return auditEntitiesData.find(e => e.entityId === parentId);
  };

  const renderTreeNode = (node: HierarchyNode) => {
    const IconComponent = entityTypeIcons[node.entity.entityType];
    const hasChildren = node.children.length > 0;
    const controller = getController(node.entity.controllerEntityId);

    return (
      <div key={node.entity.entityId} className="select-none">
        <div 
          className={`flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors group
            ${selectedEntity?.entityId === node.entity.entityId ? 'bg-primary/10 border border-primary/30' : ''}`}
          style={{ paddingLeft: `${node.level * 24 + 12}px` }}
        >
          {/* Expand/Collapse */}
          {hasChildren ? (
            <button 
              onClick={() => toggleNode(node.entity.entityId)}
              className="p-1 hover:bg-muted rounded"
            >
              {expandedNodes.has(node.entity.entityId) ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          ) : (
            <div className="w-6" />
          )}

          {/* Icon */}
          <div className={`p-1.5 rounded-lg ${
            node.entity.entityType === 'Bank' ? 'bg-primary/20' :
            node.entity.entityType === 'HOD' ? 'bg-purple-100 dark:bg-purple-900/30' :
            node.entity.entityType === 'Branch' ? 'bg-green-100 dark:bg-green-900/30' :
            node.entity.entityType === 'System' ? 'bg-orange-100 dark:bg-orange-900/30' :
            'bg-muted'
          }`}>
            <IconComponent className={`h-4 w-4 ${
              node.entity.entityType === 'Bank' ? 'text-primary' :
              node.entity.entityType === 'HOD' ? 'text-purple-600' :
              node.entity.entityType === 'Branch' ? 'text-green-600' :
              node.entity.entityType === 'System' ? 'text-orange-600' :
              'text-muted-foreground'
            }`} />
          </div>

          {/* Entity Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm truncate">{node.entity.entityName}</span>
              <Badge variant="outline" className="text-xs font-mono">
                {node.entity.entityId}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{node.entity.entityType}</span>
              {controller && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {controller.entityName}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Risk Badge */}
          <Badge className={`text-xs ${riskColors[node.entity.riskLevel]}`}>
            {node.entity.riskLevel}
          </Badge>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleViewDetails(node.entity)}>
              <Eye className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleLinkEntity(node.entity)}>
              <Link2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Children */}
        {hasChildren && expandedNodes.has(node.entity.entityId) && (
          <div className="border-l-2 border-muted ml-6">
            {node.children.map(child => renderTreeNode(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Hierarchy Depth</p>
                <p className="text-2xl font-bold">{stats.maxDepth + 1}</p>
                <p className="text-xs text-muted-foreground">levels</p>
              </div>
              <GitBranch className="h-8 w-8 text-primary opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Linked Entities</p>
                <p className="text-2xl font-bold text-green-600">{stats.withParent}</p>
                <p className="text-xs text-muted-foreground">with parent</p>
              </div>
              <Link2 className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Controller Assigned</p>
                <p className="text-2xl font-bold text-blue-600">{stats.withController}</p>
                <p className="text-xs text-muted-foreground">entities</p>
              </div>
              <Users className="h-8 w-8 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Orphan Entities</p>
                <p className="text-2xl font-bold text-orange-600">{stats.orphans}</p>
                <p className="text-xs text-muted-foreground">unlinked</p>
              </div>
              <Unlink className="h-8 w-8 text-orange-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Hierarchy View */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Network className="h-5 w-5" />
                Entity-Controller Hierarchy
              </CardTitle>
              <CardDescription>
                Visual representation of entity relationships and control structure
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search entities..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="Bank">Bank</SelectItem>
                  <SelectItem value="HOD">HOD</SelectItem>
                  <SelectItem value="PO">PO</SelectItem>
                  <SelectItem value="Branch">Branch</SelectItem>
                  <SelectItem value="System">System</SelectItem>
                  <SelectItem value="ISL">ISL</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" onClick={expandAll}>
                Expand All
              </Button>
              <Button variant="outline" size="sm" onClick={collapseAll}>
                Collapse All
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <div className="p-4">
              {hierarchyData.length > 0 ? (
                hierarchyData.map(node => renderTreeNode(node))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Network className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No entities match your search criteria</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Entity Details Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedEntity && entityTypeIcons[selectedEntity.entityType] && (
                (() => {
                  const IconComponent = entityTypeIcons[selectedEntity.entityType];
                  return <IconComponent className="h-5 w-5" />;
                })()
              )}
              {selectedEntity?.entityName}
            </DialogTitle>
            <DialogDescription>
              Entity hierarchy and relationship details
            </DialogDescription>
          </DialogHeader>

          {selectedEntity && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Entity ID</p>
                  <p className="font-mono font-semibold">{selectedEntity.entityId}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Entity Type</p>
                  <Badge variant="secondary">{selectedEntity.entityType}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Risk Level</p>
                  <Badge className={riskColors[selectedEntity.riskLevel]}>
                    {selectedEntity.riskLevel}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge variant={selectedEntity.status === 'Active' ? 'default' : 'secondary'}>
                    {selectedEntity.status}
                  </Badge>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-3">Hierarchy Position</p>
                <div className="space-y-3">
                  {selectedEntity.parentEntityId && (
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="p-2 rounded bg-primary/10">
                        <GitBranch className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Parent Entity</p>
                        <p className="font-medium">{getParent(selectedEntity.parentEntityId)?.entityName || 'Unknown'}</p>
                        <p className="text-xs font-mono text-muted-foreground">{selectedEntity.parentEntityId}</p>
                      </div>
                    </div>
                  )}

                  {selectedEntity.controllerEntityId && (
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="p-2 rounded bg-blue-500/10">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Controller</p>
                        <p className="font-medium">{getController(selectedEntity.controllerEntityId)?.entityName || 'Unknown'}</p>
                        <p className="text-xs font-mono text-muted-foreground">{selectedEntity.controllerEntityId}</p>
                      </div>
                    </div>
                  )}

                  {!selectedEntity.parentEntityId && !selectedEntity.controllerEntityId && (
                    <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      <p className="text-sm text-orange-700 dark:text-orange-400">
                        This entity has no parent or controller assigned
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">Child Entities</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {auditEntitiesData.filter(e => e.parentEntityId === selectedEntity.entityId).length} direct children
                  </Badge>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setDetailDialogOpen(false);
              handleLinkEntity(selectedEntity!);
            }}>
              <Link2 className="h-4 w-4 mr-2" />
              Manage Links
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Link Management Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Manage Entity Links</DialogTitle>
            <DialogDescription>
              Update parent and controller relationships for {selectedEntity?.entityName}
            </DialogDescription>
          </DialogHeader>

          {selectedEntity && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Parent Entity</label>
                <Select defaultValue={selectedEntity.parentEntityId || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent entity" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover max-h-60">
                    <SelectItem value="">No Parent</SelectItem>
                    {auditEntitiesData
                      .filter(e => e.entityId !== selectedEntity.entityId)
                      .map(e => (
                        <SelectItem key={e.entityId} value={e.entityId}>
                          {e.entityName} ({e.entityId})
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Controller Entity</label>
                <Select defaultValue={selectedEntity.controllerEntityId || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select controller" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover max-h-60">
                    <SelectItem value="">No Controller</SelectItem>
                    {auditEntitiesData
                      .filter(e => e.entityType === 'HOD' || e.entityType === 'PO')
                      .map(e => (
                        <SelectItem key={e.entityId} value={e.entityId}>
                          {e.entityName} ({e.entityId})
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast.success('Entity links updated successfully');
              setLinkDialogOpen(false);
            }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
