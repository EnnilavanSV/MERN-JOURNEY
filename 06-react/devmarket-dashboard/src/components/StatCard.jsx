import { useTheme } from "../context/ThemeContext";

const StatCard = ({ label, value, change, positive, icon }) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-xl p-6 border transition-shadow
                     hover:shadow-lg
                     ${
                       isDark
                         ? "bg-gray-900 border-gray-800"
                         : "bg-white border-gray-200"
                     }`}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-4">
        <p
          className={`text-sm font-medium
                       ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          {label}
        </p>
        <span className="text-2xl">{icon}</span>
      </div>

      {/* Value */}
      <p
        className={`text-3xl font-bold mb-2
                     ${isDark ? "text-white" : "text-gray-900"}`}
      >
        {value}
      </p>

      {/* Change */}
      <div className="flex items-center gap-1">
        <span
          className={`text-sm font-semibold
                          ${positive ? "text-green-500" : "text-red-500"}`}
        >
          {positive ? "↑" : "↓"} {change}
        </span>
        <span
          className={`text-xs
                          ${isDark ? "text-gray-500" : "text-gray-400"}`}
        >
          from last month
        </span>
      </div>
    </div>
  );
};

export default StatCard;
