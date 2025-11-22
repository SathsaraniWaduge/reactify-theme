import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus } from "lucide-react";
import { useState } from "react";

export const MonthlyAuditPlan = () => {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState("2024");

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Monthly Audit Plan</h1>
          <p className="text-sm text-muted-foreground">
            Dashboard / Audit Planner / Monthly Audit Plan
          </p>
        </div>
        <Button className="bg-gold text-black hover:bg-gold-rich">
          <Plus className="h-4 w-4 mr-2" />
          Add Audit to Month
        </Button>
      </div>

      {/* Month Selector */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Calendar className="h-8 w-8 text-gold" />
            <div className="flex gap-4 flex-1">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Monthly Plan Form */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule Audit for {selectedMonth} {selectedYear}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="auditEntity">Audit Entity *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select entity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cbd">Corporate Banking Division</SelectItem>
                    <SelectItem value="it">IT Department</SelectItem>
                    <SelectItem value="rb">Retail Banking</SelectItem>
                    <SelectItem value="ops">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auditType">Audit Type *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="financial">Financial Audit</SelectItem>
                    <SelectItem value="operational">Operational Audit</SelectItem>
                    <SelectItem value="compliance">Compliance Audit</SelectItem>
                    <SelectItem value="it">IT Audit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scheduledDate">Scheduled Date *</Label>
                <Input type="date" id="scheduledDate" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (Days) *</Label>
                <Input type="number" id="duration" placeholder="Enter duration" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size *</Label>
                <Input type="number" id="teamSize" placeholder="Number of auditors" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTeam">Assigned Team *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team1">Financial Audit Team</SelectItem>
                  <SelectItem value="team2">IT Audit Team</SelectItem>
                  <SelectItem value="team3">Operations Team</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="objectives">Month-Specific Objectives</Label>
              <Input id="objectives" placeholder="Enter specific objectives for this month" />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-gold text-black hover:bg-gold-rich">
                Schedule Audit
              </Button>
              <Button type="reset" variant="outline">
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Monthly Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Audits Scheduled for {selectedMonth} {selectedYear}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Entity</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Team</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Duration</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "Jan 05, 2024", entity: "Corporate Banking", type: "Financial", team: "Team A", duration: "5 days", status: "Scheduled" },
                  { date: "Jan 12, 2024", entity: "IT Department", type: "IT Audit", team: "Team B", duration: "7 days", status: "In Progress" },
                  { date: "Jan 20, 2024", entity: "Retail Banking", type: "Operational", team: "Team C", duration: "4 days", status: "Scheduled" },
                ].map((audit, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">
                      <div className="flex items-center gap-2">
                        <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gradient-to-r from-gold to-gold-rich text-black text-sm font-semibold">
                          📅 {audit.date}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{audit.entity}</td>
                    <td className="py-3 px-4">{audit.type}</td>
                    <td className="py-3 px-4">{audit.team}</td>
                    <td className="py-3 px-4">{audit.duration}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={
                        audit.status === "In Progress" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                      }>
                        {audit.status}
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
