import Link from "next/link";
import { AuthCard, AuthHeader } from "@/components/auth";

export default function HomePage() {
  return (
    <AuthCard>
      <AuthHeader
        logo="SSG"
        title="SSG-Hackathon"
        subtitle="Private Collaborative Workstation"
      />
      <p className="mb-md text-body-sm text-on-surface-variant text-center">
        Access is restricted to invited members.
      </p>
      <div className="gap-xs flex flex-col">
        <Link
          href="/login"
          className="bg-primary px-md py-sm text-body-sm text-on-primary inline-flex w-full items-center justify-center rounded font-medium transition-colors hover:bg-[#c01826]"
        >
          Sign In
        </Link>
        <Link
          href="/join"
          className="border-outline-variant px-md py-sm text-body-sm text-on-surface hover:border-on-surface inline-flex w-full items-center justify-center rounded border bg-black transition-colors"
        >
          Join Team
        </Link>
      </div>
      <div className="mt-md gap-md border-outline-variant pt-md flex items-center justify-center border-t">
        <Link
          href="/privacy"
          className="text-on-surface-variant hover:text-on-surface font-mono text-[10px] transition-colors"
        >
          Privacy
        </Link>
        <Link
          href="/terms"
          className="text-on-surface-variant hover:text-on-surface font-mono text-[10px] transition-colors"
        >
          Terms
        </Link>
        <Link
          href="/status"
          className="text-on-surface-variant hover:text-on-surface font-mono text-[10px] transition-colors"
        >
          Status
        </Link>
        <span className="text-on-surface-variant font-mono text-[10px]">
          v0.1
        </span>
      </div>
    </AuthCard>
  );
}
