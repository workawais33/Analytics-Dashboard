import { Download, FileText } from "lucide-react";

function ChartCard({
  title,
  description,
  children,
  className = "",
  onDownload,
  onReport,
}) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${className}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 dark:border-slate-700">
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-xs font-medium text-slate-400 dark:text-slate-500">
              {description}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onDownload}
            className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-[10px] font-bold text-slate-500 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 dark:border-slate-600 dark:text-slate-400 dark:hover:border-teal-500 dark:hover:bg-teal-500/10 dark:hover:text-teal-400"
          >
            <Download size={13} strokeWidth={2} />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            type="button"
            onClick={onReport}
            className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-[10px] font-bold text-slate-500 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 dark:border-slate-600 dark:text-slate-400 dark:hover:border-teal-500 dark:hover:bg-teal-500/10 dark:hover:text-teal-400"
          >
            <FileText size={13} strokeWidth={2} />
            <span className="hidden sm:inline">Report</span>
          </button>
        </div>
      </div>

      <div className="p-5">{children}</div>
    </section>
  );
}

export default ChartCard;
