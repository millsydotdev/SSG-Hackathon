import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFoundPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="gap-sm flex flex-col items-center">
        <h1 className="text-h1 text-on-surface font-semibold">404</h1>
        <p className="text-body-sm text-on-surface-variant">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
