import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  ClipboardList, 
  AlertTriangle, 
  FileText, 
  Briefcase, 
  Calendar,
  ArrowRight
} from "lucide-react";
import { quickActions } from "@/data/dashboardMockData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Plus,
  ClipboardList,
  AlertTriangle,
  FileText,
  Briefcase,
  Calendar,
};

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <Card className="bg-gradient-to-br from-background to-muted/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {quickActions.map((action, index) => {
          const Icon = iconMap[action.icon];
          return (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-between group hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              onClick={() => navigate(action.route)}
            >
              <span className="flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4" />}
                {action.label}
              </span>
              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};
