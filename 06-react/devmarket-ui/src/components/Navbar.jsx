import { Link, NavLink } from "react-router-dom";

const Navbar = ({ cartCount }) => {
  return (
    <nav
      className="bg-white border-b border-gray-100
                    px-6 py-4 flex items-center justify-between
                    sticky top-0 z-50 shadow-sm"
    >
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-indigo-600">
        DevMarket
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-0.5"
              : "text-gray-500 hover:text-gray-900 transition-colors"
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-0.5"
              : "text-gray-500 hover:text-gray-900 transition-colors"
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
      </div>
    </nav>
  );
};

export default Navbar;
