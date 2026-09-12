import {
  ArrowLeftRight,
  Bell,
  BookOpen,
  ChartNoAxesCombined,
  CalendarDays,
  Database,
  Info,
  KeyRound,
  Landmark,
  LayoutDashboard,
  Scale,
  Settings,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import birrlogop from "../../assets/birrlogop.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    section: "main",
  },
  {
    label: "Compare Rates",
    icon: Scale,
    href: "/compare",
    section: "main",
  },
  {
    label: "Currency Converter",
    icon: ArrowLeftRight,
    href: "/converter",
    section: "main",
  },
  {
    label: "history",
    icon: CalendarDays,
    href: "/history",
    section: "main",
  },
  {
    label: "Banks",
    icon: Landmark,
    href: "/banks",
    section: "main",
  },
  {
    label: "Stock Market",
    icon: ChartNoAxesCombined,
    href: "/stockmarket",
    section: "main",
  },
  {
    label: "Alerts & Notifications",
    icon: Bell,
    href: "/Alerts",
    section: "main",
  },
  {
    label: "API Docs",
    icon: BookOpen,
    href: "/developers",
    section: "developer",
  },

  {
    label: "About",
    icon: Info,
    href: "/about",
    section: "other",
  },
];

function NavigationItem({
  label,
  icon: Icon,
  href,
}: {
  label: string;
  icon: React.ElementType;
  href: string;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={label}
        className="
          group
          h-10
          rounded-lg
          px-3
          text-[13px]
          font-medium
          text-black
          transition-all
          duration-150

          hover:bg-blue-100
          hover:text-black


          group-data-[collapsible=icon]:justify-center
          group-data-[collapsible=icon]:px-0
        "
      >
        <Link
          className="      flex
      w-full
      flex-row
      items-center
      gap-3"
          to={href}
        >
          <Icon
            className="
              size-[17px]
              shrink-0
              text-slate-400
              transition-colors
              duration-150

              group-hover:text-blue-600

              dark:text-slate-500
              dark:group-hover:text-blue-400
            "
          />

          <span className="truncate group-data-[collapsible=icon]:hidden">
            {label}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const mainNavigation = navigation.filter((item) => item.section === "main");

  const developerNavigation = navigation.filter(
    (item) => item.section === "developer",
  );

  const otherNavigation = navigation.filter((item) => item.section === "other");

  return (
    <Sidebar
      collapsible="icon"
      className="
        border-r
        border-slate-200/80
        bg-gray-200
        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      {/* ─────────────────────────────────────────────
          HEADER
      ───────────────────────────────────────────── */}

      <SidebarHeader
        className="border-b border-slate-200/70 px-3 py-4 bg-blue-800
      dark:border-slate-800"
      >
        <Link
          to="/"
          className="
            flex
            items-center
            gap-3
            overflow-hidden
            rounded-lg
            outline-none
          "
        >
          {/* Logo */}
          <div
            className="
              flex size-10 min-w-5 items-center justify-center overflow-visible
            "
          >
            <img
              src={birrlogop}
              alt="birrlogop"
              className=" size-10 shrink-0 object-contain "
            />
          </div>

          {/* Brand */}
          <div
            className="
              flex
              min-w-0
              flex-col
              leading-none
              group-data-[collapsible=icon]:hidden
            "
          >
            <span
              className="truncate text-lg
              font-bold
              text-shadow-mauve-400

              tracking-tight text-slate-900 text-white
            "
            >
              Birrify
            </span>

            <span className="mt-1 truncate text-[10px] font-medium uppercase tracking-wider text-white ">
              Exchange Rates
            </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* ─────────────────────────────────────────────
          CONTENT
      ───────────────────────────────────────────── */}

      <SidebarContent className="px-2 py-3">
        {/* Main */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel
            className="
              mb-2
              px-3
              text-[10px]
              font-semibold
              uppercase
              tracking-widest
              text-slate-400

              group-data-[collapsible=icon]:hidden

              dark:text-slate-500
            "
          >
            Overview
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainNavigation.map((item) => (
                <NavigationItem
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  href={item.href}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Developer */}
        <SidebarGroup className="mt-6 p-0">
          <SidebarGroupLabel
            className="
              mb-2
              px-3
              text-[10px]
              font-semibold
              uppercase
              tracking-widest
              text-slate-400

              group-data-[collapsible=icon]:hidden

              dark:text-slate-500
            "
          >
            Developer
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {developerNavigation.map((item) => (
                <NavigationItem
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  href={item.href}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Other */}
        <SidebarGroup className="mt-6 p-0">
          <SidebarGroupLabel
            className="
              mb-2
              px-3
              text-[10px]
              font-semibold
              uppercase
              tracking-widest
              text-slate-400

              group-data-[collapsible=icon]:hidden

              dark:text-slate-500
            "
          >
            Other
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {otherNavigation.map((item) => (
                <NavigationItem
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  href={item.href}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ─────────────────────────────────────────────
          FOOTER
      ───────────────────────────────────────────── */}

      <SidebarFooter className="border-t border-slate-200/70 p-3 dark:border-slate-800">
        <div
          className="
            flex
            items-center
            gap-2
            overflow-hidden
            px-1
            group-data-[collapsible=icon]:justify-center
          "
        >
          {/* Status dot */}
          <div className="size-1.5 shrink-0 rounded-full bg-blue-500" />

          {/* Status text */}
          <span
            className="
              truncate
              text-[11px]
              font-medium
              text-slate-400
              group-data-[collapsible=icon]:hidden
              dark:text-slate-500
            "
          >
            Live exchange data
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
