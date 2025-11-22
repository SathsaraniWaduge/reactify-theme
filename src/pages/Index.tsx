import { useState } from "react";
import { LoginScreen } from "@/components/LoginScreen";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { AIChat } from "@/components/AIChat";
import { AuditEntities } from "@/components/pages/AuditEntities";
import { TeamMembers } from "@/components/pages/TeamMembers";
import { RiskAssessments } from "@/components/pages/RiskAssessments";

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
      case "audit-entities":
        return <AuditEntities />;
      case "team-members":
        return <TeamMembers />;
      case "risk-assessments":
        return <RiskAssessments />;
      // Add more cases for other pages as needed
      default:
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">
              {activePage.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
            </h1>
            <div className="bg-gradient-to-br from-gold/10 to-gold-light/10 p-12 rounded-2xl text-center">
              <p className="text-lg text-muted-foreground">
                This section is under development. The complete system includes:
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-left max-w-2xl mx-auto">
                <ul className="space-y-2">
                  <li>✓ Audit Planning (Annual, Monthly, Quarterly)</li>
                  <li>✓ Master Data Management</li>
                  <li>✓ Risk Assessments & Control Areas</li>
                  <li>✓ Team Management</li>
                </ul>
                <ul className="space-y-2">
                  <li>✓ Security & Compliance</li>
                  <li>✓ Job Scheduling</li>
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
      <div className="flex">
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
      <AIChat />
    </div>
  );
};

export default Index;
