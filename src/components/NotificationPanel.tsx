import { notifications } from "@/data/mockData";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationPanelProps {
  onClose: () => void;
}

export const NotificationPanel = ({ onClose }: NotificationPanelProps) => {
  return (
    <div className="fixed top-[74px] right-5 w-80 bg-white rounded-2xl shadow-2xl z-[100] max-h-[400px] overflow-y-auto animate-slide-up">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-semibold">Notifications</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div>
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 border-b hover:bg-muted/50 cursor-pointer ${
              !notif.read ? "bg-gold/5" : ""
            }`}
          >
            <div className="font-semibold text-sm mb-1">{notif.title}</div>
            <div className="text-sm text-muted-foreground mb-2">{notif.message}</div>
            <div className="text-xs text-gray-500">{notif.time}</div>
          </div>
        ))}
      </div>
      
      <div className="p-3 text-center border-t">
        <Button variant="link" className="text-gold text-sm">
          View All Notifications
        </Button>
      </div>
    </div>
  );
};
