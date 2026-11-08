import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartCard from "./ChartCard";

const defaultData = [
  { month: "Jan", users: 18400 },
  { month: "Feb", users: 19100 },
  { month: "Mar", users: 19850 },
  { month: "Apr", users: 20700 },
  { month: "May", users: 21900 },
  { month: "Jun", users: 23100 },
  { month: "Jul", users: 24582 },
];

function UserGrowthChart({ data = defaultData }) {
  return (
    <ChartCard
      title="User Growth"
      description="Total registered users over time"
    >
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="userGrowthFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#0d9488"
                  stopOpacity={0.2}
                />

                <stop
                  offset="100%"
                  stopColor="#0d9488"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#e2e8f0"
              strokeDasharray="3 3"
              vertical={false}
              className="dark:opacity-20"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
                fontWeight: 500,
              }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
                fontWeight: 500,
              }}
              tickFormatter={(value) => `${value / 1000}k`}
            />

            <Tooltip
              cursor={{
                stroke: "#94a3b8",
                strokeDasharray: "4 4",
              }}
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
                marginBottom: "4px",
              }}
              formatter={(value) => [
                value.toLocaleString(),
                "Users",
              ]}
            />

            <Area
              type="monotone"
              dataKey="users"
              stroke="#0d9488"
              strokeWidth={2.5}
              fill="url(#userGrowthFill)"
              dot={false}
              activeDot={{
                r: 5,
                strokeWidth: 2,
                stroke: "#ffffff",
                fill: "#0d9488",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export default UserGrowthChart;
