"use client";

import { useState } from "react";

export default function DangerZonePage() {
  const [confirmText, setConfirmText] = useState("");
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const actions = [
    { id: "archive", label: "Archive Hackathon", description: "Archive the current hackathon. Team members will lose access." },
    { id: "reset", label: "Reset Workspace", description: "Remove all tasks, ideas, research, notes, and files. This cannot be undone." },
    { id: "delete-files", label: "Delete All Files", description: "Permanently delete all uploaded files from storage." },
  ];

  function handleConfirm(_actionId: string) {
    setShowConfirm(null);
  }

  return (
    <div className="mx-auto max-w-2xl p-lg">
      <h1 className="mb-lg text-h1 font-semibold text-error">Danger Zone</h1>
      <p className="mb-lg text-body-sm text-on-surface-variant">
        Destructive actions require confirmation. These cannot be undone.
      </p>

      <div className="flex flex-col gap-md">
        {actions.map((action) => (
          <div key={action.id} className="rounded border border-error/20 bg-error/5 p-lg">
            <h2 className="text-h2 font-semibold text-error">{action.label}</h2>
            <p className="mt-xs text-body-sm text-on-surface-variant">{action.description}</p>
            {showConfirm === action.id ? (
              <div className="mt-md flex flex-col gap-sm">
                <p className="font-mono text-[10px] text-on-surface-variant">Type &ldquo;confirm&rdquo; to proceed:</p>
                <input type="text" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder='Type "confirm"'
                  className="w-64 rounded border border-error bg-black px-md py-sm text-body-sm text-on-surface focus:ring-1 focus:ring-error focus:outline-none" />
                <div className="flex gap-sm">
                  <button type="button" disabled={confirmText !== "confirm"} onClick={() => handleConfirm(action.id)}
                    className="rounded bg-error px-md py-sm text-body-sm font-medium text-on-error transition-colors hover:bg-[#c01826] disabled:opacity-50">Confirm</button>
                  <button type="button" onClick={() => { setShowConfirm(null); setConfirmText(""); }}
                    className="rounded border border-outline-variant bg-black px-md py-sm text-body-sm text-on-surface">Cancel</button>
                </div>
              </div>
            ) : (
              <button type="button" onClick={() => setShowConfirm(action.id)}
                className="mt-md rounded border border-error/30 px-md py-sm text-body-sm text-error transition-colors hover:border-error">
                {action.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
