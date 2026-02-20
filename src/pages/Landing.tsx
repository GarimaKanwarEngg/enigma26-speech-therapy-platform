import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mic, Brain, BarChart3, Shield, Users, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.jpg";

const features = [
  { icon: Mic, title: "Speech Recognition", desc: "Real-time voice analysis with instant feedback on pronunciation" },
  { icon: Brain, title: "AI-Powered Feedback", desc: "Intelligent pronunciation correction and personalized suggestions" },
  { icon: BarChart3, title: "Progress Tracking", desc: "Detailed analytics showing improvement over time" },
  { icon: Users, title: "Multi-Role Access", desc: "Separate dashboards for therapists, parents, and children" },
  { icon: Shield, title: "Secure Platform", desc: "JWT authentication with role-based access control" },
  { icon: Sparkles, title: "Gamified Learning", desc: "Level-based progression with rewards and achievements" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border/50 glass sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Mic className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">SpeechFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button size="sm" onClick={() => navigate("/signup")} className="gradient-primary text-primary-foreground border-0">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
              <Sparkles className="w-3 h-3" /> ENIGMA Hackathon — Team ZERO
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-6">
              Transform Speech Therapy with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">AI Power</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              An intelligent platform connecting therapists, parents, and children with real-time speech recognition, AI feedback, and gamified learning experiences.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => navigate("/signup")} className="gradient-primary text-primary-foreground border-0 gap-2">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                Demo Login
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Try with: therapist@demo.com · parent@demo.com · child@demo.com (any password)
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={heroImage}
              alt="Speech therapy illustration showing therapist helping child with pronunciation exercises"
              className="rounded-2xl shadow-lg w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-bold mb-3">Everything You Need</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            A comprehensive platform designed for modern speech therapy practices
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-card border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2026 SpeechFlow — Team ZERO | ENIGMA Hackathon</p>
        </div>
      </footer>
    </div>
  );
}
