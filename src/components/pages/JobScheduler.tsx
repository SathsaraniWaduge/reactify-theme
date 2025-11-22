import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Play, Pause, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export const JobScheduler = () => {
  const [currentMonth, setCurrentMonth] = useState("September 2024");

  const daysInMonth = 30;
  const firstDayOfWeek = 0; // Sunday

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Job Scheduler & Background Jobs</h1>
          <p className="text-sm text-muted-foreground">
            Dashboard / System Administration / Job Scheduler
          </p>
        </div>
        <Button className="bg-gold text-black hover:bg-gold-rich">
          <Plus className="h-4 w-4 mr-2" />
          Schedule New Job
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Jobs", value: "12", color: "text-success" },
          { label: "Scheduled", value: "8", color: "text-gold" },
          { label: "Running", value: "3", color: "text-warning" },
          { label: "Completed Today", value: "15", color: "text-muted-foreground" },
        ].map((stat) => (
          <Card key={stat.label} className="hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className={`text-3xl font-bold ${stat.color} mt-2`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-gold" />
              Job Calendar
            </CardTitle>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
              <span className="font-semibold">{currentMonth}</span>
              <Button variant="ghost" size="icon"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: daysInMonth + firstDayOfWeek }).map((_, index) => {
              const dayNumber = index - firstDayOfWeek + 1;
              const isCurrentDay = dayNumber === 7;
              const hasJobs = [5, 7, 12, 15, 20, 25].includes(dayNumber);

              if (index < firstDayOfWeek) {
                return <div key={index} className="aspect-square" />;
              }

              return (
                <div
                  key={index}
                  className={`aspect-square border rounded-lg p-2 cursor-pointer hover:border-gold transition-all ${
                    isCurrentDay ? "bg-gold/10 border-gold" : "border-border"
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">{dayNumber}</div>
                  {hasJobs && (
                    <div className="flex flex-col gap-1">
                      <div className="text-[10px] px-1 py-0.5 rounded bg-gold text-black text-center">Job</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Schedule Job Form */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule Background Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobName">Job Name *</Label>
                <Input id="jobName" placeholder="Enter job name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type *</Label>
                <select id="jobType" className="w-full p-2 border rounded-lg">
                  <option value="">Select job type</option>
                  <option value="report">Report Generation</option>
                  <option value="backup">Data Backup</option>
                  <option value="sync">Data Synchronization</option>
                  <option value="cleanup">Database Cleanup</option>
                  <option value="notification">Email Notifications</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scheduleDate">Schedule Date *</Label>
                <Input type="date" id="scheduleDate" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduleTime">Schedule Time *</Label>
                <Input type="time" id="scheduleTime" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency *</Label>
                <select id="frequency" className="w-full p-2 border rounded-lg">
                  <option value="once">One Time</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <select id="priority" className="w-full p-2 border rounded-lg">
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeout">Timeout (minutes)</Label>
                <Input type="number" id="timeout" placeholder="Default: 30" />
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-gold text-black hover:bg-gold-rich">
                Schedule Job
              </Button>
              <Button type="reset" variant="outline">
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Active Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Active & Scheduled Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Job Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Schedule</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Last Run</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Daily Report Generation", type: "Report", schedule: "Daily 02:00 AM", lastRun: "2024-09-07 02:00", status: "Active" },
                  { name: "Database Backup", type: "Backup", schedule: "Daily 01:00 AM", lastRun: "2024-09-07 01:00", status: "Active" },
                  { name: "Email Notifications", type: "Notification", schedule: "Hourly", lastRun: "2024-09-07 10:00", status: "Running" },
                  { name: "Data Cleanup", type: "Cleanup", schedule: "Weekly (Sunday)", lastRun: "2024-09-01 03:00", status: "Scheduled" },
                ].map((job, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{job.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-gold/10 text-gold">{job.type}</Badge>
                    </td>
                    <td className="py-3 px-4">{job.schedule}</td>
                    <td className="py-3 px-4 text-sm">{job.lastRun}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={
                        job.status === "Running" ? "bg-warning/10 text-warning" :
                        job.status === "Active" ? "bg-success/10 text-success" :
                        "bg-muted"
                      }>
                        {job.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm"><Pause className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm"><Play className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </div>
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
