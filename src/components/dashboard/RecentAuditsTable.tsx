import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Building2,
  Server,
  Users,
  Calendar,
  User,
  FileText,
  Target,
  Layers,
} from "lucide-react";
import { detailedAudits } from "@/data/dashboardMockData";
import { format } from "date-fns";
import { SearchFilters } from "./AdvancedSearch";

interface RecentAuditsTableProps {
  filters: SearchFilters;
}

export const RecentAuditsTable = ({ filters }: RecentAuditsTableProps) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredAudits = useMemo(() => {
    return detailedAudits.filter((audit) => {
      // Query filter
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const matchesQuery =
          audit.id.toLowerCase().includes(query) ||
          audit.entity.toLowerCase().includes(query) ||
          audit.leadAuditor.toLowerCase().includes(query) ||
          audit.type.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Status filter
      if (filters.status && audit.status !== filters.status) return false;

      // Category filter
      if (filters.category && audit.type !== filters.category) return false;

      // Date range filter
      if (filters.dateFrom) {
        const auditStart = new Date(audit.startDate);
        if (auditStart < filters.dateFrom) return false;
      }
      if (filters.dateTo) {
        const auditStart = new Date(audit.startDate);
        if (auditStart > filters.dateTo) return false;
      }

      return true;
    });
  }, [filters]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-3 w-3" />;
      case "In Progress":
      case "Fieldwork":
        return <Clock className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success/10 text-success border-success/20";
      case "In Progress":
      case "Fieldwork":
        return "bg-warning/10 text-warning border-warning/20";
      case "Planning":
        return "bg-primary/10 text-primary border-primary/20";
      case "Review":
        return "bg-info/10 text-info border-info/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "Medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "Low":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case "Branch":
        return <Building2 className="h-4 w-4 text-primary" />;
      case "IT System":
        return <Server className="h-4 w-4 text-info" />;
      case "Customer":
        return <Users className="h-4 w-4 text-success" />;
      default:
        return <Building2 className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Recent Audits
          </span>
          <Badge variant="outline">{filteredAudits.length} audits</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Audit ID</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Lead Auditor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAudits.map((audit) => (
                <Collapsible key={audit.id} open={expandedRow === audit.id} asChild>
                  <>
                    <CollapsibleTrigger asChild>
                      <TableRow
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => toggleRow(audit.id)}
                      >
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            {expandedRow === audit.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">{audit.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getEntityIcon(audit.entityType)}
                            <span>{audit.entity}</span>
                          </div>
                        </TableCell>
                        <TableCell>{audit.type}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(audit.status)}>
                            {getStatusIcon(audit.status)}
                            <span className="ml-1">{audit.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={audit.progress} className="w-20 h-2" />
                            <span className="text-sm text-muted-foreground">
                              {audit.progress}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getRiskColor(audit.risk)}>
                            {audit.risk === "High" && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {audit.risk}
                          </Badge>
                        </TableCell>
                        <TableCell>{audit.leadAuditor}</TableCell>
                      </TableRow>
                    </CollapsibleTrigger>
                    <CollapsibleContent asChild>
                      <TableRow className="bg-muted/30 hover:bg-muted/30">
                        <TableCell colSpan={8} className="p-0">
                          <div className="p-6 space-y-4 animate-in slide-in-from-top-2">
                            {/* Audit Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  Audit Period
                                </div>
                                <p className="font-medium">
                                  {format(new Date(audit.startDate), "MMM d, yyyy")} -{" "}
                                  {format(new Date(audit.endDate), "MMM d, yyyy")}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <User className="h-4 w-4" />
                                  Audit Team
                                </div>
                                <p className="font-medium">{audit.team.join(", ")}</p>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <AlertTriangle className="h-4 w-4" />
                                  Findings
                                </div>
                                <p className="font-medium">
                                  {audit.findings} total ({audit.criticalFindings} critical)
                                </p>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  Last Updated
                                </div>
                                <p className="font-medium">
                                  {format(new Date(audit.lastUpdated), "MMM d, yyyy")}
                                </p>
                              </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                              <h4 className="font-semibold flex items-center gap-2">
                                <FileText className="h-4 w-4 text-primary" />
                                Description
                              </h4>
                              <p className="text-sm text-muted-foreground">{audit.description}</p>
                            </div>

                            {/* Objectives & Scope */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <h4 className="font-semibold flex items-center gap-2">
                                  <Target className="h-4 w-4 text-success" />
                                  Objectives
                                </h4>
                                <ul className="text-sm space-y-1">
                                  {audit.objectives.map((obj, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <CheckCircle className="h-3 w-3 mt-1 text-success" />
                                      <span className="text-muted-foreground">{obj}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-semibold flex items-center gap-2">
                                  <Layers className="h-4 w-4 text-info" />
                                  Scope
                                </h4>
                                <p className="text-sm text-muted-foreground">{audit.scope}</p>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-2 border-t">
                              <Button size="sm">View Full Report</Button>
                              <Button size="sm" variant="outline">
                                View Findings
                              </Button>
                              <Button size="sm" variant="outline">
                                Download PDF
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    </CollapsibleContent>
                  </>
                </Collapsible>
              ))}
            </TableBody>
          </Table>

          {filteredAudits.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No audits found</p>
              <p className="text-sm">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
