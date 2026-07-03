import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="border-outline-variant bg-surface p-xl rounded border">
        <h1 className="text-h1 mb-md text-on-surface font-semibold">
          Terms of Service
        </h1>
        <div className="gap-md text-body-sm text-on-surface-variant flex flex-col">
          <p>
            By using SSG-Hackathon, you agree to these terms. This is a private
            workspace for invited collaborators.
          </p>
          <h2 className="text-h2 text-on-surface font-semibold">Access</h2>
          <p>
            Access is restricted to invited members. You are responsible for
            maintaining the confidentiality of your account credentials.
          </p>
          <h2 className="text-h2 text-on-surface font-semibold">
            Acceptable Use
          </h2>
          <ul className="pl-lg list-disc">
            <li>Use the platform for authorized hackathon activities</li>
            <li>Do not share access with unauthorized users</li>
            <li>Do not abuse the platform or its services</li>
          </ul>
          <h2 className="text-h2 text-on-surface font-semibold">Changes</h2>
          <p>
            These terms may be updated. Continued use after changes constitutes
            acceptance.
          </p>
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
