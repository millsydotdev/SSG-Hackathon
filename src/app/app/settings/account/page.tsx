"use client";

import { useState } from "react";
import { useAuth } from "@/identity";
import { Input } from "@/components/ui";

export default function AccountSettingsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function handlePasswordChange() {
    setError("");
    if (!newPassword || newPassword.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
  }

  if (isLoading || !isAuthenticated) return null;

  return (
    <div className="mx-auto max-w-2xl p-lg">
      <h1 className="mb-lg text-h1 font-semibold text-on-surface">Account</h1>

      <div className="rounded border border-outline-variant/30 bg-surface-container p-lg">
        <h2 className="mb-md font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Email</h2>
        <p className="mb-sm text-body-sm text-on-surface">{user?.email}</p>
        <p className="font-mono text-[10px] text-on-surface-variant">Email cannot be changed at this time.</p>
      </div>

      <div className="mt-lg rounded border border-outline-variant/30 bg-surface-container p-lg">
        <h2 className="mb-md font-mono text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Change Password</h2>
        <div className="flex flex-col gap-md">
          <Input label="Current Password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter current password" />
          <Input label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="At least 8 characters" />
          <Input label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat new password" />
          {error && <p role="alert" className="font-mono text-[10px] text-error">{error}</p>}
          {saved && <p className="font-mono text-[10px] text-[#3fb950]">Password updated successfully.</p>}
          <button type="button" onClick={handlePasswordChange}
            className="self-start rounded bg-primary px-md py-sm text-body-sm font-medium text-on-primary transition-colors hover:bg-[#c01826]">Update Password</button>
        </div>
      </div>
    </div>
  );
}
