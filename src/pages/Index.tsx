import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Landing from "./Landing";

const Index = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" />;
  return <Landing />;
};

export default Index;
