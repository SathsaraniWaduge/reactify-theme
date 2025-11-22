// Mock data for the BOC Audit Management System

export const dashboardStats = {
  totalAudits: 145,
  activeAudits: 12,
  completedAudits: 98,
  pendingReview: 8,
  highRiskAudits: 5,
  mediumRiskAudits: 7,
  lowRiskAudits: 15,
  auditorsAssigned: 24,
};

export const recentAudits = [
  {
    id: "AUD-2024-001",
    entity: "Corporate Banking Division",
    type: "Compliance Audit",
    startDate: "2024-09-01",
    status: "In Progress",
    leadAuditor: "A. Silva",
    risk: "Medium",
  },
  {
    id: "AUD-2024-002",
    entity: "IT Department",
    type: "Operational Audit",
    startDate: "2024-08-28",
    status: "In Progress",
    leadAuditor: "K. Perera",
    risk: "High",
  },
  {
    id: "AUD-2024-003",
    entity: "Retail Banking",
    type: "Financial Audit",
    startDate: "2024-08-15",
    status: "Completed",
    leadAuditor: "N. Fernando",
    risk: "Low",
  },
];

export const notifications = [
  {
    id: 1,
    title: "New audit assigned",
    message: "Corporate Banking Division audit has been assigned to your team",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Risk assessment completed",
    message: "Risk assessment for IT Department has been finalized",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    title: "Report submitted",
    message: "Final audit report for Retail Banking has been submitted",
    time: "1 day ago",
    read: true,
  },
];

export const auditEntities = [
  {
    id: "ENT-001",
    code: "CBD",
    name: "Corporate Banking Division",
    category: "Operations",
    riskLevel: "Medium",
    lastAuditDate: "2024-06-15",
    status: "Active",
  },
  {
    id: "ENT-002",
    code: "IT",
    name: "Information Technology Department",
    category: "Technology",
    riskLevel: "High",
    lastAuditDate: "2024-05-20",
    status: "Active",
  },
  {
    id: "ENT-003",
    code: "RB",
    name: "Retail Banking",
    category: "Operations",
    riskLevel: "Low",
    lastAuditDate: "2024-07-10",
    status: "Active",
  },
];

export const teamMembers = [
  {
    id: "TM-001",
    name: "A. Silva",
    role: "Senior Auditor",
    email: "a.silva@boc.lk",
    phone: "+94 11 1234567",
    specialization: "Financial Audits",
    status: "Active",
  },
  {
    id: "TM-002",
    name: "K. Perera",
    role: "IT Auditor",
    email: "k.perera@boc.lk",
    phone: "+94 11 1234568",
    specialization: "IT Systems",
    status: "Active",
  },
  {
    id: "TM-003",
    name: "N. Fernando",
    role: "Audit Manager",
    email: "n.fernando@boc.lk",
    phone: "+94 11 1234569",
    specialization: "Operations",
    status: "Active",
  },
];

export const riskAssessmentData = {
  totalFactors: 10,
  lowRisk: 3,
  mediumRisk: 4,
  highRisk: 2,
  extremeRisk: 1,
};

export const auditPrograms = [
  {
    id: "PRG-001",
    name: "Compliance Audit Program 2024",
    year: "2024",
    category: "Compliance",
    status: "Active",
    progress: 65,
  },
  {
    id: "PRG-002",
    name: "IT Security Audit 2024",
    year: "2024",
    category: "Technology",
    status: "Active",
    progress: 45,
  },
];

export const aiChatHistory = [
  {
    id: 1,
    type: "ai",
    message: "Hello! I'm the BOC Audit Assistant. How can I help you today?",
  },
];
