"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { sidebarNav, secondaryNav } from "@/config/navigation";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "border-outline-variant bg-surface-container-low flex h-full w-60 shrink-0 flex-col border-r",
        className,
      )}
    >
      <div className="gap-xs border-outline-variant px-md pb-lg pt-md flex flex-col border-b">
        <h2 className="text-h2 text-on-surface font-semibold">SSG-Hackathon</h2>
        <p className="text-on-surface-variant font-mono text-[11px]">
          Enterprise Workstation
        </p>
      </div>

      <nav className="px-xs py-sm flex flex-1 scrollbar-thin flex-col gap-[2px] overflow-y-auto">
        {sidebarNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "gap-md px-md py-sm text-body-sm flex items-center rounded transition-all duration-150",
                "border-l-2",
                isActive
                  ? "border-l-primary bg-surface-container-high text-on-surface font-semibold"
                  : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface border-l-transparent",
              )}
            >
              <span className="material-symbols-outlined text-[18px]">
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.badge && (
                <span className="bg-surface-container-highest px-xs text-on-surface-variant ml-auto rounded py-[1px] font-mono text-[10px]">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-outline-variant px-xs py-sm border-t">
        {secondaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="gap-md px-md py-sm text-body-sm text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface flex items-center rounded transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="border-outline-variant px-md py-md border-t">
        <button
          type="button"
          className="gap-xs bg-primary px-md py-sm text-body-sm text-on-primary inline-flex w-full items-center justify-center rounded font-medium transition-colors hover:bg-[#c01826]"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
          Active Event
        </button>
      </div>
    </aside>
  );
}
