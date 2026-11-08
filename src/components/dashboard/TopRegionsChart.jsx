import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartCard from "./ChartCard";

const defaultData = [
  { region: "North America", users: 8420 },
  { region: "Europe", users: 7180 },
  { region: "Asia", users: 6240 },
  { region: "Middle East", users: 3890 },
  { region: "Africa", users: 2140 },
];

function TopRegionsChart({ data = defaultData }) {
  return (
    <ChartCard
      title="Top Regions"
      description="Users by geographic region"
    >
      <div className="h-[320px] min-w-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 8,
              right: 20,
              left: 10,
              bottom: 8,
            }}
          >
            <CartesianGrid
              stroke="#e2e8f0"
              strokeDasharray="3 3"
              horizontal={false}
              className="dark:opacity-20"
            />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
              }}
              tickFormatter={(value) => `${value / 1000}k`}
            />

            <YAxis
              type="category"
              dataKey="region"
              axisLine={false}
              tickLine={false}
              width={95}
              tick={{
                fill: "#64748b",
                fontSize: 11,
                fontWeight: 600,
              }}
            />

            <Tooltip
              cursor={{ fill: "#f1f5f9" }}
              formatter={(value) => [
                Number(value).toLocaleString(),
                "Users",
              ]}
              contentStyle={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
              }}
            />

            <Bar
              dataKey="users"
              fill="#0d9488"
              radius={[0, 6, 6, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export default TopRegionsChart;
