import { useState, useRef, useCallback, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, RotateCcw, CheckCircle2, XCircle, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const WORD_SETS = [
  { word: "rabbit", phoneme: "/r/", tip: "Curl your tongue back slightly and vibrate it" },
  { word: "rain", phoneme: "/r/", tip: "Start with your tongue pulled back, then release air" },
  { word: "red", phoneme: "/r/", tip: "Keep your tongue relaxed and slightly curled" },
  { word: "sun", phoneme: "/s/", tip: "Place tongue tip behind upper front teeth, blow air through" },
  { word: "sing", phoneme: "/s/", tip: "Keep a small gap and push air through steadily" },
  { word: "think", phoneme: "/θ/", tip: "Place tongue between teeth and blow gently" },
  { word: "three", phoneme: "/θ/", tip: "Keep your tongue visible between teeth" },
  { word: "banana", phoneme: "/b/", tip: "Press lips together, then release with voice" },
];

type Result = "correct" | "incorrect" | null;

export default function TherapySession() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const currentWord = WORD_SETS[currentIndex];
  const accuracy = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0;
  const progress = ((currentIndex) / WORD_SETS.length) * 100;

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({ title: "Speech Recognition not supported", description: "Please use Chrome or Edge.", variant: "destructive" });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const text = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join("")
        .toLowerCase()
        .trim();
      setTranscript(text);

      if (event.results[0].isFinal) {
        const target = currentWord.word.toLowerCase();
        const isCorrect = text.includes(target) || levenshtein(text, target) <= 2;
        setResult(isCorrect ? "correct" : "incorrect");
        setTotalAttempts(prev => prev + 1);
        if (isCorrect) setScore(prev => prev + 1);
      }
    };

    recognition.onerror = (e: any) => {
      console.error("Speech error:", e.error);
      setIsListening(false);
      if (e.error === "not-allowed") {
        toast({ title: "Microphone access denied", description: "Please allow microphone access.", variant: "destructive" });
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [currentWord, toast]);

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const nextWord = () => {
    setResult(null);
    setTranscript("");
    setCurrentIndex(prev => (prev + 1) % WORD_SETS.length);
  };

  const retry = () => {
    setResult(null);
    setTranscript("");
  };

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => { recognitionRef.current?.stop(); };
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Speech Practice</h1>
            <p className="text-muted-foreground text-sm">Say the word clearly into your microphone</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{accuracy}%</p>
            <p className="text-xs text-muted-foreground">Accuracy</p>
          </div>
        </div>

        <Progress value={progress} className="mb-6 h-2" />

        {/* Word Card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl p-8 shadow-card border border-border/50 text-center mb-6"
        >
          <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            {currentWord.phoneme} Sound · Word {currentIndex + 1}/{WORD_SETS.length}
          </span>

          <h2 className="text-5xl font-extrabold mt-6 mb-4">{currentWord.word}</h2>

          <Button variant="ghost" size="sm" onClick={speakWord} className="gap-2 text-muted-foreground mb-6">
            <Volume2 className="w-4 h-4" /> Listen
          </Button>

          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <p className="text-xs text-muted-foreground mb-1">💡 Tip</p>
            <p className="text-sm">{currentWord.tip}</p>
          </div>

          {/* Mic Button */}
          <div className="flex justify-center mb-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={isListening ? stopListening : startListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? "gradient-accent animate-pulse-soft shadow-glow"
                  : "gradient-primary hover:shadow-glow"
              }`}
            >
              {isListening ? <MicOff className="w-8 h-8 text-primary-foreground" /> : <Mic className="w-8 h-8 text-primary-foreground" />}
            </motion.button>
          </div>

          {isListening && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground animate-pulse-soft">
              Listening...
            </motion.p>
          )}

          {transcript && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-medium mt-2">
              You said: "<span className="text-primary">{transcript}</span>"
            </motion.p>
          )}
        </motion.div>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`rounded-xl p-5 mb-6 text-center ${
                result === "correct" ? "bg-success/10 border border-success/30" : "bg-destructive/10 border border-destructive/30"
              }`}
            >
              {result === "correct" ? (
                <>
                  <CheckCircle2 className="w-10 h-10 text-success mx-auto mb-2" />
                  <h3 className="font-bold text-lg text-success">Excellent! 🎉</h3>
                  <p className="text-sm text-muted-foreground">Great pronunciation!</p>
                  <div className="flex gap-1 justify-center mt-2">
                    {[...Array(3)].map((_, i) => <Star key={i} className="w-5 h-5 text-warning fill-warning" />)}
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-10 h-10 text-destructive mx-auto mb-2" />
                  <h3 className="font-bold text-lg text-destructive">Try Again!</h3>
                  <p className="text-sm text-muted-foreground">Focus on the tip above and try once more</p>
                </>
              )}
              <div className="flex justify-center gap-3 mt-4">
                <Button variant="outline" size="sm" onClick={retry} className="gap-1">
                  <RotateCcw className="w-3 h-3" /> Retry
                </Button>
                <Button size="sm" onClick={nextWord} className="gradient-primary text-primary-foreground border-0 gap-1">
                  Next Word <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Score Summary */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
            <p className="text-2xl font-bold text-success">{score}</p>
            <p className="text-xs text-muted-foreground">Correct</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
            <p className="text-2xl font-bold text-destructive">{totalAttempts - score}</p>
            <p className="text-xs text-muted-foreground">Missed</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
            <p className="text-2xl font-bold text-primary">{totalAttempts}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Simple Levenshtein distance for fuzzy matching
function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
}
