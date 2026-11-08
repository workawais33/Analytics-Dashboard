import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

function DashboardLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      <div
        className={`min-h-screen transition-[margin] duration-300 ease-in-out ${
          sidebarCollapsed ? "lg:ml-[76px]" : "lg:ml-[264px]"
        }`}
      >
        <TopNavbar
          setMobileSidebarOpen={setMobileSidebarOpen}
        />

        <main className="mx-auto w-full max-w-[1800px] px-4 py-6 transition-colors duration-300 sm:px-6 lg:px-8 lg:py-7">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;