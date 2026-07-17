import { useTheme } from "../context/ThemeContext";
import { recentOrders } from "../data/dashboardData";

const statusStyles = {
  completed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  refunded: "bg-red-100 text-red-700",
};

const RecentOrders = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-xl border
                     ${
                       isDark
                         ? "bg-gray-900 border-gray-800"
                         : "bg-white border-gray-200"
                     }`}
    >
      {/* Header */}
      <div
        className={`px-6 py-4 border-b
                       ${isDark ? "border-gray-800" : "border-gray-200"}`}
      >
        <h3
          className={`text-base font-semibold
                         ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Recent Orders
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={isDark ? "bg-gray-800" : "bg-gray-50"}>
              {["Product", "Buyer", "Amount", "Status"].map((h) => (
                <th
                  key={h}
                  className={`px-6 py-3 text-left text-xs
                                font-semibold uppercase tracking-wider
                                ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className={`divide-y
                             ${isDark ? "divide-gray-800" : "divide-gray-100"}`}
          >
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className={`transition-colors
                               ${
                                 isDark
                                   ? "hover:bg-gray-800"
                                   : "hover:bg-gray-50"
                               }`}
              >
                <td
                  className={`px-6 py-4 font-medium
                                ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {order.product}
                </td>
                <td
                  className={`px-6 py-4
                                ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  {order.buyer}
                </td>
                <td
                  className={`px-6 py-4 font-semibold
                                ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  ${order.amount}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1
                                    rounded-full capitalize
                                    ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
