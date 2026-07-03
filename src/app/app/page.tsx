"use client";

import Link from "next/link";
import { useHackathon } from "@/core/hackathon";
import { StatusIndicator } from "@/packages/ui";

const statusLabels: Record<string, string> = {
  draft: "Draft",
  upcoming: "Upcoming",
  active: "Active",
  submission: "Submission Phase",
  judging: "Judging",
  completed: "Completed",
  archived: "Archived",
};

export default function OverviewPage() {
  const { state, activeHackathon, hackathons, activate, archive } =
    useHackathon();

  if (state === "loading") {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="gap-sm flex items-center">
          <div className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
          <div className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:150ms]" />
          <div className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:300ms]" />
        </div>
      </div>
    );
  }

  if (state === "error" || !activeHackathon) {
    return (
      <div className="p-lg flex h-full items-center justify-center">
        <div className="gap-md flex max-w-lg flex-col items-center text-center">
          <span className="material-symbols-outlined text-on-surface-variant/30 text-[48px]">
            emoji_events
          </span>
          <h1 className="text-h1 text-on-surface font-semibold">
            No Active Hackathon
          </h1>
          <p className="text-body-sm text-on-surface-variant">
            Create a new hackathon to get started. You can set it up with all
            the details your team needs to collaborate.
          </p>
          <div className="gap-sm flex">
            <Link
              href="/app/hackathons/new"
              className="gap-sm bg-primary px-md py-sm text-body-sm text-on-primary inline-flex items-center rounded font-medium transition-colors hover:bg-[#c01826]"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Create Hackathon
            </Link>
            {hackathons.length > 0 && (
              <Link
                href="/app/hackathons"
                className="gap-sm border-outline-variant px-md py-sm text-body-sm text-on-surface hover:border-on-surface inline-flex items-center rounded border bg-black transition-colors"
              >
                View Archive
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  const archived = hackathons.filter((h) => h.status === "archived");

  return (
    <div className="p-lg">
      <div className="gap-lg mx-auto flex max-w-[1600px] flex-col">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-h1 text-on-surface font-semibold">Overview</h1>
            <p className="text-on-surface-variant font-mono text-[11px]">
              Current hackathon workspace
            </p>
          </div>
          <div className="gap-sm flex items-center">
            <Link
              href={`/app/hackathons/${activeHackathon.id}/edit`}
              className="gap-xs border-outline-variant px-sm py-xs text-body-sm text-on-surface hover:border-on-surface inline-flex items-center rounded border bg-black transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">
                edit
              </span>
              Edit
            </Link>
            <button
              type="button"
              onClick={() => archive(activeHackathon.id)}
              className="gap-xs border-error/30 px-sm py-xs text-body-sm text-error hover:border-error inline-flex items-center rounded border transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">
                archive
              </span>
              Archive
            </button>
          </div>
        </div>

        <div className="border-outline-variant/30 bg-surface-container p-lg rounded border">
          <div className="flex items-start justify-between">
            <div className="gap-lg flex items-start">
              {activeHackathon.logoUrl ? (
                <img
                  src={activeHackathon.logoUrl}
                  alt=""
                  className="h-16 w-16 rounded object-cover"
                />
              ) : (
                <div className="bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded text-[28px]">
                  <span className="material-symbols-outlined">
                    emoji_events
                  </span>
                </div>
              )}
              <div>
                <h2 className="text-h2 text-on-surface font-semibold">
                  {activeHackathon.name}
                </h2>
                <p className="mt-xs text-on-surface-variant font-mono text-[11px]">
                  {activeHackathon.organizer}
                  {activeHackathon.location && ` · ${activeHackathon.location}`}
                </p>
                <div className="mt-sm gap-md flex items-center">
                  <StatusIndicator
                    status={
                      activeHackathon.status === "active"
                        ? "active"
                        : activeHackathon.status === "completed"
                          ? "idle"
                          : "paused"
                    }
                    label={
                      statusLabels[activeHackathon.status] ??
                      activeHackathon.status
                    }
                    pulse={activeHackathon.status === "active"}
                  />
                  {activeHackathon.website && (
                    <a
                      href={activeHackathon.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-mono text-[10px] transition-opacity hover:opacity-80"
                    >
                      Website ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {activeHackathon.description && (
            <p className="mt-lg text-body-sm text-on-surface-variant">
              {activeHackathon.description}
            </p>
          )}
        </div>

        {archived.length > 0 && (
          <div>
            <h2 className="mb-sm text-h2 text-on-surface font-semibold">
              Previous Hackathons
            </h2>
            <div className="gap-sm flex flex-col">
              {archived.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => activate(h.id)}
                  className="border-outline-variant/30 bg-surface-container-low px-lg py-sm hover:bg-surface-container flex items-center justify-between rounded border text-left transition-colors"
                >
                  <div>
                    <p className="text-body-sm text-on-surface font-medium">
                      {h.name}
                    </p>
                    <p className="text-on-surface-variant font-mono text-[10px]">
                      {h.organizer}
                      {h.startDate &&
                        ` · ${new Date(h.startDate).toLocaleDateString()}`}
                    </p>
                  </div>
                  <span className="text-primary font-mono text-[10px]">
                    Reactivate
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
