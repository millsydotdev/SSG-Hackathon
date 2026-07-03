import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "System Status",
};

export default function StatusPage() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="border-outline-variant bg-surface p-xl rounded border">
        <div className="mb-lg border-outline-variant pb-lg border-b">
          <h1 className="text-h1 text-on-surface font-semibold">
            System Status
          </h1>
          <p className="mt-xs text-on-surface-variant font-mono text-[11px]">
            v0.1.0 — production
          </p>
        </div>

        <div className="gap-md flex flex-col">
          <div className="border-outline-variant/30 bg-surface-container px-md py-sm flex items-center justify-between rounded border">
            <span className="text-body-sm text-on-surface">Application</span>
            <span className="gap-xs flex items-center font-mono text-[10px] text-[#3fb950]">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-[#3fb950]" />
              Operational
            </span>
          </div>
          <div className="border-outline-variant/30 bg-surface-container px-md py-sm flex items-center justify-between rounded border">
            <span className="text-body-sm text-on-surface">Supabase</span>
            <span className="gap-xs flex items-center font-mono text-[10px] text-[#3fb950]">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-[#3fb950]" />
              Connected
            </span>
          </div>
          <div className="border-outline-variant/30 bg-surface-container px-md py-sm flex items-center justify-between rounded border">
            <span className="text-body-sm text-on-surface">Redis</span>
            <span className="gap-xs flex items-center font-mono text-[10px] text-[#3fb950]">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-[#3fb950]" />
              Connected
            </span>
          </div>
          <div className="border-outline-variant/30 bg-surface-container px-md py-sm flex items-center justify-between rounded border">
            <span className="text-body-sm text-on-surface">Deployment</span>
            <span className="gap-xs flex items-center font-mono text-[10px] text-[#3fb950]">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-[#3fb950]" />
              Vercel
            </span>
          </div>
          <div className="border-outline-variant/30 bg-surface-container px-md py-sm flex items-center justify-between rounded border">
            <span className="text-body-sm text-on-surface">Authentication</span>
            <span className="gap-xs text-on-surface-variant flex items-center font-mono text-[10px]">
              <span className="bg-on-surface-variant inline-block h-[6px] w-[6px] rounded-full" />
              Pending Setup
            </span>
          </div>
        </div>

        <div className="mt-lg border-outline-variant pt-lg border-t">
          <Link
            href="/login"
            className="text-body-sm text-primary transition-opacity hover:opacity-80"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
