import { Bell, LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { NotificationPanel } from "./NotificationPanel";

interface DashboardHeaderProps {
  onLogout: () => void;
}

export const DashboardHeader = ({ onLogout }: DashboardHeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-black text-white shadow-lg">
        <div className="flex items-center gap-4 px-6 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-2">
              <img
                src="https://images.openai.com/thumbnails/url/cRMjYHicu1mUUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw6qCDV3DTdOyzaNLMly93FNNcuJKHU1Ny4Odi7OCTGIDIw3LShNM8o0qDKzqPAxTzfPtkwJiCyszPdTKwYAtxIo5Q"
                alt="BOC Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-extrabold text-gold text-lg leading-tight">
                Integrated Audit Management — BOC
              </div>
              <div className="text-xs text-gray-400">Bankers To The Nation | v2.1.0</div>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md relative ml-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search audits, users, reports..."
              className="pl-10 bg-[#1b1b1b] border-[#333] text-white"
            />
          </div>

          {/* Right Side */}
          <div className="ml-auto flex items-center gap-4">
            {/* System Status */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse-dot" />
              <span className="text-sm font-medium">System Online</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative hover:bg-white/10"
              >
                <Bell className="h-5 w-5 text-gold-light animate-glow" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-white text-xs">
                  3
                </Badge>
              </Button>
            </div>

            {/* Logout */}
            <Button
              variant="ghost"
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Notification Panel */}
      {showNotifications && (
        <NotificationPanel onClose={() => setShowNotifications(false)} />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[200]">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-black">Confirm Logout</h3>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to logout from the Audit Management System?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setShowLogoutModal(false);
                  onLogout();
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
