"use client";

import { useEffect, useState } from "react";
import { createAdminService, type AdminDashboard } from "@/core/admin";
import { AdminCard } from "@/components/admin/admin-card";

export default function AdminAutomationPage() {
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createAdminService().getDashboard()
      .then((d) => setDashboard(d))
      .catch((err) => console.error("[Page] error:", err))
      .finally(() => setLoading(false));
  }, []);

  const failed = dashboard?.automationFailed ?? 0;

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex items-center gap-sm">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:150ms]" />
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:300ms]" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-lg">
      <h1 className="mb-lg text-h1 font-semibold text-on-surface">Automation Engine</h1>

        <div className="mb-lg grid grid-cols-1 gap-md sm:grid-cols-4">
          <AdminCard label="Rules" value={dashboard?.automationRules ?? 0} icon="auto_awesome" />
          <AdminCard label="Total Runs" value={dashboard?.automationRunCount ?? 0} icon="play_arrow" />
          <AdminCard label="Failed Runs" value={failed} icon="error" color={failed > 0 ? "text-error" : "text-[#3fb950]"} />
          <AdminCard label="Disabled Rules" value={dashboard?.automationDisabled ?? 0} icon="toggle_off" />
        </div>

        <div className="rounded border border-outline-variant/30 bg-surface-container-low p-lg">
          <h2 className="mb-md font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Recent Runs</h2>
          <p className="font-mono text-[10px] text-on-surface-variant">No run data available.</p>
        </div>
    </div>
  );
}
