import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { LayoutDashboard, List } from "lucide-react";

import { auditEntitiesData, AuditEntity, getEntityStats } from "@/data/auditEntitiesMockData";
import { EntityDashboardWidgets } from "./EntityDashboardWidgets";
import { EntitiesDataTable } from "./EntitiesDataTable";
import { AddEntityWizard } from "./AddEntityWizard";
import { EntityProfilePage } from "./EntityProfilePage";
import { RecentActivityPanel } from "./RecentActivityPanel";

interface BusinessEntityRegistryProps {
  onViewEntity?: (entity: AuditEntity) => void;
}

export const BusinessEntityRegistry = ({ onViewEntity }: BusinessEntityRegistryProps) => {
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
    onViewEntity?.(entity);
  };

  const handleEditClick = (entity: AuditEntity) => {
    setEditEntity(entity);
    setWizardOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Sub-tabs for Dashboard/Entity List */}
      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); if (v === 'dashboard') setDrillDownFilter(null); }}>
        <div className="flex items-center justify-between">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="entities" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Entity List
            </TabsTrigger>
          </TabsList>

          <Button 
            onClick={() => { setEditEntity(null); setWizardOpen(true); }}
            className="bg-primary text-primary-foreground"
          >
            Add New Entity
          </Button>
        </div>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
            <div className="lg:col-span-2 xl:col-span-3">
              <EntityDashboardWidgets 
                entities={entities}
                onDrillDown={handleDrillDown}
              />
            </div>
            <div className="lg:col-span-1 xl:col-span-1 lg:sticky lg:top-4">
              <RecentActivityPanel />
            </div>
          </div>
        </TabsContent>

        {/* Entity List Tab */}
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
