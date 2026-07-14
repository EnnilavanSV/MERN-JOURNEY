import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import useWindowSize from "../hooks/useWindowSize";

const Navbar = () => {
  const { cartCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const { isMobile, isTablet, isDesktop } = useWindowSize();

  const breakpointLabel = isMobile
    ? "📱 Mobile"
    : isTablet
      ? "📟 Tablet"
      : "💻 Desktop";

  return (
    <nav
      className={`border-b px-6 py-4 flex items-center
                     justify-between sticky top-0 z-50
                     ${
                       isDark
                         ? "bg-gray-900 border-gray-700"
                         : "bg-white border-gray-100 shadow-sm"
                     }`}
    >
      <Link to="/" className="text-xl font-bold text-indigo-600">
        DevMarket
      </Link>

      <span className="text-xs text-gray-400  md:block">{breakpointLabel}</span>

      <div className="flex items-center gap-6">
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-0.5"
              : `transition-colors ${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
                }`
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 font-semibold"
              : `transition-colors ${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
                }`
          }
        >
          <div className="relative">
            🛒 Cart
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-3
                               bg-indigo-600 text-white text-xs
                               font-bold w-4 h-4 rounded-full
                               flex items-center justify-center"
              >
                {cartCount}
              </span>
            )}
          </div>
        </NavLink>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`text-sm px-3 py-1.5 rounded-lg
                      transition-colors font-medium
                      ${
                        isDark
                          ? "bg-gray-700 text-white hover:bg-gray-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
        >
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
