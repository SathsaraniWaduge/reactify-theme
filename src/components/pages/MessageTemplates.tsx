import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { messageTemplatesData } from "@/data/notificationsMockData";
import { Plus, Upload, Download, Edit, Copy, TestTube2 } from "lucide-react";

export const MessageTemplates = () => {
  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800 border-green-300"
      : "bg-yellow-100 text-yellow-800 border-yellow-300";
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Message Templates</h1>
        <p className="text-muted-foreground">
          Manage email and message templates for system notifications and communications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Total Templates</div>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Email Templates</div>
            <div className="text-2xl font-bold">16</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">SMS Templates</div>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Last Updated</div>
            <div className="text-2xl font-bold">Today</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
          <TabsTrigger value="sms">SMS Templates</TabsTrigger>
          <TabsTrigger value="system">System Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Message Templates</span>
                <div className="flex gap-2">
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create New Template
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Import Templates
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Templates
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messageTemplatesData.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>{template.type}</TableCell>
                        <TableCell>{template.category}</TableCell>
                        <TableCell>{template.lastModified}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(template.status)}>
                            {template.status === "active" ? "Active" : "Draft"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <Copy className="h-3 w-3" />
                              Duplicate
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

        <TabsContent value="email">
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
                      <TableHead>Category</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messageTemplatesData
                      .filter((t) => t.type === "Email")
                      .map((template) => (
                        <TableRow key={template.id}>
                          <TableCell className="font-medium">{template.name}</TableCell>
                          <TableCell>{template.category}</TableCell>
                          <TableCell>{template.lastModified}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(template.status)}>
                              {template.status === "active" ? "Active" : "Draft"}
                            </Badge>
                          </TableCell>
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

        <TabsContent value="sms">
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
                      <TableHead>Category</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messageTemplatesData
                      .filter((t) => t.type === "SMS")
                      .map((template) => (
                        <TableRow key={template.id}>
                          <TableCell className="font-medium">{template.name}</TableCell>
                          <TableCell>{template.category}</TableCell>
                          <TableCell>{template.lastModified}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(template.status)}>
                              {template.status === "active" ? "Active" : "Draft"}
                            </Badge>
                          </TableCell>
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

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messageTemplatesData
                      .filter((t) => t.category === "System")
                      .map((template) => (
                        <TableRow key={template.id}>
                          <TableCell className="font-medium">{template.name}</TableCell>
                          <TableCell>{template.type}</TableCell>
                          <TableCell>{template.lastModified}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(template.status)}>
                              {template.status === "active" ? "Active" : "Draft"}
                            </Badge>
                          </TableCell>
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
      </Tabs>
    </div>
  );
};
