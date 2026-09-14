import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/banks")({
  component: BanksLayout,
});

function BanksLayout() {
  return <Outlet />;
}
