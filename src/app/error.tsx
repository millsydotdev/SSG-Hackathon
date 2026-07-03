"use client";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="gap-sm flex flex-col items-center">
        <h1 className="text-h1 text-error font-semibold">Error</h1>
        <p className="text-body-sm text-on-surface-variant">
          Something went wrong. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-sm bg-primary px-md py-sm text-body-sm text-on-primary rounded font-medium transition-colors hover:bg-[#c01826]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
