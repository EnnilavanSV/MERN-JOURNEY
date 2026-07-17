import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../context/ThemeContext";
import { revenueData } from "../data/dashboardData";

const RevenueChart = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-xl p-6 border
                     ${
                       isDark
                         ? "bg-gray-900 border-gray-800"
                         : "bg-white border-gray-200"
                     }`}
    >
      <h3
        className={`text-base font-semibold mb-6
                       ${isDark ? "text-white" : "text-gray-900"}`}
      >
        Revenue This Week
      </h3>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={revenueData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#374151" : "#f3f4f6"}
          />
          <XAxis
            dataKey="day"
            tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
              borderRadius: "8px",
              color: isDark ? "#ffffff" : "#111827",
            }}
            formatter={(v) => [`$${v}`, "Revenue"]}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ fill: "#6366f1", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
