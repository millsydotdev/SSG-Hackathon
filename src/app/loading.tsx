export default function LoadingPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="gap-sm flex flex-col items-center">
        <div className="bg-surface-container-high h-1.5 w-32 animate-pulse rounded-full" />
        <p className="text-body-sm text-on-surface-variant">Loading...</p>
      </div>
    </div>
  );
}
