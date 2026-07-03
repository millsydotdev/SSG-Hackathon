"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AuthCard, AuthHeader, AuthFooter, FormField } from "@/components/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please enter your username.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Sign In"
        subtitle="Enter your credentials to access the workstation."
      />

      <form onSubmit={handleSubmit} className="gap-md flex flex-col" noValidate>
        <FormField
          label="Username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          required
          autoComplete="username"
          error={error && !username.trim() ? error : undefined}
        />

        <FormField
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
          autoComplete="current-password"
          error={error && username.trim() && !password ? error : undefined}
        />

        <div className="flex items-center justify-between">
          <label className="group gap-sm inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="border-outline-variant text-primary focus:ring-primary h-4 w-4 rounded-[2px] border bg-black focus:ring-1 focus:ring-offset-0 focus:outline-none"
            />
            <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
              Remember me
            </span>
          </label>
          <Link
            href="/forgot-password"
            className="text-body-sm text-primary transition-opacity hover:opacity-80"
          >
            Forgot password?
          </Link>
        </div>

        {error && (
          <p
            role="alert"
            className="border-error-container/30 bg-error-container/5 px-sm py-xs text-error rounded border font-mono text-[10px]"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="gap-sm bg-primary px-md py-sm text-body-sm text-on-primary inline-flex w-full items-center justify-center rounded font-medium transition-all hover:bg-[#c01826] disabled:pointer-events-none disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="border-on-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <AuthFooter>
        <p className="text-body-sm text-on-surface-variant">
          No account?{" "}
          <Link
            href="/join"
            className="text-primary transition-opacity hover:opacity-80"
          >
            Join with invite
          </Link>
        </p>
      </AuthFooter>
    </AuthCard>
  );
}
