import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mfaStats, mfaUsers } from "@/data/userAdminMockData";
import { Badge } from "@/components/ui/badge";

export const MFASetup = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Multi-Factor Authentication Setup</h1>
        <div className="text-sm text-muted-foreground">
          Dashboard / User Administration / Multi-Factor Authentication Setup
        </div>
        <p className="text-muted-foreground mt-2">
          Configure MFA settings and manage user authentication methods to enhance security across the system.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-muted-foreground">MFA Enabled</div>
            <div className="text-3xl font-bold text-gold mt-2">{mfaStats.mfaEnabled}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-muted-foreground">MFA Disabled</div>
            <div className="text-3xl font-bold text-gold mt-2">{mfaStats.mfaDisabled}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-muted-foreground">Authenticator Apps</div>
            <div className="text-3xl font-bold text-gold mt-2">{mfaStats.authenticatorApps}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-muted-foreground">SMS Verification</div>
            <div className="text-3xl font-bold text-gold mt-2">{mfaStats.smsVerification}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MFA Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>MFA Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="mfaGlobal" defaultChecked className="rounded" />
                <Label htmlFor="mfaGlobal">Require MFA for all users</Label>
              </div>
              <div className="space-y-2">
                <Label>Allowed Methods</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="authApp" defaultChecked className="rounded" />
                    <Label htmlFor="authApp" className="font-normal">Authenticator App</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="sms" defaultChecked className="rounded" />
                    <Label htmlFor="sms" className="font-normal">SMS Verification</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="email" className="rounded" />
                    <Label htmlFor="email" className="font-normal">Email Verification</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="security" className="rounded" />
                    <Label htmlFor="security" className="font-normal">Security Questions</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Exempt Roles</Label>
                <select className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" multiple>
                  <option>System Administrator</option>
                  <option>Service Account</option>
                  <option>API User</option>
                  <option>Emergency Access</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>MFA Grace Period (days)</Label>
                <Input type="number" defaultValue="7" min="0" max="30" />
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="bg-gold text-black hover:bg-gold-rich">Save Configuration</Button>
                <Button type="reset" variant="ghost">Reset</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* User MFA Management */}
        <Card>
          <CardHeader>
            <CardTitle>User MFA Management</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label>User ID</Label>
                <Input placeholder="USR-001" required />
              </div>
              <div className="space-y-2">
                <Label>MFA Status</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                  <option value="">Select Status</option>
                  <option>Enabled</option>
                  <option>Disabled</option>
                  <option>Exempt</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Preferred Method</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="">Select Method</option>
                  <option>Authenticator App</option>
                  <option>SMS Verification</option>
                  <option>Email Verification</option>
                  <option>Security Questions</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="resetMFA" className="rounded" />
                <Label htmlFor="resetMFA">Force user to reconfigure MFA</Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="notifyMFA" defaultChecked className="rounded" />
                <Label htmlFor="notifyMFA">Send email notification</Label>
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="bg-gold text-black hover:bg-gold-rich">Update MFA</Button>
                <Button type="reset" variant="ghost">Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* MFA Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>MFA Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Department</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">MFA Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Method</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Last Setup</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mfaUsers.map((user, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{user.user}</td>
                    <td className="py-3 px-4">{user.department}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={
                          user.mfaStatus === "Enabled"
                            ? "bg-success/10 text-success"
                            : user.mfaStatus === "Disabled"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-warning/10 text-warning"
                        }
                      >
                        {user.mfaStatus}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{user.method}</td>
                    <td className="py-3 px-4">{user.lastSetup}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          {user.mfaStatus === "Enabled" ? "Reset" : "Enable"}
                        </Button>
                        <Button variant="ghost" size="sm">
                          {user.mfaStatus === "Enabled" ? "Disable" : "Exempt"}
                        </Button>
                      </div>
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
