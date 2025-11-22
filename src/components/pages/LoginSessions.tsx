import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loginSessionsStats, activeSessions, loginAttempts, sessionHistory } from "@/data/monitoringMockData";
import { Search, Download } from "lucide-react";

export const LoginSessions = () => {
  const [activeTab, setActiveTab] = useState("active-sessions");

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "secondary"> = {
      Success: "secondary",
      Failed: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="text-sm text-muted-foreground mb-2">
          <a href="#" className="hover:underline">Dashboard</a> / <a href="#" className="hover:underline">Monitoring & Audit</a> / Login Attempts / Session History
        </div>
        <h1 className="text-3xl font-bold mb-2">Login Attempts / Session History</h1>
        <p className="text-muted-foreground">
          Track login attempts and active user sessions.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Active Sessions</div>
            <div className="text-3xl font-bold">{loginSessionsStats.activeSessions}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Successful Logins</div>
            <div className="text-3xl font-bold">{loginSessionsStats.successfulLogins}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Failed Attempts</div>
            <div className="text-3xl font-bold">{loginSessionsStats.failedAttempts}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">Locked Accounts</div>
            <div className="text-3xl font-bold">{loginSessionsStats.lockedAccounts}</div>
          </CardHeader>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active-sessions">Active Sessions</TabsTrigger>
          <TabsTrigger value="login-attempts">Login Attempts</TabsTrigger>
          <TabsTrigger value="session-history">Session History</TabsTrigger>
        </TabsList>

        <TabsContent value="active-sessions">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle>Active User Sessions</CardTitle>
                <div className="flex gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:flex-initial">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search sessions..." className="pl-8 w-full md:w-[300px]" />
                  </div>
                  <Button variant="destructive">Terminate Selected</Button>
                  <Button variant="outline">Refresh</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Login Time</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeSessions.map((session, index) => (
                    <TableRow key={index}>
                      <TableCell>{session.user}</TableCell>
                      <TableCell className="font-mono text-sm">{session.loginTime}</TableCell>
                      <TableCell className="font-mono text-sm">{session.ipAddress}</TableCell>
                      <TableCell>{session.device}</TableCell>
                      <TableCell>{session.location}</TableCell>
                      <TableCell>{session.lastActivity}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="link" size="sm" className="h-auto p-0">Details</Button>
                          <Button variant="link" size="sm" className="h-auto p-0 text-destructive">Terminate</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="login-attempts">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle>Login Attempts</CardTitle>
                <div className="flex gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:flex-initial">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search attempts..." className="pl-8 w-full md:w-[300px]" />
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Logs
                  </Button>
                  <Button variant="outline">Clear Filters</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loginAttempts.map((attempt, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-sm">{attempt.timestamp}</TableCell>
                      <TableCell>{attempt.user}</TableCell>
                      <TableCell className="font-mono text-sm">{attempt.ipAddress}</TableCell>
                      <TableCell>{getStatusBadge(attempt.status)}</TableCell>
                      <TableCell>{attempt.device}</TableCell>
                      <TableCell>{attempt.location}</TableCell>
                      <TableCell>
                        <Button variant="link" size="sm" className="h-auto p-0">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="session-history">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle>Session History</CardTitle>
                <div className="flex gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:flex-initial">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search history..." className="pl-8 w-full md:w-[300px]" />
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export History
                  </Button>
                  <Button variant="outline">Clear Filters</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Login Time</TableHead>
                    <TableHead>Logout Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessionHistory.map((session, index) => (
                    <TableRow key={index}>
                      <TableCell>{session.user}</TableCell>
                      <TableCell className="font-mono text-sm">{session.loginTime}</TableCell>
                      <TableCell className="font-mono text-sm">{session.logoutTime}</TableCell>
                      <TableCell>{session.duration}</TableCell>
                      <TableCell className="font-mono text-sm">{session.ipAddress}</TableCell>
                      <TableCell>{session.device}</TableCell>
                      <TableCell>
                        <Button variant="link" size="sm" className="h-auto p-0">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
