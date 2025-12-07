// Annual Audit Plan Mock Data for BOC Bank
import { auditEntities, riskDistribution } from './riskManagementMockData';

export type AuditStatus = 'Planned' | 'In Progress' | 'Completed' | 'Delayed' | 'Cancelled';
export type RiskLevel = 'Extreme' | 'High' | 'Medium' | 'Low';
export type AuditCategory = 'Compliance' | 'Financial' | 'Operational' | 'IT Security' | 'Credit Risk' | 'AML/KYC' | 'Treasury';

export interface AuditPlanItem {
  id: string;
  entityId: string;
  entityName: string;
  entityType: 'Branch' | 'IT System' | 'High Value Customer';
  category: AuditCategory;
  riskLevel: RiskLevel;
  riskScore: number;
  scheduledMonth: number; // 1-12
  startDate: string;
  endDate: string;
  status: AuditStatus;
  leadAuditor: string;
  teamMembers: string[];
  estimatedDays: number;
  actualDays?: number;
  objectives: string[];
  findings?: number;
  progress: number;
  notes?: string;
}

// Auditor pool
export const auditors = [
  { id: 'AUD-001', name: 'Asanka Silva', specialization: 'Compliance', available: true },
  { id: 'AUD-002', name: 'Kavinda Perera', specialization: 'IT Security', available: true },
  { id: 'AUD-003', name: 'Nirmala Fernando', specialization: 'Financial', available: true },
  { id: 'AUD-004', name: 'Manjula Rathnayake', specialization: 'Credit Risk', available: true },
  { id: 'AUD-005', name: 'Thushara Wijewardena', specialization: 'AML/KYC', available: true },
  { id: 'AUD-006', name: 'Lalith Premachandra', specialization: 'Treasury', available: true },
  { id: 'AUD-007', name: 'Suresh Jayasuriya', specialization: 'Operational', available: true },
  { id: 'AUD-008', name: 'Ravindra Herath', specialization: 'IT Security', available: true },
  { id: 'AUD-009', name: 'Indika Jayawardena', specialization: 'Credit Risk', available: true },
  { id: 'AUD-010', name: 'Wasantha Kumara', specialization: 'Financial', available: true },
];

export const teamMemberPool = [
  'Kumari Perera', 'Nuwan Fernando', 'Dilshan Rajapakse', 'Sachini de Silva',
  'Roshan Wickrama', 'Tharanga Bandara', 'Chamila Jayasinghe', 'Dinesh Gunawardena',
  'Priyanka Wijesinghe', 'Amila Kumarasinghe', 'Hasitha Wijeratne', 'Ruwani Senanayake',
  'Charith Mendis', 'Sanduni Perera', 'Kasun Silva', 'Nadeesha Perera', 'Chathura Fernando',
];

// Algorithm to generate optimal audit schedule
export const generateAuditPlan = (year: number): AuditPlanItem[] => {
  const plan: AuditPlanItem[] = [];
  
  // Sort entities by risk score (descending) - prioritize high risk
  const sortedEntities = [...auditEntities].sort((a, b) => b.overallRiskScore - a.overallRiskScore);
  
  // Calculate monthly capacity (assuming ~20 audits per month max)
  const monthlyCapacity = Array(12).fill(0);
  const maxAuditsPerMonth = 18;
  
  // Risk level to category mapping
  const getCategoryByEntityType = (entityType: string): AuditCategory => {
    switch (entityType) {
      case 'Branch': return ['Compliance', 'Operational', 'AML/KYC', 'Financial'][Math.floor(Math.random() * 4)] as AuditCategory;
      case 'IT System': return 'IT Security';
      case 'High Value Customer': return 'Credit Risk';
      default: return 'Operational';
    }
  };
  
  // Assign estimated days based on risk level
  const getEstimatedDays = (riskLevel: string): number => {
    switch (riskLevel) {
      case 'Extreme': return Math.floor(Math.random() * 5) + 15; // 15-20 days
      case 'High': return Math.floor(Math.random() * 5) + 10; // 10-15 days
      case 'Medium': return Math.floor(Math.random() * 4) + 6; // 6-10 days
      default: return Math.floor(Math.random() * 3) + 3; // 3-6 days
    }
  };
  
  // Determine audit frequency based on risk
  const shouldAudit = (entity: any): boolean => {
    switch (entity.riskLevel) {
      case 'Extreme': return true; // Always audit
      case 'High': return Math.random() > 0.1; // 90% chance
      case 'Medium': return Math.random() > 0.4; // 60% chance
      default: return Math.random() > 0.7; // 30% chance
    }
  };
  
  // Schedule high risk audits in early months
  sortedEntities.forEach((entity, index) => {
    if (!shouldAudit(entity)) return;
    
    // Determine preferred month based on risk level
    let preferredMonth: number;
    if (entity.riskLevel === 'Extreme') {
      preferredMonth = Math.floor(Math.random() * 3) + 1; // Q1
    } else if (entity.riskLevel === 'High') {
      preferredMonth = Math.floor(Math.random() * 6) + 1; // H1
    } else if (entity.riskLevel === 'Medium') {
      preferredMonth = Math.floor(Math.random() * 9) + 3; // Q2-Q4
    } else {
      preferredMonth = Math.floor(Math.random() * 6) + 7; // H2
    }
    
    // Find available month
    let scheduledMonth = preferredMonth;
    while (monthlyCapacity[scheduledMonth - 1] >= maxAuditsPerMonth && scheduledMonth <= 12) {
      scheduledMonth++;
    }
    if (scheduledMonth > 12) {
      // Try earlier months
      scheduledMonth = 1;
      while (monthlyCapacity[scheduledMonth - 1] >= maxAuditsPerMonth && scheduledMonth < preferredMonth) {
        scheduledMonth++;
      }
    }
    
    if (monthlyCapacity[scheduledMonth - 1] >= maxAuditsPerMonth) return;
    
    monthlyCapacity[scheduledMonth - 1]++;
    
    const estimatedDays = getEstimatedDays(entity.riskLevel);
    const startDay = Math.floor(Math.random() * 15) + 1;
    const startDate = new Date(year, scheduledMonth - 1, startDay);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + estimatedDays);
    
    // Randomly assign status based on current date simulation
    const currentMonth = new Date().getMonth() + 1;
    let status: AuditStatus = 'Planned';
    let progress = 0;
    
    if (year < new Date().getFullYear()) {
      status = Math.random() > 0.1 ? 'Completed' : 'Cancelled';
      progress = status === 'Completed' ? 100 : 0;
    } else if (year === new Date().getFullYear()) {
      if (scheduledMonth < currentMonth) {
        status = Math.random() > 0.15 ? 'Completed' : 'Delayed';
        progress = status === 'Completed' ? 100 : Math.floor(Math.random() * 40) + 60;
      } else if (scheduledMonth === currentMonth) {
        status = 'In Progress';
        progress = Math.floor(Math.random() * 60) + 20;
      }
    }
    
    const leadAuditor = auditors[index % auditors.length];
    const teamSize = entity.riskLevel === 'Extreme' || entity.riskLevel === 'High' ? 3 : 2;
    const team = teamMemberPool.slice(index % teamMemberPool.length, (index % teamMemberPool.length) + teamSize);
    
    plan.push({
      id: `AP-${year}-${String(plan.length + 1).padStart(4, '0')}`,
      entityId: entity.id,
      entityName: entity.name,
      entityType: entity.entityType,
      category: getCategoryByEntityType(entity.entityType),
      riskLevel: entity.riskLevel,
      riskScore: entity.overallRiskScore,
      scheduledMonth,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      status,
      leadAuditor: leadAuditor.name,
      teamMembers: team,
      estimatedDays,
      actualDays: status === 'Completed' ? estimatedDays + Math.floor(Math.random() * 4) - 2 : undefined,
      objectives: getAuditObjectives(entity.entityType, getCategoryByEntityType(entity.entityType)),
      findings: status === 'Completed' ? Math.floor(Math.random() * 12) : undefined,
      progress,
      notes: status === 'Delayed' ? 'Resource constraints - additional support required' : undefined,
    });
  });
  
  return plan;
};

const getAuditObjectives = (entityType: string, category: AuditCategory): string[] => {
  const objectives: Record<string, string[]> = {
    'Compliance': [
      'Verify CBSL directive compliance',
      'Review regulatory reporting accuracy',
      'Assess internal policy adherence',
    ],
    'Financial': [
      'Verify financial statement accuracy',
      'Review accounting controls',
      'Assess asset management',
    ],
    'Operational': [
      'Evaluate process efficiency',
      'Review operational controls',
      'Assess service quality metrics',
    ],
    'IT Security': [
      'Assess cybersecurity controls',
      'Review access management',
      'Evaluate data protection measures',
    ],
    'Credit Risk': [
      'Assess credit exposure levels',
      'Review collateral adequacy',
      'Evaluate repayment capacity',
    ],
    'AML/KYC': [
      'Verify customer due diligence',
      'Review transaction monitoring',
      'Assess STR reporting compliance',
    ],
    'Treasury': [
      'Review trading controls',
      'Assess market risk management',
      'Evaluate liquidity position',
    ],
  };
  return objectives[category] || objectives['Operational'];
};

// Pre-generated plans for demo
export const annualPlan2025 = generateAuditPlan(2025);
export const annualPlan2024 = generateAuditPlan(2024);

// Monthly summary
export const getMonthlyDistribution = (plan: AuditPlanItem[]) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, index) => {
    const monthAudits = plan.filter(a => a.scheduledMonth === index + 1);
    return {
      month,
      total: monthAudits.length,
      extreme: monthAudits.filter(a => a.riskLevel === 'Extreme').length,
      high: monthAudits.filter(a => a.riskLevel === 'High').length,
      medium: monthAudits.filter(a => a.riskLevel === 'Medium').length,
      low: monthAudits.filter(a => a.riskLevel === 'Low').length,
      completed: monthAudits.filter(a => a.status === 'Completed').length,
      inProgress: monthAudits.filter(a => a.status === 'In Progress').length,
      planned: monthAudits.filter(a => a.status === 'Planned').length,
    };
  });
};

// Risk distribution for plan
export const getPlanRiskDistribution = (plan: AuditPlanItem[]) => ({
  extreme: plan.filter(a => a.riskLevel === 'Extreme').length,
  high: plan.filter(a => a.riskLevel === 'High').length,
  medium: plan.filter(a => a.riskLevel === 'Medium').length,
  low: plan.filter(a => a.riskLevel === 'Low').length,
});

// Progress metrics
export const getPlanProgress = (plan: AuditPlanItem[]) => {
  const total = plan.length;
  const completed = plan.filter(a => a.status === 'Completed').length;
  const inProgress = plan.filter(a => a.status === 'In Progress').length;
  const delayed = plan.filter(a => a.status === 'Delayed').length;
  const planned = plan.filter(a => a.status === 'Planned').length;
  
  return {
    total,
    completed,
    inProgress,
    delayed,
    planned,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    onTrackRate: total > 0 ? Math.round(((completed + inProgress) / total) * 100) : 0,
  };
};

// Resource allocation
export const getResourceAllocation = (plan: AuditPlanItem[]) => {
  const auditorWorkload: Record<string, { auditor: string; audits: number; days: number }> = {};
  
  plan.forEach(audit => {
    if (!auditorWorkload[audit.leadAuditor]) {
      auditorWorkload[audit.leadAuditor] = { auditor: audit.leadAuditor, audits: 0, days: 0 };
    }
    auditorWorkload[audit.leadAuditor].audits++;
    auditorWorkload[audit.leadAuditor].days += audit.estimatedDays;
  });
  
  return Object.values(auditorWorkload).sort((a, b) => b.audits - a.audits);
};

export const auditCategories: AuditCategory[] = ['Compliance', 'Financial', 'Operational', 'IT Security', 'Credit Risk', 'AML/KYC', 'Treasury'];
export const auditStatuses: AuditStatus[] = ['Planned', 'In Progress', 'Completed', 'Delayed', 'Cancelled'];
export const riskLevels: RiskLevel[] = ['Extreme', 'High', 'Medium', 'Low'];
