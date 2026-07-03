"use client";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background flex h-screen items-center justify-center font-sans antialiased">
        <div className="gap-sm flex flex-col items-center text-center">
          <p className="text-primary font-mono text-[48px] font-bold">500</p>
          <h1 className="text-h1 text-on-surface font-semibold">
            Critical Error
          </h1>
          <p className="text-body-sm text-on-surface-variant max-w-sm">
            A critical error occurred. Please reload the page.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-sm bg-primary px-md py-sm text-body-sm text-on-primary rounded font-medium transition-colors hover:bg-[#c01826]"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
