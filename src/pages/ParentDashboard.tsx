import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import ProgressChart from "@/components/ProgressChart";
import { motion } from "framer-motion";
import { TrendingUp, Calendar, CheckCircle2, MessageSquare, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const sessions = [
  { date: "Feb 18", module: "Phoneme /r/", accuracy: 82, notes: "Great improvement on initial /r/ sounds" },
  { date: "Feb 16", module: "Phoneme /r/", accuracy: 76, notes: "Struggled with /r/ blends" },
  { date: "Feb 14", module: "Fluency", accuracy: 68, notes: "Slow but steady progress" },
  { date: "Feb 12", module: "Phoneme /s/", accuracy: 85, notes: "Excellent session" },
];

const exercises = [
  { title: "Mirror Practice", desc: "Practice 'r' words in front of a mirror for 10 minutes", done: true },
  { title: "Reading Aloud", desc: "Read the assigned story focusing on target sounds", done: false },
  { title: "Word Repetition", desc: "Repeat each word 5 times: rabbit, rain, red, run", done: false },
];

export default function ParentDashboard() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Parent Dashboard</h1>
        <p className="text-muted-foreground text-sm">Track your child's progress</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Overall Accuracy" value="78%" change="+12%" icon={TrendingUp} color="success" delay={0} />
        <StatsCard title="Sessions Completed" value={16} icon={Calendar} color="primary" delay={0.1} />
        <StatsCard title="Goals Met" value="3/5" icon={CheckCircle2} color="accent" delay={0.2} />
        <StatsCard title="Therapist Messages" value={2} icon={MessageSquare} color="info" delay={0.3} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <ProgressChart title="Emma's Accuracy Over Time" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card rounded-xl p-5 shadow-card border border-border/50">
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" /> Home Exercises
          </h3>
          <div className="space-y-3">
            {exercises.map(ex => (
              <div key={ex.title} className={`p-3 rounded-lg border transition-colors ${ex.done ? "bg-success/5 border-success/20" : "bg-card border-border/50"}`}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${ex.done ? "text-success" : "text-muted-foreground/30"}`} />
                  <div>
                    <p className="text-sm font-medium">{ex.title}</p>
                    <p className="text-xs text-muted-foreground">{ex.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Session History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h3 className="font-semibold text-sm">Recent Sessions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs">Date</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs">Module</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs">Accuracy</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs">Notes</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3 text-muted-foreground">{s.date}</td>
                  <td className="px-5 py-3"><Badge variant="secondary" className="text-xs">{s.module}</Badge></td>
                  <td className="px-5 py-3 font-medium">{s.accuracy}%</td>
                  <td className="px-5 py-3 text-muted-foreground text-xs">{s.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
