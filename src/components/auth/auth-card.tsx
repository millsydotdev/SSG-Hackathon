import type { ReactNode } from "react";
import { cn } from "@/packages/utils";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
  maxWidth?: number;
}

export function AuthCard({
  children,
  className,
  maxWidth = 400,
}: AuthCardProps) {
  return (
    <div
      className={cn(
        "border-outline-variant bg-surface p-xl w-full rounded border",
        className,
      )}
      style={{ maxWidth }}
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
    <div className="mb-lg gap-sm flex flex-col items-center">
      {logo && (
        <div className="bg-primary text-h2 text-on-primary flex h-12 w-12 items-center justify-center rounded font-bold tracking-tighter shadow-[0_0_15px_rgba(224,30,46,0.3)]">
          {logo}
        </div>
      )}
      <h1 className="text-h2 text-on-surface font-semibold">{title}</h1>
      {subtitle && (
        <p className="text-body-sm text-on-surface-variant text-center">
          {subtitle}
        </p>
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
        "mt-lg gap-sm border-outline-variant pt-lg flex flex-col items-center border-t",
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
