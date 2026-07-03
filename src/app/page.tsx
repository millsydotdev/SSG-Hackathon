import Link from "next/link";
import { AuthCard, AuthHeader, AuthPageShell } from "@/components/auth";

export default function HomePage() {
  return (
    <AuthPageShell>
      <AuthCard>
        <AuthHeader
          logo="SSG"
          title="SSG-Hackathon"
          subtitle="Private Collaborative Workstation"
        />
        <p className="text-body-sm text-center text-[#b5b5b5]">
          Access is restricted to invited members.
        </p>
        <div className="gap-md flex flex-col">
          <Link
            href="/login"
            className="bg-primary px-md py-md text-body-sm text-on-primary inline-flex w-full items-center justify-center rounded font-medium transition-colors hover:bg-[#c01826]"
          >
            Sign In
          </Link>
          <Link
            href="/join"
            className="border-outline-variant px-md py-md text-body-sm text-on-surface hover:border-on-surface inline-flex w-full items-center justify-center rounded border bg-black transition-colors"
          >
            Join Team
          </Link>
        </div>
        <div className="mt-sm gap-xs border-outline-variant pt-md flex items-center justify-center border-t">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white opacity-80" />
          <span className="text-on-surface-variant font-mono text-[11px] tracking-wider uppercase">
            Secure Connection
          </span>
        </div>
      </AuthCard>
    </AuthPageShell>
  );
}
