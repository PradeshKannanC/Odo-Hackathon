import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import GlobalSearch from "../components/layout/GlobalSearch";
import OfflineIndicator from "../components/layout/OfflineIndicator";

const SIDEBAR_COLLAPSED_KEY = "transitops_sidebar_collapsed";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true"
  );

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      return next;
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={toggleCollapsed}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <OfflineIndicator />
        <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 p-6">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
      <GlobalSearch />
    </div>
  );
};

export default MainLayout;
