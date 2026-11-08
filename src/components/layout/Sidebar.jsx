import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  ChevronLeft,
  X,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Chat",
    path: "/chat",
    icon: MessageSquare,
  },
];

function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 cursor-pointer bg-slate-950/30 backdrop-blur-[2px] lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col overflow-visible bg-white transition-[width,transform,background-color,border-color] duration-300 ease-in-out dark:bg-slate-900 ${
          collapsed ? "lg:w-[76px]" : "lg:w-[264px]"
        } ${
          mobileOpen
            ? "w-[264px] translate-x-0"
            : "w-[264px] -translate-x-full lg:translate-x-0"
        }`}
      >
        <div
          className={`relative flex h-[76px] shrink-0 items-center bg-teal-600 ${
            collapsed
              ? "lg:justify-center lg:px-3"
              : "justify-between px-5"
          }`}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm">
              <img
                src="https://cdn-icons-png.flaticon.com/512/12293/12293106.png"
                alt="Analytics"
                className="h-8 w-8 object-contain pr-1"
              />
            </div>

            <div
              className={`min-w-0 transition-all duration-300 ${
                collapsed
                  ? "lg:w-0 lg:translate-x-2 lg:overflow-hidden lg:opacity-0"
                  : "w-auto translate-x-0 opacity-100"
              }`}
            >
              <p className="truncate text-[15px] font-bold tracking-tight text-white">
                Analytics
              </p>

              <p className="mt-0.5 text-[11px] font-medium tracking-wide text-white/60">
                INSIGHTS PLATFORM
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-2.5 top-[25px] hidden h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-teal-200 bg-white text-teal-600 shadow-sm transition hover:bg-teal-50 dark:border-slate-600 dark:bg-slate-800 dark:text-teal-400 dark:hover:bg-slate-700 lg:flex"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft
              size={12}
              strokeWidth={2.5}
              className={`transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col border-r border-slate-200 bg-white shadow-[4px_0_18px_rgba(15,23,42,0.08)] transition-[box-shadow,background-color,border-color] duration-300 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
          <nav
            className={`flex-1 overflow-x-hidden overflow-y-auto py-6 ${
              collapsed ? "lg:px-3" : "px-4"
            }`}
          >
            <div
              className={`mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 transition-all duration-300 dark:text-slate-500 ${
                collapsed
                  ? "lg:h-0 lg:overflow-hidden lg:opacity-0"
                  : "h-auto opacity-100"
              }`}
            >
              Workspace
            </div>

            <div className="space-y-1.5">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? item.name : ""}
                    className={({ isActive }) =>
                      `group flex h-11 items-center rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                        collapsed
                          ? "lg:justify-center lg:px-0"
                          : "gap-3 px-3"
                      } ${
                        isActive
                          ? "bg-teal-50 text-teal-700 dark:bg-teal-500/15 dark:text-teal-400"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                            isActive
                              ? "bg-teal-600 text-white shadow-sm shadow-teal-600/20"
                              : "text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-700 dark:text-slate-500 dark:group-hover:bg-slate-800 dark:group-hover:text-slate-200"
                          }`}
                        >
                          <Icon size={18} strokeWidth={2} />
                        </span>

                        <span
                          className={`whitespace-nowrap transition-all duration-300 ${
                            collapsed
                              ? "lg:w-0 lg:translate-x-2 lg:overflow-hidden lg:opacity-0"
                              : "w-auto translate-x-0 opacity-100"
                          }`}
                        >
                          {item.name}
                        </span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </nav>

          <div className="shrink-0 border-t border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div
              className={`flex items-center ${
                collapsed ? "lg:justify-center" : "gap-3"
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white shadow-sm">
                AS
              </div>

              <div
                className={`min-w-0 transition-all duration-300 ${
                  collapsed
                    ? "lg:w-0 lg:translate-x-2 lg:overflow-hidden lg:opacity-0"
                    : "w-auto translate-x-0 opacity-100"
                }`}
              >
                <p className="truncate text-xs font-bold text-slate-800 dark:text-slate-100">
                  Admin User
                </p>

                <p className="mt-0.5 truncate text-[10px] font-medium text-slate-400 dark:text-slate-500">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
