import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Users } from "lucide-react";
import { useState } from "react";

export const CreateTeam = () => {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState(0);

  const availableMembers = [
    "A. Silva - Senior Auditor",
    "K. Perera - IT Auditor",
    "N. Fernando - Audit Manager",
    "R. Wijesinghe - Financial Auditor",
    "S. Gunawardena - Operations Auditor",
    "M. Jayawardena - Compliance Officer",
  ];

  const addMember = (member: string) => {
    if (!selectedMembers.includes(member)) {
      setSelectedMembers([...selectedMembers, member]);
      setTeamSize(selectedMembers.length + 1);
    }
  };

  const removeMember = (member: string) => {
    setSelectedMembers(selectedMembers.filter((m) => m !== member));
    setTeamSize(selectedMembers.length - 1);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Create New Team</h1>
          <p className="text-sm text-muted-foreground">
            Dashboard / Team Management / Create New Team
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Existing Teams", value: "8" },
          { label: "Active Teams", value: "6" },
          { label: "Available Members", value: "18" },
          { label: "Current Team Size", value: teamSize.toString() },
        ].map((stat) => (
          <Card key={stat.label} className="hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-3xl font-bold text-gold mt-2">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Team Form */}
      <Card>
        <CardHeader>
          <CardTitle>Team Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name *</Label>
                <Input id="teamName" placeholder="Enter team name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamCode">Team Code *</Label>
                <Input id="teamCode" placeholder="e.g., TEAM-001" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="teamLead">Team Lead *</Label>
                <select id="teamLead" className="w-full p-2 border rounded-lg">
                  <option value="">Select team lead</option>
                  <option value="silva">A. Silva - Senior Auditor</option>
                  <option value="perera">K. Perera - IT Auditor</option>
                  <option value="fernando">N. Fernando - Audit Manager</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization *</Label>
                <select id="specialization" className="w-full p-2 border rounded-lg">
                  <option value="">Select specialization</option>
                  <option value="financial">Financial Audits</option>
                  <option value="it">IT Audits</option>
                  <option value="operational">Operational Audits</option>
                  <option value="compliance">Compliance Audits</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Team Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the team's purpose and responsibilities"
                className="min-h-[100px]"
              />
            </div>

            {/* Team Members Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Team Members</Label>
                {teamSize > 0 && (
                  <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gradient-to-r from-gold to-gold-rich text-black text-sm font-semibold">
                    <Users className="h-4 w-4 mr-2" />
                    {teamSize} Members
                  </div>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <select
                  className="w-full p-2 border rounded-lg mb-3"
                  onChange={(e) => {
                    addMember(e.target.value);
                    e.target.value = "";
                  }}
                >
                  <option value="">Select member to add</option>
                  {availableMembers
                    .filter((m) => !selectedMembers.includes(m))
                    .map((member) => (
                      <option key={member} value={member}>
                        {member}
                      </option>
                    ))}
                </select>

                <div className="flex flex-wrap gap-2">
                  {selectedMembers.map((member) => (
                    <Badge
                      key={member}
                      variant="outline"
                      className="bg-gold/10 text-gold border-gold px-3 py-1.5 text-sm"
                    >
                      {member}
                      <button
                        type="button"
                        onClick={() => removeMember(member)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {selectedMembers.length === 0 && (
                    <p className="text-sm text-muted-foreground">No members added yet</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Team Status *</Label>
                <select id="status" className="w-full p-2 border rounded-lg">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="formationDate">Formation Date *</Label>
                <Input type="date" id="formationDate" />
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-gold text-black hover:bg-gold-rich">
                Create Team
              </Button>
              <Button type="reset" variant="outline">
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Existing Teams */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Teams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Financial Audit Team", lead: "A. Silva", members: 5, status: "Active", specialization: "Financial Audits" },
              { name: "IT Security Team", lead: "K. Perera", members: 4, status: "Active", specialization: "IT Audits" },
              { name: "Operations Team", lead: "N. Fernando", members: 6, status: "Active", specialization: "Operational Audits" },
            ].map((team, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg">{team.name}</h3>
                    <Badge
                      variant="outline"
                      className="bg-success/10 text-success"
                    >
                      {team.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Team Lead:</span> <span className="font-medium">{team.lead}</span></p>
                    <p><span className="text-muted-foreground">Specialization:</span> <span className="font-medium">{team.specialization}</span></p>
                    <div className="flex items-center gap-2 pt-2">
                      <div className="inline-flex items-center px-2 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold">
                        <Users className="h-3 w-3 mr-1" />
                        {team.members} Members
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
