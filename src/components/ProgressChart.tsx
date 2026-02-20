import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const data = [
  { week: "W1", accuracy: 42, sessions: 3 },
  { week: "W2", accuracy: 48, sessions: 4 },
  { week: "W3", accuracy: 55, sessions: 5 },
  { week: "W4", accuracy: 62, sessions: 4 },
  { week: "W5", accuracy: 70, sessions: 6 },
  { week: "W6", accuracy: 75, sessions: 5 },
  { week: "W7", accuracy: 82, sessions: 7 },
  { week: "W8", accuracy: 88, sessions: 6 },
];

interface ProgressChartProps {
  title?: string;
}

export default function ProgressChart({ title = "Accuracy Progress" }: ProgressChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card rounded-xl p-5 shadow-card border border-border/50"
    >
      <h3 className="font-semibold text-sm mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(168, 55%, 42%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(168, 55%, 42%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(168, 20%, 88%)" />
          <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(200, 10%, 50%)" />
          <YAxis tick={{ fontSize: 12 }} stroke="hsl(200, 10%, 50%)" />
          <Tooltip
            contentStyle={{
              background: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(168, 20%, 88%)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Area type="monotone" dataKey="accuracy" stroke="hsl(168, 55%, 42%)" fill="url(#colorAccuracy)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
