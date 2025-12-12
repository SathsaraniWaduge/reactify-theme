import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Plus, RefreshCw, FileText, Calendar, XCircle, CheckCircle, Users, AlertTriangle
} from "lucide-react";
import { recentEntityActivity } from "@/data/auditEntitiesMockData";

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'create': return <Plus className="h-4 w-4 text-green-500" />;
    case 'update': return <RefreshCw className="h-4 w-4 text-blue-500" />;
    case 'audit': return <CheckCircle className="h-4 w-4 text-purple-500" />;
    case 'status': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'document': return <FileText className="h-4 w-4 text-cyan-500" />;
    case 'deactivate': return <XCircle className="h-4 w-4 text-red-500" />;
    case 'schedule': return <Calendar className="h-4 w-4 text-orange-500" />;
    case 'resolve': return <CheckCircle className="h-4 w-4 text-green-500" />;
    default: return <RefreshCw className="h-4 w-4 text-muted-foreground" />;
  }
};

const getActivityBadgeVariant = (type: string) => {
  switch (type) {
    case 'create': return 'default';
    case 'update': return 'secondary';
    case 'audit': return 'outline';
    case 'status': return 'secondary';
    case 'document': return 'outline';
    case 'deactivate': return 'destructive';
    case 'schedule': return 'secondary';
    case 'resolve': return 'default';
    default: return 'outline';
  }
};

export const RecentActivityPanel = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Users className="h-4 w-4" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-4 pb-4">
          <div className="space-y-3">
            {recentEntityActivity.map((activity) => (
              <div 
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="mt-0.5">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={getActivityBadgeVariant(activity.type) as any} className="text-xs">
                      {activity.action}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </span>
                  </div>
                  <p className="text-sm font-medium mt-1 truncate">
                    {activity.entityName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    by {activity.user} • {activity.entityId}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
