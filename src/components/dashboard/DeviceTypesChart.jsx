import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import ChartCard from "./ChartCard";

const defaultData = [
  { name: "Desktop", value: 52 },
  { name: "Mobile", value: 34 },
  { name: "Tablet", value: 14 },
];

const COLORS = ["#0d9488", "#0f766e", "#f59e0b"];

function DeviceTypesChart({ data = defaultData }) {
  return (
    <ChartCard
      title="Device Types"
      description="Users by device category"
    >
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={105}
              paddingAngle={3}
              stroke="#ffffff"
              strokeWidth={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`device-${entry.name}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
              }}
              labelStyle={{
                color: "#0f172a",
                fontSize: "12px",
                fontWeight: 700,
              }}
              formatter={(value) => [`${value}%`, "Users"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-3">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center gap-2"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: COLORS[index % COLORS.length],
              }}
            />

            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              {item.name}
            </span>

            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

export default DeviceTypesChart;
