import AppHeader from "@/components/core/appHeaderComponent";
import { Outlet } from "react-router-dom";

export function DashboardWrapperPage() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <AppHeader />
      <div className="flex w-full flex-1 flex-row overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
