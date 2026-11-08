import { ArrowDownRight, ArrowUpRight } from "lucide-react";

function KpiCard({
  title,
  value,
  change,
  trend = "up",
  icon: Icon,
  description,
  progress,
}) {
  const isPositive = trend === "up";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-wide text-slate-400 dark:text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-[28px]">
            {value}
          </h3>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-teal-600 bg-teal-50 text-teal-600 dark:border-teal-500 dark:bg-teal-950 dark:text-teal-400">
          <Icon size={19} strokeWidth={2} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        {change && (
          <div
            className={`flex items-center gap-1 text-xs font-bold ${
              isPositive
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-500 dark:text-rose-400"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight size={14} strokeWidth={2.5} />
            ) : (
              <ArrowDownRight size={14} strokeWidth={2.5} />
            )}

            <span>{change}</span>
          </div>
        )}

        {description && (
          <span className="truncate text-[11px] font-medium text-slate-400 dark:text-slate-500">
            {description}
          </span>
        )}
      </div>

      {typeof progress === "number" && (
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
              Progress
            </span>

            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
              {progress}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-teal-600 transition-all duration-500 dark:bg-teal-500"
              style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default KpiCard;
