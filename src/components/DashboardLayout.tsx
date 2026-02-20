import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, Calendar, BarChart3, Settings, LogOut,
  Mic, Trophy, BookOpen, MessageSquare, FileText, Brain, Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AIChatbot from "@/components/AIChatbot";



interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

const NAV_ITEMS: Record<string, NavItem[]> = {
  therapist: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Patients", icon: Users, path: "/patients" },
    { label: "Sessions", icon: Calendar, path: "/sessions" },
    { label: "Analytics", icon: BarChart3, path: "/analytics" },
    { label: "AI Insights", icon: Brain, path: "/ai-insights" },
    { label: "Reports", icon: FileText, path: "/reports" },
  ],
  parent: [
    { label: "Dashboard", icon: Home, path: "/dashboard" },
    { label: "Progress", icon: BarChart3, path: "/progress" },
    { label: "Messages", icon: MessageSquare, path: "/messages" },
    { label: "Practice Guide", icon: BookOpen, path: "/practice" },
  ],
  child: [
    { label: "My Space", icon: Home, path: "/dashboard" },
    { label: "Practice", icon: Mic, path: "/therapy-session" },
    { label: "Achievements", icon: Trophy, path: "/achievements" },
    { label: "My Words", icon: BookOpen, path: "/my-words" },
  ],
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const navItems = NAV_ITEMS[user.role] || [];
  const initials = user.name.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className="w-64 flex-shrink-0 flex flex-col bg-sidebar text-sidebar-foreground"
      >
        <div className="p-5 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <Mic className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-sm">SpeechFlow</h1>
              <p className="text-xs text-sidebar-foreground/60 capitalize">{user.role} Portal</p>
            return (
  <div className="flex h-screen w-full overflow-hidden">
    {/* Sidebar */}
    <motion.aside>...</motion.aside>

    {/* Main */}
    <main className="flex-1 overflow-auto">...</main>

    {/* Add this line */}
    <AIChatbot />

    <div className="flex h-screen w-full overflow-hidden">
  {/* existing sidebar + main */}
  <AIChatbot />
</div>

  </div>
);

            
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary font-semibold"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-sidebar-accent text-sidebar-primary text-xs">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{user.name}</p>
              <p className="text-[10px] text-sidebar-foreground/50 truncate">{user.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { logout(); navigate("/"); }}
            className="w-full justify-start text-sidebar-foreground/60 hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </motion.aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6 lg:p-8"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
