import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import { motion } from "framer-motion";
import { Mic, Trophy, Star, Zap, Flame, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const modules = [
  { id: 1, title: "Phoneme /r/", desc: "Practice the 'r' sound in words", progress: 75, words: ["rabbit", "rain", "red", "run"], level: 3 },
  { id: 2, title: "Phoneme /s/", desc: "Master the 's' sound", progress: 45, words: ["sun", "sing", "sock", "see"], level: 2 },
  { id: 3, title: "Phoneme /th/", desc: "Practice 'th' pronunciation", progress: 20, words: ["think", "three", "this", "that"], level: 1 },
  { id: 4, title: "Fluency", desc: "Improve speech flow", progress: 60, words: ["beautiful", "butterfly", "banana"], level: 2 },
];

const achievements = [
  { icon: Flame, label: "5 Day Streak", earned: true },
  { icon: Star, label: "First Perfect Score", earned: true },
  { icon: Trophy, label: "Level 3 Reached", earned: true },
  { icon: Zap, label: "Speed Round", earned: false },
];

export default function ChildDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Hey, {user?.name?.split(" ")[0]}! 👋</h1>
        <p className="text-muted-foreground text-sm">Ready to practice today?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Current Level" value={3} icon={Star} color="warning" delay={0} />
        <StatsCard title="Words Mastered" value={47} change="+5" icon={BookOpen} color="primary" delay={0.1} />
        <StatsCard title="Best Streak" value="5 days" icon={Flame} color="accent" delay={0.2} />
        <StatsCard title="Accuracy" value="78%" change="+12%" icon={Trophy} color="success" delay={0.3} />
      </div>

      {/* Modules */}
      <div className="mb-8">
        <h2 className="font-semibold mb-4">Your Therapy Modules</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {modules.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-card rounded-xl p-5 shadow-card border border-border/50 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold">{m.title}</h3>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">Lv.{m.level}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted mb-3">
                <div className="h-full rounded-full gradient-primary transition-all" style={{ width: `${m.progress}%` }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{m.progress}% complete</span>
                <Button
                  size="sm"
                  onClick={() => navigate("/therapy-session", { state: { module: m } })}
                  className="gradient-primary text-primary-foreground border-0 text-xs gap-1"
                >
                  <Mic className="w-3 h-3" /> Start Practice
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <h2 className="font-semibold mb-4">Achievements</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {achievements.map(a => (
            <div key={a.label} className={`bg-card rounded-xl p-4 text-center shadow-card border border-border/50 ${!a.earned ? "opacity-40" : ""}`}>
              <a.icon className={`w-8 h-8 mx-auto mb-2 ${a.earned ? "text-warning" : "text-muted-foreground"}`} />
              <p className="text-xs font-medium">{a.label}</p>
              {a.earned && <p className="text-[10px] text-success mt-1">✓ Earned</p>}
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
