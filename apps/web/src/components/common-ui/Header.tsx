import { Search } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-4 border-b bg-white px-3 sm:px-4">
      {/* Sidebar */}
      <SidebarTrigger className="-ml-1" />

      {/* Search */}
      <div className="w-full max-w-md">
        <div className="flex h-9 items-center gap-2 rounded-lg border bg-gray-50 px-3 text-sm text-muted-foreground">
          <Search className="size-4 shrink-0" />

          <span>Search banks, currencies...</span>
        </div>
      </div>

      {/* Live Market */}
      <div className="ml-auto flex shrink-0 items-center gap-2">
        <span className="size-2 rounded-full bg-green-500" />

        <span className="text-sm font-medium text-green-600">Live Market</span>
      </div>
    </header>
  );
}
