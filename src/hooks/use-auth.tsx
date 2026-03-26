import { createContext, useContext, useEffect, useState } from "react";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export type Role = "client" | "admin";

export interface CustomUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_name: string;
  total_value: number;
  installment_value: number;
  number_of_installments: number;
  next_due_date: string | null;
  status: "active" | "suspended";
}

type AuthContextType = {
  user: SupabaseUser | null;
  userData: CustomUser | null;
  subscription: Subscription | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userData, setUserData] = useState<CustomUser | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async (userId: string) => {
    try {
      // Fetch core user data & Role
      const { data: uData, error: uError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (!uError && uData) {
        setUserData(uData as CustomUser);
      }

      // Fetch subscription data
      const { data: subData, error: subError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (!subError && subData) {
        setSubscription(subData as Subscription);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSession = async (currentSession: Session | null) => {
    setSession(currentSession);
    setUser(currentSession?.user ?? null);
    
    if (currentSession?.user) {
      await fetchProfileData(currentSession.user.id);
    } else {
      setUserData(null);
      setSubscription(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setLoading(true);
        handleSession(currentSession);
      }
    );

    return () => authSub.unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (user) {
      setLoading(true);
      await fetchProfileData(user.id);
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, userData, subscription, session, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
