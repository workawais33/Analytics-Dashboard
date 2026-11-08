import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Eye,
  Mail,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import usersData from "../../data/usersData";

function UsersTable() {
  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleView = (user) => {
    window.alert(
      `Name: ${user.name}\nEmail: ${user.email}\nSignup Date: ${user.signupDate}\nCountry: ${user.country}\nStatus: ${user.status}`
    );
  };

  const handleDelete = (id) => {
    setUsers((current) =>
      current.filter((user) => user.id !== id)
    );
  };

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = users.filter((user) =>
      [user.name, user.email, user.country].some((value) =>
        value.toLowerCase().includes(query)
      )
    );

    if (!sortConfig.key) {
      return filtered;
    }

    return [...filtered].sort((a, b) => {
      const first = a[sortConfig.key];
      const second = b[sortConfig.key];

      const comparison = first.localeCompare(second, undefined, {
        numeric: true,
        sensitivity: "base",
      });

      return sortConfig.direction === "asc"
        ? comparison
        : -comparison;
    });
  }, [users, search, sortConfig]);

  const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortConfig, users.length]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    endIndex
  );

  const handlePrevious = () => {
    setCurrentPage((current) => Math.max(current - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((current) =>
      Math.min(current + 1, totalPages)
    );
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) {
      return null;
    }

    return sortConfig.direction === "asc" ? (
      <ArrowUp size={12} strokeWidth={2.5} />
    ) : (
      <ArrowDown size={12} strokeWidth={2.5} />
    );
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 transition-colors duration-300 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Users
          </h2>

          <p className="mt-1 text-xs font-medium text-slate-400 dark:text-slate-500">
            Manage and review registered users.
          </p>
        </div>

        <div className="relative w-full sm:w-[260px]">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users..."
            className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-300 focus:bg-white focus:ring-4 focus:ring-teal-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-teal-500 dark:focus:bg-slate-800 dark:focus:ring-teal-500/10"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-800/60">
              <th className="px-5 py-3">
                <button
                  type="button"
                  onClick={() => handleSort("name")}
                  className="flex cursor-pointer items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400 transition hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200"
                >
                  Name
                  <SortIcon column="name" />
                </button>
              </th>

              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Email
              </th>

              <th className="px-5 py-3">
                <button
                  type="button"
                  onClick={() => handleSort("signupDate")}
                  className="flex cursor-pointer items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400 transition hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200"
                >
                  Signup Date
                  <SortIcon column="signupDate" />
                </button>
              </th>

              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Country
              </th>

              <th className="px-5 py-3">
                <button
                  type="button"
                  onClick={() => handleSort("status")}
                  className="flex cursor-pointer items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400 transition hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200"
                >
                  Status
                  <SortIcon column="status" />
                </button>
              </th>

              <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                className="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/50"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700 dark:bg-teal-500/15 dark:text-teal-400">
                      {user.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </div>

                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {user.name}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <Mail
                      size={14}
                      strokeWidth={2}
                      className="shrink-0 text-slate-400 dark:text-slate-500"
                    />
                    {user.email}
                  </div>
                </td>

                <td className="px-5 py-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                  {user.signupDate}
                </td>

                <td className="px-5 py-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {user.country}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${
                      user.status === "Active"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"
                        : user.status === "Pending"
                          ? "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleView(user)}
                      aria-label={`View ${user.name}`}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-teal-500 dark:hover:bg-teal-500/10 dark:hover:text-teal-400"
                    >
                      <Eye size={14} strokeWidth={2} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(user.id)}
                      aria-label={`Delete ${user.name}`}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-rose-500 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
                    >
                      <Trash2 size={14} strokeWidth={2} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {paginatedUsers.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-5 py-10 text-center text-xs font-medium text-slate-400 dark:text-slate-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredUsers.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 transition-colors duration-300 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-600 dark:text-slate-300">
              {startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-slate-600 dark:text-slate-300">
              {Math.min(endIndex, filteredUsers.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-600 dark:text-slate-300">
              {filteredUsers.length}
            </span>{" "}
            users
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              <ChevronLeft size={15} strokeWidth={2} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-lg px-2 text-xs font-bold transition ${
                  currentPage === page
                    ? "bg-teal-600 text-white"
                    : "border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              <ChevronRight size={15} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default UsersTable;
