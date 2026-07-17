import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../context/ThemeContext";
import { ordersData } from "../data/dashboardData";

const OrdersChart = () => {
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
        Orders By Category
      </h3>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={ordersData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#374151" : "#f3f4f6"}
          />
          <XAxis
            dataKey="category"
            tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
              borderRadius: "8px",
              color: isDark ? "#ffffff" : "#111827",
            }}
            formatter={(v) => [v, "Orders"]}
          />
          <Bar dataKey="orders" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersChart;
