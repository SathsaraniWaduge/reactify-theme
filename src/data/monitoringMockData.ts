// Mock data for Monitoring & Audit module

export const monitoringStats = {
  activeSessions: 42,
  securityEvents: 7,
  failedLogins: 3,
  systemErrors: 0,
};

export const recentMonitoringEvents = [
  {
    time: "2025-09-07 10:45",
    eventType: "System Activity",
    source: "Database",
    details: "Backup completed successfully",
    severity: "Info",
  },
  {
    time: "2025-09-07 10:30",
    eventType: "User Action",
    source: "A. Silva",
    details: "Created new audit: AUD-009",
    severity: "Info",
  },
  {
    time: "2025-09-07 10:15",
    eventType: "Security Event",
    source: "System",
    details: "Multiple failed login attempts from IP: 192.168.1.100",
    severity: "Warning",
  },
  {
    time: "2025-09-07 09:45",
    eventType: "System Activity",
    source: "Application",
    details: "Scheduled report generation started",
    severity: "Info",
  },
  {
    time: "2025-09-07 09:30",
    eventType: "User Action",
    source: "K. Perera",
    details: "Updated audit findings: AUD-005",
    severity: "Info",
  },
];

// Activity Logs Data
export const activityLogsStats = {
  eventsToday: 1245,
  errors: 0,
  warnings: 12,
  criticalEvents: 0,
};

export const activityLogs = [
  {
    timestamp: "2025-09-07 10:45:32",
    level: "Info",
    source: "Database",
    event: "Backup",
    details: "Daily backup completed successfully",
  },
  {
    timestamp: "2025-09-07 10:30:15",
    level: "Info",
    source: "Application",
    event: "User Session",
    details: "User A. Silva logged in",
  },
  {
    timestamp: "2025-09-07 10:15:47",
    level: "Warning",
    source: "Security",
    event: "Login Attempt",
    details: "Multiple failed login attempts from IP: 192.168.1.100",
  },
  {
    timestamp: "2025-09-07 09:45:22",
    level: "Info",
    source: "Scheduler",
    event: "Report Generation",
    details: "Weekly report generation started",
  },
  {
    timestamp: "2025-09-07 09:30:18",
    level: "Info",
    source: "Application",
    event: "Data Operation",
    details: "Audit AUD-005 updated by K. Perera",
  },
  {
    timestamp: "2025-09-07 09:15:33",
    level: "Warning",
    source: "Performance",
    event: "Response Time",
    details: "Slow query detected: 3.2 seconds",
  },
  {
    timestamp: "2025-09-07 09:00:45",
    level: "Info",
    source: "System",
    event: "Startup",
    details: "Application started successfully",
  },
];

// Action Trail Data
export const actionTrailStats = {
  actionsToday: 856,
  criticalActions: 12,
  dataChanges: 142,
  accessEvents: 387,
};

export const actionTrail = [
  {
    timestamp: "2025-09-07 10:45:22",
    user: "A. Silva",
    action: "Create",
    target: "Audit",
    details: "Created new audit: AUD-009",
    ipAddress: "192.168.1.105",
  },
  {
    timestamp: "2025-09-07 10:30:15",
    user: "K. Perera",
    action: "Update",
    target: "Audit Finding",
    details: "Updated findings for audit: AUD-005",
    ipAddress: "192.168.1.110",
  },
  {
    timestamp: "2025-09-07 10:15:47",
    user: "N. Fernando",
    action: "Delete",
    target: "User",
    details: "Deleted user: R. Wijesinghe",
    ipAddress: "192.168.1.115",
  },
  {
    timestamp: "2025-09-07 09:45:33",
    user: "A. Silva",
    action: "Approve",
    target: "Audit Report",
    details: "Approved audit report: AUD-003",
    ipAddress: "192.168.1.105",
  },
  {
    timestamp: "2025-09-07 09:30:18",
    user: "K. Perera",
    action: "Assign",
    target: "Audit",
    details: "Assigned audit: AUD-007 to S. Gunawardena",
    ipAddress: "192.168.1.110",
  },
  {
    timestamp: "2025-09-07 09:15:22",
    user: "N. Fernando",
    action: "Login",
    target: "System",
    details: "User logged in successfully",
    ipAddress: "192.168.1.115",
  },
  {
    timestamp: "2025-09-07 09:00:45",
    user: "System",
    action: "Schedule",
    target: "Report",
    details: "Generated scheduled weekly report",
    ipAddress: "127.0.0.1",
  },
];

// Security Logs Data
export const securityLogsStats = {
  eventsToday: 7,
  threatsDetected: 2,
  blockedIPs: 1,
  securityAlerts: 3,
};

export const securityLogs = [
  {
    timestamp: "2025-09-07 10:45:22",
    eventType: "Brute Force",
    severity: "Critical",
    sourceIP: "192.168.1.100",
    description: "Multiple failed login attempts detected",
    status: "Blocked",
  },
  {
    timestamp: "2025-09-07 10:30:15",
    eventType: "SQL Injection",
    severity: "Critical",
    sourceIP: "203.115.6.78",
    description: "Potential SQL injection attempt blocked",
    status: "Blocked",
  },
  {
    timestamp: "2025-09-07 10:15:47",
    eventType: "Failed Login",
    severity: "Warning",
    sourceIP: "192.168.1.120",
    description: "Failed login attempt for user: admin",
    status: "Monitored",
  },
  {
    timestamp: "2025-09-07 09:45:33",
    eventType: "Privilege Escalation",
    severity: "Warning",
    sourceIP: "192.168.1.105",
    description: "User attempted to access restricted resource",
    status: "Blocked",
  },
  {
    timestamp: "2025-09-07 09:30:18",
    eventType: "Malware Detection",
    severity: "Critical",
    sourceIP: "192.168.1.115",
    description: "Potential malware upload detected",
    status: "Quarantined",
  },
  {
    timestamp: "2025-09-07 09:15:22",
    eventType: "Session Hijacking",
    severity: "Warning",
    sourceIP: "192.168.1.110",
    description: "Suspicious session activity detected",
    status: "Session Terminated",
  },
  {
    timestamp: "2025-09-07 09:00:45",
    eventType: "DDoS Attempt",
    severity: "Critical",
    sourceIP: "203.115.6.50",
    description: "Distributed denial of service attempt detected",
    status: "Blocked",
  },
];

// Login Sessions Data
export const loginSessionsStats = {
  activeSessions: 42,
  successfulLogins: 156,
  failedAttempts: 3,
  lockedAccounts: 0,
};

export const activeSessions = [
  {
    user: "A. Silva",
    loginTime: "2025-09-07 08:30",
    ipAddress: "192.168.1.105",
    device: "Chrome / Windows",
    location: "Colombo",
    lastActivity: "2 min ago",
  },
  {
    user: "K. Perera",
    loginTime: "2025-09-07 09:15",
    ipAddress: "192.168.1.110",
    device: "Firefox / Windows",
    location: "Kandy",
    lastActivity: "5 min ago",
  },
  {
    user: "N. Fernando",
    loginTime: "2025-09-07 09:45",
    ipAddress: "192.168.1.115",
    device: "Safari / macOS",
    location: "Galle",
    lastActivity: "1 min ago",
  },
  {
    user: "R. Wijesinghe",
    loginTime: "2025-09-07 10:00",
    ipAddress: "192.168.1.120",
    device: "Chrome / Windows",
    location: "Jaffna",
    lastActivity: "10 min ago",
  },
  {
    user: "S. Gunawardena",
    loginTime: "2025-09-07 10:15",
    ipAddress: "192.168.1.125",
    device: "Edge / Windows",
    location: "Matara",
    lastActivity: "15 min ago",
  },
];

export const loginAttempts = [
  {
    timestamp: "2025-09-07 10:45:22",
    user: "A. Silva",
    ipAddress: "192.168.1.105",
    status: "Success",
    device: "Chrome / Windows",
    location: "Colombo",
  },
  {
    timestamp: "2025-09-07 10:30:15",
    user: "admin",
    ipAddress: "192.168.1.100",
    status: "Failed",
    device: "Chrome / Windows",
    location: "Unknown",
  },
  {
    timestamp: "2025-09-07 10:15:47",
    user: "K. Perera",
    ipAddress: "192.168.1.110",
    status: "Success",
    device: "Firefox / Windows",
    location: "Kandy",
  },
  {
    timestamp: "2025-09-07 10:00:33",
    user: "guest",
    ipAddress: "192.168.1.120",
    status: "Failed",
    device: "Chrome / Windows",
    location: "Unknown",
  },
  {
    timestamp: "2025-09-07 09:45:18",
    user: "N. Fernando",
    ipAddress: "192.168.1.115",
    status: "Success",
    device: "Safari / macOS",
    location: "Galle",
  },
];

export const sessionHistory = [
  {
    user: "A. Silva",
    loginTime: "2025-09-07 08:30",
    logoutTime: "2025-09-07 12:15",
    duration: "3h 45m",
    ipAddress: "192.168.1.105",
    device: "Chrome / Windows",
  },
  {
    user: "K. Perera",
    loginTime: "2025-09-07 09:15",
    logoutTime: "2025-09-07 11:30",
    duration: "2h 15m",
    ipAddress: "192.168.1.110",
    device: "Firefox / Windows",
  },
  {
    user: "N. Fernando",
    loginTime: "2025-09-06 14:00",
    logoutTime: "2025-09-06 17:45",
    duration: "3h 45m",
    ipAddress: "192.168.1.115",
    device: "Safari / macOS",
  },
  {
    user: "R. Wijesinghe",
    loginTime: "2025-09-06 10:30",
    logoutTime: "2025-09-06 16:20",
    duration: "5h 50m",
    ipAddress: "192.168.1.120",
    device: "Chrome / Windows",
  },
  {
    user: "S. Gunawardena",
    loginTime: "2025-09-06 09:00",
    logoutTime: "2025-09-06 15:30",
    duration: "6h 30m",
    ipAddress: "192.168.1.125",
    device: "Edge / Windows",
  },
];

// Usage Analytics Data
export const usageAnalyticsStats = {
  activeUsers: 38,
  pageViews: 2456,
  avgSessionTime: "45m",
  peakUsage: "10:30 AM",
};

export const usageStatistics = [
  {
    metric: "Active Users",
    today: "38",
    yesterday: "42",
    lastWeek: "256",
    change: "-9.5%",
    changeType: "negative",
  },
  {
    metric: "Page Views",
    today: "2,456",
    yesterday: "2,123",
    lastWeek: "14,567",
    change: "+15.7%",
    changeType: "positive",
  },
  {
    metric: "Avg. Session Time",
    today: "45m",
    yesterday: "42m",
    lastWeek: "43m",
    change: "+7.1%",
    changeType: "positive",
  },
  {
    metric: "Bounce Rate",
    today: "12%",
    yesterday: "15%",
    lastWeek: "14%",
    change: "-20.0%",
    changeType: "positive",
  },
  {
    metric: "Feature Usage",
    today: "78%",
    yesterday: "75%",
    lastWeek: "76%",
    change: "+4.0%",
    changeType: "positive",
  },
];

export const userActivityDetails = [
  {
    user: "A. Silva",
    role: "Audit Manager",
    sessionCount: 12,
    totalTime: "8h 45m",
    pageViews: 456,
    lastActive: "2 min ago",
  },
  {
    user: "K. Perera",
    role: "Auditor",
    sessionCount: 10,
    totalTime: "7h 30m",
    pageViews: 387,
    lastActive: "5 min ago",
  },
  {
    user: "N. Fernando",
    role: "Administrator",
    sessionCount: 8,
    totalTime: "6h 15m",
    pageViews: 298,
    lastActive: "1 min ago",
  },
  {
    user: "R. Wijesinghe",
    role: "Viewer",
    sessionCount: 5,
    totalTime: "3h 45m",
    pageViews: 156,
    lastActive: "10 min ago",
  },
  {
    user: "S. Gunawardena",
    role: "Auditor",
    sessionCount: 7,
    totalTime: "5h 30m",
    pageViews: 234,
    lastActive: "15 min ago",
  },
];

export const featureUsageDetails = [
  {
    feature: "Audit Creation",
    users: 28,
    usageCount: 156,
    avgTime: "12m",
    adoptionRate: "74%",
    trend: "up",
  },
  {
    feature: "Report Generation",
    users: 32,
    usageCount: 245,
    avgTime: "8m",
    adoptionRate: "84%",
    trend: "up",
  },
  {
    feature: "Data Export",
    users: 15,
    usageCount: 87,
    avgTime: "5m",
    adoptionRate: "39%",
    trend: "up",
  },
  {
    feature: "User Management",
    users: 8,
    usageCount: 45,
    avgTime: "15m",
    adoptionRate: "21%",
    trend: "stable",
  },
  {
    feature: "System Configuration",
    users: 5,
    usageCount: 23,
    avgTime: "20m",
    adoptionRate: "13%",
    trend: "stable",
  },
];

export const performanceMetrics = [
  {
    metric: "Response Time",
    current: "245ms",
    average: "320ms",
    peak: "1.2s",
    status: "Good",
  },
  {
    metric: "Throughput",
    current: "1,245 req/s",
    average: "1,100 req/s",
    peak: "2,100 req/s",
    status: "Good",
  },
  {
    metric: "Error Rate",
    current: "0.1%",
    average: "0.2%",
    peak: "1.5%",
    status: "Good",
  },
  {
    metric: "CPU Usage",
    current: "45%",
    average: "52%",
    peak: "85%",
    status: "Good",
  },
  {
    metric: "Memory Usage",
    current: "65%",
    average: "68%",
    peak: "92%",
    status: "Warning",
  },
];
