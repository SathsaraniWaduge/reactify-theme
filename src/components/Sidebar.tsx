import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, Home, Calendar, FileText, Users, Shield, Settings, HelpCircle, Activity, Search as SearchIcon, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const menuItems = [
  {
    id: "dashboard",
    path: "/dashboard",
    label: "Dashboard",
    icon: Home,
  },
  {
    id: "audit-planner",
    label: "Audit Planner",
    icon: Calendar,
    children: [
      { id: "annual-plan", path: "/annual-plan", label: "Annual Audit Plan" },
      { id: "monthly-plan", path: "/monthly-plan", label: "Monthly Audit Plan" },
      { id: "quarterly-plan", path: "/quarterly-plan", label: "Quarterly Plan" },
    ],
  },
  {
    id: "master-data",
    label: "Master Data",
    icon: FileText,
    children: [
      { id: "audit-entities", path: "/audit-entities", label: "Audit Entities" },
      { id: "control-types", path: "/control-types", label: "Control Types" },
      { id: "audit-concerns", path: "/audit-concerns", label: "Audit Concerns" },
      { id: "audit-programs", path: "/audit-programs", label: "Audit Programs" },
      { id: "control-areas", path: "/control-areas", label: "Control Areas" },
    ],
  },
  {
    id: "risk-management",
    label: "Risk Management",
    icon: Shield,
    children: [
      { id: "risk-assessments", path: "/risk-assessments", label: "Risk Assessments" },
      { id: "risk-matrix", path: "/risk-matrix", label: "Risk Matrix" },
    ],
  },
  {
    id: "team-management",
    label: "Team Management",
    icon: Users,
    children: [
      { id: "team-members", path: "/team-members", label: "Team Members" },
      { id: "create-team", path: "/create-team", label: "Create New Team" },
    ],
  },
  {
    id: "security",
    label: "Security & Compliance",
    icon: Shield,
    children: [
      { id: "access-control", path: "/access-control", label: "Access Control" },
      { id: "audit-trails", path: "/audit-trails", label: "Audit Trails" },
    ],
  },
  {
    id: "admin-user",
    path: "/admin-user",
    label: "User Administration",
    icon: Users,
    children: [
      { id: "user-creation", path: "/user-creation", label: "User Creation & Deactivation" },
      { id: "rbac", path: "/rbac", label: "Role-Based Access Control" },
      { id: "audit-team-mgmt", path: "/audit-team-mgmt", label: "Audit Team Management" },
      { id: "password-reset", path: "/password-reset", label: "Password Reset / Unlock" },
      { id: "mfa-setup", path: "/mfa-setup", label: "Multi-Factor Authentication" },
      { id: "login-history", path: "/login-history", label: "Login History & Audit Logs" },
      { id: "session-mgmt", path: "/session-mgmt", label: "Session Management" },
      { id: "inactive-cleanup", path: "/inactive-cleanup", label: "Inactive User Cleanup" },
    ],
  },
  {
    id: "audit-execution",
    label: "Audit Execution",
    icon: SearchIcon,
    children: [
      { id: "fieldwork-planner", path: "/fieldwork-planner", label: "Audit Fieldwork Planner" },
      { id: "audit-fieldworks", path: "/audit-fieldworks", label: "Audit Fieldworks" },
      { id: "audit-samples", path: "/audit-samples", label: "Audit Samples" },
    ],
  },
  {
    id: "monitoring-audit",
    path: "/monitoring-audit",
    label: "Monitoring & Audit",
    icon: Activity,
    children: [
      { id: "activity-logs", path: "/activity-logs", label: "System Activity Logs" },
      { id: "action-trail", path: "/action-trail", label: "User Action Trail" },
      { id: "security-logs", path: "/security-logs", label: "Security Event Logs" },
      { id: "login-sessions", path: "/login-sessions", label: "Login Sessions" },
      { id: "usage-analytics", path: "/usage-analytics", label: "Usage Analytics" },
    ],
  },
  {
    id: "notifications-messages",
    label: "Notifications & Messages",
    icon: Bell,
    children: [
      { id: "email-sms-gateway", path: "/email-sms-gateway", label: "Email / SMS Gateway Setup" },
      { id: "message-templates", path: "/message-templates", label: "Message Templates" },
      { id: "broadcast-announcements", path: "/broadcast-announcements", label: "Broadcast Announcements" },
      { id: "notification-preferences", path: "/notification-preferences", label: "Notification Preferences" },
    ],
  },
  {
    id: "system-admin",
    label: "System Administration",
    icon: Settings,
    children: [
      { id: "job-scheduler", path: "/job-scheduler", label: "Job Scheduler" },
      { id: "system-settings", path: "/system-settings", label: "System Settings" },
    ],
  },
  {
    id: "support",
    label: "Support & Maintenance",
    icon: HelpCircle,
    children: [
      { id: "help-docs", path: "/help-docs", label: "Help Documentation" },
      { id: "faq", path: "/faq", label: "FAQ" },
    ],
  },
];

export const Sidebar = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isActivePath = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  return (
    <aside className="w-[280px] flex-shrink-0 bg-gradient-to-b from-black to-[#111] text-white overflow-y-auto h-[calc(100vh-74px)] sticky top-[74px] shadow-2xl">
      <div className="p-4 space-y-4">
        {/* Search */}
        <div>
          <div className="text-gold text-xs font-semibold uppercase tracking-wider mb-2">
            Quick Navigation
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1b1b1b] border-0 text-white text-sm"
            />
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedSections[item.id];
            const hasChildren = item.children && item.children.length > 0;
            const isActive = isActivePath(item.path);

            return (
              <div key={item.id} className="rounded-lg overflow-hidden">
                {hasChildren ? (
                  <button
                    onClick={() => toggleSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gold hover:bg-white/5 transition-all rounded-lg ${
                      isActive ? "bg-gold/20" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                ) : (
                  <Link
                    to={item.path || "/dashboard"}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gold hover:bg-white/5 transition-all rounded-lg ${
                      isActive ? "bg-gold/20" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1 text-left">{item.label}</span>
                  </Link>
                )}

                {hasChildren && isExpanded && (
                  <div className="mt-1 ml-7 space-y-1">
                    {item.children.map((child) => {
                      const isChildActive = isActivePath(child.path);
                      return (
                        <Link
                          key={child.id}
                          to={child.path || "/dashboard"}
                          className={`block w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gold/10 hover:text-white rounded-md transition-all ${
                            isChildActive
                              ? "bg-gold/20 text-gold font-semibold"
                              : ""
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
