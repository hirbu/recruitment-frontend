"use client";

import { AUTH_CONFIG } from "@/configs/auth";
import User from "@/interfaces/User";
import { authService } from "@/services/auth";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkSession = useCallback(async () => {
    try {
      const user = await authService.getCurrentUser();
      setUser(user);
    } catch (error) {
      console.error("Session check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = async (email: string, password: string) => {
    try {
      const { user } = await authService.login(email, password);
      setUser(user);
      router.push(AUTH_CONFIG.redirects.afterLogin);
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      router.push(AUTH_CONFIG.redirects.afterLogout);
    } catch (error: any) {
      throw new Error(error.message || "Logout failed");
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
