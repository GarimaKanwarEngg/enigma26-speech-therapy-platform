import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await login(email, password);
      toast({ title: "Welcome back!", description: "You've been signed in successfully." });
      navigate("/dashboard");
    } catch {
      toast({ title: "Login failed", variant: "destructive" });
    }
  };

  const demoLogin = async (email: string) => {
    setEmail(email);
    await login(email, "demo");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
            <Mic className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-primary-foreground mb-3">SpeechFlow</h2>
          <p className="text-primary-foreground/70 max-w-sm">AI-powered speech therapy platform for better outcomes</p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
          <p className="text-muted-foreground text-sm mb-8">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-10" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Sign In
            </Button>
          </form>

          <div className="mt-6">
            <p className="text-xs text-muted-foreground mb-3 text-center">Quick demo access:</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Therapist", email: "therapist@demo.com" },
                { label: "Parent", email: "parent@demo.com" },
                { label: "Child", email: "child@demo.com" },
              ].map(d => (
                <Button key={d.email} variant="outline" size="sm" className="text-xs" onClick={() => demoLogin(d.email)}>
                  {d.label}
                </Button>
              ))}
            </div>
          </div>

          <p className="text-sm text-center mt-6 text-muted-foreground">
            Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
