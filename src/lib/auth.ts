import { createContext, useContext } from "react";
import type { Session } from "@supabase/supabase-js";

export type AuthValue = {
  session: Session | null;
  /** True until the stored session has been restored. Guard redirects on this. */
  loading: boolean;
  /** False when VITE_SUPABASE_* are unset — the admin panel cannot work. */
  configured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

/**
 * Lives in its own module (no components) so the provider file stays compliant
 * with the react-refresh/only-export-components lint rule.
 */
export const AuthContext = createContext<AuthValue | null>(null);

export function useAuth(): AuthValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside <AuthProvider>");
  return value;
}
