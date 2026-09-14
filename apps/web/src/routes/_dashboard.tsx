import { Outlet, createFileRoute } from "@tanstack/react-router";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/layout/SideBar";
import { Header } from "@/components/common-ui/Header";

export const Route = createFileRoute("/_dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <Header />

        <main className="flex flex-1 flex-col px-2 py-4 sm:px-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
