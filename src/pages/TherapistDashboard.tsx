import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import ProgressChart from "@/components/ProgressChart";
import { motion } from "framer-motion";
import { Users, Calendar, TrendingUp, Activity, Clock, Star } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const sessionData = [
  { day: "Mon", sessions: 4 },
  { day: "Tue", sessions: 6 },
  { day: "Wed", sessions: 3 },
  { day: "Thu", sessions: 7 },
  { day: "Fri", sessions: 5 },
  { day: "Sat", sessions: 2 },
  { day: "Sun", sessions: 1 },
];

const patients = [
  { name: "Emma Wilson", age: 7, module: "Phoneme /r/", accuracy: 82, trend: "up" },
  { name: "Liam Chen", age: 5, module: "Phoneme /s/", accuracy: 65, trend: "up" },
  { name: "Sofia Garcia", age: 8, module: "Fluency", accuracy: 71, trend: "down" },
  { name: "Noah Patel", age: 6, module: "Phoneme /th/", accuracy: 58, trend: "up" },
  { name: "Ava Johnson", age: 9, module: "Articulation", accuracy: 90, trend: "up" },
];

export default function TherapistDashboard() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Therapist Dashboard</h1>
        <p className="text-muted-foreground text-sm">Overview of your practice</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Active Patients" value={24} change="+3" icon={Users} color="primary" delay={0} />
        <StatsCard title="Sessions This Week" value={28} change="+5" icon={Calendar} color="info" delay={0.1} />
        <StatsCard title="Avg. Accuracy" value="74%" change="+8%" icon={TrendingUp} color="success" delay={0.2} />
        <StatsCard title="Completion Rate" value="92%" change="+2%" icon={Activity} color="accent" delay={0.3} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <ProgressChart title="Overall Patient Accuracy" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card rounded-xl p-5 shadow-card border border-border/50">
          <h3 className="font-semibold text-sm mb-4">Sessions This Week</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={sessionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(168, 20%, 88%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(200, 10%, 50%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(200, 10%, 50%)" />
              <Tooltip contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(168, 20%, 88%)", borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="sessions" fill="hsl(168, 55%, 42%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Patients Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
        <div className="p-5 flex items-center justify-between border-b border-border/50">
          <h3 className="font-semibold text-sm">Recent Patients</h3>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs">Patient</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs">Age</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs">Module</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs">Accuracy</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs">Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.name} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3 font-medium">{p.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.age}</td>
                  <td className="px-5 py-3"><Badge variant="secondary" className="text-xs">{p.module}</Badge></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full gradient-primary" style={{ width: `${p.accuracy}%` }} />
                      </div>
                      <span className="text-xs font-medium">{p.accuracy}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    {p.trend === "up" ? (
                      <Badge className="bg-success/10 text-success border-0 text-xs">↑ Improving</Badge>
                    ) : (
                      <Badge className="bg-warning/10 text-warning border-0 text-xs">→ Needs Attention</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
