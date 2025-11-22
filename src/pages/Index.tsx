import { useState } from "react";
import { LoginScreen } from "@/components/LoginScreen";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { AIChat } from "@/components/AIChat";
import { AuditEntities } from "@/components/pages/AuditEntities";
import { TeamMembers } from "@/components/pages/TeamMembers";
import { RiskAssessments } from "@/components/pages/RiskAssessments";
import { UserAdministration } from "@/components/pages/UserAdministration";
import { UserCreation } from "@/components/pages/UserCreation";
import { RBAC } from "@/components/pages/RBAC";
import { MFASetup } from "@/components/pages/MFASetup";
import { LoginHistory } from "@/components/pages/LoginHistory";
import { SessionManagement } from "@/components/pages/SessionManagement";
import { InactiveUserCleanup } from "@/components/pages/InactiveUserCleanup";
import { AnnualAuditPlan } from "@/components/pages/AnnualAuditPlan";
import { MonthlyAuditPlan } from "@/components/pages/MonthlyAuditPlan";
import { ControlTypes } from "@/components/pages/ControlTypes";
import { AuditConcerns } from "@/components/pages/AuditConcerns";
import { CreateTeam } from "@/components/pages/CreateTeam";
import { JobScheduler } from "@/components/pages/JobScheduler";
import { PasswordReset } from "@/components/pages/PasswordReset";
import { AuditTeamManagement } from "@/components/pages/AuditTeamManagement";
import { MonitoringAudit } from "@/components/pages/MonitoringAudit";
import { ActivityLogs } from "@/components/pages/ActivityLogs";
import { ActionTrail } from "@/components/pages/ActionTrail";
import { SecurityLogs } from "@/components/pages/SecurityLogs";
import { LoginSessions } from "@/components/pages/LoginSessions";
import { UsageAnalytics } from "@/components/pages/UsageAnalytics";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActivePage("dashboard");
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "annual-plan":
        return <AnnualAuditPlan />;
      case "monthly-plan":
        return <MonthlyAuditPlan />;
      case "audit-entities":
        return <AuditEntities />;
      case "control-types":
        return <ControlTypes />;
      case "audit-concerns":
        return <AuditConcerns />;
      case "team-members":
        return <TeamMembers />;
      case "create-team":
        return <CreateTeam />;
      case "risk-assessments":
        return <RiskAssessments />;
      case "job-scheduler":
        return <JobScheduler />;
      case "admin-user":
        return <UserAdministration onNavigate={setActivePage} />;
      case "user-creation":
        return <UserCreation />;
      case "rbac":
        return <RBAC />;
      case "mfa-setup":
        return <MFASetup />;
      case "login-history":
        return <LoginHistory />;
      case "session-mgmt":
        return <SessionManagement />;
      case "inactive-cleanup":
        return <InactiveUserCleanup />;
      case "password-reset":
        return <PasswordReset />;
      case "audit-team-mgmt":
        return <AuditTeamManagement />;
      case "monitoring-audit":
        return <MonitoringAudit onNavigate={setActivePage} />;
      case "activity-logs":
        return <ActivityLogs />;
      case "action-trail":
        return <ActionTrail />;
      case "security-logs":
        return <SecurityLogs />;
      case "login-sessions":
        return <LoginSessions />;
      case "usage-analytics":
        return <UsageAnalytics />;
      // Add more cases for other pages as needed
      default:
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">
              {activePage.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
            </h1>
            <div className="bg-gradient-to-br from-gold/10 to-gold-light/10 p-12 rounded-2xl text-center">
              <p className="text-lg text-muted-foreground mb-6">
                This section is under development. The complete system includes:
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-left max-w-2xl mx-auto">
                <ul className="space-y-2">
                  <li>✓ Annual & Monthly Audit Plans</li>
                  <li>✓ Audit Entities Management</li>
                  <li>✓ Control Types & Concerns</li>
                  <li>✓ Risk Assessments & Matrix</li>
                  <li>✓ Team Management</li>
                </ul>
                <ul className="space-y-2">
                  <li>✓ Job Scheduling & Automation</li>
                  <li>✓ Security & Access Control</li>
                  <li>✓ Audit Trails & Logging</li>
                  <li>✓ Reports & Analytics</li>
                  <li>✓ Support & Documentation</li>
                </ul>
              </div>
            </div>
          </div>
        );
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onLogout={handleLogout} />
      <div className="flex w-full">
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
        <main className="flex-1 min-w-0 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
      <AIChat />
    </div>
  );
};

export default Index;
