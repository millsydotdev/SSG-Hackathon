"use client";

import { useState, useEffect, type ReactNode } from "react";
import { SessionStoreProvider } from "./session-store";
import type { AuthService } from "./auth-service";

export function IdentityProvider({ children }: { children: ReactNode }) {
  const [authService, setAuthService] = useState<AuthService | null>(null);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error(
        "[IdentityProvider] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
      );
      return;
    }

    let cancelled = false;

    import("./supabase-auth")
      .then((mod) =>
        mod.createSupabaseAuthService(supabaseUrl, supabaseAnonKey),
      )
      .then((service) => {
        if (!cancelled) setAuthService(service);
      })
      .catch((err) => {
        console.error("[IdentityProvider] Auth init failed:", err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SessionStoreProvider authService={authService}>
      {children}
    </SessionStoreProvider>
  );
}
