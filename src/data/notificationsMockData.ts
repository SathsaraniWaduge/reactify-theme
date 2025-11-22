// Mock data for Notifications & Messages Module

export const emailTemplates = [
  {
    id: 1,
    name: "Welcome Email",
    subject: "Welcome to Audit Management System",
    lastModified: "2025-09-05",
  },
  {
    id: 2,
    name: "Password Reset",
    subject: "Password Reset Request",
    lastModified: "2025-09-01",
  },
  {
    id: 3,
    name: "Audit Assignment",
    subject: "New Audit Assignment",
    lastModified: "2025-08-28",
  },
];

export const smsTemplates = [
  {
    id: 1,
    name: "Verification Code",
    message: "Your verification code is: {code}",
    lastModified: "2025-09-05",
  },
  {
    id: 2,
    name: "Audit Alert",
    message: "New audit assigned: {audit_name}",
    lastModified: "2025-09-01",
  },
];

export const messageTemplatesData = [
  {
    id: 1,
    name: "Welcome Email",
    type: "Email",
    category: "User Management",
    lastModified: "2025-09-05",
    status: "active",
  },
  {
    id: 2,
    name: "Password Reset",
    type: "Email",
    category: "Security",
    lastModified: "2025-09-01",
    status: "active",
  },
  {
    id: 3,
    name: "Audit Assignment",
    type: "Email",
    category: "Audit",
    lastModified: "2025-08-28",
    status: "active",
  },
  {
    id: 4,
    name: "Audit Reminder",
    type: "Email",
    category: "Audit",
    lastModified: "2025-08-25",
    status: "active",
  },
  {
    id: 5,
    name: "Verification Code",
    type: "SMS",
    category: "Security",
    lastModified: "2025-09-05",
    status: "active",
  },
  {
    id: 6,
    name: "Audit Alert",
    type: "SMS",
    category: "Audit",
    lastModified: "2025-09-01",
    status: "active",
  },
  {
    id: 7,
    name: "System Maintenance",
    type: "Email",
    category: "System",
    lastModified: "2025-08-20",
    status: "draft",
  },
  {
    id: 8,
    name: "Deadline Reminder",
    type: "Email",
    category: "Audit",
    lastModified: "2025-08-15",
    status: "active",
  },
];

export const broadcastAnnouncementsData = [
  {
    id: 1,
    title: "System Maintenance Scheduled",
    priority: "High",
    audience: "All Users",
    startDate: "2025-09-10",
    endDate: "2025-09-12",
    status: "active",
  },
  {
    id: 2,
    title: "New Audit Guidelines Released",
    priority: "Medium",
    audience: "Auditors Only",
    startDate: "2025-09-01",
    endDate: "2025-10-01",
    status: "active",
  },
  {
    id: 3,
    title: "Training Session Reminder",
    priority: "Low",
    audience: "All Users",
    startDate: "2025-08-25",
    endDate: "2025-09-15",
    status: "active",
  },
  {
    id: 4,
    title: "System Update Completed",
    priority: "Medium",
    audience: "All Users",
    startDate: "2025-08-15",
    endDate: "2025-08-20",
    status: "expired",
  },
  {
    id: 5,
    title: "New Feature Release",
    priority: "High",
    audience: "All Users",
    startDate: "2025-08-01",
    endDate: "2025-08-31",
    status: "expired",
  },
];

export const notificationPreferencesData = [
  {
    id: 1,
    user: "A. Silva",
    email: "a.silva@boc.lk",
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
  },
  {
    id: 2,
    user: "K. Perera",
    email: "k.perera@boc.lk",
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  },
  {
    id: 3,
    user: "N. Fernando",
    email: "n.fernando@boc.lk",
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
  },
  {
    id: 4,
    user: "R. Wijesinghe",
    email: "r.wijesinghe@boc.lk",
    emailNotifications: false,
    smsNotifications: false,
    pushNotifications: true,
  },
  {
    id: 5,
    user: "S. Gunawardena",
    email: "s.gunawardena@boc.lk",
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: false,
  },
];
