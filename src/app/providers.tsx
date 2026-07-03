"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/packages/theme";
import { CommandPaletteProvider, ToastProvider } from "@/packages/providers";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <CommandPaletteProvider>
        <ToastProvider>{children}</ToastProvider>
      </CommandPaletteProvider>
    </ThemeProvider>
  );
}
