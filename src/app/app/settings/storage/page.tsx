"use client";

export default function StorageSettingsPage() {
  return (
    <div className="mx-auto max-w-2xl p-lg">
      <h1 className="mb-lg text-h1 font-semibold text-on-surface">Storage</h1>
      <div className="rounded border border-outline-variant/30 bg-surface-container p-lg">
        <h2 className="mb-md font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Buckets</h2>
        <div className="flex flex-col gap-xs">
          {["avatars", "attachments", "resources", "submissions", "exports", "temporary"].map((bucket) => (
            <div key={bucket} className="flex items-center justify-between rounded border border-outline-variant/30 bg-surface-container-low px-md py-sm">
              <span className="font-mono text-[10px] text-on-surface">{bucket}</span>
              <span className="font-mono text-[10px] text-on-surface-variant">Supabase Storage</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
