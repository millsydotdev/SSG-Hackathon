"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/packages/theme";
import { CommandPaletteProvider, ToastProvider } from "@/packages/providers";
import { FeatureFlagsProvider } from "@/core/flags";
import { NotificationProvider } from "@/core/notification";
import { PermissionProvider } from "@/core/permissions";
import { WorkspaceContextProvider } from "@/core/workspace";
import { IdentityProvider } from "@/identity";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const env =
    (process.env.NEXT_PUBLIC_VERCEL_ENV as
      "development" | "preview" | "production" | undefined) ?? "development";

  return (
    <ThemeProvider>
      <FeatureFlagsProvider env={env}>
        <IdentityProvider>
          <PermissionProvider roleName={null}>
            <WorkspaceContextProvider workspace={null}>
              <NotificationProvider>
                <CommandPaletteProvider>
                  <ToastProvider>{children}</ToastProvider>
                </CommandPaletteProvider>
              </NotificationProvider>
            </WorkspaceContextProvider>
          </PermissionProvider>
        </IdentityProvider>
      </FeatureFlagsProvider>
    </ThemeProvider>
  );
}
