// Generate 500+ audit entities with multi-factor risk scoring
const entityCategories = ['Finance', 'Operations', 'IT', 'HR', 'Compliance', 'Sales', 'Marketing', 'Supply Chain', 'Legal', 'R&D'];
const entityTypes = ['Branch', 'Department', 'Business Unit', 'Subsidiary', 'Process', 'System', 'Vendor', 'Project'];
const regions = ['North', 'South', 'East', 'West', 'Central', 'International'];

export const generateAuditEntities = () => {
  const entities = [];
  for (let i = 1; i <= 520; i++) {
    const financialImpact = Math.random() * 100;
    const regulatoryCompliance = Math.random() * 100;
    const operationalComplexity = Math.random() * 100;
    const historicalPerformance = Math.random() * 100;
    const externalFactors = Math.random() * 100;
    
    // Weighted risk score calculation
    const riskScore = (
      financialImpact * 0.30 +
      regulatoryCompliance * 0.25 +
      operationalComplexity * 0.20 +
      historicalPerformance * 0.15 +
      externalFactors * 0.10
    );

    const getRiskLevel = (score: number) => {
      if (score >= 80) return 'Extreme';
      if (score >= 60) return 'High';
      if (score >= 40) return 'Medium';
      return 'Low';
    };

    const getTrend = () => {
      const trends = ['increasing', 'stable', 'decreasing'];
      return trends[Math.floor(Math.random() * 3)];
    };

    entities.push({
      id: `ENT-${String(i).padStart(4, '0')}`,
      name: `${entityCategories[i % entityCategories.length]} Entity ${i}`,
      category: entityCategories[i % entityCategories.length],
      type: entityTypes[i % entityTypes.length],
      region: regions[i % regions.length],
      riskFactors: {
        financialImpact: Math.round(financialImpact * 10) / 10,
        regulatoryCompliance: Math.round(regulatoryCompliance * 10) / 10,
        operationalComplexity: Math.round(operationalComplexity * 10) / 10,
        historicalPerformance: Math.round(historicalPerformance * 10) / 10,
        externalFactors: Math.round(externalFactors * 10) / 10,
      },
      overallRiskScore: Math.round(riskScore * 10) / 10,
      riskLevel: getRiskLevel(riskScore),
      trend: getTrend(),
      lastAssessment: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      nextReassessment: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      assignedAuditor: `Auditor ${(i % 20) + 1}`,
      status: ['Active', 'Under Review', 'Pending', 'Completed'][i % 4],
    });
  }
  return entities;
};

export const auditEntities = generateAuditEntities();

// Risk distribution summary
export const riskDistribution = {
  extreme: auditEntities.filter(e => e.riskLevel === 'Extreme').length,
  high: auditEntities.filter(e => e.riskLevel === 'High').length,
  medium: auditEntities.filter(e => e.riskLevel === 'Medium').length,
  low: auditEntities.filter(e => e.riskLevel === 'Low').length,
};

// Factor weights configuration
export const riskFactorWeights = [
  { id: 'financial', name: 'Financial Impact', weight: 30, description: 'Revenue impact, asset value, budget exposure' },
  { id: 'regulatory', name: 'Regulatory Compliance', weight: 25, description: 'Legal requirements, industry standards, penalties' },
  { id: 'operational', name: 'Operational Complexity', weight: 20, description: 'Process complexity, dependencies, automation level' },
  { id: 'historical', name: 'Historical Performance', weight: 15, description: 'Past audit findings, incident history, remediation' },
  { id: 'external', name: 'External Factors', weight: 10, description: 'Market conditions, geopolitical risks, third-party dependencies' },
];

// Risk appetite framework
export const riskAppetiteFramework = {
  thresholds: {
    extreme: { min: 80, max: 100, action: 'Immediate escalation and remediation required', color: '#dc2626' },
    high: { min: 60, max: 79, action: 'Senior management attention within 7 days', color: '#f97316' },
    medium: { min: 40, max: 59, action: 'Management review within 30 days', color: '#eab308' },
    low: { min: 0, max: 39, action: 'Routine monitoring and periodic review', color: '#22c55e' },
  },
  tolerances: [
    { category: 'Finance', maxExtremeCount: 2, maxHighCount: 10, currentExtreme: 1, currentHigh: 8 },
    { category: 'Operations', maxExtremeCount: 3, maxHighCount: 15, currentExtreme: 2, currentHigh: 12 },
    { category: 'IT', maxExtremeCount: 2, maxHighCount: 8, currentExtreme: 1, currentHigh: 6 },
    { category: 'Compliance', maxExtremeCount: 1, maxHighCount: 5, currentExtreme: 0, currentHigh: 4 },
    { category: 'HR', maxExtremeCount: 1, maxHighCount: 5, currentExtreme: 0, currentHigh: 3 },
  ],
};

// Early warning indicators
export const earlyWarningIndicators = [
  { id: 'EWI-001', entity: 'Finance Entity 12', indicator: 'Rapid score increase', change: '+15.3', period: '30 days', priority: 'Critical', triggeredAt: '2024-01-15' },
  { id: 'EWI-002', entity: 'IT Entity 45', indicator: 'Compliance deterioration', change: '+22.1', period: '14 days', priority: 'High', triggeredAt: '2024-01-14' },
  { id: 'EWI-003', entity: 'Operations Entity 78', indicator: 'Multiple factor increase', change: '+18.7', period: '21 days', priority: 'High', triggeredAt: '2024-01-13' },
  { id: 'EWI-004', entity: 'Sales Entity 23', indicator: 'External risk spike', change: '+25.4', period: '7 days', priority: 'Critical', triggeredAt: '2024-01-12' },
  { id: 'EWI-005', entity: 'Supply Chain Entity 56', indicator: 'Historical performance decline', change: '+12.8', period: '45 days', priority: 'Medium', triggeredAt: '2024-01-11' },
  { id: 'EWI-006', entity: 'HR Entity 34', indicator: 'Regulatory compliance drop', change: '+9.5', period: '30 days', priority: 'Medium', triggeredAt: '2024-01-10' },
  { id: 'EWI-007', entity: 'Legal Entity 89', indicator: 'Operational complexity increase', change: '+14.2', period: '60 days', priority: 'Low', triggeredAt: '2024-01-09' },
  { id: 'EWI-008', entity: 'R&D Entity 67', indicator: 'Financial impact growth', change: '+11.6', period: '30 days', priority: 'Medium', triggeredAt: '2024-01-08' },
];

// Automated reassessment triggers
export const reassessmentTriggers = [
  { id: 'TRG-001', name: 'Score Threshold Breach', condition: 'Risk score increases by >15 points', frequency: 'Real-time', status: 'Active', lastTriggered: '2024-01-15', triggerCount: 23 },
  { id: 'TRG-002', name: 'Regulatory Change', condition: 'New regulation affecting entity category', frequency: 'Event-based', status: 'Active', lastTriggered: '2024-01-10', triggerCount: 5 },
  { id: 'TRG-003', name: 'Incident Occurrence', condition: 'Security or compliance incident reported', frequency: 'Event-based', status: 'Active', lastTriggered: '2024-01-14', triggerCount: 12 },
  { id: 'TRG-004', name: 'Periodic Review', condition: 'Quarterly assessment cycle', frequency: 'Quarterly', status: 'Active', lastTriggered: '2024-01-01', triggerCount: 520 },
  { id: 'TRG-005', name: 'Management Request', condition: 'Manual reassessment requested', frequency: 'On-demand', status: 'Active', lastTriggered: '2024-01-12', triggerCount: 8 },
  { id: 'TRG-006', name: 'External Event', condition: 'Market or geopolitical event impact', frequency: 'Event-based', status: 'Active', lastTriggered: '2024-01-08', triggerCount: 3 },
];

// Risk correlation data
export const riskCorrelations = [
  { factor1: 'Financial Impact', factor2: 'Operational Complexity', correlation: 0.72, strength: 'Strong' },
  { factor1: 'Regulatory Compliance', factor2: 'External Factors', correlation: 0.65, strength: 'Strong' },
  { factor1: 'Historical Performance', factor2: 'Financial Impact', correlation: 0.58, strength: 'Moderate' },
  { factor1: 'Operational Complexity', factor2: 'Regulatory Compliance', correlation: 0.45, strength: 'Moderate' },
  { factor1: 'External Factors', factor2: 'Financial Impact', correlation: 0.38, strength: 'Weak' },
  { factor1: 'Historical Performance', factor2: 'Regulatory Compliance', correlation: 0.52, strength: 'Moderate' },
];

// Heat map data by category and region
export const heatMapData = entityCategories.map(category => ({
  category,
  regions: regions.map(region => {
    const entitiesInCell = auditEntities.filter(e => e.category === category && e.region === region);
    const avgScore = entitiesInCell.length > 0 
      ? entitiesInCell.reduce((sum, e) => sum + e.overallRiskScore, 0) / entitiesInCell.length 
      : 0;
    return {
      region,
      entityCount: entitiesInCell.length,
      avgRiskScore: Math.round(avgScore * 10) / 10,
      extremeCount: entitiesInCell.filter(e => e.riskLevel === 'Extreme').length,
      highCount: entitiesInCell.filter(e => e.riskLevel === 'High').length,
    };
  }),
}));

// Predictive analytics data
export const predictiveAnalytics = {
  projectedRiskTrend: [
    { month: 'Jan', actual: 52.3, projected: null },
    { month: 'Feb', actual: 54.1, projected: null },
    { month: 'Mar', actual: 53.8, projected: null },
    { month: 'Apr', actual: 55.2, projected: null },
    { month: 'May', actual: 56.7, projected: null },
    { month: 'Jun', actual: 58.1, projected: 58.1 },
    { month: 'Jul', actual: null, projected: 59.4 },
    { month: 'Aug', actual: null, projected: 60.2 },
    { month: 'Sep', actual: null, projected: 61.5 },
    { month: 'Oct', actual: null, projected: 62.1 },
    { month: 'Nov', actual: null, projected: 63.0 },
    { month: 'Dec', actual: null, projected: 63.8 },
  ],
  highRiskPredictions: [
    { entity: 'Finance Entity 45', currentScore: 58.2, predictedScore: 68.5, probability: 78, timeframe: '60 days' },
    { entity: 'IT Entity 23', currentScore: 55.8, predictedScore: 65.2, probability: 72, timeframe: '45 days' },
    { entity: 'Operations Entity 89', currentScore: 57.3, predictedScore: 66.8, probability: 69, timeframe: '90 days' },
    { entity: 'Sales Entity 12', currentScore: 54.1, predictedScore: 62.4, probability: 65, timeframe: '75 days' },
    { entity: 'Compliance Entity 67', currentScore: 59.5, predictedScore: 71.2, probability: 82, timeframe: '30 days' },
  ],
  modelAccuracy: 87.5,
  lastModelUpdate: '2024-01-15',
  dataPoints: 15600,
};

// Risk scoring history for trend analysis
export const riskScoringHistory = [
  { date: '2024-01-01', avgScore: 48.2, extremeCount: 18, highCount: 95, mediumCount: 245, lowCount: 162 },
  { date: '2024-01-08', avgScore: 49.1, extremeCount: 20, highCount: 98, mediumCount: 242, lowCount: 160 },
  { date: '2024-01-15', avgScore: 50.3, extremeCount: 22, highCount: 102, mediumCount: 238, lowCount: 158 },
  { date: '2024-01-22', avgScore: 51.2, extremeCount: 24, highCount: 105, mediumCount: 235, lowCount: 156 },
  { date: '2024-01-29', avgScore: 52.0, extremeCount: 25, highCount: 108, mediumCount: 232, lowCount: 155 },
  { date: '2024-02-05', avgScore: 52.8, extremeCount: 26, highCount: 110, mediumCount: 230, lowCount: 154 },
];

// Entity risk profile details
export const getEntityRiskProfile = (entityId: string) => {
  const entity = auditEntities.find(e => e.id === entityId) || auditEntities[0];
  return {
    ...entity,
    auditHistory: [
      { date: '2023-12-15', type: 'Full Audit', findings: 3, status: 'Completed', auditor: 'John Smith' },
      { date: '2023-09-20', type: 'Follow-up', findings: 1, status: 'Completed', auditor: 'Jane Doe' },
      { date: '2023-06-10', type: 'Full Audit', findings: 5, status: 'Completed', auditor: 'Mike Johnson' },
      { date: '2023-03-05', type: 'Spot Check', findings: 2, status: 'Completed', auditor: 'Sarah Williams' },
    ],
    riskHistory: [
      { date: '2024-01-15', score: entity.overallRiskScore },
      { date: '2024-01-01', score: entity.overallRiskScore - 2.3 },
      { date: '2023-12-15', score: entity.overallRiskScore - 4.1 },
      { date: '2023-12-01', score: entity.overallRiskScore - 5.8 },
      { date: '2023-11-15', score: entity.overallRiskScore - 7.2 },
      { date: '2023-11-01', score: entity.overallRiskScore - 8.5 },
    ],
    openFindings: [
      { id: 'FND-001', description: 'Control gap in approval process', severity: 'High', dueDate: '2024-02-15', owner: 'Department Head' },
      { id: 'FND-002', description: 'Documentation incomplete', severity: 'Medium', dueDate: '2024-02-28', owner: 'Process Owner' },
    ],
    keyContacts: [
      { role: 'Entity Head', name: 'Robert Chen', email: 'r.chen@company.com' },
      { role: 'Risk Coordinator', name: 'Lisa Park', email: 'l.park@company.com' },
      { role: 'Compliance Officer', name: 'David Kim', email: 'd.kim@company.com' },
    ],
  };
};
