// Mock data for User Administration module

export const userAdminStats = {
  totalUsers: 142,
  activeSessions: 38,
  roles: 7,
  pendingApprovals: 5,
};

export const recentUserActivity = [
  {
    id: 1,
    user: "USR-001 (John Doe)",
    action: "Login",
    ipAddress: "192.168.1.105",
    time: "10:23:45",
    status: "Success",
  },
  {
    id: 2,
    user: "USR-042 (Jane Smith)",
    action: "Password Change",
    ipAddress: "192.168.1.42",
    time: "09:45:12",
    status: "Success",
  },
  {
    id: 3,
    user: "USR-017 (Robert Johnson)",
    action: "Login",
    ipAddress: "192.168.1.78",
    time: "09:30:05",
    status: "Failed",
  },
  {
    id: 4,
    user: "USR-103 (Sarah Williams)",
    action: "Role Update",
    ipAddress: "192.168.1.33",
    time: "09:15:22",
    status: "Success",
  },
  {
    id: 5,
    user: "USR-055 (Michael Brown)",
    action: "Login",
    ipAddress: "192.168.1.91",
    time: "08:55:47",
    status: "Success",
  },
];

export const currentUsers = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john.doe@boc.lk",
    department: "Audit",
    role: "Admin",
    status: "Active",
  },
  {
    id: "USR-002",
    name: "Jane Smith",
    email: "jane.smith@boc.lk",
    department: "Finance",
    role: "Auditor",
    status: "Active",
  },
  {
    id: "USR-003",
    name: "Robert Johnson",
    email: "robert.j@boc.lk",
    department: "IT",
    role: "Controller",
    status: "Active",
  },
  {
    id: "USR-004",
    name: "Sarah Williams",
    email: "sarah.w@boc.lk",
    department: "HR",
    role: "Reviewer",
    status: "Inactive",
  },
];

export const rolesPermissions = [
  {
    id: "ROLE-001",
    roleName: "Admin",
    description: "Full system access with all permissions",
    userCount: 5,
    permissions: "All Modules",
    status: "Active",
  },
  {
    id: "ROLE-002",
    roleName: "Auditor",
    description: "Can create and manage audits",
    userCount: 42,
    permissions: "Audit Management, Reports",
    status: "Active",
  },
  {
    id: "ROLE-003",
    roleName: "Reviewer",
    description: "Can review and approve audits",
    userCount: 18,
    permissions: "Audit Review, Reports",
    status: "Active",
  },
  {
    id: "ROLE-004",
    roleName: "Controller",
    description: "Financial controls oversight",
    userCount: 12,
    permissions: "Financial Audits, Risk Assessment",
    status: "Active",
  },
];

export const mfaStats = {
  mfaEnabled: 118,
  mfaDisabled: 24,
  authenticatorApps: 95,
  smsVerification: 42,
};

export const mfaUsers = [
  {
    user: "USR-001 (John Doe)",
    department: "Audit",
    mfaStatus: "Enabled",
    method: "Authenticator App",
    lastSetup: "2025-08-15",
  },
  {
    user: "USR-002 (Jane Smith)",
    department: "Finance",
    mfaStatus: "Enabled",
    method: "SMS Verification",
    lastSetup: "2025-08-20",
  },
  {
    user: "USR-003 (Robert Johnson)",
    department: "IT",
    mfaStatus: "Enabled",
    method: "Authenticator App",
    lastSetup: "2025-08-18",
  },
  {
    user: "USR-004 (Sarah Williams)",
    department: "HR",
    mfaStatus: "Disabled",
    method: "-",
    lastSetup: "-",
  },
  {
    user: "USR-005 (Michael Brown)",
    department: "Audit",
    mfaStatus: "Exempt",
    method: "-",
    lastSetup: "-",
  },
];

export const loginHistoryStats = {
  loginsToday: 86,
  failedAttempts: 12,
  uniqueUsers: 68,
  securityAlerts: 3,
};

export const securityAlerts = [
  {
    id: 1,
    title: "Multiple Failed Login Attempts",
    description: "User USR-017 has 5 failed login attempts in the last 10 minutes from IP 192.168.1.78",
    time: "09:30:05",
    severity: "Medium",
  },
  {
    id: 2,
    title: "Unusual Login Location",
    description: "User USR-042 logged in from a new location outside of usual geographic area",
    time: "08:15:22",
    severity: "Medium",
  },
  {
    id: 3,
    title: "After Hours Login",
    description: "User USR-103 logged in outside of normal business hours (02:45 AM)",
    time: "02:45:33",
    severity: "Low",
  },
];

export const loginHistory = [
  {
    user: "USR-001 (John Doe)",
    loginTime: "2025-09-07 10:23:45",
    ipAddress: "192.168.1.105",
    device: "Windows Desktop",
    location: "Colombo Office",
    status: "Success",
  },
  {
    user: "USR-042 (Jane Smith)",
    loginTime: "2025-09-07 09:45:12",
    ipAddress: "192.168.1.42",
    device: "MacBook Pro",
    location: "Remote",
    status: "Success",
  },
  {
    user: "USR-017 (Robert Johnson)",
    loginTime: "2025-09-07 09:30:05",
    ipAddress: "192.168.1.78",
    device: "Windows Desktop",
    location: "Colombo Office",
    status: "Failed",
  },
  {
    user: "USR-103 (Sarah Williams)",
    loginTime: "2025-09-07 09:15:22",
    ipAddress: "192.168.1.33",
    device: "iPhone",
    location: "Kandy Office",
    status: "Success",
  },
  {
    user: "USR-055 (Michael Brown)",
    loginTime: "2025-09-07 08:55:47",
    ipAddress: "192.168.1.91",
    device: "Windows Desktop",
    location: "Galle Office",
    status: "Success",
  },
];

export const activeSessions = [
  {
    user: "USR-001 (John Doe)",
    loginTime: "2025-09-07 10:23:45",
    ipAddress: "192.168.1.105",
    device: "Windows Desktop",
    location: "Colombo Office",
    duration: "2h 15m",
    status: "Active",
  },
  {
    user: "USR-042 (Jane Smith)",
    loginTime: "2025-09-07 09:45:12",
    ipAddress: "192.168.1.42",
    device: "MacBook Pro",
    location: "Remote",
    duration: "2h 53m",
    status: "Active",
  },
  {
    user: "USR-103 (Sarah Williams)",
    loginTime: "2025-09-07 09:15:22",
    ipAddress: "192.168.1.33",
    device: "iPhone",
    location: "Kandy Office",
    duration: "3h 23m",
    status: "Active",
  },
];

export const inactiveUsers = [
  {
    id: "USR-042",
    name: "Alice Cooper",
    email: "alice.c@boc.lk",
    department: "Finance",
    lastLogin: "2024-03-15",
    daysSinceLogin: 176,
    status: "Inactive",
  },
  {
    id: "USR-087",
    name: "David Miller",
    email: "david.m@boc.lk",
    department: "IT",
    lastLogin: "2024-05-20",
    daysSinceLogin: 110,
    status: "Inactive",
  },
  {
    id: "USR-103",
    name: "Emma Wilson",
    email: "emma.w@boc.lk",
    department: "HR",
    lastLogin: "2024-06-10",
    daysSinceLogin: 89,
    status: "Inactive",
  },
];

// Password Reset Mock Data
export const passwordResetStats = {
  resetRequestsToday: 5,
  lockedAccounts: 3,
  pendingApprovals: 2,
  completedToday: 8,
};

export const lockedAccounts = [
  {
    user: "USR-024 (Thomas Anderson)",
    department: "IT",
    lockReason: "Multiple failed login attempts",
    lockedSince: "2025-09-07 09:15",
    failedAttempts: 5,
  },
  {
    user: "USR-067 (Emily Parker)",
    department: "Finance",
    lockReason: "Multiple failed login attempts",
    lockedSince: "2025-09-07 08:42",
    failedAttempts: 6,
  },
  {
    user: "USR-091 (Richard Chen)",
    department: "Audit",
    lockReason: "Security policy violation",
    lockedSince: "2025-09-06 16:30",
    failedAttempts: 4,
  },
];

export const recentPasswordResets = [
  {
    user: "USR-015 (Sarah Martinez)",
    requestedBy: "Self Service",
    requestDate: "2025-09-07 10:15",
    approvedBy: "Admin",
    completedDate: "2025-09-07 10:18",
    status: "Completed",
  },
  {
    user: "USR-033 (Michael Zhang)",
    requestedBy: "Helpdesk",
    requestDate: "2025-09-07 09:30",
    approvedBy: "System",
    completedDate: "2025-09-07 09:32",
    status: "Completed",
  },
  {
    user: "USR-058 (Jennifer Williams)",
    requestedBy: "Self Service",
    requestDate: "2025-09-07 09:00",
    approvedBy: "Pending",
    completedDate: "-",
    status: "Pending",
  },
];

// Audit Team Management Mock Data
export const auditTeamStats = {
  totalTeams: 12,
  activeAuditors: 45,
  teamsInField: 8,
  availableAuditors: 15,
};

export const auditTeams = [
  {
    teamId: "TEAM-001",
    teamName: "Branch Audit Team A",
    teamLeader: "John Smith",
    members: 5,
    category: "Operation",
    currentEngagement: "Branch-Colombo-2025-Q3",
    status: "Active",
  },
  {
    teamId: "TEAM-002",
    teamName: "IT Audit Team",
    teamLeader: "Sarah Johnson",
    members: 4,
    category: "IS",
    currentEngagement: "IT-Security-2025-Q3",
    status: "Active",
  },
  {
    teamId: "TEAM-003",
    teamName: "Credit Audit Team",
    teamLeader: "Robert Williams",
    members: 6,
    category: "Credit",
    currentEngagement: "Credit-Review-2025-Q3",
    status: "Active",
  },
  {
    teamId: "TEAM-004",
    teamName: "Branch Audit Team B",
    teamLeader: "Mary Brown",
    members: 5,
    category: "Operation",
    currentEngagement: "-",
    status: "Available",
  },
];

export const availableAuditors = [
  {
    auditorId: "USR-101",
    name: "David Miller",
    email: "david.m@boc.lk",
    department: "Audit",
    specialization: "Financial Auditing",
    certification: "CIA, CPA",
    experience: "8 years",
    currentStatus: "Available",
  },
  {
    auditorId: "USR-102",
    name: "Lisa Garcia",
    email: "lisa.g@boc.lk",
    department: "Audit",
    specialization: "IT Audit",
    certification: "CISA, CISSP",
    experience: "6 years",
    currentStatus: "Available",
  },
  {
    auditorId: "USR-103",
    name: "Thomas Davis",
    email: "thomas.d@boc.lk",
    department: "Audit",
    specialization: "Operational Audit",
    certification: "CIA",
    experience: "5 years",
    currentStatus: "Available",
  },
  {
    auditorId: "USR-104",
    name: "Jennifer Wilson",
    email: "jennifer.w@boc.lk",
    department: "Audit",
    specialization: "Compliance Audit",
    certification: "CRMA",
    experience: "7 years",
    currentStatus: "On Assignment",
  },
];
