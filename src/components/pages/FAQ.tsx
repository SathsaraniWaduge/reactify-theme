import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const FAQ = () => {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I create my first audit?",
          a: "Navigate to Audit Planner > Annual Audit Plan and click 'Add New Audit'. Fill in the required details including entity, type, and schedule, then click Save.",
        },
        {
          q: "How do I add team members?",
          a: "Go to Team Management > Team Members and click 'Add Team Member'. Enter their details, assign roles, and save. They will receive an email invitation.",
        },
      ],
    },
    {
      category: "User Management",
      questions: [
        {
          q: "How do I reset a user's password?",
          a: "Navigate to User Administration > Password Reset / Unlock, enter the user ID, and click 'Reset Password'. The user will receive an email with reset instructions.",
        },
        {
          q: "What are the different user roles?",
          a: "The system has Administrator, Audit Manager, Auditor, and Viewer roles. Each role has different permissions for creating, editing, and viewing audits.",
        },
      ],
    },
    {
      category: "Audits & Planning",
      questions: [
        {
          q: "How do I schedule an audit?",
          a: "In the Audit Planner, select the audit you want to schedule, click 'Schedule', choose the date range and assign team members, then save.",
        },
        {
          q: "Can I modify an audit after it's started?",
          a: "Yes, audits can be modified during execution. However, certain fields may require approval depending on your role and the audit status.",
        },
      ],
    },
    {
      category: "Reports & Analytics",
      questions: [
        {
          q: "How do I generate audit reports?",
          a: "Go to the specific audit, click 'Generate Report', select the report type and format (PDF/Excel), customize as needed, and click Generate.",
        },
        {
          q: "Can I export data to Excel?",
          a: "Yes, most tables have an 'Export' button that allows you to download data in Excel or CSV format for further analysis.",
        },
      ],
    },
    {
      category: "Security & Access",
      questions: [
        {
          q: "How do I enable MFA for my account?",
          a: "Navigate to User Administration > MFA Setup, select your account, choose your preferred MFA method (Authenticator App or SMS), and follow the setup wizard.",
        },
        {
          q: "What should I do if I'm locked out?",
          a: "Contact your system administrator who can unlock your account via User Administration > Password Reset / Unlock.",
        },
      ],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="text-sm text-muted-foreground mb-2">
          <a href="#" className="hover:underline">Dashboard</a> / <a href="#" className="hover:underline">Support & Maintenance</a> / FAQ
        </div>
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">
          Find answers to common questions about using the audit management system.
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              className="pl-10 h-12 text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* FAQ Categories */}
      {faqs.map((category, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle>{category.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((faq, qIdx) => (
                <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`}>
                  <AccordionTrigger className="text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}

      {/* Contact Support */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Still need help?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Can't find the answer you're looking for? Contact our support team.
          </p>
          <div className="flex gap-4">
            <div>
              <div className="text-sm font-medium">Email</div>
              <div className="text-sm text-muted-foreground">support@boc.lk</div>
            </div>
            <div>
              <div className="text-sm font-medium">Phone</div>
              <div className="text-sm text-muted-foreground">+94 11 123 4567</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
