import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      className={`h-16 flex items-center justify-between
                        px-6 border-b sticky top-0 z-50
                        ${
                          isDark
                            ? "bg-gray-900 border-gray-800"
                            : "bg-white border-gray-200"
                        }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-xl">📊</span>
        <span className="font-bold text-indigo-500 text-lg">
          DevMarket Analytics
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Live indicator */}
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 bg-green-500 rounded-full
                          animate-pulse"
          ></div>
          <span
            className={`text-xs font-medium
                            ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Live
          </span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`text-sm px-3 py-1.5 rounded-lg
                      transition-colors font-medium
                      ${
                        isDark
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
        >
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 bg-indigo-600 rounded-full
                        flex items-center justify-center
                        text-white text-sm font-bold"
        >
          E
        </div>
      </div>
    </header>
  );
};

export default Navbar;
