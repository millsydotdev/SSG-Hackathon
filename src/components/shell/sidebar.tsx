"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navSections, secondaryNav } from "@/config/navigation";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/app") return pathname === "/app";
    return pathname.startsWith(href);
  }

  return (
    <aside
      className={cn(
        "flex h-full w-60 shrink-0 flex-col border-r border-outline-variant bg-surface-container-low",
        className,
      )}
    >
      <div className="flex flex-col gap-xs border-b border-outline-variant px-md pb-lg pt-md">
        <div className="flex items-center gap-sm">
          <Image src="/logo-192.png" alt="SSG-Hackathon" width={28} height={28} className="rounded object-contain" />
          <h2 className="text-h2 font-semibold text-on-surface">
            SSG-Hackathon
          </h2>
        </div>
        <p className="font-mono text-[11px] text-on-surface-variant">
          Private Workstation
        </p>
      </div>

      <nav className="flex flex-1 flex-col overflow-y-auto px-xs py-sm scrollbar-thin">
        {navSections.map((section) => (
          <div key={section.label} className="mb-md">
            <p className="mb-xs px-md font-mono text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">
              {section.label}
            </p>
            {section.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-md rounded px-md py-sm text-body-sm transition-all duration-150",
                    "border-l-2",
                    active
                      ? "border-l-primary bg-surface-container-high font-semibold text-on-surface"
                      : "border-l-transparent text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface",
                  )}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto rounded bg-surface-container-highest px-xs py-[1px] font-mono text-[10px] text-on-surface-variant">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-outline-variant px-xs py-sm">
        {secondaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-md rounded px-md py-sm text-body-sm transition-all duration-150",
              "border-l-2 border-l-transparent text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface",
              isActive(item.href) && "border-l-primary bg-surface-container-high font-semibold text-on-surface",
            )}
          >
            <span className="material-symbols-outlined text-[18px]">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="border-t border-outline-variant px-md py-md">
        <Link
          href="/app/workspace/new"
          className="inline-flex w-full items-center justify-center gap-xs rounded bg-primary px-md py-sm text-body-sm font-medium text-on-primary transition-colors hover:bg-[#c01826]"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          New Workspace
        </Link>
      </div>
    </aside>
  );
}
