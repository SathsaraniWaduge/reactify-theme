// Enterprise Audit Entities Mock Data for BOC Bank AIIA System
// Master Data Module - Audit Universe Management

export type EntityType = 'Bank' | 'HOD' | 'PO' | 'Branch' | 'System' | 'ISL';
export type EntitySize = 'BANK' | 'SG' | 'A' | 'B' | 'C';
export type AuditTeamType = 'HO' | 'UVA' | 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | 'CENTRAL';
export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type EntityStatus = 'Active' | 'Inactive' | 'Under Review' | 'Deactivated';

export interface AuditEntity {
  entityId: string;
  entityName: string;
  entityType: EntityType;
  entitySize: EntitySize;
  costCentre: string;
  email: string;
  auditTeamType: AuditTeamType;
  officialTravelDays: number;
  // Extended fields for comprehensive management
  riskLevel: RiskLevel;
  status: EntityStatus;
  lastAuditDate: string | null;
  nextAuditDate: string | null;
  parentEntityId: string | null;
  controllerEntityId: string | null;
  createdAt: string;
  updatedAt: string;
  version: number;
  createdBy: string;
  updatedBy: string;
  // Audit metrics
  totalAudits: number;
  openFindings: number;
  closedFindings: number;
  pendingActions: number;
}

export interface AuditHistoryItem {
  id: string;
  entityId: string;
  auditType: string;
  auditYear: number;
  startDate: string;
  endDate: string;
  leadAuditor: string;
  teamMembers: string[];
  findings: number;
  criticalFindings: number;
  highFindings: number;
  mediumFindings: number;
  lowFindings: number;
  recommendations: number;
  implementedRecommendations: number;
  rating: 'Satisfactory' | 'Needs Improvement' | 'Unsatisfactory' | 'Critical';
  status: 'Completed' | 'In Progress' | 'Draft';
  reportUrl: string;
}

export interface EntityDocument {
  id: string;
  entityId: string;
  name: string;
  type: 'Policy' | 'Procedure' | 'Report' | 'Certificate' | 'Assessment' | 'Other';
  category: string;
  uploadDate: string;
  uploadedBy: string;
  fileSize: string;
  version: number;
  status: 'Current' | 'Archived' | 'Draft';
}

export interface EntityHierarchy {
  entityId: string;
  parentId: string | null;
  controllerId: string | null;
  level: number;
  path: string[];
}

// Cost Centre codes used at BOC
export const costCentres = ['660', '55', '100', '200', '300', '400', '500', '601', '602', '603', '650', '700', '800', '900'];

// Entity type definitions with conditional logic
export const entityTypeConfig: Record<EntityType, { sizes: EntitySize[], defaultSize: EntitySize }> = {
  'Bank': { sizes: ['BANK'], defaultSize: 'BANK' },
  'HOD': { sizes: ['BANK'], defaultSize: 'BANK' },
  'PO': { sizes: ['BANK'], defaultSize: 'BANK' },
  'Branch': { sizes: ['SG', 'A', 'B', 'C'], defaultSize: 'B' },
  'System': { sizes: ['BANK'], defaultSize: 'BANK' },
  'ISL': { sizes: ['SG', 'A', 'B', 'C'], defaultSize: 'C' },
};

// Team allocation by region
export const auditTeamRegions: Record<AuditTeamType, string> = {
  'HO': 'Head Office',
  'UVA': 'Uva Province',
  'NORTH': 'Northern Province',
  'SOUTH': 'Southern Province',
  'EAST': 'Eastern Province',
  'WEST': 'Western Province',
  'CENTRAL': 'Central Province',
};

// Generate sequential Entity ID
let entityCounter = 1;
export const generateEntityId = (): string => {
  const id = `EN${String(entityCounter).padStart(6, '0')}`;
  entityCounter++;
  return id;
};

export const resetEntityCounter = (startFrom: number = 1) => {
  entityCounter = startFrom;
};

// Generate mock audit entities
const generateMockEntities = (): AuditEntity[] => {
  const entities: AuditEntity[] = [];
  resetEntityCounter(1);

  // Bank entity (root)
  entities.push({
    entityId: generateEntityId(),
    entityName: 'Bank of Ceylon - Head Office',
    entityType: 'Bank',
    entitySize: 'BANK',
    costCentre: '660',
    email: 'headoffice@boc.lk',
    auditTeamType: 'HO',
    officialTravelDays: 0,
    riskLevel: 'CRITICAL',
    status: 'Active',
    lastAuditDate: '2024-12-15',
    nextAuditDate: '2025-06-15',
    parentEntityId: null,
    controllerEntityId: null,
    createdAt: '2020-01-01',
    updatedAt: '2025-01-10',
    version: 12,
    createdBy: 'System',
    updatedBy: 'AU001',
    totalAudits: 48,
    openFindings: 5,
    closedFindings: 180,
    pendingActions: 8,
  });

  // HOD entities
  const hodNames = [
    'Internal Audit Division', 'IT Division', 'Finance Division', 'Risk Management Division',
    'Compliance Division', 'Operations Division', 'Credit Division', 'Treasury Division',
    'Human Resources Division', 'Legal Division'
  ];

  hodNames.forEach((name, index) => {
    entities.push({
      entityId: generateEntityId(),
      entityName: name,
      entityType: 'HOD',
      entitySize: 'BANK',
      costCentre: costCentres[index % costCentres.length],
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@boc.lk`,
      auditTeamType: 'HO',
      officialTravelDays: 0,
      riskLevel: ['CRITICAL', 'HIGH', 'MEDIUM'][index % 3] as RiskLevel,
      status: 'Active',
      lastAuditDate: `2024-${String((index % 12) + 1).padStart(2, '0')}-15`,
      nextAuditDate: `2025-${String(((index + 6) % 12) + 1).padStart(2, '0')}-15`,
      parentEntityId: 'EN000001',
      controllerEntityId: null,
      createdAt: '2020-01-15',
      updatedAt: '2025-01-05',
      version: 5 + index,
      createdBy: 'System',
      updatedBy: 'AU001',
      totalAudits: 20 + index * 2,
      openFindings: index % 5,
      closedFindings: 50 + index * 3,
      pendingActions: index % 4,
    });
  });

  // Branch entities
  const branchData = [
    { name: 'Colombo Main Branch', region: 'WEST', size: 'SG' as EntitySize, cost: '100', risk: 'CRITICAL' as RiskLevel },
    { name: 'Kandy City Branch', region: 'CENTRAL', size: 'SG' as EntitySize, cost: '200', risk: 'HIGH' as RiskLevel },
    { name: 'Galle Fort Branch', region: 'SOUTH', size: 'A' as EntitySize, cost: '300', risk: 'HIGH' as RiskLevel },
    { name: 'Jaffna Main Branch', region: 'NORTH', size: 'A' as EntitySize, cost: '400', risk: 'MEDIUM' as RiskLevel },
    { name: 'Batticaloa Branch', region: 'EAST', size: 'B' as EntitySize, cost: '500', risk: 'MEDIUM' as RiskLevel },
    { name: 'Badulla Branch', region: 'UVA', size: 'B' as EntitySize, cost: '601', risk: 'LOW' as RiskLevel },
    { name: 'Negombo Branch', region: 'WEST', size: 'A' as EntitySize, cost: '100', risk: 'HIGH' as RiskLevel },
    { name: 'Matara Branch', region: 'SOUTH', size: 'B' as EntitySize, cost: '300', risk: 'MEDIUM' as RiskLevel },
    { name: 'Trincomalee Branch', region: 'EAST', size: 'B' as EntitySize, cost: '500', risk: 'MEDIUM' as RiskLevel },
    { name: 'Anuradhapura Branch', region: 'NORTH', size: 'A' as EntitySize, cost: '400', risk: 'HIGH' as RiskLevel },
    { name: 'Ratnapura Branch', region: 'CENTRAL', size: 'B' as EntitySize, cost: '200', risk: 'MEDIUM' as RiskLevel },
    { name: 'Kurunegala Branch', region: 'WEST', size: 'A' as EntitySize, cost: '100', risk: 'HIGH' as RiskLevel },
    { name: 'Hambantota Branch', region: 'SOUTH', size: 'C' as EntitySize, cost: '300', risk: 'LOW' as RiskLevel },
    { name: 'Polonnaruwa Branch', region: 'EAST', size: 'C' as EntitySize, cost: '500', risk: 'LOW' as RiskLevel },
    { name: 'Nuwara Eliya Branch', region: 'CENTRAL', size: 'C' as EntitySize, cost: '200', risk: 'LOW' as RiskLevel },
    { name: 'Ampara Branch', region: 'EAST', size: 'C' as EntitySize, cost: '500', risk: 'MEDIUM' as RiskLevel },
    { name: 'Monaragala Branch', region: 'UVA', size: 'C' as EntitySize, cost: '601', risk: 'LOW' as RiskLevel },
    { name: 'Kegalle Branch', region: 'CENTRAL', size: 'B' as EntitySize, cost: '200', risk: 'MEDIUM' as RiskLevel },
    { name: 'Puttalam Branch', region: 'WEST', size: 'B' as EntitySize, cost: '100', risk: 'MEDIUM' as RiskLevel },
    { name: 'Vavuniya Branch', region: 'NORTH', size: 'C' as EntitySize, cost: '400', risk: 'LOW' as RiskLevel },
    { name: 'Kalutara Branch', region: 'WEST', size: 'A' as EntitySize, cost: '100', risk: 'HIGH' as RiskLevel },
    { name: 'Gampaha Branch', region: 'WEST', size: 'A' as EntitySize, cost: '100', risk: 'HIGH' as RiskLevel },
    { name: 'Mannar Branch', region: 'NORTH', size: 'C' as EntitySize, cost: '400', risk: 'LOW' as RiskLevel },
    { name: 'Mullaitivu Branch', region: 'NORTH', size: 'C' as EntitySize, cost: '400', risk: 'LOW' as RiskLevel },
    { name: 'Kilinochchi Branch', region: 'NORTH', size: 'C' as EntitySize, cost: '400', risk: 'LOW' as RiskLevel },
  ];

  branchData.forEach((branch, index) => {
    entities.push({
      entityId: generateEntityId(),
      entityName: branch.name,
      entityType: 'Branch',
      entitySize: branch.size,
      costCentre: branch.cost,
      email: `${branch.name.toLowerCase().replace(/\s+/g, '.')}@boc.lk`,
      auditTeamType: branch.region as AuditTeamType,
      officialTravelDays: branch.region === 'HO' ? 0 : Math.floor(Math.random() * 3) + 1,
      riskLevel: branch.risk,
      status: index < 23 ? 'Active' : 'Under Review',
      lastAuditDate: `2024-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}`,
      nextAuditDate: `2025-${String(((index + 3) % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}`,
      parentEntityId: 'EN000001',
      controllerEntityId: `EN${String((index % 10) + 2).padStart(6, '0')}`,
      createdAt: '2020-02-01',
      updatedAt: '2025-01-08',
      version: 3 + (index % 5),
      createdBy: 'System',
      updatedBy: 'AU001',
      totalAudits: 10 + index,
      openFindings: index % 6,
      closedFindings: 30 + index * 2,
      pendingActions: index % 3,
    });
  });

  // System entities
  const systemNames = [
    'Core Banking System', 'ATM Network', 'Internet Banking', 'Mobile Banking App',
    'SWIFT Gateway', 'Card Management System', 'Loan Origination System', 'Treasury Management',
    'HR Management System', 'Document Management System', 'Anti-Money Laundering System',
    'Customer Relationship Management', 'Business Intelligence Platform', 'Disaster Recovery System'
  ];

  systemNames.forEach((name, index) => {
    entities.push({
      entityId: generateEntityId(),
      entityName: name,
      entityType: 'System',
      entitySize: 'BANK',
      costCentre: '55',
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@boc.lk`,
      auditTeamType: 'HO',
      officialTravelDays: 0,
      riskLevel: index < 5 ? 'CRITICAL' : index < 9 ? 'HIGH' : 'MEDIUM',
      status: 'Active',
      lastAuditDate: `2024-${String((index % 12) + 1).padStart(2, '0')}-10`,
      nextAuditDate: `2025-${String(((index + 4) % 12) + 1).padStart(2, '0')}-10`,
      parentEntityId: 'EN000003', // IT Division
      controllerEntityId: null,
      createdAt: '2020-03-01',
      updatedAt: '2025-01-09',
      version: 8 + index,
      createdBy: 'System',
      updatedBy: 'AU001',
      totalAudits: 15 + index,
      openFindings: index % 4,
      closedFindings: 40 + index * 3,
      pendingActions: index % 5,
    });
  });

  // ISL (Island-wide Service Locations) entities
  const islData = [
    { name: 'Colombo Fort ISL', region: 'WEST', size: 'A' as EntitySize },
    { name: 'Bambalapitiya ISL', region: 'WEST', size: 'B' as EntitySize },
    { name: 'Dehiwala ISL', region: 'WEST', size: 'B' as EntitySize },
    { name: 'Nugegoda ISL', region: 'WEST', size: 'C' as EntitySize },
    { name: 'Maharagama ISL', region: 'WEST', size: 'C' as EntitySize },
    { name: 'Moratuwa ISL', region: 'WEST', size: 'B' as EntitySize },
    { name: 'Panadura ISL', region: 'WEST', size: 'C' as EntitySize },
    { name: 'Horana ISL', region: 'WEST', size: 'C' as EntitySize },
  ];

  islData.forEach((isl, index) => {
    entities.push({
      entityId: generateEntityId(),
      entityName: isl.name,
      entityType: 'ISL',
      entitySize: isl.size,
      costCentre: '650',
      email: `${isl.name.toLowerCase().replace(/\s+/g, '.')}@boc.lk`,
      auditTeamType: isl.region as AuditTeamType,
      officialTravelDays: 1,
      riskLevel: 'LOW',
      status: 'Active',
      lastAuditDate: `2024-${String((index % 12) + 1).padStart(2, '0')}-20`,
      nextAuditDate: `2025-${String(((index + 6) % 12) + 1).padStart(2, '0')}-20`,
      parentEntityId: `EN${String(12 + (index % 8)).padStart(6, '0')}`, // Parent branch
      controllerEntityId: null,
      createdAt: '2021-01-01',
      updatedAt: '2025-01-07',
      version: 2,
      createdBy: 'System',
      updatedBy: 'AU001',
      totalAudits: 5 + index,
      openFindings: 0,
      closedFindings: 15 + index,
      pendingActions: 0,
    });
  });

  // PO (Provincial Offices) entities
  const poData = [
    { name: 'Western Province Office', team: 'WEST' as AuditTeamType },
    { name: 'Central Province Office', team: 'CENTRAL' as AuditTeamType },
    { name: 'Southern Province Office', team: 'SOUTH' as AuditTeamType },
    { name: 'Northern Province Office', team: 'NORTH' as AuditTeamType },
    { name: 'Eastern Province Office', team: 'EAST' as AuditTeamType },
    { name: 'Uva Province Office', team: 'UVA' as AuditTeamType },
  ];

  poData.forEach((po, index) => {
    entities.push({
      entityId: generateEntityId(),
      entityName: po.name,
      entityType: 'PO',
      entitySize: 'BANK',
      costCentre: '700',
      email: `${po.name.toLowerCase().replace(/\s+/g, '.')}@boc.lk`,
      auditTeamType: po.team,
      officialTravelDays: 2,
      riskLevel: 'MEDIUM',
      status: 'Active',
      lastAuditDate: `2024-${String((index % 12) + 1).padStart(2, '0')}-05`,
      nextAuditDate: `2025-${String(((index + 6) % 12) + 1).padStart(2, '0')}-05`,
      parentEntityId: 'EN000001',
      controllerEntityId: null,
      createdAt: '2020-01-20',
      updatedAt: '2025-01-06',
      version: 4,
      createdBy: 'System',
      updatedBy: 'AU001',
      totalAudits: 12,
      openFindings: 1,
      closedFindings: 35,
      pendingActions: 2,
    });
  });

  return entities;
};

export const auditEntitiesData = generateMockEntities();

// Calculate comprehensive statistics
export const getEntityStats = () => {
  const entities = auditEntitiesData;
  const now = new Date();

  return {
    total: entities.length,
    byType: {
      Bank: entities.filter(e => e.entityType === 'Bank').length,
      HOD: entities.filter(e => e.entityType === 'HOD').length,
      PO: entities.filter(e => e.entityType === 'PO').length,
      Branch: entities.filter(e => e.entityType === 'Branch').length,
      System: entities.filter(e => e.entityType === 'System').length,
      ISL: entities.filter(e => e.entityType === 'ISL').length,
    },
    byRisk: {
      CRITICAL: entities.filter(e => e.riskLevel === 'CRITICAL').length,
      HIGH: entities.filter(e => e.riskLevel === 'HIGH').length,
      MEDIUM: entities.filter(e => e.riskLevel === 'MEDIUM').length,
      LOW: entities.filter(e => e.riskLevel === 'LOW').length,
    },
    byTeam: {
      HO: entities.filter(e => e.auditTeamType === 'HO').length,
      UVA: entities.filter(e => e.auditTeamType === 'UVA').length,
      NORTH: entities.filter(e => e.auditTeamType === 'NORTH').length,
      SOUTH: entities.filter(e => e.auditTeamType === 'SOUTH').length,
      EAST: entities.filter(e => e.auditTeamType === 'EAST').length,
      WEST: entities.filter(e => e.auditTeamType === 'WEST').length,
      CENTRAL: entities.filter(e => e.auditTeamType === 'CENTRAL').length,
    },
    byCostCentre: costCentres.reduce((acc, cc) => {
      acc[cc] = entities.filter(e => e.costCentre === cc).length;
      return acc;
    }, {} as Record<string, number>),
    bySize: {
      BANK: entities.filter(e => e.entitySize === 'BANK').length,
      SG: entities.filter(e => e.entitySize === 'SG').length,
      A: entities.filter(e => e.entitySize === 'A').length,
      B: entities.filter(e => e.entitySize === 'B').length,
      C: entities.filter(e => e.entitySize === 'C').length,
    },
    byStatus: {
      Active: entities.filter(e => e.status === 'Active').length,
      Inactive: entities.filter(e => e.status === 'Inactive').length,
      'Under Review': entities.filter(e => e.status === 'Under Review').length,
      Deactivated: entities.filter(e => e.status === 'Deactivated').length,
    },
    totalFindings: entities.reduce((sum, e) => sum + e.openFindings + e.closedFindings, 0),
    openFindings: entities.reduce((sum, e) => sum + e.openFindings, 0),
    pendingActions: entities.reduce((sum, e) => sum + e.pendingActions, 0),
    overdueAudits: entities.filter(e => e.nextAuditDate && new Date(e.nextAuditDate) < now).length,
    upcomingAudits: entities.filter(e => {
      if (!e.nextAuditDate) return false;
      const nextDate = new Date(e.nextAuditDate);
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      return nextDate >= now && nextDate <= thirtyDaysFromNow;
    }).length,
  };
};

// Generate audit history for an entity
export const generateAuditHistory = (entityId: string): AuditHistoryItem[] => {
  const years = [2024, 2023, 2022, 2021];
  const auditTypes = ['Full Audit', 'Follow-up Audit', 'Special Investigation', 'Compliance Review', 'IT Audit'];
  const auditors = ['K. Perera', 'S. Fernando', 'R. Silva', 'M. Jayawardena', 'A. Wickramasinghe'];
  
  return years.slice(0, 3 + Math.floor(Math.random() * 2)).map((year, index) => {
    const findings = Math.floor(Math.random() * 15) + 1;
    const critical = Math.floor(Math.random() * Math.min(3, findings));
    const high = Math.floor(Math.random() * Math.min(5, findings - critical));
    const medium = Math.floor(Math.random() * (findings - critical - high));
    const low = findings - critical - high - medium;
    const recommendations = findings + Math.floor(Math.random() * 5);
    
    return {
      id: `AH-${entityId}-${year}`,
      entityId,
      auditType: auditTypes[index % auditTypes.length],
      auditYear: year,
      startDate: `${year}-${String((index * 3 + 1) % 12 + 1).padStart(2, '0')}-01`,
      endDate: `${year}-${String((index * 3 + 1) % 12 + 1).padStart(2, '0')}-${15 + Math.floor(Math.random() * 10)}`,
      leadAuditor: auditors[index % auditors.length],
      teamMembers: auditors.slice(0, 2 + Math.floor(Math.random() * 3)),
      findings,
      criticalFindings: critical,
      highFindings: high,
      mediumFindings: medium,
      lowFindings: low,
      recommendations,
      implementedRecommendations: Math.floor(recommendations * (0.6 + Math.random() * 0.3)),
      rating: ['Satisfactory', 'Needs Improvement', 'Unsatisfactory', 'Critical'][Math.floor(Math.random() * 4)] as AuditHistoryItem['rating'],
      status: index === 0 ? 'Completed' : 'Completed',
      reportUrl: `/reports/${entityId}/${year}`,
    };
  });
};

// Generate documents for an entity
export const generateEntityDocuments = (entityId: string): EntityDocument[] => {
  const docTypes: EntityDocument['type'][] = ['Policy', 'Procedure', 'Report', 'Certificate', 'Assessment'];
  const categories = ['Compliance', 'Operations', 'Risk', 'Audit', 'Security'];
  const uploaders = ['K. Perera', 'S. Fernando', 'R. Silva'];
  
  return Array.from({ length: 3 + Math.floor(Math.random() * 5) }, (_, index) => ({
    id: `DOC-${entityId}-${String(index + 1).padStart(3, '0')}`,
    entityId,
    name: `${docTypes[index % docTypes.length]} Document ${index + 1}`,
    type: docTypes[index % docTypes.length],
    category: categories[index % categories.length],
    uploadDate: `2024-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}`,
    uploadedBy: uploaders[index % uploaders.length],
    fileSize: `${Math.floor(Math.random() * 5000) + 100} KB`,
    version: Math.floor(Math.random() * 5) + 1,
    status: index === 0 ? 'Current' : index < 3 ? 'Current' : 'Archived',
  }));
};

// Recent activity for dashboard
export const recentEntityActivity = [
  { id: 1, action: 'Entity Created', entityName: 'New Colombo Extension', entityId: 'EN000070', user: 'K. Perera', timestamp: '2025-01-10 14:32', type: 'create' },
  { id: 2, action: 'Risk Level Updated', entityName: 'Kandy City Branch', entityId: 'EN000013', user: 'S. Fernando', timestamp: '2025-01-10 12:15', type: 'update' },
  { id: 3, action: 'Audit Completed', entityName: 'Core Banking System', entityId: 'EN000037', user: 'R. Silva', timestamp: '2025-01-10 10:45', type: 'audit' },
  { id: 4, action: 'Status Changed', entityName: 'Legacy Payment System', entityId: 'EN000045', user: 'M. Jayawardena', timestamp: '2025-01-09 16:20', type: 'status' },
  { id: 5, action: 'Document Uploaded', entityName: 'IT Division', entityId: 'EN000003', user: 'A. Wickramasinghe', timestamp: '2025-01-09 14:55', type: 'document' },
  { id: 6, action: 'Entity Deactivated', entityName: 'Old ATM Network', entityId: 'EN000048', user: 'K. Perera', timestamp: '2025-01-09 11:30', type: 'deactivate' },
  { id: 7, action: 'Audit Scheduled', entityName: 'Galle Fort Branch', entityId: 'EN000014', user: 'S. Fernando', timestamp: '2025-01-08 15:40', type: 'schedule' },
  { id: 8, action: 'Findings Resolved', entityName: 'Treasury Division', entityId: 'EN000008', user: 'R. Silva', timestamp: '2025-01-08 09:20', type: 'resolve' },
];

// Audit coverage timeline data
export const auditCoverageTimeline = [
  { month: 'Jan', completed: 8, scheduled: 12, overdue: 2 },
  { month: 'Feb', completed: 10, scheduled: 10, overdue: 1 },
  { month: 'Mar', completed: 12, scheduled: 15, overdue: 3 },
  { month: 'Apr', completed: 9, scheduled: 11, overdue: 2 },
  { month: 'May', completed: 11, scheduled: 14, overdue: 1 },
  { month: 'Jun', completed: 7, scheduled: 10, overdue: 4 },
  { month: 'Jul', completed: 0, scheduled: 13, overdue: 0 },
  { month: 'Aug', completed: 0, scheduled: 11, overdue: 0 },
  { month: 'Sep', completed: 0, scheduled: 16, overdue: 0 },
  { month: 'Oct', completed: 0, scheduled: 12, overdue: 0 },
  { month: 'Nov', completed: 0, scheduled: 9, overdue: 0 },
  { month: 'Dec', completed: 0, scheduled: 8, overdue: 0 },
];

// Check entity name uniqueness
export const isEntityNameUnique = (name: string, excludeId?: string): boolean => {
  return !auditEntitiesData.some(e => 
    e.entityName.toLowerCase() === name.toLowerCase() && e.entityId !== excludeId
  );
};

// Get next entity ID
export const getNextEntityId = (): string => {
  const maxId = Math.max(...auditEntitiesData.map(e => parseInt(e.entityId.replace('EN', ''))));
  return `EN${String(maxId + 1).padStart(6, '0')}`;
};
