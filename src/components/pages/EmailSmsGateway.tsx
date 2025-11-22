import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { emailTemplates, smsTemplates } from "@/data/notificationsMockData";
import { Save, RotateCcw, Edit, TestTube2 } from "lucide-react";

export const EmailSmsGateway = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Email / SMS Gateway Setup</h1>
        <p className="text-muted-foreground">Configure email and SMS gateways for system notifications and alerts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Email Gateways</div>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">SMS Gateways</div>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Test Status</div>
            <div className="text-2xl font-bold text-green-600">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Last Updated</div>
            <div className="text-2xl font-bold">Today</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="email">Email Gateway</TabsTrigger>
          <TabsTrigger value="sms">SMS Gateway</TabsTrigger>
          <TabsTrigger value="test">Test Connection</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Gateway Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label>Gateway Provider</Label>
                  <Select defaultValue="smtp">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smtp">SMTP</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="ses">Amazon SES</SelectItem>
                      <SelectItem value="mailchimp">Mailchimp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>SMTP Host</Label>
                    <Input placeholder="smtp.example.com" defaultValue="smtp.boc.lk" />
                  </div>
                  <div className="space-y-2">
                    <Label>SMTP Port</Label>
                    <Input placeholder="587" defaultValue="587" />
                  </div>
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <Input placeholder="username" defaultValue="audit@boc.lk" />
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input type="password" placeholder="password" />
                  </div>
                  <div className="space-y-2">
                    <Label>From Email</Label>
                    <Input placeholder="from@example.com" defaultValue="noreply@boc.lk" />
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <Checkbox id="ssl" defaultChecked />
                    <Label htmlFor="ssl">Use SSL/TLS</Label>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Configuration
                  </Button>
                  <Button type="reset" variant="outline" className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {emailTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>{template.subject}</TableCell>
                        <TableCell>{template.lastModified}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <TestTube2 className="h-3 w-3" />
                              Test
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SMS Gateway Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label>Gateway Provider</Label>
                  <Select defaultValue="twilio">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twilio">Twilio</SelectItem>
                      <SelectItem value="sns">Amazon SNS</SelectItem>
                      <SelectItem value="clickatell">Clickatell</SelectItem>
                      <SelectItem value="custom">Custom API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>API Key</Label>
                    <Input placeholder="API Key" />
                  </div>
                  <div className="space-y-2">
                    <Label>API Secret</Label>
                    <Input type="password" placeholder="API Secret" />
                  </div>
                  <div className="space-y-2">
                    <Label>Sender ID</Label>
                    <Input placeholder="BOC-AUDIT" defaultValue="BOC-AUDIT" />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Configuration
                  </Button>
                  <Button type="reset" variant="outline" className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SMS Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Message Preview</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {smsTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>{template.message}</TableCell>
                        <TableCell>{template.lastModified}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <TestTube2 className="h-3 w-3" />
                              Test
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test">
          <Card>
            <CardHeader>
              <CardTitle>Test Gateway Connection</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label>Gateway Type</Label>
                  <Select defaultValue="email">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Recipient Email/Phone</Label>
                  <Input placeholder="Enter recipient email or phone" />
                </div>
                <div className="space-y-2">
                  <Label>Test Message</Label>
                  <Textarea
                    placeholder="Enter test message"
                    defaultValue="This is a test message from the Audit Management System."
                    rows={4}
                  />
                </div>
                <Button type="submit" className="gap-2">
                  <TestTube2 className="h-4 w-4" />
                  Send Test
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted rounded-lg space-y-2">
                <div>
                  <strong>Connection Status:</strong> <span className="text-green-600">Connected</span>
                </div>
                <div>
                  <strong>Last Test:</strong> 2025-09-07 10:45:32
                </div>
                <div>
                  <strong>Result:</strong> Test email sent successfully
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
