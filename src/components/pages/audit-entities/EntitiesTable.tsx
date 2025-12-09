import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { AuditEntity, entityCategories, entityRegions } from "@/data/auditEntitiesMockData";
import { 
  Eye, Edit, Trash2, Search, SortAsc, SortDesc, Building2, 
  Server, Users, Filter, Download, ChevronLeft, ChevronRight,
  TrendingUp, TrendingDown, Minus
} from "lucide-react";
import { toast } from "sonner";

interface EntitiesTableProps {
  entities: AuditEntity[];
  onView: (entity: AuditEntity) => void;
  onEdit: (entity: AuditEntity) => void;
  onDelete: (entityId: string) => void;
  onBulkDelete: (entityIds: string[]) => void;
}

type SortField = 'name' | 'riskLevel' | 'riskScore' | 'lastAuditDate' | 'entityType' | 'complianceStatus';
type SortDirection = 'asc' | 'desc';

export const EntitiesTable = ({ entities, onView, onEdit, onDelete, onBulkDelete }: EntitiesTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("riskScore");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState<AuditEntity | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtering
  const filteredEntities = entities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entity.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === "all" || entity.riskLevel === riskFilter;
    const matchesType = typeFilter === "all" || entity.entityType === typeFilter;
    const matchesCategory = categoryFilter === "all" || entity.category === categoryFilter;
    const matchesRegion = regionFilter === "all" || entity.region === regionFilter;
    
    return matchesSearch && matchesRisk && matchesType && matchesCategory && matchesRegion;
  });

  // Sorting
  const sortedEntities = [...filteredEntities].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'riskLevel':
        const riskOrder = { 'Extreme': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
        comparison = riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
        break;
      case 'riskScore':
        comparison = a.riskScore - b.riskScore;
        break;
      case 'lastAuditDate':
        comparison = new Date(a.lastAuditDate).getTime() - new Date(b.lastAuditDate).getTime();
        break;
      case 'entityType':
        comparison = a.entityType.localeCompare(b.entityType);
        break;
      case 'complianceStatus':
        comparison = a.complianceStatus.localeCompare(b.complianceStatus);
        break;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Pagination
  const totalPages = Math.ceil(sortedEntities.length / itemsPerPage);
  const paginatedEntities = sortedEntities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEntities(paginatedEntities.map(e => e.id));
    } else {
      setSelectedEntities([]);
    }
  };

  const handleSelectEntity = (entityId: string, checked: boolean) => {
    if (checked) {
      setSelectedEntities(prev => [...prev, entityId]);
    } else {
      setSelectedEntities(prev => prev.filter(id => id !== entityId));
    }
  };

  const handleDeleteClick = (entity: AuditEntity) => {
    setEntityToDelete(entity);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (entityToDelete) {
      onDelete(entityToDelete.id);
      toast.success(`Entity "${entityToDelete.name}" deleted successfully`);
    }
    setDeleteDialogOpen(false);
    setEntityToDelete(null);
  };

  const handleBulkDelete = () => {
    if (selectedEntities.length > 0) {
      onBulkDelete(selectedEntities);
      setSelectedEntities([]);
      toast.success(`${selectedEntities.length} entities deleted successfully`);
    }
  };

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
      case 'Compliant': return 'bg-success/10 text-success';
      case 'Non-Compliant': return 'bg-destructive/10 text-destructive';
      case 'Pending Review': return 'bg-yellow-500/10 text-yellow-600';
      case 'Remediation Required': return 'bg-warning/10 text-warning';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'Branch': return <Building2 className="h-4 w-4 text-primary" />;
      case 'IT System': return <Server className="h-4 w-4 text-blue-500" />;
      case 'High Value Customer': return <Users className="h-4 w-4 text-purple-500" />;
      default: return <Building2 className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-3 w-3 text-destructive" />;
      case 'decreasing': return <TrendingDown className="h-3 w-3 text-success" />;
      default: return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <Button 
      variant="ghost" 
      size="sm" 
      className="h-auto p-0 hover:bg-transparent font-semibold"
      onClick={() => handleSort(field)}
    >
      {label}
      {sortField === field && (
        sortDirection === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
      )}
    </Button>
  );

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">All Audit Entities</CardTitle>
          <div className="flex items-center gap-2">
            {selectedEntities.length > 0 && (
              <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected ({selectedEntities.length})
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search entities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="Extreme">Extreme</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Entity Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Branch">Branch</SelectItem>
              <SelectItem value="IT System">IT System</SelectItem>
              <SelectItem value="High Value Customer">High Value Customer</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {entityCategories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {entityRegions.map(reg => (
                <SelectItem key={reg} value={reg}>{reg}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedEntities.length === paginatedEntities.length && paginatedEntities.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead><SortButton field="name" label="Entity" /></TableHead>
                <TableHead><SortButton field="entityType" label="Type" /></TableHead>
                <TableHead><SortButton field="riskLevel" label="Risk Level" /></TableHead>
                <TableHead><SortButton field="riskScore" label="Score" /></TableHead>
                <TableHead><SortButton field="complianceStatus" label="Compliance" /></TableHead>
                <TableHead><SortButton field="lastAuditDate" label="Last Audit" /></TableHead>
                <TableHead>Region</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEntities.map((entity) => (
                <TableRow key={entity.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedEntities.includes(entity.id)}
                      onCheckedChange={(checked) => handleSelectEntity(entity.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        {getEntityIcon(entity.entityType)}
                      </div>
                      <div>
                        <p className="font-medium">{entity.name}</p>
                        <p className="text-xs text-muted-foreground">{entity.code}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {entity.entityType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getRiskBadgeClass(entity.riskLevel)}>
                      {entity.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{entity.riskScore}</span>
                      {getTrendIcon(entity.trend)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getComplianceBadgeClass(entity.complianceStatus)}>
                      {entity.complianceStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{entity.lastAuditDate}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{entity.region}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => onView(entity)} title="View Details">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => onEdit(entity)} title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteClick(entity)}
                        className="text-destructive hover:text-destructive"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedEntities.length)} of {sortedEntities.length} entities
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Audit Entity</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{entityToDelete?.name}"? This action cannot be undone and will remove all associated audit history, documents, and scheduled audits.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Entity
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
