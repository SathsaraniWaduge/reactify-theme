import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { userAdminStats, recentUserActivity } from "@/data/userAdminMockData";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Lock, History, Activity, UserX, KeyRound } from "lucide-react";

export const UserAdministration = () => {
  const modules = [
    {
      id: "user-creation",
      title: "User Creation & Deactivation",
      description: "Create new user accounts or deactivate existing ones with detailed profile management.",
      icon: Users,
    },
    {
      id: "rbac",
      title: "Role-Based Access Control (RBAC)",
      description: "Assign and manage roles and permissions to ensure least privilege access.",
      icon: Shield,
    },
    {
      id: "audit-team-mgmt",
      title: "Audit Team Management",
      description: "Organize users into audit teams for collaborative fieldwork assignments.",
      icon: Users,
    },
    {
      id: "password-reset",
      title: "Password Reset / Unlock",
      description: "Handle password resets and account unlocks securely.",
      icon: Lock,
    },
    {
      id: "mfa-setup",
      title: "Multi-Factor Authentication Setup",
      description: "Configure MFA to enhance user account security.",
      icon: KeyRound,
    },
    {
      id: "login-history",
      title: "User Login History & Audit Logs",
      description: "Monitor user login activities and system audit logs.",
      icon: History,
    },
    {
      id: "session-mgmt",
      title: "Session Management / Forced Logout",
      description: "Manage active sessions and enforce logouts for security.",
      icon: Activity,
    },
    {
      id: "inactive-cleanup",
      title: "Inactive User Cleanup",
      description: "Identify and archive or remove inactive user accounts.",
      icon: UserX,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">User Administration</h1>
        <div className="text-sm text-muted-foreground mb-2">
          Dashboard / User Administration
        </div>
        <p className="text-muted-foreground">
          Centralized management of users, roles, security settings, and activity logs to ensure secure and efficient system access control.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-muted-foreground">Total Users</div>
            <div className="text-3xl font-bold text-gold mt-2">{userAdminStats.totalUsers}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-muted-foreground">Active Sessions</div>
            <div className="text-3xl font-bold text-gold mt-2">{userAdminStats.activeSessions}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-muted-foreground">Roles</div>
            <div className="text-3xl font-bold text-gold mt-2">{userAdminStats.roles}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-muted-foreground">Pending Approvals</div>
            <div className="text-3xl font-bold text-gold mt-2">{userAdminStats.pendingApprovals}</div>
          </CardContent>
        </Card>
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((module) => (
          <Link key={module.id} to={`/${module.id}`}>
            <Card className="hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 h-full">
              <CardContent className="p-5">
                <module.icon className="h-8 w-8 text-gold mb-3" />
                <h3 className="font-semibold mb-2">{module.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                <div className="text-gold text-sm font-semibold hover:underline">
                  Manage →
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent User Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Action</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">IP Address</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentUserActivity.map((activity) => (
                  <tr key={activity.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{activity.user}</td>
                    <td className="py-3 px-4">{activity.action}</td>
                    <td className="py-3 px-4">{activity.ipAddress}</td>
                    <td className="py-3 px-4">{activity.time}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={
                          activity.status === "Success"
                            ? "bg-success/10 text-success"
                            : "bg-destructive/10 text-destructive"
                        }
                      >
                        {activity.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
