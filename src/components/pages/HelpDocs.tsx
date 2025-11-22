import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, FileText, Book, Video, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HelpDocs = () => {
  const docCategories = [
    {
      title: "Getting Started",
      icon: Book,
      docs: [
        "Quick Start Guide",
        "System Overview",
        "User Interface Walkthrough",
        "First Audit Setup",
      ],
    },
    {
      title: "User Guides",
      icon: FileText,
      docs: [
        "Audit Planning & Scheduling",
        "Risk Assessment Process",
        "Team Management",
        "Report Generation",
      ],
    },
    {
      title: "Administrator Guides",
      icon: FileText,
      docs: [
        "User Administration",
        "Security Configuration",
        "System Settings",
        "Backup & Recovery",
      ],
    },
    {
      title: "Video Tutorials",
      icon: Video,
      docs: [
        "Creating Your First Audit",
        "Managing Team Members",
        "Generating Reports",
        "Security Best Practices",
      ],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="text-sm text-muted-foreground mb-2">
          <a href="#" className="hover:underline">Dashboard</a> / <a href="#" className="hover:underline">Support & Maintenance</a> / Help Documentation
        </div>
        <h1 className="text-3xl font-bold mb-2">Help Documentation</h1>
        <p className="text-muted-foreground">
          Comprehensive guides, tutorials, and resources to help you make the most of the audit management system.
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search documentation..."
              className="pl-10 h-12 text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <FileText className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">User Manual</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Complete user guide with detailed instructions
            </p>
            <Button variant="link" className="px-0">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <Book className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Admin Guide</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Administrator manual for system configuration
            </p>
            <Button variant="link" className="px-0">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <Video className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Video Library</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Step-by-step video tutorials and demos
            </p>
            <Button variant="link" className="px-0">
              View Videos →
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Documentation Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {docCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <category.icon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.docs.map((doc) => (
                  <li key={doc}>
                    <Button variant="link" className="h-auto p-0 text-sm">
                      {doc}
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
