import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import { AnnualAuditPlan } from "./components/pages/AnnualAuditPlan";
import { MonthlyAuditPlan } from "./components/pages/MonthlyAuditPlan";
import { AuditEntities } from "./components/pages/AuditEntities";
import { ControlTypes } from "./components/pages/ControlTypes";
import { AuditConcerns } from "./components/pages/AuditConcerns";
import { TeamMembers } from "./components/pages/TeamMembers";
import { CreateTeam } from "./components/pages/CreateTeam";
import { RiskAssessments } from "./components/pages/RiskAssessments";
import { UserAdministration } from "./components/pages/UserAdministration";
import { UserCreation } from "./components/pages/UserCreation";
import { RBAC } from "./components/pages/RBAC";
import { MFASetup } from "./components/pages/MFASetup";
import { LoginHistory } from "./components/pages/LoginHistory";
import { SessionManagement } from "./components/pages/SessionManagement";
import { InactiveUserCleanup } from "./components/pages/InactiveUserCleanup";
import { PasswordReset } from "./components/pages/PasswordReset";
import { AuditTeamManagement } from "./components/pages/AuditTeamManagement";
import { MonitoringAudit } from "./components/pages/MonitoringAudit";
import { ActivityLogs } from "./components/pages/ActivityLogs";
import { ActionTrail } from "./components/pages/ActionTrail";
import { SecurityLogs } from "./components/pages/SecurityLogs";
import { LoginSessions } from "./components/pages/LoginSessions";
import { UsageAnalytics } from "./components/pages/UsageAnalytics";
import { JobScheduler } from "./components/pages/JobScheduler";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            
            {/* Audit Planner */}
            <Route path="annual-plan" element={<AnnualAuditPlan />} />
            <Route path="monthly-plan" element={<MonthlyAuditPlan />} />
            
            {/* Master Data */}
            <Route path="audit-entities" element={<AuditEntities />} />
            <Route path="control-types" element={<ControlTypes />} />
            <Route path="audit-concerns" element={<AuditConcerns />} />
            
            {/* Risk Management */}
            <Route path="risk-assessments" element={<RiskAssessments />} />
            
            {/* Team Management */}
            <Route path="team-members" element={<TeamMembers />} />
            <Route path="create-team" element={<CreateTeam />} />
            
            {/* User Administration */}
            <Route path="admin-user" element={<UserAdministration />} />
            <Route path="user-creation" element={<UserCreation />} />
            <Route path="rbac" element={<RBAC />} />
            <Route path="audit-team-mgmt" element={<AuditTeamManagement />} />
            <Route path="password-reset" element={<PasswordReset />} />
            <Route path="mfa-setup" element={<MFASetup />} />
            <Route path="login-history" element={<LoginHistory />} />
            <Route path="session-mgmt" element={<SessionManagement />} />
            <Route path="inactive-cleanup" element={<InactiveUserCleanup />} />
            
            {/* Monitoring & Audit */}
            <Route path="monitoring-audit" element={<MonitoringAudit />} />
            <Route path="activity-logs" element={<ActivityLogs />} />
            <Route path="action-trail" element={<ActionTrail />} />
            <Route path="security-logs" element={<SecurityLogs />} />
            <Route path="login-sessions" element={<LoginSessions />} />
            <Route path="usage-analytics" element={<UsageAnalytics />} />
            
            {/* System Administration */}
            <Route path="job-scheduler" element={<JobScheduler />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
