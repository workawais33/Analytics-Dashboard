import { useMemo, useState } from "react";
import {
  Activity,
  DollarSign,
  UserPlus,
  Users,
} from "lucide-react";
import KpiCard from "../components/dashboard/KpiCard";
import FilterSection from "../components/dashboard/FilterSection";
import UserGrowthChart from "../components/dashboard/UserGrowthChart";
import TopRegionsChart from "../components/dashboard/TopRegionsChart";
import DeviceTypesChart from "../components/dashboard/DeviceTypesChart";
import { getDashboardData } from "../data/DashboardData";

function Analytics() {
  const [filters, setFilters] = useState({
    timeframe: "30",
    industry: "All Industries",
    region: "All Regions",
  });

  const dashboardData = useMemo(
    () =>
      getDashboardData(
        filters.timeframe,
        filters.industry,
        filters.region
      ),
    [filters]
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-600 dark:text-teal-400">
          Analytics
        </p>

        <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
          Analytics Overview
        </h1>

        <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
          Review detailed performance and user analytics.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Revenue"
          value={dashboardData.kpis.revenue}
          change={dashboardData.kpis.revenueChange}
          trend="up"
          icon={DollarSign}
          description="vs last month"
        />

        <KpiCard
          title="User Signups"
          value={dashboardData.kpis.signups}
          change={dashboardData.kpis.signupsChange}
          trend="up"
          icon={UserPlus}
          description="vs last month"
          progress={dashboardData.kpis.signupProgress}
        />

        <KpiCard
          title="Total Users"
          value={dashboardData.kpis.totalUsers}
          change={dashboardData.kpis.totalUsersChange}
          trend="up"
          icon={Users}
          description="vs last month"
        />

        <KpiCard
          title="Active Sessions"
          value={dashboardData.kpis.activeSessions}
          change={dashboardData.kpis.activeSessionsChange}
          trend={dashboardData.kpis.activeSessionsTrend}
          icon={Activity}
          description="vs last month"
        />
      </section>

      <FilterSection
        filters={filters}
        setFilters={setFilters}
      />

      <section className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="min-w-0 xl:col-span-2">
          <UserGrowthChart data={dashboardData.userGrowth} />
        </div>

        <div className="min-w-0">
          <TopRegionsChart data={dashboardData.regions} />
        </div>

        <div className="min-w-0">
          <DeviceTypesChart data={dashboardData.devices} />
        </div>
      </section>
    </div>
  );
}

export default Analytics;
