import { useState } from "react";
import { ChevronDown, ChevronRight, Home, Calendar, FileText, Users, Shield, Settings, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
  },
  {
    id: "audit-planner",
    label: "Audit Planner",
    icon: Calendar,
    children: [
      { id: "annual-plan", label: "Annual Audit Plan" },
      { id: "monthly-plan", label: "Monthly Audit Plan" },
      { id: "quarterly-plan", label: "Quarterly Plan" },
    ],
  },
  {
    id: "master-data",
    label: "Master Data",
    icon: FileText,
    children: [
      { id: "audit-entities", label: "Audit Entities" },
      { id: "control-types", label: "Control Types" },
      { id: "audit-concerns", label: "Audit Concerns" },
      { id: "audit-programs", label: "Audit Programs" },
      { id: "control-areas", label: "Control Areas" },
    ],
  },
  {
    id: "risk-management",
    label: "Risk Management",
    icon: Shield,
    children: [
      { id: "risk-assessments", label: "Risk Assessments" },
      { id: "risk-matrix", label: "Risk Matrix" },
    ],
  },
  {
    id: "team-management",
    label: "Team Management",
    icon: Users,
    children: [
      { id: "team-members", label: "Team Members" },
      { id: "create-team", label: "Create New Team" },
    ],
  },
  {
    id: "security",
    label: "Security & Compliance",
    icon: Shield,
    children: [
      { id: "access-control", label: "Access Control" },
      { id: "audit-trails", label: "Audit Trails" },
    ],
  },
  {
    id: "admin-user",
    label: "User Administration",
    icon: Users,
    children: [
      { id: "user-creation", label: "User Creation & Deactivation" },
      { id: "rbac", label: "Role-Based Access Control" },
      { id: "audit-team-mgmt", label: "Audit Team Management" },
      { id: "password-reset", label: "Password Reset / Unlock" },
      { id: "mfa-setup", label: "Multi-Factor Authentication" },
      { id: "login-history", label: "Login History & Audit Logs" },
      { id: "session-mgmt", label: "Session Management" },
      { id: "inactive-cleanup", label: "Inactive User Cleanup" },
    ],
  },
  {
    id: "system-admin",
    label: "System Administration",
    icon: Settings,
    children: [
      { id: "job-scheduler", label: "Job Scheduler" },
      { id: "system-settings", label: "System Settings" },
    ],
  },
  {
    id: "support",
    label: "Support & Maintenance",
    icon: HelpCircle,
    children: [
      { id: "help-docs", label: "Help Documentation" },
      { id: "faq", label: "FAQ" },
    ],
  },
];

export const Sidebar = ({ activePage, onPageChange }: SidebarProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <aside className="w-70 bg-gradient-to-b from-black to-[#111] text-white overflow-y-auto h-[calc(100vh-74px)] sticky top-[74px] shadow-2xl">
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

            return (
              <div key={item.id} className="rounded-lg overflow-hidden">
                <button
                  onClick={() => {
                    if (hasChildren) {
                      toggleSection(item.id);
                    } else {
                      onPageChange(item.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gold hover:bg-white/5 transition-all rounded-lg ${
                    activePage === item.id ? "bg-gold/20" : ""
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {hasChildren &&
                    (isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    ))}
                </button>

                {hasChildren && isExpanded && (
                  <div className="mt-1 ml-7 space-y-1">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => onPageChange(child.id)}
                        className={`w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gold/10 hover:text-white rounded-md transition-all ${
                          activePage === child.id
                            ? "bg-gold/20 text-gold font-semibold"
                            : ""
                        }`}
                      >
                        {child.label}
                      </button>
                    ))}
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
