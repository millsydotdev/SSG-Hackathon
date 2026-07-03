import { Sidebar } from "@/components/shell/sidebar";
import { TopNav } from "@/components/shell/topnav";
import { Footer } from "@/components/shell/footer";
import { WorkspaceLayout } from "@/packages/layouts";

export default function HomePage() {
  return (
    <WorkspaceLayout
      sidebar={<Sidebar />}
      topnav={<TopNav title="Dashboard" />}
      footer={<Footer />}
    >
      <div className="p-lg">
        <div className="gap-lg mx-auto flex max-w-[1600px] flex-col">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-h1 text-on-surface font-semibold">
                Dashboard
              </h1>
              <p className="text-on-surface-variant font-mono text-[11px]">
                Workspace Overview
              </p>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
