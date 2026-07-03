import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/packages/utils";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        "gap-xl border-outline-variant bg-surface p-xl flex w-full flex-col rounded-lg border",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  logo?: string;
}

export function AuthHeader({ title, subtitle, logo }: AuthHeaderProps) {
  return (
    <div className="gap-sm flex flex-col items-center">
      {logo && (
        <div className="bg-primary text-h2 text-on-primary flex h-12 w-12 items-center justify-center rounded font-bold tracking-tighter shadow-[0_0_15px_rgba(224,30,46,0.3)]">
          {logo}
        </div>
      )}
      <h1 className="mt-sm text-h2 text-on-surface font-semibold">{title}</h1>
      {subtitle && (
        <p className="text-body-sm text-center text-[#b5b5b5]">{subtitle}</p>
      )}
    </div>
  );
}

interface AuthFooterProps {
  children: ReactNode;
  className?: string;
}

export function AuthFooter({ children, className }: AuthFooterProps) {
  return (
    <div
      className={cn(
        "mt-sm gap-xs border-outline-variant pt-md flex flex-col items-center border-t",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AuthDivider() {
  return (
    <div className="gap-sm py-sm flex items-center" role="separator">
      <div className="bg-outline-variant/50 h-px flex-1" />
      <span className="text-body-sm text-on-surface-variant">or</span>
      <div className="bg-outline-variant/50 h-px flex-1" />
    </div>
  );
}

export function AuthPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="px-container-margin z-10 w-full max-w-[400px]">
        {children}
      </div>
      <footer className="border-outline-variant bg-surface-container-lowest px-md text-on-surface-variant fixed bottom-0 z-10 flex h-6 w-full items-center justify-between border-t font-mono text-[11px]">
        <span>v0.1.0-dev</span>
        <div className="gap-lg flex items-center">
          <Link
            href="/privacy"
            className="hover:text-on-surface transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-on-surface transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/status"
            className="hover:text-on-surface transition-colors"
          >
            Status
          </Link>
        </div>
      </footer>
    </div>
  );
}
