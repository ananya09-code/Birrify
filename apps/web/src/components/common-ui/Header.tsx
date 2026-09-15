import { Search } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-white/95 px-3 backdrop-blur sm:gap-3 sm:px-4">
      {/* Sidebar */}
      <SidebarTrigger className="shrink-0" />

      {/* Search */}
      <div className="min-w-0 flex-1 sm:max-w-md">
        <div className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-400 transition-colors focus-within:border-blue-200 focus-within:bg-white focus-within:text-slate-600">
          <Search className="size-4 shrink-0" />

          <span className="truncate">
            <span className="sm:hidden">Search...</span>
            <span className="hidden sm:inline">
              Search banks, currencies...
            </span>
          </span>

          <kbd className="ml-auto hidden shrink-0 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 md:inline">
            /
          </kbd>
        </div>
      </div>

      {/* Live Market */}
      <div className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-2.5 py-1.5 sm:gap-2 sm:px-3">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-green-500" />
        </span>

        <span className="hidden text-xs font-semibold text-green-700 sm:inline">
          Live Market
        </span>

        <span className="text-[11px] font-semibold text-green-700 sm:hidden">
          Live
        </span>
      </div>
    </header>
  );
}
