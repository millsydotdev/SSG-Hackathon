"use client";

import { cn } from "@/lib/utils";

interface TopNavProps {
  className?: string;
  title?: string;
}

export function TopNav({ className, title = "SSG-Hackathon" }: TopNavProps) {
  return (
    <header
      className={cn(
        "border-outline-variant bg-surface px-md flex h-12 shrink-0 items-center justify-between border-b",
        className,
      )}
    >
      <div className="gap-lg flex items-center">
        <h1 className="text-h1 text-on-surface hidden font-semibold md:block">
          {title}
        </h1>
      </div>

      <div className="gap-md flex items-center">
        <div className="relative hidden sm:block">
          <span className="material-symbols-outlined left-sm text-on-surface-variant pointer-events-none absolute top-1/2 -translate-y-1/2 text-[16px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="border-outline-variant pr-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-primary w-48 rounded border bg-black py-[4px] pl-8 transition-all duration-300 focus:w-64 focus:ring-1 focus:outline-none"
          />
        </div>

        <button
          type="button"
          className="border-surface-variant bg-surface-container-highest text-on-surface hover:border-primary flex h-8 w-8 items-center justify-center rounded border font-mono text-[10px] transition-colors"
          aria-label="User menu"
        >
          JD
        </button>
      </div>
    </header>
  );
}
