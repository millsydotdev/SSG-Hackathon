"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHackathon } from "@/core/hackathon";

export default function TeamPage() {
  const router = useRouter();
  const { activeHackathon } = useHackathon();

  if (!activeHackathon) {
    router.replace("/app");
    return null;
  }

  return (
    <div className="p-lg">
      <div className="gap-lg mx-auto flex max-w-[1200px] flex-col">
        <div>
          <h1 className="text-h1 text-on-surface font-semibold">Team</h1>
          <p className="text-on-surface-variant font-mono text-[11px]">
            Manage your hackathon team
          </p>
        </div>

        <div className="gap-md grid grid-cols-1 md:grid-cols-3">
          <Link
            href="/app/team/invitations"
            className="border-outline-variant/30 bg-surface-container-low p-lg hover:bg-surface-container rounded border transition-colors"
          >
            <span className="material-symbols-outlined text-primary text-[24px]">
              link
            </span>
            <h2 className="mt-sm text-h2 text-on-surface font-semibold">
              Invitations
            </h2>
            <p className="mt-xs text-body-sm text-on-surface-variant">
              Generate and manage invitation links for team members
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
