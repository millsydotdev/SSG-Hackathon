"use client";

import type { ReactNode } from "react";
import { Sidebar } from "@/components/shell/sidebar";
import { TopNav } from "@/components/shell/topnav";
import { Footer } from "@/components/shell/footer";
import { WorkspaceLayout } from "@/packages/layouts";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <WorkspaceLayout
      sidebar={<Sidebar />}
      topnav={<TopNav />}
      footer={<Footer />}
    >
      {children}
    </WorkspaceLayout>
  );
}
