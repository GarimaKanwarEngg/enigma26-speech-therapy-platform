import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TherapistDashboard from "./pages/TherapistDashboard";
import ChildDashboard from "./pages/ChildDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import TherapySession from "./pages/TherapySession";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function DashboardRouter() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  switch (user.role) {
    case "therapist": return <TherapistDashboard />;
    case "parent": return <ParentDashboard />;
    case "child": return <ChildDashboard />;
    default: return <Navigate to="/login" />;
  }
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<DashboardRouter />} />
            <Route path="/therapy-session" element={<ProtectedRoute><TherapySession /></ProtectedRoute>} />
            {/* Placeholder routes for nav items */}
            <Route path="/patients" element={<ProtectedRoute><TherapistDashboard /></ProtectedRoute>} />
            <Route path="/sessions" element={<ProtectedRoute><TherapistDashboard /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><TherapistDashboard /></ProtectedRoute>} />
            <Route path="/ai-insights" element={<ProtectedRoute><TherapistDashboard /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><TherapistDashboard /></ProtectedRoute>} />
            <Route path="/progress" element={<ProtectedRoute><ParentDashboard /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><ParentDashboard /></ProtectedRoute>} />
            <Route path="/practice" element={<ProtectedRoute><ParentDashboard /></ProtectedRoute>} />
            <Route path="/achievements" element={<ProtectedRoute><ChildDashboard /></ProtectedRoute>} />
            <Route path="/my-words" element={<ProtectedRoute><ChildDashboard /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
