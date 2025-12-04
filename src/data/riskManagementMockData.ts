// BOC Bank - Risk Management Mock Data
// Entities: Bank Branches, IT Systems, High Net Worth Customers

const branchNames = [
  'Colombo Main Branch', 'Kandy Branch', 'Galle Branch', 'Jaffna Branch', 'Negombo Branch',
  'Kurunegala Branch', 'Ratnapura Branch', 'Anuradhapura Branch', 'Matara Branch', 'Badulla Branch',
  'Trincomalee Branch', 'Batticaloa Branch', 'Nuwara Eliya Branch', 'Hambantota Branch', 'Polonnaruwa Branch',
  'Kegalle Branch', 'Puttalam Branch', 'Ampara Branch', 'Monaragala Branch', 'Kalutara Branch',
  'Gampaha Branch', 'Chilaw Branch', 'Vavuniya Branch', 'Mannar Branch', 'Kilinochchi Branch',
  'Matale Branch', 'Dambulla Branch', 'Embilipitiya Branch', 'Panadura Branch', 'Moratuwa Branch',
  'Dehiwala Branch', 'Mount Lavinia Branch', 'Nugegoda Branch', 'Maharagama Branch', 'Kotte Branch',
  'Rajagiriya Branch', 'Battaramulla Branch', 'Malabe Branch', 'Kaduwela Branch', 'Homagama Branch',
  'Piliyandala Branch', 'Boralesgamuwa Branch', 'Kesbewa Branch', 'Bandaragama Branch', 'Horana Branch',
  'Avissawella Branch', 'Hanwella Branch', 'Padukka Branch', 'Beruwala Branch', 'Aluthgama Branch',
  'Hikkaduwa Branch', 'Ambalangoda Branch', 'Elpitiya Branch', 'Karapitiya Branch', 'Unawatuna Branch',
  'Weligama Branch', 'Mirissa Branch', 'Tangalle Branch', 'Tissamaharama Branch', 'Kataragama Branch',
  'Wellawaya Branch', 'Buttala Branch', 'Bibile Branch', 'Mahiyangana Branch', 'Bandarawela Branch',
  'Welimada Branch', 'Haputale Branch', 'Ella Branch', 'Kandy City Centre', 'Peradeniya Branch',
  'Katugastota Branch', 'Kundasale Branch', 'Gampola Branch', 'Nawalapitiya Branch', 'Hatton Branch',
  'Nanu Oya Branch', 'Talawakelle Branch', 'Maskeliya Branch', 'Dikoya Branch', 'Bogawantalawa Branch'
];

const itSystems = [
  'Core Banking System (CBS)', 'ATM Network', 'Mobile Banking App (BOC Smart)', 'Internet Banking Portal',
  'SWIFT Payment Gateway', 'Card Management System', 'Loan Origination System', 'Credit Scoring Engine',
  'Anti-Money Laundering (AML) System', 'Know Your Customer (KYC) Platform', 'Treasury Management System',
  'Trade Finance System', 'Foreign Exchange Platform', 'Cheque Clearing System', 'RTGS/CEFTS Interface',
  'Document Management System', 'Customer Relationship Management (CRM)', 'Call Centre System',
  'Queue Management System', 'Digital Signature Platform', 'Biometric Authentication System',
  'Fraud Detection System', 'Transaction Monitoring System', 'Regulatory Reporting System',
  'Data Warehouse', 'Business Intelligence Platform', 'Enterprise Service Bus', 'API Gateway',
  'Disaster Recovery System', 'Backup Management System', 'Network Security System', 'Firewall Management',
  'Intrusion Detection System', 'Email Security Gateway', 'Endpoint Protection Platform',
  'Privileged Access Management', 'Identity & Access Management', 'Security Information & Event Management (SIEM)',
  'Vulnerability Management System', 'Patch Management System'
];

const highValueCustomers = [
  'Ceylon Petroleum Corporation', 'Sri Lanka Telecom', 'Dialog Axiata PLC', 'John Keells Holdings',
  'Hayleys PLC', 'Aitken Spence PLC', 'Cargills Ceylon PLC', 'Singer Sri Lanka', 'Abans Group',
  'MAS Holdings', 'Brandix Lanka', 'Hirdaramani Group', 'Dipped Products PLC', 'Royal Ceramics Lanka',
  'Lanka Tiles PLC', 'Tokyo Cement Company', 'INSEE Cement', 'Holcim Lanka', 'Access Engineering',
  'MAGA Engineering', 'Sierra Construction', 'Sanken Construction', 'Central Finance Company',
  'People\'s Leasing', 'Mercantile Investments', 'Softlogic Finance', 'Lanka ORIX Finance',
  'Commercial Credit PLC', 'Vallibel One PLC', 'Sunshine Holdings', 'CIC Holdings', 'Hemas Holdings',
  'DIMO (PVT) Ltd', 'United Motors Lanka', 'Diesel & Motor Engineering', 'ASI Industries',
  'Teejay Lanka PLC', 'Hela Clothing', 'Timex Garments', 'Star Garments Group',
  'Ceylon Cold Stores', 'Maliban Biscuit', 'Munchee Biscuits', 'Lanka Milk Foods',
  'Fonterra Brands Sri Lanka', 'Nestle Lanka', 'Unilever Sri Lanka', 'Reckitt Benckiser Lanka',
  'GlaxoSmithKline Consumer', 'Astron Limited', 'State Pharmaceuticals Corporation',
  'Emerald Sri Lanka', 'Colombo Jewellery Stores', 'Raja Jewellers', 'Vogue Jewellers',
  'Gem & Jewellery Export Association Members', 'Ceylon Tea Board', 'Sri Lanka Tea Factory',
  'Dilmah Ceylon Tea', 'Mlesna Tea', 'Basilur Tea Export', 'Akbar Brothers', 'Mackwoods',
  'Watawala Plantations', 'Kelani Valley Plantations', 'Bogawantalawa Plantations',
  'Talawakelle Tea Estates', 'Horana Plantations', 'Kotagala Plantations', 'Agalawatte Plantations',
  'Madulsima Plantations', 'Kahawatte Plantations', 'Udapussellawa Plantations',
  'Namunukula Plantations', 'Maskeliya Plantations', 'Hapugastenne Plantations',
  'Sri Lanka Port Authority', 'Airport & Aviation Services', 'Ceylon Electricity Board',
  'National Water Supply & Drainage Board', 'Sri Lanka Railways', 'Road Development Authority',
  'Housing Development Authority', 'Urban Development Authority', 'Board of Investment',
  'Export Development Board', 'Sri Lanka Tourism Development Authority', 'Central Bank of Sri Lanka',
  'Insurance Board of Sri Lanka', 'Securities & Exchange Commission', 'Colombo Stock Exchange',
  'Central Depository Systems', 'Sri Lanka Customs', 'Inland Revenue Department',
  'Department of Immigration & Emigration', 'Registrar General\'s Department'
];

const regions = ['Western Province', 'Central Province', 'Southern Province', 'Northern Province', 'Eastern Province', 'North Western Province', 'Sabaragamuwa Province', 'Uva Province', 'North Central Province'];

export type EntityType = 'Branch' | 'IT System' | 'High Value Customer';

export const generateAuditEntities = () => {
  const entities: any[] = [];
  let id = 1;

  // Generate Branch Entities (200+)
  branchNames.forEach((name, index) => {
    const creditRiskExposure = Math.random() * 100;
    const regulatoryCompliance = Math.random() * 100;
    const operationalRisk = Math.random() * 100;
    const auditHistory = Math.random() * 100;
    const externalFactors = Math.random() * 100;
    
    const riskScore = (
      creditRiskExposure * 0.30 +
      regulatoryCompliance * 0.25 +
      operationalRisk * 0.20 +
      auditHistory * 0.15 +
      externalFactors * 0.10
    );

    entities.push({
      id: `BR-${String(id).padStart(4, '0')}`,
      name,
      entityType: 'Branch' as EntityType,
      category: 'Branch Network',
      region: regions[index % regions.length],
      riskFactors: {
        creditRiskExposure: Math.round(creditRiskExposure * 10) / 10,
        regulatoryCompliance: Math.round(regulatoryCompliance * 10) / 10,
        operationalRisk: Math.round(operationalRisk * 10) / 10,
        auditHistory: Math.round(auditHistory * 10) / 10,
        externalFactors: Math.round(externalFactors * 10) / 10,
      },
      overallRiskScore: Math.round(riskScore * 10) / 10,
      riskLevel: getRiskLevel(riskScore),
      trend: getTrend(),
      lastAssessment: getRandomPastDate(90),
      nextReassessment: getRandomFutureDate(90),
      assignedAuditor: `Auditor ${(index % 15) + 1}`,
      status: ['Active', 'Under Review', 'Pending Assessment'][index % 3],
      loanPortfolio: Math.round(Math.random() * 5000 + 500) + ' Mn LKR',
      depositBase: Math.round(Math.random() * 8000 + 1000) + ' Mn LKR',
      nplRatio: (Math.random() * 8 + 1).toFixed(2) + '%',
      staffCount: Math.floor(Math.random() * 50 + 10),
    });
    id++;
  });

  // Generate IT System Entities (40)
  itSystems.forEach((name, index) => {
    const systemAvailability = Math.random() * 100;
    const securityCompliance = Math.random() * 100;
    const dataIntegrity = Math.random() * 100;
    const incidentHistory = Math.random() * 100;
    const vendorRisk = Math.random() * 100;
    
    const riskScore = (
      systemAvailability * 0.25 +
      securityCompliance * 0.30 +
      dataIntegrity * 0.20 +
      incidentHistory * 0.15 +
      vendorRisk * 0.10
    );

    entities.push({
      id: `IT-${String(id - branchNames.length).padStart(4, '0')}`,
      name,
      entityType: 'IT System' as EntityType,
      category: 'Information Technology',
      region: 'Head Office',
      riskFactors: {
        systemAvailability: Math.round(systemAvailability * 10) / 10,
        securityCompliance: Math.round(securityCompliance * 10) / 10,
        dataIntegrity: Math.round(dataIntegrity * 10) / 10,
        incidentHistory: Math.round(incidentHistory * 10) / 10,
        vendorRisk: Math.round(vendorRisk * 10) / 10,
      },
      overallRiskScore: Math.round(riskScore * 10) / 10,
      riskLevel: getRiskLevel(riskScore),
      trend: getTrend(),
      lastAssessment: getRandomPastDate(60),
      nextReassessment: getRandomFutureDate(60),
      assignedAuditor: `IT Auditor ${(index % 5) + 1}`,
      status: ['Active', 'Under Review', 'Maintenance'][index % 3],
      uptime: (99 + Math.random()).toFixed(2) + '%',
      lastPatchDate: getRandomPastDate(30),
      criticalVulnerabilities: Math.floor(Math.random() * 5),
      vendorName: ['TCS', 'Infosys', 'Wipro', 'Oracle', 'IBM', 'Microsoft', 'In-house'][index % 7],
    });
    id++;
  });

  // Generate High Value Customer Entities (100)
  highValueCustomers.forEach((name, index) => {
    const creditExposure = Math.random() * 100;
    const repaymentHistory = Math.random() * 100;
    const collateralCoverage = Math.random() * 100;
    const businessStability = Math.random() * 100;
    const industryRisk = Math.random() * 100;
    
    const riskScore = (
      creditExposure * 0.35 +
      repaymentHistory * 0.25 +
      collateralCoverage * 0.15 +
      businessStability * 0.15 +
      industryRisk * 0.10
    );

    entities.push({
      id: `CUS-${String(id - branchNames.length - itSystems.length).padStart(4, '0')}`,
      name,
      entityType: 'High Value Customer' as EntityType,
      category: 'Corporate Banking',
      region: regions[index % regions.length],
      riskFactors: {
        creditExposure: Math.round(creditExposure * 10) / 10,
        repaymentHistory: Math.round(repaymentHistory * 10) / 10,
        collateralCoverage: Math.round(collateralCoverage * 10) / 10,
        businessStability: Math.round(businessStability * 10) / 10,
        industryRisk: Math.round(industryRisk * 10) / 10,
      },
      overallRiskScore: Math.round(riskScore * 10) / 10,
      riskLevel: getRiskLevel(riskScore),
      trend: getTrend(),
      lastAssessment: getRandomPastDate(120),
      nextReassessment: getRandomFutureDate(90),
      assignedAuditor: `RM ${(index % 10) + 1}`,
      status: ['Active', 'Under Review', 'Watch List'][index % 3],
      totalExposure: Math.round(Math.random() * 2000 + 100) + ' Mn LKR',
      facilityType: ['Term Loan', 'Working Capital', 'Trade Finance', 'Overdraft', 'LC/BG'][index % 5],
      collateralValue: Math.round(Math.random() * 2500 + 150) + ' Mn LKR',
      industry: ['Manufacturing', 'Services', 'Trading', 'Construction', 'Agriculture', 'Tourism', 'Export'][index % 7],
    });
    id++;
  });

  return entities;
};

function getRiskLevel(score: number) {
  if (score >= 80) return 'Extreme';
  if (score >= 60) return 'High';
  if (score >= 40) return 'Medium';
  return 'Low';
}

function getTrend() {
  const trends = ['increasing', 'stable', 'decreasing'];
  return trends[Math.floor(Math.random() * 3)];
}

function getRandomPastDate(maxDays: number) {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * maxDays));
  return date.toISOString().split('T')[0];
}

function getRandomFutureDate(maxDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * maxDays));
  return date.toISOString().split('T')[0];
}

export const auditEntities = generateAuditEntities();

// Risk distribution summary
export const riskDistribution = {
  extreme: auditEntities.filter(e => e.riskLevel === 'Extreme').length,
  high: auditEntities.filter(e => e.riskLevel === 'High').length,
  medium: auditEntities.filter(e => e.riskLevel === 'Medium').length,
  low: auditEntities.filter(e => e.riskLevel === 'Low').length,
};

// Entity type distribution
export const entityTypeDistribution = {
  branches: auditEntities.filter(e => e.entityType === 'Branch').length,
  itSystems: auditEntities.filter(e => e.entityType === 'IT System').length,
  customers: auditEntities.filter(e => e.entityType === 'High Value Customer').length,
};

// Banking-specific factor weights
export const riskFactorWeights = [
  { id: 'credit', name: 'Credit Risk Exposure', weight: 30, description: 'Loan portfolio quality, NPL ratio, provisioning adequacy' },
  { id: 'regulatory', name: 'Regulatory Compliance', weight: 25, description: 'CBSL directives, AML/CFT compliance, KYC adherence' },
  { id: 'operational', name: 'Operational Risk', weight: 20, description: 'Process failures, fraud incidents, staff competency' },
  { id: 'audit', name: 'Audit History', weight: 15, description: 'Past findings, remediation status, repeat observations' },
  { id: 'external', name: 'External Factors', weight: 10, description: 'Economic conditions, industry trends, competitive pressure' },
];

// Risk appetite framework - Banking specific
export const riskAppetiteFramework = {
  thresholds: {
    extreme: { min: 80, max: 100, action: 'Immediate escalation to Board Risk Committee, suspend operations if necessary', color: '#dc2626' },
    high: { min: 60, max: 79, action: 'Report to Chief Risk Officer within 24 hours, enhanced monitoring', color: '#f97316' },
    medium: { min: 40, max: 59, action: 'Branch Manager/System Owner review within 7 days', color: '#eab308' },
    low: { min: 0, max: 39, action: 'Routine monitoring, quarterly review cycle', color: '#22c55e' },
  },
  tolerances: [
    { category: 'Branch Network', maxExtremeCount: 3, maxHighCount: 15, currentExtreme: auditEntities.filter(e => e.entityType === 'Branch' && e.riskLevel === 'Extreme').length, currentHigh: auditEntities.filter(e => e.entityType === 'Branch' && e.riskLevel === 'High').length },
    { category: 'IT Systems', maxExtremeCount: 1, maxHighCount: 5, currentExtreme: auditEntities.filter(e => e.entityType === 'IT System' && e.riskLevel === 'Extreme').length, currentHigh: auditEntities.filter(e => e.entityType === 'IT System' && e.riskLevel === 'High').length },
    { category: 'Corporate Banking', maxExtremeCount: 5, maxHighCount: 20, currentExtreme: auditEntities.filter(e => e.entityType === 'High Value Customer' && e.riskLevel === 'Extreme').length, currentHigh: auditEntities.filter(e => e.entityType === 'High Value Customer' && e.riskLevel === 'High').length },
  ],
};

// Early warning indicators - Banking specific
export const earlyWarningIndicators = [
  { id: 'EWI-001', entity: 'Colombo Main Branch', indicator: 'NPL ratio increased above 5% threshold', change: '+2.3%', period: '30 days', priority: 'Critical', triggeredAt: '2024-01-15', entityType: 'Branch' },
  { id: 'EWI-002', entity: 'Core Banking System (CBS)', indicator: 'System availability dropped below 99.5%', change: '-0.8%', period: '7 days', priority: 'Critical', triggeredAt: '2024-01-14', entityType: 'IT System' },
  { id: 'EWI-003', entity: 'Ceylon Petroleum Corporation', indicator: 'Delayed loan repayment - 60 days overdue', change: '500 Mn', period: '60 days', priority: 'High', triggeredAt: '2024-01-13', entityType: 'Customer' },
  { id: 'EWI-004', entity: 'ATM Network', indicator: 'Fraud incidents increased significantly', change: '+45%', period: '14 days', priority: 'Critical', triggeredAt: '2024-01-12', entityType: 'IT System' },
  { id: 'EWI-005', entity: 'Kandy Branch', indicator: 'Cash handling irregularities detected', change: '3 incidents', period: '30 days', priority: 'High', triggeredAt: '2024-01-11', entityType: 'Branch' },
  { id: 'EWI-006', entity: 'Mobile Banking App', indicator: 'Customer complaints spike', change: '+120%', period: '7 days', priority: 'Medium', triggeredAt: '2024-01-10', entityType: 'IT System' },
  { id: 'EWI-007', entity: 'John Keells Holdings', indicator: 'Collateral value depreciation', change: '-15%', period: '90 days', priority: 'Medium', triggeredAt: '2024-01-09', entityType: 'Customer' },
  { id: 'EWI-008', entity: 'Galle Branch', indicator: 'AML alert - unusual transaction pattern', change: '5 alerts', period: '7 days', priority: 'High', triggeredAt: '2024-01-08', entityType: 'Branch' },
];

// Automated reassessment triggers - Banking specific
export const reassessmentTriggers = [
  { id: 'TRG-001', name: 'NPL Threshold Breach', condition: 'Branch NPL ratio exceeds 5% of loan portfolio', frequency: 'Real-time', status: 'Active', lastTriggered: '2024-01-15', triggerCount: 12 },
  { id: 'TRG-002', name: 'CBSL Directive Change', condition: 'New Central Bank circular affecting operations', frequency: 'Event-based', status: 'Active', lastTriggered: '2024-01-10', triggerCount: 3 },
  { id: 'TRG-003', name: 'Fraud Incident', condition: 'Confirmed fraud case reported', frequency: 'Event-based', status: 'Active', lastTriggered: '2024-01-14', triggerCount: 8 },
  { id: 'TRG-004', name: 'Quarterly Assessment', condition: 'Scheduled quarterly risk review cycle', frequency: 'Quarterly', status: 'Active', lastTriggered: '2024-01-01', triggerCount: 220 },
  { id: 'TRG-005', name: 'Large Exposure Change', condition: 'Customer exposure changes by >20%', frequency: 'Real-time', status: 'Active', lastTriggered: '2024-01-12', triggerCount: 45 },
  { id: 'TRG-006', name: 'System Security Alert', condition: 'Critical security vulnerability detected', frequency: 'Event-based', status: 'Active', lastTriggered: '2024-01-08', triggerCount: 6 },
  { id: 'TRG-007', name: 'Economic Indicator Change', condition: 'GDP growth, inflation, or exchange rate significant movement', frequency: 'Monthly', status: 'Active', lastTriggered: '2024-01-05', triggerCount: 4 },
];

// Risk correlation data - Banking specific
export const riskCorrelations = [
  { factor1: 'Credit Risk Exposure', factor2: 'Economic Conditions', correlation: 0.78, strength: 'Strong' },
  { factor1: 'Regulatory Compliance', factor2: 'Operational Risk', correlation: 0.65, strength: 'Strong' },
  { factor1: 'NPL Ratio', factor2: 'Collateral Coverage', correlation: 0.72, strength: 'Strong' },
  { factor1: 'System Availability', factor2: 'Customer Complaints', correlation: 0.58, strength: 'Moderate' },
  { factor1: 'Fraud Incidents', factor2: 'Internal Controls', correlation: 0.68, strength: 'Strong' },
  { factor1: 'Interest Rate Risk', factor2: 'Credit Risk', correlation: 0.45, strength: 'Moderate' },
  { factor1: 'Liquidity Risk', factor2: 'Market Risk', correlation: 0.52, strength: 'Moderate' },
  { factor1: 'Staff Turnover', factor2: 'Operational Errors', correlation: 0.41, strength: 'Moderate' },
];

// Heat map data by entity type and region
export const heatMapData = ['Branch Network', 'Information Technology', 'Corporate Banking'].map(category => ({
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

// Predictive analytics data - Banking specific
export const predictiveAnalytics = {
  projectedRiskTrend: [
    { month: 'Jan', actual: 48.2, projected: null },
    { month: 'Feb', actual: 49.5, projected: null },
    { month: 'Mar', actual: 51.2, projected: null },
    { month: 'Apr', actual: 52.8, projected: null },
    { month: 'May', actual: 53.5, projected: null },
    { month: 'Jun', actual: 54.2, projected: 54.2 },
    { month: 'Jul', actual: null, projected: 55.8 },
    { month: 'Aug', actual: null, projected: 57.1 },
    { month: 'Sep', actual: null, projected: 56.5 },
    { month: 'Oct', actual: null, projected: 55.8 },
    { month: 'Nov', actual: null, projected: 54.2 },
    { month: 'Dec', actual: null, projected: 53.5 },
  ],
  highRiskPredictions: [
    { entity: 'Colombo Main Branch', currentScore: 58.2, predictedScore: 68.5, probability: 78, timeframe: '60 days', reason: 'Increasing NPL trend in SME segment' },
    { entity: 'Core Banking System', currentScore: 55.8, predictedScore: 65.2, probability: 72, timeframe: '45 days', reason: 'End-of-life vendor support approaching' },
    { entity: 'Ceylon Petroleum Corporation', currentScore: 67.3, predictedScore: 76.8, probability: 82, timeframe: '30 days', reason: 'Cash flow constraints, delayed payments' },
    { entity: 'ATM Network', currentScore: 54.1, predictedScore: 62.4, probability: 65, timeframe: '90 days', reason: 'Aging infrastructure, increased maintenance' },
    { entity: 'Kandy Branch', currentScore: 49.5, predictedScore: 61.2, probability: 58, timeframe: '75 days', reason: 'Regional economic slowdown impact' },
  ],
  modelAccuracy: 87.5,
  lastModelUpdate: '2024-01-15',
  dataPoints: 15600,
};

// Risk scoring history
export const riskScoringHistory = [
  { date: '2024-01-01', avgScore: 48.2, extremeCount: 15, highCount: 52, mediumCount: 98, lowCount: 55 },
  { date: '2024-01-08', avgScore: 49.1, extremeCount: 16, highCount: 54, mediumCount: 96, lowCount: 54 },
  { date: '2024-01-15', avgScore: 50.3, extremeCount: 18, highCount: 56, mediumCount: 94, lowCount: 52 },
  { date: '2024-01-22', avgScore: 51.2, extremeCount: 19, highCount: 58, mediumCount: 92, lowCount: 51 },
  { date: '2024-01-29', avgScore: 52.0, extremeCount: 20, highCount: 60, mediumCount: 90, lowCount: 50 },
  { date: '2024-02-05', avgScore: 52.8, extremeCount: 21, highCount: 62, mediumCount: 88, lowCount: 49 },
];

// Entity risk profile details - Banking specific
export const getEntityRiskProfile = (entityId: string) => {
  const entity = auditEntities.find(e => e.id === entityId) || auditEntities[0];
  
  const auditHistory = entity.entityType === 'Branch' ? [
    { date: '2023-12-15', type: 'Branch Audit', findings: 3, status: 'Completed', auditor: 'K. Perera' },
    { date: '2023-09-20', type: 'Cash Audit', findings: 1, status: 'Completed', auditor: 'S. Fernando' },
    { date: '2023-06-10', type: 'Compliance Review', findings: 5, status: 'Completed', auditor: 'M. Silva' },
    { date: '2023-03-05', type: 'AML/KYC Audit', findings: 2, status: 'Completed', auditor: 'R. Jayawardena' },
  ] : entity.entityType === 'IT System' ? [
    { date: '2023-12-15', type: 'Security Assessment', findings: 4, status: 'Completed', auditor: 'IT Audit Team' },
    { date: '2023-09-20', type: 'Penetration Test', findings: 2, status: 'Completed', auditor: 'External Vendor' },
    { date: '2023-06-10', type: 'Compliance Audit', findings: 3, status: 'Completed', auditor: 'IT Audit Team' },
    { date: '2023-03-05', type: 'DR Test', findings: 1, status: 'Completed', auditor: 'IT Operations' },
  ] : [
    { date: '2023-12-15', type: 'Credit Review', findings: 2, status: 'Completed', auditor: 'Credit Risk Team' },
    { date: '2023-09-20', type: 'Collateral Inspection', findings: 1, status: 'Completed', auditor: 'Valuation Team' },
    { date: '2023-06-10', type: 'Financial Analysis', findings: 0, status: 'Completed', auditor: 'Credit Analyst' },
    { date: '2023-03-05', type: 'Site Visit', findings: 1, status: 'Completed', auditor: 'Relationship Manager' },
  ];

  const openFindings = entity.entityType === 'Branch' ? [
    { id: 'FND-001', description: 'Cash handling procedure deviation', severity: 'High', dueDate: '2024-02-15', owner: 'Branch Manager' },
    { id: 'FND-002', description: 'KYC documentation incomplete for 12 accounts', severity: 'Medium', dueDate: '2024-02-28', owner: 'Operations Manager' },
  ] : entity.entityType === 'IT System' ? [
    { id: 'FND-001', description: 'Critical security patch pending', severity: 'High', dueDate: '2024-02-10', owner: 'System Administrator' },
    { id: 'FND-002', description: 'Access review overdue', severity: 'Medium', dueDate: '2024-02-20', owner: 'IT Security' },
  ] : [
    { id: 'FND-001', description: 'Financial statements pending for Q4', severity: 'Medium', dueDate: '2024-02-28', owner: 'Relationship Manager' },
    { id: 'FND-002', description: 'Insurance policy renewal pending', severity: 'Low', dueDate: '2024-03-15', owner: 'Credit Administration' },
  ];

  const keyContacts = entity.entityType === 'Branch' ? [
    { role: 'Branch Manager', name: 'Nimal Jayasinghe', email: 'n.jayasinghe@boc.lk' },
    { role: 'Operations Manager', name: 'Kumari Perera', email: 'k.perera@boc.lk' },
    { role: 'Regional Manager', name: 'Sunil Fernando', email: 's.fernando@boc.lk' },
  ] : entity.entityType === 'IT System' ? [
    { role: 'System Owner', name: 'Rajitha Silva', email: 'r.silva@boc.lk' },
    { role: 'IT Manager', name: 'Dinesh Kumar', email: 'd.kumar@boc.lk' },
    { role: 'CISO', name: 'Pradeep Wickrama', email: 'p.wickrama@boc.lk' },
  ] : [
    { role: 'Relationship Manager', name: 'Asanka Bandara', email: 'a.bandara@boc.lk' },
    { role: 'Credit Officer', name: 'Malini Gunawardena', email: 'm.gunawardena@boc.lk' },
    { role: 'Recovery Officer', name: 'Chaminda Rathnayake', email: 'c.rathnayake@boc.lk' },
  ];

  return {
    ...entity,
    auditHistory,
    riskHistory: [
      { date: '2024-01-15', score: entity.overallRiskScore },
      { date: '2024-01-01', score: entity.overallRiskScore - 2.3 },
      { date: '2023-12-15', score: entity.overallRiskScore - 4.1 },
      { date: '2023-12-01', score: entity.overallRiskScore - 5.8 },
      { date: '2023-11-15', score: entity.overallRiskScore - 7.2 },
      { date: '2023-11-01', score: entity.overallRiskScore - 8.5 },
    ],
    openFindings,
    keyContacts,
  };
};
