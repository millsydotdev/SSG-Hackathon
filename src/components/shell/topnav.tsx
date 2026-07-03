"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/identity";
import { cn } from "@/lib/utils";

interface TopNavProps {
  className?: string;
  title?: string;
}

export function TopNav({ className, title = "SSG-Hackathon" }: TopNavProps) {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  async function handleSignOut() {
    setMenuOpen(false);
    await signOut();
    router.replace("/");
  }

  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : (user?.username?.slice(0, 2).toUpperCase() ?? "SS");

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
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="border-surface-variant bg-surface-container-highest text-on-surface hover:border-primary flex h-8 w-8 items-center justify-center rounded border font-mono text-[10px] transition-colors"
            aria-label="User menu"
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            {initials}
          </button>

          {menuOpen && (
            <div
              className="mt-xs border-outline-variant bg-surface-container-low p-xs absolute top-full right-0 z-50 min-w-[180px] rounded border shadow-lg"
              role="menu"
            >
              <div className="border-outline-variant/30 px-md py-sm border-b">
                <p className="text-body-sm text-on-surface font-medium">
                  {user?.displayName ?? user?.username}
                </p>
                <p className="text-on-surface-variant font-mono text-[10px]">
                  {user?.email}
                </p>
              </div>
              <button
                type="button"
                role="menuitem"
                onClick={handleSignOut}
                className="px-md py-sm text-body-sm text-error hover:bg-error-container/20 flex w-full items-center rounded transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
