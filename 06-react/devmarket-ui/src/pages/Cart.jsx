import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, total } = useCart();
  const { isDark } = useTheme();

  const tax = total * 0.18;
  const grandTotal = total + tax;

  if (cart.length === 0)
    return (
      <div
        className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"} flex flex-col
                    items-center justify-center gap-6`}
      >
        <div className="text-center">
          <p className="text-6xl mb-4">🛒</p>
          <h2
            className={`text-2xl font-bold  ${isDark ? "text-white" : "text-gray-900"} mb-2`}
          >
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything yet
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white
                     font-semibold px-8 py-3 rounded-xl
                     transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );

  return (
    <div className={`min-h-screen  ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Your Cart</h1>
          <p className="text-gray-500">
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT — Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100
                           shadow-sm p-4 flex items-center gap-4"
              >
                {/* Image */}
                <div
                  className="w-20 h-20 bg-gray-50 rounded-xl
                                flex items-center justify-center
                                shrink-0 p-2"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-semibold text-gray-900
                                leading-snug line-clamp-2 mb-1"
                  >
                    {item.title}
                  </p>
                  <span
                    className="bg-indigo-100 text-indigo-700
                                   text-xs font-medium px-2 py-0.5
                                   rounded-full capitalize"
                  >
                    {item.category}
                  </span>
                </div>

                {/* Price + Remove */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <p className="text-lg font-bold text-indigo-600">
                    ${item.price}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600
                               text-xs font-medium transition-colors
                               hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              to="/products"
              className="flex items-center gap-2 text-indigo-600
                         hover:text-indigo-700 text-sm font-medium
                         transition-colors mt-2"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* RIGHT — Order Summary */}
          <div className="lg:col-span-1">
            <div
              className="bg-white rounded-2xl border border-gray-100
                            shadow-sm p-6 sticky top-24"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              {/* Item list */}
              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-500 line-clamp-1 flex-1 mr-2">
                      {item.title}
                    </span>
                    <span className="text-gray-900 font-medium shrink-0">
                      ${item.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-4"></div>

              {/* Subtotal */}
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900 font-medium">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax (18%)</span>
                  <span className="text-gray-900 font-medium">
                    ${tax.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-4"></div>

              {/* Grand Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-indigo-600">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                className="w-full bg-indigo-600 hover:bg-indigo-700
                           text-white font-semibold py-3 rounded-xl
                           transition-colors mb-3"
              >
                Checkout
              </button>

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="w-full border border-gray-200 text-gray-500
                           hover:text-red-500 hover:border-red-300
                           font-medium py-2.5 rounded-xl
                           transition-colors text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
