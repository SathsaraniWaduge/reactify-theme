// Audit Entities Mock Data for BOC Bank Master Data Module
import { auditEntities as riskEntities, getEntityRiskProfile } from './riskManagementMockData';

export type ComplianceStatus = 'Compliant' | 'Non-Compliant' | 'Pending Review' | 'Remediation Required';
export type EntityStatus = 'Active' | 'Inactive' | 'Under Review' | 'Suspended';

export interface AuditEntityDocument {
  id: string;
  name: string;
  type: 'Policy' | 'Report' | 'Certificate' | 'Agreement' | 'Assessment';
  uploadDate: string;
  uploadedBy: string;
  size: string;
  category: string;
}

export interface ScheduledAudit {
  id: string;
  auditType: string;
  scheduledDate: string;
  leadAuditor: string;
  status: 'Scheduled' | 'Confirmed' | 'Pending Approval';
  priority: 'High' | 'Medium' | 'Low';
}

export interface AuditHistoryItem {
  id: string;
  auditType: string;
  startDate: string;
  endDate: string;
  leadAuditor: string;
  teamSize: number;
  findings: number;
  criticalFindings: number;
  recommendations: number;
  implementedRecommendations: number;
  rating: 'Satisfactory' | 'Needs Improvement' | 'Unsatisfactory' | 'Critical';
  reportLink: string;
}

export interface AuditEntity {
  id: string;
  code: string;
  name: string;
  entityType: 'Branch' | 'IT System' | 'High Value Customer';
  category: string;
  region: string;
  riskLevel: 'Extreme' | 'High' | 'Medium' | 'Low';
  riskScore: number;
  complianceStatus: ComplianceStatus;
  status: EntityStatus;
  lastAuditDate: string;
  nextAuditDate: string;
  assignedAuditor: string;
  ownerName: string;
  ownerEmail: string;
  ownerDepartment: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  auditFrequency: 'Monthly' | 'Quarterly' | 'Semi-Annual' | 'Annual';
  riskFactors: Record<string, number>;
  trend: 'increasing' | 'stable' | 'decreasing';
  documents: AuditEntityDocument[];
  scheduledAudits: ScheduledAudit[];
  auditHistory: AuditHistoryItem[];
  keyContacts: { name: string; role: string; email: string; phone: string }[];
  // Additional fields based on entity type
  additionalInfo: Record<string, string>;
}

// Owner pool for entities
const owners = [
  { name: 'Mahendra Rajapaksa', email: 'mahendra.r@boc.lk', department: 'Branch Operations' },
  { name: 'Kumudu Perera', email: 'kumudu.p@boc.lk', department: 'IT Division' },
  { name: 'Sanjaya Fernando', email: 'sanjaya.f@boc.lk', department: 'Corporate Banking' },
  { name: 'Dilini Jayawardena', email: 'dilini.j@boc.lk', department: 'Risk Management' },
  { name: 'Ruwan Silva', email: 'ruwan.s@boc.lk', department: 'Compliance' },
  { name: 'Amali Wickramasinghe', email: 'amali.w@boc.lk', department: 'Treasury' },
  { name: 'Pradeep Kumarasiri', email: 'pradeep.k@boc.lk', department: 'Retail Banking' },
  { name: 'Nishantha Bandara', email: 'nishantha.b@boc.lk', department: 'Internal Audit' },
];

const documentTypes: AuditEntityDocument['type'][] = ['Policy', 'Report', 'Certificate', 'Agreement', 'Assessment'];
const auditTypes = ['Compliance', 'Financial', 'Operational', 'IT Security', 'Credit Risk', 'AML/KYC'];
const ratings: AuditHistoryItem['rating'][] = ['Satisfactory', 'Needs Improvement', 'Unsatisfactory', 'Critical'];

function getRandomPastDate(maxDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * maxDays));
  return date.toISOString().split('T')[0];
}

function getRandomFutureDate(maxDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * maxDays));
  return date.toISOString().split('T')[0];
}

// Generate comprehensive documents for each entity
function generateDocuments(entityId: string): AuditEntityDocument[] {
  const count = Math.floor(Math.random() * 5) + 2;
  const documents: AuditEntityDocument[] = [];
  
  for (let i = 0; i < count; i++) {
    documents.push({
      id: `DOC-${entityId}-${String(i + 1).padStart(3, '0')}`,
      name: `${documentTypes[i % documentTypes.length]} Document ${i + 1}`,
      type: documentTypes[i % documentTypes.length],
      uploadDate: getRandomPastDate(365),
      uploadedBy: owners[i % owners.length].name,
      size: `${Math.floor(Math.random() * 5000) + 100} KB`,
      category: auditTypes[i % auditTypes.length],
    });
  }
  
  return documents;
}

// Generate scheduled audits for entity
function generateScheduledAudits(entityId: string, riskLevel: string): ScheduledAudit[] {
  const count = riskLevel === 'Extreme' || riskLevel === 'High' ? 3 : Math.floor(Math.random() * 2) + 1;
  const audits: ScheduledAudit[] = [];
  
  for (let i = 0; i < count; i++) {
    audits.push({
      id: `SCH-${entityId}-${String(i + 1).padStart(3, '0')}`,
      auditType: auditTypes[Math.floor(Math.random() * auditTypes.length)],
      scheduledDate: getRandomFutureDate(180),
      leadAuditor: `Auditor ${Math.floor(Math.random() * 10) + 1}`,
      status: ['Scheduled', 'Confirmed', 'Pending Approval'][Math.floor(Math.random() * 3)] as ScheduledAudit['status'],
      priority: riskLevel === 'Extreme' ? 'High' : riskLevel === 'High' ? 'High' : riskLevel === 'Medium' ? 'Medium' : 'Low',
    });
  }
  
  return audits;
}

// Generate audit history for entity
function generateAuditHistory(entityId: string): AuditHistoryItem[] {
  const count = Math.floor(Math.random() * 5) + 2;
  const history: AuditHistoryItem[] = [];
  
  for (let i = 0; i < count; i++) {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - (i + 1) * 3);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 14) + 5);
    
    const findings = Math.floor(Math.random() * 12) + 1;
    const recommendations = findings + Math.floor(Math.random() * 5);
    
    history.push({
      id: `AH-${entityId}-${String(i + 1).padStart(3, '0')}`,
      auditType: auditTypes[Math.floor(Math.random() * auditTypes.length)],
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      leadAuditor: `Auditor ${Math.floor(Math.random() * 10) + 1}`,
      teamSize: Math.floor(Math.random() * 4) + 2,
      findings,
      criticalFindings: Math.floor(Math.random() * Math.min(findings, 3)),
      recommendations,
      implementedRecommendations: Math.floor(Math.random() * recommendations),
      rating: ratings[Math.floor(Math.random() * ratings.length)],
      reportLink: `#/reports/${entityId}/${i + 1}`,
    });
  }
  
  return history;
}

// Generate key contacts
function generateKeyContacts(entityType: string): { name: string; role: string; email: string; phone: string }[] {
  const roles = entityType === 'Branch' 
    ? ['Branch Manager', 'Operations Head', 'Compliance Officer', 'Risk Coordinator']
    : entityType === 'IT System'
    ? ['System Owner', 'Technical Lead', 'Security Officer', 'Change Manager']
    : ['Relationship Manager', 'Credit Analyst', 'Portfolio Manager', 'Recovery Officer'];
  
  return roles.slice(0, 3).map((role, index) => ({
    name: owners[(index + Math.floor(Math.random() * 5)) % owners.length].name,
    role,
    email: `${role.toLowerCase().replace(' ', '.')}${Math.floor(Math.random() * 100)}@boc.lk`,
    phone: `+94 11 ${Math.floor(Math.random() * 9000000) + 1000000}`,
  }));
}

// Generate entity code from name
function generateCode(name: string, entityType: string): string {
  const prefix = entityType === 'Branch' ? 'BR' : entityType === 'IT System' ? 'IT' : 'CUS';
  const words = name.split(' ').slice(0, 3).map(w => w[0]?.toUpperCase() || '').join('');
  return `${prefix}-${words}`;
}

// Transform risk entities to audit entities with full details
export const transformToAuditEntities = (): AuditEntity[] => {
  return riskEntities.slice(0, 50).map((entity, index) => {
    const owner = owners[index % owners.length];
    const complianceStatuses: ComplianceStatus[] = ['Compliant', 'Non-Compliant', 'Pending Review', 'Remediation Required'];
    const entityStatuses: EntityStatus[] = ['Active', 'Inactive', 'Under Review', 'Suspended'];
    const frequencies: AuditEntity['auditFrequency'][] = ['Monthly', 'Quarterly', 'Semi-Annual', 'Annual'];
    
    const frequency = entity.riskLevel === 'Extreme' 
      ? 'Monthly' 
      : entity.riskLevel === 'High' 
      ? 'Quarterly' 
      : entity.riskLevel === 'Medium' 
      ? 'Semi-Annual' 
      : 'Annual';
    
    const additionalInfo: Record<string, string> = {};
    if (entity.entityType === 'Branch') {
      additionalInfo['Loan Portfolio'] = entity.loanPortfolio;
      additionalInfo['Deposit Base'] = entity.depositBase;
      additionalInfo['NPL Ratio'] = entity.nplRatio;
      additionalInfo['Staff Count'] = String(entity.staffCount);
    } else if (entity.entityType === 'IT System') {
      additionalInfo['Uptime'] = entity.uptime;
      additionalInfo['Last Patch Date'] = entity.lastPatchDate;
      additionalInfo['Critical Vulnerabilities'] = String(entity.criticalVulnerabilities);
      additionalInfo['Vendor'] = entity.vendorName;
    } else {
      additionalInfo['Total Exposure'] = entity.totalExposure;
      additionalInfo['Facility Type'] = entity.facilityType;
      additionalInfo['Collateral Value'] = entity.collateralValue;
      additionalInfo['Industry'] = entity.industry;
    }
    
    return {
      id: entity.id,
      code: generateCode(entity.name, entity.entityType),
      name: entity.name,
      entityType: entity.entityType,
      category: entity.category,
      region: entity.region,
      riskLevel: entity.riskLevel,
      riskScore: entity.overallRiskScore,
      complianceStatus: complianceStatuses[Math.floor(Math.random() * complianceStatuses.length)],
      status: entity.status === 'Active' ? 'Active' : entity.status === 'Under Review' ? 'Under Review' : 'Active',
      lastAuditDate: entity.lastAssessment,
      nextAuditDate: entity.nextReassessment,
      assignedAuditor: entity.assignedAuditor,
      ownerName: owner.name,
      ownerEmail: owner.email,
      ownerDepartment: owner.department,
      description: `${entity.entityType} entity for ${entity.name} in ${entity.region}. Currently ${entity.status.toLowerCase()} with ${entity.riskLevel.toLowerCase()} risk level.`,
      createdAt: getRandomPastDate(730),
      updatedAt: getRandomPastDate(30),
      version: Math.floor(Math.random() * 5) + 1,
      auditFrequency: frequency,
      riskFactors: entity.riskFactors,
      trend: entity.trend,
      documents: generateDocuments(entity.id),
      scheduledAudits: generateScheduledAudits(entity.id, entity.riskLevel),
      auditHistory: generateAuditHistory(entity.id),
      keyContacts: generateKeyContacts(entity.entityType),
      additionalInfo,
    };
  });
};

export const auditEntitiesData = transformToAuditEntities();

// Calculate statistics
export const getEntityStats = () => {
  const entities = auditEntitiesData;
  
  return {
    total: entities.length,
    byRisk: {
      extreme: entities.filter(e => e.riskLevel === 'Extreme').length,
      high: entities.filter(e => e.riskLevel === 'High').length,
      medium: entities.filter(e => e.riskLevel === 'Medium').length,
      low: entities.filter(e => e.riskLevel === 'Low').length,
    },
    byType: {
      branch: entities.filter(e => e.entityType === 'Branch').length,
      itSystem: entities.filter(e => e.entityType === 'IT System').length,
      customer: entities.filter(e => e.entityType === 'High Value Customer').length,
    },
    byCompliance: {
      compliant: entities.filter(e => e.complianceStatus === 'Compliant').length,
      nonCompliant: entities.filter(e => e.complianceStatus === 'Non-Compliant').length,
      pending: entities.filter(e => e.complianceStatus === 'Pending Review').length,
      remediation: entities.filter(e => e.complianceStatus === 'Remediation Required').length,
    },
    byStatus: {
      active: entities.filter(e => e.status === 'Active').length,
      inactive: entities.filter(e => e.status === 'Inactive').length,
      underReview: entities.filter(e => e.status === 'Under Review').length,
      suspended: entities.filter(e => e.status === 'Suspended').length,
    },
    avgRiskScore: Math.round(entities.reduce((sum, e) => sum + e.riskScore, 0) / entities.length * 10) / 10,
    upcomingAudits: entities.reduce((sum, e) => sum + e.scheduledAudits.length, 0),
    overdueEntities: entities.filter(e => new Date(e.nextAuditDate) < new Date()).length,
  };
};

// Recent activity mock data
export const recentEntityActivity = [
  { id: 1, action: 'Entity Created', entity: 'Colombo Main Branch', user: 'Mahendra Rajapaksa', timestamp: '2025-01-08 14:32', type: 'create' },
  { id: 2, action: 'Risk Level Updated', entity: 'Core Banking System', user: 'Kumudu Perera', timestamp: '2025-01-08 12:15', type: 'update' },
  { id: 3, action: 'Document Uploaded', entity: 'Ceylon Petroleum Corporation', user: 'Sanjaya Fernando', timestamp: '2025-01-08 10:45', type: 'document' },
  { id: 4, action: 'Audit Scheduled', entity: 'Kandy Branch', user: 'Dilini Jayawardena', timestamp: '2025-01-07 16:20', type: 'audit' },
  { id: 5, action: 'Compliance Status Changed', entity: 'ATM Network', user: 'Ruwan Silva', timestamp: '2025-01-07 14:55', type: 'compliance' },
  { id: 6, action: 'Entity Deactivated', entity: 'Legacy Payment Gateway', user: 'Amali Wickramasinghe', timestamp: '2025-01-07 11:30', type: 'status' },
  { id: 7, action: 'Owner Reassigned', entity: 'John Keells Holdings', user: 'Pradeep Kumarasiri', timestamp: '2025-01-06 15:40', type: 'assign' },
  { id: 8, action: 'Risk Assessment Completed', entity: 'Mobile Banking App', user: 'Nishantha Bandara', timestamp: '2025-01-06 09:20', type: 'assessment' },
];

export const entityCategories = ['Branch Network', 'Information Technology', 'Corporate Banking', 'Retail Banking', 'Treasury', 'Compliance'];
export const entityRegions = ['Western Province', 'Central Province', 'Southern Province', 'Northern Province', 'Eastern Province', 'North Western Province', 'Sabaragamuwa Province', 'Uva Province', 'North Central Province', 'Head Office'];
