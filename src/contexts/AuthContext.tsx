import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "therapist" | "parent" | "child";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS: Record<string, User> = {
  "therapist@demo.com": { id: "t1", name: "Dr. Sarah Mitchell", email: "therapist@demo.com", role: "therapist" },
  "parent@demo.com": { id: "p1", name: "James Wilson", email: "parent@demo.com", role: "parent" },
  "child@demo.com": { id: "c1", name: "Emma Wilson", email: "child@demo.com", role: "child" },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("speech_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const found = DEMO_USERS[email.toLowerCase()];
    if (!found) {
      // For demo, create a therapist account for any email
      const newUser: User = { id: Date.now().toString(), name: email.split("@")[0], email, role: "therapist" };
      localStorage.setItem("speech_user", JSON.stringify(newUser));
      setUser(newUser);
    } else {
      localStorage.setItem("speech_user", JSON.stringify(found));
      setUser(found);
    }
    setIsLoading(false);
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string, role: UserRole) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const newUser: User = { id: Date.now().toString(), name, email, role };
    localStorage.setItem("speech_user", JSON.stringify(newUser));
    setUser(newUser);
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("speech_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
