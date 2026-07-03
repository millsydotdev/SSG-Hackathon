"use client";

export default function SecuritySettingsPage() {
  return (
    <div className="mx-auto max-w-2xl p-lg">
      <h1 className="mb-lg text-h1 font-semibold text-on-surface">Security</h1>
      <div className="rounded border border-outline-variant/30 bg-surface-container p-lg">
        <h2 className="mb-md font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Active Sessions</h2>
        <div className="flex items-center justify-between rounded border border-outline-variant/30 bg-surface-container-low px-md py-sm">
          <div>
            <p className="text-body-sm text-on-surface">Current Session</p>
            <p className="font-mono text-[10px] text-on-surface-variant">Active now</p>
          </div>
          <span className="inline-block h-2 w-2 rounded-full bg-[#3fb950]" />
        </div>
      </div>
      <div className="mt-lg rounded border border-outline-variant/30 bg-surface-container p-lg">
        <h2 className="mb-md font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Audit Log</h2>
        <p className="font-mono text-[10px] text-on-surface-variant">View activity history and security events via the Activity API.</p>
      </div>
    </div>
  );
}
