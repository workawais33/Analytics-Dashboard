import { RotateCcw } from "lucide-react";

function FilterSection({ filters, setFilters }) {
  const handleChange = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      timeframe: "30",
      industry: "All Industries",
      region: "All Regions",
    });
  };

  return (
    <section className="sticky top-[76px] z-20 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/95">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Dashboard Filters
          </h2>

          <p className="mt-1 text-xs font-medium text-slate-400 dark:text-slate-500">
            Refine the analytics data shown below.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="timeframe"
              className="text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500"
            >
              Timeframe
            </label>

            <select
              id="timeframe"
              value={filters.timeframe}
              onChange={(event) =>
                handleChange("timeframe", event.target.value)
              }
              className="h-10 min-w-[150px] rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-teal-300 focus:bg-white focus:ring-4 focus:ring-teal-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:focus:border-teal-500 dark:focus:bg-slate-700 dark:focus:ring-teal-950"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="industry"
              className="text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500"
            >
              Industry
            </label>

            <select
              id="industry"
              value={filters.industry}
              onChange={(event) =>
                handleChange("industry", event.target.value)
              }
              className="h-10 min-w-[160px] rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-teal-300 focus:bg-white focus:ring-4 focus:ring-teal-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:focus:border-teal-500 dark:focus:bg-slate-700 dark:focus:ring-teal-950"
            >
              <option>All Industries</option>
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Retail</option>
              <option>Education</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="region"
              className="text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500"
            >
              Region
            </label>

            <select
              id="region"
              value={filters.region}
              onChange={(event) =>
                handleChange("region", event.target.value)
              }
              className="h-10 min-w-[150px] rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-teal-300 focus:bg-white focus:ring-4 focus:ring-teal-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:focus:border-teal-500 dark:focus:bg-slate-700 dark:focus:ring-teal-950"
            >
              <option>All Regions</option>
              <option>North America</option>
              <option>Europe</option>
              <option>Asia</option>
              <option>Middle East</option>
              <option>Oceania</option>
            </select>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3.5 text-xs font-bold text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:mt-0 dark:border-slate-600 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            <RotateCcw size={14} strokeWidth={2} />
            Clear all filters
          </button>
        </div>
      </div>
    </section>
  );
}

export default FilterSection;
