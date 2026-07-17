import { useTheme } from "../context/ThemeContext";

const navItems = [
  { icon: "📊", label: "Overview", active: true },
  { icon: "📈", label: "Revenue", active: false },
  { icon: "👥", label: "Users", active: false },
  { icon: "📦", label: "Orders", active: false },
  { icon: "🛍️", label: "Products", active: false },
  { icon: "⚙️", label: "Settings", active: false },
];

const Sidebar = () => {
  const { isDark } = useTheme();

  return (
    <aside
      className={`w-56 min-h-screen border-r p-4
                       ${
                         isDark
                           ? "bg-gray-900 border-gray-800"
                           : "bg-white border-gray-200"
                       }`}
    >
      <nav className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3
                        px-3 py-2.5 rounded-lg text-sm
                        font-medium transition-colors text-left
                        ${
                          item.active
                            ? "bg-indigo-600 text-white"
                            : isDark
                              ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                              : "text-gray-600 hover:bg-gray-100"
                        }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom — user info */}
      <div
        className={`absolute bottom-6 left-4 right-4
                       p-3 rounded-lg
                       ${isDark ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <p
          className={`text-xs font-medium
                       ${isDark ? "text-gray-300" : "text-gray-700"}`}
        >
          Ennilavan
        </p>
        <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          Admin
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
