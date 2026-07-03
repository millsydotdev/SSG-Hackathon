"use client";

import { useState, type ReactNode } from "react";
import { SessionStoreProvider } from "./session-store";
import { createSupabaseAuthService } from "./supabase-auth";

let singletonAuth: ReturnType<typeof createSupabaseAuthService> | null;

function getAuth() {
  if (singletonAuth === undefined) {
    try {
      singletonAuth = createSupabaseAuthService();
    } catch (err) {
      console.error("[IdentityProvider] Failed to create auth service:", err);
      singletonAuth = null;
    }
  }
  return singletonAuth;
}

export function IdentityProvider({ children }: { children: ReactNode }) {
  const [authService] = useState(getAuth);

  if (!authService) {
    console.warn("[IdentityProvider] Auth unavailable");
  }

  return (
    <SessionStoreProvider authService={authService}>
      {children}
    </SessionStoreProvider>
  );
}
