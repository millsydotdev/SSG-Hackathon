"use client";

import type { ReactNode } from "react";
import { SessionStoreProvider } from "./session-store";
import { createSupabaseAuthService } from "./supabase-auth";
import type { AuthService } from "./auth-service";

let defaultAuthService: AuthService | null = null;

function getDefaultAuthService(): AuthService {
  if (!defaultAuthService) {
    defaultAuthService = createSupabaseAuthService();
  }
  return defaultAuthService;
}

export function IdentityProvider({
  children,
  authService,
}: {
  children: ReactNode;
  authService?: AuthService;
}) {
  return (
    <SessionStoreProvider authService={authService ?? getDefaultAuthService()}>
      {children}
    </SessionStoreProvider>
  );
}
