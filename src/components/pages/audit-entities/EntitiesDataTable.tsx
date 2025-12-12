import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { 
  Search, Filter, MoreHorizontal, Eye, Edit, Trash2, 
  ArrowUpDown, ChevronDown, Download, Users, X, RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import { 
  AuditEntity, EntityType, AuditTeamType, RiskLevel, costCentres 
} from "@/data/auditEntitiesMockData";

interface EntitiesDataTableProps {
  entities: AuditEntity[];
  onView: (entity: AuditEntity) => void;
  onEdit: (entity: AuditEntity) => void;
  onDelete: (entityId: string) => void;
  onBulkAction: (entityIds: string[], action: string) => void;
  initialFilter?: { type: string; value: string } | null;
}

type SortField = 'entityId' | 'entityName' | 'entityType' | 'riskLevel' | 'lastAuditDate' | 'status';
type SortDirection = 'asc' | 'desc';

export const EntitiesDataTable = ({ 
  entities, 
  onView, 
  onEdit, 
  onDelete, 
  onBulkAction,
  initialFilter 
}: EntitiesDataTableProps) => {
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('entityId');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // Filters
  const [filters, setFilters] = useState({
    entityType: initialFilter?.type === 'entityType' ? initialFilter.value : '',
    riskLevel: initialFilter?.type === 'risk' ? initialFilter.value : '',
    auditTeamType: initialFilter?.type === 'team' ? initialFilter.value : '',
    costCentre: initialFilter?.type === 'costCentre' ? initialFilter.value : '',
    status: initialFilter?.type === 'status' ? initialFilter.value : '',
    size: initialFilter?.type === 'size' ? initialFilter.value : '',
    travelDaysMin: '',
    travelDaysMax: '',
  });

  const [showFilters, setShowFilters] = useState(!!initialFilter);

  // Apply filters and search
  const filteredEntities = useMemo(() => {
    return entities.filter(entity => {
      // Search
      const searchLower = search.toLowerCase();
      const matchesSearch = !search || 
        entity.entityId.toLowerCase().includes(searchLower) ||
        entity.entityName.toLowerCase().includes(searchLower) ||
        entity.email.toLowerCase().includes(searchLower);

      // Filters
      const matchesType = !filters.entityType || entity.entityType === filters.entityType;
      const matchesRisk = !filters.riskLevel || entity.riskLevel === filters.riskLevel;
      const matchesTeam = !filters.auditTeamType || entity.auditTeamType === filters.auditTeamType;
      const matchesCostCentre = !filters.costCentre || entity.costCentre === filters.costCentre;
      const matchesStatus = !filters.status || entity.status === filters.status;
      const matchesSize = !filters.size || entity.entitySize === filters.size;
      
      const minDays = filters.travelDaysMin ? parseInt(filters.travelDaysMin) : 0;
      const maxDays = filters.travelDaysMax ? parseInt(filters.travelDaysMax) : 7;
      const matchesTravelDays = entity.officialTravelDays >= minDays && entity.officialTravelDays <= maxDays;

      return matchesSearch && matchesType && matchesRisk && matchesTeam && 
             matchesCostCentre && matchesStatus && matchesSize && matchesTravelDays;
    });
  }, [entities, search, filters]);

  // Sort entities
  const sortedEntities = useMemo(() => {
    const sorted = [...filteredEntities].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'entityId':
          comparison = a.entityId.localeCompare(b.entityId);
          break;
        case 'entityName':
          comparison = a.entityName.localeCompare(b.entityName);
          break;
        case 'entityType':
          comparison = a.entityType.localeCompare(b.entityType);
          break;
        case 'riskLevel':
          const riskOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
          comparison = riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
          break;
        case 'lastAuditDate':
          comparison = (a.lastAuditDate || '').localeCompare(b.lastAuditDate || '');
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  }, [filteredEntities, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedEntities.length / pageSize);
  const paginatedEntities = sortedEntities.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedEntities.map(e => e.entityId));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (entityId: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, entityId]);
    } else {
      setSelectedIds(prev => prev.filter(id => id !== entityId));
    }
  };

  const handleDeleteClick = (entityId: string) => {
    setEntityToDelete(entityId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (entityToDelete) {
      onDelete(entityToDelete);
      toast.success('Entity deactivated successfully');
    }
    setShowDeleteDialog(false);
    setEntityToDelete(null);
  };

  const handleBulkDelete = () => {
    if (selectedIds.length > 0) {
      onBulkAction(selectedIds, 'deactivate');
      setSelectedIds([]);
      toast.success(`${selectedIds.length} entities deactivated`);
    }
  };

  const clearFilters = () => {
    setFilters({
      entityType: '',
      riskLevel: '',
      auditTeamType: '',
      costCentre: '',
      status: '',
      size: '',
      travelDaysMin: '',
      travelDaysMax: '',
    });
    setSearch('');
  };

  const getRiskBadgeClass = (risk: RiskLevel) => {
    switch (risk) {
      case 'CRITICAL': return 'bg-red-600 text-white';
      case 'HIGH': return 'bg-orange-500 text-white';
      case 'MEDIUM': return 'bg-yellow-500 text-black';
      case 'LOW': return 'bg-green-500 text-white';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Deactivated': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return '';
    }
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== '').length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold">
            Entity Registry
            <Badge variant="secondary" className="ml-2">{filteredEntities.length} entities</Badge>
          </CardTitle>
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative w-full lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search ID, name, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            
            {/* Filter Toggle */}
            <Button 
              variant={showFilters ? "secondary" : "outline"} 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-1" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>

            {/* Bulk Actions */}
            {selectedIds.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-1" />
                    Bulk ({selectedIds.length})
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover">
                  <DropdownMenuItem onClick={() => onBulkAction(selectedIds, 'assign-team')}>
                    Assign Team
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onBulkAction(selectedIds, 'update-status')}>
                    Update Status
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleBulkDelete}
                    className="text-destructive"
                  >
                    Deactivate Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Export */}
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Advanced Filters</span>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <RefreshCw className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              <Select value={filters.entityType} onValueChange={(v) => setFilters(p => ({ ...p, entityType: v }))}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Entity Type" />
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

              <Select value={filters.riskLevel} onValueChange={(v) => setFilters(p => ({ ...p, riskLevel: v }))}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="">All Risks</SelectItem>
                  <SelectItem value="CRITICAL">CRITICAL</SelectItem>
                  <SelectItem value="HIGH">HIGH</SelectItem>
                  <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                  <SelectItem value="LOW">LOW</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.auditTeamType} onValueChange={(v) => setFilters(p => ({ ...p, auditTeamType: v }))}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Audit Team" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="">All Teams</SelectItem>
                  <SelectItem value="HO">HO</SelectItem>
                  <SelectItem value="UVA">UVA</SelectItem>
                  <SelectItem value="NORTH">NORTH</SelectItem>
                  <SelectItem value="SOUTH">SOUTH</SelectItem>
                  <SelectItem value="EAST">EAST</SelectItem>
                  <SelectItem value="WEST">WEST</SelectItem>
                  <SelectItem value="CENTRAL">CENTRAL</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.costCentre} onValueChange={(v) => setFilters(p => ({ ...p, costCentre: v }))}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Cost Centre" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="">All Centres</SelectItem>
                  {costCentres.map(cc => (
                    <SelectItem key={cc} value={cc}>{cc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.status} onValueChange={(v) => setFilters(p => ({ ...p, status: v }))}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Deactivated">Deactivated</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.size} onValueChange={(v) => setFilters(p => ({ ...p, size: v }))}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Size/Grade" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="">All Sizes</SelectItem>
                  <SelectItem value="BANK">BANK</SelectItem>
                  <SelectItem value="SG">SG</SelectItem>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedIds.length === paginatedEntities.length && paginatedEntities.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('entityId')}>
                  <div className="flex items-center gap-1">
                    Entity ID
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('entityName')}>
                  <div className="flex items-center gap-1">
                    Entity Name
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('entityType')}>
                  <div className="flex items-center gap-1">
                    Type
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Cost Centre</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Travel Days</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('riskLevel')}>
                  <div className="flex items-center gap-1">
                    Risk
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                  <div className="flex items-center gap-1">
                    Status
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('lastAuditDate')}>
                  <div className="flex items-center gap-1">
                    Last Audit
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEntities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} className="h-32 text-center text-muted-foreground">
                    No entities found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                paginatedEntities.map((entity) => (
                  <TableRow 
                    key={entity.entityId}
                    className={selectedIds.includes(entity.entityId) ? 'bg-primary/5' : ''}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(entity.entityId)}
                        onCheckedChange={(checked) => handleSelectOne(entity.entityId, !!checked)}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-sm">{entity.entityId}</TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {entity.entityName}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{entity.entityType}</Badge>
                    </TableCell>
                    <TableCell>{entity.entitySize}</TableCell>
                    <TableCell>{entity.costCentre}</TableCell>
                    <TableCell>{entity.auditTeamType}</TableCell>
                    <TableCell>{entity.officialTravelDays}</TableCell>
                    <TableCell>
                      <Badge className={getRiskBadgeClass(entity.riskLevel)}>
                        {entity.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeClass(entity.status)}>
                        {entity.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {entity.lastAuditDate || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover">
                          <DropdownMenuItem onClick={() => onView(entity)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit(entity)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Entity
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteClick(entity.entityId)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Deactivate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Rows per page:</span>
            <Select value={String(pageSize)} onValueChange={(v) => { setPageSize(Number(v)); setCurrentPage(1); }}>
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages || 1}
            </span>
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                First
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate Entity</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to deactivate this entity? This action will mark the entity as inactive 
              in the audit universe. All associated audit history and documents will be preserved for audit trail purposes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Deactivate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
