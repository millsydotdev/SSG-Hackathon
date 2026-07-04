"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  AuthCard, AuthHeader, AuthPageShell,
} from "@/components/auth";
import { Input, Button } from "@/components/ui";
import { createSetupService, type PlatformSetupInput, type OwnerSetupInput, type SetupStep } from "@/core/setup";
import { config } from "@/services/config";

const INITIAL_PLATFORM: PlatformSetupInput = {
  platformName: "SSG-Hackathon",
  description: "",
  timezone: "UTC",
  defaultLocale: "en-US",
};

const INITIAL_OWNER: OwnerSetupInput = {
  displayName: "",
  username: "",
  email: "",
  password: "",
};

export function SetupWizard() {
  const router = useRouter();
  const [step, setStep] = useState<SetupStep>("welcome");
  const [setupKey, setSetupKey] = useState("");
  const [keyError, setKeyError] = useState("");
  const [platform, setPlatform] = useState<PlatformSetupInput>(INITIAL_PLATFORM);
  const [owner, setOwner] = useState<OwnerSetupInput>(INITIAL_OWNER);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [initialising, setInitialising] = useState(false);

  async function handleKeySubmit(e: FormEvent) {
    e.preventDefault();
    setKeyError("");
    const { data } = await fetch("/api/validate-setup-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: setupKey }),
    }).then((r) => r.json());
    if (data?.valid) {
      setStep("platform");
    } else {
      setKeyError("Invalid setup key.");
    }
  }

  function handleOwnerSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!owner.displayName.trim()) { setError("Display name is required."); return; }
    if (!owner.username.trim()) { setError("Username is required."); return; }
    if (!owner.email.trim()) { setError("Email is required."); return; }
    if (owner.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (owner.password !== confirmPassword) { setError("Passwords do not match."); return; }
    setStep("review");
  }

  async function handleInitialise() {
    setInitialising(true);
    setError("");
    try {
      const result = await createSetupService().initialisePlatform(platform, owner);
      if (!result.success) {
        setError(result.error ?? "Initialisation failed.");
        setStep("owner");
        return;
      }
      setStep("complete");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
      setStep("owner");
    } finally {
      setInitialising(false);
    }
  }

  const stepTitles: Record<SetupStep, string> = {
    welcome: "Welcome",
    key: "Setup Key",
    platform: "Platform",
    owner: "Owner",
    review: "Review",
    complete: "Complete",
  };

  return (
    <AuthPageShell>
      <AuthCard>
        <AuthHeader
          showLogo
          title={step === "complete" ? "Platform Initialised" : stepTitles[step]}
          subtitle={
            step === "welcome"
              ? "This deployment has not yet been configured. Only the deployment administrator should continue."
              : step === "complete"
                ? "Redirecting you to sign in..."
                : `Step ${["welcome", "key", "platform", "owner", "review", "complete"].indexOf(step)} of 5`
          }
        />

        {step === "welcome" && (
          <div className="flex flex-col gap-md">
            <div className="rounded border border-outline-variant/30 bg-surface-container-low p-md">
              <p className="text-body-sm text-on-surface-variant">
                This setup wizard will guide you through creating the Platform Owner account
                and configuring SSG-Hackathon for first use. This process can only be completed once.
              </p>
            </div>
            <Button onClick={() => setStep("key")}>Begin Setup</Button>
          </div>
        )}

        {step === "key" && (
          <form onSubmit={handleKeySubmit} className="flex flex-col gap-md">
            <Input
              label="Platform Setup Key"
              type="password"
              value={setupKey}
              onChange={(e) => setSetupKey(e.target.value)}
              placeholder="Enter the PLATFORM_SETUP_KEY"
              error={keyError || undefined}
              required
            />
            <div className="flex gap-sm">
              <Button variant="ghost" onClick={() => setStep("welcome")}>Back</Button>
              <Button type="submit" disabled={!setupKey}>Verify Key</Button>
            </div>
          </form>
        )}

        {step === "platform" && (
          <div className="flex flex-col gap-md">
            <Input
              label="Platform Name"
              value={platform.platformName}
              onChange={(e) => setPlatform({ ...platform, platformName: e.target.value })}
              required
            />
            <div className="flex flex-col gap-xs">
              <label className="font-mono text-[9px] font-bold uppercase tracking-widest text-on-surface">Description (optional)</label>
              <textarea
                value={platform.description}
                onChange={(e) => setPlatform({ ...platform, description: e.target.value })}
                rows={3}
                className="w-full rounded border border-outline-variant bg-black px-md py-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-y"
              />
            </div>
            <Input
              label="Timezone"
              value={platform.timezone}
              onChange={(e) => setPlatform({ ...platform, timezone: e.target.value })}
              placeholder="UTC"
            />
            <div className="flex gap-sm">
              <Button variant="ghost" onClick={() => setStep("key")}>Back</Button>
              <Button onClick={() => setStep("owner")}>Continue</Button>
            </div>
          </div>
        )}

        {step === "owner" && (
          <form onSubmit={handleOwnerSubmit} className="flex flex-col gap-md">
            <Input
              label="Display Name"
              value={owner.displayName}
              onChange={(e) => setOwner({ ...owner, displayName: e.target.value })}
              required
            />
            <Input
              label="Username"
              value={owner.username}
              onChange={(e) => setOwner({ ...owner, username: e.target.value.toLowerCase() })}
              required
            />
            <Input
              label="Email"
              type="email"
              value={owner.email}
              onChange={(e) => setOwner({ ...owner, email: e.target.value })}
              required
            />
            <Input
              label="Password"
              type="password"
              value={owner.password}
              onChange={(e) => setOwner({ ...owner, password: e.target.value })}
              placeholder="At least 8 characters"
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className="flex items-center gap-sm rounded border border-outline-variant/30 bg-surface-container-low px-md py-sm">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">link</span>
              <span className="flex-1 font-mono text-[10px] text-on-surface-variant">GitHub connection is optional and can be configured later in Settings.</span>
            </div>
            {error && <p role="alert" className="font-mono text-[10px] text-error">{error}</p>}
            <div className="flex gap-sm">
              <Button variant="ghost" onClick={() => setStep("platform")}>Back</Button>
              <Button type="submit">Review Setup</Button>
            </div>
          </form>
        )}

        {step === "review" && (
          <div className="flex flex-col gap-md">
            <div className="rounded border border-outline-variant/30 bg-surface-container-low p-md">
              <h3 className="mb-xs font-mono text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">Platform</h3>
              <p className="text-body-sm text-on-surface">{platform.platformName}</p>
              {platform.description && <p className="font-mono text-[9px] text-on-surface-variant">{platform.description}</p>}
              <p className="mt-xs font-mono text-[9px] text-on-surface-variant">{platform.timezone} · {platform.defaultLocale}</p>
            </div>
            <div className="rounded border border-outline-variant/30 bg-surface-container-low p-md">
              <h3 className="mb-xs font-mono text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">Owner</h3>
              <p className="text-body-sm text-on-surface">{owner.displayName}</p>
              <p className="font-mono text-[9px] text-on-surface-variant">@{owner.username} · {owner.email}</p>
            </div>
            <div className="rounded border border-outline-variant/30 bg-surface-container-low p-md">
              <h3 className="mb-xs font-mono text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">Environment</h3>
              <p className="font-mono text-[9px] text-on-surface-variant">
                {config.app.environment} · v{config.app.version}
              </p>
            </div>
            <div className="flex gap-sm">
              <Button variant="ghost" onClick={() => setStep("owner")}>Back</Button>
              <Button onClick={handleInitialise} disabled={initialising}>
                {initialising ? "Initialising..." : "Initialise Platform"}
              </Button>
            </div>
          </div>
        )}

        {step === "complete" && (
          <div className="flex items-center justify-center py-lg">
            <div className="flex items-center gap-sm">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:150ms]" />
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </AuthCard>
    </AuthPageShell>
  );
}
