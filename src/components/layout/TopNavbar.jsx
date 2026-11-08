import { useEffect, useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  MessageSquare,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { Link } from "react-router-dom";

function TopNavbar({ setMobileSidebarOpen }) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("analytics-dashboard-theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("analytics-dashboard-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("analytics-dashboard-theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-30 h-[76px] border-b border-teal-500 bg-teal-600 shadow-sm">
      <div className="flex h-full items-center gap-3 px-4 sm:px-6 lg:px-7">
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          aria-label="Open sidebar"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-white transition hover:bg-white/10 lg:hidden"
        >
          <Menu size={20} strokeWidth={2} />
        </button>

        <div className="relative hidden min-w-0 max-w-xl flex-1 md:block">
          <Search
            size={17}
            strokeWidth={2}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search anything..."
            className="h-10 w-full rounded-xl border border-white/10 bg-white px-10 text-xs font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-white focus:ring-4 focus:ring-white/20"
          />
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            aria-label="Search"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-white transition hover:bg-white/10 md:hidden"
          >
            <Search size={19} strokeWidth={2} />
          </button>

          <Link
            to="/chat"
            aria-label="Messages"
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-white transition hover:bg-white/10"
          >
            <MessageSquare size={19} strokeWidth={2} />

            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[8px] font-bold text-white ring-2 ring-teal-600">
              3
            </span>
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationOpen((current) => !current);
                setUserOpen(false);
              }}
              aria-label="Notifications"
              className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-white transition hover:bg-white/10"
            >
              <Bell size={19} strokeWidth={2} />

              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[8px] font-bold text-white ring-2 ring-teal-600">
                4
              </span>
            </button>

            {notificationOpen && (
              <div className="absolute right-0 top-12 w-[290px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-700">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      Notifications
                    </h3>

                    <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                      You have 4 unread notifications
                    </p>
                  </div>

                  <span className="rounded-full bg-teal-50 px-2 py-1 text-[9px] font-bold text-teal-600 dark:bg-teal-500/10 dark:text-teal-400">
                    4 New
                  </span>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                  <div className="px-4 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      New user registered
                    </p>

                    <p className="mt-1 text-[10px] font-medium text-slate-400">
                      A new user joined the platform.
                    </p>
                  </div>

                  <div className="px-4 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      Analytics report updated
                    </p>

                    <p className="mt-1 text-[10px] font-medium text-slate-400">
                      Your latest dashboard data is ready.
                    </p>
                  </div>

                  <div className="px-4 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      New activity detected
                    </p>

                    <p className="mt-1 text-[10px] font-medium text-slate-400">
                      User activity increased today.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setDarkMode((current) => !current)}
            aria-label={darkMode ? "Enable light mode" : "Enable dark mode"}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-white transition hover:bg-white/10"
          >
            {darkMode ? (
              <Sun size={19} strokeWidth={2} />
            ) : (
              <Moon size={19} strokeWidth={2} />
            )}
          </button>

          <div className="relative ml-1">
            <button
              type="button"
              onClick={() => {
                setUserOpen((current) => !current);
                setNotificationOpen(false);
              }}
              aria-expanded={userOpen}
              className="flex h-10 cursor-pointer items-center gap-2 rounded-xl px-2 text-white transition hover:bg-white/10"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[10px] font-bold text-teal-700">
                AS
              </span>

              <span className="hidden text-left sm:block">
                <span className="block text-[11px] font-bold leading-tight">
                  Admin User
                </span>

                <span className="mt-0.5 block text-[9px] font-medium text-teal-100">
                  Administrator
                </span>
              </span>

              <ChevronDown
                size={14}
                strokeWidth={2}
                className={`hidden transition-transform sm:block ${
                  userOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {userOpen && (
              <div className="absolute right-0 top-12 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-4 dark:border-slate-700">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
                    AS
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-slate-900 dark:text-white">
                      Admin User
                    </p>

                    <p className="mt-1 text-[10px] font-medium text-slate-400">
                      Administrator
                    </p>
                  </div>
                </div>

                <div className="px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Account
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                    Dashboard Administrator
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;
